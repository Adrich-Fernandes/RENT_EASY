import React, { useState } from "react"

export default function Rentals() {

  const [status, setStatus] = useState("pending")

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">

      <h2 className="text-xl font-semibold mb-6">Recent Rentals</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">

          {/* ================= TABLE HEAD ================= */}
          <thead className="border-b">
            <tr className="text-gray-600">
              <th className="pb-3">Customer</th>
              <th className="pb-3">Product</th>
              <th className="pb-3">Tenure</th>
              <th className="pb-3">Total</th>
              <th className="pb-3">Status</th>
              <th className="pb-3">Actions</th>
            </tr>
          </thead>

          {/* ================= TABLE ROW ================= */}
          <tbody>
            <tr className="border-b hover:bg-gray-50 transition">
              <td className="py-4">thorfin</td>
              <td className="py-4">luxury sofa</td>
              <td className="py-4">3mo</td>
              <td className="py-4">₹3,000</td>
              <td className="py-4">
                <span className="px-3 py-1 text-sm bg-yellow-100 text-yellow-700 rounded-full">
                  {status}
                </span>
              </td>
              <td className="py-4">
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="border rounded-lg px-3 py-2 outline-none"
                >
                  <option value="pending">pending</option>
                  <option value="active">active</option>
                  <option value="completed">completed</option>
                  <option value="cancel">cancel</option>
                </select>
              </td>
            </tr>
          </tbody>

        </table>
      </div>

    </div>
  )
}
