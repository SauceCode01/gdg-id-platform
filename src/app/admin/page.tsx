"use client";

import { useState } from "react";
import React from "react";
import { useAuthStore } from "../../stores/authStore";
import { MessagesTab } from "./_components/MessagesTab";

const AdminPage = () => {
  const [currentTab, setCurrentTab] = useState("messages");
  const { logout } = useAuthStore();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      {/* Container */}
      <div className="w-full max-w-6xl mx-auto my-16 bg-white rounded-2xl shadow-lg p-6 md:p-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
          <button
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
          >
            <span className="text-sm md:text-base font-medium">Logout</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-3 mb-4 border-b pb-2">
          {Object.keys(TABS).map((tabName) => {
            const active = currentTab === tabName;
            return (
              <div
                key={tabName}
                onClick={() => setCurrentTab(tabName)}
                className={`cursor-pointer px-5 py-2 rounded-full text-sm md:text-base transition-all ${
                  active
                    ? "bg-blue-600 text-white font-semibold shadow"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {TABS[tabName].label}
              </div>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {TABS[currentTab]?.element ?? (
            <p className="text-gray-500">No tab selected.</p>
          )}
        </div>
      </div>
    </div>
  );
};

type TabType = {
  label: string;
  element: React.ReactNode;
  roles: string[];
};

const TABS: Record<string, TabType> = {
  messages: {
    label: "Messages",
    element: <MessagesTab />,
    roles: ["admin"],
  },
};

export default AdminPage;
