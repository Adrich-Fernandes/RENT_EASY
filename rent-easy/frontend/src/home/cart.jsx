import { useRef, useState } from "react";
import { Trash2, MapPin, Calendar, ArrowRight } from "lucide-react";

export default function Cart() {
  const [date, setDate] = useState("");
  const dateRef = useRef(null);

  const getMinDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 3);
    return today.toISOString().split("T")[0];
  };

  const openCalendar = () => {
    if (dateRef.current) {
      dateRef.current.showPicker
        ? dateRef.current.showPicker()
        : dateRef.current.click();
    }
  };

  return (
    <div className="w-full flex flex-col lg:flex-row items-start gap-6 p-6 bg-gray-100 min-h-screen">

      {/* ================= LEFT 70% ================= */}
      <div className="w-full lg:flex-[7] space-y-6">

        {/* PRODUCT CARD */}
        <div className="bg-white shadow-md rounded-xl p-5">
          <div className="flex flex-col sm:flex-row gap-6">

            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThLYc78GrRv6REyaFlMmrkn8GA-a8llMpiSw&s"
              alt="product"
              className="w-28 h-28 object-cover rounded-lg flex-shrink-0"
            />

            <div className="flex-1 flex flex-col justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold">
                  LG 260L Double Door Refrigerator
                </h2>
                <p className="text-gray-600 text-sm mt-1">
                  Premium cooling solution for your home.
                </p>
              </div>

              <div className="flex items-center gap-6">
                <div>
                  <span className="block text-sm text-gray-500">Monthly Rent</span>
                  <span className="block text-green-600 font-bold text-lg">₹5,394</span>
                </div>
                <div>
                  <span className="block text-sm text-gray-500">Security Deposit</span>
                  <span className="block font-bold text-lg">₹8,000</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end justify-between gap-4">
              <Trash2
                className="text-red-500 cursor-pointer hover:text-red-600 transition"
                size={20}
              />
              <div className="text-right">
                <span className="block text-gray-400 text-sm">Total Rent</span>
                <span className="block font-bold text-xl text-gray-800">₹8,394</span>
              </div>
            </div>

          </div>
        </div>

        {/* DELIVERY SECTION */}
        <div className="bg-white shadow-md rounded-xl p-5 space-y-4">

          <div className="flex items-center gap-2">
            <MapPin className="text-green-600" size={20} />
            <span className="font-bold text-lg">Delivery Details</span>
          </div>

          <div>
            <span className="block text-sm text-gray-600 mb-1">Delivery Address</span>
            <textarea
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              rows="3"
            />
          </div>

          <div>
            <span className="block text-sm text-gray-600 mb-2">Delivery Date</span>
            <div className="relative flex items-center gap-2">
              <Calendar className="text-green-600" size={20} />
              <button
                type="button"
                onClick={openCalendar}
                className="px-4 py-2 border rounded-lg hover:bg-gray-100 text-sm"
              >
                {date ? date : "Select Date"}
              </button>
              <input
                ref={dateRef}
                type="date"
                value={date}
                min={getMinDate()}
                onChange={(e) => setDate(e.target.value)}
                className="absolute opacity-0 pointer-events-none"
              />
            </div>
          </div>

        </div>

      </div>

      {/* ================= RIGHT 30% ================= */}
      <div className="w-full lg:flex-[3]">

        <div className="bg-white rounded-2xl shadow-md p-6 space-y-6">

          <h2 className="text-lg font-semibold">Order Summary</h2>

          <div className="space-y-3 text-gray-600 text-sm">
            <div className="flex justify-between">
              <span>LG 260L Double Door Refrigerator (6mo)</span>
              <span className="font-medium text-gray-800">₹5,394</span>
            </div>
            <div className="flex justify-between">
              <span>Luxury sofa (3mo)</span>
              <span className="font-medium text-gray-800">₹3,000</span>
            </div>
          </div>

          <hr />

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Rent</span>
              <span className="font-semibold text-gray-800">₹8,394</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Security Deposit</span>
              <span className="font-semibold text-gray-800">₹8,000</span>
            </div>
          </div>

          <hr />

          <div className="flex justify-between items-center">
            <span className="font-semibold text-lg">Total Payable</span>
            <span className="font-bold text-lg text-green-600">₹16,394</span>
          </div>

          <button className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 rounded-xl flex items-center justify-center gap-2 transition">
            Place Order
            <ArrowRight size={18} />
          </button>

          <p className="text-xs text-gray-500 text-center">
            Deposit is refundable upon return of products in good condition
          </p>

        </div>

      </div>

    </div>
  );
}



function CountTotal(){
   <div className="flex justify-between">
        <span>{name}</span>
        <span className="font-medium text-gray-800">{price}</span>
    </div> 
}