import UserNavBar from "../../components/userNavBar";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function ProductView() {

  const { state } = useLocation()
  const navigate = useNavigate()
  const product = state?.product

  const [selectedTenure, setSelectedTenure] = useState(3)
  const tenureOptions = [3, 6, 12]

  // if somehow opened with no data, go back
  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <p className="text-gray-500">No product selected.</p>
        <button onClick={() => navigate("/productlist")} className="px-4 py-2 bg-green-600 text-white rounded-lg">
          Back to Products
        </button>
      </div>
    )
  }

  return (
    <>
    <UserNavBar />
    <div className="flex flex-col md:flex-row items-center min-h-[60vh]">

      {/* LEFT — IMAGE */}
      <div className="w-full md:w-1/2 p-8 flex justify-center">
        <div className="w-full max-w-md flex justify-center">
          <div className="p-3 border-2 border-green-200 aspect-square rounded-2xl overflow-hidden shadow-lg">
            <img
              src={product.img}
              alt={product.title}
              className="w-full h-full rounded-2xl object-cover"
            />
          </div>
        </div>
      </div>

      {/* RIGHT — DETAILS */}
      <div className="w-full md:w-1/2 p-8 space-y-6">

        {/* Category Badge */}
        <span className="inline-block bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-medium">
          {product.category}
        </span>

        {/* Title */}
        <h1 className="text-4xl font-bold">{product.title}</h1>

        {/* Description */}
        <span className="block text-gray-600 text-lg">{product.description}</span>

        {/* Pricing Box */}
        <div className="bg-green-50 rounded-2xl p-6 flex justify-between items-start">
          <div>
            <span className="text-sm text-gray-600">Monthly Rent</span>
            <h2 className="text-3xl font-bold text-green-600">
              ₹{product.rent} <span className="text-lg font-medium text-gray-500">/mo</span>
            </h2>
          </div>
          <div className="text-right">
            <span className="text-sm text-gray-600">Security Deposit</span>
            <h3 className="text-2xl font-semibold">₹{product.deposit}</h3>
          </div>
        </div>

        {/* Rental Tenure */}
        <div>
          <p className="font-medium mb-3">Select Rental Tenure</p>
          <div className="grid grid-cols-3 gap-4">
            {tenureOptions.map((months) => (
              <div
                key={months}
                onClick={() => setSelectedTenure(months)}
                className={`border rounded-xl p-4 text-center cursor-pointer transition ${
                  selectedTenure === months
                    ? "border-green-500 bg-green-50"
                    : "hover:border-green-400"
                }`}
              >
                <h3 className="text-2xl font-bold">{months}</h3>
                <span className="block text-gray-500">months</span>
                <span className="block text-green-600 font-medium mt-1">
                  ₹{product.rent * months} total
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Add to Cart Button */}
        <button className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl transition">
          <span className="text-xl font-bold">Add To Cart</span>
        </button>

      </div>

    </div>
    </>
  );
}