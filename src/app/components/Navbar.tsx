"use client";

import React, { useState } from "react";
import { RiDashboardLine } from "react-icons/ri";
import { FaCreditCard } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import axios from "axios";
import { AuthContext } from "../authContext/Context";
import { useContext } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import PaymentModal from "./PaymentModal";

const Navbar = () => {
  const [loading, setLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { logOut } = useContext(AuthContext);
  const router = useRouter();

  const handleLogout = async () => {
    setLoading(true);

    const userJson = localStorage.getItem("user");
    if (userJson) {
      const user = JSON.parse(userJson);
      const url = `${process.env.NEXT_PUBLIC_SOURCE_URL}/user/logout`;
      const refreshToken = user.refreshToken;

      try {
        const res = await axios.post(url, { refreshToken });
        if (res.status === 200) {
          logOut();
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
      <nav className="w-full md:h-[60px] bg-[#6366F1] flex justify-between items-center px-6 py-4">
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
          className={`${
            isMenuOpen
              ? "flex flex-col gap-8 h-[100%] w-[60%] py-6 pl-4"
              : "hidden"
          } mobile-nav md:flex flex-col md:flex-row items-start md:items-center space-x-4 md:space-x-4 absolute md:static top-16 md:top-0 right-0 z-99 w-full md:w-auto bg-[#6366F1] md:bg-transparent transition-all duration-300 ease-in-out`}
        >
          <div
            className="flex ml-4 items-center text-white space-x-1 hover:text-gray-300 cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <RiDashboardLine size={24} />
            <span className="sm:inline-block text-lg sm:text-xl font-bold">
              Dashboard
            </span>
          </div>
          <div
            className="flex items-center text-white space-x-1 cursor-not-allowed"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <FaCreditCard size={24} />
            <span className="sm:inline-block text-lg sm:text-xl font-bold">
              90 Credits
            </span>
          </div>
          <div
            onClick={toggleModal}
            className="flex items-center px-2 py-1 font-medium text-lg bg-white text-[#6366f1]  hover:bg-[#6366f1] hover:text-white border-[#6366f1] hover:border-white border-2 cursor-pointer rounded-md"
          >
            Buy Credits
          </div>

          {/* Logout Button */}
          <div
            className="flex items-center text-nowrap text-lg text-white px-2 py-1 font-medium hover:bg-white hover:text-[#6366f1] cursor-pointer border-2 border-white rounded-md"
            onClick={handleLogout}
          >
            {loading ? "Logging out..." : "Logout"}
          </div>
        </div>
      </nav>

      {/* Payment Modal */}
      <PaymentModal isModalOpen={isModalOpen} toggleModal={toggleModal} />
    </div>
  );
};

export default Navbar;
