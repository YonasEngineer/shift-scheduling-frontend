"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
// import { loginUser } from "@/lib/api";
import { API } from "@/lib/api";
import { logIn } from "@/endpoints/endpoints";
export default function LoginPage() {
  const [email, setEmail] = useState("manager@coastaleats.com");
  const [password, setPassword] = useState("••••••••");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberStation, setRememberStation] = useState(false);
  const [accessMode, setAccessMode] = useState("manager");
  const route = useRouter();
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      console.log("see the email", email);
      console.log("see the password", password);

      //   const data = await loginUser(email, password, accessMode, logIn);
      const response = await API.post(`${logIn}`, {
        email,
        password,
        // accessMode,
      });
      console.log("see the response", response);
      const res = response.data;
      // Save token to localStorage or cookies
      localStorage.setItem("token", res.access_token);
      localStorage.setItem("user", JSON.stringify(res.user));
      const role = res?.user?.role;
      if (role === "MANAGER") {
        route.push("/manager");
      } else if (role === "STAFF") {
        route.push("/staff");
      } else if (role === "ADMIN") {
        route.push("/admin");
      } else {
        route.push("/");
      }
      // Optionally redirect or show success
      //   alert(`Welcome back, ${data.user.firstName}!`);
      // alert("Welcome back");
    } catch (error: unknown) {
      console.error("Login error:", error);
      alert("Login failed. Check your credentials.");
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left Panel - Dark Navy/Teal */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white relative overflow-hidden">
        {/* Diagonal decorative element */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400 to-transparent"
            style={{
              transform: "skewY(-3deg)",
              bottom: "20%",
            }}
          ></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-12">
          {/* Logo */}
          <div>
            <div className="flex items-center gap-2 mb-20">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 16C4 9.373 9.373 4 16 4s12 5.373 12 12-5.373 12-12 12S4 22.627 4 16z"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
                <path
                  d="M8 14h4M8 16h6M8 18h4M20 14h4M20 16h4M20 18h4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              <span className="text-2xl font-bold tracking-tight">
                SHIFTSYNC
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl font-bold leading-tight mb-6 max-w-md">
              Master the flow of your floor.
            </h1>

            {/* Description */}
            <p className="text-lg text-gray-300 leading-relaxed max-w-md">
              Coastal Eats enterprise scheduling. Seamless transitions for
              flagship hospitality environments.
            </p>
          </div>

          {/* Status Badge */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 inline-flex w-fit">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-sm font-medium text-gray-400">STATUS</span>
            </div>
            <div className="text-white font-semibold ml-4">
              High Tide Operations
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-6 sm:p-8">
        <div className="w-full max-w-md">
          {/* Welcome Section */}
          <div className="mb-10">
            <h2 className="text-4xl font-bold text-slate-900 mb-2">
              Welcome Back
            </h2>
            <p className="text-gray-600">
              Sign in to Coastal Eats Manager Portal
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSignIn} className="space-y-6">
            {/* Work Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-slate-900 mb-3 tracking-wider"
              >
                WORK EMAIL
              </label>
              <div className="relative">
                <svg
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="manager@coastaleats.com"
                  className="w-full pl-12 pr-4 py-3 bg-gray-200 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-slate-900 tracking-wider"
                >
                  PASSWORD
                </label>
                <a
                  href="#"
                  className="text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                  Forgot Password?
                </a>
              </div>
              <div className="relative">
                <svg
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-3 bg-gray-200 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  {showPassword ? (
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path
                        fillRule="evenodd"
                        d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                        clipRule="evenodd"
                      />
                      <path d="M15.171 13.576l1.472 1.472a1 1 0 001.414-1.414l-14-14a1 1 0 00-1.414 1.414l1.473 1.473A10.014 10.014 0 00.458 10c1.274 4.057 5.064 7 10 7a9.958 9.958 0 004.512-1.074l1.78 1.781a1 1 0 001.414-1.414l-14-14z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Remember Checkbox */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                checked={rememberStation}
                onChange={(e) => setRememberStation(e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-200 border-gray-300 rounded focus:ring-2 focus:ring-blue-600 cursor-pointer"
              />
              <label
                htmlFor="remember"
                className="ml-3 text-sm text-gray-700 cursor-pointer"
              >
                Remember this station
              </label>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 px-4 rounded-lg transition flex items-center justify-center gap-2 mt-8"
            >
              Sign In to Schedule
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </button>
          </form>

          {/* Divider */}
          <div className="my-8 border-t border-gray-300"></div>

          {/* Access Mode Selection */}
          <div>
            <p className="text-sm font-semibold text-gray-600 mb-4 tracking-wider text-center">
              SELECT ACCESS MODE
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setAccessMode("manager")}
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition flex items-center justify-center gap-2 ${
                  accessMode === "manager"
                    ? "bg-gray-200 text-slate-900"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-150"
                }`}
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                  <path
                    fillRule="evenodd"
                    d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                    clipRule="evenodd"
                  />
                </svg>
                Manager
              </button>
              <button
                onClick={() => setAccessMode("staff")}
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition flex items-center justify-center gap-2 ${
                  accessMode === "staff"
                    ? "bg-gray-200 text-slate-900"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-150"
                }`}
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                </svg>
                Staff
              </button>
            </div>
          </div>

          {/* Footer Link */}
          <div className="mt-8 text-center text-sm text-gray-600">
            New location?{" "}
            <a href="#" className="font-medium text-slate-900 hover:underline">
              Contact Deployment
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Footer */}
      <div className="fixed bottom-0 left-0 right-0 lg:hidden bg-gray-50 border-t border-gray-200 py-4 px-6 text-center text-xs text-gray-500">
        © 2024 Coastal Eats Hospitality Group. ShiftSync v4.2.0-Maritime
      </div>
    </div>
  );
}
