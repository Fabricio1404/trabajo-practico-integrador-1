import { ArticleModel } from "../models/article.model.js";
import { TagModel } from "../models/tag.model.js";
import { ArticleTagModel } from "../models/article_tag.model.js";



 
 //Crea el vínculo N:M (si no existe)
 
export async function addTagToArticle(req, res) {
  try {
    const { article_id, tag_id } = req.body;

    // Verificar existencia
    const article = await ArticleModel.findByPk(article_id, { attributes: ["id"] });
    if (!article) return res.status(404).json({ message: "Artículo no encontrado" });

    const tag = await TagModel.findByPk(tag_id, { attributes: ["id"] });
    if (!tag) return res.status(404).json({ message: "Etiqueta no encontrada" });

    // Evitar duplicado
    const exists = await ArticleTagModel.findOne({ where: { article_id, tag_id } });
    if (exists) return res.status(409).json({ message: "El artículo ya tiene esa etiqueta" });

    const at = await ArticleTagModel.create({ article_id, tag_id });
    return res.status(201).json({ message: "Etiqueta agregada al artículo", id: at.id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
}

// Elimina el vínculo N:M por su id
 
export async function removeTagFromArticle(req, res) {
  try {
    const { id } = req.params;

    const at = await ArticleTagModel.findByPk(id);
    if (!at) return res.status(404).json({ message: "Vínculo artículo-etiqueta no encontrado" });

    await at.destroy();
    return res.json({ message: "Etiqueta removida del artículo" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
}
