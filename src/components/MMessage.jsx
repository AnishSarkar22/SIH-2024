// MMessage.jsx
// mentors can see all the chats they have with mentees
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import MSidebar from "./MSidebar";
import MHeader from "./MHeader";
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "./services/firebase";

function MMessage() {
  const [chats, setChats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    return savedDarkMode === "enabled";
  });

  const [sidebarShrink, setSidebarShrink] = useState(false);

  const toggleSidebar = () => {
    setSidebarShrink(!sidebarShrink);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", !darkMode ? "enabled" : "disabled");
  };

  // Initialize all chats including AI assistant
  useEffect(() => {
    // Add AI chat immediately to prevent delay
    setChats([{
      id: 'ai-assistant',
      name: 'Personal Assistant',
      message: 'What do you need help with?',
      time: new Date().toLocaleString(),
      avatarColor: 'bg-purple-500',
      initials: 'AI',
      link: '/mpersonal-ai',
      isAI: true,
    }]);
  }, []);

  // Fetch mentor chats
  useEffect(() => {
    const mentorId = localStorage.getItem("userId");
    const mentorType = localStorage.getItem("userType");

    if (!mentorId || !mentorType) {
      setError("Invalid user type. Please login first");
      navigate("/login");
      return;
    }

    if (!mentorId) {
      setIsLoading(false);
      return;
    }

    const sessionsQuery = query(
      collection(db, "sessions"),
      where(`${mentorType}_id`, "==", mentorId),
      where("status", "==", "booked")
    );

    const unsubscribe = onSnapshot(sessionsQuery, async (snapshot) => {
      try {
        const newChats = [{
          id: 'ai-assistant',
          name: 'Personal Assistant',
          message: 'What do you need help with?',
          time: new Date().toLocaleString(),
          avatarColor: 'bg-purple-500',
          initials: 'AI',
          link: '/mpersonal-ai',
          isAI: true,
        }];

        const fetchPromises = snapshot.docs.map(async (docSnapshot) => {
          const session = docSnapshot.data();
          const [menteeDoc, chatDoc] = await Promise.all([
            getDoc(doc(db, "users", session.mentee_id)),
            getDoc(doc(db, "chats", session.chat_id))
          ]);

          const menteeData = menteeDoc.data();
          const chatData = chatDoc.data();

          if (menteeData) {
            const lastMessageTime = chatData?.last_message?.timestamp
              ? formatTimestamp(chatData.last_message.timestamp)
              : formatTimestamp(session.created_at);

            return {
              id: session.chat_id,
              name: menteeData.name || "Unknown User",
              message: chatData?.last_message?.content || "Session booked",
              time: lastMessageTime,
              avatarColor: getRandomColor(),
              initials: getInitials(menteeData.name),
              link: `/mentor-chat/${session.chat_id}`,
              isActive: true,
            };
          }
          return null;
        });

        const chatResults = await Promise.all(fetchPromises);
        newChats.push(...chatResults.filter(chat => chat !== null));
        setChats(newChats);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching chat details:", error);
        setError(error.message);
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const ChatSkeleton = () => (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600 mr-3"></div>
          <div>
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-24 mb-2"></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
          <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-20"></div>
        </div>
      </div>
    </div>
  );

const ChatItem = ({ chat }) => (
  <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center">
        <div
          className={`w-10 h-10 rounded-full ${chat.avatarColor} flex items-center justify-center text-white font-bold mr-3`}
        >
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
        <Link to={chat.isAI ? chat.link : `/mentor-chat/${chat.id}`}>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            {chat.isAI ? 'Chat' : 'Message'}
          </button>
        </Link>
      </div>
    </div>
  </div>
);

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
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 h-[calc(100vh-200px)] overflow-y-auto bg-white dark:bg-gray-800 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-700">
              {error && (
                <div className="text-red-500 p-4 mb-4">
                  Error loading chats: {error}
                </div>
              )}

              <div className="space-y-6">
                {isLoading ? (
                  // Show 3 skeleton loaders while loading
                  [...Array(3)].map((_, index) => (
                    <ChatSkeleton key={index} />
                  ))
                ) : (
                  chats.map((chat) => (
                    <ChatItem key={chat.id} chat={chat} />
                  ))
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function getRandomColor() {
  const colors = [
    "bg-pink-500",
    "bg-green-500",
    "bg-blue-500",
    "bg-yellow-500",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

function getInitials(name) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

function formatTimestamp(timestamp) {
  if (!timestamp) return "";
  
  // Handle Firestore Timestamp object
  if (timestamp && typeof timestamp === 'object' && 'seconds' in timestamp) {
    return new Date(timestamp.seconds * 1000).toLocaleString();
  }
  
  // Handle Date object
  if (timestamp instanceof Date) {
    return timestamp.toLocaleString();
  }
  
  // Handle string timestamps
  if (typeof timestamp === 'string') {
    return new Date(timestamp).toLocaleString();
  }
  
  // Fallback
  return "Invalid date";
}

export default MMessage;