import jwt from "jsonwebtoken";

const { JWT_SECRET = "cambia_este_secreto" } = process.env;

// Firma un token con payload { id, role })
export function signToken(payload, options = {}) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h", ...options });
}

// Verifica y devuelve el payload del token
export function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}
