import { useState } from "react";
import "./join.css";

function Join({ setRoom, goChat }) {
  const [roomName, setRoomName] = useState("");

  const handleJoin = () => {
    if (!roomName.trim()) {
      alert("Enter room name");
      return;
    }

    setRoom(roomName);
    goChat("chat");
  };

  return (
    <div className="join-page">

      <div className="join-container">

        <div className="join-left">
          <div className="join-branding">
            <h1 className="join-title">
              Choose Room
            </h1>

            <p className="join-subtitle">
              Join or create a chat room
            </p>
          </div>
        </div>

        <div className="join-right">

          <div className="join-card">

            <h2 className="form-title">
              Join Room
            </h2>

            <p className="form-subtitle">
              Enter room name
            </p>

            <div className="form-group">

              <label className="form-label">
                Room Name
              </label>

              <input
                type="text"
                className="form-input"
                value={roomName}
                onChange={(e) =>
                  setRoomName(e.target.value)
                }
                placeholder="Enter custom room"
              />

            </div>

            <button
              type="button"
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

                {["global", "gaming", "coding", "music"].map(
                  (room) => (
                    <button
                      type="button"
                      key={room}
                      className="room-pill"
                      onClick={() =>
                        setRoomName(room)
                      }
                    >
                      {room}
                    </button>
                  )
                )}

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Join;