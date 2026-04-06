"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { API } from "@/lib/api";
import { socketConnection } from "@/lib/socket";
/* eslint-disable @typescript-eslint/no-explicit-any */
type ScheduleContextType = {
  schedules: any[];
  selectedSchedule: any;
  fetchStaff: any;
  // fetchShifts: any;
  loading: boolean;
  loadingStaff: boolean;
  staff: any;
  swapNeedingApproval: any;
  fetchSwapNeedingApproval: any;
  location: any;
  skills: any;
  // shifts: any;
  fetchSchedules: () => Promise<void>;
  setSelectedSchedule: (s: any) => void;
};

const ScheduleContext = createContext<ScheduleContextType | null>(null);

export const ScheduleProvider = ({ children }: any) => {
  const [schedules, setSchedules] = useState<any[]>([]);
  const [staff, setStaff] = useState<any[]>([]);
  const [loadingStaff, setLoadingStaff] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState<any>(null);
  const [skills, setSkills] = useState(null);
  const [location, setLocation] = useState<any[]>([]);
  const [swapNeedingApproval, setSwapNeedingApproval] = useState<any[]>([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const userId = user.sub; // dynamic in real app
    const socket = socketConnection(userId);
    socket.on("connect", () => {
      console.log("🔥 Connected to server:", socket.id);
    });

    socket.on("swap-approved", (data) => {
      console.log("✅ Swap approved:", data);
    });

    return () => {
      socket.off("swap-approved");
    };
  }, []);

  // const [shifts, setShifts] = useState(null);

  const [loading, setLoading] = useState(true);

  const fetchSchedules = async () => {
    try {
      setLoading(true);
      const manager = JSON.parse(localStorage.getItem("user") || "{}");

      if (!manager?.sub) return;

      const res = await API.get(`/schedules/manager/${manager.sub}`);
      const data = await res.data;
      // setSchedules(data);

      // auto select latest schedule
      if (data.length > 0) {
        setSelectedSchedule(data[0]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchSkill = async () => {
    try {
      setLoading(true);

      const res = await API.get(`/skill`);
      const data = await res.data;
      setSkills(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchStaff = async (
    locationId: string,
    skillId: string,
    shiftStart: string,
    shiftEnd: string,
  ) => {
    try {
      setLoadingStaff(true);

      const res = await API.get("/staff", {
        params: {
          locationId,
          skillId,
          shiftStart,
          shiftEnd,
        },
      });
      console.log("see the shiftStart ", shiftStart);
      console.log("see the shiftEnd ", shiftEnd);

      console.log("see the staff fetched", res.data);
      setStaff(res.data);
    } catch (err) {
      console.error("Failed to fetch staff", err);
    } finally {
      setLoadingStaff(false);
    }
  };

  const fetchLocation = async () => {
    try {
      setLoading(true);
      const manager = JSON.parse(localStorage.getItem("user") || "{}");

      if (!manager?.sub) return;
      const res = await API.get(`/locations/user/${manager.sub}`);
      const data = await res.data;
      setLocation(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchSwapNeedingApproval = async () => {
    try {
      setLoading(true);

      if (!location?.[0]?.id) return;
      const res = await API.get(`/swaps/needing/approval/${location?.[0]?.id}`);
      console.log("see the  swapNeedingApproval", res);
      const data = await res.data;
      setSwapNeedingApproval(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSwapNeedingApproval();
  }, [!location?.[0]?.id]);

  // const fetchShifts = async () => {
  //   try {
  //     setLoading(true);

  //     const res = await API.get(`/shifts`);
  //     const data = await res.data;
  //     console.log("see the shifts", data);
  //     setShifts(data);
  //   } catch (err) {
  //     console.error(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  useEffect(() => {
    fetchSchedules();
    fetchSkill();
    fetchLocation();
    // fetchShifts();
  }, []);

  return (
    <ScheduleContext.Provider
      value={{
        schedules,
        selectedSchedule,
        loading,
        skills,
        // shifts,
        // fetchShifts,
        fetchSwapNeedingApproval,
        staff,
        location,
        loadingStaff,
        swapNeedingApproval,
        fetchStaff,
        fetchSchedules,
        setSelectedSchedule,
      }}
    >
      {children}
    </ScheduleContext.Provider>
  );
};

export const useSchedule = () => {
  const ctx = useContext(ScheduleContext);
  if (!ctx) throw new Error("useSchedule must be used inside provider");
  return ctx;
};
