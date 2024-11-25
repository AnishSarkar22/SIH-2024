import React, { useState, useEffect } from "react";
import MSidebar from "./MSidebar";
import MHeader from "./MHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarWeek,
  faClock,
  faCircleCheck,
  faCircleUser,
  faEnvelopeCircleCheck,
  faUser,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";

function MDashboard() {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [darkMode, setDarkMode] = useState(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    return savedDarkMode === "enabled";
  }); // Set initial state from localStorage

  const [sidebarShrink, setSidebarShrink] = useState(false);

  const toggleSidebar = () => {
    setSidebarShrink(!sidebarShrink);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", !darkMode ? "enabled" : "disabled");
  };

  // display first name and email of the user
  useEffect(() => {
    try {
      const userData = JSON.parse(localStorage.getItem("userData"));
      if (userData) {
        // Handle name
        if (userData.name) {
          const firstName = userData.name.split(" ")[0];
          setUserName(firstName);
        } else {
          setUserName("Guest");
        }

        // Handle email
        if (userData.email) {
          setUserEmail(userData.email);
        } else {
          setUserEmail("No email provided");
        }
      } else {
        setUserName("Guest");
        setUserEmail("mentor@example.com");
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
      setUserName("Guest");
      setUserEmail("No email provided");
    }
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
        <main className="flex-1 p-8 dark:bg-gray-900">
          <div className="flex justify-between items-center mb-8  text-gray-800 dark:text-white">
            <div>
              <h1 className="text-2xl font-bold dark:text-white">
                Hello, {userName || "Guest"} 👋
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {userEmail || "mentor@example.com"}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-blue-600 font-semibold dark:text-blue-400">
                Verified mentor
              </span>
              <FontAwesomeIcon
                icon={faCircleCheck}
                className="fas fa-check-circle text-blue-600 dark:text-blue-400"
              />
            </div>
          </div>

          <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">
            Quick actions
          </h2>

          <div className="grid grid-cols-3 gap-6">
            <div className="grid grid-cols-2 gap-4 col-span-3">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                  Schedule Meetings
                </h2>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FontAwesomeIcon
                      icon={faCalendarWeek}
                      className="far fa-calendar-alt text-4xl mr-4 text-gray-800 dark:text-white"
                    />
                    <div className="flex flex-col justify-center">
                      <h3 className="font-bold text-2xl leading-tight text-gray-800 dark:text-white">
                        Upcoming 3 meetings
                      </h3>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <button className="px-10 py-1 border border-gray-700 dark:border-gray-600 text-gray-800 dark:text-white rounded  hover:bg-slate-300  dark:hover:bg-slate-900">
                      View
                    </button>
                    <button className="px-10 py-1 relative border border-gray-700 dark:border-gray-600 text-gray-800 dark:text-white rounded  hover:bg-slate-300  dark:hover:bg-slate-900">
                      New
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-gray-800 dark:text-white">
                <h2 className="text-lg font-semibold mb-3 dark:text-white">
                  Meetings Availability
                </h2>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FontAwesomeIcon
                      icon={faClock}
                      className="far fa-clock text-4xl mr-4 text-black dark:text-white"
                    />
                    <div className="flex flex-col justify-center">
                      <p className="font-semibold text-xl text-black dark:text-white">
                        11:00 AM - 10:00 PM
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Indian Standard Time (IST)
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <button className="px-3 py-1 border border-gray-700 dark:border-gray-600 text-black dark:text-white rounded  hover:bg-slate-300  dark:hover:bg-slate-900">
                      Sync Calendar
                    </button>
                    <button className="px-3 py-1 text-black dark:text-white rounded relative border border-gray-700 dark:border-gray-600  hover:bg-slate-300  dark:hover:bg-slate-900">
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-6 col-span-3">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h2 className="text-xl text-center font-semibold mb-3 text-gray-800 dark:text-white">
                  Your impact at a glance
                </h2>
                <div className="grid grid-cols-2 gap-6 flex-1">
                  <div className="flex items-center space-x-2">
                    <FontAwesomeIcon
                      icon={faCircleUser}
                      className="text-blue-600 dark:text-blue-400 mr-3"
                      size={"3x"}
                    />
                    <div>
                      <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
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
                  <div className="flex items-center space-x-2">
                    <FontAwesomeIcon
                      icon={faCircleUser}
                      className="text-orange-500 dark:text-orange-400 mr-1"
                      size={"3x"}
                    />
                    <div>
                      <p className="text-3xl font-bold text-orange-500 dark:text-orange-400">
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
                  <div className="flex items-center space-x-2">
                    <FontAwesomeIcon
                      icon={faEnvelopeCircleCheck}
                      className="text-red-500 dark:text-red-400 rounded-full"
                      size={"3x"}
                    />
                    <div>
                      <p className="text-3xl font-bold text-red-500 dark:text-red-400">
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
                  <div className="">
                    <div className="flex items-center space-x-2">
                      <FontAwesomeIcon
                        icon={faCircleCheck}
                        className="text-blue-400 dark:text-blue-300 rounded-full mr-1"
                        size={"3x"}
                      />
                      <div>
                        <p className="text-3xl font-bold text-blue-400 dark:text-blue-300">
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

              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md ">
                <h2 className="text-xl font-semibold text-center mb-4 text-gray-800 dark:text-white">
                  Upcoming Meetings
                </h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <FontAwesomeIcon
                        icon={faUserGroup}
                        className="text-blue-500 mr-2"
                      />
                      <span className="dark:text-gray-300">
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
                      <FontAwesomeIcon
                        icon={faUser}
                        className="text-green-500 mr-2 ml-0.5"
                      />
                      <span className="dark:text-gray-300">Neha Dhupia</span>
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
                      <FontAwesomeIcon
                        icon={faUser}
                        className="text-green-500 mr-2 ml-0.5"
                      />
                      <span className="dark:text-gray-300">Mayowa Ade</span>
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
                      <FontAwesomeIcon
                        icon={faUserGroup}
                        className="text-blue-500 mr-2"
                      />
                      <span className="dark:text-gray-300">Joshua Ashiru</span>
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
                      <FontAwesomeIcon
                        icon={faUserGroup}
                        className="text-blue-500 mr-2"
                      />
                      <span className="dark:text-gray-300">Olawuyi Tobi</span>
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
