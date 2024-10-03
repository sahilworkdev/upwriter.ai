"use client";
import Link from "next/link";
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../authContext/Context";
import { useRouter } from "next/navigation";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number | string;
  password: string;
}

const Register = () => {
  const { logIn } = useContext(AuthContext);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errors, setErrors] = useState({
    phoneNumber: "",
    password: "",
  });
  const router = useRouter();

  const validateForm = () => {
    let formIsValid = true;
    const newErrors = {
      phoneNumber: "",
      password: "",
    };

    if (formData.phoneNumber.toString().length !== 10) {
      newErrors.phoneNumber = "Phone number must be exactly 10 digits.";
      formIsValid = false;
    }

    if (formData.password.length < 8) {
      newErrors.password = "Password must be of 8 characters";
      formIsValid = false;
    }

    setErrors(newErrors);
    return formIsValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value: string | number = e.target.value;
    if (e.target.name === "phoneNumber") {
      value = value.length === 0 ? "" : Number(e.target.value);
    }
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    if (!validateForm()) return;
    const url = `${process.env.NEXT_PUBLIC_SOURCE_URL}/api/users/register`;

    try {
      const res = await axios.post(url, formData);
      console.log(res);
      if (res.status === 201) logIn(res.data);
      if (res.status === 400) {
        router.push("/login");
      }
      router.push("/");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data?.message || error.message);
      }
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-lg md:max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-1 text-gray-900 bg-gray-100 border rounded-md outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-1 text-gray-900 bg-gray-100 border rounded-md outline-none"
            />
          </div>
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
              className="w-full px-4 py-2 mt-1 text-gray-900 bg-gray-100 border rounded-md outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-1 text-gray-900 bg-gray-100 border rounded-md outline-none"
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
            )}
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
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-[#6366F1] rounded-md hover:bg-[#474BFF] border-none"
          >
            Register
          </button>
        </form>

        <div className="text-center">
          <p>
            Already have an account?{" "}
            <Link href="/login" className="text-blue-500">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
