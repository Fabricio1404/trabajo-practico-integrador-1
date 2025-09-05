import { Router } from "express";
import { body, param } from "express-validator";
import { validator } from "../middlewares/validator.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { ownerMiddleware } from "../middlewares/owner.middleware.js";
import { addTagToArticle, removeTagFromArticle } from "../controllers/articleTag.controllers.js";
import { ArticleModel } from "../models/article.model.js";
import { ArticleTagModel } from "../models/article_tag.model.js";

export const articleTagRoutes = Router();

articleTagRoutes.post(
  "/articles-tags",
  authMiddleware,
  [
    body("article_id").isInt().withMessage("article_id debe ser entero"),
    body("tag_id").isInt().withMessage("tag_id debe ser entero"),
  ],
  validator,
  ownerMiddleware(async (req) => {
    const { article_id } = req.body;
    const art = await ArticleModel.findByPk(article_id, { attributes: ["user_id"] });
    return art?.user_id ?? 0;
  }),
  addTagToArticle
);

articleTagRoutes.delete(
  "/articles-tags/:id",
  authMiddleware,
  [param("id").isInt().withMessage("id debe ser entero")],
  validator,
  ownerMiddleware(async (req) => {
    const at = await ArticleTagModel.findByPk(req.params.id, { attributes: ["article_id"] });
    if (!at) return 0;
    const art = await ArticleModel.findByPk(at.article_id, { attributes: ["user_id"] });
    return art?.user_id ?? 0;
  }),
  removeTagFromArticle
);
