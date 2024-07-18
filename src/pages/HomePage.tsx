import React, { useState } from 'react';
import '../style/HomePage.scss';
import { FaDatabase } from 'react-icons/fa';

const HomePage: React.FC = () => {
  const [messages, setMessages] = useState([
    { sender: 'DB', time: '10:11 AM, Today', text: 'Welcome! Ask me anything about your database.' },
  ]);
  const [query, setQuery] = useState('');

  const handleSend = () => {
    const newMessage = { sender: 'Me', time: new Date().toLocaleTimeString(), text: query };
    setMessages([...messages, newMessage, { sender: 'DB', time: new Date().toLocaleTimeString(), text: 'This is a response from the database.' }]);
    setQuery('');
  };

  return (
    <div className="homepage-container">
      <div className="chat-container">
        <div className="chat-header">
          <FaDatabase className="db-icon" />
          <span>DB Chat</span>
        </div>
        <div className="chat-messages">
          {messages.map((message, index) => (
            <div key={index} className={`chat-message ${message.sender === 'Me' ? 'sent' : 'received'}`}>
              <div className="message-sender">{message.sender}</div>
              <div className="message-time">{message.time}</div>
              <div className="message-text">{message.text}</div>
            </div>
          ))}
        </div>
        <div className="chat-input">
          <input
            type="text"
            placeholder="Type your query..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={handleSend}>SEND</button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
