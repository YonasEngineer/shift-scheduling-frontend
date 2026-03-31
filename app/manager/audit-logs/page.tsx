"use client";

import { Sidebar } from "@/components/manager/Sidebar";
import { TopNav } from "@/components/manager/TopNav";

export default function AuditLogsPage() {
  const logs = [
    {
      id: 1,
      user: "John Manager",
      action: "Updated schedule",
      target: "Oct 25 Shifts",
      timestamp: "2:45 PM",
      status: "Success",
    },
    {
      id: 2,
      user: "Sarah Admin",
      action: "Added staff member",
      target: "Elena P.",
      timestamp: "1:30 PM",
      status: "Success",
    },
    {
      id: 3,
      user: "Mike Manager",
      action: "Modified fairness score",
      target: "Labor settings",
      timestamp: "12:15 PM",
      status: "Success",
    },
    {
      id: 4,
      user: "Lisa Manager",
      action: "Exported report",
      target: "Weekly Summary",
      timestamp: "11:00 AM",
      status: "Success",
    },
    {
      id: 5,
      user: "David Admin",
      action: "Updated location",
      target: "Harbor Branch",
      timestamp: "10:30 AM",
      status: "Success",
    },
    {
      id: 6,
      user: "Elena Staff",
      action: "Clocked in",
      target: "Main Dining",
      timestamp: "9:15 AM",
      status: "Success",
    },
    {
      id: 7,
      user: "John Manager",
      action: "Deleted schedule",
      target: "Oct 22 Shifts",
      timestamp: "8:45 AM",
      status: "Success",
    },
    {
      id: 8,
      user: "Sarah Admin",
      action: "Access denied",
      target: "Financial report",
      timestamp: "8:00 AM",
      status: "Failed",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 ml-56">
        <TopNav />
        <main className="pt-24 px-8 pb-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Audit Logs</h1>
            <p className="text-gray-600 mt-1">
              Track all system activities and changes
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    User
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Action
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Target
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Timestamp
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => (
                  <tr
                    key={log.id}
                    className="border-b border-gray-200 hover:bg-gray-50"
                  >
                    <td className="px-6 py-4">
                      <span className="font-medium text-gray-900">
                        {log.user}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-700">{log.action}</td>
                    <td className="px-6 py-4 text-gray-700">{log.target}</td>
                    <td className="px-6 py-4 text-gray-600 text-sm">
                      {log.timestamp}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          log.status === "Success"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm text-gray-600">Showing 8 of 2,345 entries</p>
            <div className="flex items-center gap-2">
              <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                Previous
              </button>
              <button className="px-3 py-2 bg-teal-700 text-white rounded-lg text-sm font-medium hover:bg-teal-800">
                Next
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
