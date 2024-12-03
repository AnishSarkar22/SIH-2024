import React, { useState, useEffect } from "react";
import MSidebar from "./MSidebar";
import MHeader from "./MHeader";
import { RxAvatar } from "react-icons/rx";
import { FaUserGroup, FaRegThumbsUp } from "react-icons/fa6";

function MDashboard() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    return savedDarkMode === "enabled";
  });

  const [sidebarShrink, setSidebarShrink] = useState(false);

  const toggleSidebar = () => {
    setSidebarShrink(!sidebarShrink);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", !darkMode ? "enabled" : "disabled");
  };

  useEffect(() => {
    const handleScroll = () => {
      console.log("Scrolled");
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`flex h-screen ${darkMode ? "dark" : ""}`}>
      <MSidebar
        sidebarShrink={sidebarShrink}
        toggleSidebar={toggleSidebar}
        isDarkMode={darkMode}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <MHeader
          toggleSidebar={toggleSidebar}
          sidebarShrink={sidebarShrink}
          toggleDarkMode={toggleDarkMode}
          darkMode={darkMode}
        />
        <main className="flex-1 p-8 dark:bg-gray-900 overflow-y-auto">
          <div className="lg:flex justify-between items-center mb-8 text-gray-800 dark:text-white">
            <div>
              <h1 className="text-xl lg:text-2xl font-bold dark:text-white">
                Hello, Radhika Sharma
              </h1>
              <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-400">
                radhikasharma@gmail.com
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-lg lg:text-xl text-blue-600 font-semibold dark:text-blue-400">
                Verified mentor
              </span>
              <i className="fas fa-check-circle text-blue-600 dark:text-blue-400"></i>
            </div>
          </div>

          <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">
            Quick actions
          </h2>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 col-span-3">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h2 className="text-lg text-center lg:text-left font-semibold text-gray-800 dark:text-white mb-3">
                  Schedule Meetings
                </h2>
                <div className="lg:flex items-center justify-between">
                  <div className="flex items-center mb-3 lg:mb-0">
                    <i className="far fa-calendar-alt text-3xl lg:text-4xl mr-4 text-gray-800 dark:text-white"></i>
                    <div className="flex flex-col justify-center">
                      <h3 className="font-bold text-xl lg:text-2xl leading-tight text-gray-800 dark:text-white">
                        Upcoming 3 meetings
                      </h3>
                    </div>
                  </div>
                  <div className="flex justify-end lg:justify-normal lg:flex-col space-x-3 lg:space-x-0 lg:space-y-2">
                    <button className="px-5 py-1 lg:px-10 lg:py-1 border border-gray-700 dark:border-gray-600 text-gray-800 dark:text-white rounded hover:bg-slate-300 dark:hover:bg-slate-900">
                      View
                    </button>
                    <button className="py-1 px-5 lg:px-10 lg:py-1 relative border border-gray-700 dark:border-gray-600 text-gray-800 dark:text-white rounded hover:bg-slate-300 dark:hover:bg-slate-900">
                      New
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-gray-800 dark:text-white">
                <h2 className="text-lg text-center lg:text-left font-semibold mb-3 dark:text-white">
                  Meetings Availability
                </h2>
                <div className="lg:flex items-center justify-between">
                  <div className="flex items-center mb-3 lg:mb-0">
                    <i className="far fa-clock text-3xl lg:text-4xl mr-4 text-black dark:text-white"></i>
                    <div className="flex flex-col justify-center">
                      <p className="font-semibold text-lg lg:text-xl text-black dark:text-white">
                        11:00 AM - 10:00 PM
                      </p>
                      <p className="text-xs lg:text-sm text-gray-500 dark:text-gray-400">
                        Indian Standard Time (IST)
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-end lg:justify-normal lg:flex-col space-x-3 lg:space-x-0 lg:space-y-2">
                    <button className="px-3 py-1 border border-gray-700 dark:border-gray-600 text-black dark:text-white rounded hover:bg-slate-300 dark:hover:bg-slate-900">
                      Sync Calendar
                    </button>
                    <button className="px-3 py-1 text-black dark:text-white rounded relative border border-gray-700 dark:border-gray-600 hover:bg-slate-300 dark:hover:bg-slate-900">
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6 col-span-3">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h2 className="text-xl text-center font-semibold mb-5 lg:mb-3 text-gray-800 dark:text-white">
                  Your impact at a glance
                </h2>
                <div className="grid grid-cols-2 gap-6 flex-1">
                  <div className="lg:flex items-center space-x-2">
                    <RxAvatar
                      className="text-blue-600 dark:text-blue-400"
                      size={60}
                    />
                    <div>
                      <p className="text-2xl lg:text-3xl font-bold text-blue-600 dark:text-blue-400">
                        80
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        1:1 Bookings
                      </p>
                      <p className="text-xs text-gray-400 dark:text-gray-500">
                        This month: 32
                      </p>
                    </div>
                  </div>
                  <div className="lg:flex items-center space-x-2">
                    <RxAvatar
                      className="text-orange-500 dark:text-orange-400"
                      size={60}
                    />
                    <div>
                      <p className="text-2xl lg:text-3xl font-bold text-orange-500 dark:text-orange-400">
                        23,461
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Minutes mentored
                      </p>
                      <p className="text-xs text-gray-400 dark:text-gray-500">
                        This month: 1,531
                      </p>
                    </div>
                  </div>
                  <div className="lg:flex items-center space-x-2">
                    <FaUserGroup
                      className="text-red-500 pt-1 dark:text-red-400 border-2 rounded-full border-red-500 p-1"
                      size={60}
                    />
                    <div>
                      <p className="text-2xl lg:text-3xl font-bold text-red-500 dark:text-red-400">
                        890
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Session RSVPs
                      </p>
                      <p className="text-xs text-gray-400 dark:text-gray-500">
                        This month: 120
                      </p>
                    </div>
                  </div>
                  <div className="lg:text-center">
                    <div className="lg:flex items-center space-x-2">
                      <FaRegThumbsUp
                        className="text-blue-400 dark:text-blue-300 border-2 rounded-full border-blue-400 p-1"
                        size={60}
                      />
                      <div>
                        <p className="text-2xl lg:text-3xl font-bold text-blue-400 dark:text-blue-300">
                          34
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Reviews
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-500">
                          This month: 03
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-center mb-4 text-gray-800 dark:text-white">
                  Upcoming Meetings
                </h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <i className="fa-solid fa-user-group text-blue-500 mr-2"></i>
                      <span className="dark:text-gray-300 text-sm lg:text-lg">
                        Sapna Mukherjee
                      </span>
                    </div>
                    <div>
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-2 dark:bg-gray-700 dark:font-extrabold dark:text-blue-500">
                        Group
                      </span>
                      <span className="text-gray-600 dark:text-gray-400">
                        11:40
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <i className="fas fa-user text-green-500 mr-2"></i>
                      <span className="dark:text-gray-300 text-sm lg:text-lg">Neha Dhupia</span>
                    </div>
                    <div>
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mr-2 dark:bg-gray-700 dark:font-extrabold dark:text-green-500">
                        One-to-One
                      </span>
                      <span className="text-gray-600 dark:text-gray-400">
                        12:30
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <i className="fas fa-user text-green-500 mr-2"></i>
                      <span className="dark:text-gray-300 text-sm lg:text-lg">Mayowa Ade</span>
                    </div>
                    <div>
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mr-2 dark:bg-gray-700 dark:font-extrabold dark:text-green-500">
                        One-to-One
                      </span>
                      <span className="text-gray-600 dark:text-gray-400">
                        13:40
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <i className="fa-solid fa-user-group text-blue-500 mr-2"></i>
                      <span className="dark:text-gray-300 text-sm lg:text-lg">Joshua Ashiru</span>
                    </div>
                    <div>
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-2 dark:bg-gray-700 dark:font-extrabold dark:text-blue-500">
                        Group
                      </span>
                      <span className="text-gray-600 dark:text-gray-400">
                        15:30
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <i className="fa-solid fa-user-group text-blue-500 mr-2"></i>
                      <span className="dark:text-gray-300 text-sm lg:text-lg">Olawuyi Tobi</span>
                    </div>
                    <div>
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-2 dark:bg-gray-700 dark:font-extrabold dark:text-blue-500">
                        Group
                      </span>
                      <span className="text-gray-600 dark:text-gray-400">
                        19:30
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default MDashboard;