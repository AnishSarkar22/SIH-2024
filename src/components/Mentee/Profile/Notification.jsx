import React, { useState } from "react";
import Sidebar from "../Sidebar";
import Header from "../Header";
import Navbar from "./Navbar";

const Notification = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "enabled";
  });

  const [sidebarShrink, setSidebarShrink] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", !darkMode ? "enabled" : "disabled");
  };

  const toggleSidebar = () => {
    setSidebarShrink(!sidebarShrink);
  };

  const notifications = [
    {
      id: 1,
      type: "new-mentee",
      title: "You have a new meeting with Krunal",
      description: "You have booked a session for a 1:1 session on 24.10.24 on Career Counselling at 19:20 PM",
      date: "30.09.24",
      time: "8:19 AM",
      icon: "/api/placeholder/48/48"
    },
    {
      id: 2,
      type: "add-skills",
      title: "Add more Skills",
      description: "Add more skills, this will help you find mentors easily",
      date: "27.09.24",
      time: "9:40 AM",
      icon: "/api/placeholder/48/48"
    },
    {
      id: 3,
      type: "new-mentee",
      title: "You have a new Mentor suggestion",
      description: "Kundan Kumar can be a good mentor for you in the field of Marketing",
      date: "20.09.24",
      time: "10:34 AM",
      icon: "/api/placeholder/48/48"
    },
    {
      id: 4,
      type: "new-mentee",
      title: "You have a new Mentor suggestion",
      description: "Nisha Bhatia can be a good mentor for you in the field of Java",
      date: "18.09.24",
      time: "13:01 PM",
      icon: "/api/placeholder/48/48"
    },
    {
      id: 5,
      type: "new-mentee",
      title: "You have a new Mentor suggestion",
      description: "Aisha Rao has booked a session with you for a group session on 26.04.24 on Marketing at 16:30 PM",
      date: "12.08.24",
      time: "16:42 PM",
      icon: "/api/placeholder/48/48"
    }
  ];

  return (
    <div className={`flex h-screen bg-white dark:bg-gray-900 ${darkMode ? "dark" : ""}`}>
      <Sidebar
        sidebarShrink={sidebarShrink}
        isDarkMode={darkMode}
        toggleSidebar={toggleSidebar}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          toggleSidebar={toggleSidebar}
          sidebarShrink={sidebarShrink}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
        />
        <Navbar />
        <div className="flex-1">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center">
                <h2 className="text-4xl font-semibold text-gray-800 dark:text-white flex-grow">Notifications</h2>
                <div className="flex text-lg font-medium ">
                  <span className="w-20 text-center font-bold text-black dark:text-white">Date</span>
                  <span className="w-20 text-center ml-2 mr-1 font-bold text-black dark:text-white">Time</span>
                </div>
              </div>
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {notifications.map((notification) => (
                  <li key={notification.id} className="px-6 py-4 flex items-start bg-white dark:bg-gray-800">
                    {/* <img src={notification.icon} alt="" className="h-12 w-12 rounded-full mr-4" /> */}
                    <div className="flex-grow pr-4">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{notification.title}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{notification.description}</p>
                    </div>
                    <div className="flex text-sm text-gray-500 dark:text-gray-400">
                      <span className="w-20 text-center">{notification.date}</span>
                      <span className="w-20 text-center ml-2">{notification.time}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;