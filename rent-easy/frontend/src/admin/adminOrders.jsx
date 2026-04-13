import { useState, useEffect, useRef } from "react";
import axios from "axios";
import AdminNavBar from "../components/adminNavBar";
import { X, ChevronDown, Calendar, Package, User, IndianRupee, Search, Filter, MapPin } from "lucide-react";

const API = "http://localhost:4000/api/rent";

const SEARCH_FIELDS = [
  { label: "All", value: "all" },
  { label: "Customer", value: "customer" },
  { label: "Product", value: "product" },
  { label: "Address", value: "address" },
];

const FORWARD_STATUSES = ["ordered", "order conformed", "shiped", "out for delivery", "delivered"];
const REVERSE_STATUSES = ["return requested", "request conformed", "out for pickup", "pickup complete"];

const statusStyle = (status) => {
  switch (status) {
    case "ordered":          return "bg-yellow-100 text-yellow-700";
    case "order conformed":  return "bg-amber-100 text-amber-700";
    case "shiped":           return "bg-blue-100 text-blue-700";
    case "out for delivery": return "bg-purple-100 text-purple-700";
    case "delivered":        return "bg-green-100 text-green-700";
    case "return requested": return "bg-orange-100 text-orange-700";
    case "request conformed":return "bg-amber-100 text-amber-700 font-bold";
    case "out for pickup":   return "bg-cyan-100 text-cyan-700";
    case "pickup complete":  return "bg-emerald-100 text-emerald-700";
    default:                 return "bg-gray-100 text-gray-600";
  }
};

const getImg = (product) => product?.imgs?.[0] || "";

// Highlight matching text
function Highlight({ text = "", term = "" }) {
  if (!term.trim() || !text) return <span>{text}</span>;
  const regex = new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
  const parts = text.split(regex);
  return (
    <span>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} className="bg-yellow-200 text-yellow-900 rounded px-0.5">
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </span>
  );
}

const isReturn = (status) => ["return requested", "request conformed", "out for pickup", "pickup complete"].includes(status);

