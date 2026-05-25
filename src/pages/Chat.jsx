import { useState, useEffect, useRef } from "react";
import { socket } from "../services/socket";
import "./chat.css";

function Chat({ user, room }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const bottomRef = useRef(null);

  // Load messages
  useEffect(() => {
    const saved =
      JSON.parse(localStorage.getItem(room)) || [];
    setMessages(saved);
  }, [room]);

  // Join room + receive messages
  useEffect(() => {
    if (!room) return;

    socket.emit("join_room", room);

    const handleMessage = (data) => {
      setMessages((prev) => {
        const updated = [...prev, data];
        localStorage.setItem(room, JSON.stringify(updated));
        return updated;
      });
    };

    socket.on("receive_message", handleMessage);

    return () => {
      socket.off("receive_message", handleMessage);
    };
  }, [room]);

  // Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  // Send message
  const sendMessage = () => {
    if (!message.trim()) return;

    const msgData = {
      room,
      author: user?.name,   // FIX HERE
      photo: user?.photo,
      message,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    socket.emit("send_message", msgData);

    const updated = [...messages, msgData];
    setMessages(updated);

    localStorage.setItem(room, JSON.stringify(updated));

    setMessage("");
  };

  return (
    <div className="chat-container">

      {/* Sidebar */}
      <div className="chat-sidebar">
        <a href="/"> 
        <h2 className="logo" >Chat App</h2></a>

        <div className="info-box">
          <p>User</p>
          <h3>{user?.name}</h3> {/* FIX */}
        </div>

        <div className="info-box">
          <p>Room</p>
          <h3>#{room}</h3>
        </div>
      </div>

      {/* Main */}
      <div className="chat-main">

        {/* Header */}
        <div className="chat-header">
          <h2>#{room}</h2>
          <span>{user?.name}</span> {/* FIX */}
        </div>

        {/* Messages */}
        <div className="chat-body">

          {messages.map((msg, i) => {
            const isOwn =
              msg.author === user?.name; // FIX

            return (
              <div
                key={i}
                className={`msg-row ${
                  isOwn ? "own" : ""
                }`}
              >
                <div className="msg-box">

                  <div className="msg-top">
                    <strong>
                      {msg.author}
                    </strong>
                    <small>{msg.time}</small>
                  </div>

                  <p>{msg.message}</p>

                </div>
              </div>
            );
          })}

          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="chat-footer">

          <input
            value={message}
            onChange={(e) =>
              setMessage(e.target.value)
            }
            onKeyDown={(e) =>
              e.key === "Enter" &&
              sendMessage()
            }
            placeholder="Type message..."
          />

          <button onClick={sendMessage}>
            Send
          </button>

        </div>

      </div>
    </div>
  );
}

export default Chat;