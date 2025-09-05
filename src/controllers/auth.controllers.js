import { sequelize } from "../config/database.js";
import { UserModel } from "../models/user.model.js";
import { ProfileModel } from "../models/profile.model.js";
import { hashPassword, comparePassword } from "../helpers/bcrypt.helper.js";
import { signToken } from "../helpers/jwt.helper.js";

export async function register(req, res) {
  const t = await sequelize.transaction();
  try {
    const { username, email, password, first_name, last_name } = req.body;
    const emailNorm = (email || "").toLowerCase().trim();

    // unicidad explícita
    const existsByEmail = await UserModel.findOne({ where: { email: emailNorm }, transaction: t });
    if (existsByEmail) {
      await t.rollback();
      return res.status(409).json({ message: "Email ya registrado" });
    }
    const existsByUsername = await UserModel.findOne({ where: { username }, transaction: t });
    if (existsByUsername) {
      await t.rollback();
      return res.status(409).json({ message: "Username ya en uso" });
    }

    const hashed = await hashPassword(password);
    const user = await UserModel.create(
      { username, email: emailNorm, password: hashed, role: "user" },
      { transaction: t }
    );

    await ProfileModel.create(
      { user_id: user.id, first_name: first_name?.trim() || null, last_name: last_name?.trim() || null },
      { transaction: t }
    );

    await t.commit();
    return res.status(201).json({ message: "Registrado correctamente" });
  } catch (err) {
    await t.rollback();
    console.error(err);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
}

export async function login(req, res) {
  try {
    const emailNorm = (req.body.email || "").toLowerCase().trim();
    const { password } = req.body;

    const user = await UserModel.findOne({ where: { email: emailNorm } });
    if (!user) return res.status(401).json({ message: "Credenciales inválidas" });

    const ok = await comparePassword(password, user.password);
    if (!ok) return res.status(401).json({ message: "Credenciales inválidas" });

    const token = signToken({ id: user.id, role: user.role });

    const isProd = process.env.NODE_ENV === "production";
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: isProd,
      maxAge: 60 * 60 * 1000, // 1h
    });

    return res.json({ message: "Logueado correctamente" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
}

export async function profile(req, res) {
  try {
    const user = await UserModel.findByPk(req.user.id, {
      attributes: ["id", "username", "email", "role", "created_at", "updated_at"],
      include: [{ model: ProfileModel, as: "profile" }],
    });
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
    return res.json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
}

export async function logout(req, res) {
  res.clearCookie("token");
  return res.json({ message: "Logout correcto" });
}
