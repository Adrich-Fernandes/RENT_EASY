import React, { useState } from 'react'
import axios from 'axios'
import { adminTableRents } from '../Alldata'

export default function AdminProductList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showAdd, setShowAdd] = useState(false)

  const filteredRents = adminTableRents.filter((v) =>
    v.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.category?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="w-full p-4 md:p-8 space-y-6">

      {/* SEARCH + ADD ROW */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search by name or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
          />
        </div>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition whitespace-nowrap"
        >
          Add New Product
        </button>
      </div>

      {/* ADD PRODUCT FORM */}
      {showAdd && <AddProduct setShowAdd={setShowAdd} />}

      {/* TABLE */}
      <div className="bg-white shadow-md rounded-xl overflow-x-auto">
        <table className="w-full min-w-[700px] text-left border-collapse">
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
          <tbody className="text-gray-700">
            {filteredRents.length > 0 ? (
              filteredRents.map((v, i) => (
                <tr key={i} className="border-t hover:bg-gray-50 transition">
                  <td className="p-4">
                    <div className="flex items-center gap-4">
                      <img src={v.img} alt="product" className="w-14 h-14 object-cover rounded-lg" />
                      <span className="font-semibold">{v.title}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-full">
                      {v.category}
                    </span>
                  </td>
                  <td className="p-4">{v.rent}</td>
                  <td className="p-4">{v.deposit}</td>
                  <td className="p-4">
                    <button className="px-4 py-2 text-sm border border-green-500 text-green-600 rounded-lg hover:bg-green-50 transition">
                      Edit
                    </button>
                  </td>
                  <td className="p-4">
                    <button className="px-4 py-2 text-sm border border-red-400 text-red-500 rounded-lg hover:bg-red-50 transition">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="p-8 text-center text-gray-400 text-sm">
                  No products found matching "{searchQuery}"
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  )
}


function AddProduct({ setShowAdd }) {

  const [formData, setFormData] = useState({
    title: "", description: "", category: "", subcategory: "", rent: "", deposit: "", img: ""
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post("http://localhost:4000/api/product/insertProduct", formData)
      .then((res) => {
        console.log(res.data)
        setShowAdd(false)
      })
      .catch((err) => console.error(err))
  }

  return (
    <div className="bg-white shadow-md rounded-xl p-6">

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Add New Product</h2>
        <button onClick={() => setShowAdd(false)} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Product Name</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} rows={3} required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Category</label>
            <input type="text" name="category" value={formData.category} onChange={handleChange} required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Subcategory</label>
            <input type="text" name="subcategory" value={formData.subcategory} onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Monthly Rent (₹)</label>
            <input type="number" name="rent" value={formData.rent} onChange={handleChange} required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Security Deposit (₹)</label>
            <input type="number" name="deposit" value={formData.deposit} onChange={handleChange} required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
          </div>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Image URL</label>
          <input type="text" name="img" value={formData.img} onChange={handleChange} required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
        </div>

        <button type="submit"
          className="w-full bg-green-600 text-white py-2.5 rounded-lg font-medium hover:bg-green-700 transition">
          Create Product
        </button>

      </form>
    </div>
  )
}