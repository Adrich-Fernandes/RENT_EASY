import React, { useState, useEffect } from 'react'
import axios from 'axios'
import AdminNavBar from '../../components/adminNavBar'


const CLOUD_NAME = "dhajogfcx"    
const UPLOAD_PRESET = "products";

async function uploadToCloudinary(file) {
  const formData = new FormData()
  formData.append("file", file)
  formData.append("upload_preset", UPLOAD_PRESET)
  const res = await axios.post(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    formData
  )
  return res.data.secure_url
}

export default function AdminProductList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showAdd, setShowAdd] = useState(false)
  const [products, setProducts] = useState([])
  const [editProduct, setEditProduct] = useState(null)
  const [previewProduct, setPreviewProduct] = useState(null)

  const fetchProducts = () => {
    axios.get("http://localhost:4000/api/product/allProducts")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err))
  }

  useEffect(() => { fetchProducts() }, [])

  const filteredRents = products.filter((v) =>
    v.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.subcategory?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.rent?.toString().includes(searchQuery) ||
    v.deposit?.toString().includes(searchQuery)
  )

  return (
    <>
      <AdminNavBar />
      <div className="w-full p-4 md:p-8 space-y-6">

        {/* PREVIEW OVERLAY */}
        {previewProduct && (
          <div className="fixed inset-0 bg-black/40 z-[400] flex items-center justify-center px-4"
            onClick={() => setPreviewProduct(null)}
          >
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 space-y-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between">
                <h2 className="text-xl font-bold text-gray-800">{previewProduct.title}</h2>
                <button onClick={() => setPreviewProduct(null)} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
              </div>

              <img src={previewProduct.imgs?.[0] || previewProduct.img} alt={previewProduct.title}
                className="w-full h-52 object-cover rounded-xl" />

              <p className="text-sm text-gray-500">{previewProduct.description}</p>

              <div className="flex gap-2 flex-wrap">
                <span className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded-full">{previewProduct.category}</span>
                {previewProduct.subcategory && (
                  <span className="px-3 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">{previewProduct.subcategory}</span>
                )}
              </div>

              <div className="flex gap-6">
                <div>
                  <p className="text-xs text-gray-400">Monthly Rent</p>
                  <p className="text-lg font-semibold text-green-600">₹{previewProduct.rent}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Security Deposit</p>
                  <p className="text-lg font-semibold text-gray-700">₹{previewProduct.deposit}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setEditProduct(previewProduct)
                    setPreviewProduct(null)
                    setShowAdd(false)
                  }}
                  className="flex-1 py-2 text-sm border border-green-500 text-green-600 rounded-lg hover:bg-green-50 transition"
                >Edit</button>
                <button
                  onClick={() => {
                    if (window.confirm("Are you sure you want to delete this product?")) {
                      axios.delete(`http://localhost:4000/api/product/deleteProduct/${previewProduct._id}`)
                        .then(() => { fetchProducts(); setPreviewProduct(null) })
                        .catch((err) => console.error(err))
                    }
                  }}
                  className="flex-1 py-2 text-sm border border-red-400 text-red-500 rounded-lg hover:bg-red-50 transition"
                >Delete</button>
              </div>
            </div>
          </div>
        )}

        {/* ADD PRODUCT MODAL */}
        {showAdd && (
          <div className="fixed inset-0 bg-black/40 z-[400] flex items-center justify-center px-4"
            onClick={() => setShowAdd(false)}
          >
            <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <AddProduct setShowAdd={setShowAdd} onSuccess={fetchProducts} />
            </div>
          </div>
        )}

        {/* EDIT PRODUCT MODAL */}
        {editProduct && (
          <div className="fixed inset-0 bg-black/40 z-[400] flex items-center justify-center px-4"
            onClick={() => setEditProduct(null)}
          >
            <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <EditProduct product={editProduct} setEditProduct={setEditProduct} onSuccess={fetchProducts} />
            </div>
          </div>
        )}

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
            onClick={() => { setShowAdd(!showAdd); setEditProduct(null) }}
            className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition whitespace-nowrap"
          >
            Add New Product
          </button>
        </div>

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
                  <tr key={i} onClick={() => setPreviewProduct(v)}
                    className="border-t hover:bg-green-50 cursor-pointer transition"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-4">
                        <img src={v.imgs?.[0] || v.img} alt="product" className="w-14 h-14 object-cover rounded-lg" />
                        <span className="font-semibold">{v.title}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-full">{v.category}</span>
                    </td>
                    <td className="p-4">₹ {v.rent}</td>
                    <td className="p-4">₹ {v.deposit}</td>
                    <td className="p-4">
                      <button
                        onClick={(e) => { e.stopPropagation(); setEditProduct(v); setShowAdd(false) }}
                        className="px-4 py-2 text-sm border border-green-500 text-green-600 rounded-lg hover:bg-green-50 transition"
                      >Edit</button>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          if (window.confirm("Are you sure you want to delete this product?")) {
                            axios.delete(`http://localhost:4000/api/product/deleteProduct/${v._id}`)
                              .then(() => fetchProducts())
                              .catch((err) => console.error(err))
                          }
                        }}
                        className="px-4 py-2 text-sm border border-red-400 text-red-500 rounded-lg hover:bg-red-50 transition"
                      >Delete</button>
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
    </>
  )
}


