"use client";
import React from "react";
import Dashboard from "@/components/manager/Dashboard";
import { ScheduleProvider } from "@/components/manager/context/ScheduleContext";
const page = () => {
  return (
    <ScheduleProvider>
      <Dashboard />
    </ScheduleProvider>
  );
};

export default page;
