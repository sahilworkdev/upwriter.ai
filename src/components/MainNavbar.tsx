"use client";
import React, { useState } from "react";
import { FaCreditCard } from "react-icons/fa6";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import PaymentModal from "./PaymentModal";
import { signOut } from "next-auth/react";
import { IoLogOut } from "react-icons/io5";
import Image from "next/image";
import logo from "../../public/logo.svg";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { logOut } from "@/lib/user/userSlice";

const MainNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();
  const handleLogout = async () => {
    dispatch(logOut());
    await signOut();
  };

  // Handle opening and closing the modal
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div>
      <nav
        className={`w-full md:h-[60px]  flex justify-between items-center px-4 py-4 }`}
      >
        {/* Logo Section */}
        <div className="flex items-center pt-4">
          <Image src={logo} alt="Logo" width={95} height={95} />
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
              // setIsMenuOpen(!isMenuOpen);
              // toggleModal();
            }}
          >
            <FaCreditCard size={24} className="text-primary-green" />
            <span className="sm:inline-block  text-lg sm:text-xl font-medium">
              {user?.credits} Credits
            </span>
          </div>

          {/* Logout Button */}
          <div
            className="flex items-center mt-10 text-nowrap  gap-2 font-bold cursor-pointer"
            onClick={handleLogout}
          >
            <IoLogOut size={30} className=" rotate-180 text-red-500" />
            {isMenuOpen && (
              <span className="text-white font-medium">Logout</span>
            )}
          </div>
        </div>
      </nav>

      {/* Payment Modal */}
      <PaymentModal
        isModalOpen={isModalOpen}
        creditBalance={user?.credits}
        toggleModal={toggleModal}
      />
    </div>
  );
};

export default MainNavbar;
