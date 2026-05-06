import { useState } from "react";

function Join({ setUser, setRoom, setJoined }) {
  const [name, setName] = useState("");

  const handleJoin = () => {
    if (!name) {
      alert("Enter username");
      return;
    }

    setUser(name);

    // FORCE SAME ROOM FOR ALL USERS
    setRoom("global");

    setJoined(true);
  };

  return (
    <div>
      <h2>Join Chat</h2>

      <input
        placeholder="Enter name"
        onChange={(e) => setName(e.target.value)}
      />

      <button onClick={handleJoin}>Join</button>
    </div>
  );
}

export default Join;