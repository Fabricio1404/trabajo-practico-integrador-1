import { body, param } from "express-validator";

export const addArticleTagValidation = [
  body("article_id").isInt().withMessage("article_id debe ser entero"),
  body("tag_id").isInt().withMessage("tag_id debe ser entero"),
];

export const articleTagIdParam = [
  param("id").isInt().withMessage("id debe ser entero"),
];

export const articleIdTagIdParams = [
  param("articleId").isInt().withMessage("articleId debe ser entero"),
  param("tagId").isInt().withMessage("tagId debe ser entero"),
];
