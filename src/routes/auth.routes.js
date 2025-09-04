import { Router } from "express";
import { login, register, logout, profile } from "../controllers/auth.controllers.js";

export const authRoutes = Router();

authRoutes.post("/auth/register", register);        // pública
authRoutes.post("/auth/login", login);              // pública
authRoutes.get("/auth/profile", profile);           // privada 
authRoutes.post("/auth/logout", logout);            // privada
