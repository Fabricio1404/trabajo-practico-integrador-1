export function ownerMiddleware(getOwnerIdFromResource) {
  return async (req, res, next) => {
    try {
      const ownerId = await getOwnerIdFromResource(req);
      const isOwner = Number(ownerId) === Number(req.user?.id);
      const isAdmin = req.user?.role === "admin";
      if (!isOwner && !isAdmin) {
        return res.status(403).json({ message: "No autorizado (owner/admin requerido)" });
      }
      next();
    } catch (err) {
      next(err);
    }
  };
}
