import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { TagModel } from "./tag.model.js";
import { ArticleTagModel } from "./article_tag.model.js";

export const ArticleModel = sequelize.define("Article", {
  title: { type: DataTypes.STRING(200), allowNull: false },
  content: { type: DataTypes.TEXT, allowNull: false },
  excerpt: { type: DataTypes.STRING(500) },
  status: { type: DataTypes.ENUM("published","archived"), defaultValue: "published" },
}, { timestamps: false });

// N:M
ArticleModel.belongsToMany(TagModel, { through: ArticleTagModel, foreignKey: "article_id", otherKey: "tag_id", as: "tags" });
TagModel.belongsToMany(ArticleModel, { through: ArticleTagModel, foreignKey: "tag_id", otherKey: "article_id", as: "articles" });
