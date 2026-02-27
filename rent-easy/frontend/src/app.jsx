import React, { useState } from 'react';
import Homepage from './home/homepage';
import ProductList from './products/productlist';
import ProductView from './products/productView';
import AdminMain from './admin/adminPage';
import MyRentalsMain from './MyRentals/myRentals';
import Cart from './home/cart';

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* ── NAVBAR ── */}
      <nav
        className="flex items-center justify-between px-6 h-16 sticky top-0 z-[100] border-b border-green-400/30"
        style={{
          background: 'rgba(255, 255, 255, 0.55)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          boxShadow: '0 2px 24px 0 rgba(34, 197, 94, 0.18), 0 1px 0 0 rgba(34, 197, 94, 0.10)',
        }}
      >

        {/* LEFT */}
        <div className="flex items-center gap-2">

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col gap-[5px]"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <span className="block w-6 h-[2px] bg-green-600 rounded"></span>
            <span className="block w-6 h-[2px] bg-green-600 rounded"></span>
            <span className="block w-6 h-[2px] bg-green-600 rounded"></span>
          </button>

          <img
            src="https://cdn-icons-png.freepik.com/256/5729/5729756.png?semt=ais_white_label"
            alt="RentEase"
            className="hidden md:block h-9 w-auto"
          />

          <span className="font-extrabold text-[1.2rem] text-gray-900">
            <span className="text-green-600">Rent</span>Ease
          </span>
        </div>

        {/* CENTER */}
        <div className="hidden md:flex gap-2">
          {["Home", "Products", "MyRents"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-gray-700 font-medium text-[0.95rem] px-4 py-2 rounded-lg transition-all duration-200 hover:text-green-700 hover:bg-green-100/70 hover:shadow-[0_0_10px_2px_rgba(34,197,94,0.25)]"
            >
              {item}
            </a>
          ))}
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">
          <img src="https://icons.veryicon.com/png/o/miscellaneous/flower-mall-color-icon/shopping-cart-114.png" alt="Cart" className="h-6 cursor-pointer" />
          <button className="px-4 py-2 rounded-lg bg-green-600 text-white font-semibold text-sm hover:bg-green-700 transition shadow-sm"
            style={{ boxShadow: '0 0 12px 2px rgba(34,197,94,0.35)' }}
          >
            Sign Up
          </button>
        </div>
      </nav>

      {/* ── OVERLAY ── */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-[200]"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* ── DRAWER ── */}
      <div
        className={`fixed top-0 left-0 h-screen w-[260px] shadow-xl z-[300] flex flex-col px-6 py-6 gap-2 transform transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          background: 'rgba(255,255,255,0.85)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          boxShadow: '4px 0 32px 0 rgba(34, 197, 94, 0.15)',
        }}
      >
        <button
          className="self-end text-lg text-gray-500 mb-4"
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
        >
          ✕
        </button>

        {["Home", "Products", "MyRents"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="block px-4 py-3 rounded-xl text-gray-800 font-medium transition-all duration-200 hover:bg-green-100/80 hover:text-green-700 hover:shadow-[0_0_10px_2px_rgba(34,197,94,0.2)]"
            onClick={() => setMenuOpen(false)}
          >
            {item}
          </a>
        ))}
      </div>

      {/* PAGE */}
      {/* <Homepage /> */}
      {/* <ProductList /> */}
      {/* <ProductView /> */}
      {/* <AdminMain /> */}
      {/* <MyRentalsMain /> */}
      <Cart />
    </>
  );
}
