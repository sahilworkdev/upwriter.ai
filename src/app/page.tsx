import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./authContext/Context";

export default function Home() {
  return (
    <AuthProvider>
      <main>
        <Navbar />
        <Dashboard />
      </main>
    </AuthProvider>
  );
}
