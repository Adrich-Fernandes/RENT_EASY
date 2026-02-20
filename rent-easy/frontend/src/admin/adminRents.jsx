import { useState } from "react";
import { CustomerRequest } from "../Alldata";

export default function AdminRents() {
  const [users, setUsers] = useState(CustomerRequest);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const statusOptions = ["Active", "Pending", "Completed", "Canceled"];

  const updateStatus = (index, newStatus) => {
    const updatedUsers = users.map((user, i) =>
      i === index ? { ...user, status: newStatus } : user
    );

    setUsers(updatedUsers);
    setOpenDropdown(null);
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Completed":
        return "bg-blue-100 text-blue-700";
      case "Canceled":
        return "bg-red-100 text-red-700";
      default:
        return "";
    }
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.product.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">

      {/* Search and table below */}

      {/* 🔎 Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name, email, or product..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-80 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>

      <div className="relative overflow-visible bg-white shadow rounded-lg border border-gray-200">
        <table className="w-full text-sm text-left">
          <thead className="text-sm bg-gray-100 border-b">
            <tr>
              <th className="px-6 py-3 font-medium">Customer</th>
              <th className="px-6 py-3 font-medium">Product</th>
              <th className="px-6 py-3 font-medium">Tenure</th>
              <th className="px-6 py-3 font-medium">Total</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="font-semibold">{user.name}</div>
                  <div className="text-gray-500 text-sm">
                    {user.email}
                  </div>
                </td>

                <td className="px-6 py-4">{user.product}</td>
                <td className="px-6 py-4">{user.tenure}</td>
                <td className="px-6 py-4">{user.total}</td>

                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusStyle(
                      user.status
                    )}`}
                  >
                    {user.status}
                  </span>
                </td>

                <td className="px-6 py-4 relative">
                  <button
                    onClick={() =>
                      setOpenDropdown(openDropdown === index ? null : index)
                    }
                    className="px-4 py-2 bg-gray-200 border border-gray-300 rounded-full text-sm hover:bg-gray-300 transition"
                  >
                    Change Status
                  </button>

                  {openDropdown === index && (
                    <div className="absolute top-full left-0 mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-xl z-50">
                      {statusOptions.map((option) => (
                        <button
                          key={option}
                          onClick={() => updateStatus(index, option)}
                          className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
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
                <td colSpan="6" className="text-center py-6 text-gray-500">
                  No results found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
