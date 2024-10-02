"use client";
import Login from "../login/page";
import { useContext } from "react";
import { AuthContext } from "../authContext/Context";
import Navbar from "../components/Navbar";
import Dashboard from "../components/Dashboard";
export default function Home() {
  const { isLoggedIn } = useContext(AuthContext);
  console.log("Home render", isLoggedIn);
  return isLoggedIn ? (
    <main>
      <Navbar />
      <Dashboard />
    </main>
  ) : (
    <Login />
  );
}
