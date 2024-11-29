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
import Cal from "@calcom/embed-react";
import { X } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader'; 
import CardActions from '@mui/material/CardActions';
import MicOff from '@mui/icons-material/MicOff';
import Mic from '@mui/icons-material/Mic';
import VideoOff from '@mui/icons-material/VideocamOff';
import Video from '@mui/icons-material/Videocam';

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
  // Add more initial messages as needed
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
            <div className="w-12 h-12 rounded-full bg-pink-500 flex items-center justify-center text-white font-bold">
              {message?.initials}
            </div>
            <div>
              <div className="font-bold">{message?.name}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {message?.message}
              </div>
            </div>
          </div>
          <div className="flex space-x-3">
            <MdVideoCall
              className="w-9 h-9 text-gray-500 dark:text-gray-400 cursor-pointer"
              onClick={startVideoCall}
            />
            <SlCalender
              className="w-9 h-9 text-gray-500 dark:text-gray-400 cursor-pointer"
              onClick={() => setIsCalModalOpen(true)}
            />
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
        {/* Message input */}
        <div className="flex items-center p-4 border-t dark:border-gray-700">
          <PiSmileySticker className="w-6 h-6 text-gray-500 dark:text-gray-400 cursor-pointer" />
          <RiAttachmentLine
            className="w-6 h-6 text-gray-500 dark:text-gray-400 cursor-pointer ml-3"
            onClick={handleAttachmentClick}
          />
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          {selectedFile && (
            <div className="flex items-center ml-3">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {selectedFile.name}
              </span>
              <RxCross2
                className="w-4 h-4 text-red-500 cursor-pointer ml-2"
                onClick={handleRemoveFile}
              />
            </div>
          )}
          <input
            type="text"
            className="flex-1 px-4 py-2 ml-4 rounded-lg border dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            placeholder="Type your message..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <BsFillSendFill
            className="w-6 h-6 text-gray-500 dark:text-gray-400 cursor-pointer ml-3"
            onClick={handleSendMessage}
          />
        </div>
      </div>

      {/* Calendar Modal */}
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
                <RxCross2 className="w-6 h-6" />
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
      {isVideoCallOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <Card className="w-full max-w-2xl bg-white dark:bg-gray-900">
            <CardHeader className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Video Call</h2>
              <Button variant="ghost" size="icon" onClick={endVideoCall}>
                <X className="h-6 w-6" />
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
                <span className="absolute bottom-2 left-2 bg-gray-900 text-white px-2 py-1 text-sm rounded-md">You</span>
              </div>
              <div className="relative">
                <video
                  ref={remoteVideoRef}
                  autoPlay
                  className="w-full h-64 bg-gray-300 rounded-lg object-cover"
                />
                <span className="absolute bottom-2 left-2 bg-gray-900 text-white px-2 py-1 text-sm rounded-md">Remote</span>
              </div>
            </CardContent>
            <CardActions className="justify-between">
              <div className="flex space-x-2">
                <Button variant="outline" size="icon" onClick={toggleMute}>
                  {isMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </Button>
                <Button variant="outline" size="icon" onClick={toggleVideo}>
                  {isVideoOff ? <VideoOff className="h-4 w-4" /> : <Video className="h-4 w-4" />}
                </Button>
              </div>
              <Button variant="destructive" onClick={endVideoCall}>
                End Call
              </Button>
            </CardActions>
          </Card>
        </div>
      )}
    </div>
  );
};

export default MChat;
