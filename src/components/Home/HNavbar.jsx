import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const styles = {
    fontFamily: "'Aeonik', sans-serif"
  };
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [backgroundOpacity, setBackgroundOpacity] = useState(1);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const newOpacity = Math.max(1 - scrollTop / 300, 0.8); // Adjust the divisor to control the rate of opacity change
      setBackgroundOpacity(newOpacity);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className="fixed w-11/12 container mx-auto px-4 py-0 md:px-4 md:py-4 xl:px-12 mt-6 z-50"
      style={{ top: 0, right: 0, left: 0 }}
    >
      <div
        className="absolute inset-0 bg-white transition-opacity duration-300 rounded-lg shadow"
        style={{ opacity: backgroundOpacity, right: 0, left: 0, top: 0 }}
      ></div>
      {/* FLEX CONTAINER */}
      <div
        className="relative font-custom flex items-center justify-between"
        style={styles}
      >
        {/* LOGO */}
        <div className="pt-0">
          <Link to="/home">
            <img
              src="images/logo-no-background.svg"
              className="h-[50px] w-[150px]"
              alt="logo"
            />
          </Link>
        </div>
        {/* DESKTOP MENU */}
        <div className="hidden md:flex space-x-12 font-aeonik-bold font-bold">
          <Link
            to="/"
            aria-label="Visit our Home page"
            className="text-veryDarkBlue hover:text-teal-600 transition ease-in"
          >
            Home
          </Link>
          <Link
            to=""
            aria-label="Visit our Careers page"
            className="hover:text-teal-600 transition ease-in"
          >
            Careers
          </Link>
          <Link
            to="/blog"
            aria-label="Visit our Blogs page"
            className="hover:text-teal-600 transition ease-in"
          >
            Blogs
          </Link>
          <Link
            to="/aboutus"
            aria-label="Visit our About Us page"
            className="hover:text-teal-600 transition ease-in"
          >
            About Us
          </Link>
        </div>
        {/* CTA BUTTONS */}

        <div className="hidden md:flex space-x-4">
          <Link
            to="/login"
            className="bg-[#2F4454] text-white font-bold py-3 px-6 rounded-lg hover:bg-teal-700 transition duration-300"
          >
            Log in
          </Link>
          <Link
            to="/signup"
            className="bg-white text-darkBlue hover:bg-gray-200 border border-darkBlue font-bold py-3 px-6 rounded-lg transition duration-300"
          >
            Sign up
          </Link>
        </div>
        {/* MOBILE NAV MENU ICON */}
        <button
          onClick={toggleMobileMenu}
          id="mobile-nav-btn"
          className="block md:hidden -mt-2.5 relative z-20 w-5 h-5 focus:outline-none"
        >
          <span
            className={`block w-5 h-0.5 bg-black mb-1 absolute transition-all duration-300 ease-in-out ${
              isMobileMenuOpen ? "rotate-45 translate-y-1.5" : "top-1/4"
            }`}
          ></span>
          <span
            className={`block w-5 h-0.5 bg-black mb-1 absolute transition-all duration-300 ease-in-out ${
              isMobileMenuOpen ? "opacity-0" : "top-2/4"
            }`}
          ></span>
          <span
            className={`block w-5 h-0.5 bg-black absolute transition-all duration-300 ease-in-out ${
              isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : "top-3/4"
            }`}
          ></span>
        </button>
      </div>
      {/* MOBILE MENU OVERLAY */}
      <div className="md:hidden">
        <div
          id="mobile-nav-menu"
          className={`${
            isMobileMenuOpen
              ? "flex opacity-100 pointer-events-auto"
              : "hidden opacity-0 pointer-events-none"
          } absolute inset-x-6 top-20 flex-col items-center bg-white rounded py-8 space-y-6 font-bold shadow-lg transition-all duration-300 ease-in-out z-10`}
        >
          <Link to="#" className="text-darkBlue hover:text-teal-600">
            Home
          </Link>
          <Link to="#" className="text-darkBlue hover:text-teal-600">
            Careers
          </Link>
          <Link to="#" className="text-darkBlue hover:text-teal-600">
            Blogs
          </Link>
          <Link to="#" className="text-darkBlue hover:text-teal-600">
            About Us
          </Link>
          <div className="flex flex-col space-y-2">
            <Link
              to="/login"
              className="bg-[#2F4454] text-white font-bold py-3 px-6 rounded-lg hover:bg-teal-700 transition duration-300"
            >
              Log in
            </Link>
            <Link
              to="/signup"
              className="bg-white text-darkBlue hover:bg-gray-200 border border-darkBlue font-bold py-3 px-6 rounded-lg transition duration-300"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
