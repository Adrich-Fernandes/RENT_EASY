import UserNavBar from "../components/userNavBar";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Footer from "../components/footer";
import { X, ChevronLeft, ChevronRight, ShoppingCart, Check, Loader2 } from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";

const API = "http://localhost:4000/api/user";

export default function ProductView() {

  const { state } = useLocation();
  const navigate = useNavigate();
  const product = state?.product;
  const { user } = useUser();

  const [selectedTenure, setSelectedTenure] = useState(3);
  const [activeImg, setActiveImg] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [cartStatus, setCartStatus] = useState("idle"); // "idle" | "loading" | "done"

  const tenureOptions = [3, 6, 12];
  const images = product?.imgs?.length > 0 ? product.imgs : product?.img ? [product.img] : [];

  const handleAddToCart = async () => {
    if (!user) {
      alert("Please sign in to add items to your cart.");
      return;
    }
    if (cartStatus !== "idle") return;

    setCartStatus("loading");
    try {
      await axios.post(`${API}/${user.id}/cart`, { productId: product._id });
      setCartStatus("done");
      // Reset back to idle after 2s
      setTimeout(() => setCartStatus("idle"), 2000);
    } catch (err) {
      console.error(err);
      alert("Failed to add to cart. Please try again.");
      setCartStatus("idle");
    }
  };

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <p className="text-gray-500">No product selected.</p>
        <button onClick={() => navigate("/productlist")} className="px-4 py-2 bg-green-600 text-white rounded-lg">
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <>
      <style>{`
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.15); border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(0,0,0,0.25); }
      `}</style>

      <UserNavBar />

      {/* LIGHTBOX */}
      {lightbox && (
        <div
          className="fixed inset-0 bg-black/90 z-[600] flex items-center justify-center px-4"
          onClick={() => setLightbox(false)}
        >
          <button onClick={() => setLightbox(false)} className="absolute top-4 right-4 text-white hover:text-gray-300 transition">
            <X size={32} />
          </button>

          {images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); setActiveImg((i) => (i - 1 + images.length) % images.length); }}
              className="absolute left-4 text-white hover:text-gray-300 transition"
            >
              <ChevronLeft size={48} />
            </button>
          )}

          <img
            src={images[activeImg]}
            alt={product.title}
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />

          {images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); setActiveImg((i) => (i + 1) % images.length); }}
              className="absolute right-4 text-white hover:text-gray-300 transition"
            >
              <ChevronRight size={48} />
            </button>
          )}

          {images.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setActiveImg(i); }}
                  className={`w-2.5 h-2.5 rounded-full transition ${i === activeImg ? "bg-white scale-125" : "bg-white/40 hover:bg-white/70"}`}
                />
              ))}
            </div>
          )}
        </div>
      )}

      <div className="bg-gray-50 min-h-screen">
        <div className="px-16 py-8">
          <div className="flex flex-col lg:flex-row gap-10">

            {/* LEFT — IMAGE GALLERY */}
            <div className="lg:w-1/2 flex flex-col lg:flex-row gap-4">

              {images.length > 1 && (
                <div className="order-2 lg:order-1 flex lg:flex-col gap-2 overflow-x-auto lg:overflow-y-auto lg:max-h-[600px]">
                  {images.map((src, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImg(i)}
                      className={`flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden border-2 transition ${
                        i === activeImg
                          ? "border-green-500 shadow-md"
                          : "border-gray-200 opacity-70 hover:opacity-100 hover:border-green-300"
                      }`}
                    >
                      <img src={src} alt={`thumb ${i + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              <div className="order-1 lg:order-2 flex-1 lg:sticky lg:top-4">
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-white shadow group border border-gray-200">
                  <img
                    src={images[activeImg]}
                    alt={product.title}
                    className="w-full h-full object-cover cursor-zoom-in"
                    onClick={() => setLightbox(true)}
                  />
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={() => setActiveImg((i) => (i - 1 + images.length) % images.length)}
                        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow opacity-0 group-hover:opacity-100 transition text-xl"
                      >‹</button>
                      <button
                        onClick={() => setActiveImg((i) => (i + 1) % images.length)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow opacity-0 group-hover:opacity-100 transition text-xl"
                      >›</button>
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                        {images.map((_, i) => (
                          <button key={i} onClick={() => setActiveImg(i)}
                            className={`w-2 h-2 rounded-full transition ${i === activeImg ? "bg-green-600 scale-125" : "bg-white/70 hover:bg-white"}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* RIGHT — PRODUCT DETAILS */}
            <div className="lg:w-1/2 space-y-5">

              <div className="flex gap-2 flex-wrap">
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                  {product.category}
                </span>
                {product.subcategory && (
                  <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium">
                    {product.subcategory}
                  </span>
                )}
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  product.available ? "bg-blue-100 text-blue-700" : "bg-red-100 text-red-500"
                }`}>
                  {product.available ? "In Stock" : "Unavailable"}
                </span>
              </div>

              <h1 className="text-3xl font-bold text-gray-900 leading-snug">{product.title}</h1>

              <hr className="border-gray-200" />

              <div className="space-y-1">
                <p className="text-sm text-gray-500">Monthly Rent</p>
                <p className="text-4xl font-bold text-green-600">
                  ₹{product.rent} <span className="text-lg font-medium text-gray-400">/mo</span>
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Security Deposit: <span className="font-semibold text-gray-700">₹{product.deposit}</span>
                </p>
              </div>

              <hr className="border-gray-200" />

              <div>
                <p className="text-sm font-semibold text-gray-700 mb-1">About this item</p>
                <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>
              </div>

              <hr className="border-gray-200" />

              <div>
                <p className="text-sm font-semibold text-gray-700 mb-3">Select Rental Tenure</p>
                <div className="grid grid-cols-3 gap-3">
                  {tenureOptions.map((months) => (
                    <div
                      key={months}
                      onClick={() => setSelectedTenure(months)}
                      className={`border rounded-xl p-4 text-center cursor-pointer transition ${
                        selectedTenure === months
                          ? "border-green-500 bg-green-50 shadow-sm"
                          : "border-gray-200 hover:border-green-400 bg-white"
                      }`}
                    >
                      <h3 className="text-2xl font-bold text-gray-800">{months}</h3>
                      <span className="block text-xs text-gray-500">months</span>
                      <span className="block text-green-600 font-semibold text-sm mt-1">
                        ₹{product.rent * months}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add to Cart Button — 3 states */}
              <button
                onClick={handleAddToCart}
                disabled={cartStatus !== "idle" || !product.available}
                className={`w-full py-4 rounded-xl transition font-bold text-lg shadow-md flex items-center justify-center gap-3
                  ${cartStatus === "done"
                    ? "bg-green-100 text-green-700 border border-green-300 cursor-default"
                    : cartStatus === "loading"
                    ? "bg-green-500 text-white opacity-80 cursor-wait"
                    : !product.available
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700 active:bg-green-800 text-white cursor-pointer"
                  }`}
              >
                {cartStatus === "loading" && <Loader2 size={20} className="animate-spin" />}
                {cartStatus === "done" && <Check size={20} />}
                {cartStatus === "idle" && <ShoppingCart size={20} />}

                {cartStatus === "loading" && "Adding..."}
                {cartStatus === "done" && "Added to Cart!"}
                {cartStatus === "idle" && (!product.available ? "Unavailable" : "Add To Cart")}
              </button>

              {/* Go to cart shortcut — shown after adding */}
              {cartStatus === "done" && (
                <button
                  onClick={() => navigate("/cart")}
                  className="w-full py-3 rounded-xl border-2 border-green-500 text-green-600 font-semibold hover:bg-green-50 transition text-sm"
                >
                  Go to Cart →
                </button>
              )}

              <div className="bg-white border border-gray-200 rounded-xl p-4 text-sm space-y-2 text-gray-600">
                <div className="flex justify-between">
                  <span>Monthly Rent</span>
                  <span className="font-medium text-gray-800">₹{product.rent}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tenure</span>
                  <span className="font-medium text-gray-800">{selectedTenure} months</span>
                </div>
                <div className="flex justify-between">
                  <span>Security Deposit</span>
                  <span className="font-medium text-gray-800">₹{product.deposit}</span>
                </div>
                <hr className="border-gray-100" />
                <div className="flex justify-between font-semibold text-gray-900">
                  <span>Total (rent only)</span>
                  <span className="text-green-600">₹{product.rent * selectedTenure}</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}