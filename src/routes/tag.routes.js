import { Router } from "express";
import { body, param } from "express-validator";
import { validator } from "../middlewares/validator.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";
import { createTag, getTags, getTagById, updateTag, deleteTag } from "../controllers/tag.controllers.js";

export const tagRoutes = Router();

// Todas requieren auth + admin
tagRoutes.use(authMiddleware, adminMiddleware);


tagRoutes.post(
  "/tags",
  [
    body("name")
      .trim()
      .isLength({ min: 2, max: 30 })
      .withMessage("name 2-30")
      .matches(/^[^\s]+$/)
      .withMessage("name no debe contener espacios"),
  ],
  validator,
  createTag
);


tagRoutes.get("/tags", getTags);


tagRoutes.get(
  "/tags/:id",
  [param("id").isInt().withMessage("id debe ser entero")],
  validator,
  getTagById
);


tagRoutes.put(
  "/tags/:id",
  [
    param("id").isInt().withMessage("id debe ser entero"),
    body("name").optional().isLength({ min: 2, max: 30 }).withMessage("name 2-30"),
  ],
  validator,
  updateTag
);


tagRoutes.delete(
  "/tags/:id",
  [param("id").isInt().withMessage("id debe ser entero")],
  validator,
  deleteTag
);
