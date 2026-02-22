import React from "react";

export default function PastCards() {
  return (
    <div className="p-2 max-w-[97%] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">

      {/* Card */}
      <div className="flex items-center justify-between bg-white p-3 rounded-xl shadow-md">

        {/* Left Section */}
        <div className="flex items-center gap-6">
          
          {/* Image Wrapper */}
          <div className="relative">
            <img
              src="https://images.woodenstreet.de/image/cache/data/fabric-sofa/adrick-3-seater-sofa/product/jade-ivory/103-810x702.jpg"
              alt="Sofa"
              className="w-20 h-20 object-cover rounded-xl"
            />

            {/* Mobile Status (on image) */}
            <span className="absolute top-1 right-1 text-[10px] px-2 py-[2px] bg-gray-200 text-gray-700 rounded-full md:hidden">
              Complete
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-xl font-semibold">
              3-Seater Fabric Sofa
            </span>
            <span className="text-base text-gray-500 mt-1">
              3mon
            </span>
          </div>
        </div>

        {/* Desktop Status */}
        <span className="hidden md:inline-flex px-4 py-1 text-sm font-medium bg-gray-200 text-gray-700 rounded-full">
          Complete
        </span>

      </div>


      {/* Second Card */}
      <div className="flex items-center justify-between bg-white p-3 rounded-xl shadow-md">

        <div className="flex items-center gap-6">
          <div className="relative">
            <img
              src="https://images.woodenstreet.de/image/cache/data/fabric-sofa/adrick-3-seater-sofa/product/jade-ivory/103-810x702.jpg"
              alt="Sofa"
              className="w-20 h-20 object-cover rounded-xl"
            />

            <span className="absolute top-1 right-1 text-[10px] px-2 py-[2px] bg-gray-200 text-gray-700 rounded-full md:hidden">
              Complete
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-xl font-semibold">
              3-Seater Fabric Sofa
            </span>
            <span className="text-base text-gray-500 mt-1">
              3mon
            </span>
          </div>
        </div>

        <span className="hidden md:inline-flex px-4 py-1 text-sm font-medium bg-gray-200 text-gray-700 rounded-full">
          Complete
        </span>

      </div>

    </div>
  );
}