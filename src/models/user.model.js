import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const UserModel = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED, 
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("user", "admin"),
      allowNull: false,
      defaultValue: "user",
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "users",
    paranoid: true,
    deletedAt: "deleted_at",
    underscored: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);
