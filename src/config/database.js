import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();


const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;


if (!DB_HOST || !DB_PORT || !DB_USER || !DB_NAME) {
  throw new Error("Faltan variables de entorno para la conexión a la base de datos. Verifica tu archivo .env");
}

export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD || "", {
  host: DB_HOST,
  port: DB_PORT,
  dialect: "mysql",
  logging: false, 
});

// Función para conectar
export async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log("Conexión a MySQL OK");

    
    if (process.env.NODE_ENV === "development") {
      await sequelize.sync({ alter: true });
      console.log("ablas sincronizadas");
    }
  } catch (err) {
    console.error("No se pudo conectar a MySQL:", err.message);
    throw err;
  }
}
