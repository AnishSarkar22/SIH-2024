import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar";
import Header from "../Header";
import { SlCalender } from "react-icons/sl";
import { MdKeyboardBackspace } from "react-icons/md";
import { BsFillSendFill } from "react-icons/bs";
import { PiSmileySticker } from "react-icons/pi";
import { RiAttachmentLine } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import Cal from "@calcom/embed-react";

const initialMessages = [
  {
    id: 1,
    name: "Rohit Sharma",
    message: "Can you check out the formulas in these images att...",
    time: "12:50 pm Aug 19 2024",
    avatarColor: "bg-pink-500",
    initials: "RS",
    link: "/chat/1",
  },
  {
    id: 2,
    name: "Joshua Ashiru",
    message: "Dear Ayo, You are yet to submit your assignment for chapt...",
    time: "2:10 pm Aug 19 2024",
    avatarColor: "bg-green-500",
    initials: "JA",
    link: "/chat/2",
  },
  {
    id: 3,
    name: "Neha Kumari",
    message: "Dear Ayo, You are yet to submit your assignment for chapt...",
    time: "5:30 pm Aug 19 2024",
    avatarColor: "bg-blue-500",
    initials: "NK",
    link: "/chat/3",
  },
  {
    id: 4,
    name: "Ashi Singh",
    message: "Dear Ayo, You are yet to submit your assignment for chapt...",
    time: "6:30 pm Aug 19 2024",
    avatarColor: "bg-yellow-500",
    initials: "AS",
    link: "/chat/4",
  },
];

const Chat = () => {
  const { chatId } = useParams();
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    return savedDarkMode === "enabled";
  }); // Set initial state from localStorage

  const [sidebarShrink, setSidebarShrink] = useState(false);
  const [messages, setMessages] = useState(
    initialMessages.filter((msg) => msg.id === parseInt(chatId, 10))
  );
  const [inputMessage, setInputMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isCalModalOpen, setIsCalModalOpen] = useState(false);

  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const calModalContentRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const toggleSidebar = () => {
    setSidebarShrink(!sidebarShrink);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", !darkMode ? "enabled" : "disabled");
  };

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
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  const message = initialMessages.find((msg) => msg.id === parseInt(chatId, 10));

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
            <MdKeyboardBackspace
              className="w-9 h-9 text-gray-500 dark:text-gray-400 cursor-pointer rounded-full border-black border dark:bg-gray-700 p-2"
              onClick={() => navigate("/message")}
            />
            <div className={`w-12 h-12 rounded-full ${message.avatarColor}`}></div>
            <div>
              <span className="font-bold text-2xl">{message.name}</span>
              <span className="text-sm text-gray-500 dark:text-gray-400"> (ID: {chatId})</span>
            </div>
          </div>
          <SlCalender
            className="w-6 h-6 text-gray-500 dark:text-gray-400 cursor-pointer"
            onClick={() => setIsCalModalOpen(true)}
          />
        </div>
        <div className={`border-t ${darkMode ? "border-white" : "border-black"}`}></div>
        <div className="flex-grow overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start space-x-3 ${msg.name === "You" ? "justify-end" : ""}`}
            >
              <div className="flex flex-col items-start">
                {msg.name === "You" && <span className="text-sm text-gray-500 dark:text-gray-400">You</span>}
                <div className={`max-w-xs ${msg.name === "You" ? "bg-blue-500 text-white" : msg.name === "Rohit Sharma" && !darkMode ? "bg-gray-300" : "bg-gray-200 dark:bg-gray-700"} rounded-lg p-3`}>
                  <p>{msg.message}</p>
                  {msg.file && (
                    <div className="mt-2">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Attached file:</span>
                      <a
                        href={URL.createObjectURL(msg.file)}
                        download={msg.file.name}
                        className="block text-blue-500 dark:text-blue-400"
                      >
                        {msg.file.name}
                      </a>
                    </div>
                  )}
                </div>
                <span className={`text-xs opacity-75 dark:text-gray-400 ${msg.name === "You" ? "text-right" : ""}`}>
                  {msg.time}
                </span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        {selectedFile && (
          <div className="p-4 border-t dark:border-gray-700">
            <div className="mb-4 p-2 border rounded-lg dark:border-gray-600 dark:bg-gray-800 flex justify-between items-center">
              <span className="text-sm dark:text-gray-400">
                Attached file: {selectedFile.name}
              </span>
              <RxCross2
                className="w-5 h-5 text-gray-500 dark:text-gray-400 cursor-pointer"
                onClick={handleRemoveFile}
              />
            </div>
          </div>
        )}

        <div className={`p-4 border-t ${darkMode ? "border-white" : "border-black"}`}>
          <div className="flex items-center space-x-3">
            <PiSmileySticker className="w-6 h-6 text-gray-500 dark:text-gray-400 cursor-pointer" />
            <div className="relative flex-grow">
              <input
                type="text"
                className="w-full p-2 rounded-lg border dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                placeholder="Type your message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
            <RiAttachmentLine
              className="w-6 h-6 text-gray-500 dark:text-gray-400 cursor-pointer"
              onClick={handleAttachmentClick}
            />
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
              onKeyDown={handleKeyDown}
            />
            <button
              className="p-2 rounded-lg bg-blue-500 text-white dark:bg-blue-700 flex items-center justify-center"
              onClick={handleSendMessage}
            >
              <BsFillSendFill className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Cal function  */}
      {isCalModalOpen && (
       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
       <div className="bg-white dark:bg-gray-900 bg-opacity-90 dark:bg-opacity-90 p-2 lg:p-6 rounded-lg shadow-lg w-full max-w-4xl h-[100vh] lg:h-[80vh] overflow-y-auto">
         <div className="flex justify-between items-center mb-4">
           <h2 className="text-xl font-bold text-gray-900 dark:text-white">Schedule a Meeting</h2>
           <button
             className="text-gray-500 dark:text-gray-400"
             onClick={() => setIsCalModalOpen(false)}
           >  
             <RxCross2 className="w-6 h-6" />
           </button>
         </div>
         <div className="w-full h-full overflow-y-auto" ref={calModalContentRef}>
           <Cal calLink="rick/get-rick-rolled" className="w-full h-full border-none"  />
         </div>
       </div>
     </div>
      )}
    </div>
  );
};

export default Chat;