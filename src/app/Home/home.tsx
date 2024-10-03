// "use client";
// import Login from "../login/page";
// import { useContext } from "react";
// import { AuthContext } from "../authContext/Context";
// import Navbar from "../components/Navbar";
// import Dashboard from "../components/Dashboard";
// export default function Home() {
//   const { isLoggedIn } = useContext(AuthContext);
//   return isLoggedIn ? (
//     <main>
//       <Navbar />
//       <Dashboard />
//     </main>
//   ) : (
//     <Login />
//   );
// }

"use client";
import Login from "../login/page";
import { useContext } from "react";
import { AuthContext } from "../authContext/Context";
import Navbar from "../components/Navbar";
import Dashboard from "../components/Dashboard";
import { SnackbarProvider } from "notistack";

// Define the shape of the context value
interface AppContentProps {
  isLoggedIn: boolean;
}

export default function Home() {
  // Get the `isLoggedIn` value from the AuthContext
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <SnackbarProvider maxSnack={3}>
      <AppContent isLoggedIn={isLoggedIn} />
    </SnackbarProvider>
  );
}

// Define the props for AppContent

function AppContent({ isLoggedIn }: AppContentProps) {
  return isLoggedIn ? (
    <main>
      <Navbar />
      <Dashboard />
    </main>
  ) : (
    <Login />
  );
}
