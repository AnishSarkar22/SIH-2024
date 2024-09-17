import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="relative container mx-auto px-4 py-0 md:px-2 md:py-1 xl:px-12 mt-10">
      {/* FLEX CONTAINER */}
      <div className="flex items-center justify-between">
        {/* LOGO */}
        <div className="pt-0">
          
            <img
              src="/images/guideme-high-resolution-logo.svg"
              height={50}
              width={150}
              alt="logo"
            />
          
        </div>
        <div className="hidden md:flex space-x-12">
          <Link
            to="/home"
            aria-label="Visit our Home page"
            className="text-veryDarkBlue hover:text-teal-600 transition ease-in"
          >
            Home
          </Link>
          <Link
            to="#"
            aria-label="Visit our Careers page"
            className="hover:text-teal-600 transition ease-in"
          >
            Careers
          </Link>
          <Link
            to="#"
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
        {/* CTA BUTTON */}
        <div className="hidden md:flex space-x-4">
          <Link
            to="/login"
            className="bg-2F4454 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
            style={{
              backgroundColor: 'rgb(47, 68, 84)',
              color: 'white',
              fontWeight: 'bold',
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              transition: 'background-color 0.3s',
              textDecoration: 'none'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgb(11, 112, 119)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgb(47, 68, 84)'}
          >
            Log in
          </Link>
          <Link
            to="/signup"
            className="bg-white border border-black text-darkBlue font-bold py-3 px-6 rounded-lg transition duration-300"
            style={{
              backgroundColor: 'white',
              color: 'darkBlue',
              fontWeight: 'bold',
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              transition: 'background-color 0.3s',
              textDecoration: 'none'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'darkgrey'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
          >
            Sign up
          </Link>
        </div>
        {/* MOBILE NAV MENU ICON */}
        <button
          onClick={toggleMobileMenu}
          id="mobile-nav-btn"
          className="block hamburger focus:outline-none md:hidden move-right"
          style={{ zIndex: 100 }}
        >
          <span className={`block w-6 h-0.5 bg-black mb-1 ${isMobileMenuOpen ? 'transform rotate-45 translate-y-1.5' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-black mb-1 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-black ${isMobileMenuOpen ? 'transform -rotate-45 -translate-y-1.5' : ''}`}></span>
        </button>
      </div>
      {/* MOBILE MENU overlay */}
      <div className="md:hidden move-right">
        <div
          id="mobile-nav-menu"
          className={`${
            isMobileMenuOpen ? 'flex opacity-100 pointer-events-auto' : 'hidden opacity-0 pointer-events-none'
          } inset-0 bg-white transition-opacity duration-300 absolute flex-col items-center self-end rounded py-8 mt-10 space-y-6 font-bold bg-veryLightGray left-6 right-6 drop-shadow-lg sm:w-auto sm:self-center z-50`}
        >
          <Link to="/home" className="text-darkBlue hover:text-teal-600">
            Home
          </Link>
          <Link to="#" className="text-darkBlue hover:text-teal-600">
            Careers
          </Link>
          <Link to="#" className="text-darkBlue hover:text-teal-600">
            Blogs
          </Link>
          <Link to="/aboutus" className="text-darkBlue hover:text-teal-600">
            About Us
          </Link>
          <div className="flex flex-col space-y-2">
            <Link
              to="/login"
              className="bg-2F4454 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
              style={{
                backgroundColor: 'rgb(47, 68, 84)',
                color: 'white',
                fontWeight: 'bold',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                transition: 'background-color 0.3s',
                textDecoration: 'none'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgb(11, 112, 119)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgb(47, 68, 84)'}
            >
              Log in
            </Link>
            <Link
              to="/signup"
              className="bg-white text-darkBlue font-bold py-3 px-6 rounded-lg transition duration-300"
              style={{
                backgroundColor: 'white',
                color: 'darkBlue',
                fontWeight: 'bold',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                transition: 'background-color 0.3s',
                textDecoration: 'none'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'darkgrey'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}