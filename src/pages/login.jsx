import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import "./join.css";
import "./login.css";

function Login({ setUser, goNext }) {
 const handleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const u = result.user;

    setUser({
      name: u.displayName,
      email: u.email,
      photo: u.photoURL,
      uid: u.uid,
    });

    goNext?.("join"); // safer
  } catch (err) {
    console.error("Google login failed:", err);
  }
}

  return (
    <div className="join-page login-bg">

      <div className="join-container">

        {/* LEFT SIDE */}
        <div className="join-left">
          <div className="join-branding">

            <h1 className="join-title">
              RealTime Chat
            </h1>

            <p className="join-subtitle">
              Connect instantly with friends, rooms, and communities in real-time.
            </p>

            <div className="login-features">
              <p>✔ Instant messaging</p>
              <p>✔ Multiple rooms</p>
              <p>✔ Secure Google login</p>
            </div>

          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="join-right">

          <div className="join-card login-card">

            <div className="login-avatar">
              💬
            </div>

            <h2 className="form-title">
              Welcome Back
            </h2>

            <p className="form-subtitle">
              Sign in to continue chatting
            </p>

            <button
              type="button"
              className="join-submit-btn login-btn"
              onClick={handleLogin}
            >
              Continue with Google
            </button>

            <p className="login-footer-text">
              By continuing, you agree to our chat community guidelines
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;