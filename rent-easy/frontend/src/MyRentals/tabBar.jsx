// TabBar.jsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import UserNavBar from "../components/userNavBar";
import { Home, ClipboardList, BoxIcon, Menu, X } from "lucide-react";

export default function TabBar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { label: "Active Rentals", icon: <Home size={18} />, path: "/myrentals/ActiveRents" },
    { label: "Maintenance", icon: <ClipboardList size={18} />, path: "/myrentals/maintenance" },
    { label: "Orders", icon: <BoxIcon size={18} />, path: "/myrentals/orders" },
  ];

  return (
    <>

      {/* ── Mobile top bar ── */}
      <div className="md:hidden sticky top-16 z-40 flex items-center gap-3 px-6 py-4 border-b border-red-50 bg-white/80 backdrop-blur-md">
        <button 
          onClick={() => setMobileOpen(!mobileOpen)} 
          className="p-2 -ml-2 rounded-xl hover:bg-red-50 text-red-600 transition-colors"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <span className="font-bold text-gray-900 tracking-tight">Dashboard</span>
      </div>
 
      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden sticky top-[121px] z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 px-4 py-3 flex flex-col gap-1 shadow-lg animate-in slide-in-from-top-2 duration-200">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all
                ${location.pathname === item.path
                  ? "bg-red-600 text-white shadow-md shadow-red-200"
                  : "text-gray-600 hover:bg-red-50 hover:text-red-600"
                }`}
            >
              <span className={location.pathname === item.path ? "text-white" : "text-red-500"}>
                {item.icon}
              </span>
              {item.label}
            </Link>
          ))}
        </div>
      )}
 
      {/* ── Desktop left sidebar ── */}
      <div className="hidden md:flex flex-col fixed top-16 left-0 h-[calc(100vh-64px)] w-64 bg-white border-r border-gray-100 pt-10 px-6 gap-1.5 z-40 bg-gradient-to-b from-white to-gray-50/30">
        <div className="mb-10 px-2">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-2xl bg-red-100 text-red-600 mb-4 shadow-sm border border-red-200/50">
            <ClipboardList size={20} />
          </div>
          <p className="text-xl font-black text-gray-900 tracking-tight">Lease Hub</p>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Manage Service Protocols</p>
        </div>
 
        <div className="space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.label}
                to={item.path}
                className={`group flex items-center gap-3 px-4 py-3.5 rounded-2xl text-[13px] font-bold tracking-tight transition-all duration-300
                  ${isActive
                    ? "bg-red-600 text-white shadow-xl shadow-red-100 -translate-y-0.5"
                    : "text-gray-500 hover:bg-red-50 hover:text-red-700"
                  }`}
              >
                <span className={`transition-colors duration-300 ${isActive ? "text-white" : "text-red-500 group-hover:text-red-600"}`}>
                  {item.icon}
                </span>
                {item.label}
              </Link>
            );
          })}
        </div>
 
        <div className="mt-auto mb-8 px-2">
           <div className="bg-red-50 rounded-2xl p-4 border border-red-100/50">
              <p className="text-[10px] font-black text-red-800 uppercase tracking-widest mb-1">Support 24/7</p>
              <p className="text-xs text-red-600/70 leading-relaxed font-semibold">Need help with your rental? Our team is always here.</p>
           </div>
        </div>
      </div>
    </>
  );
}