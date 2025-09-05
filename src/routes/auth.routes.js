import { Router } from "express";
import { validator } from "../middlewares/validator.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { registerValidation, loginValidation } from "../middlewares/validations/auth.validation.js";
import { register, login, profile, logout } from "../controllers/auth.controllers.js";

export const authRoutes = Router();

authRoutes.post("/auth/register", registerValidation, validator, register);
authRoutes.post("/auth/login",    loginValidation,    validator, login);
authRoutes.get ("/auth/profile",  authMiddleware,                profile);
authRoutes.post("/auth/logout",   authMiddleware,                logout);
