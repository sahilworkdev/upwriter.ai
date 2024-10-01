"use client";
import { useState } from "react";
import Link from "next/link";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useContext } from "react";
import { AuthContext } from "../authContext/Context";
import axios from "axios";
import { useRouter } from "next/navigation";

const Login = () => {
  const { logIn } = useContext(AuthContext);
  const { isLoggedIn } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    // Handle form submission, e.g., send data to backend API

    const url =
      "https://c285-2401-4900-8841-3999-354a-cbfb-b65e-665f.ngrok-free.app/api/users/login";

    try {
      const res = await axios.post(url, formData);
      if (res.status == 200) {
        logIn(res.data);
        router.push("/");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data?.message || error.message);
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-1 text-gray-900 bg-gray-100 border rounded-md outline-none "
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 mt-1 text-gray-900 bg-gray-100 border rounded-md outline-none "
              />
              <span
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
              >
                {showPassword ? (
                  <AiFillEyeInvisible className="w-5 h-5 text-gray-500" />
                ) : (
                  <AiFillEye className="w-5 h-5 text-gray-500" />
                )}
              </span>
            </div>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-[#6366F1] rounded-md hover:bg-[#474BFF] border-none"
          >
            <Link href="/">Login</Link>
          </button>
        </form>
        <div className="text-center">
          <p>
            Don't have an account?{" "}
            <Link href="/register" className="text-blue-500">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
