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
      <nav className="flex items-center justify-between px-6 h-16 bg-white shadow-sm sticky top-0 z-[100] border-b border-green-100">

        {/* LEFT */}
        <div className="flex items-center gap-2">

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col gap-[5px]"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <span className="block w-6 h-[2px] bg-green-700 rounded"></span>
            <span className="block w-6 h-[2px] bg-green-700 rounded"></span>
            <span className="block w-6 h-[2px] bg-green-700 rounded"></span>
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
        <div className="hidden md:flex gap-7">
          {["Home", "Products", "MyRents"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-gray-700 font-medium text-[0.95rem] hover:text-green-600 transition"
            >
              {item}
            </a>
          ))}
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">
          <img src="https://icons.veryicon.com/png/o/miscellaneous/flower-mall-color-icon/shopping-cart-114.png" alt="Cart" className="h-6 cursor-pointer" />
          <button className="px-4 py-2 rounded-lg bg-green-600 text-white font-semibold text-sm hover:bg-green-700 transition shadow-sm">
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
        className={`fixed top-0 left-0 h-screen w-[260px] bg-white shadow-xl z-[300] flex flex-col px-6 py-6 gap-2 transform transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          className="self-end text-lg text-gray-500 mb-4"
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
        >
          ✕
        </button>


        {/* OBJECT HERE */}
        {["Home", "Products", "MyRents"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="block  px-4 py-3 rounded-xl text-gray-800 font-medium hover:bg-green-50 hover:text-green-600 transition"
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