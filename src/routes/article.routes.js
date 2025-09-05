import { Router } from "express";
import { body, param, query } from "express-validator";
import { validator } from "../middlewares/validator.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { ownerMiddleware } from "../middlewares/owner.middleware.js";
import {
  createArticle,
  getArticles,
  getArticleById,
  getMyArticles,
  updateArticle,
  deleteArticle,
} from "../controllers/article.controllers.js";
import { ArticleModel } from "../models/article.model.js";

export const articleRoutes = Router();

articleRoutes.get(
  "/articles",
  authMiddleware,
  [
    query("status").optional().isIn(["published", "archived"]).withMessage("status inválido"),
    query("page").optional().isInt({ min: 1 }).toInt(),
    query("limit").optional().isInt({ min: 1, max: 100 }).toInt(),
  ],
  validator,
  getArticles
);


articleRoutes.get(
  "/articles/:id",
  authMiddleware,
  [param("id").isInt().withMessage("id debe ser entero")],
  validator,
  getArticleById
);


articleRoutes.get("/articles/user", authMiddleware, getMyArticles);


articleRoutes.post(
  "/articles",
  authMiddleware,
  [
    body("title").trim().isLength({ min: 3, max: 200 }).withMessage("title 3-200"),
    body("content").isLength({ min: 50 }).withMessage("content mínimo 50"),
    body("excerpt").optional().isLength({ max: 500 }).withMessage("excerpt ≤ 500"),
    body("status").optional().isIn(["published", "archived"]).withMessage("status inválido"),
  ],
  validator,
  createArticle
);


articleRoutes.put(
  "/articles/:id",
  authMiddleware,
  [
    param("id").isInt().withMessage("id debe ser entero"),
    body("title").optional().isLength({ min: 3, max: 200 }),
    body("content").optional().isLength({ min: 50 }),
    body("excerpt").optional().isLength({ max: 500 }),
    body("status").optional().isIn(["published", "archived"]),
  ],
  validator,
  ownerMiddleware(async (req) => {
    const article = await ArticleModel.findByPk(req.params.id, { attributes: ["user_id"] });
    return article?.user_id ?? 0;
  }),
  updateArticle
);


articleRoutes.delete(
  "/articles/:id",
  authMiddleware,
  [param("id").isInt().withMessage("id debe ser entero")],
  validator,
  ownerMiddleware(async (req) => {
    const article = await ArticleModel.findByPk(req.params.id, { attributes: ["user_id"] });
    return article?.user_id ?? 0;
  }),
  deleteArticle
);
