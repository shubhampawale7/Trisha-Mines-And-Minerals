/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHammer, FaIndustry, FaMountain, FaHandshake } from "react-icons/fa";
import { motion } from "framer-motion";
import miningBg from "../assets/mining-bg.jpg";

const Home = () => {
  useEffect(() => {
    document.title = "Trishha Mines & Minerals | Home";
  }, []);

  return (
    <div className="bg-gray-100">
      {/* Hero Section */}
      <div
        className="relative h-screen flex items-center justify-center text-white text-center"
        style={{
          backgroundImage: `url(${miningBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <motion.div
          className="z-10 p-6"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl font-bold drop-shadow-lg">
            Unleashing the Power of Minerals
          </h1>
          <p className="mt-4 text-lg max-w-xl mx-auto drop-shadow-md">
            Delivering premium quality minerals for industrial and commercial
            use. Strengthen your business with the best.
          </p>
          <Link
            to="/contact"
            className="mt-6 inline-block bg-yellow-500 px-6 py-3 rounded-lg text-lg font-semibold shadow-lg hover:bg-yellow-600 transition"
          >
            Get a Quote
          </Link>
        </motion.div>
      </div>

      {/* Services Section */}
      <div className="py-16 bg-white text-gray-900">
        <h2 className="text-4xl font-bold text-center mb-10">Our Services</h2>
        <div className="flex flex-wrap justify-center gap-8 px-6">
          {[
            {
              icon: FaHammer,
              title: "Mining Operations",
              description:
                "State-of-the-art mining services ensuring quality and efficiency.",
            },
            {
              icon: FaIndustry,
              title: "Mineral Processing",
              description:
                "Advanced techniques for refining and delivering top-grade minerals.",
            },
            {
              icon: FaMountain,
              title: "Exploration",
              description:
                "Geological surveys and extraction planning for sustainable mining.",
            },
            {
              icon: FaHandshake,
              title: "Partnerships",
              description:
                "Collaborating with industries worldwide to supply the best resources.",
            },
          ].map((service, index) => (
            <motion.div
              key={index}
              className="w-full md:w-1/4 bg-gray-100 p-6 rounded-lg shadow-lg text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
            >
              <service.icon className="text-5xl text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* About Section */}
      <div className="py-16 px-6 bg-gray-800 text-white text-center">
        <h2 className="text-4xl font-bold mb-6">About Us</h2>
        <p className="max-w-3xl mx-auto text-lg">
          Trishha Mines & Minerals is a leading provider of high-quality
          minerals, delivering excellence in mining, refining, and supply chain
          solutions. We focus on sustainability and efficiency to serve
          industries worldwide.
        </p>
      </div>

      {/* Call to Action */}
      <div className="py-16 text-center bg-yellow-500 text-white">
        <h2 className="text-4xl font-bold">
          Looking for High-Quality Minerals?
        </h2>
        <p className="mt-4 text-lg">
          Partner with us for premium resources and reliable service.
        </p>
        <Link
          to="/contact"
          className="mt-6 inline-block bg-white text-yellow-500 px-6 py-3 rounded-lg text-lg font-semibold shadow-lg hover:bg-gray-200 transition"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
};

export default Home;
