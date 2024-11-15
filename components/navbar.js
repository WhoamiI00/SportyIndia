'use client'
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaCog, FaUser } from "react-icons/fa";
import { motion } from "framer-motion";
import { IoHelpOutline, IoHomeSharp } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { MdFoodBank } from "react-icons/md";
import { MdEventAvailable } from "react-icons/md";

export default function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [profileInfo, setProfileInfo] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() === "") {
      router.push("/dashboard");
    } else {
      router.push(`/info/${searchQuery}`);
    }
  };

  useEffect(() => {
    const storedProfilePic = localStorage.getItem('profilePic');
    const storedLoginInfo = localStorage.getItem('loginInfo');
    
    if (storedProfilePic) {
      setProfileInfo(storedProfilePic);
    }

    if (storedLoginInfo) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loginInfo");
    localStorage.removeItem("profilePic");
    setIsLoggedIn(false);
    router.push("/home");
  };

  return (
    <header className="flex justify-between items-center px-6 py-5 shadow-lg z-50">
      <div className="flex items-center space-x-2">
        <a href="/home"><IoHomeSharp className="text-3xl md:hidden" /></a>
        <div className="text-3xl md:text-4xl font-bold hidden md:block">
          <a href="/home">
            Sporty<span className="text-blue-500">India</span>
          </a>
        </div>
      </div>

      <div className="hidden md:flex items-center flex-grow max-w-xs space-x-3 mr-[100px]">
        <form onSubmit={handleSearch} className="w-full">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
      </div>

      <div className="relative z-50">
        <button onClick={toggleDropdown} className="flex items-center space-x-2">
          <img
            src={profileInfo ? `/images/${profileInfo}.png` : '/logo.png'}
            alt="Profile"
            className="w-10 h-10 rounded-full border-2 border-white"
          />
        </button>
        {showDropdown && (
          <motion.div
            className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ul className="py-2">
                  <li className="px-4 py-2 hover:bg-gray-700 flex items-center space-x-2">
                    <MdDashboard />
                    <a href="/dashboard"><span>Dashboard</span></a>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-700 md:hidden">
                    <input
                      type="text"
                      placeholder="Search..."
                      className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-700 flex items-center space-x-2">
                    <MdFoodBank className="scale-[1.3]" />
                    <a href="/resource"><span>Diet</span></a>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-700 flex items-center space-x-2">
                    <MdEventAvailable className="scale-[1.3]" />
                    <a href="/challenges"><span>Events</span></a>
                  </li>
              {isLoggedIn && (
                <>
                  <li className="px-4 py-2 hover:bg-gray-700 flex items-center space-x-2">
                    <FaUser />
                    <a href="/user"><span>Profile</span></a>
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-700 flex items-center space-x-2"
                    onClick={handleLogout}
                  >
                    <FiLogOut className="text-[22px]" />
                    <a href="/home"><span>LogOut</span></a>
                  </li>
                </>
              )}

              {!isLoggedIn && (
                <li className="px-4 py-2 hover:bg-gray-700 flex items-center space-x-2">
                  <FiLogOut className="text-[22px]" />
                  <a href="/login"><span>LogIn</span></a>
                </li>
              )}
            </ul>
          </motion.div>
        )}
      </div>
    </header>
  );
}
