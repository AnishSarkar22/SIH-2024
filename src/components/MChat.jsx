import React, { useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MSidebar from "./MSidebar";
import MHeader from "./MHeader";
import { SlCalender } from "react-icons/sl";
import { MdKeyboardBackspace, MdVideoCall } from "react-icons/md";
import { BsFillSendFill } from "react-icons/bs";
import { PiSmileySticker } from "react-icons/pi";
import { RiAttachmentLine } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import "webrtc-adapter";

const initialMessages = [
  {
    id: 1,
    name: "John Doe",
    message: "Can you check out the formulas in these images att...",
    time: "12:50 pm Aug 19 2024",
    avatarColor: "bg-pink-500",
    initials: "JD",
    link: "/mentor-chat/1",
  },
  {
    id: 2,
    name: "Joshua Ashiru",
    message: "Dear Ayo, You are yet to submit your assignment for chapt...",
    time: "2:10 pm Aug 19 2024",
    avatarColor: "bg-green-500",
    initials: "JA",
    link: "/mentor-chat/2",
  },
  {
    id: 3,
    name: "Neha Kumari",
    message: "Dear Ayo, You are yet to submit your assignment for chapt...",
    time: "5:30 pm Aug 19 2024",
    avatarColor: "bg-blue-500",
    initials: "NK",
    link: "/mentor-chat/3",
  },
  {
    id: 4,
    name: "Ashi Singh",
    message: "Dear Ayo, You are yet to submit your assignment for chapt...",
    time: "6:30 pm Aug 19 2024",
    avatarColor: "bg-yellow-500",
    initials: "AS",
    link: "/mentor-chat/4",
  },
  {
    id: 5,
    name: "Priya Verma",
    message: "Can you help me with the project guidelines?",
    time: "8:00 am Aug 20 2024",
    avatarColor: "bg-purple-500",
    initials: "PV",
    link: "/mentor-chat/5",
  },
  {
    id: 6,
    name: "Amit Patel",
    message: "I have a question about the recent lecture.",
    time: "9:15 am Aug 20 2024",
    avatarColor: "bg-red-500",
    initials: "AP",
    link: "/mentor-chat/6",
  },
  {
    id: 7,
    name: "Sana Khan",
    message: "Could you review my assignment draft?",
    time: "11:45 am Aug 20 2024",
    avatarColor: "bg-orange-500",
    initials: "SK",
    link: "/mentor-chat/7",
  },
  {
    id: 8,
    name: "Vikram Singh",
    message: "I need clarification on the homework.",
    time: "1:30 pm Aug 20 2024",
    avatarColor: "bg-teal-500",
    initials: "VS",
    link: "/mentor-chat/8",
  },
];

const MChat = () => {
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
  const [isVideoCallOpen, setIsVideoCallOpen] = useState(false);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnectionRef = useRef(null);
  const localStreamRef = useRef(null);
  const remoteStreamRef = useRef(null);

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

  const message = initialMessages.find(
    (msg) => msg.id === parseInt(chatId, 10)
  );

  // Video call setup using WebRTC
  const startVideoCall = async () => {
    setIsVideoCallOpen(true);

    const configuration = {
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    };

    const peerConnection = new RTCPeerConnection(configuration);
    peerConnectionRef.current = peerConnection;

    // Get local stream (camera and microphone)
    const localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    localStreamRef.current = localStream;

    // Display the local video stream
    localVideoRef.current.srcObject = localStream;

    // Add local stream tracks to the peer connection
    localStream.getTracks().forEach((track) => {
      peerConnection.addTrack(track, localStream);
    });

    // Create a remote stream and display it when tracks are received
    const remoteStream = new MediaStream();
    remoteStreamRef.current = remoteStream;
    peerConnection.ontrack = (event) => {
      event.streams[0].getTracks().forEach((track) => {
        remoteStream.addTrack(track);
      });
    };
    remoteVideoRef.current.srcObject = remoteStream;

    // Handle ICE candidates
    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        console.log("New ICE candidate:", event.candidate);
        // Send candidate to the remote peer (you'll need signaling logic here)
      }
    };

    // Create and send offer (for initiator)
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    console.log("Offer created and sent to remote peer:", offer);
    // Send offer to the remote peer (you'll need signaling logic here)
  };

  const endVideoCall = () => {
    setIsVideoCallOpen(false);

    // Close the peer connection and stop the streams
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }

    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => track.stop());
      localStreamRef.current = null;
    }

    if (remoteStreamRef.current) {
      remoteStreamRef.current.getTracks().forEach((track) => track.stop());
      remoteStreamRef.current = null;
    }
  };

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
            <MdKeyboardBackspace
              className="w-9 h-9 text-gray-500 dark:text-gray-400 cursor-pointer rounded-full border-black border dark:bg-gray-700 p-2"
              onClick={() => navigate("/mentor-message")}
            />
            <div
              className={`w-12 h-12 rounded-full ${message.avatarColor}`}
            ></div>
            <div>
              <span className="font-bold text-2xl">{message.name}</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {" "}
                (ID: {chatId})
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <SlCalender className="w-6 h-6 text-gray-500 dark:text-gray-400" />
            <MdVideoCall
              className="w-9 h-9 text-blue-500 cursor-pointer"
              onClick={startVideoCall}
            />
          </div>
        </div>
        <div
          className={`border-t ${darkMode ? "border-white" : "border-black"}`}
        ></div>
        {isVideoCallOpen ? (
          <div className="p-4 flex flex-col items-center space-y-4">
            <div className="flex justify-center space-x-4">
              <video
                ref={localVideoRef}
                autoPlay
                playsInline
                className="w-1/2 h-auto bg-gray-500"
              />
              <video
                ref={remoteVideoRef}
                autoPlay
                playsInline
                className="w-1/2 h-auto bg-gray-500"
              />
            </div>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={endVideoCall}
            >
              End Call
            </button>
          </div>
        ) : (
          <>
            <div className="flex-grow overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start space-x-3 ${
                    msg.name === "You" ? "justify-end" : ""
                  }`}
                >
                  <div className="flex flex-col items-start">
                    {msg.name === "You" && (
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        You
                      </span>
                    )}
                    <div
                      className={`max-w-xs ${
                        msg.name === "You"
                          ? "bg-blue-500 text-white"
                          : msg.name === "Rohit Sharma" && !darkMode
                          ? "bg-gray-300"
                          : "bg-gray-200 dark:bg-gray-700"
                      } rounded-lg p-3`}
                    >
                      <p>{msg.message}</p>
                      {msg.file && (
                        <div className="mt-2">
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            Attached file:
                          </span>
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
                    <span
                      className={`text-xs opacity-75 dark:text-gray-400 ${
                        msg.name === "You" ? "text-right" : ""
                      }`}
                    >
                      {msg.time}
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
                  <RxCross2
                    className="w-5 h-5 text-gray-500 dark:text-gray-400 cursor-pointer"
                    onClick={handleRemoveFile}
                  />
                </div>
              </div>
            )}
            <div
              className={`p-4 border-t ${
                darkMode ? "border-white" : "border-black"
              }`}
            >
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
          </>
        )}
      </div>
    </div>
  );
};

export default MChat;