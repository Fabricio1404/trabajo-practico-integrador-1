import express from "express";
import cookieParser from "cookie-parser";
import { connectDB } from "./src/config/database.js";
import { authRoutes } from "./src/routes/auth.routes.js";

const app = express();
const PORT = 3005;

app.use(express.json());
app.use(cookieParser());

app.use("/api", authRoutes);
//app.use("/api", userRoutes); app.use("/api", articleRoutes); app.use("/api", tagRoutes);

app.listen(PORT, async () => {
  await connectDB();
  console.log(`servidor corriendo en el puerto ${PORT}`);
});
