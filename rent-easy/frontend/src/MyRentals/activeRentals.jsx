// ActiveRents.jsx
import React, { useEffect, useState } from "react";
import TabBar from "./tabBar";
import axios from "axios";
import { useUser, SignUp } from "@clerk/clerk-react";
import { CalendarIcon, MapPinIcon, X, Sofa } from "lucide-react";
import UserNavBar from "../components/userNavBar";

export default function ActiveRents() {
  const { user, isLoaded } = useUser();
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserRentals = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/user/${user.id}`);
        const allActive = res.data?.activeRentals || [];
        setRentals(allActive.filter(r => r.status === "complete"));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchUserRentals();
  }, [user]);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-red-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-emerald-50 flex flex-col items-center justify-center px-4">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Sofa className="text-red-500" size={32} />
            <h1 className="text-4xl font-extrabold text-red-900 tracking-tight">RentEase</h1>
          </div>
          <p className="text-red-700 text-lg font-medium">Create an account to view and manage your active rentals</p>
          <p className="text-red-500 text-sm mt-1">Track deliveries, request maintenance, and more</p>
        </div>
        <SignUp
          routing="hash"
          appearance={{
            elements: {
              card: "shadow-2xl rounded-2xl border border-red-100",
              headerTitle: "text-red-900 font-extrabold",
              headerSubtitle: "text-red-600",
              formButtonPrimary: "bg-red-500 hover:bg-red-400 text-white font-bold rounded-xl",
              footerActionLink: "text-red-600 hover:text-red-500 font-semibold",
              formFieldInput: "border border-red-200 rounded-lg focus:ring-red-400 focus:border-red-400",
              identityPreviewEditButton: "text-red-600",
              formFieldLabel: "text-red-800 font-semibold text-sm",
            },
          }}
        />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-red-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      <UserNavBar />
      <div className="flex flex-col md:flex-row min-h-screen bg-[#fafafa]">
        <TabBar />
        {/* Main content — offset for sidebar on desktop */}
        <div className="flex-1 md:ml-64 p-6 md:p-12 flex flex-col gap-8">
          
          {/* Page Content Header (Context) */}
          <div className="flex items-center justify-between mb-2">
             <h1 className="text-3xl font-black text-gray-900 tracking-tight">Active <span className="text-red-600">Leases</span></h1>
             <div className="px-4 py-1.5 bg-red-100 text-red-700 rounded-full text-[11px] font-black uppercase tracking-widest border border-red-200">
                {rentals.length} Deliveries
             </div>
          </div>

          {rentals.length === 0 ? (
            <div className="bg-white rounded-[2.5rem] border border-gray-100 p-20 flex flex-col items-center gap-6 shadow-sm">
               <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center">
                  <Sofa size={32} className="text-gray-300" />
               </div>
               <div className="text-center">
                  <p className="text-xl font-bold text-gray-900">No active rentals found</p>
                  <p className="text-sm text-gray-400 mt-2">Browse our products to start your first lease!</p>
               </div>
               <button className="mt-4 bg-red-600 text-white font-bold px-8 py-3 rounded-2xl shadow-lg shadow-red-200 hover:bg-red-700 transition-all">
                  Explore Catalog
               </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {rentals.map((rental) => (
                <Card key={rental._id} data={rental} clerkId={user.id} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function Card({ data, clerkId }) {
  const [showModal, setShowModal] = useState(false);
  const [issue, setIssue] = useState("");
  const product = data.product;

  const submitMaintenance = async () => {
    if (!issue) return alert("Please describe the issue");
    try {
      await axios.post(`http://localhost:4000/api/user/${clerkId}/maintenance`, {
        productId: product._id,
        issue,
      });
      alert("Request sent successfully!");
      setShowModal(false);
      setIssue("");
    } catch (err) {
      console.error(err);
      alert("Failed to send request");
    }
  };

  const statusSteps = ["Confirmed", "Preparing", "Picked up", "Delivered"];
  const currentStep =
    data.status === "complete" ? 3 :
    data.status === "picked up" ? 2 :
    data.status === "preparing" ? 1 : 0;

  return (
    <>
      <div className="w-[85%] mx-auto bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-row">

        {/* Left: Image */}
        <div className="w-44 min-h-full flex-shrink-0">
          <img
            src={product?.imgs?.[0] || product?.image}
            alt={product?.title || product?.name}
            className="w-full h-full object-cover"
            style={{ minHeight: "180px" }}
          />
        </div>

        {/* Right: All Details */}
        <div className="flex-1 flex flex-col justify-between p-6 gap-4 min-w-0">

          {/* Row 1: Name + Price + Button */}
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1">
                Order #{data._id?.slice(-8).toUpperCase()}
              </p>
              <h2 className="text-lg font-bold text-gray-900 truncate">
                {product?.title || product?.name || "—"}
              </h2>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="text-right">
                <p className="text-[10px] text-gray-400 uppercase tracking-widest">Monthly</p>
                <p className="text-base font-bold text-gray-900">₹{data.price}</p>
              </div>
              <button
                onClick={() => setShowModal(true)}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-xs font-semibold rounded-xl transition"
              >
                Maintenance
              </button>
            </div>
          </div>

          {/* Row 2: Progress tracker */}
          <div className="relative flex items-center justify-between px-1">
            {/* background line */}
            <div className="absolute top-2 left-0 right-0 h-[2px] bg-gray-100 rounded-full" />
            {/* filled line */}
            <div
              className="absolute top-2 left-0 h-[2px] bg-red-500 rounded-full transition-all duration-700"
              style={{ width: `${(currentStep / (statusSteps.length - 1)) * 100}%` }}
            />
            {statusSteps.map((step, i) => {
              const isCompleted = i <= currentStep;
              const isCurrent = i === currentStep;
              return (
                <div key={step} className="relative z-10 flex flex-col items-center">
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all duration-300
                    ${isCompleted ? "bg-red-500 border-red-500" : "bg-white border-gray-300"}
                    ${isCurrent ? "ring-4 ring-red-100" : ""}`}
                  >
                    {isCompleted && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                  <span className={`text-[10px] mt-1.5 font-semibold whitespace-nowrap
                    ${isCompleted ? "text-red-500" : "text-gray-300"}`}>
                    {step}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Row 3: Date + Address */}
          <div className="flex flex-wrap items-center gap-5 pt-3 border-t border-gray-50 text-xs text-gray-500">
            <div className="flex items-center gap-2">
              <CalendarIcon size={13} className="text-red-400" />
              <span>
                {data.rentalStartDate ? new Date(data.rentalStartDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" }) : "—"}
                <span className="mx-1.5 text-gray-300">→</span>
                {data.rentalEndDate ? new Date(data.rentalEndDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" }) : "—"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MapPinIcon size={13} className="text-red-400" />
              <span>Delivery Address</span>
            </div>
          </div>

        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Request Maintenance</h2>
                <p className="text-xs text-gray-400 mt-0.5">We'll get back to you shortly</p>
              </div>
              <button onClick={() => setShowModal(false)} className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-red-500 transition">
                <X size={18} />
              </button>
            </div>

            <div className="bg-red-50 rounded-xl p-4 mb-5 border border-red-100">
              <p className="text-[10px] font-bold text-red-400 uppercase tracking-widest mb-0.5">Product</p>
              <p className="text-sm font-semibold text-red-700">{product?.name || product?.title}</p>
            </div>

            <textarea
              rows={4}
              value={issue}
              onChange={(e) => setIssue(e.target.value)}
              placeholder="Describe the issue..."
              className="w-full border border-gray-100 bg-gray-50 rounded-xl p-4 mb-5 focus:outline-none focus:ring-2 focus:ring-red-100 text-sm placeholder:text-gray-300"
            />

            <button
              onClick={submitMaintenance}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3.5 rounded-xl transition"
            >
              Submit Request
            </button>
          </div>
        </div>
      )}
    </>
  );
}