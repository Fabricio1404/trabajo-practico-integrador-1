import { Op } from "sequelize";
import { ArticleModel } from "../models/article.model.js";
import { UserModel } from "../models/user.model.js";
import { TagModel } from "../models/tag.model.js";


export async function createArticle(req, res) {
  try {
    const { title, content, excerpt, status } = req.body;
    const article = await ArticleModel.create({
      title,
      content,
      excerpt: excerpt || null,
      status: status || "published",
      user_id: req.user.id,
    });
    return res.status(201).json({ message: "Artículo creado", id: article.id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
}


export async function getArticles(req, res) {
  try {
    const { q, status = "published", page = 1, limit = 20 } = req.query;
    const where = {};
    if (status) where.status = status;
    if (q) where.title = { [Op.like]: `%${q}%` };

    const offset = (Number(page) - 1) * Number(limit);

    const articles = await ArticleModel.findAll({
      where,
      include: [
        { model: UserModel, as: "author", attributes: ["id", "username", "email"] },
        { model: TagModel, as: "tags", attributes: ["id", "name"], through: { attributes: [] } },
      ],
      order: [["id", "DESC"]],
      limit: Number(limit),
      offset,
    });
    return res.json(articles);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
}


export async function getArticleById(req, res) {
  try {
    const { id } = req.params;
    const article = await ArticleModel.findByPk(id, {
      include: [
        { model: UserModel, as: "author", attributes: ["id", "username", "email"] },
        { model: TagModel, as: "tags", attributes: ["id", "name"], through: { attributes: [] } },
      ],
    });
    if (!article) return res.status(404).json({ message: "Artículo no encontrado" });
    return res.json(article);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
}

export async function getMyArticles(req, res) {
  try {
    const articles = await ArticleModel.findAll({
      where: { user_id: req.user.id },
      include: [{ model: TagModel, as: "tags", attributes: ["id", "name"], through: { attributes: [] } }],
      order: [["id", "DESC"]],
    });
    return res.json(articles);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
}


export async function updateArticle(req, res) {
  try {
    const { id } = req.params;
    const { title, content, excerpt, status } = req.body;

    const article = await ArticleModel.findByPk(id);
    if (!article) return res.status(404).json({ message: "Artículo no encontrado" });

    if (title !== undefined) article.title = title;
    if (content !== undefined) article.content = content;
    if (excerpt !== undefined) article.excerpt = excerpt;
    if (status !== undefined) article.status = status;

    await article.save();
    return res.json({ message: "Artículo actualizado" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
}


export async function deleteArticle(req, res) {
  try {
    const { id } = req.params;
    const article = await ArticleModel.findByPk(id);
    if (!article) return res.status(404).json({ message: "Artículo no encontrado" });

    await article.destroy(); 
    return res.json({ message: "Artículo eliminado" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
}
