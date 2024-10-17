import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

export default function GoogleSignup() {
  const handleSignIn = async () => {
    await signIn("google", { callbackUrl: "/" });
  };

  return (
    <button onClick={handleSignIn} className="flex items-center gap-2">
      <FcGoogle />
      <span>SignIn with Google</span>
    </button>
  );
}
