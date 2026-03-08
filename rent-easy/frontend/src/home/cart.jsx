import { useRef, useState } from "react";
import { Trash2, MapPin, Calendar, ArrowRight, Plus, ChevronDown, ChevronUp } from "lucide-react";
import { CartCard } from "../Alldata";
import UserNavBar from "../../components/userNavBar";

export default function Cart() {
    const [date, setDate] = useState("");
    const [showDelivery, setShowDelivery] = useState(false);
    const [addresses, setAddresses] = useState([]);
    const [form, setForm] = useState({
        name: "",
        phone: "",
        line1: "",
        line2: "",
        city: "",
        state: "",
        postal_code: "",
    });

    const dateRef = useRef(null);

    const getMinDate = () => {
        const today = new Date();
        today.setDate(today.getDate() + 3);
        return today.toISOString().split("T")[0];
    };

    const openCalendar = () => {
        if (dateRef.current) {
            dateRef.current.showPicker
                ? dateRef.current.showPicker()
                : dateRef.current.click();
        }
    };

    const handleForm = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleAddAddress = () => {
        if (!form.name || !form.phone || !form.line1 || !form.city || !form.state || !form.postal_code) {
            alert("Please fill all required fields.");
            return;
        }
        setAddresses([...addresses, { ...form, date }]);
        setForm({ name: "", phone: "", line1: "", line2: "", city: "", state: "", postal_code: "" });
        setDate("");
        setShowDelivery(false);
    };

    const handleRemoveAddress = (index) => {
        setAddresses(addresses.filter((_, i) => i !== index));
    };

    let totalRent = 0;
    let totalSecurity = 0;

    CartCard.map((item) => {
        totalRent = totalRent + item.price;
        totalSecurity = totalSecurity + item.deposity;
    });

    const totalPayable = totalRent + totalSecurity;

    return (
        <>
        <UserNavBar />
        <div className="w-full flex flex-col lg:flex-row items-start gap-6 p-6 bg-gray-100 min-h-screen">

            {/* ================= LEFT 70% ================= */}
            <div className="w-full lg:flex-[7] space-y-6">

                {/* PRODUCT CARD */}
                {CartCard.map((item, i) => (
                    <div key={i} className="bg-white shadow-md rounded-xl p-5">
                        <Card data={item} />
                    </div>
                ))}

                {/* ADD ADDRESS BUTTON */}
                <button
                    onClick={() => setShowDelivery(!showDelivery)}
                    className="flex items-center gap-2 px-5 py-2.5 bg-green-500 hover:bg-green-600 text-white text-sm font-medium rounded-xl transition"
                >
                    {showDelivery ? <ChevronUp size={18} /> : <Plus size={18} />}
                    {showDelivery ? "Cancel" : "Add Address"}
                </button>

                {/* DELIVERY SECTION */}
                {showDelivery && (
                    <div className="bg-white shadow-md rounded-xl p-5 space-y-4">

                        <div className="flex items-center gap-2">
                            <MapPin className="text-green-600" size={20} />
                            <span className="font-bold text-lg">Delivery Details</span>
                        </div>

                        {/* Name & Phone */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-gray-600 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleForm}
                                    placeholder="Full Name"
                                    className="w-full border border-green-400 border-opacity-40 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-400 text-sm placeholder:text-gray-400 placeholder:opacity-60"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-600 mb-1">Phone Number</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={form.phone}
                                    onChange={handleForm}
                                    placeholder="+91-9876543210"
                                    className="w-full border border-green-400 border-opacity-40 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-400 text-sm placeholder:text-gray-400 placeholder:opacity-60"
                                />
                            </div>
                        </div>

                        {/* Line 1 & Line 2 */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-gray-600 mb-1">Address Line 1</label>
                                <input
                                    type="text"
                                    name="line1"
                                    value={form.line1}
                                    onChange={handleForm}
                                    placeholder="Street number and name"
                                    className="w-full border border-green-400 border-opacity-40 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-400 text-sm placeholder:text-gray-400 placeholder:opacity-60"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-600 mb-1">Address Line 2 <span className="text-gray-400">(optional)</span></label>
                                <input
                                    type="text"
                                    name="line2"
                                    value={form.line2}
                                    onChange={handleForm}
                                    placeholder="Apt, suite, floor"
                                    className="w-full border border-green-400 border-opacity-40 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-400 text-sm placeholder:text-gray-400 placeholder:opacity-60"
                                />
                            </div>
                        </div>

                        {/* City & State */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-gray-600 mb-1">City</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={form.city}
                                    onChange={handleForm}
                                    placeholder="Bengaluru"
                                    className="w-full border border-green-400 border-opacity-40 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-400 text-sm placeholder:text-gray-400 placeholder:opacity-60"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-600 mb-1">State</label>
                                <input
                                    type="text"
                                    name="state"
                                    value={form.state}
                                    onChange={handleForm}
                                    placeholder="Karnataka"
                                    className="w-full border border-green-400 border-opacity-40 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-400 text-sm placeholder:text-gray-400 placeholder:opacity-60"
                                />
                            </div>
                        </div>

                        {/* Pin Code */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-gray-600 mb-1">Pin Code</label>
                                <input
                                    type="text"
                                    name="postal_code"
                                    value={form.postal_code}
                                    onChange={handleForm}
                                    placeholder="560001"
                                    className="w-full border border-green-400 border-opacity-40 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-400 text-sm placeholder:text-gray-400 placeholder:opacity-60"
                                />
                            </div>
                        </div>

                        {/* Delivery Date */}
                        <div>
                            <span className="block text-sm text-gray-600 mb-2">Delivery Date</span>
                            <div className="relative flex items-center gap-2">
                                <Calendar className="text-green-600" size={20} />
                                <button
                                    type="button"
                                    onClick={openCalendar}
                                    className="px-4 py-2 border border-green-400 border-opacity-40 rounded-lg hover:bg-gray-100 text-sm"
                                >
                                    {date ? date : "Select Date"}
                                </button>
                                <input
                                    ref={dateRef}
                                    type="date"
                                    value={date}
                                    min={getMinDate()}
                                    onChange={(e) => setDate(e.target.value)}
                                    className="absolute opacity-0 pointer-events-none"
                                />
                            </div>
                        </div>

                        {/* Save Button */}
                        <button
                            onClick={handleAddAddress}
                            className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2.5 rounded-xl text-sm transition"
                        >
                            Save Address
                        </button>

                    </div>
                )}

                {/* SAVED ADDRESSES */}
                {addresses.length > 0 && (
                    <div className="bg-white shadow-md rounded-xl p-5 space-y-4">
                        <div className="flex items-center gap-2">
                            <MapPin className="text-green-600" size={20} />
                            <span className="font-bold text-lg">Saved Addresses</span>
                        </div>

                        {addresses.map((addr, i) => (
                            <div key={i} className="border border-green-400 border-opacity-30 rounded-xl p-4 flex justify-between items-start gap-4">
                                <div className="space-y-1 text-sm text-gray-700">
                                    <p className="font-semibold text-gray-900">{addr.name} · {addr.phone}</p>
                                    <p>{addr.line1}{addr.line2 ? `, ${addr.line2}` : ""}</p>
                                    <p>{addr.city}, {addr.state} - {addr.postal_code}</p>
                                    {addr.date && <p className="text-green-600 text-xs">Delivery: {addr.date}</p>}
                                </div>
                                <Trash2
                                    className="text-red-400 hover:text-red-600 cursor-pointer flex-shrink-0 transition"
                                    size={18}
                                    onClick={() => handleRemoveAddress(i)}
                                />
                            </div>
                        ))}
                    </div>
                )}

            </div>

            {/* ================= RIGHT 30% ================= */}
            <div className="w-full lg:flex-[3]">

                <div className="bg-white rounded-2xl shadow-md p-6 space-y-6">

                    <h2 className="text-lg font-semibold">Order Summary</h2>

                    <div className="space-y-3 text-gray-600 text-sm">
                        {CartCard.map((v, i) => (
                            <CountTotal key={i} data={v} />
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
                            <span className="font-semibold text-gray-800">₹{totalSecurity}</span>
                        </div>
                    </div>

                    <hr />

                    <div className="flex justify-between items-center">
                        <span className="font-semibold text-lg">Total Payable</span>
                        <span className="font-bold text-lg text-green-600">₹{totalPayable}</span>
                    </div>

                    <button className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 rounded-xl flex items-center justify-center gap-2 transition">
                        Place Order
                        <ArrowRight size={18} />
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

function CountTotal({ data }) {
    return (
        <div className="flex justify-between">
            <span>{data.title}</span>
            <span className="font-medium text-gray-800">₹{data.price}</span>
        </div>
    );
}

function Card({ data }) {
    const cardTotal = data.price + data.deposity;

    return (
        <div className="flex flex-col sm:flex-row gap-6">

            <img
                src={data.img}
                alt="product"
                className="w-28 h-28 object-cover rounded-lg flex-shrink-0"
            />

            <div className="flex-1 flex flex-col justify-between gap-3">
                <div>
                    <h2 className="text-lg font-semibold">{data.title}</h2>
                    <p className="text-gray-600 text-sm mt-1">{data.description}</p>
                </div>

                <div className="flex items-center gap-6">
                    <div>
                        <span className="block text-sm text-gray-500">Monthly Rent</span>
                        <span className="block text-green-600 font-bold text-lg">₹{data.price}</span>
                    </div>
                    <div>
                        <span className="block text-sm text-gray-500">Security Deposit</span>
                        <span className="block font-bold text-lg">₹{data.deposity}</span>
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-end justify-between gap-4">
                <Trash2
                    className="text-red-500 cursor-pointer hover:text-red-600 transition"
                    size={20}
                />
                <div className="text-right">
                    <span className="block text-gray-400 text-sm">Total Rent</span>
                    <span className="block font-bold text-xl text-gray-800">₹{cardTotal}</span>
                </div>
            </div>

        </div>
    );
}