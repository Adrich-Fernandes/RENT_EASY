import { useState, useEffect, useRef } from "react";
import axios from "axios";
import AdminNavBar from "../components/adminNavBar";
import { X, ChevronDown, Calendar, Package, User, IndianRupee } from "lucide-react";

const API = "http://localhost:4000/api/rent";

const STATUS_OPTIONS = ["ordered", "dispatch", "out for delivery", "complete"];

const statusStyle = (status) => {
  switch (status) {
    case "ordered":          return "bg-yellow-100 text-yellow-700";
    case "dispatch":         return "bg-blue-100 text-blue-700";
    case "out for delivery": return "bg-purple-100 text-purple-700";
    case "complete":         return "bg-green-100 text-green-700";
    default:                 return "bg-gray-100 text-gray-600";
  }
};

export default function AdminRents() {
  const [rents, setRents]             = useState([]);
  const [loading, setLoading]         = useState(true);
  const [searchTerm, setSearchTerm]   = useState("");
  const [openDropdown, setOpenDropdown] = useState(null);
  const [selectedRent, setSelectedRent] = useState(null); // for detail popup
  const dropdownRef = useRef(null);

  // ── Fetch ────────────────────────────────────────────────────
  const fetchRents = async () => {
    try {
      const res = await axios.get(`${API}/allRents`);
      setRents(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRents();
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // ── Update status ────────────────────────────────────────────
  const updateStatus = async (rentId, newStatus) => {
    try {
      const res = await axios.put(`${API}/updateStatus/${rentId}`, { status: newStatus });
      setRents((prev) => prev.map((r) => (r._id === rentId ? res.data : r)));
      if (selectedRent?._id === rentId) setSelectedRent(res.data);
      setOpenDropdown(null);
    } catch (err) {
      console.error(err);
      alert("Failed to update status.");
    }
  };

  // ── Update delivery date ─────────────────────────────────────
  const updateDeliveryDate = async (rentId, date) => {
    try {
      const res = await axios.put(`${API}/updateDelivery/${rentId}`, { deliveryDate: date });
      setRents((prev) => prev.map((r) => (r._id === rentId ? res.data : r)));
      if (selectedRent?._id === rentId) setSelectedRent(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to update delivery date.");
    }
  };

  // ── Filter ───────────────────────────────────────────────────
  const filtered = rents.filter((r) =>
    r.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.product?.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <AdminNavBar />

      <div className="p-4 md:p-6 w-full">

        {/* Search */}
        <div className="mb-5 flex items-center justify-between gap-4 flex-wrap">
          <h1 className="text-2xl font-bold text-gray-800">All Rentals</h1>
          <input
            type="text"
            placeholder="Search by name, email, or product..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-80 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 text-sm"
          />
        </div>

        {/* Table */}
        {loading ? (
          <div className="flex items-center justify-center h-48">
            <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="w-full overflow-x-auto">
            <div className="bg-white shadow rounded-xl border border-gray-200 min-w-[1000px]">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 border-b text-gray-600 uppercase text-xs">
                  <tr>
                    <th className="px-5 py-3">Customer</th>
                    <th className="px-5 py-3">Product</th>
                    <th className="px-5 py-3">Start Date</th>
                    <th className="px-5 py-3">End Date</th>
                    <th className="px-5 py-3">Price / mo</th>
                    <th className="px-5 py-3">Delivery Date</th>
                    <th className="px-5 py-3">Status</th>
                    <th className="px-5 py-3">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="text-center py-10 text-gray-400">
                        No rentals found.
                      </td>
                    </tr>
                  ) : (
                    filtered.map((rent, index) => (
                      <tr
                        key={rent._id}
                        className="border-b hover:bg-gray-50 cursor-pointer transition"
                        onClick={() => setSelectedRent(rent)}
                      >
                        {/* Customer */}
                        <td className="px-5 py-4">
                          <p className="font-semibold text-gray-800">{rent.user?.name || "—"}</p>
                          <p className="text-xs text-gray-500">{rent.user?.email || "—"}</p>
                        </td>

                        {/* Product */}
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            <img
                              src={rent.product?.imgs?.[0] || rent.product?.image}
                              alt=""
                              className="w-10 h-10 object-cover rounded-lg border"
                            />
                            <span className="font-medium">{rent.product?.title || "—"}</span>
                          </div>
                        </td>

                        {/* Dates */}
                        <td className="px-5 py-4 text-gray-600">
                          {rent.rentalStartDate ? new Date(rent.rentalStartDate).toLocaleDateString() : "—"}
                        </td>
                        <td className="px-5 py-4 text-gray-600">
                          {rent.rentalEndDate ? new Date(rent.rentalEndDate).toLocaleDateString() : "—"}
                        </td>

                        {/* Price */}
                        <td className="px-5 py-4 font-semibold text-gray-800">₹{rent.price}</td>

                        {/* Delivery Date */}
                        <td
                          className="px-5 py-4"
                          onClick={(e) => e.stopPropagation()} // prevent row click
                        >
                          <input
                            type="date"
                            defaultValue={
                              rent.deliveryDate
                                ? new Date(rent.deliveryDate).toISOString().split("T")[0]
                                : ""
                            }
                            onBlur={(e) => {
                              if (e.target.value) updateDeliveryDate(rent._id, e.target.value);
                            }}
                            className="border border-gray-300 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                          />
                        </td>

                        {/* Status badge */}
                        <td className="px-5 py-4">
                          <span className={`px-3 py-1 text-xs font-semibold rounded-full capitalize ${statusStyle(rent.status)}`}>
                            {rent.status}
                          </span>
                        </td>

                        {/* Dropdown */}
                        <td
                          className="px-5 py-4 relative"
                          onClick={(e) => e.stopPropagation()}
                          ref={openDropdown === index ? dropdownRef : null}
                        >
                          <button
                            onClick={() => setOpenDropdown(openDropdown === index ? null : index)}
                            className="flex items-center gap-1.5 px-3 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg text-sm transition"
                          >
                            Change Status <ChevronDown size={14} />
                          </button>

                          {openDropdown === index && (
                            <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden">
                              {STATUS_OPTIONS.map((option) => (
                                <button
                                  key={option}
                                  onClick={() => updateStatus(rent._id, option)}
                                  className={`flex items-center gap-2 w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 capitalize transition ${
                                    rent.status === option ? "font-bold text-green-600" : "text-gray-700"
                                  }`}
                                >
                                  <span className={`w-2 h-2 rounded-full ${statusStyle(option).split(" ")[0]}`} />
                                  {option}
                                </button>
                              ))}
                            </div>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* ── DETAIL POPUP ── */}
      {selectedRent && (
        <RentDetailModal
          rent={selectedRent}
          onClose={() => setSelectedRent(null)}
          onStatusChange={updateStatus}
          onDateChange={updateDeliveryDate}
        />
      )}
    </>
  );
}


function RentDetailModal({ rent, onClose, onStatusChange, onDateChange }) {
  const product = rent.product;
  const user    = rent.user;
  const [localDate, setLocalDate] = useState(
    rent.deliveryDate ? new Date(rent.deliveryDate).toISOString().split("T")[0] : ""
  );

  const handleDateSave = () => {
    if (localDate) onDateChange(rent._id, localDate);
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[999] px-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold text-gray-800">Rental Details</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 transition">
            <X size={22} />
          </button>
        </div>

        <div className="p-6 space-y-6">

          {/* Product */}
          <div className="flex items-center gap-4 bg-gray-50 rounded-xl p-4">
            <img
              src={product?.imgs?.[0] || product?.image}
              alt={product?.title}
              className="w-20 h-20 object-cover rounded-xl border"
            />
            <div>
              <p className="font-bold text-gray-800 text-lg">{product?.title || "—"}</p>
              <p className="text-green-600 font-semibold">₹{rent.price} / month</p>
              <span className={`mt-1 inline-block px-3 py-0.5 text-xs font-semibold rounded-full capitalize ${statusStyle(rent.status)}`}>
                {rent.status}
              </span>
            </div>
          </div>

          {/* Customer Info */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <User size={16} className="text-gray-500" />
              <p className="font-semibold text-gray-700">Customer</p>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-gray-500 text-xs mb-1">Name</p>
                <p className="font-medium">{user?.name || "—"}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-gray-500 text-xs mb-1">Email</p>
                <p className="font-medium">{user?.email || "—"}</p>
              </div>
            </div>
          </div>

          {/* Rental Dates */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Calendar size={16} className="text-gray-500" />
              <p className="font-semibold text-gray-700">Rental Period</p>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-gray-500 text-xs mb-1">Start Date</p>
                <p className="font-medium">
                  {rent.rentalStartDate ? new Date(rent.rentalStartDate).toLocaleDateString() : "—"}
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-gray-500 text-xs mb-1">End Date</p>
                <p className="font-medium">
                  {rent.rentalEndDate ? new Date(rent.rentalEndDate).toLocaleDateString() : "—"}
                </p>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <IndianRupee size={16} className="text-gray-500" />
              <p className="font-semibold text-gray-700">Pricing</p>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-gray-500 text-xs mb-1">Monthly Rent</p>
                <p className="font-bold text-green-600">₹{rent.price}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-gray-500 text-xs mb-1">Security Deposit</p>
                <p className="font-bold">₹{product?.deposit || "—"}</p>
              </div>
            </div>
          </div>

          {/* Delivery Date — editable */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Package size={16} className="text-gray-500" />
              <p className="font-semibold text-gray-700">Expected Delivery Date</p>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="date"
                value={localDate}
                onChange={(e) => setLocalDate(e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <button
                onClick={handleDateSave}
                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold rounded-lg transition"
              >
                Save
              </button>
            </div>
          </div>

          {/* Change Status */}
          <div>
            <p className="font-semibold text-gray-700 mb-3">Update Status</p>
            <div className="grid grid-cols-2 gap-2">
              {STATUS_OPTIONS.map((option) => (
                <button
                  key={option}
                  onClick={() => onStatusChange(rent._id, option)}
                  className={`py-2.5 rounded-xl text-sm font-semibold capitalize transition border-2 ${
                    rent.status === option
                      ? "border-green-500 bg-green-50 text-green-700"
                      : "border-gray-200 hover:border-green-300 text-gray-600"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}