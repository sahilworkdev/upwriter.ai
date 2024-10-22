"use client";
import React from "react";
import { useState } from "react";
// import Logo from "../../public/images/buxa_logo.svg";
import Logo from "../../public/images/Buxa logo 2.svg";
import Image from "next/image";
import Link from "next/link";
import Hamburger from "../../public/images/Hamburger.svg";
import GoogleSignup from "./GoogleSignup";
const LandingNavbar = () => {
  const [mobileNavigation, setMobileNavigation] = useState(false);

  return (
    <header className="container-wrapper backdrop-blur-3xl md:static z-20 h-[80px] items-center sm:h-[94px]">
      <div className="content-container bg-blue-80 flex justify-between py-4 md:py-6 items-center">
        {/* hamburger menu button */}
        <div
          className="md:hidden  "
          onClick={() => setMobileNavigation(!mobileNavigation)}
        >
          <Image src={Hamburger} width={40} height={40} alt="" />
        </div>
        <div className=" flex items-center text-2xl md:text-2xl w-24 sm:w-40 font-bold text-green-500">
          <Link className="" href="/">
            <Image src={Logo} width={130} height={130} alt="logo" />
          </Link>
        </div>
        <div className="hidden md:flex">
          <nav className="space-x-10 m-auto md:text-lg lg:text-xl">
            <Link className="hover:text-green-500" href="/resources">
              Resources
            </Link>
            <Link className="hover:text-green-500" href="/pricing">
              Pricing
            </Link>
            <Link className="hover:text-green-500" href="/company">
              Company
            </Link>
            <Link className="hover:text-green-500" href="/support">
              Support
            </Link>
          </nav>
        </div>
        <div>
          <div className="bg-white rounded-full text-black hover:scale-90 text-xs sm:text-sm md:text-lg font-semibold p-1 sm:px-2 sm:py-1 md:px-4 md:py-2 align-middle">
            <GoogleSignup />
          </div>
        </div>
      </div>
      <div
        className={` content-container md:hidden ${
          mobileNavigation ? "block " : "hidden"
        }`}
      >
        <nav className="rounded-xl text-lg bg-black ">
          <ul className="flex flex-col justify-center items-center gap-10 py-5">
            <li>
              <Link href="/resources">Resources</Link>
            </li>
            <li>
              <Link href="/pricing">Pricing</Link>
            </li>
            <li>
              <Link href="/company">Company</Link>
            </li>
            <li>
              <Link href="/support">Support</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default LandingNavbar;
