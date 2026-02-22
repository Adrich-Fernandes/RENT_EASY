import React from "react";

export default function Maintain() {
  return (
    <div className="p-2 w-full max-w-5xl mx-auto space-y-3">

      {/* Card */}
      <div className="relative bg-white px-6 py-3 rounded-xl shadow-md">

        {/* Status Badge */}
        <span className="absolute top-3 right-4 px-3 py-1 text-xs font-semibold bg-green-100 text-green-700 rounded-full">
          Active
        </span>

        {/* Content */}
        <div className="flex flex-col">
          <span className="text-lg font-bold">
            Luxury Apartment
          </span>
          <span className="text-gray-600 mt-1 text-sm">
            123 Main Street, New York
          </span>
          <span className="text-gray-400 mt-1 text-xs">
            May 26, 2026
          </span>
        </div>

      </div>

    </div>
  );
}