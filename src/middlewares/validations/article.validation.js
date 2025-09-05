import { body, param, query } from "express-validator";

export const createArticleValidation = [
  body("title").trim().isLength({ min: 3, max: 200 }).withMessage("title 3-200"),
  body("content").trim().isLength({ min: 50 }).withMessage("content mínimo 50"),
  body("excerpt").optional().trim().isLength({ max: 500 }).withMessage("excerpt ≤ 500"),
  body("status").optional().isIn(["published", "archived"]).withMessage("status inválido"),
];

export const updateArticleValidation = [
  param("id").isInt().withMessage("id debe ser entero"),
  body("title").optional().trim().isLength({ min: 3, max: 200 }),
  body("content").optional().trim().isLength({ min: 50 }),
  body("excerpt").optional().trim().isLength({ max: 500 }),
  body("status").optional().isIn(["published", "archived"]),
];

export const articleIdParam = [
  param("id").isInt().withMessage("id debe ser entero"),
];

export const listArticlesValidation = [
  query("status").optional().isIn(["published", "archived"]).withMessage("status inválido"),
  query("page").optional().isInt({ min: 1 }).toInt(),
  query("limit").optional().isInt({ min: 1, max: 100 }).toInt(),
  query("sort").optional().isString(),
  query("q").optional().isString(),
];

export const userIdParam = [
  param("id").isInt().withMessage("id debe ser entero"),
];
    