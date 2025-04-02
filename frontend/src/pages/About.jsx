/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { FaGem, FaMountain, FaTruckMoving } from "react-icons/fa";

const About = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center p-8 mt-9 ">
      {/* Page Heading */}
      <motion.h1
        className="text-4xl md:text-5xl font-bold mb-6 text-yellow-400"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        About Trishha Mines & Minerals
      </motion.h1>

      {/* Main Content */}
      <motion.div
        className="max-w-5xl text-lg md:text-xl text-center leading-relaxed"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <p className="mb-6">
          At{" "}
          <span className="text-yellow-500 font-semibold">
            Trishha Mines & Minerals
          </span>
          , we are dedicated to the responsible extraction, processing, and
          delivery of high-quality minerals. With a strong commitment to
          sustainability and innovation, we ensure that every step of our mining
          process meets the highest industry standards.
        </p>
        <p>
          Our expertise spans across mineral exploration, mining, logistics, and
          international trade, making us a leading force in the industry.
        </p>
      </motion.div>

      {/* Feature Sections */}
      <div className="grid md:grid-cols-3 gap-8 mt-12">
        {/* Mining */}
        <motion.div
          className="bg-gray-800 p-6 rounded-lg text-center flex flex-col items-center shadow-lg"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <FaMountain className="text-yellow-400 text-5xl mb-3" />
          <h2 className="text-2xl font-semibold">Premium Mining</h2>
          <p className="mt-2">
            We extract high-quality minerals using advanced mining techniques
            with minimal environmental impact.
          </p>
        </motion.div>

        {/* Processing */}
        <motion.div
          className="bg-gray-800 p-6 rounded-lg text-center flex flex-col items-center shadow-lg"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <FaGem className="text-yellow-400 text-5xl mb-3" />
          <h2 className="text-2xl font-semibold">Refined Processing</h2>
          <p className="mt-2">
            Our cutting-edge processing ensures purity and consistency in every
            batch of minerals.
          </p>
        </motion.div>

        {/* Logistics */}
        <motion.div
          className="bg-gray-800 p-6 rounded-lg text-center flex flex-col items-center shadow-lg"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <FaTruckMoving className="text-yellow-400 text-5xl mb-3" />
          <h2 className="text-2xl font-semibold">Efficient Logistics</h2>
          <p className="mt-2">
            Our robust supply chain ensures safe and timely delivery of minerals
            worldwide.
          </p>
        </motion.div>
      </div>

      {/* Call to Action */}
      <motion.div
        className="mt-12"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        <a
          href="/contact"
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold text-lg px-6 py-3 rounded-lg transition"
        >
          Contact Us for Business
        </a>
      </motion.div>
    </div>
  );
};

export default About;
