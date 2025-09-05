import { Router } from "express";
import { validator } from "../middlewares/validator.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";
import {
  createTagValidation,
  updateTagValidation,
  tagIdParam,
  listTagsValidation,
} from "../middlewares/validations/tag.validation.js";
import { createTag, getTags, getTagById, updateTag, deleteTag } from "../controllers/tag.controllers.js";

export const tagRoutes = Router();

tagRoutes.use(authMiddleware, adminMiddleware);

tagRoutes.post ("/tags",       createTagValidation, validator, createTag);
tagRoutes.get  ("/tags",       listTagsValidation,  validator, getTags);
tagRoutes.get  ("/tags/:id",   tagIdParam,          validator, getTagById);
tagRoutes.put  ("/tags/:id",   updateTagValidation, validator, updateTag);
tagRoutes.delete("/tags/:id",  tagIdParam,          validator, deleteTag);
