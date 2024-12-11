import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-white dark:bg-gray-900 p-6 mb-6 shadow-md">
      <ul className="flex space-x-16 text-center justify-start">
        <li>
          <Link to="/profile"
            className="tab-link text-black dark:text-white hover:text-blue-800 dark:hover:text-blue-400 transition-colors duration-300 relative"
            id="profile-link">
            Profile
            <span
              className="absolute bottom-[-4px] left-0 w-full h-1 bg-blue-800 transition-transform duration-300 transform scale-x-0 hover:scale-x-100"></span>
          </Link>
        </li>
        <li>
          <Link to="/profile/statistics"
            className="tab-link text-black dark:text-white hover:text-blue-800 dark:hover:text-blue-400 transition-colors duration-300 relative"
            id="statistics-link">
            Statistics
            <span
              className="absolute bottom-[-4px] left-0 w-full h-1 bg-blue-800 transition-transform duration-300 transform scale-x-0 hover:scale-x-100"></span>
          </Link>
        </li>
        <li>
          <Link to="/profile/notifications"
            className="tab-link text-black dark:text-white hover:text-blue-800 dark:hover:text-blue-400 transition-colors duration-300 relative"
            id="notifications-link">
            Notifications
            <span
              className="absolute bottom-[-4px] left-0 w-full h-1 bg-blue-800 transition-transform duration-300 transform scale-x-0 hover:scale-x-100"></span>
          </Link>
        </li>
        <li>
          <Link to="/profile/settings"
            className="tab-link text-black dark:text-white hover:text-blue-800 dark:hover:text-blue-400 transition-colors duration-300 relative"
            id="settings-link">
            Settings
            <span
              className="absolute bottom-[-4px] left-0 w-full h-1 bg-blue-800 transition-transform duration-300 transform scale-x-0 hover:scale-x-100"></span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;