import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Footer Sections */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* GuruMarga for Learning */}
          <div>
            <h5 className="text-xl font-bold mb-6 text-white">
              GuruMarga for Learning
            </h5>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white hover:underline transition duration-300"
                >
                  Teach on GuruMarga
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white hover:underline transition duration-300"
                >
                  Get the app
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white hover:underline transition duration-300"
                >
                  About us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white hover:underline transition duration-300"
                >
                  Contact us
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h5 className="text-xl font-bold mb-6 text-white">Resources</h5>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white hover:underline transition duration-300"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white hover:underline transition duration-300"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white hover:underline transition duration-300"
                >
                  Help and Support
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white hover:underline transition duration-300"
                >
                  Affiliate
                </a>
              </li>
            </ul>
          </div>

          {/* Teach */}
          <div>
            <h5 className="text-xl font-bold mb-6 text-white]">Teach</h5>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white hover:underline transition duration-300"
                >
                  Teach on Ddemy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white hover:underline transition duration-300"
                >
                  Instructor Resources
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white hover:underline transition duration-300"
                >
                  Get the app
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white hover:underline transition duration-300"
                >
                  About us
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div>
            <h5 className="text-xl font-bold mb-6 text-white]">
              Stay Updated
            </h5>
            <p className="text-gray-300 mb-4">
              Subscribe to our newsletter for the latest updates.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-l-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-[#5e17eb] text-white rounded-r-lg hover:bg-[#4c14c7] transition duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700"></div>

        {/* Bottom Footer */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between">
          {/* Copyright */}
          <div className="mb-4 md:mb-0">
            <p className="text-gray-300">
              &copy; {new Date().getFullYear()} Learn-Up, Inc. All rights
              reserved.
            </p>
          </div>

          {/* Social Media Icons */}
          <div className="flex space-x-6">
            <a
              href="#"
              className="text-gray-300 hover:text-[#5e17eb] transition duration-300"
            >
              <FaFacebook size={24} />
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-[#5e17eb] transition duration-300"
            >
              <FaTwitter size={24} />
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-[#5e17eb] transition duration-300"
            >
              <FaLinkedin size={24} />
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-[#5e17eb] transition duration-300"
            >
              <FaInstagram size={24} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;