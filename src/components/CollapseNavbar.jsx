"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  MenuIcon,
  XIcon,
  HomeIcon,
  PlusCircleIcon,
  RefreshIcon,
  UserCircleIcon,
  VideoCameraIcon,
} from "@heroicons/react/outline";
import { usePathname } from "next/navigation";

const navItems = [
  { urlpath: "/dashboard", title: "Dashboard", icon: HomeIcon },
  { urlpath: "/new", title: "Create New", icon: PlusCircleIcon },
  { urlpath: "/ugc", title: "UGC Creator", icon: VideoCameraIcon },
  { urlpath: "/update", title: "Update", icon: RefreshIcon },
  { urlpath: "/account", title: "Account", icon: UserCircleIcon },
];

const CollapseNavbar = () => {
  const pathname = usePathname();
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen((open) => !open);
  };

  return (
    <div className="relative">
      {/* Mobile menu button */}
      <div className="md:hidden">
        <button
          type="button"
          aria-label="Toggle navigation"
          className="fixed left-3 top-20 z-40 rounded-full bg-white p-2 text-gray-700 shadow-md"
          onClick={toggleNav}
        >
          {isNavOpen ? (
            <XIcon className="h-6 w-6" />
          ) : (
            <MenuIcon className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Desktop sidebar */}
      <aside className="sticky top-20 hidden h-[calc(100vh-5rem)] w-56 shrink-0 flex-col border-r border-gray-200 bg-white/90 px-3 pb-6 pt-4 backdrop-blur-sm md:flex">
        <div className="px-2 pb-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
            Navigation
          </p>
        </div>
        <nav className="flex-1 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.urlpath;
            const Icon = item.icon;

            return (
              <Link
                key={item.urlpath}
                href={item.urlpath}
                aria-current={isActive ? "page" : undefined}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-purple-50 text-purple-700"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <Icon
                  className={`h-5 w-5 ${
                    isActive ? "text-purple-600" : "text-gray-400"
                  }`}
                />
                <span>{item.title}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Mobile slide-over */}
      <div
        className={`fixed inset-0 z-30 bg-black/40 transition-opacity md:hidden ${
          isNavOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={toggleNav}
      />
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 transform bg-white p-6 shadow-xl transition-transform duration-200 md:hidden ${
          isNavOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm font-semibold text-gray-700">Menu</p>
          <button
            type="button"
            aria-label="Close navigation"
            className="rounded-full p-1 text-gray-500 hover:bg-gray-100"
            onClick={toggleNav}
          >
            <XIcon className="h-5 w-5" />
          </button>
        </div>
        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.urlpath;
            const Icon = item.icon;

            return (
              <Link
                key={item.urlpath}
                href={item.urlpath}
                onClick={() => setIsNavOpen(false)}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium ${
                  isActive
                    ? "bg-purple-600 text-white"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Icon
                  className={`h-5 w-5 ${
                    isActive ? "text-white" : "text-gray-400"
                  }`}
                />
                <span>{item.title}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </div>
  );
};

export default CollapseNavbar;