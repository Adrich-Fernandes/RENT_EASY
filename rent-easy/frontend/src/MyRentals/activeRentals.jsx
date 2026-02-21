import React from "react";

export default function PropertyCard() {
  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">

      {/* Card */}
      <div className="flex gap-6 bg-white p-6 rounded-xl shadow-md">

        {/* Left Image */}
        <div className="w-40 flex-shrink-0">
          <img
            src="https://images.woodenstreet.de/image/cache/data/fabric-sofa/adrick-3-seater-sofa/product/jade-ivory/103-810x702.jpg"
            alt="Card"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        {/* Right Content */}
        <div className="flex flex-col justify-between flex-1">

          {/* Top Info */}
          <div className="space-y-4">
            <span className="text-2xl font-bold">
              Luxury Sofa
            </span>

            <div className="flex items-center gap-3">
              <img
                src="https://cdn3d.iconscout.com/3d/premium/thumb/calendar-3d-icon-png-download-8817292.png"
                alt="calendar"
                className="w-5 h-5"
              />
              <span>May 26, 2026</span>
            </div>

            <div className="flex items-center gap-3">
              <img
                src="https://static.vecteezy.com/system/resources/previews/016/716/478/non_2x/google-maps-icon-free-png.png"
                alt="location"
                className="w-5 h-5"
              />
              <span>Vinland Saga</span>
            </div>

            <div className="flex items-center gap-3">
              <img
                src="https://static.thenounproject.com/png/1495285-200.png"
                alt="clock"
                className="w-5 h-5"
              />
              <span className="font-medium">
                3 months
              </span>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="flex items-center justify-between mt-6">
            <span className="text-3xl font-bold text-green-600">
              $1000
            </span>

            <button className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
              Request Maintenance
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}