import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { connectDB } from "./src/config/database.js";
import { userRoutes } from "./src/routes/user.routes.js";
import { authRoutes } from "./src/routes/auth.routes.js";
import { tagRoutes } from "./src/routes/tag.routes.js";
import { articleRoutes } from "./src/routes/article.routes.js";
import { articleTagRoutes } from "./src/routes/articleTag.routes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3005;

app.use(express.json());
app.use(cookieParser());

app.use("/api", articleRoutes);
app.use("/api", userRoutes);
app.use("/api", authRoutes);
app.use("/api", tagRoutes);
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
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  });
};


bootstrap();
 