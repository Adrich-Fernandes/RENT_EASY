import React, { useState } from 'react'
import { adminTableRents } from '../home/Alldata'

export default function OrderList() {

  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [activeTab, setActiveTab] = useState("Products")

  const handleEditClick = (product) => {
    setSelectedProduct(product)
    setIsEditOpen(true)
  }

  return (
    <div className="w-full p-4 md:p-8 space-y-6">

      {/* ================= TABS ================= */}
      <div className="inline-flex bg-gray-100 rounded-2xl p-1 shadow-sm">
        {["Products", "Rentals", "Maintenance"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 text-sm font-medium rounded-xl transition
              ${activeTab === tab
                ? "bg-green-500 text-white shadow"
                : "text-gray-600 hover:bg-gray-200"}
            `}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => setIsAddOpen(true)}
          className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
        >
          Add New Product
        </button>
      </div>

      {/* ================= TABLE ================= */}
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
            {adminTableRents.map((v, i) => (
              <Tablerow
                key={i}
                data={v}
                onEdit={() => handleEditClick(v)}
              />
            ))}
          </tbody>

        </table>
      </div>

      {/* ================= EDIT MODAL ================= */}
      {isEditOpen && (
        <EditModal
          product={selectedProduct}
          onClose={() => setIsEditOpen(false)}
        />
      )}

      {/* ================= ADD MODAL ================= */}
      {isAddOpen && (
        <AddProductModal
          onClose={() => setIsAddOpen(false)}
        />
      )}

    </div>
  )
}


function Tablerow({ data, onEdit }) {
  return (
    <tr className="border-t hover:bg-gray-50 transition">

      <td className="p-4">
        <div className="flex items-center gap-4">
          <img
            src={data.img}
            alt="product"
            className="w-14 h-14 object-cover rounded-lg"
          />
          <span className="font-semibold">{data.title}</span>
        </div>
      </td>

      <td className="p-4">
        <span className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-full">
          {data.category}
        </span>
      </td>

      <td className="p-4">{data.rent}</td>
      <td className="p-4">{data.deposit}</td>

      <td className="p-4">
        <button
          onClick={onEdit}
          className="px-4 py-2 text-sm border border-green-500 text-green-600 rounded-lg hover:bg-green-50 transition"
        >
          Edit
        </button>
      </td>

      <td className="p-4">
        <button className="px-4 py-2 text-sm border border-red-400 text-red-500 rounded-lg hover:bg-red-50 transition">
          Delete
        </button>
      </td>

    </tr>
  )
}


/* ================= EDIT MODAL ================= */

function EditModal({ product, onClose }) {

  const [formData, setFormData] = useState(product)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <ModalLayout title="Edit Product" onClose={onClose}>
      <FormFields formData={formData} handleChange={handleChange} />
      <button className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition">
        Update Product
      </button>
    </ModalLayout>
  )
}


/* ================= ADD MODAL ================= */

function AddProductModal({ onClose }) {

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    subcategory: "",
    rent: "",
    deposit: "",
    img: ""
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <ModalLayout title="Add New Product" onClose={onClose}>
      <FormFields formData={formData} handleChange={handleChange} />
      <button className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition">
        Create Product
      </button>
    </ModalLayout>
  )
}


/* ================= REUSABLE LAYOUT ================= */

function ModalLayout({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[90%] md:w-[700px] rounded-xl p-6 shadow-lg relative">

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 text-xl"
        >
          ×
        </button>

        <h2 className="text-xl font-semibold mb-6">
          {title}
        </h2>

        <div className="space-y-4">
          {children}
        </div>

      </div>
    </div>
  )
}


/* ================= REUSABLE FORM FIELDS ================= */

function FormFields({ formData, handleChange }) {
  return (
    <>
      <div>
        <label className="block mb-1 font-medium">Product Name</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Description</label>
        <textarea
          name="description"
          value={formData.description || ""}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-medium">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Subcategory</label>
          <input
            type="text"
            name="subcategory"
            value={formData.subcategory || ""}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-medium">Monthly Rent (₹)</label>
          <input
            type="number"
            name="rent"
            value={formData.rent}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Security Deposit (₹)</label>
          <input
            type="number"
            name="deposit"
            value={formData.deposit}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>
      </div>

      <div>
        <label className="block mb-1 font-medium">Image URL</label>
        <input
          type="text"
          name="img"
          value={formData.img}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2"
        />
      </div>
    </>
  )
}
