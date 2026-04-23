import React, { useState, useEffect } from 'react'
import { Home, Package, ClipboardList, X, Menu, ShoppingCartIcon } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import axios from "axios";

const navItems = [
  { label: "Home", icon: <Home size={18} />, path: "/" },
  { label: "Products", icon: <Package size={18} />, path: "/productlist" },
  { label: "MyRents", icon: <ClipboardList size={18} />, path: "/myrentals/ActiveRents" },
];

const moreItems = [
  { label: "Report Issue", path: "/report-issue" },
  { label: "Issue Status", path: "/issue-status" },
  { label: "Contact Us", path: "/contact" },
];

const UserNavBar = () => {
  const { user } = useUser();
  const { openSignIn } = useClerk();
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    if (user) {
      axios.get(`http://localhost:4000/api/user/${user.id}`)
        .then(res => {
          if (res.data?.cart) {
            setCartCount(res.data.cart.length);
          }
        })
        .catch(err => console.error("Error fetching cart count:", err));
    }
  }, [user]);

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
            <Menu size={24} className="text-[#1D3557]" />
          </button>

          <img
            src="https://cdn-icons-png.freepik.com/256/5729/5729756.png?semt=ais_white_label"
            alt="RentEase"
            className="hidden md:block h-9 w-auto"
          />

          <span className="font-extrabold text-[1.2rem] text-gray-900">
            <span className="text-[#1D3557]">Rent</span>Ease
          </span>
        </div>

        {/* CENTER — desktop */}
        <div className="hidden md:flex gap-2 items-center">
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

          {/* More dropdown */}
          <div className="relative">
            <button
              onClick={() => setMoreOpen((p) => !p)}
              className={`flex items-center gap-1.5 font-medium text-[0.95rem]
                px-4 py-2 rounded-lg transition-all duration-200 ${
                  moreOpen
                    ? "text-[#1D3557] bg-[#1D3557]/10 shadow-[0_0_10px_2px_rgba(230,57,70,0.18)]"
                    : "text-[#1D3557] hover:text-[#1D3557] hover:bg-[#1D3557]/10 hover:shadow-[0_0_10px_2px_rgba(230,57,70,0.18)]"
                }`}
            >
              More
              <svg
                className={`w-3.5 h-3.5 transition-transform duration-200 ${moreOpen ? "rotate-180" : ""}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {moreOpen && (
              <>
                <div className="fixed inset-0 z-[90]" onClick={() => setMoreOpen(false)} />
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 z-[101] overflow-hidden">
                  {moreItems.map((item) => (
                    <NavLink
                      key={item.label}
                      to={item.path}
                      onClick={() => setMoreOpen(false)}
                      className={({ isActive }) =>
                        `block px-4 py-3 text-sm font-medium transition-colors duration-150 ${
                          isActive
                            ? "text-[#1D3557] bg-[#1D3557]/10"
                            : "text-[#1D3557] hover:text-[#1D3557] hover:bg-[#1D3557]/10"
                        }`
                      }
                    >
                      {item.label}
                    </NavLink>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">
          <Link to="/cart" className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-[#1D3557]/10 transition-colors">
            <ShoppingCartIcon className="h-6 w-6 cursor-pointer text-[#1D3557]" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-600 border-2 border-white rounded-full translate-x-1 -translate-y-1">
                {cartCount}
              </span>
            )}
          </Link>

          {!user ? (
            <button
              onClick={openSignIn}
              className="px-4 py-2 rounded-lg bg-[#1D3557] text-white font-semibold text-sm
                hover:bg-[#457B9D] transition shadow-[0_0_12px_2px_rgba(230,57,70,0.30)]"
            >
              Sign Up
            </button>
          ) : (
            <UserButton />
          )}
        </div>
      </nav>

      {/* OVERLAY */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-[200]"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* MOBILE DRAWER */}
      <div
        className={`fixed top-0 left-0 h-screen w-[260px] z-[300]
          flex flex-col px-6 py-6 gap-2
          transform transition-transform duration-300
          ${menuOpen ? "translate-x-0" : "-translate-x-full"}
          bg-white/85 backdrop-blur-2xl
          shadow-[4px_0_32px_0_rgba(29,53,87,0.15)]`}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <img
              src="https://cdn-icons-png.freepik.com/256/5729/5729756.png?semt=ais_white_label"
              alt="RentEase"
              className="h-8 w-auto"
            />
            <span className="font-extrabold text-[1.1rem] text-gray-900">
              <span className="text-[#1D3557]">Rent</span>Ease
            </span>
          </div>
          <button onClick={() => setMenuOpen(false)} aria-label="Close menu">
            <X size={22} className="text-gray-500 hover:text-[#1D3557]" />
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
                  : "text-[#1D3557] hover:bg-[#1D3557]/10 hover:text-[#1D3557]"
              }`
            }
            onClick={() => setMenuOpen(false)}
          >
            <span className="text-[#1D3557]">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}

        {/* More section in drawer */}
        <div className="mt-2 border-t border-gray-100 pt-3">
          <p className="text-xs text-gray-400 px-4 mb-1 uppercase tracking-wide font-semibold">More</p>
          {moreItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 rounded-xl font-medium
                transition-all duration-200 ${
                  isActive
                    ? "bg-[#1D3557]/10 text-[#1D3557]"
                    : "text-[#1D3557] hover:bg-[#1D3557]/10 hover:text-[#1D3557]"
                }`
              }
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
};

export default UserNavBar;
