import { useState, useEffect } from "react";
import TabBar from "./tabBar";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import UserNavBar from "../components/userNavBar";
import Skeleton from "../components/Skeleton";

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
        <UserNavBar />
        <div className="flex flex-col md:flex-row">
          <TabBar />
          <div className="flex-1 md:ml-64 px-4 py-10 sm:px-8">
            <div className="max-w-5xl mx-auto">
              <Skeleton width="40%" height="2.5rem" className="mb-8" />
              <div className="flex gap-6 mb-8 border-b border-zinc-200">
                <Skeleton width="100px" height="2rem" className="mb-2" />
                <Skeleton width="100px" height="2rem" className="mb-2" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl overflow-hidden border border-zinc-200 p-0">
                    <Skeleton height="14rem" className="rounded-none" />
                    <div className="p-4 space-y-3">
                      <Skeleton width="70%" height="1.25rem" />
                      <Skeleton width="40%" height="1.5rem" />
                      <div className="space-y-1 pt-2">
                        <Skeleton width="80%" height="0.75rem" />
                        <Skeleton width="80%" height="0.75rem" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
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

            <h1 className="text-3xl font-black text-zinc-800 mb-8 tracking-tight">Your <span className="text-[#1D3557]">Orders</span></h1>

            {/* Tabs */}
            <div className="flex gap-6 mb-8 border-b border-zinc-200">
              <button
                onClick={() => setActiveTab("active")}
                className={`pb-4 text-xs font-black uppercase tracking-widest transition-all ${
                    activeTab === "active"
                    ? "border-b-4 border-[#1D3557] text-[#1D3557]"
                    : "border-b-4 border-transparent text-zinc-400 hover:text-zinc-600"
                }`}
              >
                Active ({activeRentals.length})
              </button>
              <button
                onClick={() => setActiveTab("past")}
                className={`pb-4 text-xs font-black uppercase tracking-widest transition-all ${
                    activeTab === "past"
                    ? "border-b-4 border-[#1D3557] text-[#1D3557]"
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
      case "order conformed":  return "bg-[#A8DADC]/30 text-[#457B9D]";
      case "shiped":           return "bg-[#A8DADC]/40 text-[#457B9D]";
      case "out for delivery": return "bg-[#1D3557]/10 text-[#1D3557]";
      case "delivered":        return "bg-[#1D3557]/10 text-[#1D3557]";
      case "active":           return "bg-[#1D3557]/10 text-[#1D3557]";
      case "cancelled":        return "bg-gray-100 text-gray-400 line-through";
      case "return requested": return "bg-orange-100 text-orange-700";
      case "request conformed":return "bg-[#A8DADC]/30 text-[#457B9D] font-bold";
      case "out for pickup":   return "bg-[#A8DADC]/50 text-[#457B9D]";
      case "pickup complete":  return "bg-[#1D3557]/10 text-[#1D3557]";
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

  const isReturn = ["return requested", "request conformed", "out for pickup", "pickup complete"].includes(rental.status);
  const steps = isReturn 
    ? ["return requested", "request conformed", "out for pickup", "pickup complete"]
    : ["ordered", "order conformed", "shiped", "out for delivery", "delivered"];
  
  const currentStep = steps.indexOf(rental.status) !== -1 ? steps.indexOf(rental.status) : (rental.status === "active" ? 4 : 0);
  const progressWidth = ((currentStep + 1) / steps.length) * 100;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!reason) return alert("Please select a reason");
    if (reason === "other" && !otherReason.trim()) return alert("Please enter your reason");

    const submitReason = reason === "other" ? otherReason : reason;

    try {
      if (isPast || rental.status === "complete" || rental.status === "active") {
        // Return request
        await axios.patch(`http://localhost:4000/api/user/${clerkId}/return/${rental._id}`, {
          reason: submitReason
        });
        alert("Return request submitted successfully");
      } else {
        // Cancel request
        await axios.patch(`http://localhost:4000/api/user/${clerkId}/cancel/${rental._id}`, {
          reason: submitReason
        });
        alert("Cancellation request submitted successfully");
      }
      window.location.reload(); // Refresh to show new status
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Action failed");
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
          <p className={`font-bold mt-2 ${rental.paymentType === "Online" ? "text-[#457B9D]" : "text-[#1D3557]"}`}>
            Payment Method: {rental.paymentType || "Cash"}
          </p>
          {rental.pickupDate && (
            <p className="text-orange-600 font-bold bg-orange-50 p-2 rounded-lg mt-2">
              Assigned Pickup: {new Date(rental.pickupDate).toLocaleDateString()}
            </p>
          )}
        </div>

        {/* Order Tracker */}
        <div className="mt-8">
          <div className="flex justify-between text-xs mb-2">
            {steps.map((step, index) => (
              <span
                key={step}
                className={`capitalize font-medium ${
                  index === currentStep
                    ? "text-[#1D3557]"
                    : index < currentStep
                    ? "text-[#457B9D]"
                    : "text-zinc-400"
                }`}
              >
                {step}
              </span>
            ))}
          </div>
          <div className="relative h-2 bg-zinc-200 rounded">
            <div
              className="absolute top-0 left-0 h-2 bg-[#1D3557] rounded transition-all duration-500"
              style={{ width: `${progressWidth}%` }}
            />
          </div>
        </div>

        {/* Action Button */}
        {!showForm && rental.status !== "cancelled" && !["return requested", "request conformed", "out for pickup", "returned", "completed"].includes(rental.status) && (
          <button
            onClick={() => setShowForm(true)}
            className={`mt-6 w-full py-2 rounded-lg font-medium text-white ${
              (isPast || rental.status === "complete" || rental.status === "active") ? "bg-[#457B9D] hover:bg-[#1D3557]" : "bg-[#1D3557] hover:bg-[#457B9D]"
            }`}
          >
            {(isPast || rental.status === "complete" || rental.status === "active") ? "Return Product" : "Request Cancellation"}
          </button>
        )}

        {(rental.status === "cancelled" || ["return requested", "request conformed", "out for pickup", "returned", "completed"].includes(rental.status)) && (
            <div className={`mt-6 w-full py-2 rounded-lg font-medium text-center text-sm border ${
                rental.status === "cancelled" ? "bg-gray-50 text-gray-400 border-gray-200" : 
                (rental.status === "returned" || rental.status === "completed") ? "bg-red-50 text-red-600 border-red-100" :
                "bg-orange-50 text-orange-600 border-orange-100"
            }`}>
                {rental.status === "cancelled" ? "This order was cancelled" : 
                 (rental.status === "returned" || rental.status === "completed") ? "This rental is completed" :
                 "Return request is being processed"}
            </div>
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
              {(isPast || rental.status === "complete" || rental.status === "active") ? (
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
