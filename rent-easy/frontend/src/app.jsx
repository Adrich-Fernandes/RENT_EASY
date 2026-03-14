import React from "react";
import { Route, Routes } from "react-router";
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




export default function App() {


  return (
    <>
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