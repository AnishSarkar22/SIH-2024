import React from "react";
import image from "../img/lightside1-Photoroom.svg";


const Navbar = () => {
  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          {/* Left-aligned Logo and Text */}
          <div className="flex items-center space-x-4">
            <img
              src={image}
              alt="Guide Me Logo"
              className="h-[71px] w-[71px] object-contain"
            />

            <span className="ml-3 text-3xl font-bold text-gray-900">
              GuideMe
            </span>
          </div>

          {/* Centered Navigation Links */}
          <div className="absolute inset-y-0 left-1/2 transform -translate-x-1/2 flex space-x-4">
            <a
              href="#"
              className="text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-md text-xl font-medium"
            >
              Home
            </a>
            <a
              href="#"
              className="text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-md text-xl font-medium"
            >
              Careers
            </a>
            <a
              href="#"
              className="text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-md text-xl font-medium"
            >
              Blog
            </a>
            <a
              href="#"
              className="text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-md text-xl font-medium"
            >
              About Us
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
