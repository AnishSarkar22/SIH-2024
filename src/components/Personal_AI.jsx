import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faPaperclip,
  faPaperPlane,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { 
  faFaceSmile,
} from "@fortawesome/free-regular-svg-icons";


const initialMessages = [
  {
    id: 1,
    name: "Mentee AI Assistant",
    message: "Hello! How can I assist you today?",
    time: "12:00 pm Aug 19 2024",
    avatarColor: "bg-purple-500",
    initials: "AI",
  },
];

const Personal_AI = () => {
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    return savedDarkMode === "enabled";
  }); // Set initial state from localStorage

  const [sidebarShrink, setSidebarShrink] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [inputMessage, setInputMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const toggleSidebar = () => {
    setSidebarShrink(!sidebarShrink);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", !darkMode ? "enabled" : "disabled");
  };

  const fileInputRef = useRef(null);

  const handleAttachmentClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      console.log("Selected file:", file);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() || selectedFile) {
      const newMessage = {
        id: messages.length + 1,
        name: "You",
        message: inputMessage,
        time: new Date().toLocaleTimeString(),
        initials: "Y",
        file: selectedFile,
      };
      setMessages([...messages, newMessage]);
      setInputMessage("");
      setSelectedFile(null);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className={`flex h-screen ${darkMode ? "dark" : ""} bg-white`}>
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
        <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
          <div className="flex items-center space-x-3">
          <FontAwesomeIcon
              icon={faArrowLeft}
              className="w-5 h-5 text-gray-500 dark:text-gray-400 cursor-pointer rounded-full p-2"
              onClick={() => navigate("/message")}
            />
            <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold">
              AI
            </div>
            <div>
              <div className="font-bold">Personal Assistant</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                How can I help you today?
              </div>
            </div>
          </div>
        </div>
        {/* Messages and input */}
        <div className="flex-1 p-4 overflow-y-auto">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start mb-4 ${
                msg.name === "You" ? "justify-end" : ""
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${msg.avatarColor}`}
              >
                {msg.initials}
              </div>
              <div className="ml-3 max-w-xs">
                <div className="font-bold">{msg.name}</div>
                <div>{msg.message}</div>
              </div>
            </div>
          ))}
        </div>
        {/* Message input bottom bar */}
        <div className="flex items-center p-4 border-t dark:border-gray-700">
          <FontAwesomeIcon
            icon={faFaceSmile}
            className="w-6 h-6 text-gray-500 dark:text-gray-400 cursor-pointer"
          />
          <FontAwesomeIcon
            icon={faPaperclip}
            className="w-6 h-6 text-gray-500 dark:text-gray-400 cursor-pointer ml-3"
            onClick={handleAttachmentClick}
          />
          <input
            type="file"
            // accept=".pdf,.jpg,.jpeg,.png"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          {selectedFile && (
            <div className="flex items-center ml-3">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {selectedFile.name}
              </span>
              <FontAwesomeIcon
                icon={faXmark}
                className="w-4 h-4 text-red-500 cursor-pointer ml-2"
                onClick={handleRemoveFile}
              />
            </div>
          )}
          <input
            type="text"
            className="placeholder-gray-400 flex-1 px-4 py-2 ml-4 rounded-lg border dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            placeholder="Type your message..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <FontAwesomeIcon
            icon={faPaperPlane}
            className="w-6 h-6 text-gray-500 dark:text-gray-400 cursor-pointer ml-3"
            onClick={handleSendMessage}
          />
        </div>
      </div>
    </div>
  );
};

export default Personal_AI; 