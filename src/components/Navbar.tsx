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
import { IoLogOut } from "react-icons/io5";
import Image from "next/image";
import logo from '../../public/logo.svg';

const Navbar = () => {
  // const [loading, setLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { logOut, credits } = useContext(AuthContext);
  const router = useRouter();

  console.log("NAVcredits", credits);

  const { data: session } = useSession();
  const refreshToken = session?.user?.refreshToken;

  const handleLogout = async () => {
    // setLoading(true);

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
            // setLoading(false);
          }, 100);
        } else {
          console.error("Logout failed with status:", res.status);
          // setLoading(false);
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
        // setLoading(false);
      }
    } else {
      console.warn("No user found in localStorage to log out.");
      // setLoading(false);
    }
  };

  // Handle opening and closing the modal
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div>
      <nav className={`w-full md:h-[60px]  flex justify-between items-center px-6 py-4 }`}>
        {/* Logo Section */}
        <div className="flex items-center pt-4">
        <Image src={logo} alt="Logo" width={95} height={95}/>
        </div>

        {/* Hamburger Icon (visible on smaller screens) */}
        <div className="md:hidden flex items-center fixed right-2 z-20">
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
          className={`mobile-nav fixed md:static top-0 right-0 h-full w-[60%] md:w-auto bg-black p-6 md:p-0 flex flex-col md:flex-row items-start md:items-center space-y-8 md:space-y-0 md:space-x-4 
            transform transition-transform duration-300 ease-in-out ${
              isMenuOpen ? "translate-x-0" : "translate-x-full"
            } md:translate-x-0`}
        >
          <div
            className="flex items-center md:mt-0 mt-10  text-white space-x-2 cursor-pointer"
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
              toggleModal();
            }}
          >
            <FaCreditCard size={24} className="text-primary-green" />
            <span className="sm:inline-block  text-lg sm:text-xl font-medium">
              {credits} Credits
            </span>
          </div>

          {/* Logout Button */}
          <div
            className="flex items-center mt-10 text-nowrap  gap-2 font-bold cursor-pointer"
            onClick={handleLogout}
          >
           
            <IoLogOut size={30} className=" rotate-180 text-red-500" />
            {isMenuOpen && <span className="text-white font-medium">Logout</span> }
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
