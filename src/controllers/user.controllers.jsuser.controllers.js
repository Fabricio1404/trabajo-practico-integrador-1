import { UserModel } from "../models/user.model.js";
import { ProfileModel } from "../models/profile.model.js";
import { ArticleModel } from "../models/article.model.js";


 
//lista usuarios con profile y conteo de artículos
 
export async function getUsers(req, res) {
  try {
    const users = await UserModel.findAll({
      attributes: ["id", "username", "email", "role", "created_at", "updated_at"],
      include: [
        { model: ProfileModel, as: "profile" },
        { model: ArticleModel, as: "articles", attributes: ["id", "title"], required: false },
      ],
      order: [["id", "ASC"]],
    });
    return res.json(users);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
}


 //detalle de un usuario con profile y artículos
 
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



//actualizar username, email, role
 
export async function updateUser(req, res) {
  try {
    const { id } = req.params;
    const { username, email, role } = req.body;

    const user = await UserModel.findByPk(id);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    if (username) user.username = username;
    if (email) user.email = email;
    if (role) user.role = role;

    await user.save();
    return res.json({ message: "Usuario actualizado" });
  } catch (err) {
   
    if (err?.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({ message: "Email o username ya en uso" });
    }
    console.error(err);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
}



 //eliminación lógica (paranoid)
 
export async function deleteUser(req, res) {
  try {
    const { id } = req.params;
    const user = await UserModel.findByPk(id);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    await user.destroy(); 
    return res.json({ message: "Usuario eliminado (lógico)" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
}
