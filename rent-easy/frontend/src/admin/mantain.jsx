import { useState, useEffect } from "react";
import axios from "axios";
import AdminNavBar from "../components/adminNavBar";
import { Search, Calendar, ChevronDown, Wrench } from "lucide-react";

export default function MaintenanceRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingDate, setEditingDate] = useState(null);
  const [tempDate, setTempDate] = useState("");

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

  useEffect(() => {
    fetchRequests();
  }, []);

  const updateStatus = async (userId, requestId, newStatus) => {
    try {
      await axios.put(`http://localhost:4000/api/rent/updateMaintenance/${userId}/${requestId}`, { status: newStatus });
      setRequests(prev => prev.map(r => r._id === requestId ? { ...r, status: newStatus } : r));
      setOpenDropdown(null);
    } catch (err) {
      console.error(err);
      alert("Failed to update status");
    }
  };

  const handleSaveDate = async (userId, requestId) => {
    try {
      await axios.put(`http://localhost:4000/api/rent/updateMaintenance/${userId}/${requestId}`, { expectedCompletionDate: tempDate });
      setRequests(prev => prev.map(r => r._id === requestId ? { ...r, expectedCompletionDate: tempDate } : r));
      setEditingDate(null);
      setTempDate("");
    } catch (err) {
      console.error(err);
      alert("Failed to update date");
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "requested":   return "bg-yellow-100 text-yellow-700";
      case "approved":    return "bg-blue-100 text-blue-700";
      case "in progress": return "bg-purple-100 text-purple-700";
      case "completed":   return "bg-green-100 text-green-700";
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
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-48">
             <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
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
                    <th className="px-6 py-4">Expected Date</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredRequests.map((req, index) => (
                    <tr key={req._id} className="border-b hover:bg-gray-50 transition">
                      <td className="px-6 py-4">
                        <div className="font-bold text-gray-800">{req.user?.name || "Unknown"}</div>
                        <div className="text-gray-400 text-xs">{req.user?.email}</div>
                      </td>

                      <td className="px-6 py-4 font-medium text-gray-700">
                        {req.product?.title || "N/A"}
                      </td>

                      <td className="px-6 py-4 text-gray-600 max-w-xs truncate">
                        {req.issue}
                      </td>

                      <td className="px-6 py-4 text-gray-400 text-xs">
                        {new Date(req.requestedAt).toLocaleDateString()}
                      </td>

                      <td className="px-6 py-4">
                        {editingDate === req._id ? (
                          <div className="flex items-center gap-2">
                            <input
                              type="date"
                              value={tempDate}
                              onChange={(e) => setTempDate(e.target.value)}
                              className="border border-gray-300 rounded-lg px-2 py-1 text-xs focus:ring-2 focus:ring-green-400 outline-none"
                            />
                            <button
                              onClick={() => handleSaveDate(req.user?._id, req._id)}
                              className="px-3 py-1 bg-green-500 text-white text-xs rounded-lg hover:bg-green-600"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setEditingDate(null)}
                              className="px-3 py-1 bg-gray-100 text-gray-500 text-xs rounded-lg"
                            >
                              ✕
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 group">
                            <span className="text-gray-700">
                              {req.expectedCompletionDate ? new Date(req.expectedCompletionDate).toLocaleDateString() : "—"}
                            </span>
                            <button
                              onClick={() => {
                                setEditingDate(req._id);
                                setTempDate(req.expectedCompletionDate ? new Date(req.expectedCompletionDate).toISOString().split("T")[0] : "");
                              }}
                              className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-gray-100 rounded-lg transition"
                            >
                              <Calendar size={14} className="text-gray-400" />
                            </button>
                          </div>
                        )}
                      </td>

                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 text-xs font-bold rounded-full capitalize ${getStatusStyle(req.status)}`}>
                          {req.status}
                        </span>
                      </td>

                      <td className="px-6 py-4 relative">
                        <button
                          onClick={() => setOpenDropdown(openDropdown === req._id ? null : req._id)}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 border border-gray-200 rounded-lg text-xs font-medium hover:bg-gray-200 transition"
                        >
                          Status <ChevronDown size={14} />
                        </button>

                        {openDropdown === req._id && (
                          <div className="absolute right-0 mt-1 w-40 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden">
                            {statusOptions.map((option) => (
                              <button
                                key={option}
                                onClick={() => updateStatus(req.user?._id, req._id, option)}
                                className={`block w-full text-left px-4 py-2.5 text-xs hover:bg-gray-50 capitalize transition ${
                                  req.status === option ? "text-green-600 font-bold" : "text-gray-700"
                                }`}
                              >
                                {option}
                              </button>
                            ))}
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}

                  {filteredRequests.length === 0 && (
                    <tr>
                      <td colSpan="7" className="text-center py-12 text-gray-400">
                        No maintenance requests found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
}