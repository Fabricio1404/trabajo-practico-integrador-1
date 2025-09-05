import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const ProfileModel = sequelize.define(
  "Profile",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED, 
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {                        
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    last_name: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    biography: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    avatar_url: {
      type: DataTypes.STRING(255),
      allowNull: true,
      validate: { isUrl: true },
    },
    birth_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "profiles",
    underscored: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);
