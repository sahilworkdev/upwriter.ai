// "use client";

// import React, { useState } from "react";
// import { FaRegUser } from "react-icons/fa";
// import { RiDashboardLine } from "react-icons/ri";
// import { useRouter } from "next/navigation";
// import axios from "axios";
// import { AuthContext } from "../authContext/Context";
// import { useContext } from "react";

// const Navbar = () => {
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const { logOut } = useContext(AuthContext);
//   const router = useRouter();

//   const handleLogout = async () => {
//     const userJson = localStorage.getItem("user");
//     if (userJson) {
//       const user = JSON.parse(userJson);
//       const url = `${process.env.NEXT_PUBLIC_SOURCE_URL}/api/users/logout`;
//       const refreshToken = user.refreshToken;
//       try {
//         const res = await axios.post(url, { refreshToken });
//         if (res.status === 200) logOut();
//       } catch (error: unknown) {
//         if (axios.isAxiosError(error)) {
//           console.log(error.response?.data?.message || error.message);
//         }
//       }
//     }
//     router.push("/login");
//   };

//   const toggleDropdown = () => {
//     setDropdownOpen(!dropdownOpen);
//   };

//   return (
//     <div>
//       <nav className="w-full md:h-[60px] bg-[#6366F1] flex justify-between items-center px-6 py-4">
//         {/* Logo Section */}
//         <div className="flex items-center space-x-3">
//           <h2 className="text-white font-bold">UpWriter.AI</h2>
//         </div>

//         {/* Navigation Links */}
//         <div className="flex items-center space-x-4">
//           {/* Dashboard Button */}
//           <div
//             className="flex items-center text-white space-x-2 hover:text-gray-300 cursor-pointer"
//             onClick={() => router.push("/dashboard")}
//           >
//             <RiDashboardLine size={24} />
//             <span className="hidden sm:inline-block text-lg sm:text-xl font-bold">
//               Dashboard
//             </span>
//           </div>

//           {/* Account Button */}
//           <div className="relative">
//             <div
//               className="flex items-center text-white space-x-2 hover:text-gray-300 cursor-pointer"
//               onClick={toggleDropdown}
//             >
//               <FaRegUser size={24} />
//               {/* Hide text on smaller screens */}
//               <span className="hidden sm:inline-block text-lg sm:text-xl font-bold">
//                 Account
//               </span>
//             </div>

//             {/* Dropdown Menu */}
//             {dropdownOpen && (
//               <div
//                 className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-md z-20"
//                 style={{ top: "100%", marginTop: "8px" }} // Positioned below the button
//               >
//                 <ul className="text-gray-700">
//                   <li
//                     className="px-2 py-2 text-center hover:bg-gray-100 cursor-pointer"
//                     onClick={handleLogout}
//                   >
//                     Logout
//                   </li>
//                 </ul>
//               </div>
//             )}
//           </div>
//         </div>
//       </nav>
//     </div>
//   );
// };

// export default Navbar;


"use client";

import React, { useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { RiDashboardLine } from "react-icons/ri";
import { useRouter } from "next/navigation";
import axios from "axios";
import { AuthContext } from "../authContext/Context";
import { useContext } from "react";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false); // New loading state
  const { logOut } = useContext(AuthContext);
  const router = useRouter();  
  
  const handleLogout = async () => {
    setLoading(true); // Set loading to true when logout starts

    const userJson = localStorage.getItem("user");
    if (userJson) {
      const user = JSON.parse(userJson);
      const url = `${process.env.NEXT_PUBLIC_SOURCE_URL}/api/users/logout`;
      const refreshToken = user.refreshToken;
  
      try {
        const res = await axios.post(url, { refreshToken });
        if (res.status === 200) {
          logOut(); 
          setTimeout(() => {
            router.push("/login");
            setLoading(false); // Reset loading after successful logout
          }, 100);
        } else {
          console.error("Logout failed with status:", res.status);
          setLoading(false); // Reset loading if logout fails
        }
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          console.error("Error during logout API call:", error.response?.data?.message || error.message);
        } else {
          console.error("Unexpected error during logout:", error);
        }
        setLoading(false); // Reset loading in case of error
      }
    } else {
      console.warn("No user found in localStorage to log out.");
      setLoading(false); // Reset loading if no user is found
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div>
      <nav className="w-full md:h-[60px] bg-[#6366F1] flex justify-between items-center px-6 py-4">
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
          <h2 className="text-white font-bold">UpWriter.AI</h2>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center space-x-4">
          {/* Dashboard Button */}
          <div
            className="flex items-center text-white space-x-2 hover:text-gray-300 cursor-pointer"
            onClick={() => router.push("/dashboard")}
          >
            <RiDashboardLine size={24} />
            <span className="hidden sm:inline-block text-lg sm:text-xl font-bold">
              Dashboard
            </span>
          </div>

          {/* Account Button */}
          <div className="relative">
            <div
              className="flex items-center text-white space-x-2 hover:text-gray-300 cursor-pointer"
              onClick={toggleDropdown}
            >
              <FaRegUser size={24} />
              <span className="hidden sm:inline-block text-lg sm:text-xl font-bold">
                Account
              </span>
            </div>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-md z-20"
                style={{ top: "100%", marginTop: "8px" }}
              >
                <ul className="text-gray-700">
                  <li
                    className="px-2 py-2 text-center hover:bg-gray-100 cursor-pointer"
                    onClick={handleLogout}
                  >
                    {loading ? "Logging out..." : "Logout"}
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;