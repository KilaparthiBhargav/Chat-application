import { useState } from "react";
import Join from "./pages/Join";
import Chat from "./pages/Chat";

function App() {
  const [user, setUser] = useState("");
  const [room, setRoom] = useState("");
  const [joined, setJoined] = useState(false);

  return (
    <>
      {!joined ? (
        <Join setUser={setUser} setRoom={setRoom} setJoined={setJoined} />
      ) : (
        <Chat user={user} room={room} />
      )}
    </>
  );
}

export default App;