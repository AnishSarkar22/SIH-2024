import React, { useEffect, useState, useRef } from 'react';
import {
  CallingState,
  StreamCall,
  StreamVideo,
  StreamVideoClient,
  StreamTheme,
  SpeakerLayout,
  CallControls,
  CallParticipantsList,
  DeviceSettings,
  Icon,
} from '@stream-io/video-react-sdk';
import '@stream-io/video-react-sdk/dist/css/styles.css';
import { useNavigate } from 'react-router-dom';
import { FaUserGroup } from 'react-icons/fa6';
import {
  Chat,
  Channel,
  Window,
  MessageList,
  MessageInput,
  useChannelStateContext,
  useChatContext,
  MESSAGE_ACTIONS,
} from 'stream-chat-react';
import 'stream-chat-react/dist/css/v2/index.css';  // Updated import path
import { StreamChat } from 'stream-chat';
import CallHeader from './CallHeader'; // Import the CallHeader component

// Configuration
const apiKey = 'mmhfdzb5evj2';
// Update the token with a valid one
const token = 'YOUR_NEW_VALID_JWT_TOKEN';
const userId = 'Lumiya';
const callId = '6aZpB5qow4Zo';

const user = {
  id: userId,
  name: 'Oliver',
  image: 'https://getstream.io/random_svg/?id=oliver&name=Oliver',
};

// Initialize clients
const videoClient = new StreamVideoClient({ apiKey, user, token });
const call = videoClient.call('default', callId);

const chatClient = StreamChat.getInstance(apiKey);
chatClient.connectUser(user, token);

const ALLOWED_MESSAGE_ACTIONS = [
  MESSAGE_ACTIONS.edit,
  MESSAGE_ACTIONS.delete,
  MESSAGE_ACTIONS.flag,
  MESSAGE_ACTIONS.quote,
  MESSAGE_ACTIONS.react,
];

// Components
const NoMessages = () => {
  const { messages } = useChannelStateContext();

  if (messages?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-400">
        <div className="w-12 h-12 mb-4">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold mb-2">No messages yet</h3>
        <p className="text-sm text-center">Be the first to start the conversation!</p>
      </div>
    );
  }
  return null;
};

const ChatHeader = ({ onClose }) => (
  <div className="flex items-center justify-between p-4 border-b border-gray-700">
    <h2 className="text-lg font-semibold text-white">Chat</h2>
    <button
      onClick={onClose}
      className="p-2 hover:bg-gray-700 rounded-full transition-colors"
    >
      <Icon icon="close" className="w-5 h-5 text-gray-300" />
    </button>
  </div>
);

const SendButton = ({ sendMessage }) => (
  <button
    onClick={sendMessage}
    className="p-2 hover:bg-gray-700 rounded-full transition-colors ml-2"
  >
    <Icon icon="chevron-right" className="w-5 h-5 text-blue-500" />
  </button>
);

const CustomInput = ({ sendMessage, uploadFile, ...props }) => (
  <div className="flex items-center p-4 border-t border-gray-700">
    <input
      {...props}
      className="w-full bg-gray-700 text-white rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Type a message..."
    />
    <button
      onClick={sendMessage}
      className="p-2 hover:bg-gray-700 rounded-full transition-colors ml-2"
    >
      <Icon icon="chevron-right" className="w-5 h-5 text-blue-500" />
    </button>
    <button
      onClick={uploadFile}
      className="p-2 hover:bg-gray-700 rounded-full transition-colors ml-2"
    >
      <Icon icon="paperclip" className="w-5 h-5 text-blue-500" />
    </button>
  </div>
);

