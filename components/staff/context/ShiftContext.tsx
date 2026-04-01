import { createContext, useContext, useState, useEffect } from "react";
import { API } from "@/lib/api"; // your axios instance
/* eslint-disable @typescript-eslint/no-explicit-any */

const ShiftContext = createContext<any>(null);

export const ShiftProvider = ({ children }: any) => {
  const [shifts, setShifts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchMyShifts = async () => {
    try {
      setLoading(true);

      const user = JSON.parse(localStorage.getItem("user") || "{}");
      console.log("see the user", user);
      if (!user?.sub) return;

      const res = await API.get(`/shifts/me/${user.sub}`);
      const data = res.data;

      setShifts(data);
    } catch (err) {
      console.error("Failed to fetch shifts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyShifts();
  }, []);

  return (
    <ShiftContext.Provider
      value={{
        shifts,
        loading,
        refreshShifts: fetchMyShifts,
      }}
    >
      {children}
    </ShiftContext.Provider>
  );
};

export const useShifts = () => useContext(ShiftContext);
