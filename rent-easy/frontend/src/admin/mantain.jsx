import { useState, useEffect, useRef } from "react";
import axios from "axios";
import AdminNavBar from "../components/adminNavBar";
import { Search, Calendar, ChevronDown, Wrench } from "lucide-react";

export default function MaintenanceRequests() {
  const [requests, setRequests]       = useState([]);
  const [loading, setLoading]         = useState(true);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 });
  const [searchTerm, setSearchTerm]   = useState("");
  const [editingDate, setEditingDate] = useState(null);
  const [editingPickup, setEditingPickup] = useState(null);
  const [tempDate, setTempDate]       = useState("");
  const [tempPickup, setTempPickup]   = useState("");

  const statusOptions = ["requested", "approved", "in progress", "completed"];

  const fetchRequests = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/rent/allMaintenance");
      setRequests(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchRequests(); }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = () => setOpenDropdown(null);
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  const handleDropdownToggle = (e, reqId) => {
    e.stopPropagation();
    if (openDropdown === reqId) {
      setOpenDropdown(null);
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    setDropdownPos({
      top:  rect.bottom + window.scrollY + 4,
      left: rect.right  + window.scrollX - 160, // 160 = dropdown width
    });
    setOpenDropdown(reqId);
  };

  const updateStatus = async (userId, requestId, newStatus) => {
    try {
      const res = await axios.put(`http://localhost:4000/api/rent/updateMaintenance/${userId}/${requestId}`, { status: newStatus });
      setRequests(prev => prev.map(r => r._id === requestId ? { ...r, ...res.data } : r));
      setOpenDropdown(null);
    } catch (err) {
      console.error(err);
      alert("Failed to update status");
    }
  };

  const handleSaveDate = async (userId, requestId) => {
    try {
      const res = await axios.put(`http://localhost:4000/api/rent/updateMaintenance/${userId}/${requestId}`, { expectedCompletionDate: tempDate });
      setRequests(prev => prev.map(r => r._id === requestId ? { ...r, ...res.data } : r));
      setEditingDate(null);
      setTempDate("");
    } catch (err) {
      console.error(err);
      alert("Failed to update date");
    }
  };

  const handleSavePickup = async (userId, requestId) => {
    try {
      const res = await axios.put(`http://localhost:4000/api/rent/updateMaintenance/${userId}/${requestId}`, { pickupDate: tempPickup });
      setRequests(prev => prev.map(r => r._id === requestId ? { ...r, ...res.data } : r));
      setEditingPickup(null);
      setTempPickup("");
    } catch (err) {
      console.error(err);
      alert("Failed to update pickup date");
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "requested":   return "bg-yellow-100 text-yellow-700";
      case "approved":    return "bg-blue-100 text-blue-700";
      case "in progress": return "bg-purple-100 text-purple-700";
      case "completed":   return "bg-red-100 text-red-700";
      default:            return "bg-gray-100 text-gray-600";
    }
  };

  const filteredRequests = requests.filter(
    (req) =>
      req.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.product?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.issue?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <AdminNavBar />
      <div className="p-4 md:p-6 w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Maintenance Requests</h1>

        <div className="mb-6 relative w-full max-w-md">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by customer, product, or issue..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-48">
            <div className="w-10 h-10 border-4 border-red-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="w-full overflow-x-auto">
            <div className="min-w-[1000px] bg-white shadow-sm rounded-2xl border border-gray-200 overflow-hidden">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 border-b text-gray-500 uppercase text-xs font-semibold">
                  <tr>
                    <th className="px-6 py-4">Customer</th>
                    <th className="px-6 py-4">Product</th>
                    <th className="px-6 py-4">Issue</th>
                    <th className="px-6 py-4">Request Date</th>
                    <th className="px-6 py-4">Pick up Date</th>
                    <th className="px-6 py-4">Expected Date</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredRequests.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="text-center py-12 text-gray-400">
                        No maintenance requests found.
                      </td>
                    </tr>
                  ) : (
                    filteredRequests.map((req) => (
                      <tr key={req._id} className="border-b hover:bg-gray-50 transition">

                        {/* Customer */}
                        <td className="px-6 py-4">
                          <div className="font-bold text-gray-800">{req.user?.name || "Unknown"}</div>
                          <div className="text-gray-400 text-xs">{req.user?.email}</div>
                        </td>

                        {/* Product */}
                        <td className="px-6 py-4 font-medium text-gray-700">
                          {req.product?.title || "N/A"}
                        </td>

                        {/* Issue */}
                        <td className="px-6 py-4 text-gray-600 max-w-[180px]">
                          <p className="truncate">{req.issue}</p>
                        </td>

                        {/* Request Date */}
                        <td className="px-6 py-4 text-gray-400 text-xs">
                          {new Date(req.requestedAt).toLocaleDateString()}
                        </td>

                        {/* Pick up Date */}
                        <td className="px-6 py-4">
                          {editingPickup === req._id ? (
                            <div className="flex items-center gap-2">
                              <input
                                type="date"
                                value={tempPickup}
                                onChange={(e) => setTempPickup(e.target.value)}
                                className="border border-gray-300 rounded-lg px-2 py-1 text-xs focus:ring-2 focus:ring-red-400 outline-none"
                              />
                              <button onClick={() => handleSavePickup(req.user?._id, req._id)} className="px-3 py-1 bg-red-500 text-white text-xs rounded-lg hover:bg-red-600">Save</button>
                              <button onClick={() => setEditingPickup(null)} className="px-3 py-1 bg-gray-100 text-gray-500 text-xs rounded-lg">✕</button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 group">
                              <span className="text-gray-700 text-xs">
                                {req.pickupDate ? new Date(req.pickupDate).toLocaleDateString() : "—"}
                              </span>
                              <button
                                onClick={() => { setEditingPickup(req._id); setTempPickup(req.pickupDate ? new Date(req.pickupDate).toISOString().split("T")[0] : ""); }}
                                className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-gray-100 rounded-lg transition"
                              >
                                <Calendar size={14} className="text-gray-400" />
                              </button>
                            </div>
                          )}
                        </td>

                        {/* Expected Date */}
                        <td className="px-6 py-4">
                          {editingDate === req._id ? (
                            <div className="flex items-center gap-2">
                              <input
                                type="date"
                                value={tempDate}
                                onChange={(e) => setTempDate(e.target.value)}
                                className="border border-gray-300 rounded-lg px-2 py-1 text-xs focus:ring-2 focus:ring-red-400 outline-none"
                              />
                              <button onClick={() => handleSaveDate(req.user?._id, req._id)} className="px-3 py-1 bg-red-500 text-white text-xs rounded-lg hover:bg-red-600">Save</button>
                              <button onClick={() => setEditingDate(null)} className="px-3 py-1 bg-gray-100 text-gray-500 text-xs rounded-lg">✕</button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 group">
                              <span className="text-gray-700 text-xs">
                                {req.expectedCompletionDate ? new Date(req.expectedCompletionDate).toLocaleDateString() : "—"}
                              </span>
                              <button
                                onClick={() => { setEditingDate(req._id); setTempDate(req.expectedCompletionDate ? new Date(req.expectedCompletionDate).toISOString().split("T")[0] : ""); }}
                                className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-gray-100 rounded-lg transition"
                              >
                                <Calendar size={14} className="text-gray-400" />
                              </button>
                            </div>
                          )}
                        </td>

                        {/* Status badge */}
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 text-xs font-bold rounded-full capitalize ${getStatusStyle(req.status)}`}>
                            {req.status}
                          </span>
                        </td>

                        {/* Actions — dropdown uses fixed positioning */}
                        <td className="px-6 py-4">
                          <button
                            onClick={(e) => handleDropdownToggle(e, req._id)}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 border border-gray-200 rounded-lg text-xs font-medium hover:bg-gray-200 transition"
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
        )}
      </div>

      {/* Fixed dropdown — rendered outside the table so overflow:hidden never clips it */}
      {openDropdown && (
        <div
          className="fixed w-40 bg-white border border-gray-200 rounded-xl shadow-xl z-[9999] overflow-hidden"
          style={{ top: dropdownPos.top, left: dropdownPos.left }}
          onClick={(e) => e.stopPropagation()}
        >
          {statusOptions.map((option) => {
            const req = requests.find((r) => r._id === openDropdown);
            return (
              <button
                key={option}
                onClick={() => updateStatus(req?.user?._id, openDropdown, option)}
                className={`flex items-center gap-2 w-full text-left px-4 py-2.5 text-xs hover:bg-gray-50 capitalize transition ${
                  req?.status === option ? "text-red-600 font-bold" : "text-gray-700"
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${getStatusStyle(option).split(" ")[0]}`} />
                {option}
              </button>
            );
          })}
        </div>
      )}
    </>
  );
}
