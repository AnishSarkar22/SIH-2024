import React, { useState, useEffect, useRef } from "react";
import * as XLSX from "xlsx";
import skillsFile from "../Data/Skills.xlsx";

const SkillsDropdown = () => {
  const [skills, setSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSearch, setActiveSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  useEffect(() => {
    const loadSkills = async () => {
      try {
        const response = await fetch(skillsFile);
        const arrayBuffer = await response.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: "buffer" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet);

        const skillList = jsonData
          .map(
            (row) => row.Skills || row["Skills"] || row["skill"] || row["Skill"]
          )
          .filter((skill) => skill && typeof skill === "string");

        setSkills(skillList);
      } catch (error) {
        console.error("Error loading skills file:", error);
      }
    };

    loadSkills();

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setIsSearching(true);
      setActiveSearch(searchQuery.trim());
      setTimeout(() => setIsSearching(false), 300);
    }
  };

  const handleSkillSelect = (skill) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const removeSkill = (skillToRemove) => {
    setSelectedSkills((prev) =>
      prev.filter((skill) => skill !== skillToRemove)
    );
  };

  const filteredSkills = skills.filter(
    (skill) =>
      !selectedSkills.includes(skill) &&
      (activeSearch === "" ||
        skill.toLowerCase().includes(activeSearch.toLowerCase()))
  );

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div className="flex flex-wrap gap-2 mb-2">
        {selectedSkills.map((skill) => (
          <div
            key={skill}
            className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
          >
            {skill}
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeSkill(skill);
              }}
              className="ml-2 text-blue-500 hover:text-blue-700"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <div
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="w-full border border-gray-300 rounded-md p-2 cursor-pointer bg-white"
      >
        {selectedSkills.length > 0
          ? `Selected Skills : (${selectedSkills.length})`
          : "Select Skills"}
      </div>

      {isDropdownOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
          <div className="p-2 border-b border-gray-200">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search skills... (Press Enter)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
              onClick={(e) => e.stopPropagation()}
              className={`w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isSearching ? "bg-gray-50" : "bg-white"
              }`}
              autoFocus
            />
          </div>

          <div className="max-h-60 overflow-y-auto">
            {isSearching ? (
              <div className="px-3 py-2 text-gray-500">Searching...</div>
            ) : filteredSkills.length > 0 ? (
              filteredSkills.map((skill) => (
                <div
                  key={skill}
                  onClick={() => handleSkillSelect(skill)}
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {skill}
                </div>
              ))
            ) : (
              <div className="px-3 py-2 text-gray-500">
                {activeSearch
                  ? "No matching skills found"
                  : "No skills available"}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillsDropdown;