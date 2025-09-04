import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { TagModel } from "./tag.model.js";
import { ArticleTagModel } from "./article_tag.model.js";

export const ArticleModel = sequelize.define("Article", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING(200), allowNull: false },
  content: { type: DataTypes.TEXT, allowNull: false },
  excerpt: { type: DataTypes.STRING(500), allowNull: true },
  status: {
    type: DataTypes.ENUM("published", "archived"),
    allowNull: false,
    defaultValue: "published",
  },
}, {
  tableName: "articles",
  underscored: true,
  timestamps: true,
});

// Relación N:M con Tag 
ArticleModel.belongsToMany(TagModel, {
  through: ArticleTagModel,
  foreignKey: "article_id",
  otherKey: "tag_id",
  as: "tags",
});
