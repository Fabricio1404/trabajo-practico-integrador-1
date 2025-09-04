import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { ArticleModel } from "./article.model.js";
import { ArticleTagModel } from "./article_tag.model.js";

export const TagModel = sequelize.define("Tag", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING(30), allowNull: false, unique: true },
}, {
  tableName: "tags",
  underscored: true,
  timestamps: true,
});

// Relación N:M con Article 
TagModel.belongsToMany(ArticleModel, {
  through: ArticleTagModel,
  foreignKey: "tag_id",
  otherKey: "article_id",
  as: "articles",
});
