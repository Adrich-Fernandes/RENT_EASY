import React from "react";

export default function PastCards() {
  return (
    <div className="p-2 w-7xl max-w-1xl mx-auto space-y-4">

      {/* Card */}
      <div className="flex items-center gap-6 bg-white p-2 rounded-xl shadow-md w-90">

        {/* Logo Image */}
        <img
          src="https://images.woodenstreet.de/image/cache/data/fabric-sofa/adrick-3-seater-sofa/product/jade-ivory/103-810x702.jpg"
          alt="Sofa"
          className="w-20 h-20 object-cover rounded-xl"
        />

        {/* Text Section */}
        <div className="flex flex-col">
          <span className="text-xl font-semibold">
            3-Seater Fabric Sofa
          </span>
          <span className="text-base text-gray-500 mt-1">
            3mon
          </span>
        </div>
      </div>
    </div>
  );
}