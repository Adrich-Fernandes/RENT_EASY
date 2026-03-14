import React, { useEffect, useState } from "react";
import TabBar from "./tabBar";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";
import { CalendarIcon, MapPinIcon, TimerIcon, X } from "lucide-react";

export default function ActiveRents() {

  const { user } = useUser();

  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchUserRentals = async () => {

      try {

        const res = await axios.get(
          `http://localhost:4000/api/user/${user.id}`
        );

        setRentals(res.data?.activeRentals || []);

      } catch (err) {

        console.error(err);

      } finally {

        setLoading(false);

      }

    };

    if (user) fetchUserRentals();

  }, [user]);

  if (loading) return <div className="text-center mt-20">Loading rentals...</div>;

  return (
    <>
      <TabBar />

      <div className="w-[95%] mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-6">

        {rentals.length === 0 && (
          <p className="text-gray-500">No active rentals</p>
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
          issue: issue
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
      <div className="w-full max-w-lg bg-green-50 rounded-2xl overflow-hidden shadow-xl hover:scale-[1.02] transition-transform duration-300 border border-green-200">

        {/* Image */}

        <div className="relative w-full h-52">

          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-green-50 via-green-100/2 to-transparent" />

        </div>



        {/* Content */}

        <div className="p-5 flex flex-col gap-4">

          <div>

            <h2 className="text-green-900 text-2xl font-extrabold">
              {product.name}
            </h2>

            <span className="text-green-800 font-bold">
              ₹{data.price} / Month
            </span>

          </div>



          <div className="flex flex-col gap-2 text-sm text-green-700">

            <div className="flex items-center gap-2">
              <CalendarIcon size={18} />
              <span>
                Start: {new Date(data.rentalStartDate).toLocaleDateString()}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <TimerIcon size={18} />
              <span>
                End: {new Date(data.rentalEndDate).toLocaleDateString()}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <MapPinIcon size={18} />
              <span>Delivery Address</span>
            </div>

          </div>



          <div className="border-t border-green-200"></div>



          <button
            onClick={() => setShowModal(true)}
            className="w-full py-2.5 bg-green-500 hover:bg-green-400 text-white font-bold rounded-xl"
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

              <h2 className="text-xl font-bold">
                Request Maintenance
              </h2>

              <button onClick={() => setShowModal(false)}>
                <X size={20} />
              </button>

            </div>



            <p className="text-sm font-semibold">Product</p>

            <p className="text-green-600 mb-4">{product.name}</p>



            <textarea
              rows={4}
              value={issue}
              onChange={(e) => setIssue(e.target.value)}
              placeholder="Describe the issue..."
              className="w-full border rounded-lg p-3 mb-4"
            />



            <button
              onClick={submitMaintenance}
              className="w-full bg-green-500 text-white py-3 rounded-xl hover:bg-green-400"
            >
              Submit Request
            </button>

          </div>

        </div>

      )}

    </>
  );
}