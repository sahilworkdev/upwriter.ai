"use client";
import Login from "../login/page";
import { useContext } from "react";
import { AuthContext } from "../authContext/Context";
import Navbar from "../components/Navbar";
import Dashboard from "../components/Dashboard";
// import { SnackbarProvider } from "notistack";


interface AppContentProps {
  isLoggedIn: boolean;
}

export default function Home() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
      <AppContent isLoggedIn={isLoggedIn} />
  );
}

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
