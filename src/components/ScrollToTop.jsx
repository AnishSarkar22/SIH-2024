import React, { useState, useEffect } from 'react';
import { ArrowUpCircle } from 'lucide-react';


const ScrollToTop = () => {
  const styles = {
    "@media only screen and (max-width: 376px)": {
    body: {
      backgroundPosition: "5.125rem -4.5rem",
      backgroundSize: "24.375rem"
    }
  },
    ".fixed": { position: "fixed" },
    ".bottom-5": { bottom: "20px" },
    ".right-5": { right: "20px" },

  }
  
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled up to given distance
  const toggleVisibility = () => {
    if (window.pageYOffset > 2150) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set the top coordinate to 0
  // Make scrolling smooth
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div className="fixed bottom-5 right-5">
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="text-white hover:text-teal-600 p-3 rounded-full transition-colors duration-300"
          aria-label="Scroll to top"
        >
          <ArrowUpCircle size={30} />
        </button>
      )}
    </div>
  );
};

export default ScrollToTop;