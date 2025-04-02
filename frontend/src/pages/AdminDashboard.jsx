import { useState, useEffect } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/products", form);
    alert("Product added!");
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="p-2 border rounded w-full"
          type="text"
          name="name"
          placeholder="Product Name"
          onChange={handleChange}
          required
        />
        <input
          className="p-2 border rounded w-full"
          type="text"
          name="description"
          placeholder="Description"
          onChange={handleChange}
          required
        />
        <input
          className="p-2 border rounded w-full"
          type="number"
          name="price"
          placeholder="Price"
          onChange={handleChange}
          required
        />
        <input
          className="p-2 border rounded w-full"
          type="text"
          name="imageUrl"
          placeholder="Image URL"
          onChange={handleChange}
          required
        />
        <button className="bg-green-500 text-white p-2 rounded" type="submit">
          Add Product
        </button>
      </form>
      <div className="mt-6">
        <h3 className="text-xl font-bold">Products</h3>
        <ul>
          {products.map((product) => (
            <li key={product._id} className="p-2 border-b">
              {product.name} - ₹{product.price}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
