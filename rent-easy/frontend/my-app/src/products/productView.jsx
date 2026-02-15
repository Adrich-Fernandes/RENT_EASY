export default function ProductView() {
  return (
    <div className="flex flex-col md:flex-row items-center min-h-[60vh]">

      {/* LEFT DIV — UNCHANGED */}
      <div className="w-full md:w-1/2 p-8 flex justify-center">
        <div className="w-full max-w-md flex justify-center">
          <div className="p-3 border-2 border-green-200 aspect-square rounded-2xl overflow-hidden shadow-lg">
            <img
              src="https://media.landmarkshops.in/cdn-cgi/image/h=550,w=550,q=85,fit=cover/homecentre/1000013946386-1000013946386-0705_01-2100.jpg"
              alt="Furniture"
              className="w-full h-full rounded-2xl object-cover"
            />
          </div>
        </div>
      </div>

      {/* RIGHT DIV */}
      <div className="w-full md:w-1/2 p-8 space-y-6">

        {/* Category Badge */}
        <span className="inline-block bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-medium">
          Furniture
        </span>

        {/* Title */}
        <h1 className="text-4xl font-bold">
          Sofa
        </h1>

        {/* Description */}
        <span className="block text-gray-600 text-lg">
          Comfortable modern sofa ideal for living rooms with premium fabric and build quality.
        </span>

        {/* Pricing Box */}
        <div className="bg-green-50 rounded-2xl p-6 flex justify-between items-start">

          {/* Monthly Rent */}
          <div>
            <span className="text-sm text-gray-600">
              Monthly Rent
            </span>
            <h2 className="text-3xl font-bold text-green-600">
              ₹1,000 <span className="text-lg font-medium text-gray-500">/mo</span>
            </h2>
          </div>

          {/* Security Deposit */}
          <div className="text-right">
            <span className="text-sm text-gray-600">
              Security Deposit
            </span>
            <h3 className="text-2xl font-semibold">
              ₹5,000
            </h3>
          </div>

        </div>

        {/* Rental Tenure */}
        <div>
          <p className="font-medium mb-3">
            Select Rental Tenure
          </p>

          <div className="grid grid-cols-3 gap-4">

            {/* 3 Months */}
            <div className="border rounded-xl p-4 text-center hover:border-green-500 cursor-pointer">
              <h3 className="text-2xl font-bold">3</h3>
              <span className="block text-gray-500">months</span>
              <span className="block text-green-600 font-medium mt-1">
                ₹3,000 total
              </span>
            </div>

            {/* 6 Months */}
            <div className="border rounded-xl p-4 text-center hover:border-green-500 cursor-pointer">
              <h3 className="text-2xl font-bold">6</h3>
              <span className="block text-gray-500">months</span>
              <span className="block text-green-600 font-medium mt-1">
                ₹6,000 total
              </span>
            </div>

            {/* 12 Months */}
            <div className="border rounded-xl p-4 text-center hover:border-green-500 cursor-pointer">
              <h3 className="text-2xl font-bold">12</h3>
              <span className="block text-gray-500">months</span>
              <span className="block text-green-600 font-medium mt-1">
                ₹12,000 total
              </span>
            </div>

          </div>
        </div>

        {/* Add to Cart Button */}
        <button className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl transition">
          <span className="text-xl font-bold">
            Add To Cart
          </span>
        </button>

      </div>

    </div>
  );
}
