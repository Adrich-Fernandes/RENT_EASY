import React, { useState } from 'react'
import { NavLink, useNavigate, Link } from "react-router-dom";
import { LayoutDashboard, Package, Wrench, X, Menu, ShoppingBag, Clock, MessageSquare } from "lucide-react";
import { useUser, UserButton } from "@clerk/clerk-react";

const navItems = [
  { label: "Dashboard",   icon: <LayoutDashboard size={18} />, path: "/admin" },
  { label: "Products",    icon: <Package size={18} />,         path: "/admin/products" },
  { label: "Orders",      icon: <ShoppingBag size={18} />,     path: "/admin/orders" },
  { label: "Maintenance", icon: <Wrench size={18} />,          path: "/admin/maintenance" },
  { label: "Issues",      icon: <MessageSquare size={18} />,    path: "/admin/issues" },
  { label: "Expiring",    icon: <Clock size={18} />,           path: "/admin/expiring" },
];

const AdminNavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useUser();

  return (
    <>
      <nav className="flex items-center justify-between px-6 h-16 sticky top-0 z-[100]
        border-b border-[#457B9D]/20
        bg-white/55 backdrop-blur-xl
        shadow-[0_2px_24px_0_rgba(29,53,87,0.12),0_1px_0_0_rgba(69,123,157,0.10)]">

        {/* LEFT */}
        <div className="flex items-center gap-2">
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={24} className="text-red-600" />
          </button>

          <Link to="/" className="flex items-center gap-2">
            <img
              src="https://www.shutterstock.com/image-vector/house-cleaning-abstract-logo-modern-260nw-2678741729.jpg"
              alt="RentEase"
              className="hidden md:block h-9 w-auto rounded-lg"
            />

            <span className="font-extrabold text-[1.2rem] text-gray-900 flex items-center">
              <span className="text-[#1D3557]">Rent</span>Ease
              <span className="ml-2 text-[10px] font-bold bg-[#1D3557]/10 text-[#1D3557] px-2 py-0.5 rounded-full uppercase tracking-tighter">
                Admin
              </span>
            </span>
          </Link>
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
                    ? "text-[#1D3557] bg-[#1D3557]/10 shadow-[0_0_10px_2px_rgba(230,57,70,0.18)]"
                    : "text-[#1D3557] hover:text-[#1D3557] hover:bg-[#1D3557]/10 hover:shadow-[0_0_10px_2px_rgba(230,57,70,0.18)]"
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
          shadow-[4px_0_32px_0_rgba(29,53,87,0.15)]`}
      >
        <div className="flex items-center justify-between mb-4">
          <Link to="/" className="flex items-center gap-2" onClick={() => setMenuOpen(false)}>
            <img
              src="https://www.shutterstock.com/image-vector/house-cleaning-abstract-logo-modern-260nw-2678741729.jpg"
              alt="RentEase"
              className="h-8 w-auto rounded-lg"
            />
            <span className="font-extrabold text-[1.1rem] text-gray-900 flex items-center">
              <span className="text-[#1D3557]">Rent</span>Ease
              <span className="ml-2 text-[10px] font-bold bg-[#1D3557]/10 text-[#1D3557] px-2 py-0.5 rounded-full uppercase tracking-tighter">
                Admin
              </span>
            </span>
          </Link>

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
                  ? "bg-[#1D3557]/10 text-[#1D3557] shadow-[0_0_10px_2px_rgba(230,57,70,0.15)]"
                  : "text-[#1D3557] hover:bg-[#1D3557]/10 hover:text-[#1D3557] hover:shadow-[0_0_10px_2px_rgba(230,57,70,0.15)]"
              }`
            }
            onClick={() => setMenuOpen(false)}
          >
            <span className="text-[#1D3557]">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}

        {/* UserButton in drawer */}
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
