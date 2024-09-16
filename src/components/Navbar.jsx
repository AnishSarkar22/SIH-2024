import React, { useState } from 'react';

export default function Navbar() {
  const styles = {
    "@layer base": {
      "@font-face": [
        {
          fontFamily: "'Be Vietnam Pro'",
          fontStyle: "normal",
          fontWeight: 400,
          src:
            "url('../styles/fonts/BeVietnamPro-Bold.woff'), format('woff'),\n                url('../styles/fonts/BeVietnamPro-Bold.woff2'), format('woff2')",
          fontDisplay: "swap"
        },
        {
          fontFamily: "'Be Vietnam Pro'",
          fontWeight: 500,
          src:
            "url('../styles/fonts/BeVietnamPro-Bold.woff'), format('woff'),\n                url('../styles/fonts/BeVietnamPro-Bold.woff2'), format('woff2')",
          fontDisplay: "swap"
        },
        {
          fontFamily: "'Be Vietnam Pro'",
          fontWeight: 700,
          fontStyle: "normal",
          src:
            "url('../styles/fonts/BeVietnamPro-Bold.woff'), format('woff'),\n                url('../styles/fonts/BeVietnamPro-Bold.woff2'), format('woff2')",
          fontDisplay: "swap"
        }
      ],
      body: { fontFamily: "'Be Vietnam Pro', sans-serif" },
      h1: { "@apply font-bold": true, "@apply text-darkBlue": true },
      h2: { "@apply font-medium": true, "@apply font-bold": true },
      p: { "@apply font-normal": true, "@apply text-base": true },
      ".button a": { "@apply font-bold": true, "@apply text-sm": true },
      "h1, h2, h3, h5": { "@apply text-darkBlue": true },
      ".social-icons-footer": {
        scale: "1.3",
        "@media only screen and (max-width: 376px)": { scale: "5" }
      },
      ".input-failed": { border: ".0625rem solid #f25f3a" },
      ".input-success": { border: ".0625rem solid #9095a7" }
    },
    body: {
      backgroundImage: "url('images/bg-tablet-pattern.svg')",
      backgroundSize: "50rem",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "120% -8%"
    },
    "@media only screen and (max-width: 376px)": {
      body: {
        backgroundPosition: "5.125rem -4.5rem",
        backgroundSize: "24.375rem"
    },
    },
    ".move-up": { marginTop: "-10px" },
      ".bg-2F4454": {
      "--tw-bg-opacity": "1",
      backgroundColor: "rgb(47 68 84 / var(--tw-bg-opacity))"
    },
    ".cursor": {
      fontWeight: 100,
      color: "#2E8B57",
      animation: "blink 1s step-end infinite"
    },
    "@keyframes blink": { "from, to": { opacity: 1 }, "50%": { opacity: 0 } },
    ".button": { display: "flex", gap: "16px" },
    ".container": { width: "100%" },
    "@media (min-width: 375px)": { ".container": { maxWidth: "375px" } },
    "@media (min-width: 768px)": { ".container": { maxWidth: "768px" } },
    "@media (min-width: 976px)": { ".container": { maxWidth: "976px" } },
    "@media (min-width: 1440px)": { ".container": { maxWidth: "1440px" } },
    "#mobile-nav-btn": {
    position: "relative",
    zIndex: 2,
    width: "1.25rem",
    height: "1.25rem"
  },
  "#mobile-nav-btn span": {
    width: "1.25rem",
    height: ".1875rem",
    backgroundColor: "#242d52",
    display: "flex",
    position: "absolute",
    transition: "0.3s",
    WebkitTransition: "0.3s",
    MozTransition: "0.3s",
    OTransition: "0.3s"
  },
  "#mobile-nav-btn span:nth-child(1)": { top: "30%" },
  "#mobile-nav-btn span:nth-child(2)": { top: "60%" },
  "#mobile-nav-btn span:nth-child(3)": { top: "90%" },
  "#mobile-nav-btn.open span:nth-child(1)": {
    top: "50%",
    transform: "rotate(-45deg)",
    WebkitTransform: "rotate(-45deg)",
    MozTransform: "rotate(-45deg)",
    msTransform: "rotate(-45deg)",
    OTransform: "rotate(-45deg)"
  },
  "#mobile-nav-btn.open span:nth-child(2)": { top: "50%", opacity: 0 },
  "#mobile-nav-btn.open span:nth-child(3)": {
    top: "50%",
    transform: "rotate(45deg)",
    WebkitTransform: "rotate(45deg)",
    MozTransform: "rotate(45deg)",
    msTransform: "rotate(45deg)",
    OTransform: "rotate(45deg)"
  },
  ".cta-button": { boxShadow: "0 8px 10px rgb(242 95 58 / 0.35)" },
  ".hamburger": {
    cursor: "pointer",
    display: "inline-block",
    transition: "all 0.3s ease-in-out"
  },
  ".hamburger:hover": { opacity: 0.7 },

    }

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
          <a href="/templates/index.html">
            <img
              src="images/logo-no-background.svg"
              height={50}
              width={150}
              alt="logo"
            />
          </a>
        </div>
        <div className="hidden md:flex space-x-12">
          <a
            href="#"
            aria-label="Visit our Pricing page"
            className="text-veryDarkBlue hover:text-teal-600 transition ease-in"
          >
            Home
          </a>
          <a
            href="#"
            aria-label="Visit our Product page"
            className="hover:text-teal-600 transition ease-in"
          >
            Careers
          </a>
          <a
            href="#"
            aria-label="Visit our About Us page"
            className="hover:text-teal-600 transition ease-in"
          >
            Blogs
          </a>
          <a
            href="#"
            aria-label="Visit our Careers page"
            className="hover:text-teal-600 transition ease-in"
          >
            About Us
          </a>
        </div>
        {/* CTA BUTTON */}
        <div className="hidden md:flex space-x-4">
          <a
            href="#"
            className="bg-2F4454 text-white font-bold py-3 px-6 rounded-lg hover:bg-teal-700 transition duration-300"
          >
            Log in
          </a>
          <a
            href="#"
            className="bg-white text-darkBlue hover-bg-darkgrey outline-button font-bold py-3 px-6 rounded-lg transition duration-300"
          >
            Sign up
          </a>
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
      {/* MOBILE MENU overlay*/}
      <div className="md:hidden move-right">
        <div
          id="mobile-nav-menu"
          className={`${
            isMobileMenuOpen ? 'flex opacity-100 pointer-events-auto' : 'hidden opacity-0 pointer-events-none'
          }inset-0 bg-white transition-opacity duration-300 absolute flex-col items-center self-end rounded py-8 mt-10 space-y-6 font-bold bg-veryLightGray left-6 right-6 drop-shadow-lg sm:w-auto sm:self-center z-50`}
        >
          <a href="#" className="text-darkBlue hover:text-teal-600">
            Home
          </a>
          <a href="#" className="text-darkBlue hover:text-teal-600">
            Careers
          </a>
          <a href="#" className="text-darkBlue hover:text-teal-600">
            Blogs
          </a>
          <a href="#" className="text-darkBlue hover:text-teal-600">
            About Us
          </a>
          <div className="flex flex-col space-y-2">
            <a
              href="#"
              className="bg-2F4454 text-white font-bold py-3 px-6 rounded-lg hover:bg-teal-700 transition duration-300"
            >
              Log in
            </a>
            <a
              href="#"
              className="bg-white text-darkBlue hover-bg-darkgrey outline-button font-bold py-3 px-6 rounded-lg transition duration-300"
            >
              Sign up
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}