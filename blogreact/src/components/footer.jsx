import React from "react";
import logo from "../img/logo-white-removebg-preview.svg";

export default function Footer() {
  const styles = {
    "@layer base": {
      "@font-face": [
        {
          fontFamily: "'Be Vietnam Pro'",
          fontStyle: "normal",
          fontWeight: 400,
          src: "url('../styles/fonts/BeVietnamPro-Bold.woff'), format('woff'),\n                url('../styles/fonts/BeVietnamPro-Bold.woff2'), format('woff2')",
          fontDisplay: "swap",
        },
        {
          fontFamily: "'Be Vietnam Pro'",
          fontWeight: 500,
          src: "url('../styles/fonts/BeVietnamPro-Bold.woff'), format('woff'),\n                url('../styles/fonts/BeVietnamPro-Bold.woff2'), format('woff2')",
          fontDisplay: "swap",
        },
        {
          fontFamily: "'Be Vietnam Pro'",
          fontWeight: 700,
          fontStyle: "normal",
          src: "url('../styles/fonts/BeVietnamPro-Bold.woff'), format('woff'),\n                url('../styles/fonts/BeVietnamPro-Bold.woff2'), format('woff2')",
          fontDisplay: "swap",
        },
      ],
      body: { fontFamily: "'Be Vietnam Pro', sans-serif" },
      h1: { "@apply font-bold": true, "@apply text-darkBlue": true },
      h2: { "@apply font-medium": true, "@apply font-bold": true },
      p: { "@apply font-normal": true, "@apply text-base": true },
      ".button a": { "@apply font-bold": true, "@apply text-sm": true },
      "h1, h2, h3, h5": { "@apply text-darkBlue": true },
      ".social-icons-footer": {
        scale: "1.3",
        "@media only screen and (max-width: 376px)": { scale: "5" },
      },
      ".input-failed": { border: ".0625rem solid #f25f3a" },
      ".input-success": { border: ".0625rem solid #9095a7" },
    },
    body: {
      backgroundImage: "url('images/bg-simplify-section-desktop.svg')",
      backgroundSize: "50rem",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "120% -8%",
    },
    "@media only screen and (max-width: 376px)": {
      body: {
        backgroundPosition: "5.125rem -4.5rem",
        backgroundSize: "24.375rem",
      },
    },
    ".bg-2F4454": {
      "--tw-bg-opacity": "1",
      backgroundColor: "rgb(47 68 84 / var(--tw-bg-opacity))",
    },
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
      height: "1.25rem",
    },
    ".overflow-hidden": { overflow: "hidden" },
    "@media only screen and (min-width: 976px)": {
      body: {
        backgroundPosition: "5.125rem -4.5rem",
        backgroundSize: "24.375rem",
      },
      "#footer": { height: "17.1875rem" },
    },
    ".social-icons-footer": {
      scale: "1.3",
      "@media only screen and (max-width: 376px)": { scale: "5" },
    },
    ".move-right": { marginLeft: "20px" },
  };
  return (
    <footer
      id="footer"
      className="bg-gray-800 h-auto xl:h-275 text-white"
      style={{
        backgroundImage: "url('images/bg-simplify-section-desktop.svg')",
        backgroundSize: "90rem",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      {/* FLEX CONTAINER */}
      <div className="container flex flex-col-reverse justify-between px-6 py-1 h-full mx-auto space-y-8 lg:flex-row lg:space-y-0">
        {/* LOGO AND SOCIAL MEDIA LINKS CONTAINER */}
        <div className="flex flex-col-reverse items-center justify-between space-y-12 lg:flex-col lg:space-y-2 lg:items-start">
          {/* LOGO */}
          <div className="lg:pt-10 pl-6 move-right">
            <a href="/templates/index.html">
              <img
                src={logo}
                height={40}
                width={120}
                alt="logo"
              />
            </a>
          </div>
          {/* SOCIAL MEDIA LINKS */}
          <div className="flex flex-row items-center justify-between w-full space-x-3 lg:pb-8 sm:py-8">
            <ul className="flex flex-row justify-between list-none pt-12 gap-4">
              <li>
                <a href="#" aria-label="Visit our Facebook page">
                  <svg className="http://www.w3.org/2000/svg social-icons-footer text-veryLightGray fill-current transition ease-in h-8 w-8 hover:text-teal-600 scale-150 md:h-6 md:scale-110">
                    <path d="M18.896 0H1.104C.494 0 0 .494 0 1.104v17.793C0 19.506.494 20 1.104 20h9.58v-7.745H8.076V9.237h2.606V7.01c0-2.583 1.578-3.99 3.883-3.99 1.104 0 2.052.082 2.329.119v2.7h-1.598c-1.254 0-1.496.597-1.496 1.47v1.928h2.989l-.39 3.018h-2.6V20h5.098c.608 0 1.102-.494 1.102-1.104V1.104C20 .494 19.506 0 18.896 0z" />
                  </svg>
                </a>
              </li>
              <li>
                <a href="#" aria-label="Visit our YouTube page">
                  <svg className="http://www.w3.org/2000/svg social-icons-footer text-veryLightGray fill-current transition ease-in h-8 w-8 hover:text-teal-600 scale-150 md:h-6 md:scale-110">
                    <path d="M10.333 0c-5.522 0-10 4.478-10 10 0 5.523 4.478 10 10 10 5.523 0 10-4.477 10-10 0-5.522-4.477-10-10-10zm3.701 14.077c-1.752.12-5.653.12-7.402 0C4.735 13.947 4.514 13.018 4.5 10c.014-3.024.237-3.947 2.132-4.077 1.749-.12 5.651-.12 7.402 0 1.898.13 2.118 1.059 2.133 4.077-.015 3.024-.238 3.947-2.133 4.077zM8.667 8.048l4.097 1.949-4.097 1.955V8.048z" />
                  </svg>
                </a>
              </li>
              <li>
                <a href="#" aria-label="Visit our Twitter page">
                  <svg className="http://www.w3.org/2000/svg social-icons-footer text-veryLightGray fill-current transition ease-in h-8 w-8 hover:text-teal-600 scale-150 md:h-6 md:scale-110">
                    <path d="M20.667 2.797a8.192 8.192 0 01-2.357.646 4.11 4.11 0 001.804-2.27 8.22 8.22 0 01-2.606.996A4.096 4.096 0 0014.513.873c-2.649 0-4.595 2.472-3.997 5.038a11.648 11.648 0 01-8.457-4.287 4.109 4.109 0 001.27 5.478A4.086 4.086 0 011.47 6.59c-.045 1.901 1.317 3.68 3.29 4.075a4.113 4.113 0 01-1.853.07 4.106 4.106 0 003.834 2.85 8.25 8.25 0 01-6.075 1.7 11.616 11.616 0 006.29 1.843c7.618 0 11.922-6.434 11.662-12.205a8.354 8.354 0 002.048-2.124z" />
                  </svg>
                </a>
              </li>
              <li>
                <a href="#" aria-label="Visit our Pinterest page">
                  <svg className="http://www.w3.org/2000/svg social-icons-footer text-veryLightGray fill-current transition ease-in h-8 w-8 hover:text-teal-600 scale-150 md:h-6 md:scale-110">
                    <path d="M10 0C4.478 0 0 4.477 0 10c0 4.237 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.182-.78 1.172-4.97 1.172-4.97s-.299-.6-.299-1.486c0-1.39.806-2.428 1.81-2.428.852 0 1.264.64 1.264 1.408 0 .858-.545 2.14-.828 3.33-.236.995.5 1.807 1.48 1.807 1.778 0 3.144-1.874 3.144-4.58 0-2.393-1.72-4.068-4.177-4.068-2.845 0-4.515 2.135-4.515 4.34 0 .859.331 1.781.745 2.281a.3.3 0 01.069.288l-.278 1.133c-.044.183-.145.223-.335.134-1.249-.581-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 3.447-2.173 6.22-5.19 6.22-1.013 0-1.965-.525-2.291-1.148l-.623 2.378c-.226.869-.835 1.958-1.244 2.621.937.29 1.931.446 2.962.446 5.522 0 10-4.477 10-10S15.522 0 10 0z" />
                  </svg>
                </a>
              </li>
              <li>
                <a href="#" aria-label="Visit our Instagram page">
                  <svg className="http://www.w3.org/2000/svg social-icons-footer text-veryLightGray fill-current transition ease-in h-8 w-8 hover:text-teal-600 scale-150 md:h-6 md:scale-110">
                    <path d="M10.333 1.802c2.67 0 2.987.01 4.042.059 2.71.123 3.976 1.409 4.1 4.099.048 1.054.057 1.37.057 4.04 0 2.672-.01 2.988-.058 4.042-.124 2.687-1.386 3.975-4.099 4.099-1.055.048-1.37.058-4.042.058-2.67 0-2.986-.01-4.04-.058-2.717-.124-3.976-1.416-4.1-4.1-.048-1.054-.058-1.37-.058-4.041 0-2.67.01-2.986.058-4.04.124-2.69 1.387-3.977 4.1-4.1 1.054-.048 1.37-.058 4.04-.058zm0-1.802C7.618 0 7.278.012 6.211.06 2.579.227.56 2.242.394 5.877.345 6.944.334 7.284.334 10s.011 3.057.06 4.123c.166 3.632 2.181 5.65 5.816 5.817 1.068.048 1.408.06 4.123.06 2.716 0 3.057-.012 4.124-.06 3.628-.167 5.651-2.182 5.816-5.817.049-1.066.06-1.407.06-4.123s-.011-3.056-.06-4.122C20.11 2.249 18.093.228 14.458.06 13.39.01 13.049 0 10.333 0zm0 4.865a5.135 5.135 0 100 10.27 5.135 5.135 0 000-10.27zm0 8.468a3.333 3.333 0 110-6.666 3.333 3.333 0 010 6.666zm5.339-9.87a1.2 1.2 0 10-.001 2.4 1.2 1.2 0 000-2.4z" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>
        {/*FOOTER NAVIGATION LINK MENUS */}
        <div className="flex justify-around space-x-32 mx-auto lg:pt-14">
          {/* MENU 1 */}
          <div className="flex flex-col space-y-4 text-veryLightGray">
            <a
              href="#"
              aria-label="Visit our Home page"
              className="transition ease-in hover:text-teal-600"
            >
              Home
            </a>
            <a
              href="#"
              aria-label="Visit our Pricing page"
              className="transition ease-in hover:text-teal-600"
            >
              Pricing
            </a>
            <a
              href="#"
              aria-label="Visit our Products page"
              className="transition ease-in hover:text-teal-600"
            >
              Products
            </a>
            <a
              href="#"
              aria-label="Visit our About Us page"
              className="transition ease-in hover:text-teal-600"
            >
              About Us
            </a>
          </div>
          {/* MENU 2 */}
          <div className="flex flex-col space-y-3 text-veryLightGray sm:flex-start">
            <a
              href="#"
              aria-label="Visit our Careers page"
              className="transition ease-in hover:text-teal-600"
            >
              Careers
            </a>
            <a
              href="#"
              aria-label="Visit our Community page"
              className="transition ease-in hover:text-teal-600"
            >
              Community
            </a>
            <a
              href="#"
              aria-label="Visit our Privacy page"
              className="transition ease-in hover:text-teal-600"
            >
              Privacy Policy
            </a>
          </div>
        </div>
        {/* NEWSLETTER SIGN UP */}
        <div className="flex flex-col justify-between sm:py-5 items-center lg:items-end lg:pt-10">
          <div className="flex">
            <div className="flex space-x-3 px-1.5">
              <div className="flex flex-col space-y-2">
                <input
                  id="email-address-input"
                  className=" px-6 pt-2 text-teal-600 bg-veryLightGray rounded-lg outline-none"
                  style={{ height: 48 }}
                  placeholder="Updates in your inbox..."
                  type="text"
                />
                <p
                  id="response-message"
                  className="italic text-teal-600 pl-6"
                />
                <p></p>
              </div>
            </div>
            <div>
              <button
                id="submit-email-address"
                className="bg-2F4454 text-white font-bold py-3 px-6 rounded-lg hover:bg-teal-700 transition duration-300"
              >
                Go
              </button>
            </div>
          </div>
          {/* DESKTOP COPYRIGHT BANNER */}
        </div>
      </div>
      {/* MOBILE COPYRIGHT BANNER */}
      {/* <div className="flex flex-col text-center py-4 lg:hidden">
    <p className="text-darkGrayishBlue">Copyright 2020. All Rights Reserved</p>
  </div> */}
      {/* ATTRIBUTIONS BANNER */}
      <div className="flex flex-col attribution bg-veryDarkBlue py-4 items-center sm:py-2">
        <p className="text-darkGrayishBlue text-center sm:px-5">
          Copyright 2024. All Rights Reserved
        </p>
      </div>
    </footer>
  );
}
