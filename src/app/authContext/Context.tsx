"use client";
import { useState, useEffect, createContext } from "react";

type UserType = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
};
type AuthResponseType = {
  message: string;
  accessToken: string;
  refreshToken: string;
  user: UserType;
};
type AuthContextType = {
  isLoggedIn: boolean;
  firstName: string;
  lastName: string;
  email: string;
  logOut: () => void;
  logIn: (userData: AuthResponseType) => void;
};

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  firstName: "",
  lastName: "",
  email: "",
  logOut: () => {},
  logIn: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const userJson = localStorage.getItem("user");
    if (userJson) {
      const userData = JSON.parse(userJson);
      if (userData) {
        setIsLoggedIn(true);
        setFirstName(userData.user.firstName);
        setLastName(userData.user.lastName);
        setEmail(userData.user.email);
      }
    }
  }, []);

  function logOut() {
    localStorage.removeItem("user");
    console.log("logout");
    setIsLoggedIn(false);
    setFirstName("");
    setLastName("");
    setEmail("");
  }
  function logIn(userData: AuthResponseType) {
    const userJson = JSON.stringify(userData);
    localStorage.setItem("user", userJson);
    setIsLoggedIn(true);
    setFirstName(userData.user.firstName);
    setLastName(userData.user.lastName);
    setEmail(userData.user.email);
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        firstName,
        lastName,
        email,
        logOut,
        logIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
