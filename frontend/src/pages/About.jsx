/* eslint-disable no-unused-vars */
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaGem, FaMountain, FaTruckMoving } from "react-icons/fa";

const About = () => {
  const expertiseRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: expertiseRef });

  // Scaling effect on Expertise section
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);

  // Scroll-based fade-in effect for each feature item
  const featureOpacity = useTransform(scrollYProgress, [0, 0.3, 1], [0, 1, 1]);

  return (
    <div className="relative bg-gradient-to-br from-[#FDF9F3] to-[#D9AE4E] text-[#2B1A0F] min-h-screen flex flex-col items-center p-8 mt-15">
      {/* Page Heading with scroll animation */}
      <motion.h1
        className="text-4xl md:text-5xl font-bold text-[#2B1A0F] text-center mb-12 leading-tight transform transition-all hover:scale-105 hover:text-[#D9AE4E]"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        About Trishha Mines & Minerals
      </motion.h1>

      {/* Main Content with scroll-based opacity */}
      <motion.div
        className="max-w-5xl text-base md:text-lg text-center leading-relaxed text-[#2B1A0F] mb-8"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <p className="mb-6">
          At{" "}
          <span className="text-[#D9AE4E] font-semibold">
            Trishha Mines & Minerals
          </span>
          , we pride ourselves on being an industry leader in mining,
          processing, and delivering high-quality minerals across the globe. We
          are committed to responsible mining practices and innovative solutions
          that help us meet the needs of our clients while ensuring
          sustainability for future generations.
        </p>
        <p className="mb-6">
          Founded with a vision to change the landscape of mineral extraction
          and trading, our company is driven by a passion for excellence. Our
          expertise spans the entire mining cycle—from exploration and
          extraction to processing and delivery—making us your trusted partner
          in the mineral industry.
        </p>
        <p>
          With our strong values and commitment to sustainable practices, we
          ensure that our business not only benefits our clients but also the
          communities in which we operate. We aim to make a positive impact by
          delivering minerals that are both high in quality and sourced
          responsibly.
        </p>
      </motion.div>

      {/* Vision Section with scroll-based animation */}
      <motion.div
        className="bg-[#D9AE4E] text-white py-12 px-6 rounded-xl max-w-5xl w-full text-center mt-20 shadow-lg"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        <h2 className="text-3xl font-semibold mb-4">Our Vision</h2>
        <p className="text-lg">
          Our vision is to lead the mineral industry towards a sustainable and
          innovative future, ensuring that every mineral we extract and process
          is done responsibly, while meeting the highest global standards. We
          aim to be a trusted partner, contributing to the growth of industries
          and communities worldwide.
        </p>
      </motion.div>

      {/* Feature Sections with scroll-based animation */}
      <motion.div
        className="grid md:grid-cols-3 gap-8 mt-14 max-w-6xl w-full mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {[
          {
            icon: (
              <FaMountain className="text-[#D9AE4E] text-6xl mb-4 transition-transform duration-300" />
            ),
            title: "Premium Mining",
            desc1:
              "Our state-of-the-art mining methods allow us to extract the finest minerals while minimizing environmental impact.",
            desc2:
              "With a global reach, we ensure that our minerals are mined ethically, contributing to both local economies and global markets.",
          },
          {
            icon: (
              <FaGem className="text-[#D9AE4E] text-6xl mb-4 transition-transform duration-300" />
            ),
            title: "Refined Processing",
            desc1:
              "Our advanced processing facilities ensure that every batch of minerals meets the highest standards of purity and quality.",
            desc2:
              "With a focus on consistency, our systems guarantee top-tier products for all purposes.",
          },
          {
            icon: (
              <FaTruckMoving className="text-[#D9AE4E] text-6xl mb-4 transition-transform duration-300" />
            ),
            title: "Efficient Logistics",
            desc1:
              "Our robust logistics network ensures timely and safe delivery of minerals globally.",
            desc2:
              "Strong partnerships guarantee reliability and high standards of safety.",
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            className="bg-white text-[#2B1A0F] border border-[#E8D6BC] p-6 rounded-xl shadow-lg text-center flex flex-col items-center hover:shadow-xl transition-shadow duration-300"
            style={{ opacity: featureOpacity }} // Scroll opacity effect
            onMouseMove={(e) => {
              const card = e.currentTarget;
              const rect = card.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              const centerX = rect.width / 2;
              const centerY = rect.height / 2;
              const rotateX = ((y - centerY) / centerY) * 10;
              const rotateY = ((x - centerX) / centerX) * -10;
              card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "rotateX(0deg) rotateY(0deg)";
            }}
          >
            {item.icon}
            <h2 className="text-2xl font-semibold mb-2">{item.title}</h2>
            <p className="text-sm mb-2">{item.desc1}</p>
            <p className="text-sm">{item.desc2}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Expertise Section with scroll-based scaling */}
      <motion.div
        ref={expertiseRef}
        style={{ scale }}
        className="max-w-5xl w-full py-12 px-6 mt-20 bg-gradient-to-r from-[#D9AE4E] to-[#FDF9F3] rounded-xl shadow-xl text-center text-[#2B1A0F]"
      >
        <h2 className="text-3xl font-semibold mb-6">Our Expertise</h2>
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <h3 className="text-2xl font-semibold text-white mb-2">
              Advanced Technologies
            </h3>
            <p className="text-lg">
              We use cutting-edge technology to ensure our methods are
              state-of-the-art. From AI-driven exploration to automated
              processing systems, we lead the industry in innovation.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-[#D9AE4E] mb-2">
              Global Presence
            </h3>
            <p className="text-lg">
              With operations across multiple continents, we serve industries
              worldwide, delivering minerals with reliability and care.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Call to Action with scroll-based fade-in */}
      <motion.div
        className="mt-14"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        <a
          href="/contact"
          className="bg-[#000000] hover:bg-[#C89B3C] text-white font-semibold text-lg px-6 py-3 rounded-full shadow-md transition-colors duration-300 transform hover:scale-105"
        >
          Get a Quote
        </a>
      </motion.div>
    </div>
  );
};

export default About;
