import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { ProfileModel } from "./profile.model.js";
import { ArticleModel } from "./article.model.js";

// Modelo de usuario con eliminación
export const UserModel = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
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
  },
}, {
  tableName: "users",
  paranoid: true,       
  deletedAt: "deleted_at",
  underscored: true,
  timestamps: true,
});

// Relación 1:1 
UserModel.hasOne(ProfileModel, { foreignKey: "user_id", as: "profile" });
ProfileModel.belongsTo(UserModel, { foreignKey: "user_id", as: "user" });

// Relación 1:N
UserModel.hasMany(ArticleModel, {
  foreignKey: "user_id",
  as: "articles",
  onDelete: "CASCADE",   
});
ArticleModel.belongsTo(UserModel, {
  foreignKey: "user_id",
  as: "author",
});
