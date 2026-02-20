import { useState } from "react";
import { productsCard, CategoryFurniture } from "../Alldata";

export default function Layout() {
    const [selected, setSelected] = useState("");

    const handleChange = (value) => {
        setSelected((prev) => (prev === value ? "" : value));
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row">

            {/* LEFT SIDEBAR */}
            <div className="hidden md:block md:w-[20%] p-6 border-r">

                <input
                    type="text"
                    placeholder="Search..."
                    className="w-full border rounded px-3 py-2 mb-6"
                />

                <p className="font-bold text-2xl mb-4">Filters</p>

                <p className="mb-2 text-lg font-bold">Category</p>

                <div className="flex flex-col gap-2">

                    <label className="flex items-center gap-2">
                        <input
                            className="rounded-sm text-green-600 focus:ring-green-500"
                            type="checkbox"
                            checked={selected === "Furniture"}
                            onChange={() => handleChange("Furniture")}
                        />
                        Furniture
                    </label>

                    <label className="flex items-center gap-2">
                        <input
                            className="rounded-sm text-green-600 focus:ring-green-500"
                            type="checkbox"
                            checked={selected === "Appliances"}
                            onChange={() => handleChange("Appliances")}
                        />
                        Appliances
                    </label>

                    <p className="mt-4 mb-2 text-lg font-bold">Type</p>

                    {CategoryFurniture.map((v, i) => (
                        <CatFun key={i} d={v} />
                    ))}

                </div>
            </div>

            {/* RIGHT CONTENT */}
            <div className="w-full md:w-[80%] p-6">
                <h2 className="text-2xl font-semibold mb-4">Products</h2>

                {selected && (
                    <p className="mb-4 text-green-600">
                        Showing: {selected}
                    </p>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {productsCard.map((v, i) => (
                        <ProductCard key={i} data={v} />
                    ))}
                </div>
            </div>

        </div>
    );
}

/* ================= PRODUCT CARD ================= */

function ProductCard({ data }) {
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-[0_20px_60px_rgba(34,197,94,0.35)] hover:-translate-y-2 group">

            <div className="overflow-hidden">
                <img
                    src={data.img}
                    alt={data.title}
                    className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-110"
                />
            </div>

            <div className="p-5">

                <h3 className="text-xl font-bold mb-2">{data.title}</h3>

                <p className="text-gray-600 text-sm mb-4">
                    {data.description}
                </p>

                <div className="flex justify-between items-start mb-3">

                    <div>
                        <span className="text-base font-medium text-gray-700">
                            Monthly Rent
                        </span>
                        <div className="text-xl font-bold text-green-600">
                            {data.price}
                        </div>
                    </div>

                    <div className="text-right">
                        <span className="text-base font-medium text-gray-700">
                            Deposit
                        </span>
                        <div className="text-lg font-semibold">
                            {data.deposit}
                        </div>
                    </div>

                </div>

                <div className="flex gap-2 mt-3">
                    <span className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-full">3mo</span>
                    <span className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-full">6mo</span>
                    <span className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-full">12mo</span>
                </div>

            </div>
        </div>
    );
}

/* ================= CATEGORY ITEM ================= */

function CatFun({ d }) {
    return (
        <label className="flex items-center gap-2">
            <input className="rounded-sm text-green-600 focus:ring-green-500" type="checkbox" />
            {d.name}
        </label>
    );
}