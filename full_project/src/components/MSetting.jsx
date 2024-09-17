import React, { useState } from "react";
import MSidebar from "./MSidebar";
import MHeader from "./MHeader";
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
    <div className={`flex h-screen bg-gray-100 dark:bg-gray-900 ${darkMode ? "dark" : ""}`}>
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
        <div className="flex-1 p-6 overflow-auto">
          <div id="settings-content" className="content-section">
            <div className="mb-6 text-5xl font-bold dark:text-white">
              <h1>Settings</h1>
            </div>

            <div className="flex-1 space-y-7">
              {/* Details */}
              <section className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow">
                <div className="space-y-6">
                  <div className="flex items-center mb-4"></div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xl text-black mb-3 dark:text-white font-bold">Change Email</label>
                      <div className="flex items-center border border-black rounded-xl dark:border-gray-600">
                        <input
                          type="text"
                          value="abc2024@gmail.com"
                          className="flex-grow px-3 py-2 rounded-xl border-none focus:outline-none dark:bg-gray-700 dark:text-white"
                          readOnly
                        />
                        <button className="text-black dark:text-white px-3 py-2 rounded-xl focus:outline-none">
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                            ></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xl text-black mb-3 dark:text-white font-bold">Change Password</label>
                      <div className="flex items-center border border-black rounded-xl dark:border-gray-600">
                        <input
                          type="text"
                          value="*********"
                          className="flex-grow px-3 py-2 rounded-xl border-none focus:outline-none dark:bg-gray-700 dark:text-white"
                          readOnly
                        />
                        <button className="text-black dark:text-white px-3 py-2 rounded-xl focus:outline-none">
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                            ></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xl text-black mb-3 dark:text-white font-bold">And another email</label>
                      <div className="flex items-center border border-black rounded-xl dark:border-gray-600">
                        <input
                          type="text"
                          value="abc2024@gmail.com"
                          className="flex-grow px-3 py-2 rounded-xl border-none focus:outline-none dark:bg-gray-700 dark:text-white"
                          readOnly
                        />
                        <button className="text-black dark:text-white px-3 py-2 rounded-xl focus:outline-none">
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                            ></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div></div>
                    <div>
                      <label className="block text-xl text-black mb-3 dark:text-white font-bold">Gender</label>
                      <div className="flex items-center border border-black rounded-xl dark:border-gray-600">
                        <input
                          type="text"
                          value="Software Developer"
                          className="flex-grow px-3 py-2 rounded-xl border-none focus:outline-none dark:bg-gray-700 dark:text-white"
                          readOnly
                        />
                        <button className="text-black dark:text-white px-3 py-2 rounded-xl focus:outline-none">
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                            ></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Notification */}
              <section className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4 dark:text-white">Notification</h2>
                <div className="flex items-center justify-between">
                  <span className="dark:text-white">Turn notification On/Off</span>
                  {/* Toggle button with both icons */}
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      value=""
                      className="sr-only peer"
                      checked={notificationsEnabled}
                      onChange={toggleNotifications}
                    />
                    <div className={`relative w-11 h-6 ${notificationsEnabled ? "bg-red-500" : "bg-black dark:bg-white"} peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white dark:after:bg-black after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-red-500 dark:after:border-black dark:after:border-2`}></div>
                  </label>
                </div>
              </section>

              {/* Close Your Account */}
              <section className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4 dark:text-white">Close your account</h2>
                <p className="text-sm text-gray-600 mb-4 dark:text-gray-300">
                  Once you delete your account, there's no going back. Please be certain!
                </p>
                <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 text-sm">
                  Delete account
                </button>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorSetting;