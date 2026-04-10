import { useState, useEffect } from "react";
import TabBar from "./tabBar";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import UserNavBar from "../components/userNavBar";

export default function Orders() {
  const { user, isLoaded } = useUser();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeRentals, setActiveRentals] = useState([]);
  const [pastRentals, setPastRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("active"); // "active" | "past"

  useEffect(() => {
    if (!user) return;

    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:4000/api/user/${user.id}`);
        const allActive = res.data?.activeRentals || [];
        setActiveRentals(allActive.filter(r => r.status !== "complete"));
        setPastRentals(res.data?.pastRentals || []);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Failed to load orders. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  const handleCompleteRental = async (rentalId) => {
    try {
      await axios.patch(
        `http://localhost:4000/api/user/${user.id}/rental/${rentalId}`
      );
      // Move from active to past locally
      const completed = activeRentals.find((r) => r._id === rentalId);
      setActiveRentals((prev) => prev.filter((r) => r._id !== rentalId));
      if (completed) {
        setPastRentals((prev) => [
          ...prev,
          { ...completed, returnedAt: new Date() },
        ]);
      }
      setSelectedProduct(null);
    } catch (err) {
      console.error(err);
      alert("Failed to complete rental.");
    }
  };

  if (!isLoaded || loading) {
    return (
      <div className="min-h-screen bg-zinc-100">
        <TabBar />
        <div className="flex items-center justify-center h-64">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-4 border-red-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-zinc-400 text-sm">Loading orders...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-zinc-100">
        <TabBar />
        <div className="flex items-center justify-center h-64">
          <p className="text-zinc-500 text-lg">Please sign in to view your orders.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-zinc-100">
        <TabBar />
        <div className="flex flex-col items-center justify-center h-64 gap-4">
          <p className="text-red-500">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const displayedRentals = activeTab === "active" ? activeRentals : pastRentals;

  return (
    <>
      <UserNavBar />
      <div className="flex flex-col md:flex-row min-h-screen bg-zinc-100">
        <TabBar />

        <div className="flex-1 md:ml-64 px-4 py-10 sm:px-8">
          <div className="max-w-5xl mx-auto">

            <h1 className="text-3xl font-black text-zinc-800 mb-8 tracking-tight">Your <span className="text-red-600">Orders</span></h1>

            {/* Tabs */}
            <div className="flex gap-6 mb-8 border-b border-zinc-200">
              <button
                onClick={() => setActiveTab("active")}
                className={`pb-4 text-xs font-black uppercase tracking-widest transition-all ${
                  activeTab === "active"
                    ? "border-b-4 border-red-600 text-red-600"
                    : "border-b-4 border-transparent text-zinc-400 hover:text-zinc-600"
                }`}
              >
                Active ({activeRentals.length})
              </button>
              <button
                onClick={() => setActiveTab("past")}
                className={`pb-4 text-xs font-black uppercase tracking-widest transition-all ${
                  activeTab === "past"
                    ? "border-b-4 border-red-600 text-red-600"
                    : "border-b-4 border-transparent text-zinc-400 hover:text-zinc-600"
                }`}
              >
                History ({pastRentals.length})
              </button>
            </div>

            {displayedRentals.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 bg-white rounded-3xl border border-dashed border-zinc-300">
                <p className="text-zinc-400 font-bold">
                  No {activeTab === "active" ? "active" : "past"} rentals found.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedRentals.map((rental) => (
                  <ProductCard
                    key={rental._id}
                    rental={rental}
                    isPast={activeTab === "past"}
                    onClick={() => setSelectedProduct(rental)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {selectedProduct && (
        <OrderDetails
          rental={selectedProduct}
          isPast={activeTab === "past"}
          close={() => setSelectedProduct(null)}
          onComplete={handleCompleteRental}
          clerkId={user.id}
        />
      )}
    </>
  );
}


function ProductCard({ rental, isPast, onClick }) {
  const product = rental.product;
  const now = new Date();
  const end = new Date(rental.rentalEndDate);
  const isExpired = now > end;

  const statusStyle = (status) => {
    switch (status) {
      case "ordered":          return "bg-yellow-100 text-yellow-700";
      case "dispatch":         return "bg-blue-100 text-blue-700";
      case "out for delivery": return "bg-purple-100 text-purple-700";
      case "complete":         return "bg-red-100 text-red-700";
      default:                 return "bg-gray-100 text-gray-600";
    }
  };

  const statusLabel = rental.status;
  const statusColor = statusStyle(rental.status);

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl overflow-hidden border border-zinc-200 cursor-pointer hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
    >
      <div className="relative h-56 bg-zinc-50 flex items-center justify-center overflow-hidden">
        <img
          src={product?.image || product?.imgs?.[0]}
          alt={product?.name || product?.title}
          className="h-44 w-full object-contain hover:scale-105 transition-transform duration-300"
        />
        <span className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full ${statusColor}`}>
          {statusLabel}
        </span>
      </div>

      <div className="p-4">
        <h2 className="text-base font-semibold text-zinc-800">
          {product?.name || product?.title}
        </h2>
        <p className="text-lg font-bold text-zinc-900 mt-1">₹{rental.price} / mo</p>
        <div className="text-xs text-zinc-400 mt-3 space-y-1">
          <p>Start: {new Date(rental.rentalStartDate).toLocaleDateString()}</p>
          <p>End: {new Date(rental.rentalEndDate).toLocaleDateString()}</p>
          {isPast && rental.returnedAt && (
            <p>Returned: {new Date(rental.returnedAt).toLocaleDateString()}</p>
          )}
        </div>
      </div>
    </div>
  );
}


function OrderDetails({ rental, isPast, close, onComplete, clerkId }) {
  const product = rental.product;
  const [showForm, setShowForm] = useState(false);
  const [reason, setReason] = useState("");
  const [otherReason, setOtherReason] = useState("");

  const steps = ["ordered", "dispatch", "out for delivery", "complete"];
  const currentStep = steps.indexOf(rental.status) !== -1 ? steps.indexOf(rental.status) : 0;
  const progressWidth = ((currentStep + 1) / steps.length) * 100;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!reason) return alert("Please select a reason");
    if (reason === "other" && !otherReason.trim()) return alert("Please enter your reason");

    if (isPast) {
      // Return request — you can wire to a new endpoint later
      alert("Return request submitted");
    } else {
      // Cancel = complete the rental early
      await onComplete(rental._id);
    }

    setShowForm(false);
    setReason("");
    setOtherReason("");
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[999]">
      <div className="bg-white w-[450px] rounded-xl p-6 relative shadow-lg max-h-[90vh] overflow-y-auto">
        <button
          onClick={close}
          className="absolute right-4 top-3 text-zinc-500 text-lg hover:text-black"
        >
          ✕
        </button>

        <img
          src={product?.image || product?.imgs?.[0]}
          className="h-40 w-full object-contain"
          alt={product?.name}
        />

        <h2 className="text-lg font-semibold mt-4">{product?.name || product?.title}</h2>
        <p className="font-bold text-xl mt-1">₹{rental.price} / mo</p>

        <div className="text-sm text-zinc-500 mt-2 space-y-1">
          <p>Start: {new Date(rental.rentalStartDate).toLocaleDateString()}</p>
          <p>End: {new Date(rental.rentalEndDate).toLocaleDateString()}</p>
        </div>

        {/* Order Tracker */}
        <div className="mt-8">
          <div className="flex justify-between text-xs mb-2">
            {steps.map((step, index) => (
              <span
                key={step}
                className={`capitalize font-medium ${
                  index === currentStep
                    ? "text-red-600"
                    : index < currentStep
                    ? "text-red-500"
                    : "text-zinc-400"
                }`}
              >
                {step}
              </span>
            ))}
          </div>
          <div className="relative h-2 bg-zinc-200 rounded">
            <div
              className="absolute top-0 left-0 h-2 bg-red-500 rounded transition-all duration-500"
              style={{ width: `${progressWidth}%` }}
            />
          </div>
        </div>

        {/* Action Button */}
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className={`mt-6 w-full py-2 rounded-lg font-medium text-white ${
              isPast ? "bg-blue-500 hover:bg-blue-600" : "bg-red-500 hover:bg-red-600"
            }`}
          >
            {isPast ? "Return Product" : "Request Cancellation"}
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
              {isPast ? (
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
              className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-medium"
            >
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
