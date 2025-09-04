import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { connectDB } from "./src/config/database.js";
import { authRoutes } from "./src/routes/auth.routes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3005;

app.use(express.json());
app.use(cookieParser());

app.use("/api", authRoutes);

const bootstrap = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  });
};

bootstrap();
