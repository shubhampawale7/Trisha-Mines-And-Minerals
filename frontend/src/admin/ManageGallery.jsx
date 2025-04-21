/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "../styles/gallery.css";

const ManageGallery = () => {
  const [images, setImages] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/gallery");
      if (!response.ok) throw new Error("Failed to fetch images");

      const data = await response.json();
      const updatedImages = data.map((img) => ({
        ...img,
        fullURL: `http://localhost:5000${img.imageURL}`, // Ensure full path
      }));

      setImages(updatedImages);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select an image to upload.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await fetch("http://localhost:5000/api/gallery", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      fetchImages(); // Refresh gallery after upload
      setSelectedFile(null);
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setDeleteLoading(id); // Disable button during deletion

    try {
      const response = await fetch(`http://localhost:5000/api/gallery/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete image");
      }

      setImages((prevImages) => prevImages.filter((img) => img._id !== id));
    } catch (error) {
      console.error("Error deleting image:", error);
    } finally {
      setDeleteLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDF9F3] text-white p-6 mt-18">
      <h1 className="text-3xl font-bold mb-4 text-yellow-500">
        Manage Gallery
      </h1>

      {/* Upload Section */}
      <div className="bg-[#fbebd5] p-4 rounded-lg shadow-lg mb-6 text-black">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full text-sm text-black"
        />
        <button
          onClick={handleUpload}
          className={`mt-3 bg-yellow-500 px-4 py-2 rounded-lg hover:bg-yellow-600 transition ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload Image"}
        </button>
      </div>

      {/* Display Images */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((img) => (
          <motion.div
            key={img._id}
            className="relative bg-gray-700 p-2 rounded-lg"
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={img.fullURL} // Use the full URL
              alt={img.title || "Gallery Image"}
              className="w-full h-48 object-cover rounded-lg"
            />
            <button
              onClick={() => handleDelete(img._id)}
              className={`absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-full ${
                deleteLoading === img._id ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={deleteLoading === img._id}
            >
              {deleteLoading === img._id ? "Deleting..." : "✕"}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ManageGallery;
