import { Router } from "express";
import { body } from "express-validator";
import { validator } from "../middlewares/validator.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { register, login, profile, logout } from "../controllers/auth.controllers.js";

export const authRoutes = Router();


authRoutes.post(
  "/auth/register",
  [
    body("username")
      .trim()
      .isLength({ min: 3, max: 20 })
      .withMessage("username 3-20"),
    body("email").isEmail().withMessage("email inválido"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("password mínimo 8 caracteres"),
    body("first_name").optional().isLength({ min: 2, max: 50 }),
    body("last_name").optional().isLength({ min: 2, max: 50 }),
  ],
  validator,
  register
);


authRoutes.post(
  "/auth/login",
  [
    body("email").isEmail().withMessage("email inválido"),
    body("password").notEmpty().withMessage("password requerido"),
  ],
  validator,
  login
);


authRoutes.get("/auth/profile", authMiddleware, profile);


authRoutes.post("/auth/logout", authMiddleware, logout);
