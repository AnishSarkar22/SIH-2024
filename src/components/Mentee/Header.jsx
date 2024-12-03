import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight, FaMoon, FaSun } from "react-icons/fa";
import { BsToggle2Off, BsToggle2On, BsBellFill } from "react-icons/bs";

const Header = ({ toggleSidebar, sidebarShrink, darkMode, toggleDarkMode }) => {
  const [userName, setUserName] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

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
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", darkMode ? "enabled" : "disabled");
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem("sidebarState", sidebarShrink ? "shrink" : "expanded");
  }, [sidebarShrink]);

  useEffect(() => {
    try {
      const userData = JSON.parse(localStorage.getItem("userData"));
      setUserName(userData?.name || "Guest");
    } catch (error) {
      console.error("Error parsing user data:", error);
      setUserName("Guest");
    }
  }, []);

  return (
    <header className="bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="flex items-center justify-between p-4">
        {/* Sidebar Toggle and Search */}
        <div className="flex items-center space-x-5">
          <button
            onClick={toggleSidebar}
            className="text-gray-500 dark:text-gray-300 focus:outline-none hidden lg:block"
            aria-label="Toggle Sidebar"
          >
            {sidebarShrink ? (
              <FaChevronRight size={24} />
            ) : (
              <FaChevronLeft size={24} />
            )}
          </button>
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search Mentors..."
              className="w-full lg:w-[600px] ml-7 lg:ml-0 mt-2 lg:mt-0 p-2 pl-10 rounded-lg dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-md transition-colors duration-300"
            />
            <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 ml-7 lg:ml-0 mt-1 lg:mt-0"></i>
          </div>
        </div>

        {/* Dark Mode Toggle, Notifications, and User Info */}
        <div className="flex items-center space-x-8">
          <button
            onClick={toggleDarkMode}
            className="text-gray-500 focus:outline-none items-center space-x-2 hidden lg:flex dark:text-gray-300"
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? (
              <>
                <FaMoon size={24} />
                <BsToggle2On size={24} />
              </>
            ) : (
              <>
                <FaSun size={24} />
                <BsToggle2Off size={24} />
              </>
            )}
          </button>

          {/* Notifications Dropdown */}
          <div className="relative hidden lg:block">
            <button
              className="text-gray-500 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 focus:outline-none"
              onClick={toggleDropdown}
              aria-expanded={isDropdownOpen}
              aria-haspopup="true"
            >
              <BsBellFill size={24} />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
                <div className="px-4 py-2 text-gray-800 dark:text-gray-200">
                  Notifications
                </div>
                <div className="divide-y divide-gray-100 dark:divide-gray-700 transition-colors duration-300">
                  <a
                    href="#"
                    className="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
                  >
                    <div className="flex-shrink-0 relative">
                      <img
                        className="rounded-full w-11 h-11"
                        src="images/thomasjohn.jpeg"
                        alt="Jese image"
                      />
                      <div className="absolute flex items-center justify-center w-5 h-5 ms-6 -mt-5 bg-blue-600 border border-white rounded-full dark:border-gray-800 transition-colors duration-300">
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
                      <div className="text-gray-500 text-sm mb-1.5 font-semibold dark:text-gray-400 transition-colors duration-300">
                        New message from{" "}
                        <span className=" text-gray-900 dark:text-white">
                          Jese Leos
                        </span>
                        : Are all your doubts clear?
                      </div>
                      <div className="text-xs text-blue-600 dark:text-blue-500 transition-colors duration-300">
                        a few moments ago
                      </div>
                    </div>
                  </a>
                </div>
                <a
                  href="#"
                  className="block py-2 text-sm font-medium text-center text-gray-900 rounded-b-lg bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white transition-colors duration-300"
                >
                  <div className="inline-flex items-center ">
                    <svg
                      className="w-4 h-4 me-2 text-gray-500 dark:text-gray-400 transition-colors duration-300"
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

          {/* User Info */}
          <div className="items-center px-5 py-2 space-x-5 hidden lg:flex border-2  border-gray-500  dark:bg-slate-300 rounded-lg">
            <img
              src="images/kankana.png"
              alt="User avatar"
              className="w-8 h-8 rounded-full"
            />
            <span className="text-gray-500 font-bold text-lg dark:text-gray-700">{userName}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;