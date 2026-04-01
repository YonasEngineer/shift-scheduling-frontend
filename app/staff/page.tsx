"use client";

import React from "react";
import StaffDashboard from "@/components/staff/Dashboard";
import { ShiftProvider } from "@/components/staff/context/ShiftContext";
const page = () => {
  return (
    <ShiftProvider>
      <StaffDashboard />
    </ShiftProvider>
  );
};

export default page;
