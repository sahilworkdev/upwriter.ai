"use client";

import { useSession } from "next-auth/react";
import Dashboard from "@/components/Dashboard";
import Navbar from "@/components/Navbar";
import SignUp from "@/app/signup/page";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/authContext/Context";
import Hero from "@/components/Hero";
import WhyChooseUs from "@/components/WhyChooseUs";
import About from "@/components/About";
import Features from "@/components/Features";
import LandingNavbar from "@/components/LandingNavbar";
import Footer from "@/components/Footer";

interface AppContentProps {
  // isLoggedIn: boolean;
  userData?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    credits?: number;
    accessToken?: string;
    refreshToken?: string;
  };
}

export default function Home() {
  const { data: session } = useSession();
  const { logIn } = useContext(AuthContext);

  console.log(session?.user);

  useEffect(() => {
    if (!!session?.user?.accessToken) {
      logIn(session?.user);
    }
  }, []);

  return <AppContent />;
}

function AppContent() {
  const { isLoggedIn } = useContext(AuthContext);

  return isLoggedIn ? (
    <main>
      <Navbar />
      <Dashboard />
    </main>
  ) : (
    <main>
      <LandingNavbar />
      <Hero />
      <WhyChooseUs />
      <About />
      <Features />
      <Footer />
    </main>
  );
}
// sample userData = {
//   accessToken:
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzA3ZDhlZWI2ODE1NTJjNDY1NWRjNWYiLCJlbWFpbCI6InZpbWFsQHRoZXdhc3NlcnN0b2ZmLmNvbSIsImlhdCI6MTcyODYyOTU0NSwiZXhwIjoxNzI5MjM0MzQ1fQ.xco1ifK8Ennsor38klQmpu_2gCXV2LXFW7Ft9C-in9I",
//   credits: 5,
//   email: "vimal@thewasserstoff.com",
//   firstName: "Vimal",
//   image:
//     "https://lh3.googleusercontent.com/a/ACg8ocLZ7TeFSfOwc7Pj_QPOnApWJSMmEF-bgcROL8J-eQt-VbVZjQ=s96-c",
//   lastName: "Saraswat",
//   name: "Vimal Saraswat",
//   refreshToken:
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzA3ZDhlZWI2ODE1NTJj",
// };
// //
// const { data: session } = useSession();
// const isLoggedIn = !!session?.user?.accessToken;
