import { UserModel } from "../models/user.model.js";
import { ProfileModel } from "../models/profile.model.js";
import { ArticleModel } from "../models/article.model.js";

export async function getUsers(req, res) {
  try {
    const { page = 1, limit = 20, sort = "id:ASC" } = req.query;
    const [field = "id", direction = "ASC"] = String(sort).split(":");
    const offset = (Number(page) - 1) * Number(limit);

    const users = await UserModel.findAll({
      attributes: ["id", "username", "email", "role", "created_at", "updated_at"],
      include: [
        { model: ProfileModel, as: "profile" },
        { model: ArticleModel, as: "articles", attributes: ["id", "title"], required: false },
      ],
      order: [[field, direction.toUpperCase() === "DESC" ? "DESC" : "ASC"]],
      limit: Number(limit),
      offset,
    });

    return res.json({
      page: Number(page),
      limit: Number(limit),
      sort: `${field}:${direction}`,
      data: users,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
}


