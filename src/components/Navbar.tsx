"use client";

import React, { useState } from "react";
import { FaCreditCard } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import axios from "axios";
import { AuthContext } from "../authContext/Context";
import { useContext } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import PaymentModal from "./PaymentModal";
import { signOut, useSession } from "next-auth/react";
import { BiLogOut } from "react-icons/bi";

const Navbar = () => {
  const [loading, setLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { logOut, credits } = useContext(AuthContext);
  const router = useRouter();

  console.log("NAVcredits", credits);

  const { data: session } = useSession();
  const refreshToken = session?.user?.refreshToken;

  const handleLogout = async () => {
    setLoading(true);

    // const userJson = localStorage.getItem("user");

    if (refreshToken) {
      const url = `${process.env.NEXT_PUBLIC_SOURCE_URL}/auth/logout`;

      console.log("refresh", refreshToken);

      try {
        const res = await axios.post(url, { refreshToken });
        if (res.status === 200) {
          logOut();
          await signOut(); // next-auth
          setTimeout(() => {
            router.push("/login");
            setLoading(false);
          }, 100);
        } else {
          console.error("Logout failed with status:", res.status);
          setLoading(false);
        }
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          console.error(
            "Error during logout API call:",
            error.response?.data?.message || error.message
          );
        } else {
          console.error("Unexpected error during logout:", error);
        }
        setLoading(false);
      }
    } else {
      console.warn("No user found in localStorage to log out.");
      setLoading(false);
    }
  };

  // Handle opening and closing the modal
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div>
      <nav className="w-full md:h-[60px] bg-primary-default flex justify-between items-center px-6 py-4">
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
          <h2 className="text-white font-bold text-lg">UpWriter.AI</h2>
        </div>

        {/* Hamburger Icon (visible on smaller screens) */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? (
              <HiOutlineX size={30} className="text-white" />
            ) : (
              <HiOutlineMenu size={30} className="text-white" />
            )}
          </button>
        </div>

        {/* Navigation Links */}
        <div
          className={`mobile-nav fixed md:static top-16 right-0 z-50 h-full w-[60%] md:w-auto bg-primary-default md:bg-transparent p-6 md:p-0 flex flex-col md:flex-row items-start md:items-center space-y-8 md:space-y-0 md:space-x-4 
            transform transition-transform duration-300 ease-in-out ${
              isMenuOpen ? "translate-x-0" : "translate-x-full"
            } md:translate-x-0`}
        >
          <div
            className="flex items-center text-white space-x-2 cursor-pointer"
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
              toggleModal();
            }}
          >
            <FaCreditCard size={24} />
            <span className="sm:inline-block text-lg sm:text-xl font-bold">
              {credits} Credits
            </span>
          </div>

          {/* Logout Button */}
          <div
            className="flex items-center text-nowrap text-xl text-white px-2 py-1 font-bold cursor-pointer border-2 border-white rounded-md"
            onClick={handleLogout}
          >
            {/* {loading ? "Logging out..." : "Logout"} */}
            <BiLogOut />
          </div>
        </div>
      </nav>

      {/* Payment Modal */}
      <PaymentModal
        isModalOpen={isModalOpen}
        creditBalance={credits}
        toggleModal={toggleModal}
      />
    </div>
  );
};

export default Navbar;
