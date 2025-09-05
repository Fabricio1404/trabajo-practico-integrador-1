import { TagModel } from "../models/tag.model.js";
import { ArticleModel } from "../models/article.model.js";

export async function createTag(req, res) {
  try {
    const { name } = req.body;

    const exists = await TagModel.findOne({ where: { name } });
    if (exists) return res.status(409).json({ message: "La etiqueta ya existe" });

    await TagModel.create({ name });
    return res.status(201).json({ message: "Etiqueta creada" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
}


export async function getTags(req, res) {
  try {
    const { page = 1, limit = 20, sort = "id:ASC" } = req.query;
    const allowedSortFields = ["id", "name", "created_at", "updated_at"];
    const [fieldRaw, directionRaw] = String(sort).split(":");
    const field = allowedSortFields.includes(fieldRaw) ? fieldRaw : "id";
    const direction = String(directionRaw).toUpperCase() === "DESC" ? "DESC" : "ASC";
    const offset = (Number(page) - 1) * Number(limit);

    const tags = await TagModel.findAll({
      order: [[field, direction]],
      limit: Number(limit),
      offset,
    });

    return res.json({
      page: Number(page),
      limit: Number(limit),
      sort: `${field}:${direction}`,
      data: tags,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
}


export async function getTagById(req, res) {
  try {
    const { id } = req.params;
    const tag = await TagModel.findByPk(id, {
      include: [{ model: ArticleModel, as: "articles", attributes: ["id", "title"] }],
    });
    if (!tag) return res.status(404).json({ message: "Etiqueta no encontrada" });
    return res.json(tag);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
}

export async function updateTag(req, res) {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const tag = await TagModel.findByPk(id);
    if (!tag) return res.status(404).json({ message: "Etiqueta no encontrada" });

    if (name) {
      const exists = await TagModel.findOne({ where: { name } });
      if (exists && exists.id !== tag.id) {
        return res.status(409).json({ message: "La etiqueta ya existe" });
      }
      tag.name = name.trim();
    }

    await tag.save();
    return res.json({ message: "Etiqueta actualizada" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
}

export async function deleteTag(req, res) {
  try {
    const { id } = req.params;
    const tag = await TagModel.findByPk(id);
    if (!tag) return res.status(404).json({ message: "Etiqueta no encontrada" });

    await tag.destroy(); 
    return res.json({ message: "Etiqueta eliminada" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
}
