import React, { useEffect, useState } from "react";
import TabBar from "./tabBar";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";
import { Wrench } from "lucide-react";

export default function Maintain() {
  const { user, isLoaded } = useUser();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMaintenance = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/user/${user.id}`);
        setRequests(res.data?.maintenanceRequests || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchMaintenance();
  }, [user]);

  const getStatusStyle = (status) => {
    switch (status) {
      case "requested": return "bg-yellow-100 text-yellow-700";
      case "approved":  return "bg-blue-100 text-blue-700";
      case "in progress": return "bg-purple-100 text-purple-700";
      case "completed": return "bg-green-100 text-green-700";
      default:          return "bg-gray-100 text-gray-600";
    }
  };

  if (!isLoaded || loading) {
    return (
      <div className="min-h-screen bg-zinc-50">
        <TabBar />
        <div className="flex items-center justify-center h-64">
           <div className="w-8 h-8 border-4 border-green-400 border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <>
      <TabBar />
      <div className="p-4 w-full max-w-5xl mx-auto space-y-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Maintenance Requests</h1>
        
        {requests.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
            <Wrench className="mx-auto text-gray-300 mb-4" size={48} />
            <p className="text-gray-500">No maintenance requests found.</p>
          </div>
        ) : (
          requests.map((req) => (
            <div key={req._id} className="relative bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-green-50 rounded-xl flex items-center justify-center text-green-600">
                   <Wrench size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-lg">
                    {req.product?.title || req.product?.name || "Product"}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">{req.issue}</p>
                </div>
              </div>

              <div className="flex flex-col md:items-end gap-2">
                <span className={`px-3 py-1 text-xs font-semibold rounded-full capitalize ${getStatusStyle(req.status)}`}>
                  {req.status}
                </span>
                <p className="text-gray-400 text-xs">
                  Requested: {new Date(req.requestedAt).toLocaleDateString()}
                </p>
                {req.expectedCompletionDate && (
                  <p className="text-green-600 text-xs font-medium">
                    Expected: {new Date(req.expectedCompletionDate).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}