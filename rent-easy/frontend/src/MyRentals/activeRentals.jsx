import React, { useState } from "react";
import { RentCard } from "../Alldata";
import TabBar from "./tabBar";
import { CalendarIcon, MapPinIcon, TimerIcon, X } from "lucide-react";

export default function ActiveRents() {
  return (
    <>
      <TabBar />
      <div className="w-[95%] mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        {RentCard.map((v, i) => (
          <Card key={i} data={v} />
        ))}
      </div>
    </>
  );
}

function Card({ data }) {
  const [showModal, setShowModal] = useState(false)
  const [issue, setIssue] = useState("")

  const handleSubmit = () => {
    console.log("Maintenance request for:", data.title, "Issue:", issue)
    setIssue("")
    setShowModal(false)
  }

  return (
    <>
      <div className="w-full max-w-lg bg-green-50 rounded-2xl overflow-hidden shadow-xl hover:scale-[1.02] transition-transform duration-300 border border-green-200">

        {/* Image */}
        <div className="relative w-full h-52">
          <img src={data.img} alt="Card" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-green-50 via-green-100/2 to-transparent" />
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="text-green-900 text-2xl font-extrabold tracking-wide">{data.title}</h2>
            <span className="text-green-800 text-lg font-extrabold">Month {data.price}</span>
          </div>

          <div className="flex flex-col gap-2 text-sm text-green-700">
            <div className="flex items-center gap-2">
              <span className="text-green-500"><CalendarIcon /></span>
              <span>{data.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500"><MapPinIcon /></span>
              <span className="truncate">{data.address}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500"><TimerIcon /></span>
              <span>{data.endDate}</span>
            </div>
          </div>

          <div className="border-t border-green-200" />

          <button
            onClick={() => setShowModal(true)}
            className="w-full py-2.5 bg-green-500 hover:bg-green-400 text-white font-bold rounded-xl transition-colors duration-200 text-sm tracking-wide shadow-sm"
          >
            Request Maintenance
          </button>
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/40 z-[500] flex items-center justify-center px-4"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800">Request Maintenance</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>

            {/* Product */}
            <div>
              <p className="text-sm font-semibold text-gray-700">Product</p>
              <p className="text-green-500 font-medium mt-1">{data.title}</p>
            </div>

            {/* Issue textarea */}
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-2">Describe the issue</p>
              <textarea
                rows={4}
                value={issue}
                onChange={(e) => setIssue(e.target.value)}
                placeholder="Please describe the issue you're facing..."
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"
              />
            </div>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              className="w-full bg-green-400 hover:bg-green-500 text-white font-bold py-3 rounded-xl transition"
            >
              Submit Request
            </button>
          </div>
        </div>
      )}
    </>
  );
}