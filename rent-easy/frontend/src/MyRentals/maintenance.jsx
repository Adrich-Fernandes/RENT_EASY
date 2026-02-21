import React from "react";

export default function ProductMaintain() {
  return (
    <div className="p-2 w-full max-w-3xl mx-auto space-y-4">

      {/* Card */}
      <div className="relative bg-white p-6 rounded-xl shadow-md">

        {/* Status Badge */}
        <span className="absolute top-4 right-4 px-4 py-1 text-sm font-semibold bg-green-100 text-green-700 rounded-full">
          Active
        </span>

        {/* Content */}
        <div className="flex flex-col">
          <span className="text-xl font-bold">
            Luxury Apartment
          </span>
          <span className="text-gray-600 mt-2">
            123 Main Street, New York
          </span>
          <span className="text-gray-400 mt-1 text-sm">
            May 26, 2026
          </span>
        </div>

      </div>

    </div>
  );
}