/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import {
  FaMountain,
  FaTruckMoving,
  FaIndustry,
  FaTools,
  FaGlobe,
  FaHandshake,
} from "react-icons/fa";

const servicesData = [
  {
    title: "Mining & Exploration",
    description:
      "We conduct efficient and sustainable mining operations using advanced technology.",
    icon: <FaMountain className="text-yellow-400 text-6xl mb-4" />,
  },
  {
    title: "Mineral Processing",
    description:
      "Our state-of-the-art facilities ensure the highest purity and consistency of minerals.",
    icon: <FaIndustry className="text-yellow-400 text-6xl mb-4" />,
  },
  {
    title: "Global Logistics",
    description:
      "We provide seamless logistics and export minerals worldwide with precision and speed.",
    icon: <FaTruckMoving className="text-yellow-400 text-6xl mb-4" />,
  },
  {
    title: "Quality Assurance",
    description:
      "We adhere to the highest industry standards and certifications for premium quality.",
    icon: <FaTools className="text-yellow-400 text-6xl mb-4" />,
  },
  {
    title: "International Trade",
    description:
      "We facilitate trade and partnerships with leading global industries and markets.",
    icon: <FaGlobe className="text-yellow-400 text-6xl mb-4" />,
  },
  {
    title: "Consulting Services",
    description:
      "We offer expert guidance on mineral sourcing, investment, and environmental sustainability.",
    icon: <FaHandshake className="text-yellow-400 text-6xl mb-4" />,
  },
];

const Services = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center p-8 mt-15">
      {/* Heading */}
      <motion.h1
        className="text-4xl md:text-5xl font-bold text-yellow-400 text-center mb-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Our Services
      </motion.h1>

      {/* Service Cards */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl">
        {servicesData.map((service, index) => (
          <motion.div
            key={index}
            className="bg-gray-800 p-6 rounded-lg flex flex-col items-center text-center shadow-lg"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            {service.icon}
            <h2 className="text-2xl font-semibold">{service.title}</h2>
            <p className="mt-2">{service.description}</p>
          </motion.div>
        ))}
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
          Get a Quote
        </a>
      </motion.div>
    </div>
  );
};

export default Services;
