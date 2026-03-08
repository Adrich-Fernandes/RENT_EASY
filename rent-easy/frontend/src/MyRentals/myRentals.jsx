import React, { useState } from "react";
import ActiveRents from "./activeRentals";
import PastCards from "./pastRentals";
import Maintain from "./maintenance";
import UserNavBar from "../../components/userNavBar";

export default function MyRentalsMain() {
    const [activeTab, setActiveTab] = useState("Active Rentals");

    const tabs = ["Active Rentals", "Past Rentals", "Maintenance"];

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
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 rounded-lg font-medium transition
              ${activeTab === tab
                                ? "bg-green-600 text-white"
                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Render Pages */}
            <div className="mt-6">
                <ActiveRents />
                <PastCards />
                <Maintain />
            </div>

        </div>
        </>
    );
}