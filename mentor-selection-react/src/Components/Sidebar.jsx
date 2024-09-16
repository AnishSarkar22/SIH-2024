import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaUserFriends,
  FaUserTie,
  FaInbox,
  FaMedal,
  FaBook,
  FaUser,
} from "react-icons/fa";

import img1dark from "../img/darknew.svg";
import img2white from "../img/logo-white-removebg-preview.svg";

const Sidebar = ({ isDarkMode, sidebarShrink, toggleSidebar }) => {
  const [isSidebarShrink, setIsSidebarShrink] = useState(sidebarShrink);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

  useEffect(() => {
    setIsSidebarShrink(sidebarShrink);
  }, [sidebarShrink]);

  useEffect(() => {
    localStorage.setItem(
      "sidebarState",
      isSidebarShrink ? "shrink" : "expanded"
    );
  }, [isSidebarShrink]);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  const handleToggleSidebar = () => {
    setIsSidebarShrink(!isSidebarShrink);
    toggleSidebar();
  };

  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      <aside
        className={`flex flex-col ${
          isSidebarShrink ? "w-16" : "w-64"
        } bg-gray-300 dark:bg-gray-800 transition-width duration-300 border border-black rounded-r-2xl overflow-hidden h-full`}
      >
        <div
          className={`p-4 flex items-center border-b ${
            isDarkMode ? "border-gray-700" : "border-gray-300"
          }`}
        >
          <img
            src={isDarkMode ? img1dark : img2white}
            alt="Rewind-UI"
            className={`w-12 h-12 ${
              isDarkMode ? "bg-gray-800" : "bg-gray-300"
            } p-1 rounded-full`}
          />
          {!isSidebarShrink && (
            <span className="ml-3 font-semibold text-xl dark:text-white">
              Guide Me
            </span>
          )}
        </div>
        <div
          className={`border-t ${isDarkMode ? "border-white" : "border-black"}`}
        ></div>

        <nav className="flex-grow overflow-y-auto flex flex-col space-y-4 mt-10 bg-gray-300 dark:bg-gray-800 rounded-r-2xl">
          <Link
            to="/dashboard"
            className={`relative flex items-center p-2 rounded-lg text-gray-600 dark:text-gray-300 ${
              isSidebarShrink
                ? "hover:bg-[#f6a870] justify-center"
                : "hover:bg-[#f6a870] active:bg-[#f6a870] active:text-white"
            }`}
            onClick={() => setActiveLink("/dashboard")}
          >
            <div className="flex items-center">
              <FaHome className="text-xl w-8 text-center" />
              {!isSidebarShrink && (
                <span className="ml-3 text-lg sidebar-text">Home</span>
              )}
            </div>
            {activeLink === "/dashboard" && (
              <span className="absolute left-0 bottom-0 w-full h-1 bg-blue-500 dark:bg-blue-700 animate-slide"></span>
            )}
          </Link>
          <Link
            to="/classes"
            className={`relative flex items-center p-2 rounded-lg text-gray-600 dark:text-gray-300 ${
              isSidebarShrink
                ? "hover:bg-[#f6a870] justify-center"
                : "hover:bg-[#f6a870]"
            }`}
            onClick={() => setActiveLink("/classes")}
          >
            <div className="flex items-center">
              <FaUserFriends className="text-xl w-8 text-center" />
              {!isSidebarShrink && (
                <span className="ml-3 text-lg sidebar-text">Classes</span>
              )}
            </div>
            {activeLink === "/classes" && (
              <span className="absolute left-0 bottom-0 w-full h-1 bg-blue-500 animate-slide"></span>
            )}
          </Link>
          <Link
            to="/mentors"
            className={`relative flex items-center p-2 rounded-lg text-gray-600 dark:text-gray-300 ${
              isSidebarShrink
                ? "hover:bg-[#f6a870] justify-center"
                : "hover:bg-[#f6a870]"
            }`}
            onClick={() => setActiveLink("/mentors")}
          >
            <div className="flex items-center">
              <FaUserTie className="text-xl w-8 text-center" />
              {!isSidebarShrink && (
                <span className="ml-3 text-lg sidebar-text">Mentors</span>
              )}
            </div>
            {activeLink === "/mentors" && (
              <span className="absolute left-0 bottom-0 w-full h-1 bg-blue-500 animate-slide"></span>
            )}
          </Link>
          <Link
            to="/message"
            className={`relative flex items-center p-2 rounded-lg text-gray-600 dark:text-gray-300 ${
              isSidebarShrink
                ? "hover:bg-[#f6a870] justify-center"
                : "hover:bg-[#f6a870]"
            }`}
            onClick={() => setActiveLink("/message")}
          >
            <div className="flex items-center">
              <FaInbox className="text-xl w-8 text-center" />
              {!isSidebarShrink && (
                <span className="ml-3 text-lg sidebar-text">Messages</span>
              )}
            </div>
            {activeLink === "/message" && (
              <span className="absolute left-0 bottom-0 w-full h-1 bg-blue-500 animate-slide"></span>
            )}
          </Link>
          <Link
            to="/leaderboard"
            className={`relative flex items-center p-2 rounded-lg text-gray-600 dark:text-gray-300 ${
              isSidebarShrink
                ? "hover:bg-[#f6a870] justify-center"
                : "hover:bg-[#f6a870]"
            }`}
            onClick={() => setActiveLink("/leaderboard")}
          >
            <div className="flex items-center">
              <FaMedal className="text-xl w-8 text-center" />
              {!isSidebarShrink && (
                <span className="ml-3 text-lg sidebar-text">Leaderboard</span>
              )}
            </div>
            {activeLink === "/leaderboard" && (
              <span className="absolute left-0 bottom-0 w-full h-1 bg-blue-500 animate-slide"></span>
            )}
          </Link>
          <Link
            to="/resources"
            className={`relative flex items-center p-2 rounded-lg text-gray-600 dark:text-gray-300 ${
              isSidebarShrink
                ? "hover:bg-[#f6a870] justify-center"
                : "hover:bg-[#f6a870]"
            }`}
            onClick={() => setActiveLink("/resources")}
          >
            <div className="flex items-center">
              <FaBook className="text-xl w-8 text-center" />
              {!isSidebarShrink && (
                <span className="ml-3 text-lg sidebar-text">Resources</span>
              )}
            </div>
            {activeLink === "/resources" && (
              <span className="absolute left-0 bottom-0 w-full h-1 bg-blue-500 animate-slide"></span>
            )}
          </Link>
          <Link
            to="/profile"
            className={`relative flex items-center p-2 rounded-lg text-gray-600 dark:text-gray-300 ${
              isSidebarShrink
                ? "hover:bg-[#f6a870] justify-center"
                : "hover:bg-[#f6a870]"
            }`}
            onClick={() => setActiveLink("/profile")}
          >
            <div className="flex items-center">
              <FaUser className="text-xl w-8 text-center" />
              {!isSidebarShrink && (
                <span className="ml-3 text-lg sidebar-text">Profile</span>
              )}
            </div>
            {activeLink.startsWith("/profile") && (
              <span className="absolute left-0 bottom-0 w-full h-1 bg-blue-500 animate-slide"></span>
            )}
          </Link>
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;
