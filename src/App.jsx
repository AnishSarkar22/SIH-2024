import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Counselors from './components/Counselors';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import { BurgerClose as Icon } from "react-icons-animated";
import './styles/input.css';

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
  }
}


function App() {
  return (
    <>
      <Navbar />
      <Hero/>
      <Features/>
      <Counselors/>
      <Testimonials/>
      <Footer/>
      <ScrollToTop />
    </>
  );
}

export default App;