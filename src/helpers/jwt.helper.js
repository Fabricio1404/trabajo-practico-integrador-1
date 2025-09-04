import jwt from "jsonwebtoken";
export const signToken = (payload) => jwt.sign(payload, "secretito", { expiresIn: "1h" });
export const verifyToken = (token) => jwt.verify(token, "secretito");
