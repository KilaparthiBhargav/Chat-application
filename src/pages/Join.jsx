import { useState } from "react";
import "./join.css";

function Join({ setUser, setRoom, setJoined }) {
  const [name, setName] = useState("");
  const [roomName, setRoomName] = useState("");

  const handleJoin = () => {
    if (!name.trim() || !roomName.trim()) {
      alert("Please fill all fields");
      return;
    }

    setUser(name);
    setRoom(roomName);
    setJoined(true);
  };

  return (
    <div className="join-page">

      <div className="join-container">

        {/* Left Side */}
        <div className="join-left">

          <div className="join-branding">

            <h1 className="join-title">
              Realtime Chat
            </h1>

            <p className="join-subtitle">
              Connect instantly with rooms,
              friends and realtime messaging.
            </p>

          </div>

        </div>

        {/* Right Side */}
        <div className="join-right">

          <div className="join-card">

            <h2 className="form-title">
              Join Room
            </h2>

            <p className="form-subtitle">
              Enter details to continue
            </p>

            <div className="form-group">

              <label className="form-label">
                Username
              </label>

              <input
                type="text"
                placeholder="Enter username"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                className="form-input"
              />

            </div>

            <div className="form-group">

              <label className="form-label">
                Room Name
              </label>

              <input
                type="text"
                placeholder="Enter room name"
                value={roomName}
                onChange={(e) =>
                  setRoomName(e.target.value)
                }
                className="form-input"
              />

            </div>

            <button
              className="join-submit-btn"
              onClick={handleJoin}
            >
              Join Chat
            </button>

            <div className="popular-rooms">

              <p className="popular-title">
                Popular Rooms
              </p>

              <div className="popular-list">

                {[
                  "global",
                  "gaming",
                  "coding",
                  "music",
                ].map((room) => (
                  <button
                    key={room}
                    className="room-pill"
                    onClick={() =>
                      setRoomName(room)
                    }
                  >
                    {room}
                  </button>
                ))}

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Join;