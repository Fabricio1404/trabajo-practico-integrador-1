import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { ProfileModel } from "./profile.model.js";
import { ArticleModel } from "./article.model.js";

export const UserModel = sequelize.define("User", {
  username: { type: DataTypes.STRING(20), allowNull: false, unique: true },
  email: { type: DataTypes.STRING(100), allowNull: false, unique: true },
  password: { type: DataTypes.STRING(255), allowNull: false },
  role: { type: DataTypes.ENUM("user","admin"), defaultValue: "user", allowNull: false },
}, { timestamps: false });

// 1:1
UserModel.hasOne(ProfileModel, { foreignKey: "user_id", as: "profile" });
ProfileModel.belongsTo(UserModel, { foreignKey: "user_id", as: "user" });

// 1:N
UserModel.hasMany(ArticleModel, { foreignKey: "user_id", as: "articles" });
ArticleModel.belongsTo(UserModel, { foreignKey: "user_id", as: "author" });
