import React, { useState } from "react";
import FilterComponent from "./FilterComponent";
import img1 from "../img/1pic (1).png";
import img2 from "../img/1pic (2).png";
import img3 from "../img/3pic.png";

const MentorCard = ({ darkMode }) => {
  const [filters, setFilters] = useState({ language: "", domains: [] });

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
      price: 7000,
      smallDescription:
        "Are you a software developer striving for that senior title, or a senior developer ready to step into engineering management? Transitioning to a higher role or preparing for interviews can be a complex process, often leaving you feeling unsure of your next move. Without the right mentorship, you might struggle...",
      communication: [
        { type: "Chat", icon: "chat" },
        { type: "2 x Calls", icon: "phone" },
      ],
      profileImage: img1,
    },
    {
      name: "John Smith",
      role: "Senior UX Manager/Lead at Apple | ex-Google | ex-Amazon",
      description: "Landing mentees awesome UX jobs!",
      rating: 5,
      reviews: 138,
      languages: ["English", "Spanish", "French"],
      domains: [
        "UX & Design",
        "Product Design",
        "User Interface Design",
        "UX/UI Design",
        "Visual Design",
        "UX Design",
      ],
      skills: [
        "UX & Design",
        "Product Design",
        "User Interface Design",
        "UX/UI Design",
        "Visual Design",
        "UX Design",
      ],
      price: 6000,
      smallDescription:
        "Hi there! Thanks for checking out my profile! I currently lead UX for Apple's iPhone and AI teams. I have 20+ years of experience working on iconic products at Google (YouTube, Maps, Gmail), Amazon, and now Apple, plus a strong startup background. As your mentor, you'll receive hands-on support to land your dream job in UX.",
      communication: [
        { type: "Chat", icon: "chat" },
        { type: "1 x Call", icon: "phone" },
        { type: "Tasks", icon: "task" },
      ],
      profileImage: img2,
    },
    {
      name: "Manson Ng",
      role: "Principal Software Engineer Manager at Microsoft",
      description: "17+ years of experience in software development",
      rating: 5,
      reviews: 48,
      languages: ["English", "Mandarin", "German"],
      domains: [
        "Engineering & Data",
        "Software Engineering",
        "System Design",
        "Tech Leadership",
        "Project Management",
      ],
      skills: [
        "Software Engineering",
        "System Design",
        "Tech Leadership",
        "Project Management",
        "Code Review",
        "Technical Interviews",
      ],
      price: 5000,
      smallDescription:
        "Hello! I'm a seasoned engineer and team leader with over 17 years of experience in software engineering. I specialize in helping engineers grow their careers, improve their technical skills, and navigate the challenges of senior-level positions. Let's connect and advance your career together!",
      communication: [
        { type: "Chat", icon: "chat" },
        { type: "3 x Calls", icon: "phone" },
      ],
      profileImage: img3,
    },
  ];

  const filteredMentors = mentors.filter((mentor) => {
    const languageMatch =
      filters.language === "" || mentor.languages.includes(filters.language);
    const domainMatch =
      filters.domains.length === 0 ||
      filters.domains.some((domain) => mentor.domains.includes(domain));
    return languageMatch && domainMatch;
  });

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
                src={mentor.profileImage}
                alt={mentor.name}
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
                <p className="text-green-500 font-semibold">
                  {mentor.description}
                </p>
                <div className="flex items-center mt-2">
                  <span className="text-yellow-400">
                    {"★".repeat(mentor.rating)}
                  </span>
                  <span
                    className={`ml-2 ${
                      darkMode ? "text-gray-400" : "text-gray-700"
                    }`}
                  >
                    ({mentor.reviews} reviews)
                  </span>
                </div>
                <div className="flex mt-3 space-x-4">
                  {mentor.communication.map((comm, idx) => (
                    <div
                      key={idx}
                      className="flex items-center space-x-2 text-gray-500"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-5 w-5 ${
                          darkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        {comm.icon === "chat" && (
                          <path
                            fillRule="evenodd"
                            d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                            clipRule="evenodd"
                          />
                        )}
                        {comm.icon === "phone" && (
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        )}
                        {comm.icon === "task" && (
                          <path
                            fillRule="evenodd"
                            d="M5 3a1 1 0 011-1h8a1 1 0 011 1v2a1 1 0 01-1 1H6a1 1 0 01-1-1V3zm4 8h2v2H9v-2z"
                            clipRule="evenodd"
                          />
                        )}
                      </svg>
                      <span
                        className={`${
                          darkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        {comm.type}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <h3
                    className={`text-lg font-semibold ${
                      darkMode ? "text-gray-300" : "text-gray-900"
                    }`}
                  >
                    Languages
                  </h3>
                  <p
                    className={`text-sm ${
                      darkMode ? "text-gray-400" : "text-gray-700"
                    }`}
                  >
                    {mentor.languages.join(", ")}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <p
                className={`text-sm ${
                  darkMode ? "text-gray-300" : "text-gray-800"
                }`}
              >
                {mentor.smallDescription}
              </p>
              <div className="flex flex-wrap mt-4 gap-2">
                {mentor.skills.map((skill) => (
                  <span
                    key={skill}
                    className={`rounded-full px-3 py-1 text-xs font-medium ${tagStyles}`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 flex justify-between items-center">
              <div>
                <span
                  className={`text-2xl font-semibold ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  ₹{mentor.price}
                </span>
                <span
                  className={`text-gray-500 ${
                    darkMode ? "text-gray-400" : "text-gray-700"
                  }`}
                >
                  / month
                </span>
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300 transform hover:scale-105">
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MentorCard;
