import React, { useRef, useState, useEffect } from "react";
import anish from "/images/anish.png";
import sohom from "/images/sohom.jpg";
import arnab from "/images/arnab.png";
import aniket from "/images/aniket.png";
import kankana from "/images/kankana.png";
import doyel from "/images/doyel.jpg";

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

        // Reset to the first box if it reaches the end
        if (scrollPosition > maxScrollLeft) {
          container.scrollTo({
            left: 0,
            behavior: "smooth",
          });
        }
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
    padding: `0 ${cardGap / 2}px`, // Adjust padding to ensure last card is visible
  };

  const carouselCardStyle = {
    flex: "0 0 auto",
    width: `${cardWidth}px`,
    marginRight: `${cardGap}px`,
    boxSizing: "border-box",
  };

  return (
    <div className="flex-grow mt-14 bg-gray-50 rounded-lg p-6 mb-10" style={{ height: '500px' }}>
      <h2 className="text-3xl font-bold mb-12 text-gray-900 text-center">
        Team Member
      </h2>
      <div className="relative w-full max-w-5xl mx-auto">
        <div
          ref={containerRef}
          className="carousel-container"
          style={carouselContainerStyle}
        >
          {[
            {
              name: "Anish Sarker",
              role: "AI Expert & Backend Developer",
              img: anish,
              bgColor: "bg-red-500",
            },
            {
              name: "Soham Bhattacharya",
              role: "Full Stack",
              img: sohom,
              bgColor: "bg-orange-400",
            },
            { 
              name: "Arnab Dua", 
              role: "Content Writer & App Developer", 
              img: arnab,
              bgColor: "bg-green-500",
            },
            {
              name: "Aniket Ghosh",
              role: "Frontend Developer & Database Expert",
              img: aniket,
              bgColor: "bg-blue-500",
            },
            {
              name: "Kankana Biswas",
              role: "Content Writer & Frontend Developer",
              img: kankana,
              bgColor: "bg-purple-500",
            },
            {
              name: "Doyelshree Bhui",
              role: "UX and UI designer & Backend Developer",
              img: doyel,
              bgColor: "bg-pink-500",
            },
          ].map((member, index) => (
            <div
              key={index}
              className={`carousel-card rounded-lg p-6 ${member.bgColor} bg-opacity-70`}
              style={{
                ...carouselCardStyle,
                marginRight: index === 6 ? 0 : `${cardGap}px`, // Remove margin for the last card
              }}
            >
              <div className="flex flex-col items-center justify-center mb-4">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-32 h-32 rounded-xl border-2 object-cover"
                />
                <div className="mt-4 text-center">
                  <h3 className="font-semibold text-lg text-white">
                    {member.name}
                  </h3>
                  <p className="text-sm text-white">{member.role}</p>
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