import React, { useState, useEffect } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaMoon,
  FaSun,
} from "react-icons/fa"; // Correct imports
import { BsToggle2Off, BsToggle2On } from "react-icons/bs"; // New toggle icons

const Header = ({ toggleSidebar, sidebarShrink, darkMode, toggleDarkMode }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    try {
      const isDarkModeEnabled = localStorage.getItem("darkMode") === "enabled";
      const userPreferenceDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;

      if (
        isDarkModeEnabled ||
        (!localStorage.getItem("darkMode") && userPreferenceDark)
      ) {
        toggleDarkMode(true);
      }

      const sidebarState = localStorage.getItem("sidebarState");
      if (sidebarState === "shrink") {
        toggleSidebar(true);
      }
    } catch (error) {
      console.error("Error accessing local storage", error);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode ? "enabled" : "disabled");
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem("sidebarState", sidebarShrink ? "shrink" : "expanded");
  }, [sidebarShrink]);

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-5">
          <button
            onClick={toggleSidebar}
            className="text-gray-500 focus:outline-none"
            aria-label="Toggle Sidebar"
            style={{ width: '50px', height: '50px' }} // Increase the size of the button
          >
            {sidebarShrink ? (
              <FaChevronRight size={24} /> // Increase the size of the icon
            ) : (
              <FaChevronLeft size={24} /> // Increase the size of the icon
            )}
          </button>
          <div className="relative flex-grow mr-4" style={{ width: "300%" }}>
            <input
              type="text"
              placeholder="Search Mentors..."
              className="w-[600px] p-2 pl-10 rounded-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-sm shadow-gray-600"
            />
            <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"></i>
          </div>
        </div>
        <div className="flex items-center space-x-8">
          <button
            onClick={toggleDarkMode}
            className="text-gray-500 focus:outline-none flex items-center space-x-6"
            aria-label="Toggle Dark Mode"
            style={{ width: '80px', height: '60px' }} // Increase the size of the button
          >
            {darkMode ? (
              <>
                <FaMoon size={30} /> 
                <BsToggle2On size={40} /> 
              </>
            ) : (
              <>
                <FaSun size={30} /> 
                <BsToggle2Off size={40} /> 
              </>
            )}
          </button>
          <div className="relative">
            <button
              id="dropdownNotificationButton"
              className="text-green-700 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 focus:outline-none"
              onClick={toggleDropdown}
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 14 20"
              >
                <path d="M12.133 10.632v-1.8A5.406 5.406 0 0 0 7.979 3.57.946.946 0 0 0 8 3.464V1.1a1 1 0 0 0-2 0v2.364a.946.946 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C1.867 13.018 0 13.614 0 14.807 0 15.4 0 16 .538 16h12.924C14 16 14 15.4 14 14.807c0-1.193-1.867-1.789-1.867-4.175ZM3.823 17a3.453 3.453 0 0 0 6.354 0H3.823Z" />
              </svg>
              <div className="absolute block w-3 h-3 bg-red-500 border-2 border-white rounded-full -top-0.5 start-2.5 dark:border-gray-900"></div>
            </button>
            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div
                id="dropdownNotification"
                className="z-20 absolute right-0 w-64 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow-lg dark:bg-gray-800 dark:divide-gray-700"
                aria-labelledby="dropdownNotificationButton"
              >
                <div className="block px-4 py-2 font-medium text-center text-gray-700 rounded-t-lg bg-gray-50 dark:bg-gray-800 dark:text-white">
                  Notifications
                </div>
                <div className="divide-y divide-gray-100 dark:divide-gray-700">
                  <a
                    href="#"
                    className="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <div className="flex-shrink-0 relative">
                      <img
                        className="rounded-full w-11 h-11"
                        src="/docs/images/people/profile-picture-1.jpg"
                        alt="Jese image"
                      />
                      <div className="absolute flex items-center justify-center w-5 h-5 ms-6 -mt-5 bg-blue-600 border border-white rounded-full dark:border-gray-800">
                        <svg
                          className="w-2 h-2 text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 18 18"
                        >
                          <path d="M1 18h16a1 1 0 0 0 1-1v-6h-4.439a.99.99 0 0 0-.908.6 3.978 3.978 0 0 1-7.306 0 .99.99 0 0 0-.908-.6H0v6a1 1 0 0 0 1 1Z" />
                          <path d="M4.439 9a2.99 2.99 0 0 1 2.742 1.8 1.977 1.977 0 0 0 3.638 0A2.99 2.99 0 0 1 13.561 9H17.8L15.977.783A1 1 0 0 0 15 0H3a1 1 0 0 0-.977.783L.2 9h4.239Z" />
                        </svg>
                      </div>
                    </div>
                    <div className="w-full ps-3">
                      <div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400">
                        New message from{" "}
                        <span className="font-semibold text-gray-900 dark:text-white">
                          Jese Leos
                        </span>
                        : "Hey, what's up? All set for the presentation?"
                      </div>
                      <div className="text-xs text-blue-600 dark:text-blue-500">
                        a few moments ago
                      </div>
                    </div>
                  </a>
                  {/* Add more notification items here */}
                </div>
                <a
                  href="#"
                  className="block py-2 text-sm font-medium text-center text-gray-900 rounded-b-lg bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white"
                >
                  <div className="inline-flex items-center ">
                    <svg
                      className="w-4 h-4 me-2 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 14"
                    >
                      <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                    </svg>
                    View all
                  </div>
                </a>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <img
              src="/images/l1.png"
              alt="User avatar"
              className="w-8 h-8 rounded-full"
            />
            <span className="text-gray-700 dark:text-gray-200">
              John Doe
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;