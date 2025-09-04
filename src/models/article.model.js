import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { TagModel } from "./tag.model.js";
import { ArticleTagModel } from "./article_tag.model.js";
import { UserModel } from "./user.model.js";

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

// N:1 
ArticleModel.belongsTo(UserModel, {
  foreignKey: "user_id",
  as: "author",
});

// N:M 
ArticleModel.belongsToMany(TagModel, {
  through: ArticleTagModel,
  foreignKey: "article_id",
  otherKey: "tag_id",
  as: "tags",
});
TagModel.belongsToMany(ArticleModel, {
  through: ArticleTagModel,
  foreignKey: "tag_id",
  otherKey: "article_id",
  as: "articles",
});

ArticleModel.addHook("beforeDestroy", async (article, options) => {
  await ArticleTagModel.destroy({
    where: { article_id: article.id },
    transaction: options?.transaction,
  });
});
