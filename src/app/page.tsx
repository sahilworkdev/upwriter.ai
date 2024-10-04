"use client"

import Home from "./Home/home";
import { SnackbarProvider } from "notistack";


export default function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <Home />
    </SnackbarProvider>

  )
}
