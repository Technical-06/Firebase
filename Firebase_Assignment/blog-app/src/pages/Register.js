import React, { useEffect, useState } from "react";
import { auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "firebase/auth";
import { Navigate } from "react-router";

function Register() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [updateUserName, setUpdateUsername] = useState("");
  let navigate = useNavigate();
  let isErrorOccurred = false;
  const [user, setUser] = useState({});
  const logout = async () => {
    await signOut(auth);
  };

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });
  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      await updateProfile(auth.currentUser, {
        displayName: updateUserName,
      });
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
    if (!isErrorOccurred) {
      navigate("/");
    }
  };
  return (
    <div className="App">
      <div>
        <h3> User Name </h3>
        <input
          placeholder="Enter your name"
          onChange={(event) => {
            setUpdateUsername(event.target.value);
          }}
        />
        <h3> Register User </h3>

        <input
          placeholder="Email..."
          onChange={(event) => {
            setRegisterEmail(event.target.value);
          }}
        />
        <input
          placeholder="Password..."
          onChange={(event) => {
            setRegisterPassword(event.target.value);
          }}
        />

        <button onClick={register}> Create User</button>
      </div>
    </div>
  );
}
export default Register;
