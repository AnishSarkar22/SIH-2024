import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar'; // Adjust the path as necessary
import Header from './Header'; // Adjust the path as necessary

const chatData = [
  {
    id: 1,
    name: 'Rohit Sharma',
    message: 'Can you check out the formulas in these images att...',
    time: '12:50 pm Aug 19 2024',
    avatarColor: 'bg-pink-500',
    initials: 'RS',
    link: '/chat/1',
  },
  {
    id: 2,
    name: 'Joshua Ashiru',
    message: 'Dear Ayo, You are yet to submit your assignment for chapt...',
    time: '2:10 pm Aug 19 2024',
    avatarColor: 'bg-green-500',
    initials: 'JA',
    link: '/chat/2',
  },
  {
    id: 3,
    name: 'Neha Kumari',
    message: 'Dear Ayo, You are yet to submit your assignment for chapt...',
    time: '5:30 pm Aug 19 2024',
    avatarColor: 'bg-blue-500',
    initials: 'NK',
    link: '/chat/3',
  },
  {
    id: 4,
    name: 'Ashi Singh',
    message: 'Dear Ayo, You are yet to submit your assignment for chapt...',
    time: '6:30 pm Aug 19 2024',
    avatarColor: 'bg-yellow-500',
    initials: 'AS',
    link: '/chat/4',
  },
  {
    id: 'p',
    name: 'Chat',
    message: 'How can I help you?',
    time: '12:50 pm Aug 19 2024',
    avatarColor: 'bg-pink-500',
    initials: 'C',
    link: '/chat/p',
  },
];

function Message() {
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
    <div className={`flex h-screen bg-blue ${darkMode ? "dark" : ""}`}>
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
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-white dark:bg-gray-900 mt-10">
          <div className="container mx-auto px-6">
            <div className={`max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 h-[calc(100vh-200px)] rounded-lg shadow-md overflow-y-auto bg-white dark:bg-gray-800 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-700`}>
              {/* AI Chat */}
              <div className="bg-white dark:bg-gray-800 shadow rounded-lg mb-6 p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold mr-3">
                    AI
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      Personal Assistant
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      What do you need help with?
                    </p>
                  </div>
                </div>
                <Link to="/personal-ai">
                  <button className="px-8 py-2 bg-blue-500 text-white rounded-lg">
                    Chat
                  </button>
                </Link>
              </div>

              {/* Messages */}
              <div className="space-y-6">
                {chatData.map(chat => (
                  <div key={chat.id} className="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className={`w-10 h-10 rounded-full ${chat.avatarColor} flex items-center justify-center text-white font-bold mr-3`}>
                          {chat.initials}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                            {chat.name}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {chat.message}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {chat.time}
                        </span>
                        <Link to={chat.link}>
                          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">
                            Message
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Message;