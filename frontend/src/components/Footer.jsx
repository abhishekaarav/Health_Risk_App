import {
  FaBrain,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-gray-300 pt-14 pb-6 mt-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Sections */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* LOGO + ABOUT */}
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <FaBrain className="text-blue-500" size={26} />
              PredictiX
            </h2>
            <p className="mt-3 text-sm text-gray-400 leading-6">
              PredictiX — AI-powered disease prediction & advanced hospital
              locator. Your smart health companion for instant medical insights.
            </p>

            {/* SOCIAL ICONS */}
            <div className="flex gap-4 mt-5">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-500 transition text-xl"
              >
                <FaFacebook />
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-500 transition text-xl"
              >
                <FaInstagram />
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-sky-400 transition text-xl"
              >
                <FaTwitter />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition text-xl"
              >
                <FaLinkedin />
              </a>

              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-red-500 transition text-xl"
              >
                <FaYoutube />
              </a>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">
              Quick Links
            </h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link className="hover:text-blue-400">Home</Link>
              </li>
              <li>
                <Link className="hover:text-blue-400">Disease Prediction</Link>
              </li>
              <li>
                <Link className="hover:text-blue-400">Hospital Locator</Link>
              </li>
              <li>
                <Link className="hover:text-blue-400">Health Insights</Link>
              </li>
            </ul>
          </div>

          {/* SERVICES */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">
              AI Services
            </h3>
            <ul className="space-y-2 text-gray-400">
              <li>Heart Disease Prediction</li>
              <li>Diabetes Prediction</li>
              <li>Lung & Kidney Analysis</li>
              <li>Skin Cancer Detection</li>
              <li>AI Health Assistant</li>
            </ul>
          </div>

          {/* CONTACT SECTION */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">
              Contact Us
            </h3>

            <div className="flex items-center gap-3 text-gray-400 mb-2">
              <FaPhoneAlt className="text-blue-400" />
              <span>+91 98765 43210</span>
            </div>

            <div className="flex items-center gap-3 text-gray-400 mb-2">
              <MdEmail className="text-blue-400" />
              <span>support@predictix.ai</span>
            </div>

            <div className="flex items-center gap-3 text-gray-400">
              <FaMapMarkerAlt className="text-blue-400" />
              <span>Patna, Bihar, India</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-10 border-t border-gray-700 pt-5 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} PredictiX — All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
