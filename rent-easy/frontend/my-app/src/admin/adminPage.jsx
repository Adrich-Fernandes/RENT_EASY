import { useState } from "react";
import AdminRents from './adminRents';
import MaintenanceRequests from './mantain';
import AdminProductList from './adminProductList';


export default function AdminMain() {
    const [activeTab, setActiveTab] = useState("Product");
    const tabs = ["Product", "Rents", "Maintenance"];


    return (
        <div className="p-6">
            <div className="flex gap-3 mb-6">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-5 py-2 rounded-full text-sm font-medium transition ${activeTab === tab ? "bg-green-500 text-white"
                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}>
                        {tab}
                    </button>
                ))}
            </div>
            <div className="p-5">
                <AdminRents/>
                <AdminProductList/>
                <MaintenanceRequests/>
            </div>
        </div>
    );
}