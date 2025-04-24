/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useDropzone } from "react-dropzone";
import ReactPaginate from "react-paginate";
import { Loader2, Trash2, UploadCloud } from "lucide-react";
import { toast } from "sonner";
import GalleryConfirmationModal from "../components/GalleryConfirmationModal";
import "../styles/gallery.css";

const ITEMS_PER_PAGE = 10;

const ManageGallery = () => {
  const [images, setImages] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showUploadConfirm, setShowUploadConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/gallery");
      const data = await response.json();
      const updated = data.map((img) => ({
        ...img,
        fullURL: `http://localhost:5000${img.imageURL}`,
      }));
      setImages(updated);
    } catch (error) {
      toast.error("Failed to load gallery.");
    }
  };

  const handleFileChange = (file) => {
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    if (!selectedFile) return toast.error("Please select an image to upload.");
    setLoading(true);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append("image", selectedFile);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:5000/api/gallery", true);

    xhr.upload.onprogress = (e) => {
      setUploadProgress(Math.round((e.loaded * 100) / e.total));
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        fetchImages();
        setSelectedFile(null);
        setPreview(null);
        toast.success("Image uploaded successfully.");
      } else {
        toast.error("Upload failed.");
      }
      setLoading(false);
    };

    xhr.onerror = () => {
      toast.error("Upload failed.");
      setLoading(false);
    };

    xhr.send(formData);
  };

  const handleDelete = async () => {
    setDeleteLoading(deleteTargetId);
    try {
      const res = await fetch(
        `http://localhost:5000/api/gallery/${deleteTargetId}`,
        { method: "DELETE" }
      );
      if (!res.ok) throw new Error();
      setImages((prev) => prev.filter((img) => img._id !== deleteTargetId));
      toast.success("Image deleted.");
    } catch (error) {
      toast.error("Failed to delete.");
    } finally {
      setDeleteLoading(null);
      setShowDeleteConfirm(false);
      setDeleteTargetId(null);
    }
  };

  const handleBulkDelete = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/gallery/bulk-delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: selectedIds }),
      });
      if (!res.ok) throw new Error();
      setImages((prev) => prev.filter((img) => !selectedIds.includes(img._id)));
      setSelectedIds([]);
      setShowConfirm(false);
      toast.success("Selected images deleted.");
    } catch (error) {
      toast.error("Bulk delete failed.");
    }
  };

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    const currentPageIds = paginatedImages.map((img) => img._id);
    const allSelected = currentPageIds.every((id) => selectedIds.includes(id));
    setSelectedIds((prev) =>
      allSelected
        ? prev.filter((id) => !currentPageIds.includes(id))
        : [...new Set([...prev, ...currentPageIds])]
    );
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
    onDrop: (accepted) => {
      if (accepted?.[0]) handleFileChange(accepted[0]);
    },
  });

  const startIndex = currentPage * ITEMS_PER_PAGE;
  const pageCount = Math.ceil(images.length / ITEMS_PER_PAGE);
  const paginatedImages = images.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const allCurrentSelected = paginatedImages.every((img) =>
    selectedIds.includes(img._id)
  );

  return (
    <div className="min-h-screen bg-[#fefaf6] text-gray-800 p-6 font-sans pt-25">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-yellow-600 drop-shadow-md">
        🖼️ Manage Gallery
      </h1>

      {/* Upload Section */}
      <div className="bg-white shadow-xl border border-yellow-100 rounded-2xl p-6 mb-10">
        <div
          {...getRootProps()}
          className="border-2 border-dashed border-yellow-300 rounded-lg p-6 text-center cursor-pointer"
        >
          <input {...getInputProps()} />
          <p className="text-sm text-gray-600">
            Drag & drop an image here, or click to select
          </p>
        </div>

        {preview && (
          <div className="mt-4 text-center">
            <img
              src={preview}
              alt="Preview"
              className="mx-auto h-40 rounded-lg shadow"
            />
          </div>
        )}

        {loading && (
          <div className="w-full bg-gray-200 rounded-full h-2 mt-4 overflow-hidden">
            <div
              className="bg-yellow-500 h-2 rounded-full transition-all duration-300 ease-in-out"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        )}

        <button
          onClick={() => setShowUploadConfirm(true)}
          disabled={loading || !selectedFile}
          className={`w-full mt-4 flex items-center justify-center gap-2 bg-yellow-500 text-white font-semibold py-2 px-4 rounded-lg transition hover:bg-yellow-600 ${
            loading || !selectedFile ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? (
            <Loader2 className="animate-spin w-4 h-4" />
          ) : (
            <UploadCloud className="w-4 h-4" />
          )}
          {loading ? "Uploading..." : "Upload Image"}
        </button>
      </div>

      {/* Bulk Delete & Select All */}
      {paginatedImages.length > 0 && (
        <div className="flex justify-between items-center mb-4 px-1">
          <label className="flex items-center gap-2 text-sm font-medium">
            <input
              type="checkbox"
              checked={allCurrentSelected}
              onChange={toggleSelectAll}
            />
            Select All on Page
          </label>
          {selectedIds.length > 0 && (
            <button
              onClick={() => setShowConfirm(true)}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg"
            >
              Delete {selectedIds.length} Selected
            </button>
          )}
        </div>
      )}

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">
        {paginatedImages.map((img) => (
          <motion.div
            key={img._id}
            className="relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.02 }}
          >
            <img
              src={img.fullURL}
              alt={img.title || "Gallery Image"}
              className="w-full h-52 object-cover rounded-t-xl"
            />
            <input
              type="checkbox"
              className="absolute top-3 left-3 w-5 h-5"
              checked={selectedIds.includes(img._id)}
              onChange={() => toggleSelect(img._id)}
            />
            <button
              onClick={() => {
                setDeleteTargetId(img._id);
                setShowDeleteConfirm(true);
              }}
              disabled={deleteLoading === img._id}
              className={`absolute top-3 right-3 flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded-full shadow ${
                deleteLoading === img._id ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {deleteLoading === img._id ? (
                <Loader2 className="animate-spin w-4 h-4" />
              ) : (
                <Trash2 className="w-4 h-4" />
              )}
              {deleteLoading === img._id ? "Deleting..." : "Delete"}
            </button>
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-10 flex justify-center">
        <ReactPaginate
          previousLabel={"← Prev"}
          nextLabel={"Next →"}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={1}
          pageRangeDisplayed={2}
          onPageChange={({ selected }) => setCurrentPage(selected)}
          containerClassName="flex gap-2"
          pageClassName="px-3 py-1 bg-yellow-200 rounded hover:bg-yellow-300 cursor-pointer"
          activeClassName="bg-yellow-500 text-white"
          previousClassName="px-3 py-1 bg-yellow-300 rounded hover:bg-yellow-400 cursor-pointer"
          nextClassName="px-3 py-1 bg-yellow-300 rounded hover:bg-yellow-400 cursor-pointer"
          disabledClassName="opacity-50 cursor-not-allowed"
        />
      </div>

      {/* Confirmation Modals */}
      <GalleryConfirmationModal
        isOpen={showConfirm}
        title="Confirm Deletion"
        message={`Are you sure you want to delete ${selectedIds.length} selected image(s)?`}
        onCancel={() => setShowConfirm(false)}
        onConfirm={handleBulkDelete}
        confirmText="Delete"
        confirmColor="bg-red-600 hover:bg-red-700"
      />

      <GalleryConfirmationModal
        isOpen={showUploadConfirm}
        title="Confirm Upload"
        message="Are you sure you want to upload this image?"
        onCancel={() => setShowUploadConfirm(false)}
        onConfirm={() => {
          setShowUploadConfirm(false);
          handleUpload();
        }}
        confirmText="Upload"
        confirmColor="bg-yellow-600 hover:bg-yellow-700"
      />

      <GalleryConfirmationModal
        isOpen={showDeleteConfirm}
        title="Delete Image"
        message="Are you sure you want to delete this image?"
        onCancel={() => setShowDeleteConfirm(false)}
        onConfirm={handleDelete}
        confirmText="Delete"
        confirmColor="bg-red-600 hover:bg-red-700"
      />
    </div>
  );
};

export default ManageGallery;
