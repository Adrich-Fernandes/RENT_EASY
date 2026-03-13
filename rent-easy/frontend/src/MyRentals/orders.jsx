import { useState } from "react";
import TabBar from "./tabBar";
import { products } from "../Alldata";

export default function Orders() {

  const [selectedProduct, setSelectedProduct] = useState(null)

  return (
    <div className="min-h-screen bg-zinc-100">

      <TabBar />

      <div className="px-4 py-10 sm:px-8">

        <h1 className="text-2xl font-semibold text-zinc-800 mb-8 max-w-5xl mx-auto">
          Orders
        </h1>

        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => setSelectedProduct(product)}
            />
          ))}
        </div>

      </div>

      {selectedProduct && (
        <OrderDetails
          product={selectedProduct}
          close={() => setSelectedProduct(null)}
        />
      )}

    </div>
  );
}



function ProductCard({ product, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl overflow-hidden border border-zinc-200 cursor-pointer hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
    >
      <div
        className={`relative ${product.bg} h-56 flex items-center justify-center overflow-hidden`}
      >
        <img
          src={product.image}
          alt={product.title}
          className="h-44 w-full object-contain hover:scale-105 transition-transform duration-300"
        />

        <span
          className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full ${product.statusColor}`}
        >
          {product.status}
        </span>
      </div>

      <div className="p-4">
        <h2 className="text-base font-semibold text-zinc-800">
          {product.title}
        </h2>

        <p className="text-lg font-bold text-zinc-900 mt-1">
          {product.price}
        </p>

        <p className="text-xs text-zinc-400 mt-3 leading-relaxed">
          {product.description}
        </p>
      </div>
    </div>
  );
}



function OrderDetails({ product, close }) {

  const steps = [
    "ordered",
    "dispatch",
    "out for delivery",
    "complete"
  ]

  const currentStep = steps.indexOf(product.status?.toLowerCase())
  const progressWidth = ((currentStep + 1) / steps.length) * 100

  const [showForm, setShowForm] = useState(false)
  const [reason, setReason] = useState("")
  const [otherReason, setOtherReason] = useState("")

  const isComplete = product.status?.toLowerCase() === "complete"

  const handleSubmit = (e) => {
    e.preventDefault()

    if (reason === "") {
      alert("Please select a reason")
      return
    }

    if (reason === "other" && otherReason.trim() === "") {
      alert("Please enter your reason")
      return
    }

    const finalReason = reason === "other" ? otherReason : reason

    console.log(isComplete ? "Return Request:" : "Cancellation Request:", finalReason)

    alert(isComplete ? "Return request submitted" : "Cancellation request submitted")

    setShowForm(false)
    setReason("")
    setOtherReason("")
  }

  return (

    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[999]">

      <div className="bg-white w-[450px] rounded-xl p-6 relative shadow-lg">

        <button
          onClick={close}
          className="absolute right-4 top-3 text-zinc-500 text-lg hover:text-black"
        >
          ✕
        </button>

        <img
          src={product.image}
          className="h-40 w-full object-contain"
        />

        <h2 className="text-lg font-semibold mt-4">
          {product.title}
        </h2>

        <p className="font-bold text-xl mt-1">
          {product.price}
        </p>

        <p className="text-sm text-zinc-500 mt-2">
          {product.description}
        </p>


        {/* Order Tracker */}

        <div className="mt-8">

          <div className="flex justify-between text-xs mb-2">

            {steps.map((step, index) => (

              <span
                key={step}
                className={`capitalize font-medium ${
                  index === currentStep
                    ? "text-green-600"
                    : index < currentStep
                    ? "text-green-500"
                    : "text-zinc-400"
                }`}
              >
                {step}
              </span>

            ))}

          </div>

          <div className="relative h-2 bg-zinc-200 rounded">

            <div
              className="absolute top-0 left-0 h-2 bg-green-500 rounded transition-all duration-500"
              style={{ width: `${progressWidth}%` }}
            />

          </div>

        </div>


        {/* Action Button */}

        {!showForm && (

          <button
            onClick={() => setShowForm(true)}
            className={`mt-6 w-full py-2 rounded-lg font-medium text-white ${
              isComplete
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-red-500 hover:bg-red-600"
            }`}
          >
            {isComplete ? "Return Product" : "Request Cancellation"}
          </button>

        )}


        {/* Form */}

        {showForm && (

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">

            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full border rounded-lg p-2"
            >
              <option value="">Select a reason</option>

              {isComplete ? (
                <>
                  <option value="damaged">Product damaged</option>
                  <option value="wrong item">Wrong item received</option>
                  <option value="not satisfied">Not satisfied with product</option>
                  <option value="other">Other</option>
                </>
              ) : (
                <>
                  <option value="changed my mind">Changed my mind</option>
                  <option value="no need">No need</option>
                  <option value="expensive">Expensive</option>
                  <option value="better deal">Got best deal somewhere else</option>
                  <option value="other">Other</option>
                </>
              )}

            </select>


            {reason === "other" && (

              <textarea
                value={otherReason}
                onChange={(e) => setOtherReason(e.target.value)}
                placeholder="Enter your issue"
                className="w-full border rounded-lg p-2"
              />

            )}

            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-medium"
            >
              Submit
            </button>

          </form>

        )}

      </div>

    </div>

  )
}