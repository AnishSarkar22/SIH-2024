import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  MoreVertical,
  UserCircle,
  BarChart2,
  Bell,
  Settings,
  LogOut,
} from "lucide-react";
import {
  FaHome,
  FaInbox,
  FaCalendarAlt,
  FaUsers,
  FaBars,
  FaTimes,
  FaBook,
} from "react-icons/fa";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";

const MSidebar = ({ isDarkMode, sidebarShrink, toggleSidebar }) => {
  const [isSidebarShrink, setIsSidebarShrink] = useState(sidebarShrink);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });
  const location = useLocation();
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState(location.pathname);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const menuItems = [
    {
      label: "Profile",
      icon: UserCircle,
      onClick: () => navigate("/mentor-profile"),
    },
    {
      label: "Statistics",
      icon: BarChart2,
      onClick: () => navigate("/mentor-profile/statistics"),
    },
    {
      label: "Notifications",
      icon: Bell,
      onClick: () => navigate("/mentor-profile/notifications"),
    },
    {
      label: "Settings",
      icon: Settings,
      onClick: () => navigate("/mentor-profile/settings"),
    },
    {
      label: "Log Out",
      icon: LogOut,
      onClick: handleLogout,
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
      setIsLoggingOut(true);
      const response = await fetch("http://127.0.0.1:5000/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
  
      if (response.ok) {
        // Clear all auth related data
        localStorage.clear();
        sessionStorage.clear();
        
        // Specific cleanups if needed
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        
        // Navigate after cleanup
        navigate("/login");
      } else {
        throw new Error("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
      alert("Failed to logout. Please try again.");
    } finally {
      setIsLoggingOut(false);
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
          <FaBars className="text-2xl dark:text-gray-300" />
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
              <FaTimes className="text-2xl" />
            </button>
          )}
        </div>
        <div className={` ${isDarkMode ? "" : ""}`}></div>
        <div className="flex flex-col justify-between">
          <nav className="flex-grow overflow-y-auto flex flex-col space-y-4 mt-1-300 dark:bg-gray-800 rounded-r-2xl lg:mt-12 lg:relative">
            <Link
              to="/mentor-dashboard"
              className={`relative flex items-center p-2 ml-3 mr-3 rounded-lg text-gray-600 dark:text-gray-300 ${
                isSidebarShrink
                  ? "hover:bg-gray-600 hover:text-white dark:hover:bg-gray-600 justify-center"
                  : "hover:bg-gray-600 hover:text-white dark:hover:bg-gray-600"
              }`}
              onClick={() => setActiveLink("/mentor-dashboard")}
              style={getLinkStyle("/mentor-dashboard")}
            >
              <div className="flex items-center">
                <FaHome className="text-xl w-8 text-center" />
                {!isSidebarShrink && (
                  <span className="ml-3 text-lg sidebar-text">Home</span>
                )}
              </div>
            </Link>
            <Link
              to="/mentor-message"
              className={`relative flex items-center p-2 ml-3 mr-3 rounded-lg text-gray-600 dark:text-gray-300 ${
                isSidebarShrink
                  ? "hover:bg-gray-600 hover:text-white dark:hover:bg-gray-600 justify-center"
                  : "hover:bg-gray-600 hover:text-white dark:hover:bg-gray-600"
              }`}
              onClick={() => setActiveLink("/mentor-message")}
              style={getLinkStyle("/mentor-message")}
            >
              <div className="flex items-center">
                <FaInbox className="text-xl w-8 text-center" />
                {!isSidebarShrink && (
                  <span className="ml-3 text-lg sidebar-text">Messages</span>
                )}
              </div>
            </Link>
            <Link
              to="/one-to-one-booking"
              className={`relative flex items-center p-2 ml-3 mr-3 rounded-lg text-gray-600 dark:text-gray-300 ${
                isSidebarShrink
                  ? "hover:bg-gray-600 hover:text-white dark:hover:bg-gray-600 justify-center"
                  : "hover:bg-gray-600 hover:text-white dark:hover:bg-gray-600"
              }`}
              onClick={() => setActiveLink("/one-to-one-booking")}
              style={getLinkStyle("/one-to-one-booking")}
            >
              <div className="flex items-center">
                <FontAwesomeIcon
                  icon={faUserGroup}
                  className="text-xl w-8 text-center"
                />
                {!isSidebarShrink && (
                  <span className="ml-3 text-lg sidebar-text">
                    1-to-1 Sessions
                  </span>
                )}
              </div>
            </Link>
            <Link
              to="/group-sessions"
              className={`relative flex items-center p-2 ml-3 mr-3 rounded-lg text-gray-600 dark:text-gray-300 ${
                isSidebarShrink
                  ? "hover:bg-gray-600 hover:text-white dark:hover:bg-gray-600 justify-center"
                  : "hover:bg-gray-600 hover:text-white dark:hover:bg-gray-600"
              }`}
              onClick={() => setActiveLink("/group-sessions")}
              style={getLinkStyle("/group-sessions")}
            >
              <div className="flex items-center">
                <FaUsers className="text-xl w-8 text-center" />
                {!isSidebarShrink && (
                  <span className="ml-3 text-lg sidebar-text">
                    Group Sessions
                  </span>
                )}
              </div>
            </Link>
            <Link
              to="/mentor-schedule"
              className={`relative flex items-center p-2 ml-3 mr-3 rounded-lg text-gray-600 dark:text-gray-300 ${
                isSidebarShrink
                  ? "hover:bg-gray-600 hover:text-white dark:hover:bg-gray-600 justify-center"
                  : "hover:bg-gray-600 hover:text-white dark:hover:bg-gray-600"
              }`}
              onClick={() => setActiveLink("/mentor-schedule")}
              style={getLinkStyle("/mentor-schedule")}
            >
              <div className="flex items-center">
                <FaCalendarAlt className="text-xl w-8 text-center" />
                {!isSidebarShrink && (
                  <span className="ml-3 text-lg sidebar-text">Schedule</span>
                )}
              </div>
            </Link>
            <Link
              to="/mentor-referrals"
              className={`relative flex items-center p-2 ml-3 mr-3 rounded-lg text-gray-600 dark:text-gray-300 ${
                isSidebarShrink
                  ? "hover:bg-gray-600 hover:text-white dark:hover:bg-gray-600 justify-center"
                  : "hover:bg-gray-600 hover:text-white dark:hover:bg-gray-600"
              }`}
              onClick={() => setActiveLink("/mentor-referrals")}
              style={getLinkStyle("/mentor-referrals")}
            >
              <div className="flex items-center">
                <FaCalendarAlt className="text-xl w-8 text-center" />
                {!isSidebarShrink && (
                  <span className="ml-3 text-lg sidebar-text">Referrals</span>
                )}
              </div>
            </Link>
            <Link
              to="/job-posting-dashboard"
              className={`relative flex items-center p-2 ml-3 mr-3 rounded-lg text-gray-600 dark:text-gray-300 ${
                isSidebarShrink
                  ? "hover:bg-gray-600 hover:text-white dark:hover:bg-gray-600 justify-center"
                  : "hover:bg-gray-600 hover:text-white last:dark:hover:bg-gray-600"
              }`}
              onClick={() => setActiveLink("/job-posting-dashboard")}
              style={getLinkStyle("/job-posting-dashboard")}
            >
              <div className="flex items-center">
                <FaBook className="text-xl w-8 text-center" />
                {!isSidebarShrink && (
                  <span className="ml-3 text-lg sidebar-text">Job Posting</span>
                )}
              </div>
            </Link>
          </nav>
          <div className="flex items-center justify-between max-w-sm lg:absolute bottom-0 mt-auto">
            <div className="flex items-center space-x-4 p-6">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-800">
                <img
                  src="../../../public/images/1pic (1).png"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-start space-x-0 ">
                <div>
                  <h3 className="font-medium dark:text-white">
                    {userName || "Guest"}
                  </h3>
                  <p className="text-sm text-black dark:text-white">
                    {userEmail || "mentor@example.com"}
                  </p>
                </div>
                <button
                  ref={buttonRef}
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className=" hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors duration-200"
                  aria-label="Open menu"
                >
                  <MoreVertical className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>

            {isMenuOpen && (
              <div className="relative">
                <button
                  ref={buttonRef}
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors duration-200 mb-4"
                  aria-label="Open menu"
                >
                  <MoreVertical className="w-5 h-5 text-gray-400" />
                </button>

                {isMenuOpen && (
                  <div
                    ref={menuRef}
                    className="absolute right-0 lg:bottom-full lg:mb-2 lg:top-auto lg:mt-0 bottom-auto mb-0 mt-2 w-56 rounded-md shadow-lg bg-gray-100 dark:bg-gray-700 ring-1 ring-black ring-opacity-5 z-50"
                  >
                    <div className="py-1">
                      {menuItems.map((item, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            item.onClick();
                            setIsMenuOpen(false);
                          }}
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-150"
                        >
                          <item.icon className="w-4 h-4 mr-3 text-gray-700 dark:text-white" />
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </aside>
    </div>
  );
};

export default MSidebar;
