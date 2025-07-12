import Item from "../models/item.model.js";
import cloudinary from "../lib/cloudinary.js";

export const createItemForSale = async (req, res) => {
  const {
    userId,
    title,
    description,
    category,
    type,
    size,
    condition,
    tags,
    front_image,
    back_image,
    points
  } = req.body;

  try {
    // Validate required fields
    if (
      !userId || !title || !description || !category || !type ||
      !size || !condition || !front_image || !back_image || points === undefined
    ) {
      return res.status(400).json({ message: `Required data missing` });
    }

    if (!Number.isInteger(Number(points)) || Number(points) < 0) {
      return res.status(400).json({ message: "Points must be a non-negative integer" });
    }

    // Upload images to Cloudinary
    const front_image_res = await cloudinary.uploader.upload(front_image);
    const back_image_res = await cloudinary.uploader.upload(back_image);
    const images = [front_image_res.secure_url, back_image_res.secure_url];

    // Create new item
    const item = await Item.create({
      userId,
      title,
      description,
      category,
      type,
      size,
      condition,
      tags,
      images,
      points: Number(points)
    });

    return res.status(200).json({
      message: "New item created",
      item
    });
  } catch (e) {
    console.error("Item creation error:", e);
    return res.status(500).json({ message: `Internal server error: ${e.message}` });
  }
};
