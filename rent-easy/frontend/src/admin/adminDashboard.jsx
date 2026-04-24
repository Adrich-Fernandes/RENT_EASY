import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Package, ClipboardList, Wrench, TrendingUp, CheckCircle, Clock, XCircle } from 'lucide-react'
import AdminNavBar from '../components/adminNavBar'
import Skeleton from '../components/Skeleton'

export default function AdminDashboard() {

  const [stats, setStats] = useState({
    totalProducts: 0,
    totalRents: 0,
    activeRents: 0,
    pendingRents: 0,
    returnedRents: 0,
    cancelledRents: 0,
    openMaintenance: 0,
    resolvedMaintenance: 0,
  })

  const [recentRents, setRecentRents] = useState([])
  const [recentMaintenance, setRecentMaintenance] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const productsRes = await axios.get("http://localhost:4000/api/product/allProducts")
        const products = productsRes.data
        setStats(prev => ({ ...prev, totalProducts: products.length }))

        try {
          const rentsRes = await axios.get("http://localhost:4000/api/rent/allRents")
          const rents = rentsRes.data
          setStats(prev => ({
            ...prev,
            totalRents: rents.length,
            activeRents: rents.filter(r => r.status === "active" || r.status === "complete").length,
            pendingRents: rents.filter(r => ["ordered", "dispatch", "out for delivery", "return requested", "request conformed", "out for pickup"].includes(r.status)).length,
            returnedRents: rents.filter(r => r.status === "returned" || r.status === "completed").length,
            cancelledRents: rents.filter(r => r.status === "cancelled").length,
          }))
          setRecentRents(rents.slice(0, 5))
        } catch (e) {
          console.warn("Rents API failed:", e.message)
        }

        try {
          const maintenanceRes = await axios.get("http://localhost:4000/api/maintenance/allRequests")
          const maintenance = maintenanceRes.data
          setStats(prev => ({
            ...prev,
            openMaintenance: maintenance.filter(m => m.status === "open").length,
            resolvedMaintenance: maintenance.filter(m => m.status === "resolved").length,
          }))
          setRecentMaintenance(maintenance.slice(0, 5))
        } catch (e) {
          console.warn("Maintenance API failed:", e.message)
        }

      } catch (err) {
        console.error("Dashboard fetch error:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchAll()
  }, [])

  return (
    <>
      <AdminNavBar />

      {loading ? (
        <div className="w-full p-4 md:p-8 space-y-8">
          <div>
            <Skeleton width="150px" height="2rem" />
            <Skeleton width="120px" height="1rem" className="mt-2" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm p-5 flex items-center gap-4 border border-gray-100">
                <Skeleton width="46px" height="46px" borderRadius="0.5rem" />
                <div className="space-y-2">
                  <Skeleton width="60px" height="0.75rem" />
                  <Skeleton width="40px" height="1.5rem" />
                </div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 flex items-center gap-3">
                <Skeleton width="18px" height="18px" variant="circle" />
                <div className="space-y-1">
                  <Skeleton width="50px" height="0.75rem" />
                  <Skeleton width="30px" height="1rem" />
                </div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Skeleton height="300px" borderRadius="1rem" />
            <Skeleton height="300px" borderRadius="1rem" />
          </div>
        </div>
      ) : (
        <div className="w-full p-4 md:p-8 space-y-8">

          {/* HEADER */}
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
            <p className="text-sm text-gray-500 mt-1">Welcome back, Admin</p>
          </div>

          {/* STAT CARDS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

            <div className="bg-white rounded-xl shadow-sm p-5 flex items-center gap-4 border border-gray-100">
              <div className="bg-[#1D3557]/10 p-3 rounded-lg">
                <Package size={22} className="text-[#1D3557]" />
              </div>
              <div>
                <p className="text-xs text-gray-400">Total Products</p>
                <p className="text-2xl font-bold text-gray-800">{stats.totalProducts}</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-5 flex items-center gap-4 border border-gray-100">
              <div className="bg-[#A8DADC]/30 p-3 rounded-lg">
                <ClipboardList size={22} className="text-[#457B9D]" />
              </div>
              <div>
                <p className="text-xs text-gray-400">Total Rents</p>
                <p className="text-2xl font-bold text-gray-800">{stats.totalRents}</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-5 flex items-center gap-4 border border-gray-100">
              <div className="bg-[#A8DADC]/20 p-3 rounded-lg">
                <TrendingUp size={22} className="text-[#1D3557]" />
              </div>
              <div>
                <p className="text-xs text-gray-400">Active Rents</p>
                <p className="text-2xl font-bold text-gray-800">{stats.activeRents}</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-5 flex items-center gap-4 border border-gray-100">
              <div className="bg-[#1D3557]/10 p-3 rounded-lg">
                <Wrench size={22} className="text-[#1D3557]" />
              </div>
              <div>
                <p className="text-xs text-gray-400">Open Maintenance</p>
                <p className="text-2xl font-bold text-gray-800">{stats.openMaintenance}</p>
              </div>
            </div>

          </div>

          {/* RENT STATUS BREAKDOWN */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

            <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 flex items-center gap-3">
              <Clock size={18} className="text-yellow-500" />
              <div>
                <p className="text-xs text-gray-400">Pending</p>
                <p className="text-lg font-semibold text-gray-700">{stats.pendingRents}</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 flex items-center gap-3">
              <TrendingUp size={18} className="text-[#457B9D]" />
              <div>
                <p className="text-xs text-gray-400">Active</p>
                <p className="text-lg font-semibold text-gray-700">{stats.activeRents}</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 flex items-center gap-3">
              <CheckCircle size={18} className="text-[#1D3557]" />
              <div>
                <p className="text-xs text-gray-400">Returned</p>
                <p className="text-lg font-semibold text-gray-700">{stats.returnedRents}</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 flex items-center gap-3">
              <XCircle size={18} className="text-[#1D3557]" />
              <div>
                <p className="text-xs text-gray-400">Cancelled</p>
                <p className="text-lg font-semibold text-gray-700">{stats.cancelledRents}</p>
              </div>
            </div>

          </div>

          {/* RECENT TABLES */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* RECENT RENTS */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-5 border-b border-gray-100">
                <h2 className="font-semibold text-gray-800">Recent Rents</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                    <tr>
                      <th className="px-4 py-3">User</th>
                      <th className="px-4 py-3">Product</th>
                      <th className="px-4 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentRents.length > 0 ? recentRents.map((r, i) => (
                      <tr key={i} className="border-t hover:bg-gray-50 transition">
                        <td className="px-4 py-3 font-medium text-gray-700">{r.user?.name || "—"}</td>
                        <td className="px-4 py-3 text-gray-500">{r.product?.title || "—"}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                            (r.status === "active" || r.status === "complete") ? "bg-[#A8DADC]/30 text-[#457B9D]" :
                            (r.status === "ordered" || r.status === "dispatch" || r.status === "out for delivery") ? "bg-yellow-100 text-yellow-600" :
                            (r.status === "return requested" || r.status === "request conformed" || r.status === "out for pickup") ? "bg-orange-100 text-orange-600" :
                            (r.status === "returned" || r.status === "completed") ? "bg-[#1D3557]/10 text-[#1D3557]" :
                            "bg-[#1D3557]/10 text-[#1D3557]"
                          }`}>
                            {r.status}
                          </span>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan={3} className="px-4 py-6 text-center text-gray-400">No rents yet</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* RECENT MAINTENANCE */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-5 border-b border-gray-100">
                <h2 className="font-semibold text-gray-800">Recent Maintenance</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                    <tr>
                      <th className="px-4 py-3">User</th>
                      <th className="px-4 py-3">Issue</th>
                      <th className="px-4 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentMaintenance.length > 0 ? recentMaintenance.map((m, i) => (
                      <tr key={i} className="border-t hover:bg-gray-50 transition">
                        <td className="px-4 py-3 font-medium text-gray-700">{m.user?.name || "—"}</td>
                        <td className="px-4 py-3 text-gray-500 truncate max-w-[150px]">{m.issue}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                            m.status === "open" ? "bg-[#F1FAEE] text-[#1D3557]" :
                            m.status === "in-progress" ? "bg-yellow-100 text-yellow-600" :
                            "bg-[#1D3557]/10 text-[#1D3557]"
                          }`}>
                            {m.status}
                          </span>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan={3} className="px-4 py-6 text-center text-gray-400">No requests yet</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  )
}
