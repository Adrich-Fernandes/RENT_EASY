import { useState } from "react";
import { maintain } from "../Alldata";

export default function MaintenanceRequests() {
  const [users, setUsers] = useState(
    maintain.map((item) => ({
      ...item,
      status: "Pending",
    }))
  );

  const [openDropdown, setOpenDropdown] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingDate, setEditingDate] = useState(null);
  const [tempDate, setTempDate] = useState("");

  const statusOptions = ["Pending", "In progress", "Resolved"];

  const updateStatus = (index, newStatus) => {
    const updatedUsers = users.map((user, i) =>
      i === index ? { ...user, status: newStatus } : user
    );
    setUsers(updatedUsers);
    setOpenDropdown(null);
  };

  const handleEditDate = (index, currentDate) => {
    setEditingDate(index);
    setTempDate(currentDate ?? "");
  };

  const handleSaveDate = (index) => {
    const updatedUsers = users.map((user, i) =>
      i === index ? { ...user, resolveExpected: tempDate } : user
    );
    setUsers(updatedUsers);
    setEditingDate(null);
    setTempDate("");
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "In progress":
        return "bg-blue-100 text-blue-700";
      case "Resolved":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.product.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 md:p-6">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name, email, or product..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-80 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 text-sm md:text-base"
        />
      </div>

      <div className="w-full overflow-x-auto">
        <div className="min-w-[950px] bg-white shadow rounded-lg border border-gray-200">
          <table className="w-full text-xs md:text-sm text-left">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-4 md:px-6 py-3 font-medium">Customer</th>
                <th className="px-4 md:px-6 py-3 font-medium">Product</th>
                <th className="px-4 md:px-6 py-3 font-medium">Issue</th>
                <th className="px-4 md:px-6 py-3 font-medium">Request Date</th>
                <th className="px-4 md:px-6 py-3 font-medium">Resolve Expected</th>
                <th className="px-4 md:px-6 py-3 font-medium">Status</th>
                <th className="px-4 md:px-6 py-3 font-medium">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="px-4 md:px-6 py-3 md:py-4">
                    <div className="font-semibold">{user.name}</div>
                    <div className="text-gray-500 text-xs md:text-sm">{user.email}</div>
                  </td>

                  <td className="px-4 md:px-6 py-3 md:py-4">{user.product}</td>
                  <td className="px-4 md:px-6 py-3 md:py-4">{user.issue}</td>

                  <td className="px-4 md:px-6 py-3 md:py-4 text-gray-700">
                    {user.requestDate ?? "—"}
                  </td>

                  {/* Resolve Expected with Edit */}
                  <td className="px-4 md:px-6 py-3 md:py-4">
                    {editingDate === index ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="date"
                          value={tempDate}
                          onChange={(e) => setTempDate(e.target.value)}
                          className="border border-green-400 border-opacity-50 rounded-lg px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                        <button
                          onClick={() => handleSaveDate(index)}
                          className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white text-xs rounded-lg transition"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingDate(null)}
                          className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs rounded-lg transition"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="text-gray-700">{user.resolveExpected ?? "—"}</span>
                        <button
                          onClick={() => handleEditDate(index, user.resolveExpected)}
                          className="px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs rounded-lg border border-gray-300 transition"
                        >
                          Edit
                        </button>
                      </div>
                    )}
                  </td>

                  <td className="px-4 md:px-6 py-3 md:py-4">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusStyle(user.status)}`}>
                      {user.status}
                    </span>
                  </td>

                  <td className="px-4 md:px-6 py-3 md:py-4 relative">
                    <button
                      onClick={() => setOpenDropdown(openDropdown === index ? null : index)}
                      className="px-3 md:px-4 py-1.5 md:py-2 bg-gray-200 border border-gray-300 rounded-full text-xs md:text-sm hover:bg-gray-300 transition"
                    >
                      Change Status
                    </button>

                    {openDropdown === index && (
                      <div className="absolute right-0 mt-2 w-40 md:w-44 bg-white border border-gray-200 rounded-lg shadow-xl z-50">
                        {statusOptions.map((option) => (
                          <button
                            key={option}
                            onClick={() => updateStatus(index, option)}
                            className="block w-full text-left px-4 py-2 text-xs md:text-sm hover:bg-gray-100"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </td>
                </tr>
              ))}

              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center py-6 text-gray-500">
                    No results found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}