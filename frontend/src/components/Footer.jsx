import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#2d2d2d] text-white py-8">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8">
        {/* Company Info with Logo */}
        <div className="flex flex-col items-start">
          <img
            src="/Logo-removebg-preview.png"
            alt="Trishha Logo"
            className="h-14 w-auto mb-3"
          />
          <p className="text-gray-300">
            Excellence in mining and minerals, ensuring quality and
            sustainability.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-bold mb-3 text-yellow-400">
            Quick Links
          </h2>
          <ul className="space-y-2">
            {["Home", "About", "Services", "Gallery", "Contact"].map((item) => (
              <li key={item}>
                <Link
                  to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  className="hover:text-yellow-400 transition"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact & Social Media */}
        <div>
          <h2 className="text-lg font-bold mb-3 text-yellow-400">Contact Us</h2>
          <p className="text-gray-300">Email: info@trishhamines.com</p>
          <p className="text-gray-300">Phone: +91 9876543210</p>
          <p className="text-gray-300">Address: Pune, Maharashtra, India</p>
          <div className="flex space-x-4 mt-3">
            <a href="#" className="hover:text-yellow-400">
              <FaFacebook size={20} />
            </a>
            <a href="#" className="hover:text-yellow-400">
              <FaInstagram size={20} />
            </a>
            <a href="#" className="hover:text-yellow-400">
              <FaTwitter size={20} />
            </a>
            <a href="#" className="hover:text-yellow-400">
              <FaLinkedin size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center mt-8 border-t border-[#3C3C3C] pt-4 text-gray-400 text-sm">
        © {new Date().getFullYear()} Trishha Mines & Minerals LLP. All Rights
        Reserved.
      </div>
    </footer>
  );
};

export default Footer;
