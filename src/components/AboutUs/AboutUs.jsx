import React from 'react';
import HNavbar from '../Home/HNavbar';
import HeroSection from './HeroSection'; // Import HeroSection
import FeaturesSection from './FeaturesSection'; // Import FeaturesSection
import TeamCarousel from './teammember'; // Import TeamCarousel
import Footer from '../Home/Footer';
import ScrollToTop from '../Home/ScrollToTop';

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

function AboutUs() {
  return (
    <>
      <HNavbar /> {/* Corrected component usage */}
      <HeroSection />
      <FeaturesSection />
      <TeamCarousel />
      <Footer />
      <ScrollToTop />
    </>
  );
}

export default AboutUs;