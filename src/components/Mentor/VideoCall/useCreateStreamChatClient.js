import { useEffect, useState } from 'react';
import { StreamChat } from 'stream-chat';

export const useCreateStreamChatClient = ({
  apiKey,
  userData,
  tokenOrProvider,
}) => {
  const [chatClient, setChatClient] = useState(null);

  const disableChat = import.meta.env.VITE_DISABLE_CHAT === 'true';
  useEffect(() => {
    if (disableChat || !apiKey) return;

    const client = new StreamChat(apiKey, {
      timeout: 5000,
    });

    let didUserConnectInterrupt = false;
    const connectionPromise = client
      .connectUser(userData, tokenOrProvider)
      .then(() => {
        if (!didUserConnectInterrupt) setChatClient(client);
      });

    return () => {
      didUserConnectInterrupt = true;
      setChatClient(null);
      connectionPromise
        .then(() => client.disconnectUser())
        .then(() => {
          console.log('connection closed');
        });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiKey, userData.id, tokenOrProvider]);

  return chatClient;
};