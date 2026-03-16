import { useState, useEffect, useRef } from "react";
import axios from "axios";
import AdminNavBar from "../components/adminNavBar";
import { X, ChevronDown, Calendar, Package, User, IndianRupee, Search } from "lucide-react";

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

// ── Helper: get first image from product ────────────────────────
const getImg = (product) => product?.imgs?.[0] || "";

export default function AdminOrders() {
  const [orders, setOrders]               = useState([]);
  const [loading, setLoading]             = useState(true);
  const [searchTerm, setSearchTerm]       = useState("");
  const [statusFilter, setStatusFilter]   = useState("all");
  const [openDropdown, setOpenDropdown]   = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const dropdownRef = useRef(null);

  // ── Fetch ────────────────────────────────────────────────────
  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${API}/allRents`);
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchOrders(); }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setOpenDropdown(null);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // ── Update status ────────────────────────────────────────────
  const updateStatus = async (orderId, newStatus) => {
    try {
      const res = await axios.put(`${API}/updateStatus/${orderId}`, { status: newStatus });
      setOrders((prev) => prev.map((o) => (o._id === orderId ? res.data : o)));
      if (selectedOrder?._id === orderId) setSelectedOrder(res.data);
      setOpenDropdown(null);
    } catch (err) {
      console.error(err);
      alert("Failed to update status.");
    }
  };

  // ── Update delivery date ─────────────────────────────────────
  const updateDeliveryDate = async (orderId, date) => {
    try {
      const res = await axios.put(`${API}/updateDelivery/${orderId}`, { deliveryDate: date });
      setOrders((prev) => prev.map((o) => (o._id === orderId ? res.data : o)));
      if (selectedOrder?._id === orderId) setSelectedOrder(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to update delivery date.");
    }
  };

  // ── Filter ───────────────────────────────────────────────────
  const filtered = orders.filter((o) => {
    const matchSearch =
      o.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.product?.title?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === "all" || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const counts = STATUS_OPTIONS.reduce((acc, s) => {
    acc[s] = orders.filter((o) => o.status === s).length;
    return acc;
  }, {});

  return (
    <>
      <AdminNavBar />
      <div className="p-4 md:p-6 w-full">

        <h1 className="text-2xl font-bold text-gray-800 mb-6">Orders</h1>

        {/* ── Summary Cards ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Ordered",          key: "ordered",          color: "bg-yellow-50 border-yellow-200 text-yellow-700" },
            { label: "Dispatched",       key: "dispatch",         color: "bg-blue-50 border-blue-200 text-blue-700" },
            { label: "Out for Delivery", key: "out for delivery", color: "bg-purple-50 border-purple-200 text-purple-700" },
            { label: "Completed",        key: "complete",         color: "bg-green-50 border-green-200 text-green-700" },
          ].map((card) => (
            <button
              key={card.key}
              onClick={() => setStatusFilter(statusFilter === card.key ? "all" : card.key)}
              className={`border rounded-xl p-4 text-left transition hover:shadow-md ${card.color} ${
                statusFilter === card.key ? "ring-2 ring-offset-1 ring-current" : ""
              }`}
            >
              <p className="text-2xl font-extrabold">{counts[card.key] || 0}</p>
              <p className="text-sm font-medium mt-1">{card.label}</p>
            </button>
          ))}
        </div>

        {/* ── Search + Filter ── */}
        <div className="flex flex-wrap items-center gap-3 mb-5">
          <div className="relative flex-1 min-w-[200px]">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email or product..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setStatusFilter("all")}
              className={`px-4 py-2 rounded-lg text-sm font-medium border transition ${
                statusFilter === "all"
                  ? "bg-gray-800 text-white border-gray-800"
                  : "bg-white text-gray-600 border-gray-300 hover:border-gray-400"
              }`}
            >
              All
            </button>
            {STATUS_OPTIONS.map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(statusFilter === s ? "all" : s)}
                className={`px-4 py-2 rounded-lg text-sm font-medium border capitalize transition ${
                  statusFilter === s
                    ? "bg-gray-800 text-white border-gray-800"
                    : "bg-white text-gray-600 border-gray-300 hover:border-gray-400"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* ── Table ── */}
        {loading ? (
          <div className="flex items-center justify-center h-48">
            <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="w-full overflow-x-auto">
            <div className="bg-white shadow rounded-xl border border-gray-200 min-w-[900px]">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 border-b text-gray-500 uppercase text-xs">
                  <tr>
                    <th className="px-5 py-3">Customer</th>
                    <th className="px-5 py-3">Product</th>
                    <th className="px-5 py-3">Rental Period</th>
                    <th className="px-5 py-3">Price / mo</th>
                    <th className="px-5 py-3">Delivery Date</th>
                    <th className="px-5 py-3">Status</th>
                    <th className="px-5 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="text-center py-12 text-gray-400">
                        No orders found.
                      </td>
                    </tr>
                  ) : (
                    filtered.map((order, index) => (
                      <tr
                        key={order._id}
                        onClick={() => setSelectedOrder(order)}
                        className="border-b hover:bg-gray-50 cursor-pointer transition"
                      >
                        {/* Customer */}
                        <td className="px-5 py-4">
                          <p className="font-semibold text-gray-800">{order.user?.name || "—"}</p>
                          <p className="text-xs text-gray-400">{order.user?.email || "—"}</p>
                        </td>

                        {/* Product */}
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            {getImg(order.product) && (
                              <img
                                src={getImg(order.product)}
                                alt=""
                                className="w-10 h-10 object-cover rounded-lg border flex-shrink-0"
                              />
                            )}
                            <span className="font-medium text-gray-800">
                              {order.product?.title || "—"}
                            </span>
                          </div>
                        </td>

                        {/* Rental Period */}
                        <td className="px-5 py-4 text-gray-600 text-xs space-y-1">
                          <p>From: {order.rentalStartDate ? new Date(order.rentalStartDate).toLocaleDateString() : "—"}</p>
                          <p>To: {order.rentalEndDate ? new Date(order.rentalEndDate).toLocaleDateString() : "—"}</p>
                        </td>

                        {/* Price */}
                        <td className="px-5 py-4 font-semibold text-gray-800">
                          ₹{order.price}
                        </td>

                        {/* Delivery Date inline */}
                        <td className="px-5 py-4" onClick={(e) => e.stopPropagation()}>
                          <input
                            type="date"
                            defaultValue={
                              order.deliveryDate && !isNaN(new Date(order.deliveryDate))
                                ? new Date(order.deliveryDate).toISOString().split("T")[0]
                                : ""
                            }
                            onBlur={(e) => {
                              if (e.target.value) updateDeliveryDate(order._id, e.target.value);
                            }}
                            className="border border-gray-300 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                          />
                        </td>

                        {/* Status badge */}
                        <td className="px-5 py-4">
                          <span className={`px-3 py-1 text-xs font-semibold rounded-full capitalize ${statusStyle(order.status)}`}>
                            {order.status}
                          </span>
                        </td>

                        {/* Status dropdown */}
                        <td
                          className="px-5 py-4 relative"
                          onClick={(e) => e.stopPropagation()}
                          ref={openDropdown === index ? dropdownRef : null}
                        >
                          <button
                            onClick={() => setOpenDropdown(openDropdown === index ? null : index)}
                            className="flex items-center gap-1.5 px-3 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg text-sm transition"
                          >
                            Status <ChevronDown size={14} />
                          </button>

                          {openDropdown === index && (
                            <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden">
                              {STATUS_OPTIONS.map((option) => (
                                <button
                                  key={option}
                                  onClick={() => updateStatus(order._id, option)}
                                  className={`flex items-center gap-2 w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 capitalize transition ${
                                    order.status === option
                                      ? "font-bold text-green-600"
                                      : "text-gray-700"
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

      {selectedOrder && (
        <OrderDetailModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onStatusChange={updateStatus}
          onDateChange={updateDeliveryDate}
        />
      )}
    </>
  );
}


function OrderDetailModal({ order, onClose, onStatusChange, onDateChange }) {
  const product = order.product;
  const user    = order.user;

  const [localDate, setLocalDate] = useState(
    order.deliveryDate
      ? new Date(order.deliveryDate).toISOString().split("T")[0]
      : ""
  );

  useEffect(() => {
    setLocalDate(
      order.deliveryDate
        ? new Date(order.deliveryDate).toISOString().split("T")[0]
        : ""
    );
  }, [order.deliveryDate]);

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
        <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white rounded-t-2xl z-10">
          <h2 className="text-xl font-bold text-gray-800">Order Details</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 transition">
            <X size={22} />
          </button>
        </div>

        <div className="p-6 space-y-6">

          {/* Product */}
          <div className="flex items-center gap-4 bg-gray-50 rounded-xl p-4">
            {product?.imgs?.[0] && (
              <img
                src={product.imgs[0]}
                alt={product.title}
                className="w-20 h-20 object-cover rounded-xl border flex-shrink-0"
              />
            )}
            <div>
              <p className="font-bold text-gray-800 text-lg">{product?.title || "—"}</p>
              <p className="text-green-600 font-semibold">₹{order.price} / month</p>
              <span className={`mt-1 inline-block px-3 py-0.5 text-xs font-semibold rounded-full capitalize ${statusStyle(order.status)}`}>
                {order.status}
              </span>
            </div>
          </div>

          {/* Customer */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <User size={16} className="text-gray-400" />
              <p className="font-semibold text-gray-700">Customer</p>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-gray-400 text-xs mb-1">Name</p>
                <p className="font-medium text-gray-800">{user?.name || "—"}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-gray-400 text-xs mb-1">Email</p>
                <p className="font-medium text-gray-800">{user?.email || "—"}</p>
              </div>
            </div>
          </div>

          {/* Rental Period */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Calendar size={16} className="text-gray-400" />
              <p className="font-semibold text-gray-700">Rental Period</p>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-gray-400 text-xs mb-1">Start Date</p>
                <p className="font-medium text-gray-800">
                  {order.rentalStartDate ? new Date(order.rentalStartDate).toLocaleDateString() : "—"}
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-gray-400 text-xs mb-1">End Date</p>
                <p className="font-medium text-gray-800">
                  {order.rentalEndDate ? new Date(order.rentalEndDate).toLocaleDateString() : "—"}
                </p>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <IndianRupee size={16} className="text-gray-400" />
              <p className="font-semibold text-gray-700">Pricing</p>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-gray-400 text-xs mb-1">Monthly Rent</p>
                <p className="font-bold text-green-600 text-lg">₹{order.price}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-gray-400 text-xs mb-1">Security Deposit</p>
                <p className="font-bold text-gray-800 text-lg">₹{product?.deposit || "—"}</p>
              </div>
            </div>
          </div>

          {/* Delivery Date */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Package size={16} className="text-gray-400" />
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
                onClick={() => localDate && onDateChange(order._id, localDate)}
                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold rounded-lg transition"
              >
                Save
              </button>
            </div>
          </div>

          {/* Update Status */}
          <div>
            <p className="font-semibold text-gray-700 mb-3">Update Status</p>
            <div className="grid grid-cols-2 gap-2">
              {STATUS_OPTIONS.map((option) => (
                <button
                  key={option}
                  onClick={() => onStatusChange(order._id, option)}
                  className={`py-2.5 rounded-xl text-sm font-semibold capitalize transition border-2 ${
                    order.status === option
                      ? "border-green-500 bg-green-50 text-green-700"
                      : "border-gray-200 hover:border-green-300 text-gray-600 hover:bg-gray-50"
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