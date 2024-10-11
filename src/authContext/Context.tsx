"use client";
// import { useSession } from "next-auth/react";
import { useState, useEffect, createContext } from "react";

type UserType = {
  id?: string | null;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  credits?: number;
};

type AuthContextType = {
  id: string | null;

  email: string | null;
  image: string | null;
  firstName: string | null;
  lastName: string | null;
  credits: number;
  isLoggedIn: boolean;
  logOut: () => void;
  updateCredit: (credit: number) => void;
  logIn: (userData: UserType) => void;
};

export const AuthContext = createContext<AuthContextType>({
  id: "",
  email: "",
  image: "",
  firstName: "",
  lastName: "",
  credits: 0,
  isLoggedIn: false,
  logOut: () => {},
  updateCredit: () => {},
  logIn: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [credits, setCredits] = useState(0);
  const [image, setImage] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");

  // const { data: session } = useSession();
  // const isValid = localStorage.getItem("user");
  // console.log(isValid, "isvalid");

  // useEffect(() => {
  //   const userData = session?.user;

  //   if (userData?.accessToken) {
  //     setId(userData?.id!);
  //     setIsLoggedIn(true);
  //     setFirstName(userData?.firstName!);
  //     setLastName(userData?.lastName!);
  //     setEmail(userData?.email!);
  //     setCredits(userData?.credits);
  //     setImage(userData?.image!);
  //   }
  // }, []);

  function logOut() {
    setId("");
    setIsLoggedIn(false);
    setFirstName("");
    setLastName("");
    setEmail("");
    setCredits(0);
    setImage("");
    // localStorage.removeItem("user");
  }
  function logIn(userData: UserType) {
    setId(userData?.id!);
    setIsLoggedIn(true);
    setFirstName(userData?.firstName!);
    setLastName(userData?.lastName!);
    setEmail(userData?.email!);
    setCredits(userData?.credits!);
    setImage(userData?.image!);
  }
  function updateCredit(credit: number) {
    setCredits(credit);
  }

  return (
    <AuthContext.Provider
      value={{
        credits,
        image,
        id,
        isLoggedIn,
        firstName,
        lastName,
        email,
        logOut,
        updateCredit,
        logIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
