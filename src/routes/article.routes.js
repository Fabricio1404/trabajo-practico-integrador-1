import { Router } from "express";
import { validator } from "../middlewares/validator.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { ownerMiddleware } from "../middlewares/owner.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";
import {
  createArticleValidation,
  updateArticleValidation,
  articleIdParam,
  listArticlesValidation,
  userIdParam,
} from "../middlewares/validations/article.validation.js";
import {
  createArticle,
  getArticles,
  getArticleById,
  getMyArticles,
  updateArticle,
  deleteArticle,
  getArticlesByUserId,
} from "../controllers/article.controllers.js";
import { ArticleModel } from "../models/article.model.js";

export const articleRoutes = Router();

articleRoutes.get ("/articles",            authMiddleware, listArticlesValidation, validator, getArticles);
articleRoutes.get ("/articles/:id",        authMiddleware, articleIdParam,        validator, getArticleById);
articleRoutes.get ("/articles/user",       authMiddleware,                         getMyArticles);
articleRoutes.get ("/articles/user/:id",   authMiddleware, adminMiddleware, userIdParam, validator, getArticlesByUserId);

articleRoutes.post("/articles",            authMiddleware, createArticleValidation, validator, createArticle);

articleRoutes.put ("/articles/:id",
  authMiddleware,
  updateArticleValidation,
  validator,
  ownerMiddleware(async (req) => {
    const article = await ArticleModel.findByPk(req.params.id, { attributes: ["user_id"] });
    return article?.user_id ?? 0;
  }),
  updateArticle
);

articleRoutes.delete("/articles/:id",
  authMiddleware,
  articleIdParam,
  validator,
  ownerMiddleware(async (req) => {
    const article = await ArticleModel.findByPk(req.params.id, { attributes: ["user_id"] });
    return article?.user_id ?? 0;
  }),
  deleteArticle
);
