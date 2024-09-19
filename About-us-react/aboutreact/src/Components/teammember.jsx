import React, { useRef, useState, useEffect } from "react";
import anish from "../img/anish.png";
import sohom from "../img/sohom.jpg";
import arnab from "../img/arnab.png";
import aniket from "../img/profile_picture-removebg-preview.png";
import kankana from "../img/kankana.png";
import doyel from "../img/doyel.jpg";

const TeamCarousel = () => {
  const containerRef = useRef(null);
  const [autoScrollInterval, setAutoScrollInterval] = useState(null);

  const cardWidth = 320;
  const cardGap = 28;
  const scrollAmount = cardWidth + cardGap;

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
    }, 3000);

    setAutoScrollInterval(interval);
  };

  useEffect(() => {
    startAutoScroll();

    return () => {
      if (autoScrollInterval) {
        clearInterval(autoScrollInterval);
      }
    };
  }, [autoScrollInterval]);

  const carouselContainerStyle = {
    display: "flex",
    overflowX: "scroll",
    scrollBehavior: "smooth",
    WebkitOverflowScrolling: "touch",
    scrollbarWidth: "none",
    msOverflowStyle: "none",
  };

  const carouselCardStyle = {
    flex: "0 0 auto",
    width: `${cardWidth}px`,
    marginRight: `${cardGap}px`,
    boxSizing: "border-box",
  };

  return (
    <div className="flex-grow mt-5 bg-gray-50 rounded-lg p-6 mb-6">
      <h2 className="text-3xl font-bold mb-4 text-gray-900 text-center">
        Team Member
      </h2>
      <div className="relative w-full max-w-5xl mx-auto">
        <div
          ref={containerRef}
          className="carousel-container"
          style={{ ...carouselContainerStyle, padding: `0 ${cardGap / 2}px` }}
        >
          {[
            {
              name: "Anish Sarker",
              role: "AI Expert & Backend Developer",
              img: anish,
            },
            {
              name: "Soham Bhattacharya",
              role: "Frontend Developer & App Developer",
              img: sohom,
            },
            { name: "Arnab Dua", role: "Content Writer", img: arnab },
            {
              name: "Aniket Ghosh",
              role: "Frontend Developer & Database Expert",
              img: aniket,
            },
            {
              name: "Kankana Biswas",
              role: "Content Writer & App Developer",
              img: kankana,
            },
            {
              name: "Doyelshree Bhui",
              role: "UX and UI designer & Backend Developer",
              img: doyel,
            },
          ].map((member, index) => (
            <div
              key={index}
              className="carousel-card bg-gray-100 rounded-lg p-6"
              style={carouselCardStyle}
            >
              <div className="flex flex-col items-center justify-center mb-4">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-32 h-32 rounded-xl border-2 object-cover"
                />
                <div className="mt-4 text-center">
                  <h3 className="font-semibold text-lg text-gray-900">
                    {member.name}
                  </h3>
                  <p className="text-sm text-gray-700">{member.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamCarousel;
