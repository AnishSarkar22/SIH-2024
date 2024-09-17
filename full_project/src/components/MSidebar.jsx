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

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      <aside className={`flex flex-col ${isSidebarShrink ? 'w-16' : 'w-64'} bg-gray-300 dark:bg-gray-800 transition-width duration-300 border border-black rounded-r-2xl overflow-hidden h-full`}>
        <div className={`p-4 flex items-center border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`}>
          <img 
            src={isDarkMode ? "/public/images/dark.svg" : "/public/images/light.svg"} 
            alt="Rewind-UI" 
            className="w-12 h-12" 
          />
          {!isSidebarShrink && <span className="ml-3 font-semibold text-xl dark:text-white">Guide Me</span>}
        </div>
        <div className={`border-t ${isDarkMode ? 'border-white' : 'border-black'}`}></div>

        <nav className="flex-grow overflow-y-auto flex flex-col space-y-4 mt-10 bg-gray-300 dark:bg-gray-800 rounded-r-2xl">
          <Link 
            to="/mentor-dashboard" 
            className={`relative flex items-center p-2 rounded-lg text-gray-600 dark:text-gray-300 ${isSidebarShrink ? 'hover:bg-gray-600 hover:text-white dark:hover:bg-gray-600 justify-center' : 'hover:bg-gray-600 hover:text-white dark:hover:bg-gray-600 active:bg-[#f6a870] active:text-white'}`}
            onClick={() => setActiveLink('/mentor-dashboard')}
          >
            <div className="flex items-center">
              <FaHome className="text-xl w-8 text-center" />
              {!isSidebarShrink && <span className="ml-3 text-lg sidebar-text">Home</span>}
            </div>
            {activeLink === '/mentor-dashboard' && <span className="absolute left-0 bottom-0 w-full h-1 bg-blue-500 dark:bg-blue-700 animate-slide"></span>}
          </Link>
          <Link 
            to="/mentor-documents" 
            className={`relative flex items-center p-2 rounded-lg text-gray-600 dark:text-gray-300 ${isSidebarShrink ? 'hover:bg-gray-600 hover:text-white  dark:hover:bg-gray-600 justify-center' : 'hover:bg-gray-600 hover:text-white dark:hover:bg-gray-600'}`}
            onClick={() => setActiveLink('/mentor-documents')}
          >
            <div className="flex items-center">
              <FaFileAlt className="text-xl w-8 text-center" />
              {!isSidebarShrink && <span className="ml-3 text-lg sidebar-text">Documents</span>}
            </div>
            {activeLink === '/mentor-documents' && <span className="absolute left-0 bottom-0 w-full h-1 bg-blue-500 animate-slide"></span>}
          </Link>
          <Link 
            to="/mentor-bookmarks" 
            className={`relative flex items-center p-2 rounded-lg text-gray-600 dark:text-gray-300 ${isSidebarShrink ? 'hover:bg-gray-600 hover:text-white dark:hover:bg-gray-600 justify-center' : 'hover:bg-gray-600 hover:text-white dark:hover:bg-gray-600'}`}
            onClick={() => setActiveLink('/mentor-bookmarks')}
          >
            <div className="flex items-center">
              <FaBookmark className="text-xl w-8 text-center" />
              {!isSidebarShrink && <span className="ml-3 text-lg sidebar-text">Bookmarks</span>}
            </div>
            {activeLink === '/mentor-bookmarks' && <span className="absolute left-0 bottom-0 w-full h-1 bg-blue-500 animate-slide"></span>}
          </Link>
          <Link 
            to="/mentor-message" 
            className={`relative flex items-center p-2 rounded-lg text-gray-600 dark:text-gray-300 ${isSidebarShrink ? 'hover:bg-gray-600 hover:text-white dark:hover:bg-gray-600 justify-center' : 'hover:bg-gray-600 hover:text-white dark:hover:bg-gray-600'}`}
            onClick={() => setActiveLink('/mentor-message')}
          >
            <div className="flex items-center">
              <FaInbox className="text-xl w-8 text-center" />
              {!isSidebarShrink && <span className="ml-3 text-lg sidebar-text">Messages</span>}
            </div>
            {activeLink === '/mentor-message' && <span className="absolute left-0 bottom-0 w-full h-1 bg-blue-500 animate-slide"></span>}
          </Link>
          <Link 
            to="/mentor-booking" 
            className={`relative flex items-center p-2 rounded-lg text-gray-600 dark:text-gray-300 ${isSidebarShrink ? 'hover:bg-gray-600 hover:text-white dark:hover:bg-gray-600 justify-center' : 'hover:bg-gray-600 hover:text-white dark:hover:bg-gray-600'}`}
            onClick={() => setActiveLink('/mentor-booking')}
          >
            <div className="flex items-center">
              <FaRegThumbsUp className="text-xl w-8 text-center" />
              {!isSidebarShrink && <span className="ml-3 text-lg sidebar-text">Bookings</span>}
            </div>
            {activeLink === '/mentor-booking' && <span className="absolute left-0 bottom-0 w-full h-1 bg-blue-500 animate-slide"></span>}
          </Link>
          <Link 
            to="/mentor-group-session" 
            className={`relative flex items-center p-2 rounded-lg text-gray-600 dark:text-gray-300 ${isSidebarShrink ? 'hover:bg-gray-600 hover:text-white dark:hover:bg-gray-600 justify-center' : 'hover:bg-gray-600 hover:text-white dark:hover:bg-gray-600'}`}
            onClick={() => setActiveLink('/mentor-group-session')}
          >
            <div className="flex items-center">
              <FaUsers className="text-xl w-8 text-center" />
              {!isSidebarShrink && <span className="ml-3 text-lg sidebar-text">Group Sessions</span>}
            </div>
            {activeLink === '/mentor-group-session' && <span className="absolute left-0 bottom-0 w-full h-1 bg-blue-500 animate-slide"></span>}
          </Link>
          <Link 
            to="/mentor-calendar" 
            className={`relative flex items-center p-2 rounded-lg text-gray-600 dark:text-gray-300 ${isSidebarShrink ? 'hover:bg-gray-600 hover:text-white dark:hover:bg-gray-600 justify-center' : 'hover:bg-gray-600 hover:text-white dark:hover:bg-gray-600'}`}
            onClick={() => setActiveLink('/mentor-calendar')}
          >
            <div className="flex items-center">
              <FaCalendarAlt className="text-xl w-8 text-center" />
              {!isSidebarShrink && <span className="ml-3 text-lg sidebar-text">Calendar</span>}
            </div>
            {activeLink === '/mentor-calendar' && <span className="absolute left-0 bottom-0 w-full h-1 bg-blue-500 animate-slide"></span>}
          </Link>
          <Link 
            to="/mentor-profile" 
            className={`relative flex items-center p-2 rounded-lg text-gray-600 dark:text-gray-300 ${isSidebarShrink ? 'hover:bg-gray-600 hover:text-white dark:hover:bg-gray-600 justify-center' : 'hover:bg-gray-600 hover:text-white dark:hover:bg-gray-600'}`}
            onClick={() => setActiveLink('/mentor-profile')}
          >
            <div className="flex items-center">
              <FaUser className="text-xl w-8 text-center" />
              {!isSidebarShrink && <span className="ml-3 text-lg sidebar-text">Profile</span>}
            </div>
            {activeLink === '/mentor-profile' && <span className="absolute left-0 bottom-0 w-full h-1 bg-blue-500 animate-slide"></span>}
          </Link>
        </nav>
        <Link 
          to="/mentor-sign-out" 
          className={`relative flex items-center p-2 rounded-lg text-gray-600 dark:text-gray-300 ${isSidebarShrink ? 'hover:bg-gray-600 hover:text-white dark:hover:bg-gray-600 justify-center' : 'hover:bg-gray-600 hover:text-white dark:hover:bg-gray-600'}`}
          onClick={() => setActiveLink('/mentor-sign-out')}
        >
          <div className="flex items-center">
            <FaSignOutAlt className="text-xl w-8 text-center" />
            {!isSidebarShrink && <span className="ml-3 text-lg sidebar-text">Sign Out</span>}
          </div>
          {activeLink === '/mentor-sign-out' && <span className="absolute left-0 bottom-0 w-full h-1 bg-blue-500 animate-slide"></span>}
        </Link>
      </aside>
    </div>
  );
};

export default MSidebar;