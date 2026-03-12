import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import UserNavBar from "../../components/userNavBar";
import { Home, Package, ClipboardList } from "lucide-react";

export default function TabBar() {
    const location = useLocation();

    const navItems = [
        { label: "Active Rentals", icon: <Home size={18} />, path: "/myrentals/ActiveRents" },
        { label: "Past Rentals", icon: <Package size={18} />, path: "/myrentals/pastRents" },
        { label: "Maintenance", icon: <ClipboardList size={18} />, path: "/myrentals/maintenance" },
    ];

    return (
        <>
            <UserNavBar />
            <div className="w-full mx-auto p-6">

                {/* Title Section */}
                <div className="mb-6">
                    <span className="text-3xl font-bold block">
                        My Rentals
                    </span>
                    <span className="text-gray-500 mt-1 block">
                        Manage your active and past rentals
                    </span>
                </div>

                {/* Tab Bar */}
                <div className="flex gap-4 flex-wrap">
                    {navItems.map((item) => (
                        <Link
                            key={item.label}
                            to={item.path}
                            className={`px-4 py-2 rounded-lg font-medium transition flex items-center gap-2
                                ${location.pathname === item.path
                                    ? "bg-green-600 text-white"
                                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                }`}
                        >
                            {item.icon}
                            {item.label}
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
}