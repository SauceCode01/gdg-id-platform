"use client";

import { useState } from "react";

import React from "react";
import { useAuthStore } from "../../stores/authStore";
import { MessagesTab } from "./_components/MessagesTab";

const AdminPage = () => {
  const [currentTab, setCurrentTab] = useState("messages");

  const { user, token, authState, error, loginWithGoogle, logout } =
    useAuthStore();

  const isAdmin = true; //userData?.roles.includes("admin");
  return (
    <div className="min-h-screen">
      <div className="w-full max-w-6xl mx-auto my-16 bg-white">
        {" "}
        <button
          onClick={logout}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow hover:bg-gray-50 transition"
        >
          <span className="text-sm md:text-base font-medium text-gray-700">
            Logout
          </span>
        </button>
        {/* tabs  */}
        <div className="flex flex-row flex-wrap justify-start items-center">
          {Object.keys(TABS).map((tabName) => {
            return (
              <>
                <div
                  className={`cursor-pointer px-4 py-2 rounded-2xl    hover:bg-gray-300 text-base ${
                    currentTab == tabName && "font-bold"
                  }`}
                  onClick={() => setCurrentTab(tabName)}
                >
                  {TABS[tabName].label}
                </div>
              </>
            );
          })}
        </div>
        <hr />
        {/* actual content */}
        {TABS && TABS[currentTab] && TABS[currentTab].element}
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
