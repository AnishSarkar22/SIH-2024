import React from "react";
import HNavbar from "./HNavbar"; // Corrected import statement
import Hero from "./Hero";
import Features from "./Features";
import Counselors from "./Counselors";
import Testimonials from "./Testimonials";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";
import { BurgerClose as Icon } from "react-icons-animated";

const globalFontStyles = {
  "@font-face": {
    fontFamily: "'Aeonik'",
    fontStyle: "normal",
    fontWeight: 300,
    src: "url('/src/fonts/AeonikTRIAL-Light.otf') format('opentype')",
    fontDisplay: "swap",
  },
  fontFamily: "'Aeonik', sans-serif"
};

const styles = {
  "@layer base": {
    "@font-face": [globalFontStyles["@font-face"]],
    body: { fontFamily: "'Aeonik', sans-serif" },
    h1: { "@apply font-light": true, "@apply text-darkBlue": true },
    h2: { "@apply font-light": true },
    p: { "@apply font-light": true, "@apply text-base": true },
    ".button a": { "@apply font-light": true, "@apply text-sm": true },
    "h1, h2, h3, h5": { "@apply text-darkBlue": true },
    ".social-icons-footer": {
      scale: "1.3",
      "@media only screen and (max-width: 376px)": { scale: "5" },
    },
    ".input-failed": { border: ".0625rem solid #f25f3a" },
    ".input-success": { border: ".0625rem solid #9095a7" },
  },
};

function App() {
  return (
    <div style={globalFontStyles}>
      <HNavbar />
      <Hero />
      <Features />
      <Counselors />
      <Testimonials />
      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default App;
