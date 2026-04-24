import React, { useEffect, useState } from "react";
import TabBar from "./tabBar";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";
import { Wrench, Clock, CheckCircle2, AlertCircle, Loader2, PlusCircle } from "lucide-react";
import UserNavBar from "../components/userNavBar";
import Skeleton from "../components/Skeleton";

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
    completed:   { label: "Completed",   color: "bg-[#1D3557]/10 text-[#1D3557] border border-[#1D3557]/20", dot: "bg-[#1D3557]", icon: <CheckCircle2 size={14} /> },
  };

  const getConfig = (status) => statusConfig[status] || { label: status, color: "bg-gray-100 text-gray-600 border border-gray-200", dot: "bg-gray-400", icon: null };

  // Progress steps
  const steps = ["requested", "approved", "in progress", "completed"];

  if (!isLoaded || loading) {
    return (
      <div className="min-h-screen bg-zinc-50">
        <UserNavBar />
        <div className="flex flex-col md:flex-row">
          <TabBar />
          <div className="flex-1 md:ml-64 max-w-4xl mx-auto px-4 py-10 md:px-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div className="space-y-2">
                <Skeleton width="200px" height="2rem" />
                <Skeleton width="300px" height="1rem" />
              </div>
              <Skeleton width="150px" height="2.5rem" borderRadius="1rem" />
            </div>
            <div className="space-y-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8 space-y-6">
                  <div className="flex justify-between items-start">
                    <div className="flex gap-4">
                      <Skeleton width="56px" height="56px" borderRadius="1rem" />
                      <div className="space-y-2">
                        <Skeleton width="100px" height="0.75rem" />
                        <Skeleton width="200px" height="1.5rem" />
                        <Skeleton width="250px" height="1rem" />
                      </div>
                    </div>
                    <Skeleton width="100px" height="2rem" borderRadius="1rem" />
                  </div>
                  <Skeleton height="3px" borderRadius="1rem" />
                  <div className="flex gap-6">
                    <Skeleton width="120px" height="1rem" />
                    <Skeleton width="120px" height="1rem" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <UserNavBar />
      <div className="flex flex-col md:flex-row min-h-screen bg-zinc-50">
        <TabBar />

        <div className="flex-1 md:ml-64 max-w-4xl mx-auto px-4 py-10 md:px-12">

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <h1 className="text-3xl font-black text-gray-900 tracking-tight">Maintenance <span className="text-[#1D3557]">Status</span></h1>
              <p className="text-sm text-gray-400 mt-2 font-medium">Track your service tickets and repair protocols</p>
            </div>
            <div className="flex items-center gap-3 bg-white border border-gray-100 shadow-sm text-gray-900 text-[11px] font-black uppercase tracking-widest px-5 py-2.5 rounded-2xl self-start">
              <div className="w-2 h-2 rounded-full bg-[#1D3557] animate-pulse" />
              <span>{requests.length} active Ticket{requests.length !== 1 ? "s" : ""}</span>
            </div>
          </div>

          {/* Empty state */}
          {requests.length === 0 ? (
            <div className="bg-white rounded-[2.5rem] border border-dashed border-gray-200 py-24 flex flex-col items-center gap-6 shadow-sm">
              <div className="w-20 h-20 rounded-3xl bg-gray-50 flex items-center justify-center">
                <Wrench size={32} className="text-gray-300" />
              </div>
              <div className="text-center">
                <p className="text-xl font-bold text-gray-900">No protocol reports</p>
                <p className="text-sm text-gray-400 mt-2">Any maintenance requests you report will appear here</p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {requests.map((req, i) => {
                const config     = getConfig(req.status);
                const stepIndex  = steps.indexOf(req.status);

                return (
                  <div
                    key={req._id}
                    className="bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden group"
                  >
                    {/* Top bar — colored by status */}
                    <div className={`h-1.5 w-full ${config.dot}`} />

                    <div className="p-6 md:p-8">
                      {/* Product + status row */}
                      <div className="flex flex-col md:flex-row items-start justify-between gap-6 mb-8">
                        <div className="flex items-start gap-4">
                          <div className="w-14 h-14 rounded-2xl bg-[#F1FAEE] flex items-center justify-center flex-shrink-0 group-hover:bg-[#A8DADC] transition-colors duration-500">
                            <Wrench size={24} className="text-[#1D3557]" />
                          </div>
                          <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#457B9D] mb-1">Service Protocol</p>
                            <h3 className="font-black text-gray-900 text-xl md:text-2xl tracking-tight leading-tight">
                              {req.product?.title || req.product?.name || "Equipment Service"}
                            </h3>
                            <p className="text-gray-500 text-sm mt-2 font-medium leading-relaxed max-w-md">{req.issue}</p>
                          </div>
                        </div>

                        <span className={`flex items-center gap-2 px-5 py-2 text-[11px] font-black uppercase tracking-widest rounded-2xl flex-shrink-0 ${config.color}`}>
                          {config.icon}
                          {config.label}
                        </span>
                      </div>

                      {/* Progress tracker */}
                      <div className="mb-8 px-2">
                        <div className="flex items-center justify-between relative">
                          {/* connector line */}
                          <div className="absolute top-2 left-0 right-0 h-[3px] bg-gray-100 z-0 rounded-full" />
                          <div
                            className="absolute top-2 left-0 h-[3px] bg-[#1D3557] z-0 transition-all duration-1000 ease-out rounded-full"
                            style={{ width: stepIndex >= 0 ? `${(stepIndex / (steps.length - 1)) * 100}%` : "0%" }}
                          />
                          {steps.map((step, idx) => (
                            <div key={step} className="flex flex-col items-center gap-3 z-10">
                              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all duration-500 shadow-sm ${
                                idx < stepIndex  ? "bg-[#1D3557] border-[#1D3557]"
                                : idx === stepIndex && step === "completed" ? "bg-[#1D3557] border-[#1D3557] scale-125" 
                                : idx === stepIndex ? "bg-white border-[#1D3557] ring-4 ring-[#1D3557]/20 scale-125"
                                : "bg-white border-gray-200"
                              }`}>
                                {(idx < stepIndex || (idx === stepIndex && step === "completed")) && (
                                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                                )}
                                {idx === stepIndex && step !== "completed" && (
                                  <div className="w-1.5 h-1.5 rounded-full bg-[#1D3557]" />
                                )}
                              </div>
                              <span className={`text-[10px] font-black uppercase tracking-[0.15em] hidden sm:block transition-colors duration-500 ${
                                idx <= stepIndex ? "text-[#1D3557]" : "text-gray-300"
                              }`}>
                                {step}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Dates row */}
                      <div className="flex flex-wrap items-center gap-6 pt-5 border-t border-gray-50 text-[11px] font-bold text-gray-400">
                        <div className="flex items-center gap-2">
                          <div className="bg-gray-100 p-1.5 rounded-lg text-gray-500"><Clock size={12} /></div>
                          <span>Requested {new Date(req.requestedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                        </div>
                        {req.pickupDate && (
                          <div className="flex items-center gap-2 text-blue-600">
                            <div className="bg-blue-50 p-1.5 rounded-lg text-blue-600"><Clock size={12} /></div>
                            <span>Pick up by {new Date(req.pickupDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                          </div>
                        )}
                        {req.expectedCompletionDate && (
                          <div className="flex items-center gap-2 text-[#1D3557]">
                            <div className="bg-[#1D3557]/10 p-1.5 rounded-lg text-[#1D3557]"><CheckCircle2 size={12} /></div>
                            <span>Expected by {new Date(req.expectedCompletionDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                          </div>
                        )}
                        {req.completedAt && (
                          <div className="flex items-center gap-2 text-[#457B9D]">
                            <div className="bg-[#F1FAEE] p-1.5 rounded-lg text-[#457B9D]"><CheckCircle2 size={12} /></div>
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
    </>
  );
}
