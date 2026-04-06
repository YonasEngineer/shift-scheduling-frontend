import { createContext, useContext, useState, useEffect } from "react";
import { API } from "@/lib/api"; // your axios instance

import { socketConnection } from "@/lib/socket";

/* eslint-disable @typescript-eslint/no-explicit-any */

const ShiftContext = createContext<any>(null);

export const ShiftProvider = ({ children }: any) => {
  const [shifts, setShifts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [staff, setStaff] = useState<any[]>([]);
  const [swamp, setSwamp] = useState<any[]>([]);
  const [loadingStaff, setLoadingStaff] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const userId = user.sub; // dynamic in real app
    const socket = socketConnection(userId);
    socket.on("connect", () => {
      console.log("🔥 Connected to server:", socket.id);
    });

    socket.on("shift-created", (data) => {
      console.log("✅ shift created  see the data:", data);
      setShifts([data]);
    });

    return () => {
      socket.off("swap-approved");
    };
  }, []);

  const fetchMyShifts = async () => {
    try {
      setLoading(true);

      const user = JSON.parse(localStorage.getItem("user") || "{}");
      console.log("see the user", user);
      if (!user?.sub) return;

      const res = await API.get(`/shifts/me/${user.sub}`);
      const data = res.data;
      // console.log("see the user shift", res);
      setShifts(data);
    } catch (err) {
      console.error("Failed to fetch shifts:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchMySwampRequests = async () => {
    try {
      setLoading(true);

      const user = JSON.parse(localStorage.getItem("user") || "{}");
      if (!user?.sub) return;

      const res = await API.get(`/swaps/${user.sub}`);
      const data = res.data;

      setSwamp(data);
    } catch (err) {
      console.error("Failed to fetch shifts:", err);
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

      console.log("see the staff fetched", res.data);
      setStaff(res.data);
    } catch (err) {
      console.error("Failed to fetch staff", err);
    } finally {
      setLoadingStaff(false);
    }
  };

  useEffect(() => {
    fetchMyShifts();
    fetchMySwampRequests();
  }, []);

  return (
    <ShiftContext.Provider
      value={{
        shifts,
        loading,
        fetchStaff,
        staff,
        swamp,
        refreshShifts: fetchMyShifts,
        refetchSwamp: fetchMySwampRequests,
      }}
    >
      {children}
    </ShiftContext.Provider>
  );
};

export const useShifts = () => useContext(ShiftContext);
