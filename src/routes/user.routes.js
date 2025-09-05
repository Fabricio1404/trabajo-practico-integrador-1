import { Router } from "express";
import { validator } from "../middlewares/validator.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";
import { userIdParam, updateUserValidation } from "../middlewares/validations/user.validation.js";
import { getUsers, getUserById, updateUser, deleteUser } from "../controllers/user.controllers.js";

export const userRoutes = Router();

userRoutes.use(authMiddleware, adminMiddleware);

userRoutes.get   ("/users",            getUsers);
userRoutes.get   ("/users/:id",        userIdParam,         validator, getUserById);
userRoutes.put   ("/users/:id",        updateUserValidation, validator, updateUser);
userRoutes.delete("/users/:id",        userIdParam,         validator, deleteUser);
