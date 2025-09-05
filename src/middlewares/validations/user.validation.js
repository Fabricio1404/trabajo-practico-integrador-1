import { body, param } from "express-validator";

export const userIdParam = [
  param("id").isInt().withMessage("id debe ser entero"),
];

export const updateUserValidation = [
  param("id").isInt().withMessage("id debe ser entero"),
  body("username").optional().trim().isLength({ min: 3, max: 20 })
    .withMessage("username 3-20")
    .matches(/^[a-zA-Z0-9._]+$/).withMessage("username solo letras, números, . y _"),
  body("email").optional().isEmail().withMessage("email inválido").normalizeEmail(),
  body("role").optional().isIn(["user", "admin"]).withMessage("role inválido"),
];
