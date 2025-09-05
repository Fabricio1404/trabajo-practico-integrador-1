import { UserModel } from "../models/user.model.js";
import { ProfileModel } from "../models/profile.model.js";
import { ArticleModel } from "../models/article.model.js";

export async function getUsers(req, res) {
  try {
    const { page = 1, limit = 20, sort = "id:ASC" } = req.query;
    const allowedSortFields = ["id", "username", "email", "created_at", "updated_at"];
    const [fieldRaw, directionRaw] = String(sort).split(":");
    const field = allowedSortFields.includes(fieldRaw) ? fieldRaw : "id";
    const direction = (String(directionRaw).toUpperCase() === "DESC") ? "DESC" : "ASC";
    const offset = (Number(page) - 1) * Number(limit);

    const users = await UserModel.findAll({
      attributes: ["id", "username", "email", "role", "created_at", "updated_at"],
      include: [
        { model: ProfileModel, as: "profile" },
        { model: ArticleModel, as: "articles", attributes: ["id", "title"], required: false },
      ],
      order: [[field, direction]],
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

export async function getUserById(req, res) {
  try {
    const { id } = req.params;
    const user = await UserModel.findByPk(id, {
      attributes: ["id", "username", "email", "role", "created_at", "updated_at"],
      include: [
        { model: ProfileModel, as: "profile" },
        { model: ArticleModel, as: "articles", attributes: ["id", "title", "status"] },
      ],
      paranoid: false,
    });
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
    return res.json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
}

export async function updateUser(req, res) {
  try {
    const { id } = req.params;
    let { username, email, role } = req.body;

    const user = await UserModel.findByPk(id);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    if (email) email = String(email).toLowerCase().trim();

    // Chequeos de unicidad explícitos
    if (username) {
      const u = await UserModel.findOne({ where: { username } });
      if (u && u.id !== user.id) return res.status(409).json({ message: "Username ya en uso" });
    }
    if (email) {
      const u = await UserModel.findOne({ where: { email } });
      if (u && u.id !== user.id) return res.status(409).json({ message: "Email ya registrado" });
    }

    if (username) user.username = username;
    if (email) user.email = email;
    if (role) user.role = role;

    await user.save();
    return res.json({ message: "Usuario actualizado" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
}

export async function deleteUser(req, res) {
  try {
    const { id } = req.params;
    const user = await UserModel.findByPk(id);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    await user.destroy(); // paranoid
    return res.json({ message: "Usuario eliminado (lógico)" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
}
