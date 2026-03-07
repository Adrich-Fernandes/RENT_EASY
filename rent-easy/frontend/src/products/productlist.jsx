import { useState, useEffect } from "react";
import { productsCard, CategoryFurniture } from "../Alldata";
import { SlidersHorizontal } from "lucide-react";
import axios from "axios";

export default function Layout() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:4000/api/product/allProducts")
            .then((res) => {
                setProducts(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const [selected, setSelected] = useState("");
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [showMobileFilter, setShowMobileFilter] = useState(false);

    const handleChange = (value) => {
        setSelected((prev) => (prev === value ? "" : value));
    };

    const handleType = (value) => {
        setSelectedTypes((prev) =>
            prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
        );
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row">

            {/* ── MOBILE FILTER BAR ── */}
            <div className="md:hidden px-4 pt-4 space-y-3">

                {/* Search + Filter toggle */}
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                    />
                    <button
                        onClick={() => setShowMobileFilter(!showMobileFilter)}
                        className="flex items-center gap-1.5 px-3 py-2 border rounded-lg text-sm text-green-700 bg-green-50 hover:bg-green-100 transition"
                    >
                        <SlidersHorizontal size={16} />
                        Filters
                    </button>
                </div>

                {/* Category chips */}
                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                    {["Furniture", "Appliances"].map((cat) => (
                        <button
                            key={cat}
                            onClick={() => handleChange(cat)}
                            className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium border transition
                                ${selected === cat
                                    ? "bg-green-600 text-white border-green-600"
                                    : "bg-white text-gray-700 border-gray-300 hover:border-green-400"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Expandable type filter */}
                {showMobileFilter && (
                    <div className="bg-white border rounded-xl p-4 shadow-sm space-y-2">
                        <p className="text-sm font-bold text-gray-700 mb-2">Type</p>
                        <div className="flex flex-wrap gap-2">
                            {CategoryFurniture.map((v, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleType(v.name)}
                                    className={`px-3 py-1 rounded-full text-sm border transition
                                        ${selectedTypes.includes(v.name)
                                            ? "bg-green-600 text-white border-green-600"
                                            : "bg-white text-gray-600 border-gray-300 hover:border-green-400"
                                        }`}
                                >
                                    {v.name}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

            </div>

            {/* ── LEFT SIDEBAR (desktop) ── */}
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

            {/* ── RIGHT CONTENT ── */}
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