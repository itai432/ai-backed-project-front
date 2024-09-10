import React, { useState, useEffect, useRef } from "react";
import { askChatGPT } from "../services/authService";
import { FaDatabase } from "react-icons/fa";
import "../style/HomePage.scss";

export interface Message {
  type: "user" | "chatgpt" | "error";
  content: string;
  timestamp: string;
}

const HomePage = () => {
  const [userInput, setUserInput] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const chatHistoryRef = useRef<HTMLDivElement>(null);
  const lastMessageRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async () => {
    const dbTokenItem = localStorage.getItem("db_token");
    const dbToken = dbTokenItem ? JSON.parse(dbTokenItem).token : null;

    if (dbToken !== "TRUE") {
      const errorMessage: Message = {
        type: "error",
        content: "Please connect to the database before sending messages.",
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
      return;
    }

    setLoading(true);
    setError(null);

    const userMessage: Message = {
      type: "user",
      content: userInput,
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    await askChatGPT(userInput, setLoading, setMessages);
    setUserInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (!loading && userInput.trim() !== "") {
        handleSubmit();
      }
    }
  };

  useEffect(() => {
    if (lastMessageRef.current && chatHistoryRef.current) {
      const chatContainer = chatHistoryRef.current;
      const lastMessageElement = lastMessageRef.current;

      const topPosition = lastMessageElement.offsetTop;
      const containerHeight = chatContainer.clientHeight;

      chatContainer.scrollTo({
        top: topPosition - containerHeight / 2,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <div className="homepage-container">
      <div className="chat-container">
        <div className="chat-header">
          <FaDatabase className="db-icon" />
          <span>DB Chat</span>
        </div>
        <div className="chat-messages" ref={chatHistoryRef}>
          {messages.map((message, index) => (
            <div
              key={index}
              className={`chat-message ${
                message.type === "user"
                  ? "sent"
                  : message.type === "error"
                  ? "error"
                  : "received"
              }`} // נוסיף עיצוב מיוחד לשגיאות
              ref={index === messages.length - 1 ? lastMessageRef : null}
            >
              <div className="message-sender">
                {message.type === "user"
                  ? "Me"
                  : message.type === "error"
                  ? "System"
                  : "ChatGPT"}
              </div>
              <div className="message-time">{message.timestamp}</div>
              <div className="message-text">
                <pre>{message.content}</pre>
              </div>{" "}
            </div>
          ))}
        </div>
        <div className="chat-input">
          <textarea
            placeholder="Type your query..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button onClick={handleSubmit} disabled={loading}>
            {loading ? "Sending..." : "SEND"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
