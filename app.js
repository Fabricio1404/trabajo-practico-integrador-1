import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./src/config/database.js";

// Rutas
import { authRoutes } from "./src/routes/auth.routes.js";
import { userRoutes } from "./src/routes/user.routes.js";
import { tagRoutes } from "./src/routes/tag.routes.js";
import { articleRoutes } from "./src/routes/article.routes.js";
import { articleTagRoutes } from "./src/routes/articleTag.routes.js";

import "./src/models/index.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3005;

// Configuración CORS con credenciales
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "http://localhost:5173";
app.use(cors({ origin: FRONTEND_ORIGIN, credentials: true }));

app.use(express.json());
app.use(cookieParser());

// Montar rutas
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", tagRoutes);
app.use("/api", articleRoutes);
app.use("/api", articleTagRoutes);

// Handler de errores central
app.use((err, req, res, next) => {
  console.error(err);
  if (res.headersSent) return next(err);
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({ message });
});

const bootstrap = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
};

bootstrap();
