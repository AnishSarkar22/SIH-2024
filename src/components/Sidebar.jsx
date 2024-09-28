import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaHome, FaUserFriends, FaUserTie, FaInbox, FaMedal, FaBook, FaUser, FaSignOutAlt } from 'react-icons/fa';

const Sidebar = ({ isDarkMode, sidebarShrink, toggleSidebar }) => {
  const [isSidebarShrink, setIsSidebarShrink] = useState(sidebarShrink);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });
  const location = useLocation();
  const navigate = useNavigate();
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

  const handleLogout = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include' // Include cookies in the request
      });

      if (response.ok) {
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
        ? { backgroundColor: 'white', color: 'black' }
        : { backgroundColor: 'black', color: 'white' };
    }
    return {};
  };

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      {/* change color of sidebar */}
      <aside className={`flex flex-col ${isSidebarShrink ? 'w-20' : 'w-64'} bg-white dark:bg-gray-800 border dark:border-gray-800 transition-width duration-300 rounded-r-2xl overflow-hidden h-full`}>
        <div className={`p-4 flex items-center border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`}>
          <img 
            src={isDarkMode ? "/images/logo-white-removebg-preview.svg" : "/images/logo-color-removebg-preview.svg"} 
            alt="Rewind-UI" 
            className="w-12 h-12" 
          />
          {!isSidebarShrink && <span className="ml-3 font-semibold text-xl text-gray-700 dark:text-gray-200">GuideMe</span>}
        </div>
        <div className={` ${isDarkMode ? '' : ''}`}></div>
        {/* change color of sidebar */}
        <nav className="flex-grow overflow-y-auto flex flex-col space-y-4 mt-1-300 dark:bg-gray-800 rounded-r-2xl mt-12">
          <Link 
            to="/dashboard" 
            className={`relative flex items-center p-2 ml-3 mr-3 rounded-lg text-gray-600 dark:text-gray-300 ${isSidebarShrink ? 'hover:bg-gray-600 hover:text-white dark:hover:bg-gray-600 justify-center' : 'hover:bg-gray-600 hover:text-white dark:hover:bg-gray-600'}`}
            onClick={() => setActiveLink('/dashboard')}
            style={getLinkStyle('/dashboard')}
          >
            <div className="flex items-center">
              <FaHome className="text-xl w-8 text-center" />
              {!isSidebarShrink && <span className="ml-3 text-lg sidebar-text">Home</span>}
            </div>
          </Link>
          <Link 
            to="/classes"
            className={`relative flex items-center p-2 ml-3 mr-3 rounded-lg text-gray-600 dark:text-gray-300 ${isSidebarShrink ? 'hover:bg-gray-600 hover:text-white dark:hover:bg-gray-600 justify-center' : 'hover:bg-gray-600 hover:text-white dark:hover:bg-gray-600'}`}
            onClick={() => setActiveLink('/classes')}
            style={getLinkStyle('/classes')}
          >
            <div className="flex items-center">
              <FaUserFriends className="text-xl w-8 text-center" />
              {!isSidebarShrink && <span className="ml-3 text-lg sidebar-text">Classes</span>}
            </div>
          </Link>
          <Link 
            to="/mentors" 
            className={`relative flex items-center p-2 ml-3 mr-3 rounded-lg text-gray-600 dark:text-gray-300 ${isSidebarShrink ? 'hover:bg-gray-600 hover:text-white  dark:hover:bg-gray-600 justify-center' : 'hover:bg-gray-600 hover:text-white dark:hover:bg-gray-600'}`}
            onClick={() => setActiveLink('/mentors')}
            style={getLinkStyle('/mentors')}
          >
            <div className="flex items-center">
              <FaUserTie className="text-xl w-8 text-center" />
              {!isSidebarShrink && <span className="ml-3 text-lg sidebar-text">Mentors</span>}
            </div>
          </Link>
          <Link 
            to="/message" 
            className={`relative flex items-center p-2 ml-3 mr-3 rounded-lg text-gray-600 dark:text-gray-300 ${isSidebarShrink ? 'hover:bg-gray-600 hover:text-white dark:hover:bg-gray-600 justify-center' : 'hover:bg-gray-600 hover:text-white dark:hover:bg-gray-600'}`}
            onClick={() => setActiveLink('/message')}
            style={getLinkStyle('/message')}
          >
            <div className="flex items-center">
              <FaInbox className="text-xl w-8 text-center" />
              {!isSidebarShrink && <span className="ml-3 text-lg sidebar-text">Messages</span>}
            </div>
          </Link>
          <Link 
            to="/leaderboard" 
            className={`relative flex items-center p-2 ml-3 mr-3 rounded-lg text-gray-600 dark:text-gray-300 ${isSidebarShrink ? 'hover:bg-gray-600 hover:text-white dark:hover:bg-gray-600 justify-center' : 'hover:bg-gray-600 hover:text-white dark:hover:bg-gray-600'}`}
            onClick={() => setActiveLink('/leaderboard')}
            style={getLinkStyle('/leaderboard')}
          >
            <div className="flex items-center">
              <FaMedal className="text-xl w-8 text-center" />
              {!isSidebarShrink && <span className="ml-3 text-lg sidebar-text">Leaderboard</span>}
            </div>
          </Link>
          <Link 
            to="/resources" 
            className={`relative flex items-center p-2 ml-3 mr-3 rounded-lg text-gray-600 dark:text-gray-300 ${isSidebarShrink ? 'hover:bg-gray-600 hover:text-white dark:hover:bg-gray-600 justify-center' : 'hover:bg-gray-600 hover:text-white last:dark:hover:bg-gray-600'}`}
            onClick={() => setActiveLink('/resources')}
            style={getLinkStyle('/resources')}
          >
            <div className="flex items-center">
              <FaBook className="text-xl w-8 text-center" />
              {!isSidebarShrink && <span className="ml-3 text-lg sidebar-text">Resources</span>}
            </div>
          </Link>
          <Link 
            to="/profile" 
            className={`relative flex items-center p-2 ml-3 mr-3 rounded-lg text-gray-600 dark:text-gray-300 ${isSidebarShrink ? 'hover:bg-gray-600 hover:text-white dark:hover:bg-gray-600 justify-center' : 'hover:bg-gray-600 hover:text-white dark:hover:bg-gray-600'}`}
            onClick={() => setActiveLink('/profile')}
            style={getLinkStyle('/profile')}
          >
            <div className="flex items-center">
              <FaUser className="text-xl w-8 text-center" />
              {!isSidebarShrink && <span className="ml-3 text-lg sidebar-text">Profile</span>}
            </div>
          </Link>
        </nav>
        <Link 
          to="/signin" 
          className={`relative flex items-center p-2 ml-3 mr-3 rounded-lg text-gray-600 dark:text-gray-300 ${isSidebarShrink ? 'hover:bg-gray-600 hover:text-white dark:hover:bg-gray-600 justify-center' : 'hover:bg-gray-600 hover:text-white dark:hover:bg-gray-600'}`}
          onClick={handleLogout}
          style={getLinkStyle('/signin')}
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

export default Sidebar;