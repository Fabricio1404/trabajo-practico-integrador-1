import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const ArticleTagModel = sequelize.define("ArticleTag", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
}, {
  tableName: "articles_tags",
  underscored: true,
  timestamps: true,
});
