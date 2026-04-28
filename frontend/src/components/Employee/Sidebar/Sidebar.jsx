import React, { useState } from "react";
import { LayoutDashboard, FileText, CheckSquare, Settings, MessageSquare, ChevronDown, X, Sparkles, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { LogOut } from "lucide-react";
import { Ticket } from "lucide-react";

import EmployeeProfileModal from "./EmployeeProfileModal";

const Sidebar = ({ isSidebarOpen = true, setIsSidebarOpen = () => { } }) => {
  const [openAccounts, setOpenAccounts] = useState(false);
  // const [openProjects, setOpenProjects] = useState(false);
  const [openTasks, setOpenTasks] = useState(false);
  const [activeRoute, setActiveRoute] = useState(window.location.pathname);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // Placeholder images
  const ttsimg = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%234F46E5'/%3E%3Ctext x='50' y='55' font-family='Arial' font-size='24' fill='white' text-anchor='middle'%3ETTS%3C/text%3E%3C/svg%3E";
  const employee = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%236366F1'/%3E%3Ctext x='50' y='60' font-family='Arial' font-size='36' fill='white' text-anchor='middle'%3EAC%3C/text%3E%3C/svg%3E";

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, to: "/employee/dashboard" },
    { name: "My Leaves", icon: FileText, to: "/employee/myLeaves" },
    { name: "My Tasks", icon: CheckSquare, to: "/employee/myTasks" },
    // { name: "Tasks", icon: CheckSquare, to: "/employee/ProjectManagerTasks" },
    { name: "Security", icon: Lock, to: "/employee/security" },
    { name: "LeadTickets", icon:Ticket, to: "/employee/lead-issue-tracker" },
    { name: "ManagerTickets", icon:Ticket, to: "/employee/issue-tracker" },
    {name: "Projects" , icon:FileText, to:"/employee/projectmanager/projects"}
  ];

  return (
    <>
      <EmployeeProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />

      {/* Overlay with blur */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-100 lg:hidden"
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-100 h-screen w-72 bg-gradient-to-b from-white via-indigo-50/30 to-purple-50/30
        shadow-2xl shadow-indigo-200/50 border-r border-indigo-100/50
        transform transition-all duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-indigo-400/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/3 -right-20 w-40 h-40 bg-purple-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-1/3 w-40 h-40 bg-pink-400/10 rounded-full blur-3xl"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-indigo-100/50">
            <div className="flex items-center gap-3">
              <img src={ttsimg} alt="Logo" className="h-16 w-16 rounded-xl shadow-md" />
              <div className="hidden sm:block">
                <div className="font-bold text-lg bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Employee Task Management
                </div>
                <div className="text-xs text-gray-500">by (Total Technology System)</div>
              </div>
            </div>

            <button
              className=" p-2 rounded-xl hover:bg-indigo-100 transition-colors"
              onClick={() => setIsSidebarOpen(false)}
            >
              <X className="text-gray-600" size={20} />
            </button>
          </div>

          {/* Profile */}
          <div className="p-6 text-center">
            <div
              className="relative inline-block cursor-pointer group"
              onClick={() => setIsProfileModalOpen(true)}
            >
              <img
                src={employee}
                alt="Employee"
                className="w-24 h-24 rounded-2xl mx-auto shadow-lg ring-4 ring-white group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Sparkles className="text-white" size={16} />
              </div>
            </div>
            <h4 className="mt-4 font-bold text-lg text-gray-800">Sangram Singh</h4>
            <p className="text-sm text-gray-500 flex items-center justify-center gap-1 mt-1">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              Employee
            </p>
          </div>

          {/* Menu */}
          <div className="flex-1 px-4 pb-4 space-y-2 overflow-y-auto">
            {menuItems.map((item, index) => {
              const isActive = activeRoute === item.to;
              return (
                <Link
                  key={index}
                  onClick={() => setActiveRoute(item.to)}
                  to={item.to}
                  className={`group flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium transition-all duration-200 w-full
                  ${isActive
                      ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-300/50 scale-105"
                      : "hover:bg-white/80 hover:shadow-md hover:scale-102 text-gray-700"
                    }`}
                >
                  <div className={`${isActive ? "scale-110" : "group-hover:scale-110"} transition-transform`}>
                    <item.icon size={20} />
                  </div>
                  <span className="text-sm">{item.name}</span>
                  {isActive && (
                    <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  )}
                </Link>
              );
            })}


            {/* Accounts Section */}
            <button
              onClick={() => setOpenAccounts(!openAccounts)}
              className={`group flex items-center justify-between w-full px-4 py-3.5 rounded-xl font-medium transition-all duration-200 text-gray-700
                ${openAccounts ? "bg-white/80 shadow-md" : "hover:bg-white/80 hover:shadow-md"}`}
            >
              <div className="flex items-center gap-3">
                <div className="group-hover:scale-110 transition-transform">
                  <MessageSquare size={20} />
                </div>
                <span className="text-sm">Accounts</span>
              </div>
              <div className={`transition-transform duration-300 ${openAccounts ? "rotate-180" : ""}`}>
                <ChevronDown size={18} />
              </div>
            </button>

            {/* Accounts Submenu */}
            <div
              className={`ml-4 space-y-1 overflow-hidden transition-all duration-300 ease-in-out
              ${openAccounts ? "max-h-40 opacity-100 mt-2" : "max-h-0 opacity-0"}`}
            >
              <Link
                to="/employee/accounts/client-payments"
                onClick={() => setActiveRoute("/employee/accounts/client-payments")}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm transition-all duration-200 w-full text-left
                  ${activeRoute === "/employee/accounts/client-payments"
                    ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md"
                    : "hover:bg-white/80 hover:shadow-sm text-gray-600 hover:text-gray-900"
                  }`}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-current"></div>
                Client Payments
              </Link>

              <Link
                to="/employee/accounts/other-payments"
                onClick={() => setActiveRoute("/employee/accounts/other-payments")}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm transition-all duration-200 w-full text-left
                  ${activeRoute === "/employee/accounts/other-payments"
                    ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md"
                    : "hover:bg-white/80 hover:shadow-sm text-gray-600 hover:text-gray-900"
                  }`}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-current"></div>
                Other Payments
              </Link>
            </div>

            {/* Tasks Section */}
            <button
              onClick={() => setOpenTasks(!openTasks)}
              className={`group flex items-center justify-between w-full px-4 py-3.5 rounded-xl font-medium transition-all duration-200 text-gray-700
  ${openTasks ? "bg-white/80 shadow-md" : "hover:bg-white/80 hover:shadow-md"}`}
            >
              <div className="flex items-center gap-3">
                <div className="group-hover:scale-110 transition-transform">
                  <CheckSquare size={20} />
                </div>
                <span className="text-sm">Tasks</span>
              </div>

              <div
                className={`transition-transform duration-300 ${openTasks ? "rotate-180" : ""
                  }`}
              >
                <ChevronDown size={18} />
              </div>
            </button>


            {/* Tasks Submenu */}
            <div
              className={`ml-4 space-y-1 overflow-hidden transition-all duration-300 ease-in-out
  ${openTasks ? "max-h-40 opacity-100 mt-2" : "max-h-0 opacity-0"}`}
            >
              <Link
                to="/employee/teamleader/alltasks"
                onClick={() => setActiveRoute("/employee/teamleader/alltasks")}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm transition-all duration-200 w-full text-left
    ${activeRoute === "/employee/teamleader/alltasks"
                    ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md"
                    : "hover:bg-white/80 hover:shadow-sm text-gray-600 hover:text-gray-900"
                  }`}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-current"></div>
                My Tasks
              </Link>


              {/* <Link
                to="/employee/IssueTracker"
                onClick={() => setActiveRoute("/employee/IssueTracker")}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm transition-all duration-200 w-full text-left
    ${activeRoute === "/employee/IssueTracker"
                    ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md"
                    : "hover:bg-white/80 hover:shadow-sm text-gray-600 hover:text-gray-900"
                  }`}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-current"></div>
                Tickets
              </Link> */}



              <Link
                to="/employee/teamleader/addtask"
                onClick={() => setActiveRoute("/employee/teamleader/addtask")}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm transition-all duration-200 w-full text-left
    ${activeRoute === "/employee/teamleader/addtask"
                    ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md"
                    : "hover:bg-white/80 hover:shadow-sm text-gray-600 hover:text-gray-900"
                  }`}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-current"></div>
                Add Task
              </Link>
            </div>

          </div>


          <Link
            to="/signin"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500 text-white text-sm font-medium
             hover:bg-red-600 active:scale-95 transition-all duration-200"
          >
            <LogOut size={16} />
            Logout
          </Link>


        </div>
      </aside>
    </>
  );
};

export default Sidebar