export default function AdminOrders() {
  const [orders, setOrders]               = useState([]);
  const [loading, setLoading]             = useState(true);
  const [searchTerm, setSearchTerm]       = useState("");
  const [searchField, setSearchField]     = useState("all");
  const [searchFieldOpen, setSearchFieldOpen] = useState(false);
  const [statusFilter, setStatusFilter]   = useState("all");
  const [openDropdown, setOpenDropdown]   = useState(null);
  const [dropdownPos, setDropdownPos]     = useState({ top: 0, left: 0 });
  const [selectedOrder, setSelectedOrder] = useState(null);
  const dropdownRef    = useRef(null);
  const searchFieldRef = useRef(null);

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

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setOpenDropdown(null);
      if (searchFieldRef.current && !searchFieldRef.current.contains(e.target))
        setSearchFieldOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleStatusDropdownToggle = (e, orderId) => {
    e.stopPropagation();
    if (openDropdown === orderId) {
      setOpenDropdown(null);
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    setDropdownPos({
      top: rect.bottom + window.scrollY + 4,
      left: rect.right + window.scrollX - 192, // 192 matches w-48 width
    });
    setOpenDropdown(orderId);
  };

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

  const updatePickupDate = async (orderId, date) => {
    try {
      const res = await axios.put(`${API}/updatePickup/${orderId}`, { pickupDate: date });
      setOrders((prev) => prev.map((o) => (o._id === orderId ? res.data : o)));
      if (selectedOrder?._id === orderId) setSelectedOrder(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to update pickup date.");
    }
  };

  // ── Smart Filter ─────────────────────────────────────────────
  const filtered = orders.filter((o) => {
    const term = searchTerm.toLowerCase().trim();

    let matchSearch = true;
    if (term) {
      if (searchField === "all") {
        matchSearch =
          o.user?.name?.toLowerCase().includes(term) ||
          o.user?.email?.toLowerCase().includes(term) ||
          o.product?.title?.toLowerCase().includes(term);
      } else if (searchField === "customer") {
        matchSearch =
          o.user?.name?.toLowerCase().includes(term) ||
          o.user?.email?.toLowerCase().includes(term);
      } else if (searchField === "product") {
        matchSearch = o.product?.title?.toLowerCase().includes(term);
      } else if (searchField === "address") {
        matchSearch =
          o.shippingAddress?.city?.toLowerCase().includes(term) ||
          o.shippingAddress?.state?.toLowerCase().includes(term) ||
          o.shippingAddress?.pincode?.toLowerCase().includes(term) ||
          o.shippingAddress?.addressline1?.toLowerCase().includes(term);
      }
    }

    const matchStatus = statusFilter === "all" || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const deliveryOrders = filtered.filter(o => !isReturn(o.status));
  const returnOrders   = filtered.filter(o => isReturn(o.status));

  const currentSearchLabel = SEARCH_FIELDS.find((f) => f.value === searchField)?.label;

  const renderTable = (data, title) => {
    const count = data.length;
    return (
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-4 px-1">
          <h2 className="text-xl font-bold text-gray-700">{title}</h2>
          <span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-xs font-bold rounded-full border border-gray-200">
            {count}
          </span>
        </div>
        <div className="w-full overflow-x-auto">
          <div className="bg-white shadow rounded-xl border border-gray-200 min-w-[900px]">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 border-b text-gray-500 uppercase text-xs">
                <tr>
                  <th className="px-5 py-3">Customer</th>
                  <th className="px-5 py-3">Product</th>
                  <th className="px-5 py-3">Address</th>
                  <th className="px-5 py-3">Rental Period</th>
                  <th className="px-5 py-3">Price / mo</th>
                  <th className="px-5 py-3">{title.includes("Returns") ? "Pickup Date" : "Delivery Date"}</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-center py-12 text-gray-400 italic">
                      No records found in this section.
                    </td>
                  </tr>
                ) : (
                  data.map((order) => (
                    <tr
                      key={order._id}
                      onClick={() => setSelectedOrder(order)}
                      className="border-b hover:bg-gray-50 cursor-pointer transition"
                    >
                      <td className="px-5 py-4">
                        <p className="font-semibold text-gray-800">
                          <Highlight text={order.user?.name || "—"} term={searchField !== "product" ? searchTerm : ""} />
                        </p>
                        <p className="text-xs text-gray-400">
                          <Highlight text={order.user?.email || "—"} term={searchField !== "product" ? searchTerm : ""} />
                        </p>
                      </td>
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
                            <Highlight text={order.product?.title || "—"} term={searchField !== "customer" && searchField !== "address" ? searchTerm : ""} />
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <p className="text-gray-800 font-medium">
                          <Highlight text={order.shippingAddress?.city || "—"} term={searchField === "address" || searchField === "all" ? searchTerm : ""} />
                        </p>
                        <p className="text-xs text-gray-400">
                          <Highlight text={order.shippingAddress?.state || ""} term={searchField === "address" || searchField === "all" ? searchTerm : ""} />
                        </p>
                      </td>
                      <td className="px-5 py-4 text-gray-600 text-xs space-y-1">
                        <p>From: {order.rentalStartDate ? new Date(order.rentalStartDate).toLocaleDateString() : "—"}</p>
                        <p>To: {order.rentalEndDate ? new Date(order.rentalEndDate).toLocaleDateString() : "—"}</p>
                      </td>
                      <td className="px-5 py-4 font-semibold text-gray-800">₹{order.price}</td>
                      <td className="px-5 py-4" onClick={(e) => e.stopPropagation()}>
                        <input
                          type="date"
                          defaultValue={
                            (title.includes("Returns") ? order.pickupDate : order.deliveryDate) && !isNaN(new Date(title.includes("Returns") ? order.pickupDate : order.deliveryDate))
                              ? new Date(title.includes("Returns") ? order.pickupDate : order.deliveryDate).toISOString().split("T")[0]
                              : ""
                          }
                          onBlur={(e) => {
                            if (e.target.value) {
                              title.includes("Returns")
                                ? updatePickupDate(order._id, e.target.value)
                                : updateDeliveryDate(order._id, e.target.value);
                            }
                          }}
                          className={`border rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 ${title.includes("Returns") ? "focus:ring-orange-400 border-orange-200" : "focus:ring-red-400 border-gray-300"}`}
                        />
                      </td>
                      <td className="px-5 py-4">
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full capitalize ${statusStyle(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-5 py-4" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={(e) => handleStatusDropdownToggle(e, order._id)}
                          className="flex items-center gap-1.5 px-3 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg text-sm transition"
                        >
                          Status <ChevronDown size={14} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <AdminNavBar />
      <div className="p-4 md:p-6 w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Orders Management</h1>

        {/* ── Search Bar with Field Selector ── */}
        <div className="flex flex-wrap items-center gap-3 mb-8 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <div className="relative flex-1 min-w-[260px] flex rounded-lg border border-gray-300 overflow-visible focus-within:ring-2 focus-within:ring-red-400 focus-within:border-transparent bg-white">
            <div ref={searchFieldRef} className="relative flex-shrink-0">
              <button
                onClick={() => setSearchFieldOpen((v) => !v)}
                className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-600 border-r border-gray-300 hover:bg-gray-50 transition h-full rounded-l-lg"
              >
                <Filter size={13} className="text-gray-400" />
                {currentSearchLabel}
                <ChevronDown size={13} className={`text-gray-400 transition-transform ${searchFieldOpen ? "rotate-180" : ""}`} />
              </button>
              {searchFieldOpen && (
                <div className="absolute left-0 top-full mt-1 w-36 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden">
                  {SEARCH_FIELDS.map((f) => (
                    <button
                      key={f.value}
                      onClick={() => { setSearchField(f.value); setSearchFieldOpen(false); }}
                      className={`flex items-center gap-2 w-full text-left px-4 py-2.5 text-sm transition hover:bg-gray-50 ${searchField === f.value ? "font-bold text-red-600" : "text-gray-700"}`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="relative flex-1 flex items-center">
              <Search size={15} className="absolute left-3 text-gray-400" />
              <input
                type="text"
                placeholder={`Search by ${currentSearchLabel?.toLowerCase()}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm bg-transparent focus:outline-none"
              />
              {searchTerm && <button onClick={() => setSearchTerm("")} className="absolute right-3 text-gray-400 hover:text-gray-600"><X size={14} /></button>}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-48">
            <div className="w-10 h-10 border-4 border-red-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            {renderTable(deliveryOrders, "Active Deliveries")}
            {renderTable(returnOrders, "Return Requests")}
          </>
        )}
      </div>

      {selectedOrder && (
        <OrderDetailModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onStatusChange={updateStatus}
          onDateChange={updateDeliveryDate}
          onPickupDateChange={updatePickupDate}
        />
      )}

      {/* Absolute Status Dropdown */}
      {openDropdown && (
        <div
          ref={dropdownRef}
          className="absolute w-52 bg-white border border-gray-200 rounded-xl shadow-2xl z-[9999] overflow-hidden"
          style={{ top: dropdownPos.top, left: dropdownPos.left }}
        >
          {(() => {
            const order = orders.find(o => o._id === openDropdown);
            if (!order) return null;
            const options = isReturn(order.status) ? REVERSE_STATUSES : FORWARD_STATUSES;
            return options.map((option) => (
              <button
                key={option}
                onClick={() => updateStatus(order._id, option)}
                className={`flex items-center gap-2 w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 capitalize transition ${order.status === option ? "font-bold text-red-600" : "text-gray-700"}`}
              >
                <span className={`w-2 h-2 rounded-full ${statusStyle(option).split(" ")[0]}`} />
                {option}
              </button>
            ));
          })()}
        </div>
      )}
    </>
  );
}

function OrderDetailModal({ order, onClose, onStatusChange, onDateChange, onPickupDateChange }) {
  const product = order.product;
  const user    = order.user;
  const address = order.shippingAddress;

  const [localDate, setLocalDate] = useState(
    order.deliveryDate
      ? new Date(order.deliveryDate).toISOString().split("T")[0]
      : ""
  );

  const [localPickupDate, setLocalPickupDate] = useState(
    order.pickupDate
      ? new Date(order.pickupDate).toISOString().split("T")[0]
      : ""
  );

  useEffect(() => {
    setLocalDate(
      order.deliveryDate
        ? new Date(order.deliveryDate).toISOString().split("T")[0]
        : ""
    );
    setLocalPickupDate(
      order.pickupDate
        ? new Date(order.pickupDate).toISOString().split("T")[0]
        : ""
    );
  }, [order.deliveryDate, order.pickupDate]);

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
              <p className="text-red-600 font-semibold">₹{order.price} / month</p>
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

          {/* Cancellation / Return Reason */}
          {(order.cancelReason || order.returnReason) && (
            <div className={`p-4 rounded-xl border ${order.cancelReason ? "bg-red-50 border-red-100" : "bg-orange-50 border-orange-100"}`}>
              <p className={`text-xs font-bold uppercase tracking-widest mb-1 ${order.cancelReason ? "text-red-400" : "text-orange-400"}`}>
                {order.cancelReason ? "Cancellation Reason" : "Return Reason"}
              </p>
              <p className={`text-sm font-medium ${order.cancelReason ? "text-red-700" : "text-orange-700"}`}>
                {order.cancelReason || order.returnReason}
              </p>
            </div>
          )}

          {/* Delivery Address */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <MapPin size={16} className="text-gray-400" />
              <p className="font-semibold text-gray-700">Delivery Address</p>
            </div>
            {address ? (
              <div className="bg-gray-50 rounded-xl p-4 text-sm space-y-1">
                <p className="font-bold text-gray-800">{address.fullname} · {address.phone}</p>
                <p className="text-gray-600">{address.addressline1}{address.addressline2 ? `, ${address.addressline2}` : ""}</p>
                <p className="text-gray-600">{address.city}, {address.state} — {address.pincode}</p>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-xl p-4 text-center text-gray-400 text-sm">
                No shipping address provided
              </div>
            )}
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
                <p className="font-bold text-red-600 text-lg">₹{order.price}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-gray-400 text-xs mb-1">Security Deposit</p>
                <p className="font-bold text-gray-800 text-lg">₹{product?.deposit || "—"}</p>
              </div>
            </div>
          </div>

          {/* Delivery Date */}
          {!isReturn(order.status) && (
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
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                />
                <button
                  onClick={() => localDate && onDateChange(order._id, localDate)}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold rounded-lg transition"
                >
                  Save
                </button>
              </div>
            </div>
          )}

          {/* Pickup Date (Return process) */}
          {isReturn(order.status) && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Calendar size={16} className="text-orange-400" />
                <p className="font-semibold text-gray-700">Assign Pickup Date</p>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="date"
                  value={localPickupDate}
                  onChange={(e) => setLocalPickupDate(e.target.value)}
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
                <button
                  onClick={() => localPickupDate && onPickupDateChange(order._id, localPickupDate)}
                  className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-lg transition"
                >
                  Save
                </button>
              </div>
            </div>
          )}

          {/* Update Status */}
          <div>
            <p className="font-semibold text-gray-700 mb-3">Update Status</p>
            <div className="grid grid-cols-2 gap-2">
              {(isReturn(order.status) ? REVERSE_STATUSES : FORWARD_STATUSES).map((option) => (
                <button
                  key={option}
                  onClick={() => onStatusChange(order._id, option)}
                  className={`py-2.5 rounded-xl text-sm font-semibold capitalize transition border-2 ${
                    order.status === option
                      ? "border-red-500 bg-red-50 text-red-700"
                      : "border-gray-200 hover:border-red-300 text-gray-600 hover:bg-gray-50"
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
