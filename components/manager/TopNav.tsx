"use client";

import { usePathname } from "next/navigation";

export function TopNav() {
  const pathname = usePathname();

  const getPageTitle = () => {
    switch (pathname) {
      case "/":
        return "Dashboard";
      case "/locations":
        return "Locations";
      case "/staffing":
        return "Staffing";
      case "/financials":
        return "Financials";
      case "/audit-logs":
        return "Audit Logs";
      default:
        return "Dashboard";
    }
  };

  const navItems = [
    { label: "Dashboard", href: "/" },
    { label: "Schedule", href: "#" },
    { label: "Swaps", href: "#" },
    { label: "Analytics", href: "#" },
  ];

  return (
    <header className="fixed top-0 left-56 right-0 h-16 border-b border-gray-200 bg-white flex items-center justify-between px-8 z-50">
      {/* Logo and Nav Links */}
      <div className="flex items-center gap-12">
        <div className="font-bold text-lg text-teal-900">SHIFTSYNC</div>
        <nav className="flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`text-sm font-medium ${pathname === item.href ? "text-gray-900" : "text-gray-600 hover:text-gray-900"}`}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>

      {/* Search Bar and Icons */}
      <div className="flex items-center gap-6">
        <div className="relative hidden lg:block">
          <input
            type="text"
            placeholder="Search shifts or staff..."
            className="w-56 px-4 py-2 rounded-lg bg-gray-100 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <svg
            className="absolute right-3 top-2.5 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Icons */}
        <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </button>

        <button className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 text-white flex items-center justify-center font-bold text-lg hover:opacity-90">
          M
        </button>
      </div>
    </header>
  );
}
