/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { motion } from "framer-motion";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import gsap from "gsap";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [randomImages, setRandomImages] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [imagesPerPage] = useState(10); // Show 10 images per page (2 rows of 5)

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/gallery");
        if (!response.ok) throw new Error("Failed to fetch images");

        const data = await response.json();
        const updatedImages = data.map((img) => ({
          ...img,
          fullURL: `http://localhost:5000${img.imageURL}`,
        }));

        setImages(updatedImages);

        const shuffled = [...updatedImages].sort(() => Math.random() - 0.5);
        setRandomImages(shuffled.slice(0, 6));
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, []);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch("http://localhost:5000/api/gallery", {
      method: "POST",
      body: formData,
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    if (response.ok) {
      const newImage = await response.json();
      newImage.fullURL = `http://localhost:5000${newImage.imageURL}`;
      const updated = [...images, newImage];
      setImages(updated);

      const shuffled = [...updated].sort(() => Math.random() - 0.5);
      setRandomImages(shuffled.slice(0, 6));
    }
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/gallery/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    const updated = images.filter((img) => img._id !== id);
    setImages(updated);

    const shuffled = [...updated].sort(() => Math.random() - 0.5);
    setRandomImages(shuffled.slice(0, 6));
  };

  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = images.slice(indexOfFirstImage, indexOfLastImage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(images.length / imagesPerPage);

  const handleHover = (element) => {
    gsap.to(element, {
      scale: 1.05,
      duration: 0.3,
      ease: "power3.out",
    });
  };

  const handleMouseLeave = (element) => {
    gsap.to(element, {
      scale: 1,
      duration: 0.3,
      ease: "power3.out",
    });
  };

  return (
    <div className="bg-gradient-to-r from-[#FDF9F3] to-[#E8D6BC] text-[#2B1A0F] min-h-screen flex flex-col items-center p-6 mt-15">
      <motion.h1
        className="text-4xl md:text-5xl font-bold text-[#2B1A0F] text-center mb-12"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Gallery
      </motion.h1>

      {isAdmin && (
        <div className="mb-6">
          <label className="bg-[#D9AE4E] hover:bg-[#C89B3C] text-white font-semibold px-4 py-1 rounded-lg cursor-pointer flex items-center shadow-md transition-colors duration-300">
            <FaPlus className="mr-2" /> Add Image
            <input type="file" className="hidden" onChange={handleUpload} />
          </label>
        </div>
      )}

      {isLoading && (
        <div className="flex justify-center items-center w-full h-64">
          <div
            className="spinner-border animate-spin inline-block w-12 h-12 border-4 border-t-4 border-[#D9AE4E] rounded-full"
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {!isLoading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 max-w-6xl w-full">
          {currentImages.map((img) => (
            <div
              key={img._id}
              className="bg-white border border-[#E8D6BC] rounded-xl shadow-md overflow-hidden relative cursor-pointer"
              onMouseEnter={(e) => handleHover(e.currentTarget)}
              onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
            >
              <Zoom>
                <img
                  src={img.fullURL}
                  alt="Gallery item"
                  className="w-full h-56 object-cover"
                  onError={(e) => {
                    console.error("Image failed to load:", e.target.src);
                    e.target.src = "/image.png";
                  }}
                />
              </Zoom>
              {isAdmin && (
                <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 hover:opacity-70 flex justify-center items-center transition-opacity duration-300">
                  <FaTrash
                    className="text-red-600 text-3xl"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(img._id);
                    }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {!isLoading && (
        <div className="flex justify-center mt-6">
          <button
            className="px-4 py-2 mx-2 bg-[#D9AE4E] hover:bg-[#C89B3C] text-white rounded-md"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={`px-4 py-2 mx-2 ${
                currentPage === index + 1
                  ? "bg-[#C89B3C] text-white"
                  : "bg-white text-[#2B1A0F]"
              } border rounded-md`}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button
            className="px-4 py-2 mx-2 bg-[#D9AE4E] hover:bg-[#C89B3C] text-white rounded-md"
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Gallery;
