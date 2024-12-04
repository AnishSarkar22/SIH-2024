import React from "react";

const HeroSection = () => {
  return (
    <div className="text-black min-h-screen flex items-center py-3 bg-white">
      <div className="container mx-auto px-5 py-2">
        <div className="flex flex-col lg:flex-row items-center gap-16 py-1">
          {/* Text Section */}
          <div className="lg:w-1/2 text-left p-16">
            <div className="ml-16">
              <h1 className="text-6xl font-bold mb-10">Guide Me</h1>
              <p className="text-xl mb-5 leading-relaxed">
                A generic mentorship platform that bridges the gap between
                mentors & mentees catering to the needs of users for their
                progress, skill-building & personal concerns.
              </p>
            </div>
          </div>

          {/* Image Section */}
          <div className="lg:w-1/2 mr-16">
            <img
              src="/images/mentee and mentor.webp"
              alt="Mentee and Mentor"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;