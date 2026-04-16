import { useRef, useState, useEffect } from "react";
import { Trash2, MapPin, Calendar, ArrowRight, Plus, ChevronUp, Loader2, IndianRupee } from "lucide-react";
import UserNavBar from "../components/userNavBar";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";

const API = "http://localhost:4000/api/user";

export default function Cart() {
  const { user, isLoaded } = useUser();

  const [cartItems, setCartItems]               = useState([]);
  const [savedAddresses, setSavedAddresses]     = useState([]);
  const [selectedAddressIdx, setSelectedAddressIdx] = useState(null);
  const [showDelivery, setShowDelivery]         = useState(false);
  const [pageLoading, setPageLoading]           = useState(true);
  const [placingOrder, setPlacingOrder]         = useState(false);
  const [date, setDate]                         = useState("");
  const [paymentType, setPaymentType]           = useState(""); // "Cash" | "Online"
  const [form, setForm] = useState({
    fullname: "", phone: "", addressline1: "",
    addressline2: "", city: "", state: "", pincode: "",
  });

  const dateRef = useRef(null);

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API}/${user.id}`);
        setCartItems(res.data?.cart || []);
        setSavedAddresses(res.data?.address || []);
      } catch (err) {
        console.error(err);
      } finally {
        setPageLoading(false);
      }
    };
    fetchData();
  }, [user]);

  const getMinDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + 3);
    return d.toISOString().split("T")[0];
  };

  const openCalendar = () => {
    dateRef.current?.showPicker
      ? dateRef.current.showPicker()
      : dateRef.current?.click();
  };

  const handleForm = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleRemoveFromCart = async (productId) => {
    try {
      await axios.delete(`${API}/${user.id}/cart/${productId}`);
      setCartItems((prev) => prev.filter((item) => item.product._id !== productId));
    } catch (err) {
      console.error(err);
      alert("Failed to remove item.");
    }
  };

  const handleAddAddress = async () => {
    const { fullname, phone, addressline1, city, state, pincode } = form;
    if (!fullname || !phone || !addressline1 || !city || !state || !pincode) {
      alert("Please fill all required fields.");
      return;
    }
    try {
      const res = await axios.post(`${API}/${user.id}/address`, form);
      setSavedAddresses(res.data);
      setForm({ fullname: "", phone: "", addressline1: "", addressline2: "", city: "", state: "", pincode: "" });
      setShowDelivery(false);
    } catch (err) {
      console.error(err);
      alert("Failed to save address.");
    }
  };

  const handleDeleteAddress = async (addressId, idx) => {
    try {
      const res = await axios.delete(`${API}/${user.id}/address/${addressId}`);
      setSavedAddresses(res.data);
      if (selectedAddressIdx === idx) setSelectedAddressIdx(null);
    } catch (err) {
      console.error(err);
      alert("Failed to delete address.");
    }
  };

  // ── Place order — uses tenure stored on each cart item ──────────
  const handlePlaceOrder = async () => {
    if (cartItems.length === 0)        return alert("Your cart is empty.");
    if (selectedAddressIdx === null)   return alert("Please select a delivery address.");
    if (!date)                         return alert("Please select a delivery date.");
    if (!paymentType)                  return alert("Please select a payment method.");

    setPlacingOrder(true);
    try {
      await Promise.all(
        cartItems.map((item) => {
          const rentalStart = new Date(date);
          const rentalEnd   = new Date(date);
          // ✅ Use the tenure saved when user added to cart (default 1 if missing)
          const tenure = item.tenure || 3;
          rentalEnd.setMonth(rentalEnd.getMonth() + tenure);

          return axios.post(`${API}/${user.id}/rental`, {
            productId:       item.product._id,
            rentalStartDate: rentalStart.toISOString(),
            rentalEndDate:   rentalEnd.toISOString(),
            price:           item.product.rent,
            shippingAddress: savedAddresses[selectedAddressIdx],
            paymentType:     paymentType
          });
        })
      );

      await Promise.all(
        cartItems.map((item) =>
          axios.delete(`${API}/${user.id}/cart/${item.product._id}`)
        )
      );

      setCartItems([]);
      setSelectedAddressIdx(null);
      setDate("");
      setPaymentType("");
      alert("Order placed successfully! 🎉");
    } catch (err) {
      console.error(err);
      alert("Failed to place order. Please try again.");
    } finally {
      setPlacingOrder(false);
    }
  };

  const totalRent    = cartItems.reduce((sum, item) => sum + (item.product?.rent || 0) * (item.tenure || 1), 0);
  const totalDeposit = cartItems.reduce((sum, item) => sum + (item.product?.deposit || 0), 0);
  const totalPayable = totalRent + totalDeposit;

  if (!isLoaded || pageLoading) {
    return (
      <>
        <UserNavBar />
        <div className="flex items-center justify-center h-64">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-4 border-red-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-gray-400 text-sm">Loading cart...</p>
          </div>
        </div>
      </>
    );
  }

  if (!user) {
    return (
      <>
        <UserNavBar />
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">Please sign in to view your cart.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <UserNavBar />
      <div className="w-full flex flex-col lg:flex-row items-start gap-6 p-6 bg-gray-100 min-h-screen">

        {/* LEFT */}
        <div className="w-full lg:flex-[7] space-y-6">

          {cartItems.length === 0 && (
            <div className="bg-white rounded-xl shadow-md p-10 text-center text-gray-400 text-lg">
              Your cart is empty.
            </div>
          )}

          {cartItems.map((item) => (
            <div key={item._id} className="bg-white shadow-md rounded-xl p-5">
              <CartItemCard
                data={item.product}
                tenure={item.tenure || 1}
                onRemove={() => handleRemoveFromCart(item.product._id)}
              />
            </div>
          ))}

          {selectedAddressIdx !== null && (
            <div className="bg-white shadow-md rounded-xl p-5 space-y-3">
              <div className="flex items-center gap-2">
                <Calendar className="text-[#E63946]" size={20} />
                <span className="font-bold text-lg">Select Delivery Date</span>
              </div>
              <div className="flex items-center gap-3">
                <button type="button" onClick={openCalendar} className="px-4 py-2 border border-[#A8DADC] rounded-lg hover:bg-gray-50 text-sm">
                  {date ? date : "Pick a date"}
                </button>
                <input
                  ref={dateRef}
                  type="date"
                  value={date}
                  min={getMinDate()}
                  onChange={(e) => setDate(e.target.value)}
                  className="absolute opacity-0 pointer-events-none"
                />
                {date && <span className="text-[#E63946] text-sm font-medium">✓ {date}</span>}
              </div>
            </div>
          )}

          {date && (
            <div className="bg-white shadow-md rounded-xl p-5 space-y-4">
              <div className="flex items-center gap-2">
                <IndianRupee className="text-[#E63946]" size={20} />
                <span className="font-bold text-lg">Select Payment Method</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div
                  onClick={() => setPaymentType("Online")}
                  className={`border rounded-xl p-4 flex items-center justify-between cursor-pointer transition ${
                    paymentType === "Online" ? "border-[#A8DADC] bg-[#F1FAEE]" : "border-gray-200 hover:border-[#A8DADC]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full border-2 transition ${paymentType === "Online" ? "border-[#457B9D] bg-[#457B9D]" : "border-gray-400"}`} />
                    <span className="font-medium text-gray-800">Online Payment</span>
                  </div>
                  <ArrowRight size={16} className="text-gray-400" />
                </div>

                <div
                  onClick={() => setPaymentType("Cash")}
                  className={`border rounded-xl p-4 flex items-center justify-between cursor-pointer transition ${
                    paymentType === "Cash" ? "border-[#A8DADC] bg-[#F1FAEE]" : "border-gray-200 hover:border-[#A8DADC]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full border-2 transition ${paymentType === "Cash" ? "border-[#457B9D] bg-[#457B9D]" : "border-gray-400"}`} />
                    <span className="font-medium text-gray-800">Cash on Delivery</span>
                  </div>
                  <IndianRupee size={16} className="text-gray-400" />
                </div>
              </div>
            </div>
          )}

          <button
            onClick={() => setShowDelivery(!showDelivery)}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#1D3557] hover:bg-[#457B9D] text-white text-sm font-medium rounded-xl transition"
          >
            {showDelivery ? <ChevronUp size={18} /> : <Plus size={18} />}
            {showDelivery ? "Cancel" : "Add New Address"}
          </button>

          {showDelivery && (
            <div className="bg-white shadow-md rounded-xl p-5 space-y-4">
              <div className="flex items-center gap-2">
                <MapPin className="text-[#E63946]" size={20} />
                <span className="font-bold text-lg">New Delivery Address</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: "Full Name",                 name: "fullname",     placeholder: "Full Name" },
                  { label: "Phone Number",              name: "phone",        placeholder: "+91-9876543210" },
                  { label: "Address Line 1",            name: "addressline1", placeholder: "Street number and name" },
                  { label: "Address Line 2 (optional)", name: "addressline2", placeholder: "Apt, suite, floor" },
                  { label: "City",                      name: "city",         placeholder: "Bengaluru" },
                  { label: "State",                     name: "state",        placeholder: "Karnataka" },
                  { label: "Pin Code",                  name: "pincode",      placeholder: "560001" },
                ].map(({ label, name, placeholder }) => (
                  <div key={name}>
                    <label className="block text-sm text-gray-600 mb-1">{label}</label>
                    <input
                      type="text" name={name} value={form[name]} onChange={handleForm} placeholder={placeholder}
                      className="w-full border border-[#457B9D]/30 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#A8DADC] text-sm"
                    />
                  </div>
                ))}
              </div>
              <button onClick={handleAddAddress} className="w-full bg-[#1D3557] hover:bg-[#457B9D] text-white font-medium py-2.5 rounded-xl text-sm transition">
                Save Address
              </button>
            </div>
          )}

          {savedAddresses.length > 0 && (
            <div className="bg-white shadow-md rounded-xl p-5 space-y-4">
              <div className="flex items-center gap-2">
                <MapPin className="text-[#E63946]" size={20} />
                <span className="font-bold text-lg">Select Delivery Address</span>
              </div>
              {savedAddresses.map((addr, i) => (
                <div
                  key={addr._id || i}
                  onClick={() => setSelectedAddressIdx(i)}
                  className={`border rounded-xl p-4 flex justify-between items-start gap-4 cursor-pointer transition ${
                    selectedAddressIdx === i ? "border-[#457B9D] bg-[#F1FAEE]" : "border-gray-200 hover:border-[#A8DADC]"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`mt-1 w-4 h-4 rounded-full border-2 flex-shrink-0 transition ${selectedAddressIdx === i ? "border-[#457B9D] bg-[#457B9D]" : "border-gray-400"}`} />
                    <div className="space-y-1 text-sm text-gray-700">
                      <p className="font-semibold text-gray-900">{addr.fullname} · {addr.phone}</p>
                      <p>{addr.addressline1}{addr.addressline2 ? `, ${addr.addressline2}` : ""}</p>
                      <p>{addr.city}, {addr.state} — {addr.pincode}</p>
                    </div>
                  </div>
                  <Trash2
                    className="text-[#E63946] hover:text-[#c1121f] cursor-pointer flex-shrink-0 transition"
                    size={18}
                    onClick={(e) => { e.stopPropagation(); handleDeleteAddress(addr._id, i); }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT */}
        <div className="w-full lg:flex-[3]">
          <div className="bg-white rounded-2xl shadow-md p-6 space-y-6">
            <h2 className="text-lg font-semibold">Order Summary</h2>

            <div className="space-y-3 text-gray-600 text-sm">
              {cartItems.map((item) => (
                <div key={item._id} className="flex justify-between">
                  <span>
                    {item.product?.name || item.product?.title}
                    <span className="text-xs text-gray-400 ml-1">× {item.tenure || 1} mo</span>
                  </span>
                  <span className="font-medium text-gray-800">
                    ₹{(item.product?.rent || 0) * (item.tenure || 1)}
                  </span>
                </div>
              ))}
            </div>

            <hr />

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Rent</span>
                <span className="font-semibold text-gray-800">₹{totalRent}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Security Deposit</span>
                <span className="font-semibold text-gray-800">₹{totalDeposit}</span>
              </div>
            </div>

            <hr />

            <div className="flex justify-between items-center">
              <span className="font-semibold text-lg">Total Payable</span>
              <span className="font-bold text-lg text-[#E63946]">₹{totalPayable}</span>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={placingOrder || cartItems.length === 0 || !paymentType || !date || selectedAddressIdx === null}
              className="w-full bg-[#1D3557] hover:bg-[#457B9D] disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 rounded-xl flex items-center justify-center gap-2 transition"
            >
              {placingOrder ? (
                <><Loader2 size={18} className="animate-spin" /> Placing Order...</>
              ) : (
                <><span>Place Order</span><ArrowRight size={18} /></>
              )}
            </button>

            <p className="text-xs text-gray-500 text-center">
              Deposit is refundable upon return of products in good condition
            </p>
          </div>
        </div>

      </div>
    </>
  );
}


function CartItemCard({ data, tenure, onRemove }) {
  const cardTotal = ((data?.rent || 0) * tenure) + (data?.deposit || 0);

  return (
    <div className="flex flex-col sm:flex-row gap-6">
      <img
        src={data?.image || data?.imgs?.[0]}
        alt={data?.name || data?.title}
        className="w-28 h-28 object-cover rounded-lg flex-shrink-0"
      />
      <div className="flex-1 flex flex-col justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold">{data?.name || data?.title}</h2>
          <p className="text-gray-600 text-sm mt-1">{data?.description}</p>
        </div>
        <div className="flex items-center gap-6">
          <div>
            <span className="block text-sm text-gray-500">Monthly Rent</span>
            <span className="block text-[#E63946] font-bold text-lg">₹{data?.rent}</span>
          </div>
          <div>
            <span className="block text-sm text-gray-500">Tenure</span>
            <span className="block font-bold text-lg">{tenure} months</span>
          </div>
          <div>
            <span className="block text-sm text-gray-500">Security Deposit</span>
            <span className="block font-bold text-lg">₹{data?.deposit}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end justify-between gap-4">
        <Trash2 className="text-[#E63946] cursor-pointer hover:text-[#c1121f] transition" size={20} onClick={onRemove} />
        <div className="text-right">
          <span className="block text-gray-400 text-sm">Total</span>
          <span className="block font-bold text-xl text-gray-800">₹{cardTotal}</span>
        </div>
      </div>
    </div>
  );
}
