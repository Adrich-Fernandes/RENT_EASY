import { useState, useEffect } from "react";
import { SlidersHorizontal } from "lucide-react";
import API from "../api/api";
import UserNavBar from "../components/userNavBar";
import { useNavigate } from "react-router-dom";

export default function Layout() {

    const [products, setProducts] = useState([]);
    const [selected, setSelected] = useState("");
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [showMobileFilter, setShowMobileFilter] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        API.get("/api/product/allProducts")
            .then((res) => {
                setProducts(res.data);
                setError(null);
            })
            .catch((err) => {
                console.error(err);
                setError("Failed to load products. Please try again.");
            })
            .finally(() => setLoading(false));
    }, []);

    const handleChange = (value) => {
        setSelected((prev) => (prev === value ? "" : value));
        setSelectedTypes([]);
    };

    const handleType = (value) => {
        setSelectedTypes((prev) =>
            prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
        );
    };

    const filteredProducts = products.filter((p) => {
        const matchCategory = selected
            ? p.category?.toLowerCase() === selected.toLowerCase()
            : true;
        const matchType = selectedTypes.length > 0
            ? selectedTypes.includes(p.subcategory)
            : true;
        const matchSearch = searchQuery
            ? p.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
              p.description?.toLowerCase().includes(searchQuery.toLowerCase())
            : true;
        return matchCategory && matchType && matchSearch;
    });

    const categories = [...new Set(products.map((p) => p.category).filter(Boolean))];
    const subcategories = [...new Set(
        products
            .filter((p) => selected ? p.category?.toLowerCase() === selected.toLowerCase() : true)
            .map((p) => p.subcategory)
            .filter(Boolean)
    )];

    return (
        <>
        <UserNavBar />
        <div className="min-h-screen flex flex-col md:flex-row">

            {/* ── MOBILE FILTER BAR ── */}
            <div className="md:hidden px-4 pt-4 space-y-3">
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                    />
                    <button
                        onClick={() => setShowMobileFilter(!showMobileFilter)}
                        className="flex items-center gap-1.5 px-3 py-2 border rounded-lg text-sm text-red-700 bg-red-50 hover:bg-red-100 transition"
                    >
                        <SlidersHorizontal size={16} />
                        Filters
                        {selectedTypes.length > 0 && (
                            <span className="ml-1 bg-red-600 text-white text-xs rounded-full px-1.5 py-0.5">
                                {selectedTypes.length}
                            </span>
                        )}
                    </button>
                </div>

                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => handleChange(cat)}
                            className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium border transition
                                ${selected === cat
                                    ? "bg-red-600 text-white border-red-600"
                                    : "bg-white text-gray-700 border-gray-300 hover:border-red-400"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {showMobileFilter && subcategories.length > 0 && (
                    <div className="bg-white border rounded-xl p-4 shadow-sm space-y-2">
                        <p className="text-sm font-bold text-gray-700 mb-2">Type</p>
                        <div className="flex flex-wrap gap-2">
                            {subcategories.map((v, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleType(v)}
                                    className={`px-3 py-1 rounded-full text-sm border transition
                                        ${selectedTypes.includes(v)
                                            ? "bg-red-600 text-white border-red-600"
                                            : "bg-white text-gray-600 border-gray-300 hover:border-red-400"
                                        }`}
                                >
                                    {v}
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
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full border rounded px-3 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-red-400"
                />

                <p className="font-bold text-2xl mb-4">Filters</p>
                <p className="mb-2 text-lg font-bold">Category</p>

                <div className="flex flex-col gap-2">
                    {categories.map((cat) => (
                        <label key={cat} className="flex items-center gap-2 cursor-pointer">
                            <input
                                className="rounded-sm text-red-600 focus:ring-red-500"
                                type="checkbox"
                                checked={selected === cat}
                                onChange={() => handleChange(cat)}
                            />
                            {cat}
                        </label>
                    ))}

                    {subcategories.length > 0 && (
                        <>
                            <p className="mt-4 mb-2 text-lg font-bold">Type</p>
                            {subcategories.map((v, i) => (
                                <label key={i} className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        className="rounded-sm text-red-600 focus:ring-red-500"
                                        type="checkbox"
                                        checked={selectedTypes.includes(v)}
                                        onChange={() => handleType(v)}
                                    />
                                    {v}
                                </label>
                            ))}
                        </>
                    )}
                </div>

                {(selected || selectedTypes.length > 0 || searchQuery) && (
                    <button
                        onClick={() => { setSelected(""); setSelectedTypes([]); setSearchQuery(""); }}
                        className="mt-6 w-full text-sm text-red-500 border border-red-200 rounded-lg py-2 hover:bg-red-50 transition"
                    >
                        Clear all filters
                    </button>
                )}
            </div>

            {/* ── RIGHT CONTENT ── */}
            <div className="w-full md:w-[80%] p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-semibold">Products</h2>
                    {!loading && (
                        <span className="text-sm text-gray-500">
                            {filteredProducts.length} result{filteredProducts.length !== 1 ? "s" : ""}
                        </span>
                    )}
                </div>

                {(selected || selectedTypes.length > 0) && (
                    <div className="flex flex-wrap gap-2 mb-4">
                        {selected && (
                            <span className="flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
                                {selected}
                                <button onClick={() => handleChange(selected)} className="ml-1 font-bold hover:text-red-900">×</button>
                            </span>
                        )}
                        {selectedTypes.map((t) => (
                            <span key={t} className="flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
                                {t}
                                <button onClick={() => handleType(t)} className="ml-1 font-bold hover:text-red-900">×</button>
                            </span>
                        ))}
                    </div>
                )}

                {/* Loading */}
                {loading && (
                    <div className="flex items-center justify-center h-64">
                        <div className="flex flex-col items-center gap-3">
                            <div className="w-10 h-10 border-4 border-red-500 border-t-transparent rounded-full animate-spin" />
                            <p className="text-gray-400 text-sm">Loading products...</p>
                        </div>
                    </div>
                )}

                {/* Error */}
                {!loading && error && (
                    <div className="flex items-center justify-center h-64">
                        <div className="text-center">
                            <p className="text-red-500 text-lg mb-3">{error}</p>
                            <button
                                onClick={() => window.location.reload()}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm"
                            >
                                Retry
                            </button>
                        </div>
                    </div>
                )}

                {/* Products grid */}
                {!loading && !error && filteredProducts.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProducts.map((v) => (
                            <div
                                key={v._id}
                                onClick={() => navigate("/productview", { state: { product: v } })}
                                className="cursor-pointer bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-[0_20px_60px_rgba(34,197,94,0.35)] hover:-translate-y-2 group"
                            >
                                <div className="relative overflow-hidden">
                                    <img
                                        src={v.imgs?.[0] || v.img}
                                        alt={v.title}
                                        className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <span className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-semibold shadow
                                        ${v.available
                                            ? "bg-red-500 text-white"
                                            : "bg-gray-400 text-white"
                                        }`}>
                                        {v.available ? "Available" : "Unavailable"}
                                    </span>
                                </div>

                                <div className="p-5">
                                    <h3 className="text-xl font-bold mb-2">{v.title}</h3>
                                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{v.description}</p>

                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <span className="text-base font-medium text-gray-700">Monthly Rent</span>
                                            <div className="text-xl font-bold text-red-600">₹{v.rent}</div>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-base font-medium text-gray-700">Deposit</span>
                                            <div className="text-lg font-semibold">₹{v.deposit}</div>
                                        </div>
                                    </div>

                                    <div className="flex gap-2 mt-3">
                                        <span className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded-full">3mo</span>
                                        <span className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded-full">6mo</span>
                                        <span className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded-full">12mo</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Empty */}
                {!loading && !error && filteredProducts.length === 0 && (
                    <div className="flex items-center justify-center h-64">
                        <p className="text-gray-400 text-lg">No products found.</p>
                    </div>
                )}
            </div>

        </div>
        </>
    );
}
