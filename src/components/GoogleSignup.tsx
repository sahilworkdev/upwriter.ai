import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

export default function GoogleSignup() {
  const handleSignIn = async () => {
    await signIn("google");
  };

  return (
    <div className="text-center mt-4">
      <button
        onClick={handleSignIn}
        className="w-full px-4 py-2 font-medium text-gray-800 bg-white hover: rounded-md flex justify-center items-center gap-2 border border-gray-600 "
      >
        <FcGoogle size={28} /> <span>Sign up with Google</span>
      </button>
    </div>
  );
}
