import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faInbox,
  faCompass,
  faUserGroup,
  faMedal,
  faCircleUser,
  faBook,
  faRightFromBracket,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = ({ isDarkMode, sidebarShrink, toggleSidebar }) => {
  const [isSidebarShrink, setIsSidebarShrink] = useState(sidebarShrink);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });
  const location = useLocation();
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState(location.pathname);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

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

  const handleLogout = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include cookies in the request
      });

      if (response.ok) {
        // Clear localStorage
        localStorage.clear();
        // Redirect to signin page
        navigate("/login");
      } else {
        const errorData = await response.json();
        console.error("Error during logout:", errorData.error);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const getLinkStyle = (path) => {
    if (activeLink === path) {
      return isDarkMode
        ? { backgroundColor: "white", color: "black" }
        : { backgroundColor: "black", color: "white" };
    }
    return {};
  };

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen flex flex-col">
      {/* Mobile toggle button */}
      {!isSidebarOpen && (
        <button
          className="lg:hidden p-4 mr-16 text-gray-600 dark:text-gray-300 fixed top-4 left-1 z-50"
          onClick={toggleMobileMenu}
        >
          <FontAwesomeIcon icon={faBars} className="text-2xl dark:text-gray-300" />
        </button>
      )}
      {/* Sidebar */}
      <aside
        className={`fixed lg:relative top-0 left-0 lg:left-auto lg:top-auto z-40 lg:z-auto flex flex-col ${
          isSidebarShrink ? "w-20" : "w-64"
        } bg-white dark:bg-gray-800 border dark:border-gray-800 transition-width duration-300 rounded-r-2xl overflow-hidden h-full ${
          isSidebarOpen ? "block" : "hidden lg:block"
        } overflow-y-auto`}
      >
        <div
          className={`p-4 flex items-center justify-between border-b ${
            isDarkMode ? "border-gray-700" : "border-gray-300"
          }`}
        >
          <div className="flex items-center">
            <img
              src={
                isDarkMode
                  ? "/images/logo-white-removebg-preview.svg"
                  : "/images/logo-color-removebg-preview.svg"
              }
              alt="Rewind-UI"
              className="w-12 h-12"
            />
            {!isSidebarShrink && (
              <span className="ml-3 font-semibold text-xl text-gray-700 dark:text-gray-200">
                GuideMe
              </span>
            )}
          </div>
          {!isSidebarShrink && (
            <button
              className="lg:hidden text-gray-600 dark:text-gray-300 ml-2"
              onClick={toggleMobileMenu}
            >
              <FontAwesomeIcon icon={faXmark} className="text-2xl" />
            </button>
          )}
        </div>
        <div className={` ${isDarkMode ? "" : ""}`}></div>
        <div className="flex flex-col justify-between">
          <nav className="flex-grow overflow-y-auto flex flex-col space-y-4 mt-1-300 dark:bg-gray-800 rounded-r-2xl lg:mt-12 lg:relative">
            <Link
              to="/dashboard"
              className={`relative flex items-center p-2 ml-3 mr-3 rounded-lg text-gray-600 dark:text-gray-300 ${
                isSidebarShrink
                  ? "hover:bg-gray-600 hover:text-white dark:hover:bg-gray-600 justify-center"
                  : "hover:bg-gray-600 hover:text-white dark:hover:bg-gray-600"
              }`}
              onClick={() => setActiveLink("/dashboard")}
              style={getLinkStyle("/dashboard")}
            >
              <div className="flex items-center">
              <FontAwesomeIcon
                icon={faHouse}
                className="text-xl w-8 text-center"
              />
                {!isSidebarShrink && (
                  <span className="ml-3 text-lg sidebar-text">Home</span>
                )}
              </div>
            </Link>
            <Link
              to="/classes"
              className={`relative flex items-center p-2 ml-3 mr-3 rounded-lg text-gray-600 dark:text-gray-300 ${
                isSidebarShrink
                  ? "hover:bg-gray-600 hover:text-white dark:hover:bg-gray-600 justify-center"
                  : "hover:bg-gray-600 hover:text-white dark:hover:bg-gray-600"
              }`}
              onClick={() => setActiveLink("/classes")}
              style={getLinkStyle("/classes")}
            >
              <div className="flex items-center">
              <FontAwesomeIcon
                icon={faUserGroup}
                className="text-xl w-8 text-center"
              />
                {!isSidebarShrink && (
                  <span className="ml-3 text-lg sidebar-text">Classes</span>
                )}
              </div>
            </Link>
            <Link
              to="/explore"
              className={`relative flex items-center p-2 ml-3 mr-3 rounded-lg text-gray-600 dark:text-gray-300 ${
                isSidebarShrink
                  ? "hover:bg-gray-600 hover:text-white  dark:hover:bg-gray-600 justify-center"
                  : "hover:bg-gray-600 hover:text-white dark:hover:bg-gray-600"
              }`}
              onClick={() => setActiveLink("/explore")}
              style={getLinkStyle("/explore")}
            >
              <div className="flex items-center">
              <FontAwesomeIcon
                icon={faCompass}
                className="text-xl w-8 text-center"
              />
                {!isSidebarShrink && (
                  <span className="ml-3 text-lg sidebar-text">Explore</span>
                )}
              </div>
            </Link>
            <Link
              to="/message"
              className={`relative flex items-center p-2 ml-3 mr-3 rounded-lg text-gray-600 dark:text-gray-300 ${
                isSidebarShrink
                  ? "hover:bg-gray-600 hover:text-white dark:hover:bg-gray-600 justify-center"
                  : "hover:bg-gray-600 hover:text-white dark:hover:bg-gray-600"
              }`}
              onClick={() => setActiveLink("/message")}
              style={getLinkStyle("/message")}
            >
              <div className="flex items-center">
              <FontAwesomeIcon
                icon={faInbox}
                className="text-xl w-8 text-center"
              />
                {!isSidebarShrink && (
                  <span className="ml-3 text-lg sidebar-text">Messages</span>
                )}
              </div>
            </Link>
            <Link
              to="/leaderboard"
              className={`relative flex items-center p-2 ml-3 mr-3 rounded-lg text-gray-600 dark:text-gray-300 ${
                isSidebarShrink
                  ? "hover:bg-gray-600 hover:text-white dark:hover:bg-gray-600 justify-center"
                  : "hover:bg-gray-600 hover:text-white dark:hover:bg-gray-600"
              }`}
              onClick={() => setActiveLink("/leaderboard")}
              style={getLinkStyle("/leaderboard")}
            >
              <div className="flex items-center">
              <FontAwesomeIcon
                icon={faMedal}
                className="text-xl w-8 text-center"
              />
                {!isSidebarShrink && (
                  <span className="ml-3 text-lg sidebar-text">Leaderboard</span>
                )}
              </div>
            </Link>
            <Link
              to="/resources"
              className={`relative flex items-center p-2 ml-3 mr-3 rounded-lg text-gray-600 dark:text-gray-300 ${
                isSidebarShrink
                  ? "hover:bg-gray-600 hover:text-white dark:hover:bg-gray-600 justify-center"
                  : "hover:bg-gray-600 hover:text-white last:dark:hover:bg-gray-600"
              }`}
              onClick={() => setActiveLink("/resources")}
              style={getLinkStyle("/resources")}
            >
              <div className="flex items-center">
              <FontAwesomeIcon
                icon={faBook}
                className="text-xl w-8 text-center"
              />
                {!isSidebarShrink && (
                  <span className="ml-3 text-lg sidebar-text">Resources</span>
                )}
              </div>
            </Link>
            <Link
              to="/profile"
              className={`relative flex items-center p-2 ml-3 mr-3 rounded-lg text-gray-600 dark:text-gray-300 ${
                isSidebarShrink
                  ? "hover:bg-gray-600 hover:text-white dark:hover:bg-gray-600 justify-center"
                  : "hover:bg-gray-600 hover:text-white dark:hover:bg-gray-600"
              }`}
              onClick={() => setActiveLink("/profile")}
              style={getLinkStyle("/profile")}
            >
              <div className="flex items-center ">
              <FontAwesomeIcon
                icon={faCircleUser}
                className="text-xl w-8 text-center"
              />
                {!isSidebarShrink && (
                  <span className="ml-3 text-lg sidebar-text">Profile</span>
                )}
              </div>
            </Link>
          </nav>
          <div className="mt-auto lg:absolute bottom-0">
            <Link
              to="/signin"
              className={`relative flex items-center p-2 ml-3 mr-3 rounded-lg text-gray-600 dark:text-gray-300 ${
                isSidebarShrink
                  ? "hover:bg-gray-600 hover:text-white dark:hover:bg-gray-600 justify-center"
                  : "hover:bg-gray-600 hover:text-white dark:hover:bg-gray-600"
              }`}
              onClick={handleLogout}
              style={getLinkStyle("/login")}
            >
              <div className="flex items-center">
                <FontAwesomeIcon
                  icon={faRightFromBracket}
                  className="text-xl w-8 text-center"
                />
                {!isSidebarShrink && (
                  <span className="ml-3 text-lg sidebar-text">Sign Out</span>
                )}
              </div>
            </Link>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
