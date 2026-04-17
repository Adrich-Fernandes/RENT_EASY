import React, { useEffect, useState } from "react";
import TabBar from "./tabBar";
import axios from "axios";
import { useUser, SignUp } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { CalendarIcon, MapPinIcon, X, Sofa, ChevronRight, Clock, AlertCircle } from "lucide-react";
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
        setRentals(allActive.filter(r => !["returned", "cancelled"].includes(r.status)));
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
        <div className="w-8 h-8 border-4 border-[#1D3557] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 flex flex-col items-center justify-center px-4">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Sofa className="text-[#1D3557]" size={32} />
            <h1 className="text-4xl font-extrabold text-[#1D3557] tracking-tight">RentEase</h1>
          </div>
          <p className="text-[#457B9D] text-lg font-medium">Create an account to view and manage your active rentals</p>
          <p className="text-[#457B9D] text-sm mt-1">Track deliveries, request maintenance, and more</p>
        </div>
        <SignUp
          routing="hash"
          appearance={{
            elements: {
              card: "shadow-2xl rounded-2xl border border-gray-200",
              headerTitle: "text-[#1D3557] font-extrabold",
              headerSubtitle: "text-[#457B9D]",
              formButtonPrimary: "bg-[#1D3557] hover:bg-[#457B9D] text-white font-bold rounded-xl",
              footerActionLink: "text-[#457B9D] font-semibold",
              formFieldInput: "border border-gray-300 rounded-lg focus:ring-[#1D3557] focus:border-[#1D3557]",
              identityPreviewEditButton: "text-[#1D3557]",
              formFieldLabel: "text-[#1D3557] font-semibold text-sm",
            },
          }}
        />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-[#1D3557] border-t-transparent rounded-full animate-spin" />
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

          {/* Page Content Header */}
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">
              Active <span className="text-[#1D3557]">Leases</span>
            </h1>
            <div className="px-4 py-1.5 bg-[#1D3557]/10 text-[#457B9D] rounded-full text-[11px] font-black uppercase tracking-widest border border-gray-200">
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
              <button className="mt-4 bg-[#1D3557] text-white font-bold px-8 py-3 rounded-2xl shadow-lg shadow-[#1D3557]/20 hover:bg-[#457B9D] transition-all">
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
  const [isExpanded, setIsExpanded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [issue, setIssue] = useState("");
  const [showCancelReturn, setShowCancelReturn] = useState(false);
  const [cancelReturnReason, setCancelReturnReason] = useState("");
  const [otherReason, setOtherReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const product = data.product;

  const endDate = new Date(data.rentalEndDate);
  const now = new Date();
  const daysLeft = Math.ceil((endDate - now) / (1000 * 3600 * 24));
  const isExpiringSoon = daysLeft <= 3 && daysLeft >= 0;
  const isOverdue = daysLeft < 0;

  const submitMaintenance = async () => {
    if (!issue.trim()) return alert("Please describe the issue");
    setIsSubmitting(true);
    try {
      await axios.post(`http://localhost:4000/api/user/${clerkId}/maintenance`, {
        productId: product._id,
        issue,
      });
      alert("Maintenance request sent!");
      setShowModal(false);
      setIssue("");
    } catch (err) {
      alert("Failed to send request");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancelReturn = async () => {
    const reason = cancelReturnReason === "other" ? otherReason : cancelReturnReason;
    if (!reason) return alert("Please select a reason");
    
    setIsSubmitting(true);
    try {
      const endpoint = (data.status === "complete" || data.status === "active" || data.status === "out for delivery")
        ? "return"
        : "cancel";
      
      await axios.patch(`http://localhost:4000/api/user/${clerkId}/${endpoint}/${data._id}`, {
        reason
      });
      
      alert(`${endpoint === "return" ? "Return" : "Cancellation"} request submitted!`);
      window.location.reload();
    } catch (err) {
      alert(err.response?.data?.message || "Action failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const statusSteps = (data.status === "return requested" || data.status === "request conformed" || data.status === "out for pickup" || data.status === "completed" || data.status === "returned")
    ? ["Request Sent", "Request Conformed", "Out for Pickup", "Completed"]
    : ["Confirmed", "Preparing", "Picked up", "Delivered"];

  const currentStep =
    (data.status === "complete" || data.status === "active") ? 3 :
    data.status === "return requested" ? 0 :
    data.status === "request conformed" ? 1 :
    data.status === "out for pickup" ? 2 :
    (data.status === "completed" || data.status === "returned") ? 3 :
    data.status === "picked up" ? 2 :
    data.status === "preparing" ? 1 : 0;

  return (
    <>
      <div className="w-[90%] mx-auto bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
        <div className="flex flex-row">
          {/* Left: Image */}
          <div className="w-52 min-h-full flex-shrink-0">
            <img
              src={product?.imgs?.[0] || product?.image}
              alt={product?.title || product?.name}
              className="w-full h-full object-cover"
              style={{ minHeight: "220px" }}
            />
          </div>

          {/* Right: Summary Information */}
          <div className="flex-1 flex flex-col justify-between p-8 gap-6 min-w-0">
            <div className="flex items-start justify-between">
              <div className="min-w-0">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-2">
                  Subscription #{data._id?.slice(-8).toUpperCase()}
                </p>
                <h2 className="text-xl font-extrabold text-gray-900 truncate">
                  {product?.title || product?.name || "—"}
                </h2>
                <div className="flex items-center gap-4 mt-3">
                   <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-100">
                     <CalendarIcon size={14} className="text-[#457B9D]" />
                     Ends {new Date(data.rentalEndDate).toLocaleDateString("en-IN", { day: "numeric", month: "long" })}
                   </div>
                   <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-100 uppercase tracking-wider">
                     <MapPinIcon size={14} className="text-[#457B9D]" />
                     {data.shippingAddress?.city || "Active Area"}
                   </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all ${
                  data.status === 'return requested' || data.status === 'request conformed' || data.status === 'out for pickup' ? 'bg-orange-50 text-orange-600 border-orange-100' :
                  data.status === 'ordered' ? 'bg-yellow-50 text-yellow-600 border-yellow-100' :
                  'bg-[#1D3557]/10 text-[#457B9D] border-gray-200'
                }`}>
                  {data.status}
                </span>
                <p className="text-xl font-black text-gray-900">₹{data.price}<span className="text-[10px] text-gray-400 font-bold ml-1">/mo</span></p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-50">
              <div className="flex gap-3">
                <button
                  onClick={() => setShowModal(true)}
                  className="px-5 py-2.5 bg-gray-900 text-white text-[11px] font-bold uppercase tracking-widest rounded-xl hover:bg-gray-800 transition-all flex items-center gap-2"
                >
                  <Clock size={14} /> Maintenance
                </button>
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className={`px-5 py-2.5 text-[11px] font-bold uppercase tracking-widest rounded-xl border transition-all flex items-center gap-2 ${
                    isExpanded ? "bg-[#1D3557]/10 text-[#457B9D] border-gray-200" : "bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-[#1D3557]/5 hover:text-[#457B9D]"
                  }`}
                >
                    {isExpanded ? "Close Details" : "View Details"}
                    <ChevronRight size={14} className={`transition-transform duration-300 ${isExpanded ? "rotate-90 text-[#457B9D]" : ""}`} />
                  </button>
                  <Link 
                    to={`/report-issue?subject=${encodeURIComponent("Issue with " + (product?.title || product?.name))}`}
                    className="text-[10px] font-bold text-gray-400 hover:text-[#1D3557] flex items-center gap-1 transition-colors"
                  >
                    <AlertCircle size={12} />
                    Report Problem
                  </Link>
                </div>
              
              {(isExpiringSoon || isOverdue) && (
                <div className={`text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl border flex items-center gap-2 ${
                  isOverdue ? "bg-[#F1FAEE] text-[#1D3557] border-[#A8DADC]" : "bg-orange-50 text-orange-600 border-orange-100"
                }`}>
                  <Clock size={13} />
                  {isOverdue ? "Subscription Overdue" : "Expiring Soon"}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Expandable Details Section */}
        <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isExpanded ? "max-h-[800px] border-t border-gray-100" : "max-h-0"}`}>
          <div className="p-10 bg-gray-50/50 space-y-10">
            
            {/* Status Tracking */}
            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">Order Status Tracking</h3>
                <span className="text-[10px] font-bold text-[#1D3557] italic">Expected Delivery: {new Date(data.deliveryDate || Date.now()).toLocaleDateString("en-IN")}</span>
              </div>
              
              <div className="relative pt-4 pb-8">
                <div className="absolute top-6 left-0 right-0 h-1 bg-gray-200 rounded-full" />
                <div
                  className="absolute top-6 left-0 h-1 bg-[#1D3557] rounded-full transition-all duration-1000"
                  style={{ width: `${(currentStep / (statusSteps.length - 1)) * 100}%` }}
                />
                <div className="flex justify-between relative px-1">
                  {statusSteps.map((step, i) => (
                    <div key={step} className="flex flex-col items-center">
                      <div className={`w-5 h-5 rounded-full border-4 flex items-center justify-center transition-all duration-500 z-10 ${
                        i <= currentStep ? "bg-[#1D3557] border-[#F1FAEE] scale-110 shadow-lg shadow-[#1D3557]/20" : "bg-white border-gray-200"
                      }`} />
                      <span className={`mt-3 text-[10px] font-black uppercase tracking-widest ${i <= currentStep ? "text-gray-900" : "text-gray-300"}`}>
                        {step}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Rental Meta */}
              <div className="space-y-6">
                <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">Detailed Analytics</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                    <p className="text-[9px] font-bold text-gray-400 uppercase mb-1">Total Period</p>
                    <p className="text-sm font-black text-gray-800">
                      {Math.ceil((new Date(data.rentalEndDate) - new Date(data.rentalStartDate)) / (1000*3600*24*30))} Months
                    </p>
                  </div>
                  <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                    <p className="text-[9px] font-bold text-gray-400 uppercase mb-1">Monthly Billing</p>
                    <p className="text-sm font-black text-[#1D3557]">₹{data.price}</p>
                  </div>
                  {data.pickupDate && (
                    <div className="bg-orange-50 p-5 rounded-2xl border border-orange-100 shadow-sm col-span-2">
                       <p className="text-[9px] font-bold text-orange-400 uppercase mb-1">Assigned Pickup Date</p>
                       <p className="text-sm font-black text-orange-700">{new Date(data.pickupDate).toLocaleDateString("en-IN", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Section */}
              <div className="space-y-6">
                <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">Management Actions</h3>
                
                {showCancelReturn ? (
                  <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-xl space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                     <div className="flex justify-between items-center">
                        <p className="text-xs font-bold text-gray-700">Reason for Request</p>
                        <button onClick={() => setShowCancelReturn(false)} className="text-gray-400 hover:text-red-500"><X size={14}/></button>
                     </div>
                     <select
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#A8DADC]"
                        value={cancelReturnReason}
                        onChange={(e) => setCancelReturnReason(e.target.value)}
                      >
                        <option value="">Select a reason</option>
                        <option value="Moving to another city">Moving to another city</option>
                        <option value="No longer needed">No longer needed</option>
                        <option value="Found better alternative">Found better alternative</option>
                        <option value="Product damaged">Product damaged</option>
                        <option value="Monthly rent is high">Monthly rent is high</option>
                        <option value="other">Other</option>
                      </select>
                      
                      {cancelReturnReason === "other" && (
                        <input
                          type="text"
                          placeholder="Describe your reason..."
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#A8DADC]"
                          value={otherReason}
                          onChange={(e) => setOtherReason(e.target.value)}
                        />
                      )}
                      
                      <button
                        onClick={handleCancelReturn}
                        disabled={isSubmitting}
                        className="w-full bg-[#1D3557] text-white font-black py-3.5 rounded-xl uppercase tracking-widest text-[10px] hover:bg-[#457B9D] transition-all shadow-lg shadow-[#1D3557]/20 disabled:opacity-50"
                      >
                        {isSubmitting ? "Processing..." : "Confirm Request"}
                      </button>
                  </div>
                ) : (
                  <div className="flex gap-4">
                    {data.status === "ordered" ? (
                      <button 
                        onClick={() => setShowCancelReturn(true)}
                        className="flex-1 bg-white border-2 border-[#1D3557] text-[#1D3557] font-black py-4 rounded-2xl uppercase tracking-widest text-[10px] hover:bg-[#F1FAEE] transition-all"
                      >
                        Cancel Order
                      </button>
                    ) : (data.status === "complete" || data.status === "active" || data.status === "out for delivery") && (
                      <button 
                         onClick={() => setShowCancelReturn(true)}
                         className="flex-1 bg-white border-2 border-orange-500 text-orange-600 font-black py-4 rounded-2xl uppercase tracking-widest text-[10px] hover:bg-orange-50 transition-all"
                      >
                         Initiate Return
                      </button>
                    )}
                  </div>
                )}
                
                {(data.status === "return requested" || data.status === "request conformed") && !data.pickupDate && (
                  <div className="bg-orange-50 border border-orange-100 p-5 rounded-2xl">
                     <p className="text-[10px] font-black text-orange-600 uppercase tracking-widest mb-1 italic">Processing Return</p>
                     <p className="text-[10px] text-orange-500 leading-relaxed font-semibold">
                       {data.status === "return requested" ? "Admin is reviewing your return request." : "Return request confirmed! We will assign a pickup date shortly."}
                     </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Request Maintenance</h2>
                <p className="text-xs text-gray-400 mt-0.5">We'll get back to you shortly</p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-[#1D3557] transition"
              >
                <X size={18} />
              </button>
            </div>

            <div className="bg-[#F1FAEE] rounded-xl p-4 mb-5 border border-[#A8DADC]">
              <p className="text-[10px] font-bold text-[#457B9D] uppercase tracking-widest mb-0.5">Product</p>
              <p className="text-sm font-semibold text-[#1D3557]">{product?.name || product?.title}</p>
            </div>

            <textarea
              rows={4}
              value={issue}
              onChange={(e) => setIssue(e.target.value)}
              placeholder="Describe the issue..."
              className="w-full border border-gray-100 bg-gray-50 rounded-xl p-4 mb-5 focus:outline-none focus:ring-2 focus:ring-[#A8DADC] text-sm placeholder:text-gray-300"
            />

            <button
              onClick={submitMaintenance}
              className="w-full bg-[#1D3557] hover:bg-[#457B9D] text-white font-bold py-3.5 rounded-xl transition"
            >
              Submit Request
            </button>
          </div>
        </div>
      )}
    </>
  );
}