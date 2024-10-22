"use client";

import MainNavbar from "@/components/MainNavbar";
import LandingNavbar from "@/components/LandingNavbar";
import Footer from "@/components/Footer";
import { useSession } from "next-auth/react";
import Dashboard from "@/components/Dashboard";
import { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import WhyChooseUs from "@/components/WhyChooseUs";
import About from "@/components/About";
import Features from "@/components/Features";
import { logIn, logOut } from "@/lib/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { signOut } from "next-auth/react";
import axios from "axios";
import Loader from "@/components/Loader";

export default function Home() {
  const { data: session } = useSession();
  const dispatch = useAppDispatch();
  const accessToken = session?.user?.accessToken;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (accessToken) {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_SOURCE_URL}/user`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                "ngrok-skip-browser-warning": true,
              },
            },
          );

          if (response?.data?.status) {
            dispatch(logIn(response?.data?.data));
          } else {
            if (response.status === 400) {
              dispatch(logOut());
              await signOut();
            }
          }
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, [accessToken, dispatch]);

  if (isLoading) {
    return <Loader />;
  }
  return <AppContent />;
}

function AppContent() {
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  return isLoggedIn ? (
    <main className="bg-custom-gradient h-screen ">
      <MainNavbar />
      <Dashboard />
    </main>
  ) : (
    <main>
      <div className="sticky top-0 z-[99]">
        <LandingNavbar />
      </div>
      <Hero />
      <WhyChooseUs />
      <About />
      <Features />
      <Footer />
    </main>
  );
}
