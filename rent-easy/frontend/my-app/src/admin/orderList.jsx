import React from 'react'
import { adminTableRents } from '../home/Alldata'

export default function OrderList() {
  return (

    <div className="w-full p-8 ">
      <div className="bg-white shadow-md rounded-xl overflow-hidden">

        <table className="w-full text-left border-collapse">

          {/* TABLE HEAD */}
          <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
            <tr>
              <th className="p-4">Product</th>
              <th className="p-4">Category</th>
              <th className="p-4">Monthly Rent</th>
              <th className="p-4">Deposit</th>
              <th className="p-4">Edit</th>
              <th className="p-4">Delete</th>
            </tr>
          </thead>

          {/* TABLE BODY */}
          <tbody className="text-gray-700">
            {
              adminTableRents.map((v, i) => (
                <Tablerow data={v} />
              ))
            }
          </tbody>
        </table>

      </div>
    </div>


  )
}

function Tablerow({ data }) {
  <tr className="border-t hover:bg-gray-50 transition">
    {/* PRODUCT (Image + Title) */}
    <td className="p-4">
      <div className="flex items-center gap-4">
        <img
          src={data.img}
          alt="product"
          className="w-14 h-14 object-cover rounded-lg" />
        <span className="font-semibold">{data.title}</span>
      </div>
    </td>

    {/* CATEGORY */}
    <td className="p-4">
      <span className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-full">{data.category}</span>
    </td>

    {/* MONTHLY RENT */}
    <td className="p-4">{data.rent}</td>

    {/* DEPOSIT */}
    <td className="p-4">{data.deposit}</td>

    {/* EDIT BUTTON */}
    <td className="p-4">
      <button className="px-4 py-2 text-sm border border-green-500 text-green-600 bg-white rounded-lg hover:bg-green-50 transition">Edit</button>
    </td>

    {/* DELETE BUTTON */}
    <td className="p-4">
      <button className="px-4 py-2 text-sm border border-red-400 text-red-500 bg-white rounded-lg hover:bg-red-50 transition">Delete</button>
    </td>
  </tr>
}