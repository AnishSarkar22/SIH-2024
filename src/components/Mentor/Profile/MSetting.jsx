import React, { useState } from "react";
import MSidebar from "../MSidebar";
import MHeader from "../MHeader";
import MNavbar from "./MNavbar";

const MentorSetting = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    return savedDarkMode === "enabled";
  });

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [sidebarShrink, setSidebarShrink] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", !darkMode ? "enabled" : "disabled");
  };

  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };

  const toggleSidebar = () => {
    setSidebarShrink(!sidebarShrink);
  };

  return (
    <div className={`flex min-h-screen bg-gray-100 dark:bg-gray-900 ${darkMode ? "dark" : ""}`}>
      <MSidebar
        sidebarShrink={sidebarShrink}
        isDarkMode={darkMode}
        toggleSidebar={toggleSidebar}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <MHeader
          toggleSidebar={toggleSidebar}
          sidebarShrink={sidebarShrink}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
        />
        <MNavbar />
        <main className="flex-1 overflow-y-auto bg-gray-100 dark:bg-gray-900">
          <div className="container mx-auto px-4 py-6 lg:px-3 lg:py-0 lg:max-w-full lg:h-full">
            <div className="mb-6">
              <h1 className="text-4xl font-bold dark:text-white">Settings</h1>
            </div>

            <div className="space-y-6">
              {/* Details */}
              <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-lg font-bold text-gray-900 mb-2 dark:text-white">
                        Change Email
                      </label>
                      <div className="flex items-center border border-gray-300 rounded-lg dark:border-gray-600">
                        <input
                          type="text"
                          value="abc2024@gmail.com"
                          className="flex-1 px-4 py-2 bg-transparent border-none focus:outline-none dark:text-white"
                          readOnly
                        />
                        <button className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                          </svg>
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-lg font-bold text-gray-900 mb-2 dark:text-white">
                        Change Password
                      </label>
                      <div className="flex items-center border border-gray-300 rounded-lg dark:border-gray-600">
                        <input
                          type="password"
                          value="********"
                          className="flex-1 px-4 py-2 bg-transparent border-none focus:outline-none dark:text-white"
                          readOnly
                        />
                        <button className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                          </svg>
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-lg font-bold text-gray-900 mb-2 dark:text-white">
                        Additional Email
                      </label>
                      <div className="flex items-center border border-gray-300 rounded-lg dark:border-gray-600">
                        <input
                          type="text"
                          value="abc2024@gmail.com"
                          className="flex-1 px-4 py-2 bg-transparent border-none focus:outline-none dark:text-white"
                          readOnly
                        />
                        <button className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                          </svg>
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-lg font-bold text-gray-900 mb-2 dark:text-white">
                        Gender
                      </label>
                      <div className="flex items-center border border-gray-300 rounded-lg dark:border-gray-600">
                        <select className="flex-1 px-4 py-2 bg-transparent border-none focus:outline-none dark:text-white">
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                        <button className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Notifications */}
              <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                  Notifications
                </h2>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 dark:text-gray-300">
                    Enable notifications
                  </span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={notificationsEnabled}
                      onChange={toggleNotifications}
                    />
                    <div className={`relative w-11 h-6 ${
                      notificationsEnabled ? "bg-red-500" : "bg-gray-400 dark:bg-gray-600"
                    } rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all`}>
                    </div>
                  </label>
                </div>
              </section>

              {/* Dark Mode */}
              <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                  Appearance
                </h2>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 dark:text-gray-300">
                    {darkMode ? "Dark Mode" : "Light Mode"}
                  </span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={darkMode}
                      onChange={toggleDarkMode}
                    />
                    <div className={`relative w-11 h-6 ${
                      darkMode ? "bg-yellow-500" : "bg-gray-400 dark:bg-gray-600"
                    } rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all`}>
                    </div>
                  </label>
                </div>
              </section>

              {/* Delete Account */}
              <section className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm mb-4">
                <h2 className="text-xl font-bold mb-4  text-gray-900 dark:text-white">
                  Close your account
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Once you delete your account, there's no going back. Please be certain!
                </p>
                <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                  Delete account
                </button>
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MentorSetting;