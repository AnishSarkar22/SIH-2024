import React, { useState, useEffect } from "react";
import Header from "./header";
import Sidebar from "./sidebar";
import BookingsList from "./bookings";

function Greetings() {
  // ... existing code ...
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode === "true" ? true : false;
  });

  const [sidebarShrink, setSidebarShrink] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
    localStorage.setItem("darkMode", !isDarkMode); // Save to localStorage
  };

  const toggleSidebar = () => {
    setSidebarShrink((prevShrink) => !prevShrink);
  };

  return (
    <div
      className={`flex h-screen overflow-hidden ${isDarkMode ? "dark" : ""}`}
    >
      <Sidebar
        sidebarShrink={sidebarShrink}
        isDarkMode={isDarkMode}
        toggleSidebar={toggleSidebar}
      />
      <div className="flex-1 flex flex-col">
        <Header
          toggleSidebar={toggleSidebar}
          sidebarShrink={sidebarShrink}
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
        />
        <div className="flex-1 overflow-y-auto bg-white dark:bg-gray-900">
          <div className="px-6 py-4">
            <h1 className="text-3xl font-semibold mb-4 text-gray-900 dark:text-white">
              Welcome to Bookings Page
            </h1>
            <BookingsList />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Greetings;