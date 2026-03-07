import { useState } from "react";
import AdminRents from './adminRents';
import MaintenanceRequests from './mantain';
import AdminProductList from './adminProductList';

export default function AdminMain() {
    const [activeTab, setActiveTab] = useState("Product");
    const tabs = ["Product", "Rents", "Maintenance"];

    return (
        <div className="p-3 sm:p-4 md:p-6">

            {/* Tabs */}
            <div className="flex gap-2 sm:gap-3 mb-4 sm:mb-6 overflow-x-auto pb-2">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`whitespace-nowrap px-4 sm:px-5 py-2 text-xs sm:text-sm font-medium rounded-full transition ${
                            activeTab === tab
                                ? "bg-green-500 text-white"
                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div className="p-2 sm:p-4 md:p-5">
                {activeTab === "Product" && <AdminProductList />}
                {activeTab === "Rents" && <AdminRents />}
                {activeTab === "Maintenance" && <MaintenanceRequests />}
            </div>

        </div>
    );
}