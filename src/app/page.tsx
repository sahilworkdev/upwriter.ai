import Home from "./Home/home";
import { AuthProvider } from "./authContext/Context";

export default function App() {
  return (
    <AuthProvider>
      <Home />
    </AuthProvider>
  );
}
