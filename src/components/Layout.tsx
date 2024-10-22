import React from "react";
import LandingNavbar from "./LandingNavbar";
import Footer from "./Footer";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <LandingNavbar />
      {children}
      <Footer />
    </main>
  );
};

export default Layout;
