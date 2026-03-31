"use client";

import { Sidebar } from "@/components/manager/Sidebar";
import { TopNav } from "@/components/manager/TopNav";

export default function LocationsPage() {
  const locations = [
    {
      name: "Harbor Location",
      staff: 28,
      scheduled: 18,
      capacity: 72,
      revenue: "$45,200",
    },
    {
      name: "Downtown Branch",
      staff: 35,
      scheduled: 24,
      capacity: 85,
      revenue: "$52,800",
    },
    {
      name: "Waterfront Venue",
      staff: 22,
      scheduled: 15,
      capacity: 68,
      revenue: "$38,500",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 ml-56">
        <TopNav />
        <main className="pt-24 px-8 pb-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Locations</h1>
            <p className="text-gray-600 mt-1">
              Manage all your restaurant locations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {locations.map((location) => (
              <div
                key={location.name}
                className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  {location.name}
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Total Staff</span>
                    <span className="font-bold text-gray-900">
                      {location.staff}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      Scheduled Today
                    </span>
                    <span className="font-bold text-gray-900">
                      {location.scheduled}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Capacity</span>
                    <span className="font-bold text-teal-700">
                      {location.capacity}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      Weekly Revenue
                    </span>
                    <span className="font-bold text-gray-900">
                      {location.revenue}
                    </span>
                  </div>
                  <button className="w-full mt-4 px-4 py-2 bg-teal-50 text-teal-700 rounded-lg font-medium hover:bg-teal-100">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
