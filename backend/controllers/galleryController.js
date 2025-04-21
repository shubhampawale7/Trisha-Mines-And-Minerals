import Gallery from "../models/Gallery.js"; // Import Gallery model
import fs from "fs";
import path from "path";
import multer from "multer";

// ✅ Setup Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// ✅ Upload an Image
const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const newImage = new Gallery({
      imageURL: `/uploads/${req.file.filename}`,
    });

    await newImage.save();
    res.status(201).json(newImage);
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Fetch All Images
const getImages = async (req, res) => {
  try {
    const images = await Gallery.find();
    res.json(images);
  } catch (error) {
    console.error("Error fetching images:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Delete an Image
const deleteImage = async (req, res) => {
  try {
    const image = await Gallery.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    const filePath = path.join("uploads", image.imageURL.split("/").pop());
    fs.unlink(filePath, async (err) => {
      if (err) {
        console.error("Error deleting file:", err);
      }
      await image.deleteOne();
      res.json({ message: "Image deleted successfully" });
    });
  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Export Functions & Upload Middleware
export { upload, uploadImage, getImages, deleteImage };
