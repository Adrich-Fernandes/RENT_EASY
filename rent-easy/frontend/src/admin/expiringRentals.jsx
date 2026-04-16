import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Clock, AlertTriangle, CheckCircle, Package, X } from 'lucide-react';
import AdminNavBar from '../components/adminNavBar';

export default function ExpiringRentals() {
  const [expiringRents, setExpiringRents] = useState([]);
  const [overdueRents, setOverdueRents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRental, setSelectedRental] = useState(null);

  const handleCloseSubscription = async () => {
    if (!selectedRental) return;
    try {
      await axios.put(`http://localhost:4000/api/rent/updateStatus/${selectedRental._id}`, { status: "complete" });
      
      setExpiringRents(prev => prev.filter(r => r._id !== selectedRental._id));
      setOverdueRents(prev => prev.filter(r => r._id !== selectedRental._id));
      setSelectedRental(null);
    } catch (err) {
      console.error("Failed to close subscription", err);
      alert("Failed to close subscription");
    }
  };

  useEffect(() => {
    const fetchExpiringRents = async () => {
      try {
        const rentsRes = await axios.get("http://localhost:4000/api/rent/allRents");
        const rents = rentsRes.data;

        const expiring = [];
        const overdue = [];

        rents.forEach((r) => {
          if (r.status === "active" && r.rentalEndDate) {
            const endDate = new Date(r.rentalEndDate);
            const now = new Date();
            const timeDiff = endDate.getTime() - now.getTime();
            const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));

            const rentalWithDays = { ...r, daysLeft };

            if (daysLeft < 0) {
              overdue.push(rentalWithDays);
            } else if (daysLeft <= 3) {
              expiring.push(rentalWithDays);
            }
          }
        });

        // Sort both by daysLeft (most urgent first)
        overdue.sort((a, b) => a.daysLeft - b.daysLeft);
        expiring.sort((a, b) => a.daysLeft - b.daysLeft);

        setExpiringRents(expiring);
        setOverdueRents(overdue);
      } catch (err) {
        console.error("Failed to fetch rents:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchExpiringRents();
  }, []);

  return (
    <>
      <AdminNavBar />
      
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-4 border-[#E63946] border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="w-full p-4 md:p-8 space-y-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Expiring & Overdue Rentals</h1>
            <p className="text-sm text-gray-500 mt-1">Manage subscriptions that require attention</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* OVERDUE TABLE */}
            <div className="bg-white rounded-xl shadow-[0_0_20px_2px_rgba(230,57,70,0.05)] border border-[#E63946]/20 overflow-hidden">
              <div className="p-5 border-b border-[#F1FAEE] bg-[#F1FAEE]/30 flex items-center gap-3">
                <AlertTriangle size={20} className="text-[#E63946]" />
                <h2 className="font-semibold text-[#1D3557]">Overdue Subscriptions</h2>
                <div className="ml-auto bg-[#E63946]/10 text-[#E63946] text-xs font-bold px-2.5 py-0.5 rounded-full">
                  {overdueRents.length}
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-50 text-gray-500 text-xs uppercase border-b border-gray-100">
                    <tr>
                      <th className="px-5 py-4">User</th>
                      <th className="px-5 py-4">Product</th>
                      <th className="px-5 py-4">Overdue By</th>
                    </tr>
                  </thead>
                  <tbody>
                    {overdueRents.length > 0 ? overdueRents.map((r, i) => (
                      <tr 
                        key={r._id || i} 
                        onClick={() => setSelectedRental(r)}
                        className="border-b last:border-b-0 hover:bg-gray-50 transition cursor-pointer"
                      >
                        <td className="px-5 py-4 font-medium text-gray-800">
                          {r.user?.name || "Unknown"}
                          <div className="text-[10px] text-gray-400 font-normal">{r.user?.email || ""}</div>
                        </td>
                        <td className="px-5 py-4 text-gray-600">
                          {r.product?.title || r.product?.name || "—"}
                        </td>
                        <td className="px-5 py-4">
                          <span className="px-2.5 py-1 text-xs rounded-full font-bold bg-[#E63946]/10 text-[#E63946] border border-[#E63946]/20 shadow-sm whitespace-nowrap">
                            {Math.abs(r.daysLeft)} {Math.abs(r.daysLeft) === 1 ? 'day' : 'days'}
                          </span>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan={3} className="px-5 py-8 text-center text-gray-400">
                          <CheckCircle className="mx-auto mb-2 text-[#E63946]/50" size={24} />
                          No overdue rentals
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* EXPIRING SOON TABLE */}
            <div className="bg-white rounded-xl shadow-[0_0_20px_2px_rgba(249,115,22,0.05)] border border-orange-100 overflow-hidden">
              <div className="p-5 border-b border-orange-50 bg-orange-50/30 flex items-center gap-3">
                <Clock size={20} className="text-orange-500" />
                <h2 className="font-semibold text-orange-900">Expiring Soon (≤ 3 Days)</h2>
                <div className="ml-auto bg-orange-100 text-orange-700 text-xs font-bold px-2.5 py-0.5 rounded-full">
                  {expiringRents.length}
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-50 text-gray-500 text-xs uppercase border-b border-gray-100">
                    <tr>
                      <th className="px-5 py-4">User</th>
                      <th className="px-5 py-4">Product</th>
                      <th className="px-5 py-4">Time Left</th>
                    </tr>
                  </thead>
                  <tbody>
                    {expiringRents.length > 0 ? expiringRents.map((r, i) => (
                      <tr 
                        key={r._id || i} 
                        onClick={() => setSelectedRental(r)}
                        className="border-b last:border-b-0 hover:bg-gray-50 transition cursor-pointer"
                      >
                        <td className="px-5 py-4 font-medium text-gray-800">
                          {r.user?.name || "Unknown"}
                          <div className="text-[10px] text-gray-400 font-normal">{r.user?.email || ""}</div>
                        </td>
                        <td className="px-5 py-4 text-gray-600">
                          {r.product?.title || r.product?.name || "—"}
                        </td>
                        <td className="px-5 py-4">
                          <span className="px-2.5 py-1 text-xs rounded-full font-bold bg-orange-100 text-orange-600 border border-orange-200 shadow-sm whitespace-nowrap">
                            {r.daysLeft} {r.daysLeft === 1 ? 'day' : 'days'}
                          </span>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan={3} className="px-5 py-8 text-center text-gray-400">
                          <Package className="mx-auto mb-2 text-gray-300" size={24} />
                          No rentals expiring soon
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      )}

      {selectedRental && (
        <RentalPreviewModal 
          rental={selectedRental}
          onClose={() => setSelectedRental(null)}
          onCloseSubscription={handleCloseSubscription}
        />
      )}
    </>
  );
}

function RentalPreviewModal({ rental, onClose, onCloseSubscription }) {
  if (!rental) return null;
  const { user, product } = rental;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Rental Preview</h2>
            <p className="text-xs text-gray-500 font-medium">Order #{rental._id?.slice(-8).toUpperCase()}</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:text-gray-800 transition">
            <X size={18} />
          </button>
        </div>

        <div className="space-y-4">
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1.5">Customer details</p>
            <p className="font-bold text-gray-800">{user?.name || "Unknown"}</p>
            <p className="text-sm text-gray-500">{user?.email || "No email provided"}</p>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 flex gap-4 items-center">
            {product?.imgs?.[0] || product?.image ? (
              <img src={product?.imgs?.[0] || product?.image} alt={product.title || product.name} className="w-16 h-16 rounded-lg object-cover border border-gray-200" />
            ) : (
              <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                <Package className="text-gray-400" />
              </div>
            )}
            <div>
              <p className="font-bold text-gray-800">{product?.title || product?.name || "Unknown Product"}</p>
              <p className="text-sm font-bold text-[#E63946] mt-1">₹{rental.price} <span className="text-gray-400 font-normal">/ mo</span></p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex-1 bg-gray-50 rounded-xl p-3 border border-gray-100">
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Start Date</p>
              <p className="text-sm font-semibold text-gray-800">
                {rental.rentalStartDate 
                  ? new Date(rental.rentalStartDate).toLocaleDateString() 
                  : (rental._id ? new Date(parseInt(rental._id.substring(0, 8), 16) * 1000).toLocaleDateString() : "—")}
              </p>
            </div>
            <div className="flex-1 bg-gray-50 rounded-xl p-3 border border-gray-100">
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">End Date</p>
              <p className="text-sm font-semibold text-gray-800">{rental.rentalEndDate ? new Date(rental.rentalEndDate).toLocaleDateString() : "—"}</p>
            </div>
          </div>
          
          <div className={`p-4 rounded-xl border ${rental.daysLeft < 0 ? 'bg-[#F1FAEE] border-[#457B9D]/30' : 'bg-orange-50 border-orange-100'}`}>
            <p className={`text-sm font-bold flex items-center gap-2 ${rental.daysLeft < 0 ? 'text-[#E63946]' : 'text-orange-700'}`}>
              <Clock size={16} />
              {rental.daysLeft < 0 
                ? `Overdue by ${Math.abs(rental.daysLeft)} ${Math.abs(rental.daysLeft) === 1 ? 'day' : 'days'}`
                : `Expiring in ${rental.daysLeft} ${rental.daysLeft === 1 ? 'day' : 'days'}`
              }
            </p>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button 
            onClick={onClose}
            className="flex-1 py-3 bg-white border-2 border-gray-100 hover:border-gray-200 hover:bg-gray-50 text-gray-600 font-bold rounded-xl transition"
          >
            Cancel
          </button>
          <button 
            onClick={onCloseSubscription}
            className="flex-1 py-3 bg-[#E63946] hover:bg-[#c1121f] text-white font-bold rounded-xl transition shadow-lg shadow-[#E63946]/20"
          >
            Close Subscription
          </button>
        </div>
      </div>
    </div>
  );
}
