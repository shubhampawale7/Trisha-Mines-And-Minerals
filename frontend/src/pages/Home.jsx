/* eslint-disable no-unused-vars */
import { useEffect, Suspense, lazy } from "react";
import { Link } from "react-router-dom";
import { FaHammer, FaIndustry, FaMountain, FaHandshake } from "react-icons/fa";
import { motion } from "framer-motion";
import miningBg from "../assets/mining-bg.jpg";

const HeroBg = lazy(() => import("../components/HeroBg"));

const services = [
  {
    icon: FaHammer,
    title: "Mining Operations",
    description:
      "High-efficiency mining services with precision and safety at the core.",
  },
  {
    icon: FaIndustry,
    title: "Mineral Processing",
    description: "Top-tier processing solutions for quality mineral output.",
  },
  {
    icon: FaMountain,
    title: "Exploration",
    description: "Sustainable geological exploration backed by expert surveys.",
  },
  {
    icon: FaHandshake,
    title: "Partnerships",
    description: "Global collaborations for resource and logistics excellence.",
  },
];

const fadeIn = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const Home = () => {
  useEffect(() => {
    document.title = "Trishha Mines & Minerals | Home";
  }, []);

  return (
    <div className="font-sans text-[#1E1E1E] bg-white">
      {/* Hero */}
      <Suspense
        fallback={
          <div className="h-screen flex items-center justify-center text-lg">
            Loading hero...
          </div>
        }
      >
        <HeroBg background={miningBg}>
          <div className="relative h-[85vh] w-full flex items-center justify-center bg-opacity-40">
            <motion.div
              className="text-center text-white px-4"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ duration: 1 }}
            >
              <h1 className="text-5xl font-bold leading-snug drop-shadow-xl">
                Powering Progress with Minerals
              </h1>
              <p className="mt-4 max-w-xl mx-auto text-lg opacity-90">
                Premium-grade minerals tailored for industrial evolution.
              </p>
              <Link
                to="/contact"
                className="mt-6 inline-block bg-[#D9AE4E] hover:bg-[#c99b3e] px-6 py-3 rounded-full text-base font-semibold shadow-md transition-transform hover:scale-105"
              >
                Request a Quote
              </Link>
            </motion.div>
          </div>
        </HeroBg>
      </Suspense>

      {/* Services */}
      <section className="py-20 bg-[#F7F5EF]">
        <motion.h2
          className="text-center text-4xl font-bold text-[#D9AE4E] mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          transition={{ duration: 0.6 }}
        >
          Our Expertise
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-6 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-white border border-[#e6decf] rounded-2xl p-6 text-center shadow-sm hover:shadow-lg transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
            >
              <service.icon className="text-4xl text-[#D9AE4E] mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-sm text-gray-600">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* About */}
      <section className="py-20 px-6 bg-white text-[#2B1A0F]">
        <motion.div
          className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          variants={fadeIn}
        >
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-4xl font-bold text-[#D9AE4E] mb-4">
              About Trishha Mines
            </h2>
            <p className="text-lg text-[#4B2E1B] leading-relaxed">
              We are a globally recognized leader in the extraction, processing,
              and distribution of minerals. Our mission is to empower industries
              with reliable, sustainable, and efficient solutions. From field to
              factory — quality is our promise.
            </p>
          </div>
          <div className="flex-1 aspect-video rounded-xl overflow-hidden shadow-lg">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/XvVvfPnrhd0?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&showinfo=0&loop=1&playlist=XvVvfPnrhd0"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
          </div>
        </motion.div>
      </section>

      {/* CTA */}
      <motion.section
        className="py-20 bg-gradient-to-r from-[#D9AE4E] to-[#c79a38] text-white text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        variants={fadeIn}
      >
        <h2 className="text-4xl font-bold">Ready to Elevate Your Resources?</h2>
        <p className="mt-4 text-lg">
          Let’s collaborate to drive value and sustainability in your
          operations.
        </p>
        <Link
          to="/contact"
          className="mt-6 inline-block bg-white text-[#D9AE4E] hover:bg-[#f3f3f3] px-6 py-3 rounded-full text-lg font-semibold shadow-md transition-transform duration-300 hover:scale-105"
        >
          Get in Touch
        </Link>
      </motion.section>
    </div>
  );
};

export default Home;
