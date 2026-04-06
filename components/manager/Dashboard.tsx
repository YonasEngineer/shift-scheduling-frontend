"use client";
import { useEffect, useState } from "react";
import { Sidebar } from "./Sidebar";
import { TopNav } from "./TopNav";
import { useSchedule } from "./context/ScheduleContext";
import { API } from "@/lib/api";
import { fromZonedTime } from "date-fns-tz";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function DashboardPage() {
  const {
    selectedSchedule,
    skills,
    // shifts,
    // loading,
    location,
    fetchSchedules,
    swapNeedingApproval,
    staff,
    fetchStaff,
    fetchSwapNeedingApproval,
    // fetchShifts,
  } = useSchedule();
  console.log("see the selectedSchedule", selectedSchedule);
  console.log("see the swapNeedingApproval", swapNeedingApproval);

  // console.log("see the location", location);
  // const timeZone1 = "America/Los_Angeles";
  // const timeZone2 = "America/New_York";
  // const utcDate = fromZonedTime(
  //   "2026-04-01T09:00", // user input
  //   "Africa/Addis_Ababa", // location timezone
  // );
  // console.log("see the exact UTC", utcDate);
  // console.log("see the string>>>>>>>>>>>>>>>>>", utcDate.toISOString());
  const [activeDay, setActiveDay] = useState<string | null>(null);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleLocation, setScheduleLocation] = useState("");
  const [selectedStaff, setSelectedStaff] = useState<string[]>([]);
  const [isShiftModalOpen, setIsShiftModalOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState("");
  // const [shiftLocation, setShiftLocation] = useState("");
  const [shiftStartDate, setShiftStartDate] = useState("");
  const [shiftEndDate, setShiftEndDate] = useState("");
  const [shiftSkill, setShiftSkill] = useState("");
  const [headCount, setHeadCount] = useState("");

  // const readableDate = new Date(shiftStartDate).toLocaleString();
  // console.log("see the shiftStartDate", shiftStartDate);
  // const getWeekDays = () => {
  //   if (!selectedSchedule) return [];

  //   const start = new Date(selectedSchedule.weekStart);
  //   const days = [];

  //   for (let i = 0; i < 7; i++) {
  //     const d = new Date(start);
  //     d.setDate(start.getDate() + i);

  //     const label = d
  //       .toLocaleDateString("en-US", {
  //         weekday: "short",
  //         day: "numeric",
  //       })
  //       .toUpperCase();

  //     days.push(label);
  //   }

  //   return days;
  // };

  // const days = getWeekDays();

  const groupedShifts = (() => {
    if (!selectedSchedule?.shifts) return {};

    const map: Record<string, any[]> = {};

    selectedSchedule.shifts.forEach((shift: any) => {
      const key = new Date(shift.startTime)
        .toLocaleDateString("en-US", {
          weekday: "short",
          day: "numeric",
        })
        .toUpperCase();

      if (!map[key]) map[key] = [];
      map[key].push(shift);
    });

    return map;
  })();

  const handleCreateSchedule = async (e: React.FormEvent) => {
    e.preventDefault();

    const manager = JSON.parse(localStorage.getItem("user") || "{}");
    const utcDate = fromZonedTime(
      scheduleDate, // user input
      location?.[0]?.timezone, // IMPORTANT
    );
    try {
      await API.post(`/schedules`, {
        weekStart: utcDate,
        locationId: location?.[0]?.id,
        createdBy: manager.sub,
      });

      await fetchSchedules(); // refresh

      setIsScheduleModalOpen(false);
      setScheduleDate("");
      console.log("[v0] Creating schedule:", {
        scheduleDate,
        scheduleLocation,
      });
      setScheduleDate("");
      setScheduleLocation("");
      setIsScheduleModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  // console.log("see the selected day", selectedDay);
  // console.log("see the selected staff", selectedStaff);
  // const manager = JSON.parse(localStorage.getItem("user") || "{}");

  // useEffect(() => {}, [manager]);
  // console.log("see the time zone", location?.[0]?.timezone);
  const utcShiftSTart = fromZonedTime(shiftStartDate, location?.[0]?.timezone);
  const utcShiftEnd = fromZonedTime(shiftEndDate, location?.[0]?.timezone);

  // console.log("see the utcShiftSTart with out toIso", utcShiftSTart);
  // console.log(
  //   "see the utcShiftSTart>>>>>>>>>>>>",
  //   utcShiftSTart?.toISOString(),
  // );
  const handleAddShift = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedSchedule) {
      console.log("No schedule selected");
      return;
    }

    try {
      const manager = JSON.parse(localStorage.getItem("user") || "{}");

      const payload = {
        scheduleId: selectedSchedule.id,
        // day: selectedDay, // optional, or you can calculate exact date
        locationId: location?.[0]?.id,
        requiredSkillId: shiftSkill, // send skill ID, not name
        assignedUserIds: selectedStaff,
        startTime: utcShiftSTart.toISOString(),
        endTime: utcShiftEnd.toISOString(),
        requiredHeadcount: Number(headCount),
        createdBy: manager.sub,
        isPremium: isPremium,
      };
      console.log("seee the  shift payload", payload);

      const response = await API.post("/shifts", payload);

      console.log("[v0] Shift added:", response.data);

      // Optionally refresh shifts
      await fetchSchedules();

      // Reset form
      // setShiftLocation("");
      setShiftStartDate("");
      setShiftEndDate("");
      setShiftSkill("");
      setHeadCount("");
      setIsShiftModalOpen(false);
    } catch (error: any) {
      console.error(
        "Error adding shift:",
        error.response || error.message || error,
      );
    }
  };

  const days = [
    "MON 23",
    "TUE 24",
    "WED 25",
    "THU 26",
    "FRI 27",
    "SAT 28",
    "SUN 29",
  ];

  useEffect(() => {
    if (!selectedSchedule?.location?.id || !shiftSkill) return;

    // const manager = JSON.parse(localStorage.getItem("user") || "{}");
    console.log("see the shiftSkill", shiftSkill);
    console.log("see the  manager.locationIds[0]", location?.[0]?.id);
    try {
      // Manually add the Zulu (Z) suffix to the local string
      // const formattedStart = `${shiftStartDate}:00.000Z`;
      // const formattedEnd = `${shiftEndDate}:00.000Z`;
      fetchStaff(
        location?.[0]?.id,
        shiftSkill,
        utcShiftSTart.toISOString(),
        // formattedStart,
        utcShiftEnd.toISOString(),

        // formattedEnd,
      );
    } catch (error) {
      console.log("see the error", error);
    }
  }, [shiftSkill, isShiftModalOpen]);

  const formatTime = (dateStr: string, timeZone: string) => {
    return new Date(dateStr).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone, // this is the key
    });
  };

  const handleApprove = async (swapId: string) => {
    const manager = JSON.parse(localStorage.getItem("user") || "{}");
    const managerId = manager.sub;

    try {
      await API.post(`/swaps/approve?swapId=${swapId}&managerId=${managerId}`);

      // refresh data after approval
      await fetchSchedules();
      await fetchSwapNeedingApproval();
    } catch (error: any) {
      console.error(
        "Error approving swap:",
        error.response || error.message || error,
      );
    }
  };

  const handleReject = async (swapId: string) => {
    try {
      const manager = JSON.parse(localStorage.getItem("user") || "{}");
      const managerId = manager.sub;
      await API.patch(`/swaps/${swapId}/reject/manager`, {
        managerId,
      });
      alert("Swap request rejected successfully");
      await fetchSchedules();
    } catch (err) {
      alert("Failed to reject the swap request.");
      console.error(err);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1">
        <TopNav />
        <main className="pt-24 px-8 pb-8 ml-56">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              {selectedSchedule?.location?.name || "Schedule"}
            </h1>
            <p className="text-gray-600 mt-1">
              Week of{" "}
              {selectedSchedule
                ? new Date(selectedSchedule.weekStart).toLocaleDateString(
                    "en-US",
                    {
                      month: "long",
                      day: "numeric",
                    },
                  ) +
                  " - " +
                  new Date(
                    new Date(selectedSchedule.weekStart).setDate(
                      new Date(selectedSchedule.weekStart).getDate() + 6,
                    ),
                  ).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                  })
                : ""}
            </p>
          </div>

          {/* Status and Action Buttons */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div
                className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                  selectedSchedule?.status === "PUBLISHED"
                    ? "bg-teal-100 text-teal-700"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-teal-500"></span>
                {selectedSchedule?.status || "DRAFT"}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsScheduleModalOpen(true)}
                className="px-6 py-2 bg-gray-200 text-gray-900 rounded-lg font-medium hover:bg-gray-300 flex items-center gap-2"
              >
                <span>+</span>
                Create Schedule
              </button>
              <button className="px-6 py-2 bg-teal-900 text-white rounded-lg font-medium hover:bg-teal-800 flex items-center gap-2">
                <span>▶</span>
                Publish Schedule
              </button>
            </div>
          </div>

          {/* Create Schedule Modal */}
          {isScheduleModalOpen && (
            <div className="fixed inset-0 bg-black/60 bg-opacity-50/20 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Create Schedule
                </h2>

                <form onSubmit={handleCreateSchedule} className="space-y-5">
                  {/* Date Field */}
                  <div>
                    <label
                      htmlFor="scheduleDate"
                      className="block text-sm font-semibold text-gray-950 mb-2"
                    >
                      Date
                    </label>
                    <input
                      type="date"
                      id="scheduleDate"
                      value={scheduleDate}
                      onChange={(e) => setScheduleDate(e.target.value)}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg 
             text-gray-900 bg-white
             focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setIsScheduleModalOpen(false)}
                      className="flex-1 px-4 py-2 bg-gray-200 text-gray-900 rounded-lg font-medium hover:bg-gray-300 transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-4 py-2 bg-teal-900 text-white rounded-lg font-medium hover:bg-teal-800 transition"
                    >
                      Create
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Add Shift Modal */}
          {isShiftModalOpen && (
            <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Add Shift
                </h2>
                <p className="text-gray-600 mb-6">Day: {selectedDay}</p>

                <form onSubmit={handleAddShift} className="space-y-5">
                  {/* Location Field */}

                  {/* Start Date/Time Field */}
                  <div>
                    <label
                      htmlFor="shiftStartDate"
                      className="block text-sm font-semibold text-gray-900 mb-2"
                    >
                      Start Date & Time
                    </label>
                    <input
                      // type="date"
                      type="datetime-local"
                      id="shiftStartDate"
                      value={shiftStartDate}
                      onChange={(e) => setShiftStartDate(e.target.value)}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg 
             text-gray-900 bg-white
             focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>

                  {/* End Date/Time Field */}
                  <div>
                    <label
                      htmlFor="shiftEndDate"
                      className="block text-sm font-semibold text-gray-900 mb-2"
                    >
                      End Date & Time
                    </label>
                    <input
                      // type="date"
                      type="datetime-local"
                      id="shiftEndDate"
                      value={shiftEndDate}
                      onChange={(e) => setShiftEndDate(e.target.value)}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg 
             text-gray-900 bg-white
             focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  {/* Head Count Field */}
                  <div>
                    <label
                      htmlFor="headCount"
                      className="block text-sm font-semibold text-gray-900 mb-2"
                    >
                      Head Count (Number of Staff)
                    </label>
                    <input
                      type="number"
                      id="headCount"
                      value={headCount}
                      onChange={(e) => setHeadCount(e.target.value)}
                      required
                      min="1"
                      max="50"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg 
             text-gray-900 bg-white
             focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  {/* Skill Field */}
                  <div>
                    <label
                      htmlFor="shiftSkill"
                      className="block text-sm font-semibold text-gray-900 mb-2"
                    >
                      Skill / Role
                    </label>
                    <select
                      id="shiftSkill"
                      value={shiftSkill}
                      onChange={(e) => setShiftSkill(e.target.value)}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg 
             text-gray-900 bg-white
             focus:outline-none focus:ring-2 focus:ring-teal-500"
                    >
                      <option value="">Select a skill</option>
                      {skills?.map((skill: any) => (
                        <option key={skill.id} value={skill.id}>
                          {skill.name.charAt(0).toUpperCase() +
                            skill.name.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>

                  {staff?.length > 0 && (
                    <div className="border border-gray-200 rounded-lg p-3 max-h-40 overflow-y-auto">
                      <p className="text-sm font-semibold mb-2 text-gray-900">
                        Available Staff
                      </p>

                      {staff.map((s: any) => (
                        <label
                          key={s.id}
                          className="flex items-center gap-2 py-1"
                        >
                          <input
                            type="checkbox"
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedStaff((prev) => [...prev, s.id]);
                              } else {
                                setSelectedStaff((prev) =>
                                  prev.filter((id) => id !== s.id),
                                );
                              }
                            }}
                          />
                          <span className="text-sm text-gray-800">
                            {s.firstName} {s.lastName}
                          </span>
                        </label>
                      ))}
                    </div>
                  )}

                  {/* Premium Shift Field */}
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="isPremium"
                      checked={isPremium}
                      onChange={(e) => setIsPremium(e.target.checked)}
                      className="h-4 w-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                    />
                    <label
                      htmlFor="isPremium"
                      className="text-sm text-gray-900"
                    >
                      Premium Shift
                    </label>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setIsShiftModalOpen(false)}
                      className="flex-1 px-4 py-2 bg-gray-200 text-gray-900 rounded-lg font-medium hover:bg-gray-300 transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-4 py-2 bg-teal-900 text-white rounded-lg font-medium hover:bg-teal-800 transition"
                    >
                      Add Shift
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Main Content Grid */}
          <div className="grid grid-cols-3 gap-8">
            {/* Left Column - Schedule and Details */}
            <div className="col-span-2 space-y-6">
              {/* Day Selector */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <div className="grid grid-cols-7 gap-3">
                  {days.map((day, index) => (
                    <div key={day} className="flex flex-col gap-2">
                      <button
                        onClick={() => setActiveDay(day)}
                        className={`p-4 rounded-xl text-center font-bold transition-all flex-1 ${
                          activeDay === day
                            ? "bg-white border-2 border-teal-500 text-teal-700"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                      >
                        <div className="text-xs text-gray-600 font-semibold mb-1 uppercase">
                          {day.split(" ")[0]}
                        </div>
                        <div className="text-xl">{day.split(" ")[1]}</div>
                      </button>
                      <button
                        onClick={() => {
                          setSelectedDay(day);
                          setIsShiftModalOpen(true);
                        }}
                        className="px-2 py-1 bg-teal-100 text-teal-700 rounded-lg text-xs font-semibold hover:bg-teal-200 transition"
                      >
                        + Shift
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {swapNeedingApproval?.length > 0 && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                  <h2 className="font-bold text-yellow-800 mb-4">
                    Pending Approvals
                  </h2>

                  {swapNeedingApproval.map((swap: any) => (
                    <div
                      key={swap.id}
                      className="border rounded-lg p-4 mb-4 bg-white shadow-sm flex flex-col justify-between"
                    >
                      {/* TOP CONTENT */}
                      <div className="space-y-2">
                        {/* Users */}
                        <p className="text-sm font-semibold text-gray-700">
                          {swap.requester.firstName} →{" "}
                          {swap.targetUser.firstName}
                        </p>

                        {/* Swap Type + Status */}
                        <div className="flex gap-2 text-xs">
                          <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded">
                            {swap.type}
                          </span>
                          <span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded">
                            {swap.status}
                          </span>
                        </div>

                        {/* Shift Info */}
                        <p className="text-xs text-gray-600">
                          {formatTime(
                            swap.shift.startTime,
                            location?.[0]?.timezone,
                          )}{" "}
                          -{" "}
                          {formatTime(
                            swap.shift.endTime,
                            location?.[0]?.timezone,
                          )}
                        </p>

                        {/* Date */}
                        <p className="text-xs text-gray-500">
                          {new Date(swap.shift.startTime).toDateString()}
                        </p>
                      </div>

                      {/* ACTION BUTTONS (BOTTOM RIGHT) */}
                      <div className="flex justify-end gap-2 mt-4">
                        <button
                          onClick={() => handleApprove(swap.id)}
                          className="px-4 py-1.5 bg-green-600 text-white rounded hover:bg-green-700"
                        >
                          Approve
                        </button>

                        <button
                          onClick={() => handleReject(swap.id)}
                          className="px-4 py-1.5 bg-red-600 text-white rounded hover:bg-red-700"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Shift Blocks */}
              {/* <div className="space-y-4">
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
              </div> */}

              <div className="space-y-4">
                {selectedSchedule?.shifts?.map((shift: any) => {
                  const assignment =
                    shift.shiftAssignments?.find(
                      (a: any) => a.status === "ASSIGNED",
                    ) || shift.shiftAssignments?.[0];
                  const staff = assignment?.user;

                  return (
                    <div
                      key={shift.id}
                      className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
                    >
                      {/* Header */}
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">
                            {shift.requiredSkill?.name || "Shift"}
                          </h3>

                          <p className="text-sm text-gray-600 mt-1">
                            {formatTime(
                              shift.startTime,
                              location?.[0]?.timezone,
                            )}{" "}
                            -{" "}
                            {formatTime(shift.endTime, location?.[0]?.timezone)}
                          </p>

                          <p className="text-xs text-gray-500 uppercase tracking-wider mt-2">
                            {shift.requiredSkill?.name?.toUpperCase()}
                          </p>
                        </div>

                        {shift.isPremium && (
                          <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-700 rounded">
                            PREMIUM
                          </span>
                        )}
                      </div>

                      {/* Staff */}
                      {staff && (
                        <div className="mt-4 space-y-3">
                          <div className="flex items-center gap-3">
                            <img
                              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${staff.firstName}`}
                              alt={staff.firstName}
                              className="w-10 h-10 rounded-full"
                            />

                            <div>
                              <p className="font-semibold text-gray-900">
                                {staff.firstName} {staff.lastName}
                              </p>
                              <p className="text-xs text-gray-600">
                                {shift.requiredHeadcount || 1} Required Staff
                              </p>
                            </div>
                          </div>

                          {/* Status badge */}
                          <div className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded inline-block">
                            {assignment?.status || "UNASSIGNED"}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              {/* Live On-Duty Section */}
              {/* <div className="bg-gray-100 rounded-lg p-6 border border-gray-200">
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
              </div> */}
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
