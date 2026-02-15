export default function Cart() {
  return (
    <div className="w-full min-h-screen flex flex-col lg:flex-row">

      {/* LEFT — full width on mobile, 70% on desktop */}
      <div className="w-full lg:w-[70%] bg-gray-100 p-6 space-y-8">

        {/* TOP SECTION — Cart Products */}
        <div>
          <h2 className="text-2xl font-bold mb-6">
            Cart Products
          </h2>

          {/* CARD */}
          <div className="bg-white rounded-2xl shadow-md p-6 flex justify-between items-start">

            {/* LEFT SIDE OF CARD */}
            <div className="flex gap-4">

              <img
                src="https://media.landmarkshops.in/cdn-cgi/image/h=550,w=550,q=85,fit=cover/homecentre/1000013946386-1000013946386-0705_01-2100.jpg"
                alt="Product"
                className="w-28 h-28 object-cover rounded-xl"
              />

              <div className="space-y-1">
                <span className="block font-bold text-lg">Sofa</span>
                <span className="block text-gray-600">
                  Comfortable modern sofa for living room.
                </span>
                <span className="block text-sm text-gray-500 mt-2">Monthly</span>
                <span className="block text-xl font-bold text-green-600">
                  ₹1,000
                </span>
              </div>

            </div>

            {/* RIGHT SIDE */}
            <div className="flex flex-col items-end justify-between h-full">
              <button className="px-4 py-1 rounded-full border text-red-400 border-red-400 hover:bg-red-500 hover:text-white hover:border-red-500 transition">
                Delete
              </button>

              <div className="text-right mt-12">
                <span className="block text-sm text-gray-500">Security Deposit</span>
                <span className="block text-2xl font-semibold text-gray-600">
                  ₹3,000
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* BOTTOM SECTION — DELIVERY */}
        <div className="bg-white rounded-2xl shadow-md p-6 space-y-6">
          <div className="flex items-center gap-4">
            <img
              src="https://cdn-icons-png.freepik.com/512/14034/14034366.png"
              alt="Delivery"
              className="w-14 h-14 rounded-full object-cover"
            />
            <span className="text-2xl font-bold">Delivery Details</span>
          </div>

          <div className="space-y-2">
            <span className="block font-medium text-gray-700">Delivery Address</span>
            <textarea
              placeholder="Enter your delivery address..."
              className="w-full border rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-green-500"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <span className="block font-medium text-gray-700">Delivery Date</span>
            <input
              type="date"
              className="w-full border rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

      </div>

      {/* RIGHT — full width on mobile, 30% on desktop */}
      <div className="w-full lg:w-[30%] bg-gray-200 p-6">
        Right Content (summary / price breakdown / proceed to pay button etc.)
      </div>

    </div>
  );
}