"use client";
import React from "react";
import { signOut } from "next-auth/react";
import { Toaster, toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";

const Navbar = () => {
  const router = useRouter();
  const logout = async () => {
    try {
      toast.loading("Logging out...");
      const data = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/logout`,
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
    <header className="sticky top-0 z-50 border-b border-slate-200/50 bg-white/80 backdrop-blur-md">
      <Toaster />
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="/dashboard" className="flex items-center gap-3 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 text-white font-bold">
              ✨
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              ShortsAI
            </span>
          </a>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <Link
              href="/settings"
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-slate-50 to-slate-100 px-4 py-2.5 font-semibold text-slate-900 transition-all hover:from-slate-100 hover:to-slate-200 hover:shadow-md border border-slate-200/50"
            >
              <span>⚙️</span>
              <span>Settings</span>
            </Link>
            <button
              onClick={logout}
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 px-4 py-2.5 font-semibold text-slate-900 transition-all hover:from-purple-100 hover:to-pink-100 hover:shadow-md border border-slate-200/50"
            >
              <span>Logout</span>
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4"
                viewBox="0 0 24 24"
              >
                <path d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
