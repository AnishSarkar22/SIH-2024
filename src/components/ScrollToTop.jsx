import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUp } from "@fortawesome/free-regular-svg-icons";



const ScrollToTop = () => {
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
      behavior: "smooth",
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
          <FontAwesomeIcon
            icon={faCircleUp}
            size="2x"
            style={{ cursor: "pointer" }}
          />
        </button>
      )}
    </div>
  );
};

export default ScrollToTop;
