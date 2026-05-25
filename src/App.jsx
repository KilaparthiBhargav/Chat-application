import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

import Login from "./pages/Login";
import Join from "./pages/Join";
import Chat from "./pages/Chat";

function App() {
  const [user, setUser] = useState(null);
  const [room, setRoom] = useState("");
  const [step, setStep] = useState("login"); 
  // login → join → chat

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (u) {
        setUser({
          name: u.displayName,
          email: u.email,
          photo: u.photoURL,
          uid: u.uid,
        });

        setStep("join"); // auto go to join
      } else {
        setUser(null);
        setStep("login");
      }
    });

    return () => unsub();
  }, []);

  if (step === "login") {
    return <Login setUser={setUser} />;
  }

  if (step === "join") {
    return (
      <Join
        setRoom={setRoom}
        goChat={setStep}
      />
    );
  }

  return <Chat user={user} room={room} />;
}

export default App;