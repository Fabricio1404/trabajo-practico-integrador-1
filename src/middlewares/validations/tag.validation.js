import { body, param, query } from "express-validator";

export const createTagValidation = [
  body("name")
    .trim()
    .isLength({ min: 2, max: 30 }).withMessage("name 2-30")
    .matches(/^[^\s]+$/).withMessage("name no debe contener espacios"),
];

export const updateTagValidation = [
  param("id").isInt().withMessage("id debe ser entero"),
  body("name").optional().trim().isLength({ min: 2, max: 30 }).withMessage("name 2-30"),
];

export const tagIdParam = [
  param("id").isInt().withMessage("id debe ser entero"),
];

export const listTagsValidation = [
  query("page").optional().isInt({ min: 1 }).toInt(),
  query("limit").optional().isInt({ min: 1, max: 100 }).toInt(),
  query("sort").optional().isString(),
];
