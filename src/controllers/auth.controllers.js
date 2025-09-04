import { UserModel } from "../models/user.model.js";
import { ProfileModel } from "../models/profile.model.js";
import { hashPassword, comparePassword } from "../helpers/bcrypt.helper.js";
import { signToken } from "../helpers/jwt.helper.js";

export const register = async (req, res) => {
  try {
    const { username, email, password, first_name, last_name } = req.body;
    const hashed = await hashPassword(password);
    const user = await UserModel.create({ username, email, password: hashed });
    await ProfileModel.create({ user_id: user.id, first_name, last_name });
    return res.status(201).json({ msg: "Registrado correctamente" });
  } catch (e) {
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ where: { email } });
    if (!user) return res.status(401).json({ msg: "Credenciales inválidas" });
    const ok = await comparePassword(password, user.password);
    if (!ok) return res.status(401).json({ msg: "Credenciales inválidas" });
    const token = signToken({ id: user.id, role: user.role });
    res.cookie("token", token, { httpOnly: true });
    return res.json({ msg: "Logueado correctamente" });
  } catch (e) {
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const profile = async (req, res) => {
  return res.json({ msg: "Perfil del usuario autenticado (por implementar include de profile)" });
};

export const logout = async (req, res) => {
  res.clearCookie("token");
  return res.json({ msg: "Logout correcto" });
};
