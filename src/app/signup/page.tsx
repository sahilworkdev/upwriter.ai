"use client";
import GoogleSignup from "@/components/GoogleSignup";

const SignUp = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-lg md:max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        {/* <h2 className="text-2xl font-bold">Sign Up</h2> */}

        <GoogleSignup />
      </div>
    </div>
  );
};

export default SignUp;
