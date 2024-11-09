import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MSidebar from './MSidebar'; // Adjust the path as necessary
import MHeader from './MHeader'; // Adjust the path as necessary

const chatData = [
  {
    id: 1,
    name: 'John Doe',
    message: 'Can you check out the formulas in these images att...',
    time: '12:50 pm Aug 19 2024',
    avatarColor: 'bg-pink-500',
    initials: 'JD',
    link: '/mentor-chat/1', // Updated link
  },
  {
    id: 2,
    name: 'Joshua Ashiru',
    message: 'Dear Ayo, You are yet to submit your assignment for chapt...',
    time: '2:10 pm Aug 19 2024',
    avatarColor: 'bg-green-500',
    initials: 'JA',
    link: '/mentor-chat/2', // Updated link
  },
  {
    id: 3,
    name: 'Neha Kumari',
    message: 'Dear Ayo, You are yet to submit your assignment for chapt...',
    time: '5:30 pm Aug 19 2024',
    avatarColor: 'bg-blue-500',
    initials: 'NK',
    link: '/mentor-chat/3', // Updated link
  },
  {
    id: 4,
    name: 'Ashi Singh',
    message: 'Dear Ayo, You are yet to submit your assignment for chapt...',
    time: '6:30 pm Aug 19 2024',
    avatarColor: 'bg-yellow-500',
    initials: 'AS',
    link: '/mentor-chat/4', // Updated link
  },
  {
    id: 5,
    name: 'Priya Verma',
    message: 'Can you help me with the project guidelines?',
    time: '8:00 am Aug 20 2024',
    avatarColor: 'bg-purple-500',
    initials: 'PV',
    link: '/mentor-chat/5', // Updated link
  },
  {
    id: 6,
    name: 'Amit Patel',
    message: 'I have a question about the recent lecture.',
    time: '9:15 am Aug 20 2024',
    avatarColor: 'bg-red-500',
    initials: 'AP',
    link: '/mentor-chat/6', // Updated link
  },
  {
    id: 7,
    name: 'Sana Khan',
    message: 'Could you review my assignment draft?',
    time: '11:45 am Aug 20 2024',
    avatarColor: 'bg-orange-500',
    initials: 'SK',
    link: '/mentor-chat/7', // Updated link
  },
  {
    id: 8,
    name: 'Vikram Singh',
    message: 'I need clarification on the homework.',
    time: '1:30 pm Aug 20 2024',
    avatarColor: 'bg-teal-500',
    initials: 'VS',
    link: '/mentor-chat/8', // Updated link
  },
];

function MMessage() {
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
    <div className={`flex h-screen bg-gray-100 ${darkMode ? "dark" : ""}`}>
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
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900">
          <div className="container mx-auto px-6">
            <div className={`max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 h-[calc(100vh-200px)] overflow-y-auto bg-white dark:bg-gray-800 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-700`}>
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
                <Link to="/mpersonal-ai">
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

export default MMessage;