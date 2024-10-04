"use client";
import Login from "../login/page";
import { useContext } from "react";
import { AuthContext } from "../authContext/Context";
import Navbar from "../components/Navbar";
import Dashboard from "../components/Dashboard";


interface AppContentProps {
  isLoggedIn: boolean;
}

export default function Home() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
      <AppContent isLoggedIn={isLoggedIn} />
  );
}

// Define the props for AppContent

function AppContent({ isLoggedIn }: AppContentProps) {
  return isLoggedIn ? (
    <main>
      <Navbar />
      <Dashboard />
    </main>
  ) : (
    <Login />
  );
}
