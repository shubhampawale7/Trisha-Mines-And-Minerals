import { useState, useEffect } from "react";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen text-white p-8">
      <h1 className="text-4xl text-yellow-400 font-bold text-center mb-8">
        Our Products
      </h1>
      <div className="grid md:grid-cols-3 gap-8">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product._id}
              className="bg-gray-800 p-6 rounded-lg shadow-lg"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-yellow-400 mt-2">{product.price} INR</p>
              <p className="mt-2">{product.description}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400">No products available</p>
        )}
      </div>
    </div>
  );
};

export default Products;
