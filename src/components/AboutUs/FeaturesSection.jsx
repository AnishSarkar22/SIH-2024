import React from "react";

const FeaturesSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6 px-6">
        {/* Calendar Booking System */}
        <div className="bg-green-300 p-8 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Automated Calendar Booking System
          </h2>
          <p className="text-gray-700">
            Allows easy scheduling of mentor-mentee sessions.
          </p>
          <div className="w-12 h-12 bg-green-400 rounded-full float-right"></div>
        </div>

        {/* Video Call & Chat Features */}
        <div className="bg-blue-300 p-8 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Embedded Video Call & Chat Features
          </h2>
          <p className="text-gray-700">
            Enables virtual meetings with real-time communication.
          </p>
          <div className="w-12 h-12 bg-blue-400 rounded-full float-right"></div>
        </div>

        {/* Personal Guidance & Skill Development */}
        <div className="bg-red-300 p-8 rounded-lg shadow-lg col-span-1 sm:col-span-2">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Personal Guidance & Skill Development
          </h2>
          <p className="text-gray-700">
            Ensures accessibility, availability, and personalized support for
            mentees.
          </p>
          <div className="w-12 h-12 bg-red-400 rounded-full float-right"></div>
        </div>

        {/* Gamification & Reverse Mentoring */}
        <div className="bg-yellow-100 p-8 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Gamification & Reverse Mentoring
          </h2>
          <p className="text-gray-700">
            Innovative features to engage users and facilitate learning from
            both mentees and mentors.
          </p>
          <div className="w-12 h-12 bg-yellow-400 rounded-full float-right"></div>
        </div>

        {/* Data-Driven Algorithm */}
        <div className="bg-orange-300 p-8 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Data-Driven Algorithm for Matching
          </h2>
          <p className="text-gray-700">
            Uses algorithms to intelligently match mentors and mentees based on
            their needs and profiles.
          </p>
          <div className="w-12 h-12 bg-orange-400 rounded-full float-right"></div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;