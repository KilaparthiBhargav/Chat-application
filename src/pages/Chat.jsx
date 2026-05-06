import { useState, useEffect } from "react";
import { socket } from "../services/socket";

function Chat({ user, room }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!room) return;

    console.log("Joining room:", room);

    socket.emit("join_room", room);

    socket.on("receive_message", (data) => {
      console.log("Received:", data);
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, [room]);

  const sendMessage = () => {
    if (!message) return;

    const msgData = {
      room,
      author: user,
      message,
      time: new Date().toLocaleTimeString(),
    };

    console.log("Sending:", msgData);

    socket.emit("send_message", msgData);

    // show in sender UI
    setMessages((prev) => [...prev, msgData]);

    setMessage("");
  };

  return (
    <div>
      <h3>Room: {room}</h3>

      <div style={{ height: "300px", overflow: "auto", border: "1px solid black" }}>
        {messages.map((msg, i) => (
          <div key={i}>
            <b>{msg.author}</b>: {msg.message}
          </div>
        ))}
      </div>

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type message"
      />

      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default Chat;