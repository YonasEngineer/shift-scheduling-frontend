"use client";

import { Sidebar } from "./Sidebar";
import { TopNav } from "./TopNav";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1">
        <TopNav />
        <main className="pt-24 px-8 pb-8 ml-56">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Harbor Schedule
            </h1>
            <p className="text-gray-600 mt-1">
              Week of October 23 - October 29, 2023
            </p>
          </div>

          {/* Status and Action Buttons */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 text-teal-700 text-sm font-medium">
                <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
                PUBLISHED
              </div>
            </div>
            <button className="px-6 py-2 bg-teal-900 text-white rounded-lg font-medium hover:bg-teal-800 flex items-center gap-2">
              <span>▶</span>
              Publish Schedule
            </button>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-3 gap-8">
            {/* Left Column - Schedule and Details */}
            <div className="col-span-2 space-y-6">
              {/* Day Selector */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <div className="grid grid-cols-7 gap-3">
                  {[
                    "MON 23",
                    "TUE 24",
                    "WED 25",
                    "THU 26",
                    "FRI 27",
                    "SAT 28",
                    "SUN 29",
                  ].map((day, index) => (
                    <button
                      key={day}
                      className={`p-4 rounded-xl text-center font-bold transition-all ${
                        index === 2
                          ? "bg-white border-2 border-teal-500 text-teal-700"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      <div className="text-xs text-gray-600 font-semibold mb-1 uppercase">
                        {day.split(" ")[0]}
                      </div>
                      <div className="text-xl">{day.split(" ")[1]}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Shift Blocks */}
              <div className="space-y-4">
                {/* Morning Bar */}
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">
                        Morning Bar
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">4PM - 11PM</p>
                      <p className="text-xs text-gray-500 uppercase tracking-wider mt-2">
                        ▼ BARTENDER
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 space-y-3">
                    <div className="flex items-center gap-3">
                      <img
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=John"
                        alt="John"
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <p className="font-semibold text-gray-900">John D.</p>
                        <p className="text-xs text-gray-600">
                          128 Total Monthly Hrs
                        </p>
                      </div>
                    </div>
                    <div className="px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded inline-block">
                      ⚠ OVERTIME ALERT
                    </div>
                  </div>
                </div>

                {/* Main Dining */}
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">
                        Main Dining
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">5PM - 12AM</p>
                      <p className="text-xs text-gray-500 uppercase tracking-wider mt-2">
                        ≡ HEAD SERVER
                      </p>
                    </div>
                    <button className="flex items-center justify-center w-10 h-10 rounded-full bg-teal-100 text-teal-700 hover:bg-teal-200">
                      +
                    </button>
                  </div>
                  <div className="mt-4 space-y-3">
                    <div className="flex items-center gap-3">
                      <img
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
                        alt="Sarah"
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <p className="font-semibold text-gray-900">Sarah M.</p>
                        <p className="text-xs text-gray-600">
                          92 Total Monthly Hrs
                        </p>
                      </div>
                    </div>
                    <div className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded inline-block">
                      🕐 SHORT BREAK
                    </div>
                  </div>
                </div>

                {/* Patio Service */}
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      Patio Service
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">6PM - 11PM</p>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mt-2">
                      ✕ RUNNER
                    </p>
                  </div>
                  <div className="mt-4 space-y-3">
                    <div className="flex items-center gap-3">
                      <img
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Mike"
                        alt="Mike"
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <p className="font-semibold text-gray-900">Mike R.</p>
                        <p className="text-xs text-gray-600">
                          104 Total Monthly Hrs
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Live On-Duty Section */}
              <div className="bg-gray-100 rounded-lg p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">●</span>
                    <h3 className="text-lg font-bold text-gray-900">
                      Live On-Duty
                    </h3>
                  </div>
                  <a
                    href="#"
                    className="text-teal-700 font-semibold text-sm hover:underline"
                  >
                    View Full Floor Map →
                  </a>
                </div>
                <div className="flex items-center gap-8">
                  {[
                    { name: "Lisa V.", time: "Clocked: 4h 12m" },
                    { name: "David K.", time: "Clocked: 2h 45m" },
                    { name: "Elena P.", time: "Clocked: 0h 52m" },
                  ].map((staff) => (
                    <div key={staff.name} className="flex items-center gap-3">
                      <img
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${staff.name}`}
                        alt={staff.name}
                        className="w-12 h-12 rounded-full border-2 border-white"
                      />
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">
                          {staff.name}
                        </p>
                        <p className="text-xs text-gray-600">{staff.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Metrics and Summary */}
            <div className="space-y-6">
              {/* Fairness Score Card */}
              <div className="bg-gradient-to-br from-teal-900 to-teal-700 rounded-2xl p-6 text-white shadow-lg">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <span className="text-3xl">⚖</span>
                  </div>
                  <div className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-xs font-bold">
                    TOP 5%
                  </div>
                </div>
                <h3 className="text-sm font-semibold tracking-widest opacity-90 mb-2">
                  FAIRNESS SCORE
                </h3>
                <p className="text-5xl font-bold mb-4">84%</p>
                <p className="text-sm opacity-90">
                  Calculated based on holiday rotation and shift density across
                  24 staff members.
                </p>
              </div>

              {/* Weekly Summary */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-6">
                  WEEKLY SUMMARY
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🕐</span>
                      <div>
                        <p className="text-sm text-gray-600">Scheduled Hours</p>
                      </div>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">320</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">⚠</span>
                      <div>
                        <p className="text-sm text-gray-600">OT Warnings</p>
                      </div>
                    </div>
                    <p className="text-2xl font-bold text-red-600">2</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">💼</span>
                      <div>
                        <p className="text-sm text-gray-600">Labor %</p>
                      </div>
                    </div>
                    <p className="text-2xl font-bold text-teal-700">18.4%</p>
                  </div>
                </div>
              </div>

              {/* Staff Capacity */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  STAFF CAPACITY
                </h3>
                <div className="w-full bg-gray-200 rounded-full h-3 mb-3 overflow-hidden">
                  <div
                    className="bg-teal-700 h-full rounded-full"
                    style={{ width: "72%" }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600">
                  18 of 25 staff members scheduled
                </p>
              </div>

              {/* Location Map Card */}
              <div className="bg-gradient-to-br from-gray-700 to-gray-900 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                  <svg
                    className="w-full h-full"
                    viewBox="0 0 400 300"
                    fill="none"
                  >
                    <path
                      d="M50,100 Q200,50 350,100"
                      stroke="white"
                      strokeWidth="2"
                    />
                    <path
                      d="M100,150 Q200,120 300,150"
                      stroke="white"
                      strokeWidth="2"
                    />
                    <circle
                      cx="200"
                      cy="150"
                      r="30"
                      fill="rgba(255,255,255,0.1)"
                    />
                  </svg>
                </div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold">Harbor Hub District</h3>
                      <p className="text-xs opacity-80">3 Active Venues</p>
                    </div>
                    <button className="flex items-center justify-center w-10 h-10 rounded-lg bg-white bg-opacity-20 hover:bg-opacity-30">
                      +
                    </button>
                  </div>
                  <p className="text-xs opacity-75">SAFE WORK</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
