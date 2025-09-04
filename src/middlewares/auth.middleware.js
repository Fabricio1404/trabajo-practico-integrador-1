import { verifyToken } from "../helpers/jwt.helper.js";
export const authMiddleware = (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token) return res.status(401).json({ msg: "No autenticado" });
    const payload = verifyToken(token);
    req.user = payload;
    next();
  } catch (e) {
    return res.status(401).json({ msg: "Token inválido" });
  }
};
