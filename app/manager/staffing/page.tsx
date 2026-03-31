"use client";

import { Sidebar } from "@/components/manager/Sidebar";
import { TopNav } from "@/components/manager/TopNav";

export default function StaffingPage() {
  const staff = [
    { name: "John D.", role: "Bartender", hours: 128, status: "Scheduled" },
    { name: "Sarah M.", role: "Head Server", hours: 92, status: "On Duty" },
    { name: "Mike R.", role: "Runner", hours: 104, status: "Scheduled" },
    { name: "Lisa V.", role: "Manager", hours: 160, status: "On Duty" },
    { name: "David K.", role: "Chef", hours: 135, status: "On Duty" },
    { name: "Elena P.", role: "Server", hours: 98, status: "Scheduled" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 ml-56">
        <TopNav />
        <main className="pt-24 px-8 pb-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Staffing</h1>
            <p className="text-gray-600 mt-1">
              Manage staff assignments and hours
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Role
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Monthly Hours
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {staff.map((member) => (
                  <tr
                    key={member.name}
                    className="border-b border-gray-200 hover:bg-gray-50"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${member.name}`}
                          alt={member.name}
                          className="w-8 h-8 rounded-full"
                        />
                        <span className="font-medium text-gray-900">
                          {member.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-700">{member.role}</td>
                    <td className="px-6 py-4 text-gray-700">{member.hours}h</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          member.status === "On Duty"
                            ? "bg-green-100 text-green-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {member.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-teal-700 font-medium hover:text-teal-800">
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
