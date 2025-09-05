import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const ArticleModel = sequelize.define(
  "Article",
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
    title: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    excerpt: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("published", "archived"),
      allowNull: false,
      defaultValue: "published",
    },
  },
  {
    tableName: "articles",
    underscored: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    hooks: {
      async beforeDestroy(article, options) {
        const { ArticleTagModel } = await import("./article_tag.model.js");
        await ArticleTagModel.destroy({
          where: { article_id: article.id },
          transaction: options?.transaction,
        });
      },
    },
  }
);
