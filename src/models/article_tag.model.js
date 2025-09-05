import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const ArticleTagModel = sequelize.define(
  "ArticleTag",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    article_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    tag_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    tableName: "articles_tags",
    timestamps: false,
    underscored: true,
  }
);
