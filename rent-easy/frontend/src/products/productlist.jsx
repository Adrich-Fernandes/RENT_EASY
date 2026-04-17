import { useState, useEffect } from "react";
import { SlidersHorizontal } from "lucide-react";
import axios from "axios";
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
        axios.get("http://localhost:4000/api/product/allProducts")
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
            .filter(Boolean))];
    return (
        <div className="bg-gray-50 min-h-screen">
        <UserNavBar />
        <div className="flex flex-col md:flex-row w-full max-w-[1536px] mx-auto px-4 md:px-8 pt-4">

            {/* ── MOBILE FILTER BAR ── */}
            <div className="md:hidden space-y-3 mb-4">
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-1 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#A8DADC] shadow-sm"
                    />
                    <button
                        onClick={() => setShowMobileFilter(!showMobileFilter)}
                        className="flex items-center gap-1.5 px-4 py-2 border border-[#457B9D]/30 rounded-xl text-sm font-medium text-[#1D3557] bg-white hover:bg-[#F1FAEE] transition shadow-sm"
                    >
                        <SlidersHorizontal size={16} />
                        Filters
                        {selectedTypes.length > 0 && (
                            <span className="ml-1 bg-[#1D3557] text-white text-xs rounded-full px-2 py-0.5">
                                {selectedTypes.length}
                            </span>
                        )}
                    </button>
                </div>

                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => handleChange(cat)}
                            className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium border transition shadow-sm
                                ${selected === cat
                                    ? "bg-[#1D3557] text-white border-[#1D3557]"
                                    : "bg-white text-gray-700 border-gray-200 hover:border-[#457B9D]"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {showMobileFilter && subcategories.length > 0 && (
                    <div className="bg-white border rounded-xl p-4 shadow-md space-y-2">
                        <p className="text-sm font-bold text-[#1D3557] mb-2">Type</p>
                        <div className="flex flex-wrap gap-2">
                            {subcategories.map((v, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleType(v)}
                                    className={`px-3 py-1 rounded-full text-sm font-medium border transition
                                        ${selectedTypes.includes(v)
                                            ? "bg-[#457B9D] text-white border-[#457B9D]"
                                            : "bg-gray-50 text-gray-600 border-gray-200 hover:border-[#457B9D]"
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
            <div className="hidden md:block w-72 p-6 shrink-0 h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto hidden-scrollbar">
                
                <h3 className="font-extrabold text-[#1D3557] text-2xl mb-6">Filters</h3>
                
                <div className="relative mb-8">
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#A8DADC] shadow-sm bg-white"
                    />
                </div>

                <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                    <p className="mb-4 text-lg font-bold text-gray-800 tracking-tight">Category</p>
                    <div className="flex flex-col gap-3">
                        {categories.map((cat) => (
                            <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                                <div className="relative flex items-center justify-center">
                                    <input
                                        className="peer appearance-none w-5 h-5 border border-gray-300 rounded cursor-pointer checked:bg-[#1D3557] checked:border-[#1D3557] transition-all"
                                        type="checkbox"
                                        checked={selected === cat}
                                        onChange={() => handleChange(cat)}
                                    />
                                    <svg className="absolute w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <span className="text-gray-600 group-hover:text-[#1D3557] transition-colors">{cat}</span>
                            </label>
                        ))}

                        {subcategories.length > 0 && (
                            <>
                                <div className="h-px bg-gray-100 my-2"></div>
                                <p className="mb-3 text-lg font-bold text-gray-800 tracking-tight">Type</p>
                                {subcategories.map((v, i) => (
                                    <label key={i} className="flex items-center gap-3 cursor-pointer group">
                                        <div className="relative flex items-center justify-center">
                                            <input
                                                className="peer appearance-none w-5 h-5 border border-gray-300 rounded cursor-pointer checked:bg-[#457B9D] checked:border-[#457B9D] transition-all"
                                                type="checkbox"
                                                checked={selectedTypes.includes(v)}
                                                onChange={() => handleType(v)}
                                            />
                                            <svg className="absolute w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <span className="text-gray-600 group-hover:text-[#457B9D] transition-colors">{v}</span>
                                    </label>
                                ))}
                            </>
                        )}
                    </div>
                </div>

                {(selected || selectedTypes.length > 0 || searchQuery) && (
                    <button
                        onClick={() => { setSelected(""); setSelectedTypes([]); setSearchQuery(""); }}
                        className="mt-6 w-full text-sm font-semibold text-[#457B9D] bg-[#A8DADC]/10 border border-[#A8DADC]/40 rounded-xl py-2.5 hover:bg-[#A8DADC]/30 transition-colors"
                    >
                        Clear all filters
                    </button>
                )}
            </div>

            {/* ── RIGHT CONTENT ── */}
            <div className="flex-1 p-4 md:p-6 lg:p-8">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-3xl font-bold text-gray-900 tracking-tight">All Products</h2>
                    {!loading && (
                        <span className="text-sm font-medium px-3 py-1 bg-white border rounded-full text-gray-500 shadow-sm">
                            {filteredProducts.length} result{filteredProducts.length !== 1 ? "s" : ""}
                        </span>
                    )}
                </div>

                {(selected || selectedTypes.length > 0) && (
                    <div className="flex flex-wrap gap-2 mb-6">
                        {selected && (
                            <span className="flex items-center gap-1.5 px-3 py-1 bg-[#1D3557]/10 text-[#1D3557] font-medium rounded-full text-sm border border-[#1D3557]/20">
                                {selected}
                                <button onClick={() => handleChange(selected)} className="ml-1 w-4 h-4 rounded-full bg-[#1D3557]/20 flex items-center justify-center hover:bg-[#1D3557] hover:text-white transition-colors">×</button>
                            </span>
                        )}
                        {selectedTypes.map((t) => (
                            <span key={t} className="flex items-center gap-1.5 px-3 py-1 bg-[#457B9D]/10 text-[#457B9D] font-medium rounded-full text-sm border border-[#457B9D]/20">
                                {t}
                                <button onClick={() => handleType(t)} className="ml-1 w-4 h-4 rounded-full bg-[#457B9D]/20 flex items-center justify-center hover:bg-[#457B9D] hover:text-white transition-colors">×</button>
                            </span>
                        ))}
                    </div>
                )}

                {/* Loading */}
                {loading && (
                    <div className="flex items-center justify-center h-64">
                        <div className="flex flex-col items-center gap-3">
                            <div className="w-10 h-10 border-4 border-[#1D3557] border-t-transparent rounded-full animate-spin" />
                            <p className="text-gray-500 text-sm font-medium">Loading premium products...</p>
                        </div>
                    </div>
                )}

                {/* Error */}
                {!loading && error && (
                    <div className="flex items-center justify-center h-64">
                        <div className="text-center bg-white p-6 rounded-2xl shadow-sm border border-red-100">
                            <p className="text-red-500 text-lg mb-4 font-medium">{error}</p>
                            <button
                                onClick={() => window.location.reload()}
                                className="px-6 py-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 font-semibold transition text-sm"
                            >
                                Try Again
                            </button>
                        </div>
                    </div>
                )}

                {/* Products grid */}
                {!loading && !error && filteredProducts.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                        {filteredProducts.map((v) => (
                            <div
                                key={v._id}
                                onClick={() => navigate("/productview", { state: { product: v } })}
                                className="flex flex-col cursor-pointer bg-white rounded-2xl border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-[0_20px_40px_-15px_rgba(29,53,87,0.15)] hover:-translate-y-1 group"
                            >
                                <div className="relative overflow-hidden h-56 bg-gray-100">
                                    <img
                                        src={v.imgs?.[0] || v.img}
                                        alt={v.title}
                                        className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    
                                    <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold tracking-wide shadow-sm backdrop-blur-md
                                        ${v.available
                                            ? "bg-emerald-500/95 text-white"
                                            : "bg-gray-800/90 text-white"
                                        }`}>
                                        {v.available ? "Available" : "Checked Out"}
                                    </span>
                                </div>

                                <div className="p-5 flex flex-col flex-1">
                                    <div className="mb-4 flex-1">
                                        <h3 className="text-lg font-bold text-gray-900 mb-1.5 line-clamp-1 group-hover:text-[#1D3557] transition-colors">{v.title}</h3>
                                        <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed">{v.description}</p>
                                    </div>

                                    <div className="bg-gray-50 rounded-xl p-4 mb-4 border border-gray-100 flex justify-between items-center">
                                        <div>
                                            <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-0.5">Rent</span>
                                            <div className="text-xl font-extrabold text-[#1D3557]">₹{v.rent}<span className="text-sm font-medium text-gray-500">/mo</span></div>
                                        </div>
                                        <div className="w-px h-8 bg-gray-200"></div>
                                        <div className="text-right">
                                            <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-0.5">Deposit</span>
                                            <div className="text-base font-bold text-gray-700">₹{v.deposit}</div>
                                        </div>
                                    </div>

                                    <button className="w-full py-2.5 bg-white border border-[#1D3557]/20 text-[#1D3557] font-semibold rounded-xl text-sm group-hover:bg-[#1D3557] group-hover:text-white transition-colors duration-300">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Empty */}
                {!loading && !error && filteredProducts.length === 0 && (
                    <div className="flex flex-col items-center justify-center p-12 bg-white rounded-2xl border border-dashed border-gray-300">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 text-gray-400">
                            <SlidersHorizontal size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">No matching products</h3>
                        <p className="text-gray-500 text-center max-w-md">Try adjusting your filters or search query to find what you're looking for.</p>
                        <button
                            onClick={() => { setSelected(""); setSelectedTypes([]); setSearchQuery(""); }}
                            className="mt-6 px-6 py-2.5 bg-[#1D3557] text-white font-medium rounded-xl hover:bg-[#457B9D] transition-colors"
                        >
                            Reset all filters
                        </button>
                    </div>
                )}
            </div>

        </div>
        </div>
    );
}
