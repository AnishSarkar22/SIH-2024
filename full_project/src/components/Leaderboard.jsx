import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Flag, Clock, Check, Star, User } from "lucide-react"; // Import User icon

function Leaderboard() {
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

  return (
    <div className={`flex h-screen ${darkMode ? "dark" : ""} bg-white dark:bg-gray-900`}>
      <Sidebar
        sidebarShrink={sidebarShrink}
        isDarkMode={darkMode}
        toggleSidebar={toggleSidebar}
      />
      <div className="flex-1 flex flex-col overflow-hidden dark:bg-gray-900 dark:text-white">
        <Header
          toggleSidebar={toggleSidebar}
          sidebarShrink={sidebarShrink}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
        />
        <div className="flex-1 overflow-y-auto p-4">
          <div className="bg-gray-100 dark:bg-gray-900 p-6 font-sans flex">
            <div className="flex-1 bg-gray-300 border border-black dark:border-white dark:bg-gray-800 rounded-lg p-8">
              <div className="flex items-stretch mb-6">
                <div className="flex-shrink-0">
                  <img
                    src="/public/images/l1.png"
                    alt="User avatar"
                    className="w-48 h-full rounded-xl mr-4 object-cover"
                  />
                </div>
                <div className="flex flex-col justify-between bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-6 h-full">
                  <div>
                    <h1 className="text-2xl font-bold dark:text-white">
                      Michael Clifford
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400">
                      Rank up faster in 24h
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    <div className="flex items-center">
                      <Flag className="text-blue-500 mr-2" />
                      <div>
                        <div className="text-2xl font-bold dark:text-white">
                          27
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Quiz Passed
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Clock className="text-blue-500 mr-2" />
                      <div>
                        <div className="text-2xl font-bold dark:text-white">
                          27min
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Fastest Time
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Check className="text-blue-500 mr-2" />
                      <div>
                        <div className="text-2xl font-bold dark:text-white">
                          200
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Correct Answers
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold dark:text-white">
                    Featured Quizzes
                  </h2>
                  <a href="#" className="text-blue-500 dark:text-blue-400">
                    View All
                  </a>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    {
                      title:
                        "Protecting the Organization against Phishing Attacks",
                      time: "15 min",
                      image: "/public/images/l2.png",
                    },
                    {
                      title: "Ransomware and Attack Landscape in Corporate",
                      time: "15 min",
                      image: "/public/images/l3.png",
                    },
                    {
                      title: "Keeping Debit & Credit Cards Safe",
                      time: "15 min",
                      image: "/public/images/l4.png",
                    },
                  ].map((quiz, index) => (
                    <div
                      key={index}
                      className="bg-white dark:bg-gray-700 rounded-lg shadow overflow-hidden"
                    >
                      <img
                        src={quiz.image}
                        alt={quiz.title}
                        className="w-full h-32 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="font-semibold mb-2 dark:text-white">
                          {quiz.title}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {quiz.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Ranking,Achievement,Offline */}
            <div className="w-80 h-120 ml-6 bg-gray-300 dark:bg-gray-800 p-4 rounded-lg shadow flex flex-col items-center border border-black dark:border-white">
              <div className="mb-10 ml-12">
                <h2 className="text-2xl font-bold mb-3 dark:text-white">
                  Ranking Board
                </h2>
                <ul className="space-y-4 text-lg">
                  {[
                    { name: "Michael Clifford", score: 95, color: "text-red-500" },
                    { name: "John Doe", score: 90, color: "text-green-500" },
                    { name: "Jane Smith", score: 85, color: "text-blue-500" },
                    { name: "Emily Johnson", score: 80, color: "text-purple-500" },
                  ].map((user, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between dark:text-blue-400"
                    >
                      <div className="flex items-center">
                        <User className={`w-5 h-5 mr-2 ${user.color}`} />
                        <span className={user.color}>{user.name}</span>
                      </div>
                      <div className="flex items-center text-gray-500 dark:text-gray-400 ml-8">
                        {user.score}
                        <Star className="w-5 h-5 ml-1 text-yellow-400" />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-12 mr-10">
                <h2 className="text-2xl font-bold mb-8 dark:text-white">
                  Achievements
                </h2>
                <div className="flex space-x-2">
                  {["bg-yellow-400", "bg-gray-300", "bg-orange-400"].map(
                    (color, index) => (
                      <div
                        key={index}
                        className={`w-12 h-12 ${color} rounded-full flex items-center justify-center`}
                      >
                        <Star className="text-white" />
                      </div>
                    )
                  )}
                </div>
                <a
                  href="#"
                  className="text-blue-500 dark:text-blue-400 text-sm"
                >
                  View All
                </a>
              </div>

              <div className="mb-6 mr-10">
                <h2 className="text-2xl font-bold mb-8 dark:text-white">
                  Offline Users
                </h2>
                <div className="flex space-x-2">
                  {["bg-red-400", "bg-yellow-400", "bg-blue-400"].map(
                    (color, index) => (
                      <div
                        key={index}
                        className={`w-8 h-8 ${color} rounded-full border-2 border-white`}
                      ></div>
                    )
                  )}
                  <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 border-2 border-white flex items-center justify-center text-xs font-bold">
                    10+
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;