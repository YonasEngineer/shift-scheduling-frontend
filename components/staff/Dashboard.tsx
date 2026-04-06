"use client";

import { useEffect, useState } from "react";
import { useShifts } from "./context/ShiftContext";
import { API } from "@/lib/api";

/* eslint-disable @typescript-eslint/no-explicit-any */

export default function StaffDashboard() {
  const { shifts, fetchStaff, staff, swamp, refetchSwamp } = useShifts();
  const [selectedStaffId, setSelectedStaffId] = useState("");
  console.log("see the shifts", shifts);
  // console.log("see the  staff fetched", staff);
  console.log("see the swamp request", swamp);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [modalData, setModalData] = useState({
    shiftId: "",
    shiftDate: "",
    shiftTime: "",
    shiftRole: "",
  });

  // socket.ts (create once)

  const openSwapModal = (
    shiftId: string,
    date: string,
    time: string,
    role: string,
  ) => {
    setModalData({
      shiftId,
      shiftDate: date,
      shiftTime: time,
      shiftRole: role,
    });
    setActiveModal("swap");
  };

  // console.log("see the modalData", modalData);

  const openDropModal = (shiftId: string, date: string, time: string) => {
    setModalData({ shiftId, shiftDate: date, shiftTime: time, shiftRole: "" });
    setActiveModal("drop");
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const claimShift = (shiftName: string) => {
    alert(`Claimed shift: ${shiftName}`);
  };

  const reviewSwap = () => {
    alert("Reviewing swap request...");
  };

  const dismissAlert = () => {
    alert("Alert dismissed");
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatShiftTime = (start: string, end: string) => {
    const s = new Date(start);
    const e = new Date(end);

    return `${s.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })} - ${e.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  };
  useEffect(() => {
    if (!modalData.shiftId || activeModal !== "swap") return;

    // const user = JSON.parse(localStorage.getItem("user") || "{}");

    //  1. find shift from existing shifts list
    const selectedShift = shifts?.find(
      (item: any) => item.shift?.id === modalData.shiftId,
    )?.shift;

    if (!selectedShift) return;

    //  2. extract required values from shift
    const startISO = selectedShift.startTime;
    const endISO = selectedShift.endTime;

    const skillId = selectedShift.requiredSkill?.id;
    // console.log("see the selectedShift", selectedShift);
    try {
      fetchStaff(selectedShift?.location?.id, skillId, startISO, endISO);
    } catch (error) {
      console.log(error);
    }
  }, [modalData.shiftId, activeModal, shifts]);

  const handlSwamp = async () => {
    try {
      if (!modalData.shiftId) return;

      if (!selectedStaffId) {
        alert("Please select a staff member");
        return;
      }

      const user = JSON.parse(localStorage.getItem("user") || "{}");

      const payload = {
        shiftId: modalData.shiftId,
        type: "SWAP",
        targetUserId: selectedStaffId,
      };

      const res = await API.post(`/swaps/${user.sub}`, payload);

      console.log("swap created:", res);

      // reset state
      setSelectedStaffId("");
      closeModal();

      // optional: refresh swaps / shifts
      // fetchShifts();
    } catch (error: any) {
      console.error(error);
      alert(error?.message || "Failed to create swap request");
    }
  };

  const handleAccept = async (swapId: string) => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");

      // We send the request to the backend to process the swap
      // The backend should handle the transaction:
      // 1. Update SwapRequest status to ACCEPTED
      // 2. Reassign the ShiftAssignment from requester to target
      const res = await API.patch(`/swaps/${swapId}/accept`, {
        userId: user.sub, // The current user accepting the swap
      });

      console.log("Swap accepted successfully:", res);
      alert("Shift swap accepted! Your schedule has been updated.");

      // Refresh the data to reflect changes in the UI
      refetchSwamp();
      // If you have a fetchShifts function in your context, call it here too
    } catch (error: any) {
      console.error("Error accepting swap:", error);
      alert(
        error?.response?.data?.message || "Failed to accept the swap request.",
      );
    }
  };

  const handleReject = async (swapId: string) => {
    try {
      await API.patch(`/swaps/${swapId}/reject/staff`);
      alert("Swap request rejected successfully");
      await refetchSwamp();
    } catch (err) {
      console.error(err);
      alert("Failed to reject the swap request.");
    }
  };

  const formatTime = (dateStr: string, timeZone: string) => {
    return new Date(dateStr).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone, // this is the key
    });
  };
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Left Sidebar */}
      <aside className="w-56 bg-white p-5 border-r border-gray-200 overflow-y-auto">
        <div className="text-lg font-bold mb-10">SHIFTSYNC</div>

        <div className="mb-8">
          <div className="text-sm font-semibold text-gray-800 mb-1">
            Coastal Eats
          </div>
          <div className="text-xs text-gray-600">Flagship Location</div>
        </div>

        <nav className="mb-8">
          <ul className="space-y-3">
            <li>
              <a
                href="#overview"
                className="text-gray-600 text-sm hover:text-blue-900 transition-colors"
              >
                Overview
              </a>
            </li>
            <li>
              <a
                href="#locations"
                className="text-gray-600 text-sm hover:text-blue-900 transition-colors"
              >
                Locations
              </a>
            </li>
            <li>
              <a
                href="#staffing"
                className="text-gray-600 text-sm hover:text-blue-900 transition-colors"
              >
                Staffing
              </a>
            </li>
            <li>
              <a
                href="#financials"
                className="text-gray-600 text-sm hover:text-blue-900 transition-colors"
              >
                Financials
              </a>
            </li>
            <li>
              <a
                href="#audit"
                className="text-gray-600 text-sm hover:text-blue-900 transition-colors"
              >
                Audit Logs
              </a>
            </li>
          </ul>
        </nav>

        <div className="border-t border-gray-200 pt-5">
          <ul className="space-y-3">
            <li>
              <a
                href="#help"
                className="text-gray-600 text-sm hover:text-blue-900 transition-colors"
              >
                Help Center
              </a>
            </li>
            <li>
              <a
                href="#logout"
                className="text-gray-600 text-sm hover:text-blue-900 transition-colors"
              >
                Logout
              </a>
            </li>
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-10 border-b border-gray-200 pb-5">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Swaps & Coverage
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              Manage your schedule and coordinate with the team.
            </p>
          </div>
          <nav className="flex gap-10">
            <a
              href="#dashboard"
              className="text-gray-600 text-sm font-medium pb-2 border-b-2 border-transparent hover:text-blue-900 transition-colors"
            >
              Dashboard
            </a>
            <a
              href="#schedule"
              className="text-gray-600 text-sm font-medium pb-2 border-b-2 border-transparent hover:text-blue-900 transition-colors"
            >
              Schedule
            </a>
            <a
              href="#swaps"
              className="text-blue-900 text-sm font-semibold pb-2 border-b-2 border-blue-900"
            >
              Swaps
            </a>
            <a
              href="#analytics"
              className="text-gray-600 text-sm font-medium pb-2 border-b-2 border-transparent hover:text-blue-900 transition-colors"
            >
              Analytics
            </a>
          </nav>
        </div>

        {/* Weekly Commitment Card */}
        <div className="bg-blue-100 p-5 rounded-lg mb-8 flex justify-between items-center">
          <div>
            <p className="text-xs text-gray-600 font-medium mb-1">
              WEEKLY COMMITMENT
            </p>
            <h3 className="text-2xl font-bold text-gray-900">32/40 Hours</h3>
          </div>
          <div className="text-right">
            <p className="text-sm text-blue-900">8h Remaining</p>
            <div className="w-48 h-1.5 bg-blue-200 rounded mt-2 overflow-hidden">
              <div className="w-4/5 h-full bg-blue-900 rounded"></div>
            </div>
          </div>
        </div>

        {/* My Upcoming Shifts */}
        <section className="mb-10">
          <h3 className="text-lg font-semibold text-gray-900 mb-5">
            📅 My Upcoming Shifts
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Shift Card 1 */}

            {shifts?.map((item: any) => {
              const shift = item.shift;
              const swapRequests = shift.swapRequests || [];

              // 1. Final completed swap
              const isCompleted = swapRequests.some(
                (req: any) =>
                  req.status === "ACCEPTED" && req.managerStatus === "APPROVED",
              );

              // 2. Ongoing swap (accepted but waiting manager)
              const isInProgress = swapRequests.some(
                (req: any) =>
                  req.status === "ACCEPTED" && req.managerStatus === "PENDING",
              );

              // 3. Max attempts
              const isMaxReached = swapRequests.length >= 3;

              // FINAL CONDITION
              const isSwapLocked = isCompleted || isInProgress || isMaxReached;
              return (
                <div
                  key={item.id}
                  className="bg-white border border-gray-200 rounded-lg p-5"
                >
                  <div className="flex justify-between items-start mb-4">
                    <span className="inline-block bg-blue-100 text-blue-900 px-2 py-1 rounded text-xs font-semibold">
                      {shift?.requiredSkill?.name}
                    </span>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 mb-1">
                      {new Date(shift.startTime).toLocaleDateString("en-US", {
                        weekday: "long",
                      })}
                      {"  " + shift?.location?.name}
                    </p>

                    {/* <p className="text-sm text-gray-600 mb-4">
                      {formatDate(shift.startTime)}
                    </p> */}

                    {/* <p className="text-lg font-bold text-gray-900 mb-4">
                      {formatTime(shift.startTime, shift.endTime)}
                    </p> */}

                    <p className="text-lg font-bold text-gray-900 mb-4">
                      {formatTime(shift.startTime, shift.location?.timezone)} -{" "}
                      {formatTime(shift.endTime, shift.location?.timezone)}
                    </p>

                    {/* Status badge */}
                    <div className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded inline-block">
                      {shifts?.[0]?.status || "UNASSIGNED"}
                    </div>
                  </div>

                  {!isSwapLocked && (
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          openSwapModal(
                            shift.id,
                            formatDate(shift.startTime),
                            formatShiftTime(shift.startTime, shift.endTime),
                            shift?.requiredSkill?.name,
                          )
                        }
                        className="flex-1 py-2.5 px-4 bg-gray-200 text-gray-900 rounded text-sm font-semibold hover:bg-gray-300 transition-colors"
                      >
                        Request Swap
                      </button>

                      <button
                        onClick={() =>
                          openDropModal(
                            shift.id,
                            formatDate(shift.startTime),
                            formatShiftTime(shift.startTime, shift.endTime),
                          )
                        }
                        className="flex-1 py-2.5 px-4 bg-gray-200 text-gray-900 rounded text-sm font-semibold hover:bg-gray-300 transition-colors"
                      >
                        Drop
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Open Shifts Board */}
        {/* <section className="mb-10">
          <h3 className="text-lg font-semibold text-gray-900 mb-5">
            🎯 Open Shifts Board
            <span className="ml-3 inline-block bg-teal-900 text-white px-2 py-1 rounded text-xs font-semibold">
              FILTERED BY SKILL: SERVER
            </span>
          </h3>
          <div className="space-y-3">
            <div className="bg-white border border-gray-200 rounded-lg p-5 flex justify-between items-center">
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold mb-2">
                  SUN 27
                </p>
                <h4 className="text-base font-semibold text-gray-900">
                  Closing Server Shift
                </h4>
                <p className="text-sm text-gray-600">
                  05:00 PM - 12:00 AM (7 hrs)
                </p>
              </div>
              <button
                onClick={() => claimShift("Closing Server Shift")}
                className="py-2.5 px-5 bg-teal-900 text-white rounded text-sm font-semibold hover:bg-blue-800 transition-colors"
              >
                Claim Shift
              </button>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-5 flex justify-between items-center">
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold mb-2">
                  MON 28
                </p>
                <h4 className="text-base font-semibold text-gray-900">
                  Lunch Server Shift
                </h4>
                <p className="text-sm text-gray-600">
                  11:00 AM - 04:00 PM (5 hrs)
                </p>
              </div>
              <button
                onClick={() => claimShift("Lunch Server Shift")}
                className="py-2.5 px-5 bg-teal-900 text-white rounded text-sm font-semibold hover:bg-blue-800 transition-colors"
              >
                Claim Shift
              </button>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-5 flex justify-between items-center">
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold mb-2">
                  TUE 29
                </p>
                <h4 className="text-base font-semibold text-gray-900">
                  Double-Shift Coverage
                </h4>
                <p className="text-sm text-gray-600">
                  Exceeds Weekly Max (40h)
                </p>
              </div>
              <button
                disabled
                className="py-2.5 px-5 bg-teal-900 text-white rounded text-sm font-semibold opacity-50 cursor-not-allowed"
              >
                Claim Shift
              </button>
            </div>
          </div>
        </section> */}

        {/* Open Shifts Board (SWAP REQUESTS) */}
        <section className="mb-10">
          <h3 className="text-lg font-semibold text-gray-900 mb-5">
            🔁 Swap Requests Board
          </h3>

          <div className="space-y-3">
            {swamp?.length === 0 && (
              <p className="text-sm text-gray-500">
                No swap requests available
              </p>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {swamp?.map((req: any) => {
                const shift = req.shift;
                const requester = req.requester;
                const target = req.targetUser;
                console.log("see the   swap shift", req);

                return (
                  <div
                    key={req.id}
                    className="bg-white border border-gray-200 rounded-lg p-5 flex flex-col justify-between"
                  >
                    {/* TOP CONTENT */}
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-semibold mb-2">
                        {new Date(shift.startTime).toLocaleDateString("en-US", {
                          weekday: "short",
                          day: "2-digit",
                        })}
                      </p>

                      <h4 className="text-base font-semibold text-gray-900">
                        {shift.requiredSkill?.name} Shift Swap
                      </h4>

                      <p className="text-sm text-gray-600 mt-1">
                        {new Date(shift.startTime).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}{" "}
                        -{" "}
                        {new Date(shift.endTime).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>

                      <p className="text-xs text-gray-500 mt-3">
                        Requested by:{" "}
                        <span className="font-semibold text-gray-700">
                          {requester?.firstName} {requester?.lastName}
                        </span>
                      </p>

                      <p className="text-xs text-gray-500">
                        Target:{" "}
                        <span className="font-semibold text-gray-700">
                          {target?.firstName} {target?.lastName}
                        </span>
                      </p>
                      <div className="flex justify-between gap-3">
                        <p className="text-xs text-gray-500 mt-2">
                          Your Status:{" "}
                          <span
                            className={`font-semibold ${
                              req.status === "PENDING"
                                ? "text-yellow-600"
                                : req.status === "ACCEPTED"
                                  ? "text-green-600"
                                  : "text-red-600"
                            }`}
                          >
                            {req.status}
                          </span>
                        </p>
                        <p className="text-xs text-gray-500 mt-2">
                          Manager Status:{" "}
                          <span
                            className={`font-semibold ${
                              req.managerStatus === "PENDING"
                                ? "text-yellow-600"
                                : req.managerStatus === "APPROVED"
                                  ? "text-green-600"
                                  : "text-red-600"
                            }`}
                          >
                            {req.managerStatus}
                          </span>
                        </p>
                      </div>
                    </div>

                    {/* BOTTOM ACTIONS */}

                    {req.status === "PENDING" && (
                      <div className="mt-5 pt-4 border-t border-gray-200 flex gap-2">
                        <button
                          onClick={() => handleAccept(req.id)}
                          className="flex-1 py-2 bg-teal-900 text-white rounded text-sm font-semibold hover:bg-green-700 transition-colors"
                        >
                          Accept
                        </button>

                        <button
                          onClick={() => handleReject(req.id)}
                          className="flex-1 py-2 bg-red-400 text-white rounded text-sm font-semibold hover:bg-red-700 transition-colors"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      {/* Right Sidebar */}
      <aside className="w-72 bg-white p-5 border-l border-gray-200 overflow-y-auto">
        <h3 className="text-base font-semibold text-gray-900 mb-5 flex items-center gap-2">
          ⏱️ Pending Requests
        </h3>

        <div className="space-y-4 mb-5">
          {/* Request Card 1 */}
          <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-blue-900">
            <p className="text-xs text-gray-600 font-semibold mb-1">
              Swap Request • Oct 25
            </p>
            <h4 className="text-sm font-semibold text-gray-900 mb-2">
              Friday Evening Shift
            </h4>
            <p className="text-xs text-gray-600 mb-2">Pending Manager</p>
            <p className="text-xs text-gray-600 italic">
              &quot;Requested a swap with Marcus for his morning shift due to
              family event&quot;
            </p>
          </div>

          {/* Request Card 2 */}
          <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-blue-900">
            <p className="text-xs text-gray-600 font-semibold mb-1">
              Drop Request • Oct 30
            </p>
            <h4 className="text-sm font-semibold text-gray-900 mb-2">
              Wednesday Lunch
            </h4>
            <p className="text-xs text-gray-600">Pending Staff B</p>
          </div>

          {/* Request Card 3 */}
          <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-blue-900">
            <p className="text-xs text-gray-600 font-semibold mb-1">
              Swap Approved • Oct 21
            </p>
            <h4 className="text-sm font-semibold text-gray-900 mb-2">
              Sunday Brunch
            </h4>
            <p className="text-xs text-gray-600">Approved</p>
          </div>
        </div>

        {/* Staff Member Card */}
        <div className="bg-gradient-to-br  from-teal-900 to-teal-700 text-white p-5 rounded-lg mb-5">
          <div className="flex gap-3 mb-4">
            <div className="w-12 h-12  bg-gradient-to-br from-teal-900 to-teal-700 rounded flex items-center justify-center text-xl font-bold">
              AR
            </div>
            <div>
              <h3 className="text-base font-semibold">Alex Rivera</h3>
              <p className="text-xs opacity-90">Senior Floor Staff</p>
            </div>
          </div>
          <p className="text-sm font-semibold mb-3">Verified Skills</p>
          <div className="flex gap-2 flex-wrap">
            <span className="bg-white bg-opacity-20 px-2 py-1 rounded text-xs font-medium">
              Server
            </span>
            <span className="bg-white bg-opacity-20 px-2 py-1 rounded text-xs font-medium">
              Bartender
            </span>
            <span className="bg-white bg-opacity-20 px-2 py-1 rounded text-xs font-medium">
              Closing Lead
            </span>
          </div>
        </div>

        {/* Alerts Section */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
            🔔 ALERTS
          </h3>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-3">
            <div className="flex gap-2 mb-2">
              <div className="text-xl">⚠️</div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-1">
                New Swap Request
              </h4>
              <p className="text-xs text-gray-600 mb-3">
                Jessica K. wants to swap your Friday 4PM shift for her Saturday
                10AM shift.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={reviewSwap}
                  className="py-1.5 px-3 bg-blue-900 text-white rounded text-xs font-semibold hover:bg-blue-800 transition-colors"
                >
                  Review
                </button>
                <button
                  onClick={dismissAlert}
                  className="py-1.5 px-3 bg-white text-gray-600 border border-gray-300 rounded text-xs font-semibold hover:bg-gray-50 transition-colors"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Swap Request Modal */}
      {activeModal === "swap" && (
        <div className="fixed inset-0 bg-black/60 bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 max-w-md w-11/12 shadow-lg">
            <div className="mb-5">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Request Shift Swap
              </h2>
              <p className="text-sm text-gray-600">
                Select who you&apos;d like to swap with
              </p>
            </div>
            <div className="mb-5">
              <div className="bg-gray-700 p-3 rounded text-sm mb-3">
                <p className="mb-1">
                  <strong>Your Shift:</strong> {modalData.shiftDate}
                </p>
                <p className="mb-1">
                  <strong>Time:</strong> {modalData.shiftTime}
                </p>
                <p>
                  <strong>Role:</strong> {modalData.shiftRole}
                </p>
              </div>

              {/* <div className="mb-4">
                <label
                  htmlFor="swapPartner"
                  className="block text-sm font-semibold text-gray-900 mb-2"
                >
                  Select Team Member to Swap With
                </label>
                <select
                  id="swapPartner"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg 
             text-gray-900 bg-white
             focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="">-- Choose a team member --</option>
                  <option value="jessica">Jessica K. (Server)</option>
                  <option value="marcus">Marcus J. (Bartender)</option>
                  <option value="sarah">Sarah M. (Server)</option>
                  <option value="tom">Tom R. (Server)</option>
                </select>
              </div> */}

              <div className="mb-4">
                <label
                  htmlFor="swapPartner"
                  className="block text-sm font-semibold text-gray-900 mb-2"
                >
                  Select Team Member to Swap With
                </label>

                <select
                  id="swapPartner"
                  value={selectedStaffId}
                  onChange={(e) => setSelectedStaffId(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg 
    text-gray-900 bg-white
    focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="">-- Choose a team member --</option>

                  {staff?.length === 0 && (
                    <option disabled>No available staff</option>
                  )}

                  {staff?.map((member: any) => (
                    <option key={member.id} value={member.id}>
                      {member.firstName + " " + member.lastName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded p-3 text-xs text-yellow-800">
                ⚠️ Swaps must be approved by your manager. Both parties must
                have the required skills for the shift.
              </div>
            </div>

            <div className="flex gap-3 justify-end">
              <button
                onClick={closeModal}
                className="py-2.5 px-5 bg-gray-200 text-gray-900 rounded text-sm font-semibold hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                className="py-2.5 px-5 bg-blue-900 text-white rounded text-sm font-semibold hover:bg-blue-800 transition-colors"
                onClick={handlSwamp}
              >
                Request Swap
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Drop Request Modal */}
      {activeModal === "drop" && (
        <div className="fixed inset-0 bg-black/60 bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 max-w-md w-11/12 shadow-lg">
            <div className="mb-5">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Drop Shift
              </h2>
              <p className="text-sm text-gray-600">
                Are you sure you want to drop this shift?
              </p>
            </div>
            <div className="mb-5">
              <div className="bg-gray-100 p-3 rounded text-sm mb-3">
                <p className="mb-1">
                  <strong>Shift Date:</strong> {modalData.shiftDate}
                </p>
                <p>
                  <strong>Time:</strong> {modalData.shiftTime}
                </p>
              </div>

              <div className="bg-red-50 border border-red-200 rounded p-3 text-xs text-red-800">
                ⚠️ Dropping a shift may affect your schedule and weekly
                commitment. Your manager will be notified.
              </div>
            </div>

            <div className="flex gap-3 justify-end">
              <button
                onClick={closeModal}
                className="py-2.5 px-5 bg-gray-200 text-gray-900 rounded text-sm font-semibold hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button className="py-2.5 px-5 bg-red-600 text-white rounded text-sm font-semibold hover:bg-red-700 transition-colors">
                Drop Shift
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
