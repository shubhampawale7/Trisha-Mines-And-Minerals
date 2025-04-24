import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-[#2d2d2d] to-[#1e1e1e] text-white py-6">
      <div className="max-w-7xl mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Company Info with Logo */}
        <div className="flex flex-col items-start space-y-4">
          <img
            src="/Logo-removebg-preview.png"
            alt="Trishha Logo"
            className="h-12 w-auto mb-3 transition-transform duration-300 ease-in-out transform hover:scale-110"
          />
          <p className="text-gray-300 text-sm font-light">
            Excellence in mining and minerals, ensuring quality and
            sustainability.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-md font-semibold text-yellow-400 mb-4">
            Quick Links
          </h2>
          <ul className="space-y-2">
            {["Home", "About", "Services", "Gallery", "Contact"].map((item) => (
              <li key={item}>
                <Link
                  to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  className="hover:text-yellow-400 text-sm transition-all duration-300 ease-in-out transform hover:scale-105 hover:underline"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact & Social Media */}
        <div>
          <h2 className="text-md font-semibold text-yellow-400 mb-4">
            Contact Us
          </h2>
          <p className="text-gray-300 text-sm mb-2">
            Email:{" "}
            <a
              href="mailto:info@trishhamines.com"
              className="hover:text-yellow-400"
            >
              info@trishhamines.com
            </a>
          </p>
          <p className="text-gray-300 text-sm mb-2">
            Phone: <span className="text-yellow-400">+91 9876543210</span>
          </p>
          <p className="text-gray-300 text-sm mb-4">
            Address: Pune, Maharashtra, India
          </p>
          <div className="flex space-x-6 mt-2">
            <a
              href="#"
              className="hover:text-yellow-400 transform transition-transform duration-300 hover:scale-110"
            >
              <FaFacebook size={18} />
            </a>
            <a
              href="#"
              className="hover:text-yellow-400 transform transition-transform duration-300 hover:scale-110"
            >
              <FaInstagram size={18} />
            </a>
            <a
              href="#"
              className="hover:text-yellow-400 transform transition-transform duration-300 hover:scale-110"
            >
              <FaTwitter size={18} />
            </a>
            <a
              href="#"
              className="hover:text-yellow-400 transform transition-transform duration-300 hover:scale-110"
            >
              <FaLinkedin size={18} />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center mt-6 border-t border-[#3C3C3C] pt-4 text-gray-400 text-xs">
        © {new Date().getFullYear()} Trishha Mines & Minerals LLP. All Rights
        Reserved.
      </div>
    </footer>
  );
};

export default Footer;
