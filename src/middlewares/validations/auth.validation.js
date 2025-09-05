import { body } from "express-validator";

export const registerValidation = [
  body("username")
    .trim()
    .isLength({ min: 3, max: 20 }).withMessage("username 3-20")
    .matches(/^[a-zA-Z0-9._]+$/).withMessage("username solo letras, números, . y _"),
  body("email").isEmail().withMessage("email inválido").normalizeEmail(),
  body("password")
    .isLength({ min: 8 }).withMessage("password mínimo 8 caracteres")
    .matches(/[A-Za-z]/).withMessage("password debe tener letras")
    .matches(/[0-9]/).withMessage("password debe tener números"),
  body("first_name").optional().trim().isLength({ min: 2, max: 50 }),
  body("last_name").optional().trim().isLength({ min: 2, max: 50 }),
];

export const loginValidation = [
  body("email").isEmail().withMessage("email inválido").normalizeEmail(),
  body("password").notEmpty().withMessage("password requerido"),
];
