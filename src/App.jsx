import React, { useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Counselors from './components/Counselors';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import { BurgerClose as Icon } from "react-icons-animated";

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