import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema({
  title: { type: String, required: true },
  imageURL: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now },
});

const Gallery = mongoose.model("Gallery", gallerySchema);
export default Gallery;
