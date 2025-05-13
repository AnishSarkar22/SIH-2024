import React from "react";

const HeroSection = () => {
  return (
    <div className="text-black min-h-screen flex items-center py-3 bg-white">
      <div className="container mx-auto px-5 py-2">
        <div className="flex flex-col lg:flex-row items-center gap-16 py-1">
          {/* Text Section */}
          <div className="w-full lg:w-1/2 text-left p-4 sm:p-8 lg:p-16">
            <div className="ml-4 sm:ml-8 lg:ml-16">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 lg:mb-10">
                Guide Me
              </h1>
              <p className="text-lg sm:text-xl mb-4 lg:mb-5 leading-relaxed">
                A generic mentorship platform that bridges the gap between
                mentors & mentees catering to the needs of users for their
                progress, skill-building & personal concerns.
              </p>
            </div>
          </div>

          {/* Image Section */}
          <div className="w-full lg:w-1/2 px-4 sm:px-8 lg:px-16">
            <img
              src="/images/mentee and mentor.webp"
              alt="Mentee and Mentor"
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
