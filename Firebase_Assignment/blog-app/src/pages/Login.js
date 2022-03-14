import { auth, provider } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function Login({ setIsAuth }) {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  let navigate = useNavigate();
  let isErrorOccur = false;

  const [user, setUser] = useState({});

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });
  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(user);
    } catch (error) {
      isErrorOccur = true;
      console.log(error.message);
    }
    if (!isErrorOccur) {
      setIsAuth(true);
      navigate("/");
    }
  };

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
      navigate("/");
    });
  };
  return (
    <>
      <a href="/register" style={{ color: "blue" }}>
        <u>Click here to register for new account</u>
      </a>
      <div>
        <h3> Login </h3>
        <input
          placeholder="Email..."
          onChange={(event) => {
            setLoginEmail(event.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Password..."
          onChange={(event) => {
            setLoginPassword(event.target.value);
          }}
        />

        <button onClick={login}> Login</button>
      </div>

      <div>
        <h4> User Logged In: </h4>
        {user?.email}
      </div>
      <div className="loginPage">
        <p>Sign In With Google to Continue</p>
        <button
          className="login-with-google-btn"
          onClick={() => signInWithGoogle()}
        >
          Sign in with Google
        </button>
      </div>
    </>
  );
}

export default Login;
