import React, { useEffect, useState } from "react";
import TabBar from "./tabBar";
import axios from "axios";
import { useUser, SignUp } from "@clerk/clerk-react";
import { CalendarIcon, MapPinIcon, TimerIcon, Sofa, X } from "lucide-react";

export default function ActiveRents() {
  const { user, isLoaded } = useUser();
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserRentals = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/user/${user.id}`);
        setRentals(res.data?.activeRentals || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchUserRentals();
  }, [user]);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-red-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-emerald-50 flex flex-col items-center justify-center px-4">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Sofa className="text-red-500" size={32} />
            <h1 className="text-4xl font-extrabold text-red-900 tracking-tight">
              RentEase
            </h1>
          </div>
          <p className="text-red-700 text-lg font-medium">
            Create an account to view and manage your active rentals
          </p>
          <p className="text-red-500 text-sm mt-1">
            Track deliveries, request maintenance, and more
          </p>
        </div>

        <SignUp
          routing="hash"
          appearance={{
            elements: {
              card: "shadow-2xl rounded-2xl border border-red-100",
              headerTitle: "text-red-900 font-extrabold",
              headerSubtitle: "text-red-600",
              formButtonPrimary: "bg-red-500 hover:bg-red-400 text-white font-bold rounded-xl",
              footerActionLink: "text-red-600 hover:text-red-500 font-semibold",
              formFieldInput: "border border-red-200 rounded-lg focus:ring-red-400 focus:border-red-400",
              identityPreviewEditButton: "text-red-600",
              formFieldLabel: "text-red-800 font-semibold text-sm",
            },
          }}
        />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-red-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      <TabBar />
      <div className="w-[95%] mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        {rentals.length === 0 && (
          <p className="text-gray-500 col-span-3 text-center mt-10">No active rentals</p>
        )}
        {rentals.map((rental) => (
          <Card key={rental._id} data={rental} clerkId={user.id} />
        ))}
      </div>
    </>
  );
}


function Card({ data, clerkId }) {
  const product = data.product;

  const [showModal, setShowModal] = useState(false);
  const [issue, setIssue] = useState("");

  const submitMaintenance = async () => {
    if (!issue) {
      alert("Please describe the issue");
      return;
    }
    try {
      await axios.post(
        `http://localhost:4000/api/user/${clerkId}/maintenance`,
        {
          productId: product._id,
          issue: issue,
        }
      );
      alert("Maintenance request submitted");
      setIssue("");
      setShowModal(false);
    } catch (err) {
      console.error(err);
      alert("Failed to send maintenance request");
    }
  };

  return (
    <>
      <div className="w-full max-w-lg bg-red-50 rounded-2xl overflow-hidden shadow-xl hover:scale-[1.02] transition-transform duration-300 border border-red-200">

        {/* Image */}
        <div className="relative w-full h-52">
          <img
            src={product?.imgs?.[0] || product?.image}
            alt={product?.title || product?.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-red-50 via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col gap-4">
          <div>
            <h2 className="text-red-900 text-2xl font-extrabold">
              {product?.title || product?.name}
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-red-800 font-bold">
                ₹{data.price} / Month
              </span>
              <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full uppercase ${
                data.status === "complete" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"
              }`}>
                {data.status === "complete" ? "Active / Delivered" : data.status}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2 text-sm text-red-700">
            <div className="flex items-center gap-2">
              <CalendarIcon size={18} />
              <span>Start: {data.rentalStartDate ? new Date(data.rentalStartDate).toLocaleDateString() : "—"}</span>
            </div>
            <div className="flex items-center gap-2">
              <TimerIcon size={18} />
              <span>End: {data.rentalEndDate ? new Date(data.rentalEndDate).toLocaleDateString() : "—"}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPinIcon size={18} />
              <span>Delivery Address</span>
            </div>
          </div>

          <div className="border-t border-red-200" />

          <button
            onClick={() => setShowModal(true)}
            className="w-full py-2.5 bg-red-500 hover:bg-red-400 text-white font-bold rounded-xl transition"
          >
            Request Maintenance
          </button>
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Request Maintenance</h2>
              <button onClick={() => setShowModal(false)}>
                <X size={20} />
              </button>
            </div>

            <p className="text-sm font-semibold">Product</p>
            <p className="text-red-600 mb-4">{product?.name || product?.title}</p>

            <textarea
              rows={4}
              value={issue}
              onChange={(e) => setIssue(e.target.value)}
              placeholder="Describe the issue..."
              className="w-full border rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-red-400"
            />

            <button
              onClick={submitMaintenance}
              className="w-full bg-red-500 text-white py-3 rounded-xl hover:bg-red-400 transition"
            >
              Submit Request
            </button>
          </div>
        </div>
      )}
    </>
  );
}
