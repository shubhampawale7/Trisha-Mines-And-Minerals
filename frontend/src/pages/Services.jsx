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
      "We conduct efficient and sustainable mining operations using advanced technology. Our teams explore new deposits, ensuring sustainable mining practices while leveraging state-of-the-art equipment to maximize efficiency.",
    icon: <FaMountain className="text-[#D9AE4E] text-4xl mb-4" />,
  },
  {
    title: "Mineral Processing",
    description:
      "Our state-of-the-art facilities ensure the highest purity and consistency of minerals. From extraction to refining, we use cutting-edge techniques to deliver minerals that meet the global standards of quality.",
    icon: <FaIndustry className="text-[#D9AE4E] text-4xl mb-4" />,
  },
  {
    title: "Global Logistics",
    description:
      "We provide seamless logistics and export minerals worldwide with precision and speed. Our global network ensures timely delivery, whether by air, land, or sea, with real-time tracking for your peace of mind.",
    icon: <FaTruckMoving className="text-[#D9AE4E] text-4xl mb-4" />,
  },
  {
    title: "Quality Assurance",
    description:
      "We adhere to the highest industry standards and certifications for premium quality. Our team rigorously tests every mineral batch, ensuring they meet all international quality control and environmental standards.",
    icon: <FaTools className="text-[#D9AE4E] text-4xl mb-4" />,
  },
  {
    title: "International Trade",
    description:
      "We facilitate trade and partnerships with leading global industries and markets. Our business connects regions worldwide, promoting ethical trade practices, ensuring compliance with regulations, and delivering minerals where they're needed most.",
    icon: <FaGlobe className="text-[#D9AE4E] text-4xl mb-4" />,
  },
  {
    title: "Consulting Services",
    description:
      "We offer expert guidance on mineral sourcing, investment, and environmental sustainability. Whether you're a startup or an established company, we provide tailored advice on mineral acquisition, market trends, and eco-friendly practices.",
    icon: <FaHandshake className="text-[#D9AE4E] text-4xl mb-4" />,
  },
];

const Services = () => {
  return (
    <div className="bg-gradient-to-r from-[#FDF9F3] to-[#E8D6BC] text-[#2B1A0F] min-h-screen flex flex-col items-center p-8 mt-15">
      {/* Heading */}
      <motion.h1
        className="text-4xl md:text-5xl font-extrabold text-[#2B1A0F] text-center mb-12 tracking-wide"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Our Premium Services
      </motion.h1>

      {/* Service Cards */}
      <div className="grid md:grid-cols-3 gap-10 max-w-6xl w-full">
        {servicesData.map((service, index) => (
          <motion.div
            key={index}
            className="bg-[#FDF1D6] text-[#2B1A0F] border-4 border-[#E5C789] p-6 rounded-full shadow-xl flex flex-col items-center text-center transform transition-all duration-500 hover:shadow-2xl hover:scale-110 hover:border-[#D9AE4E]"
            whileInView={{ scale: [1, 1.05], opacity: [0.8, 1] }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
            }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            {service.icon}
            <h2 className="text-2xl font-bold mb-4">{service.title}</h2>
            <p className="text-sm text-[#4B2E1B] mb-6">{service.description}</p>
          </motion.div>
        ))}
      </div>

      {/* New Section: Why Choose Us */}
      <motion.div
        className="bg-[#D9AE4E] text-white py-12 px-6 rounded-xl max-w-5xl w-full text-center mt-20 shadow-xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        <h2 className="text-3xl font-semibold mb-6">
          Why Choose Trishha Mines & Minerals?
        </h2>
        <p className="text-lg">
          With decades of experience in the mining industry, we bring unmatched
          expertise and commitment to quality. Our sustainable practices,
          advanced technology, and global logistics network ensure that we meet
          your needs with the highest standards of excellence.
        </p>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        className="mt-14"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <a
          href="/contact"
          className="bg-[#2B1A0F] hover:bg-[#4B2E1B] text-white font-semibold text-lg px-8 py-4 rounded-full shadow-md transition-colors duration-300 transform hover:scale-105"
        >
          Get a Quote
        </a>
      </motion.div>
    </div>
  );
};

export default Services;
