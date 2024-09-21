import React, { useState } from "react";
import FilterComponent from "./FilterComponent";

function Mentar_card({ darkMode }) {
  const [filters, setFilters] = useState({ language: "", domain: "" });

  const cardStyles = darkMode
    ? "bg-gray-900 text-white border border-gray-700 shadow-lg"
    : "bg-white text-gray-900 border border-gray-200 shadow-md";

  const tagStyles = darkMode
    ? "bg-gray-800 text-gray-300"
    : "bg-gray-200 text-gray-800";

  const mentors = [
    {
      name: "Krunal Parmar",
      role: "Engineering Manager at Yelp",
      description:
        "Top Mentor and Tech Leader | Mentored 50+ People in last 5 years",
      rating: 5,
      reviews: 15,
      languages: ["English", "Hindi", "Spanish"],
      domains: ["Engineering & Data", "Software Engineering"],
      skills: [
        "Software Engineering",
        "Data Structures",
        "Java",
        "Python",
        "Communication",
        "Interview",
      ],
      image: "/images/1pic (1).png", // Path from public folder
    },
    {
      name: "Jane Smith",
      role: "Senior UX Designer at Google",
      description:
        "Experienced UX Designer with a passion for creating intuitive user experiences",
      rating: 4.5,
      reviews: 10,
      languages: ["English", "Spanish"],
      domains: ["UX & Design", "Product Design"],
      skills: ["UX Design", "User Research", "Prototyping", "Figma"],
      image: "/images/1pic (2).png", // Path from public folder
    },
    {
      name: "Alice Johnson",
      role: "Product Manager at Facebook",
      description:
        "Leading product teams to create world-class user experiences",
      rating: 5,
      reviews: 20,
      languages: ["English", "German"],
      domains: ["Product Management", "Tech Leadership"],
      skills: ["Product Strategy", "Leadership", "Agile Methodologies"],
      image: "/images/3pic.png", // Path from public folder
    },
  ];

  const filteredMentors = mentors.filter(
    (mentor) =>
      (filters.language === "" ||
        mentor.languages.includes(filters.language)) &&
      (filters.domain === "" || mentor.domains.includes(filters.domain))
  );

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Filter Section */}
      <div className="flex-shrink-0 w-full md:w-1/3">
        <FilterComponent
          darkMode={darkMode}
          onFilterChange={handleFilterChange}
        />
      </div>

      {/* Mentor Cards Section */}
      <div className="flex-1">
        {filteredMentors.map((mentor, index) => (
          <div
            key={index}
            className={`rounded-lg p-6 max-w-3xl mx-auto ${cardStyles} mb-6`}
          >
            <div className="flex items-start mb-4">
              <img
                className="w-24 h-24 rounded-full object-cover border-2 border-blue-500"
                src={mentor.image}
                alt={mentor.name}
                style={{ objectFit: "cover", objectPosition: "center" }}
              />
              <div className="ml-6 flex-1">
                <h2
                  className={`text-2xl font-bold ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {mentor.name}
                </h2>
                <p
                  className={`text-gray-500 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {mentor.role}
                </p>
                <div className="flex items-center mt-2">
                  <span className="text-yellow-400">
                    {"★".repeat(Math.floor(mentor.rating))}
                  </span>
                  <span
                    className={`ml-2 ${
                      darkMode ? "text-gray-400" : "text-gray-700"
                    }`}
                  >
                    ({mentor.reviews} reviews)
                  </span>
                </div>
                <div className="mt-4">
                  <p
                    className={`text-sm ${
                      darkMode ? "text-gray-300" : "text-gray-800"
                    }`}
                  >
                    {mentor.description}
                  </p>
                  <div className="flex flex-wrap mt-4 gap-2">
                    {mentor.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className={`rounded-full px-3 py-1 text-xs font-medium ${tagStyles}`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-between items-center">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300 transform hover:scale-105">
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Mentar_card;