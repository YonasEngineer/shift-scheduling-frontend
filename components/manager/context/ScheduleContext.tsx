"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { API } from "@/lib/api";
/* eslint-disable @typescript-eslint/no-explicit-any */
type ScheduleContextType = {
  schedules: any[];
  selectedSchedule: any;
  fetchStaff: any;
  // fetchShifts: any;
  loading: boolean;
  loadingStaff: boolean;
  staff: any;
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
        staff,
        loadingStaff,
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
