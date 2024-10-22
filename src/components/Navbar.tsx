"use client";
import { useAppSelector } from "@/lib/hooks";
import MainNavbar from "./MainNavbar";
import LandingNavbar from "./LandingNavbar";

const Navbar = () => {
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  return isLoggedIn ? <MainNavbar /> : <LandingNavbar />;
};
export default Navbar;
