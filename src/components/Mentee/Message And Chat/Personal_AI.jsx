import React, { useState, useRef, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar";
import Header from "../Header";
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
    message: "Hello! How can I assist you with your career or education questions today?",
    time: new Date().toLocaleTimeString(),
    avatarColor: "bg-purple-500",
    initials: "AI",
  },
];

const Personal_AI = () => {
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const location = useLocation();
  const initialMsg = location.state?.initialMessage;
  

  // State management
  const [darkMode, setDarkMode] = useState(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    return savedDarkMode === "enabled";
  });
  const [sidebarShrink, setSidebarShrink] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [inputMessage, setInputMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId] = useState(`conv_${Date.now()}`);

  // Fetch existing messages
  useEffect(() => {
    fetchMessages();
  }, [conversationId]);
  
  useEffect(() => {
    if (initialMsg) {
      setInputMessage(initialMsg);
      handleSendMessage();
    }
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const fetchMessages = async () => {
    try {
      const response = await fetch(`/api/messages/${conversationId}`);
      const data = await response.json();
      if (data.length > 0) {
        setMessages(data.map(msg => ({
          id: msg.id,
          name: msg.sender === 'user' ? 'You' : 'Mentee AI Assistant',
          message: msg.content,
          time: new Date(msg.timestamp).toLocaleTimeString(),
          initials: msg.initials,
          avatarColor: msg.sender === 'ai' ? 'bg-purple-500' : ''
        })));
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      name: "You",
      message: inputMessage,
      time: new Date().toLocaleTimeString(),
      initials: "Y",
    };
    setMessages(prev => [...prev, userMessage]);
    const messageToBeSent = inputMessage;
    setInputMessage("");
    setIsLoading(true);

    try {
      // First classify the message
      const classifyResponse = await fetch('/api/classify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: messageToBeSent }),
      });
      const classifyData = await classifyResponse.json();

      if (classifyData.classification === 'other') {
        setMessages(prev => [...prev, {
          id: prev.length + 1,
          name: "Mentee AI Assistant",
          message: "Please ask a question related to career or education.",
          time: new Date().toLocaleTimeString(),
          initials: "AI",
          avatarColor: "bg-purple-500",
        }]);
        setIsLoading(false);
        return;
      }

      // Chat stream
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: messageToBeSent,
          conversationId: conversationId
        }),
      });

      const reader = response.body.getReader();
      let aiResponse = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = new TextDecoder().decode(value);
        const lines = chunk.split('\n');
        
        lines.forEach(line => {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));
              if (data.content) {
                aiResponse += data.content;
                setMessages(prev => {
                  const newMessages = [...prev];
                  const lastMessage = newMessages[newMessages.length - 1];
                  if (lastMessage.name === "Mentee AI Assistant") {
                    lastMessage.message = aiResponse;
                    return [...newMessages];
                  } else {
                    return [...newMessages, {
                      id: prev.length + 1,
                      name: "Mentee AI Assistant",
                      message: aiResponse,
                      time: new Date().toLocaleTimeString(),
                      initials: "AI",
                      avatarColor: "bg-purple-500",
                    }];
                  }
                });
              }
            } catch (e) {
              console.error('Error parsing SSE data:', e);
            }
          }
        });
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        name: "Mentee AI Assistant",
        message: "Sorry, I encountered an error. Please try again.",
        time: new Date().toLocaleTimeString(),
        initials: "AI",
        avatarColor: "bg-purple-500",
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // UI Event Handlers
  const toggleSidebar = () => setSidebarShrink(!sidebarShrink);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", !darkMode ? "enabled" : "disabled");
  };

  const handleAttachmentClick = () => fileInputRef.current.click();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) setSelectedFile(file);
  };

  const handleRemoveFile = () => setSelectedFile(null);

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
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
        
        {/* Header section */}
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
                Career and Education Advisor
              </div>
            </div>
          </div>
        </div>

        {/* Messages section */}
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
              <div className="ml-3 max-w-xl">
                <div className="font-bold">{msg.name}</div>
                <div className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                  {msg.message}
                </div>
                <div className="text-xs text-gray-500 mt-1">{msg.time}</div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-center justify-center">
              <div className="animate-pulse text-gray-500">AI is typing...</div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input section */}
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
            disabled={isLoading}
          />
          <FontAwesomeIcon
            icon={faPaperPlane}
            className={`w-6 h-6 cursor-pointer ml-3 ${
              isLoading || !inputMessage.trim() 
                ? 'text-gray-400' 
                : 'text-blue-500 hover:text-blue-600'
            }`}
            onClick={handleSendMessage}
          />
        </div>
      </div>
    </div>
  );
};

export default Personal_AI;