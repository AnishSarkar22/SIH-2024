import React, { useState } from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import MentorDetails from "./Mentordetails";

function Mentorprofile() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    return savedDarkMode === "enabled";
  });

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", !darkMode ? "enabled" : "disabled");
  };

  const [sidebarShrink, setSidebarShrink] = useState(false);

  const toggleSidebar = () => {
    setSidebarShrink(!sidebarShrink);
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
          <div>
            {/* Add other content or components here */}
            <MentorDetails
              darkMode={darkMode}
              toggleDarkMode={toggleDarkMode}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mentorprofile;