import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaUserFriends, FaFileAlt, FaBookmark, FaInbox, FaCalendarAlt, FaSignOutAlt, FaUsers, FaRegThumbsUp, FaUser } from 'react-icons/fa';

const MSidebar = ({ isDarkMode, sidebarShrink, toggleSidebar }) => {
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
    localStorage.setItem("sidebarState", isSidebarShrink ? "shrink" : "expanded");
  }, [isSidebarShrink]);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
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

  const getLinkStyle = (path) => {
    if (activeLink === path) {
      return { backgroundColor: 'black', color: 'white' };
    }
    return {};
  };

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      <aside className={`flex flex-col ${isSidebarShrink ? 'w-16' : 'w-64'} bg-gray-300 dark:bg-gray-800 transition-width duration-300 border border-black rounded-r-2xl overflow-hidden h-full`}>
        <div className={`p-4 flex items-center border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`}>
          <img 
            src={isDarkMode ? "/images/logo-white-removebg-preview.svg" : "/images/logo-color-removebg-preview.svg"} 
            alt="Rewind-UI" 
            className="w-12 h-12" 
          />
          {!isSidebarShrink && <span className="ml-3 font-semibold text-xl dark:text-white">Guide Me</span>}
        </div>
        <div className={`border-t ${isDarkMode ? 'border-white' : 'border-black'}`}></div>

        <nav className="flex-grow overflow-y-auto flex flex-col space-y-4 mt-10 bg-gray-300 dark:bg-gray-800 rounded-r-2xl">
          <Link 
            to="/mentor-dashboard" 
            className={`relative flex items-center p-2 ml-3 mr-3 rounded-lg text-gray-600 dark:text-gray-300 ${isSidebarShrink ? 'hover:bg-gray-600 hover:text-white dark:hover:bg-gray-600 justify-center' : 'hover:bg-gray-600 hover:text-white dark:hover:bg-gray-600 active:bg-[#f6a870] active:text-white'}`}
            onClick={() => setActiveLink('/mentor-dashboard')}
            style={getLinkStyle('/mentor-dashboard')}
          >
            <div className="flex items-center">
              <FaHome className="text-xl w-8 text-center" />
              {!isSidebarShrink && <span className="ml-3 text-lg sidebar-text">Home</span>}
            </div>
          </Link>
          <Link 
            to="/mentor-documents" 
            className={`relative flex items-center p-2 ml-3 mr-3 rounded-lg text-gray-600 dark:text-gray-300 ${isSidebarShrink ? 'hover:bg-gray-600 hover:text-white  dark:hover:bg-gray-600 justify-center' : 'hover:bg-gray-600 hover:text-white dark:hover:bg-gray-600'}`}
            onClick={() => setActiveLink('/mentor-documents')}
            style={getLinkStyle('/mentor-documents')}
          >
            <div className="flex items-center">
              <FaFileAlt className="text-xl w-8 text-center" />
              {!isSidebarShrink && <span className="ml-3 text-lg sidebar-text">Documents</span>}
            </div>
          </Link>
          <Link 
            to="/mentor-bookmarks" 
            className={`relative flex items-center p-2 ml-3 mr-3 rounded-lg text-gray-600 dark:text-gray-300 ${isSidebarShrink ? 'hover:bg-gray-600 hover:text-white dark:hover:bg-gray-600 justify-center' : 'hover:bg-gray-600 hover:text-white dark:hover:bg-gray-600'}`}
            onClick={() => setActiveLink('/mentor-bookmarks')}
            style={getLinkStyle('/mentor-bookmarks')}
          >
            <div className="flex items-center">
              <FaBookmark className="text-xl w-8 text-center" />
              {!isSidebarShrink && <span className="ml-3 text-lg sidebar-text">Bookmarks</span>}
            </div>
          </Link>
          <Link 
            to="/mentor-message" 
            className={`relative flex items-center p-2 ml-3 mr-3 rounded-lg text-gray-600 dark:text-gray-300 ${isSidebarShrink ? 'hover:bg-gray-600 hover:text-white dark:hover:bg-gray-600 justify-center' : 'hover:bg-gray-600 hover:text-white dark:hover:bg-gray-600'}`}
            onClick={() => setActiveLink('/mentor-message')}
            style={getLinkStyle('/mentor-message')}
          >
            <div className="flex items-center">
              <FaInbox className="text-xl w-8 text-center" />
              {!isSidebarShrink && <span className="ml-3 text-lg sidebar-text">Messages</span>}
            </div>
          </Link>
          <Link 
            to="/mentor-booking" 
            className={`relative flex items-center p-2 ml-3 mr-3 rounded-lg text-gray-600 dark:text-gray-300 ${isSidebarShrink ? 'hover:bg-gray-600 hover:text-white dark:hover:bg-gray-600 justify-center' : 'hover:bg-gray-600 hover:text-white dark:hover:bg-gray-600'}`}
            onClick={() => setActiveLink('/mentor-booking')}
            style={getLinkStyle('/mentor-booking')}
          >
            <div className="flex items-center">
              <FaRegThumbsUp className="text-xl w-8 text-center" />
              {!isSidebarShrink && <span className="ml-3 text-lg sidebar-text">Bookings</span>}
            </div>
          </Link>
          <Link 
            to="/mentor-group-session" 
            className={`relative flex items-center p-2 ml-3 mr-3 rounded-lg text-gray-600 dark:text-gray-300 ${isSidebarShrink ? 'hover:bg-gray-600 hover:text-white dark:hover:bg-gray-600 justify-center' : 'hover:bg-gray-600 hover:text-white dark:hover:bg-gray-600'}`}
            onClick={() => setActiveLink('/mentor-group-session')}
            style={getLinkStyle('/mentor-group-session')}
          >
            <div className="flex items-center">
              <FaUsers className="text-xl w-8 text-center" />
              {!isSidebarShrink && <span className="ml-3 text-lg sidebar-text">Group Sessions</span>}
            </div>
          </Link>
          <Link 
            to="/mentor-calendar" 
            className={`relative flex items-center p-2 ml-3 mr-3 rounded-lg text-gray-600 dark:text-gray-300 ${isSidebarShrink ? 'hover:bg-gray-600 hover:text-white dark:hover:bg-gray-600 justify-center' : 'hover:bg-gray-600 hover:text-white dark:hover:bg-gray-600'}`}
            onClick={() => setActiveLink('/mentor-calendar')}
            style={getLinkStyle('/mentor-calendar')}
          >
            <div className="flex items-center">
              <FaCalendarAlt className="text-xl w-8 text-center" />
              {!isSidebarShrink && <span className="ml-3 text-lg sidebar-text">Calendar</span>}
            </div>
          </Link>
          <Link 
            to="/mentor-profile" 
            className={`relative flex items-center p-2 ml-3 mr-3 rounded-lg text-gray-600 dark:text-gray-300 ${isSidebarShrink ? 'hover:bg-gray-600 hover:text-white dark:hover:bg-gray-600 justify-center' : 'hover:bg-gray-600 hover:text-white dark:hover:bg-gray-600'}`}
            onClick={() => setActiveLink('/mentor-profile')}
            style={getLinkStyle('/mentor-profile')}
          >
            <div className="flex items-center">
              <FaUser className="text-xl w-8 text-center" />
              {!isSidebarShrink && <span className="ml-3 text-lg sidebar-text">Profile</span>}
            </div>
          </Link>
        </nav>
        <Link 
          to="/mentor-sign-out" 
          className={`relative flex items-center p-2 ml-3 mr-3 rounded-lg text-gray-600 dark:text-gray-300 ${isSidebarShrink ? 'hover:bg-gray-600 hover:text-white dark:hover:bg-gray-600 justify-center' : 'hover:bg-gray-600 hover:text-white dark:hover:bg-gray-600'}`}
          onClick={() => setActiveLink('/mentor-sign-out')}
          style={getLinkStyle('/mentor-sign-out')}
        >
          <div className="flex items-center">
            <FaSignOutAlt className="text-xl w-8 text-center" />
            {!isSidebarShrink && <span className="ml-3 text-lg sidebar-text">Sign Out</span>}
          </div>
        </Link>
      </aside>
    </div>
  );
};

export default MSidebar;