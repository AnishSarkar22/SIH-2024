import React, { useState } from "react";

const FilterComponent = ({ darkMode, onFilterChange }) => {
  const [language, setLanguage] = useState("");
  const [selectedDomains, setSelectedDomains] = useState([]);

  const filterStyles = darkMode
    ? "bg-gray-900 text-white border-gray-700"
    : "bg-white text-gray-900 border-gray-200";

  const handleFilterChange = () => {
    onFilterChange({ language, domains: selectedDomains });
  };

  const allDomains = [
    "Engineering & Data",
    "Software Engineering",
    "UX & Design",
    "Product Design",
    "User Interface Design",
    "UX/UI Design",
    "Visual Design",
    "UX Design",
    "System Design",
    "Tech Leadership",
    "Project Management",
    "Code Review",
    "Technical Interviews",
  ];

  const handleDomainChange = (e) => {
    const domain = e.target.value;
    if (domain && !selectedDomains.includes(domain)) {
      setSelectedDomains([...selectedDomains, domain]);
    }
  };

  const removeDomain = (domain) => {
    setSelectedDomains(selectedDomains.filter((d) => d !== domain));
  };

  return (
    <div className={`p-4 mb-6 rounded-lg ${filterStyles} w-full max-w-md`}>
      <h3
        className={`text-lg font-semibold mb-4 ${
          darkMode ? "text-white" : "text-gray-900"
        }`}
      >
        Filter Mentors
      </h3>
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[200px]">
          <label
            htmlFor="language"
            className={`block mb-2 text-sm font-medium ${
              darkMode ? "text-gray-300" : "text-gray-900"
            }`}
          >
            Language
          </label>
          <select
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className={`w-full p-2 rounded-md ${
              darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-900"
            } border ${darkMode ? "border-gray-600" : "border-gray-300"}`}
          >
            <option value="">All Languages</option>
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
            <option value="Mandarin">Mandarin</option>
            <option value="German">German</option>
          </select>
        </div>
        <div className="flex-1 min-w-[200px]">
          <label
            htmlFor="domain"
            className={`block mb-2 text-sm font-medium ${
              darkMode ? "text-gray-300" : "text-gray-900"
            }`}
          >
            Domain
          </label>
          <select
            id="domain"
            value=""
            onChange={handleDomainChange}
            className={`w-full p-2 rounded-md ${
              darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-900"
            } border ${darkMode ? "border-gray-600" : "border-gray-300"}`}
          >
            <option value="">Select Domains</option>
            {allDomains
              .filter((d) => !selectedDomains.includes(d))
              .map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
          </select>
        </div>
      </div>
      {selectedDomains.length > 0 && (
        <div className="mt-4">
          <p
            className={`text-sm font-medium mb-2 ${
              darkMode ? "text-gray-300" : "text-gray-900"
            }`}
          >
            Selected Domains:
          </p>
          <div className="flex flex-wrap gap-2">
            {selectedDomains.map((domain) => (
              <span
                key={domain}
                className={`px-2 py-1 rounded-full text-xs ${
                  darkMode
                    ? "bg-gray-700 text-white"
                    : "bg-gray-200 text-gray-800"
                } flex items-center`}
              >
                {domain}
                <button
                  onClick={() => removeDomain(domain)}
                  className="ml-1 text-xs font-bold"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
      <button
        onClick={handleFilterChange}
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default FilterComponent;
