import React, { useState } from 'react';
import ReactChatbotKit from 'react-chatbot-kit'; // Import the chatbot library
import 'react-chatbot-kit/build/main.css'; // Import the chatbot styles


// Define the actions that the chatbot will take
const config = {
  botName: 'Quick Kart Bot',
  initialMessages: [
    { text: 'Hello! How can I assist you today?', type: 'text' }
  ],
  customComponents: {},
  state: {},
  customStyles: {
    botMessageBox: {
      backgroundColor: '#2d2d2d',
    },
    chatButton: {
      backgroundColor: '#0a74da',
    },
  },
  customMessages: [],
};

// Define the message handler for the chatbot
const ActionProvider = ({ createMessage, setState, children }) => {
  const handleMessage = (message) => {
    const newMessage = createMessage(`You said: ${message}`);
    setState((state) => ({
      ...state,
      messages: [...state.messages, newMessage],
    }));
  };

  return (
    <div>
      <button onClick={() => handleMessage('Hi!')}>Send Test Message</button>
      {children}
    </div>
  );
};

function ChatBot() {
  const [showBot, setShowBot] = useState(true); // State to control chatbot visibility

  const toggleBot = () => {
    setShowBot((prevShowBot) => !prevShowBot);
  };

  return (
    <div className="chatbot-container">
      <button onClick={toggleBot} className="chatbot-toggle-button">
        {showBot ? 'Close Chat' : 'Open Chat'}
      </button>

      {showBot && (
        <ReactChatbotKit
          config={config}
          actionProvider={ActionProvider}
          messageParser={() => {}}
        />
      )}
    </div>
  );
}

export default ChatBot;
