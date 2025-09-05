import { UserModel } from "./user.model.js";
import { ProfileModel } from "./profile.model.js";
import { ArticleModel } from "./article.model.js";
import { TagModel } from "./tag.model.js";
import { ArticleTagModel } from "./article_tag.model.js";

//User Profile (1:1)
UserModel.hasOne(ProfileModel, { as: "profile", foreignKey: "user_id" });
ProfileModel.belongsTo(UserModel, { as: "user", foreignKey: "user_id" });

// User Article (1:N)
UserModel.hasMany(ArticleModel, { as: "articles", foreignKey: "user_id", onDelete: "CASCADE" });
ArticleModel.belongsTo(UserModel, { as: "author", foreignKey: "user_id" });
    
//  Article Tag (N:M) mediante ArticleTag
ArticleModel.belongsToMany(TagModel, {
  as: "tags",
  through: ArticleTagModel,
  foreignKey: "article_id",
  otherKey: "tag_id",
});
TagModel.belongsToMany(ArticleModel, {
  as: "articles",
  through: ArticleTagModel,
  foreignKey: "tag_id",
  otherKey: "article_id",
});

// Exportamos los modelos ya conectados
export {
  UserModel,
  ProfileModel,
  ArticleModel,
  TagModel,
  ArticleTagModel,
};
