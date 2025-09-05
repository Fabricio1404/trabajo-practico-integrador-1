import { verifyToken } from "../helpers/jwt.helper.js";

export function authMiddleware(req, res, next) {
  try {
    const token = req.cookies?.token;
    if (!token) return res.status(401).json({ message: "No autenticado" });
    const payload = verifyToken(token);
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token inválido o expirado" });
  }
}