const ChatUI = ({ onClose, channelId }) => {
  const { client, setActiveChannel } = useChatContext();

  useEffect(() => {
    const createAndSetChannel = async () => {
      const channel = client.channel('messaging', channelId, {
        name: 'Video Call Chat',
        members: [userId],
      });
      await channel.create();
      setActiveChannel(channel);
    };

    createAndSetChannel();
  }, [channelId, client, setActiveChannel]);

  const sendMessage = async (text) => {
    const channel = client.activeChannel;
    if (channel) {
      console.log('Sending message:', text);
      await channel.sendMessage({ text });
    } else {
      console.error('No active channel found');
    }
  };

  const uploadFile = async (file) => {
    const channel = client.activeChannel;
    if (channel) {
      console.log('Uploading file:', file);
      await channel.sendFile(file);
    } else {
      console.error('No active channel found');
    }
  };

  return (
    <div className="fixed bottom-24 right-4 w-96 h-[32rem] bg-gray-800 rounded-lg shadow-xl flex flex-col overflow-hidden border border-gray-700">
      <Channel
        EmptyStateIndicator={NoMessages}
        SendButton={SendButton}
      >
        <Window>
          <ChatHeader onClose={onClose} />
          <div className="flex-1 overflow-y-auto">
            <MessageList messageActions={ALLOWED_MESSAGE_ACTIONS} />
          </div>
          <MessageInput
            focus
            Input={(props) => <CustomInput {...props} sendMessage={sendMessage} uploadFile={uploadFile} />}
          />
        </Window>
      </Channel>
    </div>
  );
};

const ChatWrapper = ({ chatClient, children }) => {
  if (!chatClient) return <div>Loading Chat...</div>;

  return (
    <Chat theme="str-chat__theme-dark" client={chatClient}>
      {children}
    </Chat>
  );
};

const ParticipantList = () => (
  <StreamCall call={call}>
    <CallParticipantsList />
  </StreamCall>
);

// Main App Component
export default function App() {
  const [callJoined, setCallJoined] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showParticipants, setShowParticipants] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const navigate = useNavigate();
  const joinAttemptedRef = useRef(false);

  const joinCall = async () => {
    try {
      if (!joinAttemptedRef.current && 
          !callJoined && 
          call.state !== CallingState.JOINED && 
          call.state !== CallingState.JOINING) {
        joinAttemptedRef.current = true;
        await call.join({ create: true });
        setCallJoined(true);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error joining the call:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    joinCall();

    return () => {
      joinAttemptedRef.current = false;
      if (call.state === CallingState.JOINED) {
        call.leave();
      }
    };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
        Loading call...
      </div>
    );
  }

  if (callEnded) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
        <p>Call Ended</p>
      </div>
    );
  }

  const toggleParticipants = () => setShowParticipants(!showParticipants);
  const toggleChat = () => setShowChat(!showChat);

  return (
    <div className="bg-gray-800 py-16 text-white min-h-screen relative">
      <StreamVideo client={videoClient}>
        <StreamTheme>
          <StreamCall call={call}>
            <CallHeader isTransparent={false} isActive={false} /> {/* Add CallHeader component */}
            <SpeakerLayout />
            <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex items-center justify-center space-x-4 bg-gray-800 p-4 rounded-lg shadow-lg">
              <CallControls />
              <button 
                onClick={toggleParticipants}
                className="bg-gray-700 p-2 rounded-full hover:bg-gray-600 transition-colors"
              >
                <FaUserGroup size={24} />
              </button>
              <div className="bg-gray-700 p-2 rounded-full hover:bg-gray-600 transition-colors">
                <DeviceSettings />
              </div>
              <button 
                onClick={toggleChat}
                className="bg-gray-700 p-2 rounded-full hover:bg-gray-600 transition-colors"
              >
                <Icon icon="chat" />
              </button>
            </div>

            {showParticipants && (
              <div className="fixed bottom-24 right-4 w-80 h-96 bg-gray-800 rounded-lg shadow-xl overflow-hidden border border-gray-700">
                <ParticipantList />
              </div>
            )}

            {showChat && (
              <ChatWrapper chatClient={chatClient}>
                <ChatUI onClose={toggleChat} channelId="video-call-chat" />
              </ChatWrapper>
            )}
          </StreamCall>
        </StreamTheme>
      </StreamVideo>
    </div>
  );
}