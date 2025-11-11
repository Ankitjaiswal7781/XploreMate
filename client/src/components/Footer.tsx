import { Link } from "react-router-dom";
import {
  Instagram,
  Twitter,
  Facebook,
  Linkedin,
  MapPin,
  Mail,
  Phone,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-gray-300 py-14 px-6 md:px-16 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 text-center md:text-left items-start">
        {/* Brand Section */}
        <div className="flex flex-col items-center md:items-start">
          <h2 className="text-3xl font-bold text-white tracking-wide">
            Xplore<span className="text-[#892378]">Mate</span>
          </h2>
          <p className="mt-3 text-sm text-gray-400 text-center md:text-left">
            Your ultimate travel companion. Explore destinations, connect with
            guides, and create unforgettable experiences.
          </p>
          {/* Social Links */}
          <div className="flex mt-5 space-x-4">
            {[
              {
                icon: <Instagram size={24} />,
                link: "#",
                color: "hover:text-pink-500",
              },
              {
                icon: <Twitter size={24} />,
                link: "#",
                color: "hover:text-blue-500",
              },
              {
                icon: <Facebook size={24} />,
                link: "#",
                color: "hover:text-blue-700",
              },
              {
                icon: <Linkedin size={24} />,
                link: "#",
                color: "hover:text-blue-600",
              },
            ].map((social, index) => (
              <a
                key={index}
                href={social.link}
                className={`text-gray-400 ${social.color} transition transform hover:scale-110 duration-300`}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-lg font-semibold text-white">Quick Links</h3>
          <ul className="mt-4 space-y-2">
            {[
              { name: "Home", link: "/" },
              { name: "About Us", link: "/about" },
              { name: "Services", link: "/services" },
            ].map((item, index) => (
              <li key={index}>
                <Link
                  to={item.link}
                  className="hover:text-purple-400 transition duration-300 ease-in-out"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-lg font-semibold text-white">Contact Us</h3>
          <ul className="mt-4 space-y-2 text-gray-400">
            <li className="flex items-center gap-3">
              <MapPin size={18} className="text-purple-400" /> Vadodara, India
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} className="text-purple-400" />{" "}
              support@xploremate.com
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="text-purple-400" /> +91 98765 43210
            </li>
          </ul>
        </div>

        {/* Download Our Apps */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-lg font-semibold text-white">
            Download Our Apps
          </h3>
          <div className="mt-4 flex flex-col space-y-3">
            <a href="#" className="w-40">
              <img
                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                alt="App Store"
                className="w-full h-full object-contain"
              />
            </a>
            <a href="#" className="w-40">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Google Play"
                className="w-full h-full object-contain"
              />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-400">
        &copy; 2025 <span className="text-purple-400">XploreMate</span>. All
        rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
