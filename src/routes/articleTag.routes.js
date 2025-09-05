import { Router } from "express";
import { validator } from "../middlewares/validator.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { ownerMiddleware } from "../middlewares/owner.middleware.js";
import {
  addArticleTagValidation,
  articleTagIdParam,
  articleIdTagIdParams,
} from "../middlewares/validations/articleTag.validation.js";
import { addTagToArticle, removeTagFromArticle } from "../controllers/articleTag.controllers.js";
import { ArticleModel } from "../models/article.model.js";
import { ArticleTagModel } from "../models/article_tag.model.js";

export const articleTagRoutes = Router();

// Agregar etiqueta a artículo (solo autor o admin)
articleTagRoutes.post(
  "/articles-tags",
  authMiddleware,
  addArticleTagValidation,
  validator,
  ownerMiddleware(async (req) => {
    const art = await ArticleModel.findByPk(req.body.article_id, { attributes: ["user_id"] });
    return art?.user_id ?? 0;
  }),
  addTagToArticle
);

// Eliminar vínculo por id del puente
articleTagRoutes.delete(
  "/articles-tags/:id",
  authMiddleware,
  articleTagIdParam,
  validator,
  ownerMiddleware(async (req) => {
    const at = await ArticleTagModel.findByPk(req.params.id, { attributes: ["article_id"] });
    if (!at) return 0;
    const art = await ArticleModel.findByPk(at.article_id, { attributes: ["user_id"] });
    return art?.user_id ?? 0;
  }),
  removeTagFromArticle
);

// Alternativa: eliminar por par artículo/tag
articleTagRoutes.delete(
  "/articles/:articleId/tags/:tagId",
  authMiddleware,
  articleIdTagIdParams,
  validator,
  ownerMiddleware(async (req) => {
    const art = await ArticleModel.findByPk(req.params.articleId, { attributes: ["user_id"] });
    return art?.user_id ?? 0;
  }),
  async (req, res) => {
    try {
      const { articleId, tagId } = req.params;
      const at = await ArticleTagModel.findOne({ where: { article_id: articleId, tag_id: tagId } });
      if (!at) return res.status(404).json({ message: "Vínculo artículo-etiqueta no encontrado" });
      await at.destroy();
      return res.json({ message: "Etiqueta removida del artículo" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Error interno del servidor" });
    }
  }
);
