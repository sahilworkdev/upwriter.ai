"use client"

// import Home from "./Home/home";
import { SnackbarProvider } from "notistack";
import dynamic from 'next/dynamic';

const Home = dynamic(() => import("./Home/home"), {
  ssr: false,
});


export default function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <Home />
    </SnackbarProvider>

  )
}
