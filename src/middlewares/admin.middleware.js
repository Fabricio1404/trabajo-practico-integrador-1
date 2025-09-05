export function adminMiddleware(req, res, next) {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ message: "No autorizado (admin requerido)" });
  }
  next();
}
