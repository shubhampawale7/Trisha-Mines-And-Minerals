/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash, FaGem } from "react-icons/fa";
import { motion } from "framer-motion";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
  });
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await fetch("http://localhost:5000/api/products");
    const data = await response.json();
    setProducts(data);
  };

  const handleAddProduct = async () => {
    const token = localStorage.getItem("token"); // Get token

    if (!token) {
      alert("You must be logged in as an admin to add products.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Attach token
        },
        body: JSON.stringify({
          name: "New Product",
          price: 100,
          category: "Minerals",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add product");
      }

      const data = await response.json();
      console.log("Product added:", data);
    } catch (error) {
      console.error("Error:", error);
      alert("Error adding product. Check console.");
    }
  };

  const handleEditProduct = async () => {
    const response = await fetch(
      `http://localhost:5000/api/products/${editingProduct._id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingProduct),
      }
    );
    if (response.ok) {
      setEditingProduct(null);
      fetchProducts();
    }
  };

  const handleDeleteProduct = async (id) => {
    await fetch(`http://localhost:5000/api/products/${id}`, {
      method: "DELETE",
    });
    fetchProducts();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-10 px-4 mt-15">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-yellow-400 flex items-center gap-2">
          <FaGem /> Manage Products
        </h1>

        {/* Add Product */}
        <div className="bg-gray-800 p-6 mt-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
          <input
            type="text"
            placeholder="Product Name"
            className="w-full mb-2 p-2 rounded bg-gray-700"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Price"
            className="w-full mb-2 p-2 rounded bg-gray-700"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
          />
          <textarea
            placeholder="Description"
            className="w-full mb-2 p-2 rounded bg-gray-700"
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
          />
          <button
            onClick={handleAddProduct}
            className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <FaPlus /> Add Product
          </button>
        </div>

        {/* Product List */}
        <div className="mt-6">
          {products.map((product) => (
            <motion.div
              key={product._id}
              className="bg-gray-800 p-4 rounded-lg mb-4 flex justify-between items-center"
              whileHover={{ scale: 1.02 }}
            >
              <div>
                <h3 className="text-xl font-semibold text-yellow-400">
                  {product.name}
                </h3>
                <p className="text-gray-400">{product.description}</p>
                <p className="text-gray-300 font-bold">${product.price}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setEditingProduct(product)}
                  className="bg-blue-500 px-3 py-2 rounded-lg hover:bg-blue-600"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDeleteProduct(product._id)}
                  className="bg-red-500 px-3 py-2 rounded-lg hover:bg-red-600"
                >
                  <FaTrash />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Edit Product Modal */}
        {editingProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <motion.div
              className="bg-gray-900 p-6 rounded-lg shadow-lg w-96"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
            >
              <h2 className="text-xl font-semibold mb-4">Edit Product</h2>
              <input
                type="text"
                className="w-full mb-2 p-2 rounded bg-gray-700"
                value={editingProduct.name}
                onChange={(e) =>
                  setEditingProduct({ ...editingProduct, name: e.target.value })
                }
              />
              <input
                type="text"
                className="w-full mb-2 p-2 rounded bg-gray-700"
                value={editingProduct.price}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    price: e.target.value,
                  })
                }
              />
              <textarea
                className="w-full mb-2 p-2 rounded bg-gray-700"
                value={editingProduct.description}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    description: e.target.value,
                  })
                }
              />
              <div className="flex gap-2">
                <button
                  onClick={handleEditProduct}
                  className="bg-green-500 px-4 py-2 rounded-lg hover:bg-green-600"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingProduct(null)}
                  className="bg-gray-500 px-4 py-2 rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageProducts;
