// chat.jsx
// mentees can chat with mentors
import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Cal from "@calcom/embed-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faPaperclip,
  faPaperPlane,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { faFaceSmile, faCalendar } from "@fortawesome/free-regular-svg-icons";
import {
  getFirestore,
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  getDoc,
  addDoc,
  Timestamp,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "./services/firebase";

const Chat = () => {
  const { chatId } = useParams();
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("darkMode") === "enabled"
  );

  const [sidebarShrink, setSidebarShrink] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isCalModalOpen, setIsCalModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [otherUserDetails, setOtherUserDetails] = useState(null);
  // const [senderDetails, setSenderDetails] = useState(null);
  const [chatDetails, setChatDetails] = useState({
    name: chatId, // Default to chatId if no name is fetched
    avatarColor: "bg-blue-500", // Default avatar color
  });

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

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  // Add effect to fetch other user's details
  useEffect(() => {
    const fetchOtherUserDetails = async () => {
      if (chatDetails?.name && currentUser) {
        // Split IDs from chat name (format: userID1_userID2...)
        const userIds = chatDetails.name.split("_");
        // Find ID that isn't current user's
        const otherUserId = userIds.find((id) => id !== currentUser.user_id);

        if (otherUserId) {
          const userDoc = await getDoc(doc(db, "users", otherUserId));
          if (userDoc.exists()) {
            setOtherUserDetails(userDoc.data());
          }
        }
      }
    };

    fetchOtherUserDetails();
  }, [chatDetails, currentUser]);

  // add useEffect to fetch current user
  useEffect(() => {
    const userId = localStorage.getItem("userId"); // Get from localStorage instead of API
    if (userId) {
      const fetchUser = async () => {
        const userDoc = await getDoc(doc(db, "users", userId));
        if (userDoc.exists()) {
          setCurrentUser({
            user_id: userId,
            ...userDoc.data(),
          });
        } else {
          navigate("/login");
        }
      };
      fetchUser();
    } else {
      navigate("/login");
    }
  }, [navigate]);

  // add useEffect to fetch messages
  useEffect(() => {
    if (!chatId || !currentUser) return;

    // Get chat details
    const getChatDetails = async () => {
      const chatDoc = await getDoc(doc(db, "chats", chatId));
      if (chatDoc.exists()) {
        const chat = chatDoc.data();
        setChatDetails({
          name:
            chat.mentor_id === currentUser.user_id
              ? chat.mentee_name
              : chat.mentor_name,
          avatarColor: chat.avatarColor || "bg-green-500",
        });
      }
    };

    getChatDetails();

    // Listen to messages in real-time
    const messagesQuery = query(
      collection(db, "chats", chatId, "messages"),
      orderBy("timestamp", "asc")
    );

    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      const newMessages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp?.toDate(),
      }));
      setMessages(newMessages);
    });

    return () => unsubscribe();
  }, [chatId, currentUser]);

  // create handleSendMessage function for sending messages and attachments
  const handleSendMessage = async () => {
    if (!inputMessage.trim() && !selectedFile) return;
    if (!currentUser || !chatId) return;

    try {
      let attachment = null;

      if (selectedFile) {
        // Create storage reference
        const storageRef = ref(storage, `files/${chatId}/${selectedFile.name}`);
        // upload file to storage
        const uploadTask = await uploadBytes(storageRef, selectedFile);
        // Get download URL
        const downloadURL = await getDownloadURL(uploadTask.ref);

        attachment = {
          url: downloadURL,
          filename: selectedFile.name,
          contentType: selectedFile.type,
        };
      }

      // Create message in Firestore
      const messageData = {
        content: inputMessage.trim(),
        sender_id: currentUser.user_id,
        sender_name: currentUser.name,
        timestamp: Timestamp.now(),
        attachment: attachment,
      };

      // Add message to chat's messages subcollection
      await addDoc(collection(db, "chats", chatId, "messages"), messageData);

      // Update last message in chat document
      await setDoc(
        doc(db, "chats", chatId),
        {
          last_message: {
            content: inputMessage.trim(),
            timestamp: Timestamp.now(),
          },
        },
        { merge: true }
      );

      setInputMessage("");
      setSelectedFile(null);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // console.log("chatDetails:", chatDetails);

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
            <div
              className={`w-12 h-12 rounded-full ${chatDetails.avatarColor} flex items-center justify-center text-white font-bold`}
            >
              {/* {otherUserDetails?.name?.charAt(0).toUpperCase() || ""} */}
              {(otherUserDetails?.name || "")
                .split(" ")
                .map((name) => name.charAt(0))
                .slice(0, 2)
                .join("")
                .toUpperCase() || ""}
            </div>

            <div>
              {/* to show sender's name */}
              <span className="font-bold text-xl">
                {otherUserDetails?.name || "Loading..."}
              </span>
              {/* to show status os sender's message */}
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {otherUserDetails?.status || "Offline"}
              </div>
            </div>
          </div>
          <FontAwesomeIcon
            icon={faCalendar}
            className="pt-1 pr-4 w-6 h-6 text-gray-500 dark:text-gray-400 cursor-pointer"
            onClick={() => setIsCalModalOpen(true)}
          />
        </div>

        {/* Chat Messages */}
        <div className="flex-grow overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start space-x-3 ${
                msg.sender_id === currentUser?.user_id ? "justify-end" : ""
              }`}
            >
              <div className="flex flex-col items-start">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {msg.sender_name}
                </span>
                <div
                  className={`max-w-xs ${
                    msg.sender_id === "current_user_id"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 dark:bg-gray-700"
                  } rounded-lg p-3`}
                >
                  <p>{msg.content}</p>
                  {msg.attachment && (
                    <div className="mt-2">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Attached file:
                      </span>
                      <a
                        href={msg.attachment.url}
                        download={msg.attachment.filename}
                        className="block text-blue-500 dark:text-blue-400"
                      >
                        {msg.attachment.filename}
                      </a>
                    </div>
                  )}
                </div>
                <span className="text-xs opacity-75 dark:text-gray-400">
                  {new Date(msg.timestamp).toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>

        {selectedFile && (
          <div className="p-4 border-t dark:border-gray-700">
            <div className="mb-4 p-2 border rounded-lg dark:border-gray-600 dark:bg-gray-800 flex justify-between items-center">
              <span className="text-sm dark:text-gray-400">
                Attached file: {selectedFile.name}
              </span>
              <FontAwesomeIcon
                icon={faXmark}
                className="w-4 h-4 text-red-500 cursor-pointer ml-2"
                onClick={handleRemoveFile}
              />
            </div>
          </div>
        )}
        
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

      {/* Cal.com function and calendar modal */}
      {isCalModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 bg-opacity-90 dark:bg-opacity-90 p-6 rounded-lg shadow-lg w-full max-w-4xl h-[80vh]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Schedule a Meeting
              </h2>
              <button
                className="text-gray-500 dark:text-gray-400"
                onClick={() => setIsCalModalOpen(false)}
              >
                <FontAwesomeIcon icon={faXmark} className="w-6 h-6" />
              </button>
            </div>
            <div className="w-full h-full overflow-hidden">
              <Cal
                calLink="rick/get-rick-rolled"
                className="w-full h-full border-none"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
