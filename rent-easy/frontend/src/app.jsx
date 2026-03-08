import React from "react";
import Homepage from "./home/homepage";
import ProductList from "./products/productlist";
import ProductView from "./products/productView";
import MyRentalsMain from "./MyRentals/myRentals";
import Cart from "./home/cart";
import UserNavBar from "../components/userNavBar.jsx";
import AdminNavBar from "../components/adminNavBar.jsx";
import AdminDashboard from "./admin/adminDashboard.jsx";
import AdminProductList from "./admin/adminProductList.jsx";
import AdminRents from "./admin/adminRents.jsx";
import MaintenanceRequests from "./admin/mantain.jsx";
import { Route, Routes } from "react-router";




export default function App() {


  return (
    <>
    <Routes>
      {/* user routs */}
      <Route path="/" element={<Homepage />} />
      <Route path="/productlist" element={<ProductList />} />
      <Route path="/productview" element={<ProductView />} />
      <Route path="/myrentals" element={<MyRentalsMain />} />
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