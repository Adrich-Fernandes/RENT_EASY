import React, { useEffect, useState } from "react";
import TabBar from "./tabBar";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";
import { Wrench, Clock, CheckCircle2, AlertCircle, Loader2, PlusCircle } from "lucide-react";

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

  const statusConfig = {
    requested:   { label: "Requested",   color: "bg-amber-50 text-amber-700 border border-amber-200",   dot: "bg-amber-400",   icon: <AlertCircle size={14} /> },
    approved:    { label: "Approved",    color: "bg-blue-50 text-blue-700 border border-blue-200",       dot: "bg-blue-400",    icon: <CheckCircle2 size={14} /> },
    "in progress":{ label: "In Progress", color: "bg-violet-50 text-violet-700 border border-violet-200", dot: "bg-violet-400",  icon: <Loader2 size={14} className="animate-spin" /> },
    completed:   { label: "Completed",   color: "bg-emerald-50 text-emerald-700 border border-emerald-200", dot: "bg-emerald-400", icon: <CheckCircle2 size={14} /> },
  };

  const getConfig = (status) => statusConfig[status] || { label: status, color: "bg-gray-100 text-gray-600 border border-gray-200", dot: "bg-gray-400", icon: null };

  // Progress steps
  const steps = ["requested", "approved", "in progress", "completed"];

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
    <div className="min-h-screen bg-zinc-50">
      <TabBar />

      <div className="max-w-3xl mx-auto px-4 py-10">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Maintenance</h1>
            <p className="text-sm text-gray-400 mt-1">Track your service requests</p>
          </div>
          <div className="flex items-center gap-2 bg-green-600 text-white text-sm font-medium px-4 py-2 rounded-xl">
            <Wrench size={15} />
            <span>{requests.length} Request{requests.length !== 1 ? "s" : ""}</span>
          </div>
        </div>

        {/* Empty state */}
        {requests.length === 0 ? (
          <div className="bg-white rounded-2xl border border-dashed border-gray-200 py-20 flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center">
              <Wrench size={28} className="text-gray-300" />
            </div>
            <div className="text-center">
              <p className="text-gray-700 font-semibold">No maintenance requests</p>
              <p className="text-gray-400 text-sm mt-1">Your service requests will appear here</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {requests.map((req, i) => {
              const config     = getConfig(req.status);
              const stepIndex  = steps.indexOf(req.status);

              return (
                <div
                  key={req._id}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  {/* Top bar — colored by status */}
                  <div className={`h-1 w-full ${config.dot}`} />

                  <div className="p-5">
                    {/* Product + status row */}
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0">
                          <Wrench size={20} className="text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 text-base leading-tight">
                            {req.product?.title || req.product?.name || "Product"}
                          </h3>
                          <p className="text-gray-500 text-sm mt-0.5">{req.issue}</p>
                        </div>
                      </div>

                      <span className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full capitalize flex-shrink-0 ${config.color}`}>
                        {config.icon}
                        {config.label}
                      </span>
                    </div>

                    {/* Progress tracker */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between relative">
                        {/* connector line */}
                        <div className="absolute top-2.5 left-0 right-0 h-0.5 bg-gray-100 z-0" />
                        <div
                          className="absolute top-2.5 left-0 h-0.5 bg-green-400 z-0 transition-all duration-500"
                          style={{ width: stepIndex >= 0 ? `${(stepIndex / (steps.length - 1)) * 100}%` : "0%" }}
                        />
                        {steps.map((step, idx) => (
                          <div key={step} className="flex flex-col items-center gap-1 z-10">
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                              idx < stepIndex  ? "bg-green-500 border-green-500"
                              : idx === stepIndex && step === "completed" ? "bg-green-500 border-green-500" 
                              : idx === stepIndex ? "bg-white border-green-500 shadow-sm shadow-green-200"
                              : "bg-white border-gray-200"
                            }`}>
                              {(idx < stepIndex || (idx === stepIndex && step === "completed")) && (
                                <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                              {idx === stepIndex && step !== "completed" && (
                                <div className="w-2 h-2 rounded-full bg-green-500" />
                              )}
                            </div>
                            <span className={`text-[10px] font-medium capitalize hidden sm:block ${
                              idx <= stepIndex ? "text-green-600" : "text-gray-300"
                            }`}>
                              {step}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Dates row */}
                    <div className="flex items-center gap-4 pt-3 border-t border-gray-50 text-xs text-gray-400">
                      <div className="flex items-center gap-1.5">
                        <Clock size={12} />
                        <span>Requested {new Date(req.requestedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                      </div>
                      {req.pickupDate && (
                        <div className="flex items-center gap-1.5 text-blue-600 font-medium">
                          <Clock size={12} />
                          <span>Pick up by {new Date(req.pickupDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                        </div>
                      )}
                      {req.expectedCompletionDate && (
                        <div className="flex items-center gap-1.5 text-green-600 font-medium">
                          <CheckCircle2 size={12} />
                          <span>Expected by {new Date(req.expectedCompletionDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                        </div>
                      )}
                      {req.completedAt && (
                        <div className="flex items-center gap-1.5 text-emerald-600 font-medium">
                          <CheckCircle2 size={12} />
                          <span>Completed {new Date(req.completedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}