import { Router } from "express";
import { body, param } from "express-validator";
import { validator } from "../middlewares/validator.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";
import { getUsers, getUserById, updateUser, deleteUser } from "../controllers/user.controllers.js";

export const userRoutes = Router();

userRoutes.use(authMiddleware, adminMiddleware);




userRoutes.get("/users", getUsers);


userRoutes.get(
  "/users/:id",
  [param("id").isInt().withMessage("id debe ser entero")],
  validator,
  getUserById
);


userRoutes.put(
  "/users/:id",
  [
    param("id").isInt().withMessage("id debe ser entero"),
    body("username").optional().isLength({ min: 3, max: 20 }).withMessage("username 3-20"),
    body("email").optional().isEmail().withMessage("email inválido"),
    body("role").optional().isIn(["user", "admin"]).withMessage("role inválido"),
  ],
  validator,
  updateUser
);


userRoutes.delete(
  "/users/:id",
  [param("id").isInt().withMessage("id debe ser entero")],
  validator,
  deleteUser
);
