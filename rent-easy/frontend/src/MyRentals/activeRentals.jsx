import React from "react";
import { RentCard } from "../Alldata";

export default function ActiveRents() {
  return (
    <div className="w-[95%] mx-auto p-3 grid grid-cols-1 md:grid-cols-2 gap-6">
      {RentCard.map((v, i) => (
        <Card key={i} data={v} />
      ))}
    </div>
  );
}

function Card({ data }) {
  return (
    <div className="w-full flex flex-col md:flex-row gap-4 bg-white p-3 rounded-xl shadow-md">

      {/* Image */}
      <div className="w-full md:w-[40%]">
        <img
          src={data.img}
          alt="Card"
          className="w-full h-48 md:h-full object-cover rounded-lg"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between flex-1">

        {/* Top Info */}
        <div className="space-y-3">
          <span className="text-xl font-bold">{data.title}</span>

          <div className="flex items-center gap-2">
            <img
              src="https://cdn3d.iconscout.com/3d/premium/thumb/calendar-3d-icon-png-download-8817292.png"
              alt="calendar"
              className="w-4 h-4"
            />
            <span>{data.duration}</span>
          </div>

          <div className="flex items-center gap-2">
            <img
              src="https://static.vecteezy.com/system/resources/previews/016/716/478/non_2x/google-maps-icon-free-png.png"
              alt="location"
              className="w-4 h-3"
            />
            <span>{data.address}</span>
          </div>

          <div className="flex items-center gap-2">
            <img
              src="https://static.thenounproject.com/png/1495285-200.png"
              alt="clock"
              className="w-3 h-3"
            />
            <span className="font-medium">{data.endDate}</span>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-3"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">

          {/* Price */}
          <span className="text-2xl font-bold text-green-600">
            {data.price}
          </span>

          {/* Button */}
          <button className="px-4 py-2 text-green-600 rounded-lg hover:bg-green-200 transition w-fit">
            Request Maintenance
          </button>

        </div>

      </div>
    </div>
  );
}