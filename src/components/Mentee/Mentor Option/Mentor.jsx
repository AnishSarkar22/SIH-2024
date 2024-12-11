import React, { useState } from "react";
import Sidebar from "../Sidebar";
import Header from "../Header";
import MentorCard from "./Mentar_card";

function Mentor() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    return savedDarkMode === "enabled";
  });

  const [sidebarShrink, setSidebarShrink] = useState(false);

  const toggleSidebar = () => {
    setSidebarShrink(!sidebarShrink);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", !darkMode ? "enabled" : "disabled");
  };

  return (
    <div className={`flex h-screen overflow-hidden ${darkMode ? "dark" : ""}`}>
      <Sidebar
        sidebarShrink={sidebarShrink}
        isDarkMode={darkMode}
        toggleSidebar={toggleSidebar}
      />
      <div className="flex-1 flex flex-col">
        <Header
          toggleSidebar={toggleSidebar}
          sidebarShrink={sidebarShrink}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
        />
        <div
          className={`flex-1 overflow-y-auto ${
            darkMode ? "bg-gray-900" : "bg-white"
          }`}
        >
          <div className="px-6 py-4">
            <h1
              className={`text-3xl font-semibold mb-4 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Top Mentors Available
            </h1>
            <MentorCard darkMode={darkMode} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mentor;