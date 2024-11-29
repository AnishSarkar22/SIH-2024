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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Calculate dimensions
  const cardWidth =
    window.innerWidth < 640 ? 280 : window.innerWidth < 1024 ? 320 : 360;
  const cardGap = 28;
  const totalCards = 6;

  const startAutoScroll = () => {
    const interval = setInterval(() => {
      if (containerRef.current) {
        const nextIndex = (currentIndex + 1) % totalCards;
        setCurrentIndex(nextIndex);

        containerRef.current.scrollTo({
          left: nextIndex * (cardWidth + cardGap),
          behavior: "smooth",
        });
      }
    }, 3000);

    setAutoScrollInterval(interval);
  };

  useEffect(() => {
    startAutoScroll();
    return () => {
      if (autoScrollInterval) clearInterval(autoScrollInterval);
    };
  }, [currentIndex]);

  const carouselContainerStyle = {
    display: "flex",
    overflowX: "scroll",
    scrollBehavior: "smooth",
    WebkitOverflowScrolling: "touch",
    scrollbarWidth: "none",
    msOverflowStyle: "none",
    scrollSnapType: "x mandatory",
    gap: `${cardGap}px`,
  };

  const carouselCardStyle = {
    flex: "0 0 auto",
    width: `${cardWidth}px`,
    scrollSnapAlign: "start",
    scrollSnapStop: "always",
  };

  return (
    <div
      className="flex-grow mt-14 bg-gray-50 rounded-lg p-6 mb-10"
      style={{ height: "500px" }}
    >
      <h2 className="text-3xl font-bold mb-12 text-gray-900 text-center">
        Team Members
      </h2>
      <div className="relative w-full max-w-[120%] sm:max-w-[85%] lg:max-w-5xl mx-auto px-4 sm:px-10 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div
          ref={containerRef}
          className="carousel-container overflow-hidden scrollbar-none scroll-p-4 sm:scroll-p-0 cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          style={{
            ...carouselContainerStyle,
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
            userSelect: "none",
          }}
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
              className={`carousel-card rounded-lg p-4 sm:p-6 ${member.bgColor} bg-opacity-70
        scroll-snap-align-start flex-shrink-0
        w-[280px] sm:w-[320px] lg:w-[360px]
        transition-all duration-300 ease-in-out`}
              style={{
                ...carouselCardStyle,
                marginRight: index === 6 ? 0 : `clamp(16px, 3vw, ${cardGap}px)`,
              }}
            >
              <div className="flex flex-col items-center justify-center space-y-3 sm:space-y-4">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 
            rounded-xl border-2 border-white/20 object-cover
            transition-transform duration-300 hover:scale-105"
                />
                <div className="text-center">
                  <h3 className="font-semibold text-base sm:text-lg lg:text-xl text-white">
                    {member.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/90">
                    {member.role}
                  </p>
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
