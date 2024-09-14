import React, { useRef, useState, useEffect } from "react";
import "./teammember.css";
import anish from "../img/anish.png";
import sohom from "../img/sohom.jpg";
import arnab from "../img/arnab.png";
import aniket from "../img/profile_picture-removebg-preview.png";
import kankana from "../img/kankana.png";
import doyel from "../img/doyel.jpg";

const TeamCarousel = () => {
  const containerRef = useRef(null);
  const [autoScrollInterval, setAutoScrollInterval] = useState(null);

  const cardWidth = 320; // Width of each card
  const cardGap = 28; // Space between cards
  const scrollAmount = cardWidth + cardGap; // Total scroll amount

  const scrollNext = () => {
    if (containerRef.current) {
      const scrollPosition = containerRef.current.scrollLeft + scrollAmount;
      const maxScrollLeft =
        containerRef.current.scrollWidth - containerRef.current.clientWidth;

      containerRef.current.scrollTo({
        left: scrollPosition > maxScrollLeft ? 0 : scrollPosition,
        behavior: "smooth",
      });

      resetAutoScroll();
    }
  };

  const scrollPrev = () => {
    if (containerRef.current) {
      const scrollPosition = containerRef.current.scrollLeft - scrollAmount;

      containerRef.current.scrollTo({
        left:
          scrollPosition < 0
            ? containerRef.current.scrollWidth -
              containerRef.current.clientWidth
            : scrollPosition,
        behavior: "smooth",
      });

      resetAutoScroll();
    }
  };

  const startAutoScroll = () => {
    const interval = setInterval(() => {
      if (containerRef.current) {
        const container = containerRef.current;
        const maxScrollLeft = container.scrollWidth - container.clientWidth;
        const scrollPosition = container.scrollLeft + scrollAmount;

        container.scrollTo({
          left: scrollPosition > maxScrollLeft ? 0 : scrollPosition,
          behavior: "smooth",
        });
      }
    }, 3000); // Adjust interval to slow down auto-scroll

    setAutoScrollInterval(interval);
  };

  const resetAutoScroll = () => {
    if (autoScrollInterval) {
      clearInterval(autoScrollInterval);
      startAutoScroll();
    }
  };

  useEffect(() => {
    startAutoScroll();

    return () => {
      if (autoScrollInterval) {
        clearInterval(autoScrollInterval);
      }
    };
  }, [autoScrollInterval]);

  return (
    <div className="flex-grow mt-5 bg-gray-50 rounded-lg p-6 mb-6">
      <h2 className="text-3xl font-bold mb-4 text-gray-900 text-center">
        Team Member
      </h2>
      <div className="relative w-full max-w-5xl mx-auto">
        <div className="flex items-center justify-between">
          {/* Left Arrow */}
          <button
            type="button"
            onClick={scrollPrev}
            className="absolute left-0 transform -translate-y-1/2 top-1/2 p-2 bg-gray-200 rounded-full focus:outline-none z-10 carousel-button"
          >
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span className="sr-only">Previous</span>
          </button>

          {/* Mentor Cards Container */}
          <div
            ref={containerRef}
            className="carousel-container"
            style={{ padding: `0 ${cardGap / 2}px` }}
          >
            {/* Card 1 */}
            <div
              className="carousel-card bg-gray-100 rounded-lg p-6"
              style={{ width: cardWidth }}
            >
              <div className="flex flex-col items-center justify-center mb-4">
                <img
                  src={anish}
                  alt="Anish Sarker"
                  className="w-32 h-32 rounded-xl border-2 object-cover"
                />
                <div className="mt-4 text-center">
                  <h3 className="font-semibold text-lg text-gray-900">
                    Anish Sarker
                  </h3>
                  <p className="text-sm text-gray-700">
                    AI Expert & Backend Developer
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div
              className="carousel-card bg-gray-100 rounded-lg p-6"
              style={{ width: cardWidth }}
            >
              <div className="flex flex-col items-center justify-center mb-4">
                <img
                  src={sohom}
                  alt="Soham Bhattacharya"
                  className="w-32 h-32 rounded-xl border-2 object-cover"
                />
                <div className="mt-4 text-center">
                  <h3 className="font-semibold text-lg text-gray-900">
                    Soham Bhattacharya
                  </h3>
                  <p className="text-sm text-gray-700">
                    Frontend Developer & Database Expert
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div
              className="carousel-card bg-gray-100 rounded-lg p-6"
              style={{ width: cardWidth }}
            >
              <div className="flex flex-col items-center justify-center mb-4">
                <img
                  src={arnab}
                  alt="Arnab Dua"
                  className="w-32 h-32 rounded-xl border-2 object-cover"
                />
                <div className="mt-4 text-center">
                  <h3 className="font-semibold text-lg text-gray-900">
                    Arnab Dua
                  </h3>
                  <p className="text-sm text-gray-700">Content Writer</p>
                </div>
              </div>
            </div>

            {/* Card 4 */}
            <div
              className="carousel-card bg-gray-100 rounded-lg p-6"
              style={{ width: cardWidth }}
            >
              <div className="flex flex-col items-center justify-center mb-4">
                <img
                  src={aniket}
                  alt="Aniket Ghosh"
                  className="w-32 h-32 rounded-xl border-2 object-cover"
                />
                <div className="mt-4 text-center">
                  <h3 className="font-semibold text-lg text-gray-900">
                    Aniket Ghosh
                  </h3>
                  <p className="text-sm text-gray-700">
                    Frontend Developer & App Developer
                  </p>
                </div>
              </div>
            </div>

            {/* Card 5 */}
            <div
              className="carousel-card bg-gray-100 rounded-lg p-6"
              style={{ width: cardWidth }}
            >
              <div className="flex flex-col items-center justify-center mb-4">
                <img
                  src={kankana}
                  alt="Kankana Biswas"
                  className="w-32 h-32 rounded-xl border-2 object-cover"
                />
                <div className="mt-4 text-center">
                  <h3 className="font-semibold text-lg text-gray-900">
                    Kankana Biswas
                  </h3>
                  <p className="text-sm text-gray-700">
                    Content Writer & App Developer
                  </p>
                </div>
              </div>
            </div>

            {/* Card 6 */}
            <div
              className="carousel-card bg-gray-100 rounded-lg p-6"
              style={{ width: cardWidth }}
            >
              <div className="flex flex-col items-center justify-center mb-4">
                <img
                  src={doyel}
                  alt="Doyelshree Bhui"
                  className="w-32 h-32 rounded-xl border-2 object-cover"
                />
                <div className="mt-4 text-center">
                  <h3 className="font-semibold text-lg text-gray-900">
                    Doyelshree Bhui
                  </h3>
                  <p className="text-sm text-gray-700">
                    UX and UI designer & Backend Developer
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Arrow */}
          <button
            type="button"
            onClick={scrollNext}
            className="absolute right-0 transform -translate-y-1/2 top-1/2 p-2 bg-gray-200 rounded-full focus:outline-none z-10 carousel-button"
          >
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
            <span className="sr-only">Next</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeamCarousel;
