import React from 'react';
import Homepage from './home/homepage';
import ProductList from './products/productlist';
import ProductView from './products/productView';
import AdminMain from './admin/adminPage';


export default function App() {
    return (
        <div>
            <nav className="w-full h-16  z-50 shadow-md px-8 flex items-center justify-between">
                {/* LEFT SECTION */}
                <div className="flex items-center rounded-full gap-3">
                    <img src="https://marketplace.canva.com/EAGnxDAh8CA/1/0/1600w/canva-gray-and-green-minimalist-furniture-logo-Qe5E3yitCmk.jpg" alt="Logo" className=" rounded-full w-9 h-9 object-contain" />
                    <h1 className="text-2xl font-extrabold"><span className="text-green-600">Rent</span>Ease</h1>
                </div>
                {/* CENTER LINKS */}
                <div className="hidden md:flex items-center gap-8">
                    {["Home", "Products", "MyRents"].map((item) => (
                        <a key={item} href="#" className="px-4 py-2 font-bold text-green-500 bg-green-50 rounded-xl transition-all duration-300 hover:bg-green-100 ">{item}</a>
                    ))}
                </div>
                {/* RIGHT SECTION */}
                <div className="flex items-center gap-6">
                    {/* Cart Image */}
                    <div className="p-2 rounded-full bg-green-50 hover:bg-green-100 transition duration-300 cursor-pointer">
                        <img src="https://cdn-icons-png.flaticon.com/512/263/263142.png" alt="Cart" className="w-5 h-5" />
                    </div>

                    {/* Sign Up Button */}
                    <button className="px-6 py-2 font-bold text-white bg-green-600 rounded-xl shadow-[0_0_20px_rgba(34,197,94,0.6)] hover:bg-green-700 hover:shadow-[0_0_30px_rgba(34,197,94,0.8)] transition-all duration-300">Sign Up</button>
                </div>
            </nav>
            <div>
                {/* <Homepage /> */}
                <ProductList />
                {/* <ProductView /> */}
                {/* <AdminMain /> */}
            </div>
        </div>
    );
}