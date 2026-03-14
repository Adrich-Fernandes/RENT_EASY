import React, { useEffect } from "react";
import { Route, Routes } from "react-router";
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

function UserSync() {
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      axios.post("http://localhost:4000/api/user/create", {
        clerkId: user.id,
        name: user.fullName || user.firstName || "User",
        email: user.primaryEmailAddress?.emailAddress
      }).catch(err => console.error("Failed to sync user:", err));
    }
  }, [user]);

  return null;
}

export default function App() {
  return (
    <>
      <UserSync />
      <Routes>
        {/* user routs */}
        <Route path="/" element={<Homepage />} />
        <Route path="/productlist" element={<ProductList />} />
        <Route path="/productview" element={<ProductView />} />
        <Route path="/myrentals/ActiveRents" element={<ActiveRents />} />
        <Route path="/myrentals/pastRents" element={<PastCards />} />
        <Route path="/myrentals/maintenance" element={<Maintain />} />
        <Route path="/myrentals/orders" element={<Order/>} />
        <Route path="/cart" element={<Cart />} />

        {/* admin routs */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/products" element={<AdminProductList />} />
        <Route path="/admin/rents" element={<AdminRents />} />
        <Route path="/admin/maintenance" element={<MaintenanceRequests />} />
      </Routes>
    </>
  );
}