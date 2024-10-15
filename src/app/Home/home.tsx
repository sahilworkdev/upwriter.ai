"use client";

import { useSession } from "next-auth/react";
import Dashboard from "@/components/Dashboard";
import Navbar from "@/components/Navbar";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/authContext/Context";
import Hero from "@/components/Hero";
import WhyChooseUs from "@/components/WhyChooseUs";
import About from "@/components/About";
import Features from "@/components/Features";
import LandingNavbar from "@/components/LandingNavbar";
import Footer from "@/components/Footer";


// interface AppContentProps {
//   // isLoggedIn: boolean;
//   userData?: {
//     name?: string | null;
//     email?: string | null;
//     image?: string | null;
//     firstName?: string | null;
//     lastName?: string | null;
//     credits?: number;
//     accessToken?: string;
//     refreshToken?: string;
//   };
// }

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
    <main   className="bg-custom-gradient h-screen">
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

