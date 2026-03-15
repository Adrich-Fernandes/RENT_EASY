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
import AdminRents from "./admin/adminRents.jsx";
import MaintenanceRequests from "./admin/mantain.jsx";
import PastCards from "./MyRentals/pastRentals.jsx";
import ActiveRents from "./MyRentals/activeRentals.jsx";
import Maintain from "./MyRentals/maintenance.jsx";
import Order from "./MyRentals/orders.jsx";

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
      <div className="w-8 h-8 border-4 border-green-400 border-t-transparent rounded-full animate-spin" />
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
        <Route path="/myrentals/ActiveRents" element={<UserRoute role={role} roleLoaded={roleLoaded}><ActiveRents /></UserRoute>} />
        <Route path="/myrentals/pastRents" element={<UserRoute role={role} roleLoaded={roleLoaded}><PastCards /></UserRoute>} />
        <Route path="/myrentals/maintenance" element={<UserRoute role={role} roleLoaded={roleLoaded}><Maintain /></UserRoute>} />
        <Route path="/myrentals/orders" element={<UserRoute role={role} roleLoaded={roleLoaded}><Order /></UserRoute>} />

        {/* ── Admin Routes — non-admins get redirected to / ── */}
        <Route path="/admin" element={<AdminRoute role={role} roleLoaded={roleLoaded}><AdminDashboard /></AdminRoute>} />
        <Route path="/admin/products" element={<AdminRoute role={role} roleLoaded={roleLoaded}><AdminProductList /></AdminRoute>} />
        <Route path="/admin/rents" element={<AdminRoute role={role} roleLoaded={roleLoaded}><AdminRents /></AdminRoute>} />
        <Route path="/admin/maintenance" element={<AdminRoute role={role} roleLoaded={roleLoaded}><MaintenanceRequests /></AdminRoute>} />

      </Routes>
    </>
  );
}