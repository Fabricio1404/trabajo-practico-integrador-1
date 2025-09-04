import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const {
  DB_HOST = "127.0.0.1",
  DB_PORT = 3306,
  DB_USER = "root",
  DB_PASSWORD = "",
  DB_NAME = "blog_db",
} = process.env;

export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: Number(DB_PORT),
  dialect: "mysql",
  logging: false,
  define: {
    underscored: true,   // created_at, updated_at
    timestamps: true,
  },
});

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Conexión a MySQL OK");
    await sequelize.sync({ alter: true });
  } catch (error) {
    console.error("❌ No se pudo conectar a MySQL:", error?.message || error);
    process.exit(1);
  }
};
