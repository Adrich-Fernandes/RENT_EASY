import React from 'react'
import { Link } from 'react-router-dom'

const footer = () => {
  return (
    <div className="w-full bg-[#1D3557] text-white px-8 py-16">

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">

        {/* LEFT SECTION */}
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            <span className="text-[#A8DADC]">Rent</span>
            <span className="text-white">Ease</span>
          </h2>

          <span className="block mt-4 text-gray-400 max-w-sm">
            Premium furniture & appliances on flexible monthly rentals.
            Making urban living affordable and convenient.
          </span>

          <div className="mt-6 space-y-4 text-gray-300">
            <div className="flex items-center gap-3">
              <img src="https://uxwing.com/wp-content/themes/uxwing/download/communication-chat-call/phone-call-white-icon.png" alt="phone" className="w-4 h-4" />
              <span>1800-123-4567</span>
            </div>
            <div className="flex items-center gap-3">
              <img src="https://uxwing.com/wp-content/themes/uxwing/download/communication-chat-call/email-envelope-white-icon.png" alt="email" className="w-4 h-4" />
              <span>support@rentease.com</span>
            </div>
            <div className="flex items-center gap-3">
              <img src="https://uxwing.com/wp-content/themes/uxwing/download/location-travel-map/location-pointer-white-icon.png" alt="location" className="w-4 h-4" />
              <span>Multiple cities across India</span>
            </div>
          </div>
        </div>

        {/* MIDDLE SECTION */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <div className="flex flex-col gap-3 text-gray-400">
            <Link to="/productlist" className="hover:text-white transition">Browse Products</Link>
            <Link to="/myrentals" className="hover:text-white transition">My Rentals</Link>
            <Link to="/cart" className="hover:text-white transition">Cart</Link>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Categories</h3>
          <div className="flex flex-col gap-3 text-gray-400">
            <Link to="/productlist" className="hover:text-white transition">Furniture</Link>
            <Link to="/productlist" className="hover:text-white transition">Appliances</Link>
          </div>
        </div>

      </div>
    </div>
  )
}

export default footer
