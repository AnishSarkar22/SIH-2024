import React from "react";
import pic from "../img/mentee and mentor.webp";

const HeroSection = () => {
  return (
    <div className="text-black min-h-screen flex items-center py-5 bg-gray-50">
      <div className="container mx-auto px-7 py-3">
        <div className="flex flex-col lg:flex-row items-center gap-10 py-2">
          {/* Text Section */}
          <div className="lg:w-1/2 text-left p-20">
            <div className="ml-20">
              <h1 className="text-4xl font-bold mb-3">Guide Me</h1>
              <p className="text-lg mb-5">
                A generic mentorship platform that bridges the gap between
                mentors & mentees catering to the needs of users for their
                progress, skill-building & personal concerns.
              </p>
            </div>
          </div>

          {/* Image Section */}
          <div className="lg:w-1/2 mr-20">
            <img
              src={pic}
              className="mx-auto h-full w-full object-cover"
              alt="Hero"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
