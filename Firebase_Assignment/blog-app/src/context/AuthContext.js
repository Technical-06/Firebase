import React, { useState, useEffect } from "react";
import { auth, provider } from "../firebase-config";
const AuthContext = React.createContext();

export function useAuth(AuthContext) {
  return React.useContext;
}
export const AuthProvider = (props) => {
  const [currentUser, setCurrentUser] = useState();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);
  const signInWithGoogle = () => {
    return auth.signInWithPopup(provider);
  };
  return (
    <AuthContext.Provider value={{ signInWithGoogle, currentUser }}>
      {props.children}
    </AuthContext.Provider>
  );
};
