import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import Homepage from "./home/homepage";
import ProductList from "./products/productlist";
import ProductView from "./products/productView";
import Cart from "./home/cart";
import AdminDashboard from "./admin/adminDashboard.jsx";
import AdminProductList from "./admin/adminProductList.jsx";
import MaintenanceRequests from "./admin/mantain.jsx";
import ActiveRents from "./MyRentals/activeRentals.jsx";
import Maintain from "./MyRentals/maintenance.jsx";
import Order from "./MyRentals/orders.jsx";
import AdminOrders from "./admin/AdminOrders.jsx";
import ExpiringRentals from "./admin/expiringRentals.jsx";
import Contact from "./home/contact.jsx";
import IssueStatus from "./home/issueStatus.jsx";

function UserSync({ setRole, setRoleLoaded }) {
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (!isLoaded) return;

    if (!user) {
      setRole(null);
      setRoleLoaded(true);
      return;
    }

    axios
      .post("http://localhost:4000/api/user/create", {
        clerkId: user.id,
        name: user.fullName || user.firstName || "User",
        email: user.primaryEmailAddress?.emailAddress,
      })
      .then(() => axios.get(`http://localhost:4000/api/user/${user.id}`))
      .then((res) => setRole(res.data?.role || "user"))
      .catch((err) => {
        console.error("Failed to sync user:", err);
        setRole("user");
      })
      .finally(() => setRoleLoaded(true));
  }, [user, isLoaded]);

  return null;
}

// Blocks non-admins from admin routes
function AdminRoute({ role, roleLoaded, children }) {
  if (!roleLoaded) return <Spinner />;
  if (role !== "admin") return <Navigate to="/" replace />;
  return children;
}

// Blocks admins from user routes — redirects them to /admin
function UserRoute({ role, roleLoaded, children }) {
  if (!roleLoaded) return <Spinner />;
  if (role === "admin") return <Navigate to="/admin" replace />;
  return children;
}

function Spinner() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-8 h-8 border-4 border-red-400 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export default function App() {
  const [role, setRole] = useState(null);
  const [roleLoaded, setRoleLoaded] = useState(false);

  return (
    <>
      <UserSync setRole={setRole} setRoleLoaded={setRoleLoaded} />
      <Routes>

        {/* ── User Routes — admin gets redirected to /admin ── */}
        <Route path="/" element={<UserRoute role={role} roleLoaded={roleLoaded}><Homepage /></UserRoute>} />
        <Route path="/productlist" element={<UserRoute role={role} roleLoaded={roleLoaded}><ProductList /></UserRoute>} />
        <Route path="/productview" element={<UserRoute role={role} roleLoaded={roleLoaded}><ProductView /></UserRoute>} />
        <Route path="/cart" element={<UserRoute role={role} roleLoaded={roleLoaded}><Cart /></UserRoute>} />
        <Route path="/myrentals" element={<Navigate to="/myrentals/ActiveRents" replace />} />
        <Route path="/myrentals/ActiveRents" element={<UserRoute role={role} roleLoaded={roleLoaded}><ActiveRents /></UserRoute>} />
        <Route path="/myrentals/maintenance" element={<UserRoute role={role} roleLoaded={roleLoaded}><Maintain /></UserRoute>} />
        <Route path="/myrentals/orders" element={<UserRoute role={role} roleLoaded={roleLoaded}><Order /></UserRoute>} />
        <Route path="/contact" element={<UserRoute role={role} roleLoaded={roleLoaded}><Contact /></UserRoute>} />
        <Route path="/report-issue" element={<UserRoute role={role} roleLoaded={roleLoaded}><div className="pt-20 text-center">Report Issue Page Coming Soon</div></UserRoute>} />
        <Route path="/issue-status" element={<UserRoute role={role} roleLoaded={roleLoaded}><IssueStatus /></UserRoute>} />

        {/* ── Admin Routes — non-admins get redirected to / ── */}
        <Route path="/admin" element={<AdminRoute role={role} roleLoaded={roleLoaded}><AdminDashboard /></AdminRoute>} />
        <Route path="/admin/products" element={<AdminRoute role={role} roleLoaded={roleLoaded}><AdminProductList /></AdminRoute>} />
        <Route path="/admin/maintenance" element={<AdminRoute role={role} roleLoaded={roleLoaded}><MaintenanceRequests /></AdminRoute>} />
        <Route path="/admin/orders" element={<AdminRoute role={role} roleLoaded={roleLoaded}><AdminOrders/></AdminRoute>} />
        <Route path="/admin/expiring" element={<AdminRoute role={role} roleLoaded={roleLoaded}><ExpiringRentals/></AdminRoute>} />

      </Routes>
    </>
  );
}
