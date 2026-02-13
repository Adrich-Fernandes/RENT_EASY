import React from 'react'

export default function OrderList() {
  return (
    <div className="relative overflow-x-auto bg-green-50 shadow-sm rounded-lg border border-green-200">
      <table className="w-full text-sm text-left text-gray-700">
        <thead className="text-sm bg-green-100 border-b border-green-200">
          <tr>
            <th className="px-6 py-3 font-semibold">Product name</th>
            <th className="px-6 py-3 font-semibold">Color</th>
            <th className="px-6 py-3 font-semibold">Category</th>
            <th className="px-6 py-3 font-semibold">Price</th>
            <th className="px-6 py-3 font-semibold">Edit</th>
            <th className="px-6 py-3 font-semibold">Delete</th>
          </tr>
        </thead>

        <tbody>
          <tr className="bg-white border-b border-green-100 hover:bg-green-50 transition">
            <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
              Apple MacBook Pro 17"
            </th>
            <td className="px-6 py-4">Silver</td>
            <td className="px-6 py-4">Laptop</td>
            <td className="px-6 py-4">$2999</td>
            <td className="px-6 py-4">
              <button className="px-4 py-1.5 text-sm font-medium 
                     bg-green-500 text-white rounded-md 
                     transition duration-200 
                     hover:bg-green-600 hover:shadow-[0_0_10px_rgba(34,197,94,0.6)]">
                Edit
              </button>
            </td>
            <td className="px-6 py-4">
              <button className="px-4 py-1.5 text-sm font-medium 
                     bg-red-500 text-white rounded-md 
                     transition duration-200 
                     hover:bg-red-600 hover:shadow-[0_0_10px_rgba(239,68,68,0.6)]">
                Delete
              </button>
            </td>

          </tr>
        </tbody>
      </table>
    </div>



  )
}