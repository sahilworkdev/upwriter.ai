"use client";

import { SnackbarProvider } from "notistack";
import dynamic from "next/dynamic";
import { SessionProvider } from "next-auth/react";

const Home = dynamic(() => import("./home/home"), {
  ssr: false,
});

export default function App() {
  return (
    <SessionProvider>
      <SnackbarProvider maxSnack={3}>
        <Home />
      </SnackbarProvider>
    </SessionProvider>
  );
}
