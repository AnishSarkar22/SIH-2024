// MChat.jsx
// mentors can chat with mentees
import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MSidebar from "./MSidebar";
import MHeader from "./MHeader";
import "webrtc-adapter";
import Cal from "@calcom/embed-react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faVideo,
  faPaperclip,
  faPaperPlane,
  faArrowLeft,
  faVideoSlash,
  faMicrophone,
  faMicrophoneSlash,
} from "@fortawesome/free-solid-svg-icons";
import { faFaceSmile, faCalendar } from "@fortawesome/free-regular-svg-icons";

import {
  getDoc,
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  addDoc,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../services/firebase.js";

const MChat = () => {
  const { chatId } = useParams();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [chatDetails, setChatDetails] = useState({
    name: chatId,
    avatarColor: "bg-pink-500",
  });

  const [darkMode, setDarkMode] = useState(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    return savedDarkMode === "enabled";
  }); // Set initial state from localStorage

  const [sidebarShrink, setSidebarShrink] = useState(false);

  const [otherUserDetails, setOtherUserDetails] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const [isVideoCallOpen, setIsVideoCallOpen] = useState(false);
  const [isCalModalOpen, setIsCalModalOpen] = useState(false); // Define the state for calendar modal
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnectionRef = useRef(null);
  const localStreamRef = useRef(null);
  const remoteStreamRef = useRef(null);
  const toggleMute = () => setIsMuted(!isMuted);
  const toggleVideo = () => setIsVideoOff(!isVideoOff);

  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

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

  // useEffect for current user
  useEffect(() => {
    const userId = localStorage.getItem("userId");
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

  // Add this useEffect after the current user useEffect
  useEffect(() => {
    const fetchOtherUserDetails = async () => {
      if (chatDetails?.name && currentUser) {
        const userIds = chatDetails.name.split("_");
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

  // Update the useEffect for messages
  useEffect(() => {
    if (!chatId || !currentUser) return;

    const getChatDetails = async () => {
      try {
        const chatDoc = await getDoc(doc(db, "chats", chatId));
        if (chatDoc.exists()) {
          const chat = chatDoc.data();
          setChatDetails({
            name:
              chat.mentor_id === currentUser.user_id
                ? chat.mentee_name
                : chat.mentor_name,
            avatarColor: chat.avatarColor || "bg-blue-500",
          });
        }
      } catch (error) {
        console.error("Error loading chat details:", error);
      }
    };

    getChatDetails();

    // Messages listener
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

  const handleSendMessage = async () => {
    if (!inputMessage.trim() && !selectedFile) return;
    if (!currentUser || !chatId) return;

    try {
      let attachment = null;

      if (selectedFile) {
        const storageRef = ref(storage, `files/${chatId}/${selectedFile.name}`);
        const uploadTask = await uploadBytes(storageRef, selectedFile);
        const downloadURL = await getDownloadURL(uploadTask.ref);

        attachment = {
          url: downloadURL,
          filename: selectedFile.name,
          contentType: selectedFile.type,
        };
      }

      const messageData = {
        content: inputMessage.trim(),
        sender_id: currentUser.user_id,
        sender_name: currentUser.name,
        timestamp: Timestamp.now(),
        attachment: attachment,
      };

      await addDoc(collection(db, "chats", chatId, "messages"), messageData);

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

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  // Video call setup using WebRTC
  // const startVideoCall = async () => {
  //   setIsVideoCallOpen(true);

  //   const configuration = {
  //     iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
  //   };

  //   const peerConnection = new RTCPeerConnection(configuration);
  //   peerConnectionRef.current = peerConnection;

  //   // Get local stream (camera and microphone)
  //   const localStream = await navigator.mediaDevices.getUserMedia({
  //     video: true,
  //     audio: true,
  //   });
  //   localStreamRef.current = localStream;

  //   // Display the local video stream
  //   localVideoRef.current.srcObject = localStream;

  //   // Add local stream tracks to the peer connection
  //   localStream.getTracks().forEach((track) => {
  //     peerConnection.addTrack(track, localStream);
  //   });

  //   // Create a remote stream and display it when tracks are received
  //   const remoteStream = new MediaStream();
  //   remoteStreamRef.current = remoteStream;
  //   peerConnection.ontrack = (event) => {
  //     event.streams[0].getTracks().forEach((track) => {
  //       remoteStream.addTrack(track);
  //     });
  //   };
  //   remoteVideoRef.current.srcObject = remoteStream;

  //   // Handle ICE candidates
  //   peerConnection.onicecandidate = (event) => {
  //     if (event.candidate) {
  //       console.log("New ICE candidate:", event.candidate);
  //       // Send candidate to the remote peer (you'll need signaling logic here)
  //     }
  //   };

  //   // Create and send offer (for initiator)
  //   const offer = await peerConnection.createOffer();
  //   await peerConnection.setLocalDescription(offer);
  //   console.log("Offer created and sent to remote peer:", offer);
  //   // Send offer to the remote peer (you'll need signaling logic here)
  // };
  // const endVideoCall = () => {
  //   setIsVideoCallOpen(false);

  //   // Close the peer connection and stop the streams
  //   if (peerConnectionRef.current) {
  //     peerConnectionRef.current.close();
  //     peerConnectionRef.current = null;
  //   }

  //   if (localStreamRef.current) {
  //     localStreamRef.current.getTracks().forEach((track) => track.stop());
  //     localStreamRef.current = null;
  //   }

  //   if (remoteStreamRef.current) {
  //     remoteStreamRef.current.getTracks().forEach((track) => track.stop());
  //     remoteStreamRef.current = null;
  //   }
  // };

  return (
    <div className={`flex h-screen ${darkMode ? "dark" : ""} bg-white`}>
      <MSidebar
        sidebarShrink={sidebarShrink}
        isDarkMode={darkMode}
        toggleSidebar={toggleSidebar}
      />
      <div className="flex-1 flex flex-col overflow-hidden dark:bg-gray-900 dark:text-white">
        <MHeader
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
              onClick={() => navigate("/mentor-message")}
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
                {/* {otherUserDetails?.name || chatDetails.name} */}
                {otherUserDetails?.name || "Loading..."}
              </span>
              {/* to show status os sender's message */}
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {otherUserDetails?.status || "Offline"}
              </div>
            </div>
          </div>
          <div className="flex space-x-3">
            <FontAwesomeIcon
              icon={faVideo}
              className="pt-1 pr-6 w-6 h-6 text-gray-500 dark:text-gray-400 cursor-pointer"
              // onClick={startVideoCall}
            />
            <FontAwesomeIcon
              icon={faCalendar}
              className="pt-1 pr-4 w-6 h-6 text-gray-500 dark:text-gray-400 cursor-pointer"
              onClick={() => setIsCalModalOpen(true)}
            />
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-grow overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => {
            const isCurrentUser = msg.sender_id === currentUser?.user_id;
            return (
              <div
                key={msg.id}
                className={`flex ${
                  isCurrentUser ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex flex-col max-w-[70%] ${
                    isCurrentUser ? "items-end" : "items-start"
                  }`}
                >
                  {!isCurrentUser && (
                    <span className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                      {msg.sender_name}
                    </span>
                  )}
                  <div
                    className={`rounded-lg p-3 ${
                      isCurrentUser
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 dark:bg-gray-700"
                    }`}
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
                  <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {new Date(msg.timestamp).toLocaleString()}
                  </span>
                </div>
              </div>
            );
          })}
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

      {/* Video Call Modal */}
      {/* {isVideoCallOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <Card className="w-full max-w-2xl bg-white dark:bg-gray-900">
            <CardHeader className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Video Call</h2>
              <Button variant="ghost" size="icon" onClick={endVideoCall}>
                <FontAwesomeIcon icon={faXmark} className="h-6 w-6" />
              </Button>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <div className="relative">
                <video
                  ref={localVideoRef}
                  autoPlay
                  muted
                  className="w-full h-64 bg-gray-300 rounded-lg object-cover"
                />
                <span className="absolute bottom-2 left-2 bg-gray-900 text-white px-2 py-1 text-sm rounded-md">
                  You
                </span>
              </div>
              <div className="relative">
                <video
                  ref={remoteVideoRef}
                  autoPlay
                  className="w-full h-64 bg-gray-300 rounded-lg object-cover"
                />
                <span className="absolute bottom-2 left-2 bg-gray-900 text-white px-2 py-1 text-sm rounded-md">
                  Remote
                </span>
              </div>
            </CardContent>
            <CardActions className="justify-between">
              <div className="flex space-x-2">
                <Button variant="outline" size="icon" onClick={toggleMute}>
                  {isMuted ? (
                    <FontAwesomeIcon icon={faMicrophoneSlash} className="h-5 w-5" />
                  ) : (
                    <FontAwesomeIcon icon={faMicrophone} className="h-5 w-5"/>
                  )}
                </Button>
                <Button variant="outline" size="icon" onClick={toggleVideo}>
                  {isVideoOff ? (
                    <FontAwesomeIcon
                      icon={faVideoSlash}
                      className="h-4 w-4"
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faVideo}
                      className="h-4 w-4"
                    />
                  )}
                </Button>
              </div>
              <Button variant="destructive" onClick={endVideoCall}>
                End Call
              </Button>
            </CardActions>
          </Card>
        </div>
      )} */}
    </div>
  );
};

export default MChat;