// ─── Reusable image uploader with Cloudinary ───
function ImageUploader({ imgs, onChange }) {
  const [uploading, setUploading] = useState(false)

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files)
    if (!files.length) return
    setUploading(true)
    try {
      const urls = await Promise.all(files.map(uploadToCloudinary))
      onChange([...imgs, ...urls])
    } catch (err) {
      console.error("Upload failed", err)
      alert("Image upload failed. Check your Cloudinary credentials.")
    } finally {
      setUploading(false)
    }
  }

  const remove = (i) => onChange(imgs.filter((_, idx) => idx !== i))

  return (
    <div className="space-y-3">

      {/* Image previews */}
      {imgs.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {imgs.map((url, i) => (
            <div key={i} className="relative w-20 h-20 rounded-lg overflow-hidden border border-gray-200 group">
              <img src={url} alt="" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => remove(i)}
                className="absolute inset-0 bg-black/50 text-white text-xl opacity-0 group-hover:opacity-100 transition flex items-center justify-center"
              >×</button>
            </div>
          ))}
        </div>
      )}

      {/* Upload button */}
      <label className={`flex items-center gap-2 cursor-pointer w-fit px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-400 transition text-sm text-gray-500 hover:text-green-600 ${uploading ? "opacity-50 pointer-events-none" : ""}`}>
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12V4m0 0L8 8m4-4l4 4" />
        </svg>
        {uploading ? "Uploading..." : "Upload Images"}
        <input
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleFileChange}
        />
      </label>

    </div>
  )
}


// ─── Edit form ───
function EditProduct({ product, setEditProduct, onSuccess }) {
  const initImgs = product.imgs?.length > 0 ? product.imgs : product.img ? [product.img] : []

  const [formData, setFormData] = useState({
    title: product.title,
    description: product.description,
    category: product.category,
    subcategory: product.subcategory || "",
    rent: product.rent,
    deposit: product.deposit,
    imgs: initImgs,
  })

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.imgs.length === 0) return alert("Please upload at least one image.")
    axios.put(`http://localhost:4000/api/product/updateProduct/${product._id}`, formData)
      .then(() => { onSuccess(); setEditProduct(null) })
      .catch((err) => console.error(err))
  }

  return (
    <div className="bg-white shadow-md rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Edit Product</h2>
        <button onClick={() => setEditProduct(null)} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
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
            <select name="category" value={formData.category} onChange={handleChange} required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400">
              <option value="">Select a category</option>
              <option value="Furniture">Furniture</option>
              <option value="Appliance">Appliance</option>
            </select>
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
          <label className="block mb-2 text-sm font-medium text-gray-700">Images</label>
          <ImageUploader imgs={formData.imgs} onChange={(imgs) => setFormData({ ...formData, imgs })} />
        </div>

        <button type="submit"
          className="w-full bg-green-600 text-white py-2.5 rounded-lg font-medium hover:bg-green-700 transition">
          Update Product
        </button>
      </form>
    </div>
  )
}


// ─── Add form ───
function AddProduct({ setShowAdd, onSuccess }) {
  const [formData, setFormData] = useState({
    title: "", description: "", category: "", subcategory: "",
    rent: "", deposit: "", imgs: []
  })

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.imgs.length === 0) return alert("Please upload at least one image.")
    axios.post("http://localhost:4000/api/product/insertProduct", formData)
      .then(() => { onSuccess(); setShowAdd(false) })
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
            <select name="category" value={formData.category} onChange={handleChange} required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400">
              <option value="">Select a category</option>
              <option value="Furniture">Furniture</option>
              <option value="Appliance">Appliance</option>
            </select>
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
          <label className="block mb-2 text-sm font-medium text-gray-700">Images</label>
          <ImageUploader imgs={formData.imgs} onChange={(imgs) => setFormData({ ...formData, imgs })} />
        </div>

        <button type="submit"
          className="w-full bg-green-600 text-white py-2.5 rounded-lg font-medium hover:bg-green-700 transition">
          Create Product
        </button>
      </form>
    </div>
  )
}