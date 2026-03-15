import React, { useState } from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, Package, ClipboardList, Wrench, X, Menu } from "lucide-react";
import { useUser, UserButton } from "@clerk/clerk-react";

const navItems = [
  { label: "Dashboard",   icon: <LayoutDashboard size={18} />, path: "/admin" },
  { label: "Products",    icon: <Package size={18} />,         path: "/admin/products" },
  { label: "Rents",       icon: <ClipboardList size={18} />,   path: "/admin/rents" },
  { label: "Maintenance", icon: <Wrench size={18} />,          path: "/admin/maintenance" },
];

const AdminNavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useUser();
  const navigate = useNavigate();

  return (
    <>
      <nav className="flex items-center justify-between px-6 h-16 sticky top-0 z-[100]
        border-b border-green-400/30
        bg-white/55 backdrop-blur-xl
        shadow-[0_2px_24px_0_rgba(34,197,94,0.18),0_1px_0_0_rgba(34,197,94,0.10)]">

        {/* LEFT */}
        <div className="flex items-center gap-2">
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={24} className="text-green-600" />
          </button>

          <img
            src="https://cdn-icons-png.freepik.com/256/5729/5729756.png?semt=ais_white_label"
            alt="RentEase"
            className="hidden md:block h-9 w-auto"
          />

          <span className="font-extrabold text-[1.2rem] text-gray-900">
            <span className="text-green-600">Rent</span>Ease
            <span className="ml-2 text-xs font-medium bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
              Admin
            </span>
          </span>
        </div>

        {/* CENTER */}
        <div className="hidden md:flex gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              end
              className={({ isActive }) =>
                `flex items-center gap-1.5 font-medium text-[0.95rem]
                px-4 py-2 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "text-green-700 bg-green-100/70 shadow-[0_0_10px_2px_rgba(34,197,94,0.25)]"
                    : "text-gray-700 hover:text-green-700 hover:bg-green-100/70 hover:shadow-[0_0_10px_2px_rgba(34,197,94,0.25)]"
                }`
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3">
          <span className="hidden md:block text-sm font-medium text-gray-700">
            {user?.firstName || "Admin"}
          </span>
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "w-8 h-8",
              },
            }}
          />
        </div>
      </nav>

      {/* OVERLAY */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-[200]"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* DRAWER */}
      <div
        className={`fixed top-0 left-0 h-screen w-[260px]
          shadow-xl z-[300]
          flex flex-col px-6 py-6 gap-2
          transform transition-transform duration-300
          ${menuOpen ? "translate-x-0" : "-translate-x-full"}
          bg-white/85 backdrop-blur-2xl
          shadow-[4px_0_32px_0_rgba(34,197,94,0.15)]`}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <img
              src="https://cdn-icons-png.freepik.com/256/5729/5729756.png?semt=ais_white_label"
              alt="RentEase"
              className="h-8 w-auto"
            />
            <span className="font-extrabold text-[1.1rem] text-gray-900">
              <span className="text-green-600">Rent</span>Ease
            </span>
            <span className="text-xs font-medium bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
              Admin
            </span>
          </div>

          <button onClick={() => setMenuOpen(false)} aria-label="Close menu">
            <X size={22} className="text-gray-500 hover:text-gray-700" />
          </button>
        </div>

        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl font-medium
              transition-all duration-200 ${
                isActive
                  ? "bg-green-100/80 text-green-700 shadow-[0_0_10px_2px_rgba(34,197,94,0.2)]"
                  : "text-gray-800 hover:bg-green-100/80 hover:text-green-700 hover:shadow-[0_0_10px_2px_rgba(34,197,94,0.2)]"
              }`
            }
            onClick={() => setMenuOpen(false)}
          >
            <span className="text-green-600">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}

        {/* UserButton in drawer too */}
        <div className="mt-auto flex items-center gap-3 px-2">
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "w-8 h-8",
              },
            }}
          />
          <span className="text-sm font-medium text-gray-700">
            {user?.firstName || "Admin"}
          </span>
        </div>
      </div>
    </>
  );
};

export default AdminNavBar;