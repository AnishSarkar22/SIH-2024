import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPeopleGroup,
  faCalendar,
  faClock,
  faCheck,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import MSidebar from "./MSidebar";
import MHeader from "./MHeader";

const GroupSessionsPage = () => {
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [joinedSessions, setJoinedSessions] = useState(new Set());
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const [darkMode, setDarkMode] = useState(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    return savedDarkMode === "enabled";
  });

  const [sidebarShrink, setSidebarShrink] = useState(false);

  const sessions = [
    {
      date: "10/12/24",
      title: "Career Mentoring",
      time: "14:00 pm",
      bookings: 20,
    },
    {
      date: "11/12/24",
      title: "AI and how it can change the world",
      time: "11:00 am",
      bookings: 23,
    },
    {
      date: "10/12/24",
      title: "Career Mentoring",
      time: "14:00 pm",
      bookings: 14,
    },
    {
      date: "10/12/24",
      title: "Career Mentoring",
      time: "14:00 pm",
      bookings: 4,
    },
    {
      date: "10/12/24",
      title: "Career Mentoring",
      time: "14:00 pm",
      bookings: 2,
    },
  ];

  const users = [
    {
      name: "Rohan Ahluwalia",
      time: "2:00pm",
      date: "28th December, 2024",
      color: darkMode ? "bg-blue-900" : "bg-blue-100",
    },
    {
      name: "Sumit Kumar",
      time: "3:30pm",
      date: "28th December, 2024",
      color: darkMode ? "bg-green-900" : "bg-green-100",
    },
    {
      name: "Muskaan Sharma",
      time: "4:00pm",
      date: "28th December, 2024",
      color: darkMode ? "bg-purple-900" : "bg-purple-100",
    },
    {
      name: "Roop Singh",
      time: "4:30pm",
      date: "28th December, 2024",
      color: darkMode ? "bg-orange-900" : "bg-orange-100",
    },
    {
      name: "Fatima Khan",
      time: "5:00pm",
      date: "28th December, 2024",
      color: darkMode ? "bg-pink-900" : "bg-pink-100",
    },
  ];

  const handleCopy = (index) => {
    setCopiedIndex(index);
    setAlertMessage("Link copied to clipboard!");
    setShowAlert(true);
    setTimeout(() => {
      setCopiedIndex(null);
      setShowAlert(false);
    }, 2000);
  };

  const handleJoin = (index) => {
    const newJoinedSessions = new Set(joinedSessions);
    if (newJoinedSessions.has(index)) {
      newJoinedSessions.delete(index);
      setAlertMessage("Session left successfully");
    } else {
      newJoinedSessions.add(index);
      setAlertMessage("Joined session successfully!");
    }
    setJoinedSessions(newJoinedSessions);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  };

  const toggleSidebar = () => {
    setSidebarShrink(!sidebarShrink);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", !darkMode ? "enabled" : "disabled");
  };

  return (
    <div
      className={`min-h-screen flex h-screen overflow-hidden ${
        darkMode ? "dark bg-gray-800 text-gray-100" : "bg-white text-gray-900"
      }`}
    >
      <MSidebar darkMode={darkMode} sidebarShrink={sidebarShrink} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <MHeader
          toggleSidebar={toggleSidebar}
          sidebarShrink={sidebarShrink}
          toggleDarkMode={toggleDarkMode}
          darkMode={darkMode}
        />
        <main
          className={`
            flex-1 
            p-2 sm:p-4 lg:p-6
            ${sidebarShrink ? "pl-20" : "pl-6"} 
            transition-all duration-300 
            ${darkMode ? "bg-gray-900" : "bg-gray-100"}
            overflow-y-auto
          `}
        >
          <div className={`p-0`}>
            {/* Alert Notification */}
            {showAlert && (
              <div
                className={`fixed top-2 right-2 sm:right-4 w-full max-w-[320px] z-50 rounded-lg shadow-lg p-4 ${
                  darkMode ? "bg-gray-700" : "bg-white"
                } transition-all duration-300 ease-in-out`}
              >
                <div className="flex items-center gap-2 text-xs sm:text-sm">
                  <FontAwesomeIcon
                    icon={faCheck}
                    className="h-3 w-3 sm:h-4 sm:w-4 text-green-500"
                  />
                  {alertMessage}
                </div>
              </div>
            )}

            <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 max-w-[1400px] mx-auto">
              {/* Group Sessions Section */}
              <div
                className={`w-full lg:w-[60%] p-3 right-2 sm:p-4 lg:p-6 rounded-xl shadow-md ${
                  darkMode ? "bg-gray-800" : "bg-white"
                }`}
              >
                <h1
                  className={`text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4 lg:mb-6 ${
                    darkMode ? "text-gray-100" : "text-gray-800"
                  }`}
                >
                  Group Sessions
                </h1>

                <div
                  className={`flex items-center justify-between text-xs sm:text-sm rounded-lg mb-4 px-2 py-2 sm:px-4 sm:py-4 ${
                    darkMode
                      ? "bg-gray-900 text-gray-300"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  <div className="flex-1 min-w-[120px]">Event Details</div>
                  <div className="w-16 sm:w-40 text-center shrink-0">
                    Bookings
                  </div>
                  <div className="w-24 sm:w-52 text-center shrink-0">
                    Actions
                  </div>
                </div>

                <div
                  className="space-y-3 overflow-y-auto max-h-[60vh] lg:max-h-[calc(100vh-320px)] 
  [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar]:rounded-full
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  [&::-webkit-scrollbar-thumb]:rounded-full
  dark:[&::-webkit-scrollbar-track]:bg-slate-700
  dark:[&::-webkit-scrollbar-thumb]:bg-slate-500"
                >
                  {sessions.map((session, index) => (
                    <div
                      key={index}
                      className={`rounded-lg p-2 sm:p-4 hover:shadow-md transition-all duration-200 ${
                        darkMode ? "hover:bg-gray-900" : "hover:bg-gray-100"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 sm:gap-3">
                        <div className="flex-1 min-w-[120px]">
                          <div
                            className={`flex items-center gap-2 text-xs sm:text-sm ${
                              darkMode ? "text-gray-300" : "text-gray-600"
                            }`}
                          >
                            <FontAwesomeIcon
                              icon={faCalendar}
                              className="h-3 w-3 sm:h-4 sm:w-4"
                            />
                            {session.date}
                          </div>
                          <div
                            className={`font-medium my-1 sm:my-2 text-sm sm:text-base ${
                              darkMode ? "text-gray-100" : "text-gray-800"
                            }`}
                          >
                            {session.title}
                          </div>
                          <div
                            className={`flex items-center gap-2 text-xs sm:text-sm ${
                              darkMode ? "text-gray-300" : "text-gray-600"
                            }`}
                          >
                            <FontAwesomeIcon
                              icon={faClock}
                              className="h-3 w-3 sm:h-4 sm:w-4"
                            />
                            {session.time}
                          </div>
                        </div>

                        <div
                          className={`w-16 sm:w-28 flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm shrink-0 ${
                            darkMode ? "text-gray-300" : "text-gray-600"
                          }`}
                        >
                          <FontAwesomeIcon
                            icon={faPeopleGroup}
                            className="h-4 w-4 sm:h-6 sm:w-6"
                          />
                          {session.bookings}
                        </div>

                        <div className="w-24 sm:w-52 flex gap-1 sm:gap-3 justify-end shrink-0">
                          <button
                            onClick={() => handleJoin(index)}
                            className={`px-2 py-1 sm:px-4 sm:py-2 rounded-md transition-all duration-200 flex items-center gap-1 sm:gap-2 text-xs sm:text-sm
                ${
                  joinedSessions.has(index)
                    ? darkMode
                      ? "bg-gray-100 text-gray-100 hover:bg-gray-800"
                      : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                    : darkMode
                    ? "bg-gray-600 hover:bg-gray-500"
                    : "bg-white hover:bg-gray-300"
                }`}
                          >
                            {joinedSessions.has(index) ? "Joined" : "Join"}
                          </button>
                          <button
                            onClick={() => handleCopy(index)}
                            className={`px-2 py-1 sm:px-3 sm:py-2 rounded-md transition-all duration-200 flex items-center gap-1 sm:gap-2 text-xs sm:text-sm
                ${
                  copiedIndex === index
                    ? darkMode
                      ? "bg-blue-900 text-blue-100"
                      : "bg-blue-50 text-blue-600"
                    : darkMode
                    ? "bg-gray-600 hover:bg-gray-500"
                    : "bg-white hover:bg-gray-300"
                }`}
                          >
                            <FontAwesomeIcon
                              icon={faCopy}
                              className="h-3 w-3 sm:h-4 sm:w-4"
                            />
                            <span className="hidden sm:inline">
                              {copiedIndex === index ? "Copied!" : "Copy Link"}
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* User Details Section */}
              <div
                className={`w-full lg:w-[40%] p-3 sm:p-4 lg:p-5 rounded-xl shadow-md ${
                  darkMode ? "bg-gray-800" : "bg-white"
                }`}
              >
                <h2
                  className={`text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4 ${
                    darkMode ? "text-gray-100" : "text-gray-800"
                  }`}
                >
                  User Details
                </h2>
                <div className="space-y-2 overflow-y-auto max-h-[50vh] lg:max-h-[calc(100vh-180px)] pr-2 sm:pr-1
                [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar]:rounded-full
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  [&::-webkit-scrollbar-thumb]:rounded-full
  dark:[&::-webkit-scrollbar-track]:bg-slate-700
  dark:[&::-webkit-scrollbar-thumb]:bg-slate-500">
                  {users.map((user, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-2 sm:gap-4 p-1 sm:p-4 rounded-lg hover:shadow-md transition-all duration-200 ${
                        darkMode ? "hover:bg-gray-900" : "hover:bg-gray-100"
                      }`}
                    >
                      <div
                        className={`w-8 h-8 sm:w-12 sm:h-12 rounded-full flex items-center justify-center ${
                          user.color
                        } ${
                          darkMode ? "text-gray-100" : "text-gray-700"
                        } font-medium text-sm sm:text-lg`}
                      >
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <div
                          className={`font-medium text-sm sm:text-lg ${
                            darkMode ? "text-gray-100" : "text-gray-800"
                          }`}
                        >
                          {user.name}
                        </div>
                        <div
                          className={`text-xs sm:text-sm mt-0.5 sm:mt-1 ${
                            darkMode ? "text-gray-300" : "text-gray-600"
                          }`}
                        >
                          {user.time} · {user.date}
                        </div>
                      </div>
                      <td className="px-3 sm:px-1 py-3 sm:py-1">
                        <div className="flex flex-col sm:flex-row gap-2">
                          <button
                            className={`px-4 py-1 text-green-500 border border-green-500 rounded-md sm:px-4 sm:py-2 text-xs sm:text-sm font-medium ${
                              darkMode
                                ? "hover:bg-green-900"
                                : "hover:bg-green-100"
                            }`}
                          >
                            <FontAwesomeIcon icon={faCheck} />
                          </button>
                          <button
                            className={`px-2 py-1 text-red-500 border border-red-500 rounded-md sm:px-4 sm:py-2 text-xs sm:text-sm font-medium ${
                              darkMode ? "hover:bg-red-950" : "hover:bg-red-100"
                            }`}
                          >
                            <FontAwesomeIcon icon={faXmark} />
                          </button>
                        </div>
                      </td>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default GroupSessionsPage;
