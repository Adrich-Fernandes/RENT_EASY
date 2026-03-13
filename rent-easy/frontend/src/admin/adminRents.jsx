import { useState, useEffect } from "react";
import axios from "axios";
import AdminNavBar from "../components/adminNavBar";

export default function AdminRents() {
  const [rents, setRents] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [tempDate, setTempDate] = useState("");

  const statusOptions = ["active", "pending", "returned", "cancelled"];

  // ── FETCH ALL RENTS ──────────────────────────────────────────
  const fetchRents = () => {
    axios.get("http://localhost:4000/api/rent/allRents")
      .then((res) => setRents(res.data))
      .catch((err) => console.error(err))
  }

  useEffect(() => {
    fetchRents()
  }, [])

  // ── UPDATE STATUS ────────────────────────────────────────────
  const updateStatus = (rentId, newStatus) => {
    axios.put(`http://localhost:4000/api/rent/updateStatus/${rentId}`, { status: newStatus })
      .then(() => {
        fetchRents()
        setOpenDropdown(null)
      })
      .catch((err) => console.error(err))
  }

  // ── EDIT DELIVERY DATE (local only) ─────────────────────────
  const handleEditDate = (index, currentDate) => {
    setEditingIndex(index)
    setTempDate(currentDate ?? "")
  }

  const handleSaveDate = (index) => {
    const updated = [...rents]
    updated[index] = { ...updated[index], deliveryDate: tempDate }
    setRents(updated)
    setEditingIndex(null)
    setTempDate("")
  }

  const handleCancelEdit = () => {
    setEditingIndex(null)
    setTempDate("")
  }

  const getStatusStyle = (status) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-700"
      case "pending": return "bg-yellow-100 text-yellow-700"
      case "returned": return "bg-blue-100 text-blue-700"
      case "cancelled": return "bg-red-100 text-red-700"
      default: return "bg-gray-100 text-gray-600"
    }
  }

  const filteredRents = rents.filter((r) =>
    r.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.product?.title?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <>
      <AdminNavBar />
      <div className="p-4 md:p-6 w-full">

        {/* Search */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by name, email, or product..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-80 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        <div className="w-full overflow-x-auto">
          <div className="relative bg-white shadow rounded-lg border border-gray-200 min-w-[900px]">
            <table className="w-full text-sm text-left">
              <thead className="text-sm bg-gray-100 border-b">
                <tr>
                  <th className="px-6 py-3 font-medium">Customer</th>
                  <th className="px-6 py-3 font-medium">Product</th>
                  <th className="px-6 py-3 font-medium">Start Date</th>
                  <th className="px-6 py-3 font-medium">End Date</th>
                  <th className="px-6 py-3 font-medium">Total Rent</th>
                  <th className="px-6 py-3 font-medium">Deposit</th>
                  <th className="px-6 py-3 font-medium">Expected Delivery</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 font-medium">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredRents.length > 0 ? filteredRents.map((rent, index) => (
                  <tr key={rent._id} className="border-b hover:bg-gray-50">

                    {/* Customer */}
                    <td className="px-6 py-4">
                      <div className="font-semibold">{rent.user?.name || "—"}</div>
                      <div className="text-gray-500 text-sm">{rent.user?.email || "—"}</div>
                    </td>

                    {/* Product */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {rent.product?.img && (
                          <img src={rent.product.img} alt="" className="w-10 h-10 object-cover rounded-lg" />
                        )}
                        <span>{rent.product?.title || "—"}</span>
                      </div>
                    </td>

                    {/* Start Date */}
                    <td className="px-6 py-4 text-gray-700">
                      {rent.startDate ? new Date(rent.startDate).toLocaleDateString() : "—"}
                    </td>

                    {/* End Date */}
                    <td className="px-6 py-4 text-gray-700">
                      {rent.endDate ? new Date(rent.endDate).toLocaleDateString() : "—"}
                    </td>

                    {/* Total Rent */}
                    <td className="px-6 py-4">₹{rent.totalRent}</td>

                    {/* Deposit */}
                    <td className="px-6 py-4">₹{rent.depositPaid}</td>

                    {/* Expected Delivery */}
                    <td className="px-6 py-4">
                      {editingIndex === index ? (
                        <div className="flex items-center gap-2">
                          <input
                            type="date"
                            value={tempDate}
                            onChange={(e) => setTempDate(e.target.value)}
                            className="border border-green-400 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                          />
                          <button
                            onClick={() => handleSaveDate(index)}
                            className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white text-xs rounded-lg"
                          >
                            Save
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs rounded-lg"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span>{rent.deliveryDate ?? "—"}</span>
                          <button
                            onClick={() => handleEditDate(index, rent.deliveryDate)}
                            className="px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs rounded-lg border"
                          >
                            Edit
                          </button>
                        </div>
                      )}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusStyle(rent.status)}`}>
                        {rent.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 relative">
                      <button
                        onClick={() => setOpenDropdown(openDropdown === index ? null : index)}
                        className="px-4 py-2 bg-gray-200 border border-gray-300 rounded-full text-sm hover:bg-gray-300"
                      >
                        Change Status
                      </button>

                      {openDropdown === index && (
                        <div className="absolute top-full left-0 mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-xl z-50">
                          {statusOptions.map((option) => (
                            <button
                              key={option}
                              onClick={() => updateStatus(rent._id, option)}
                              className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 capitalize"
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      )}
                    </td>

                  </tr>
                )) : (
                  <tr>
                    <td colSpan="9" className="text-center py-6 text-gray-500">
                      No rents found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}