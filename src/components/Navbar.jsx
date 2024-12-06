"use client";
import React from "react";
import { signOut } from "next-auth/react";
import { Toaster, toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";
const Navbar = () => {
  const router = useRouter();
  const logout = async () => {
    try {
      toast.loading("loading");
      const data = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/logout`
      );
      signOut({ callbackUrl: `${process.env.NEXT_PUBLIC_API_URL}` });
      toast.dismiss();
      console.log(data.data);
      if (data.data.success) {
        toast.success(data.data.message);
        router.push("/login");
      } else {
        toast.error(data.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="text-gray-600 body-font">
      <Toaster />
      <div className="container mx-auto flex flex-wrap p-5 flex-row justify-between items-center">
        <a className="flex title-font font-medium items-center text-gray-900 ml-[26px] md:ml-0  md:mb-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span className="ml-3 text-xl">Dashboard</span>
        </a>

        <button
          className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base  md:mt-0"
          onClick={logout}
        >
          Logout
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-4 h-4 ml-1"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
