"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <aside className="fixed left-0 top-0 h-screen w-56 border-r border-gray-200 bg-white pt-6 px-4 overflow-y-auto">
      {/* Branding */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-lg bg-teal-900 text-white flex items-center justify-center font-bold text-lg">
            S
          </div>
          <div>
            <p className="font-bold text-sm text-gray-900">Coastal Eats</p>
            <p className="text-xs text-gray-500 uppercase tracking-wider">
              Flagship Location
            </p>
          </div>
        </div>
      </div>

      {/* Location Selector */}
      <div className="mb-8">
        <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
          Current Location
        </p>
        <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-gray-100 text-gray-900 font-medium text-sm hover:bg-gray-200">
          Harbor
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </button>
      </div>

      {/* Navigation */}
      <nav className="space-y-1 mb-8">
        <Link
          href="/manager"
          className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium text-sm ${isActive("/") && !isActive("/locations") && !isActive("/staffing") && !isActive("/financials") && !isActive("/audit-logs") ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"}`}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 4a2 2 0 012-2h4a2 2 0 012 2v3a2 2 0 01-2 2H5a2 2 0 01-2-2V4zm11 0a2 2 0 012-2h4a2 2 0 012 2v3a2 2 0 01-2 2h-4a2 2 0 01-2-2V4zM3 14a2 2 0 012-2h4a2 2 0 012 2v3a2 2 0 01-2 2H5a2 2 0 01-2-2v-3zm11 0a2 2 0 012-2h4a2 2 0 012 2v3a2 2 0 01-2 2h-4a2 2 0 01-2-2v-3z" />
          </svg>
          Overview
        </Link>

        <Link
          href="/manager/locations"
          className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium text-sm ${isActive("/manager/locations") ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"}`}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Locations
        </Link>

        <Link
          href="/manager/staffing"
          className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium text-sm ${isActive("/manager/staffing") ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"}`}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 4.354a4 4 0 110 8 4 4 0 010-8zM2 10a6 6 0 1110.933 3.464l4.817 4.817a2 2 0 01-2.828 2.828l-4.817-4.817A6.002 6.002 0 012 10zm6 4a4 4 0 100-8 4 4 0 000 8z" />
          </svg>
          Staffing
        </Link>

        {/* <Link
          href="/financials"
          className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium text-sm ${isActive("/financials") ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"}`}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 8c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3zm0 2c2.21 0 4 1.79 4 4v2h1v5h-1v2h-6v-2h-1v-5h1v-2c0-2.21 1.79-4 4-4z" />
          </svg>
          Financials
        </Link> */}

        <Link
          href="/manager/audit-logs"
          className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium text-sm ${isActive("/manager/audit-logs") ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"}`}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
          </svg>
          Audit Logs
        </Link>
      </nav>

      {/* Footer Navigation */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
        <button className="flex items-center gap-3 w-full px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-medium text-sm mb-2">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M11 18a1 1 0 11-2 0 1 1 0 012 0zm0-5a1 1 0 11-2 0 1 1 0 012 0zm0-5a1 1 0 11-2 0 1 1 0 012 0z" />
          </svg>
          Help Center
        </button>
        <button className="flex items-center gap-3 w-full px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-medium text-sm">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Logout
        </button>
      </div>
    </aside>
  );
}
