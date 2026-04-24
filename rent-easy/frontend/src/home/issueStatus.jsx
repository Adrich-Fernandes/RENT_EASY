import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MessageSquare, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  ChevronRight,
  AlertTriangle,
  History
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import UserNavBar from "../components/userNavBar";
import Footer from "../components/footer";
import Skeleton from "../components/Skeleton";

export default function IssueStatus() {
  const { user, isLoaded } = useUser();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchIssues = async () => {
    try {
      // 1. Fetch Maintenance Requests (from User Model)
      const userRes = await axios.get(`http://localhost:4000/api/user/${user.id}`);
      const maintenance = (userRes.data?.maintenanceRequests || []).map(item => ({
        ...item,
        type: "maintenance",
        title: item.product?.title || item.product?.name || "Maintenance Request",
        date: item.requestedAt
      }));

      // 2. Fetch General Issues (from Issue Model)
      const issueRes = await axios.get(`http://localhost:4000/api/issue/user/${user.id}`);
      const general = (issueRes.data || []).map(item => ({
        ...item,
        type: "general",
        title: `${item.category}: ${item.subject}`,
        date: item.createdAt,
        issue: item.message // Normalize field name
      }));

      // 3. Combine and Sort
      const combined = [...maintenance, ...general].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      
      setRequests(combined);
    } catch (err) {
      console.error("Failed to fetch issues:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchIssues();
  }, [user]);

  const handleRequestReply = async (req) => {
    setUpdatingId(req._id);
    try {
      if (req.type === "maintenance") {
        await axios.patch(`http://localhost:4000/api/user/${user.id}/maintenance/${req._id}/reply-request`);
      }
      // General issues might not have a manual "reply request" button since admins can reply anytime
      
      setRequests(prev => prev.map(r => 
        r._id === req._id ? { ...r, replyRequested: true } : r
      ));
    } catch (err) {
      alert("Failed to send reply request. Please try again.");
    } finally {
      setUpdatingId(null);
    }
  };

  const statusConfig = {
    // Maintenance Statuses
    requested: { label: "Request Received", color: "text-amber-600 bg-amber-50 border-amber-100", icon: <Clock size={16} />, btnColor: "bg-amber-600 shadow-amber-200" },
    approved:  { label: "Approved", color: "text-blue-600 bg-blue-50 border-blue-100", icon: <CheckCircle2 size={16} />, btnColor: "bg-blue-600 shadow-blue-200" },
    "in progress": { label: "In Progress", color: "text-violet-600 bg-violet-50 border-violet-100", icon: <Loader2 size={16} className="animate-spin" />, btnColor: "bg-violet-600 shadow-violet-200" },
    completed: { label: "Resolved", color: "text-[#1D3557] bg-[#F1FAEE] border-[#457B9D]/20", icon: <CheckCircle2 size={16} />, btnColor: "bg-[#1D3557] shadow-[#1D3557]/20" },
    
    // General Issue Statuses (Normalizing case and names)
    Pending:     { label: "Pending", color: "text-amber-600 bg-amber-50 border-amber-100", icon: <Clock size={16} />, btnColor: "bg-amber-600 shadow-amber-200" },
    "In Progress": { label: "In Progress", color: "text-blue-600 bg-blue-50 border-blue-100", icon: <Loader2 size={16} className="animate-spin" />, btnColor: "bg-blue-600 shadow-blue-200" },
    Resolved:    { label: "Resolved", color: "text-[#1D3557] bg-[#F1FAEE] border-[#457B9D]/20", icon: <CheckCircle2 size={16} />, btnColor: "bg-[#1D3557] shadow-[#1D3557]/20" },
  };

  const getStatusInfo = (status) => statusConfig[status] || { 
    label: status, 
    color: "text-gray-600 bg-gray-50 border-gray-100", 
    icon: <AlertCircle size={16} />, 
    btnColor: "bg-gray-600" 
  };

  const navigate = useNavigate();

  if (!isLoaded || loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <UserNavBar />
        <div className="max-w-4xl mx-auto px-6 pt-24 pb-20 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4">
              <Skeleton width="150px" height="1rem" />
              <Skeleton width="300px" height="3rem" />
              <Skeleton width="400px" height="1.5rem" />
            </div>
            <Skeleton width="200px" height="5rem" borderRadius="1.5rem" />
          </div>
          <div className="grid gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm space-y-6">
                <div className="flex flex-col md:flex-row gap-6 justify-between">
                  <div className="flex-1 space-y-4">
                    <div className="flex gap-3">
                      <Skeleton width="120px" height="2rem" borderRadius="1rem" />
                      <Skeleton width="100px" height="1.5rem" />
                    </div>
                    <Skeleton width="80%" height="2rem" />
                    <Skeleton width="100%" height="3rem" />
                  </div>
                  <div className="space-y-3 min-w-[200px]">
                    <Skeleton width="100%" height="3.5rem" borderRadius="1.5rem" />
                    <Skeleton width="100%" height="1rem" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <UserNavBar />
      <div className="min-h-screen bg-gray-50/50 pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          
          {/* Header Area */}
          <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 text-[#1D3557] font-bold mb-2"
              >
                <History size={18} />
                <span className="uppercase tracking-wider text-xs">Support Center</span>
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-5xl font-extrabold text-gray-900"
              >
                Issue <span className="text-[#1D3557]">Status</span>
              </motion.h1>
              <p className="text-gray-500 mt-2 text-lg">Tracks and manage your reported issues in real-time.</p>
            </div>
            
            <div className="flex items-center gap-4 bg-white p-2 rounded-2xl shadow-sm border border-gray-100">
               <div className="px-4 py-2 text-center border-r border-gray-100">
                  <p className="text-2xl font-bold text-gray-900">{requests.length}</p>
                  <p className="text-[10px] uppercase text-gray-400 font-bold">Total Issues</p>
               </div>
               <div className="px-4 py-2 text-center">
                  <p className="text-2xl font-bold text-[#1D3557]">
                    {requests.filter(r => r.status === 'completed').length}
                  </p>
                  <p className="text-[10px] uppercase text-gray-400 font-bold">Resolved</p>
               </div>
            </div>
          </div>

          <AnimatePresence mode="popLayout">
            {requests.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-xl"
              >
                <div className="bg-[#1D3557]/10 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <MessageSquare size={32} className="text-[#1D3557]" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">No Issues Reported</h2>
                <p className="text-gray-500 mt-2 mb-8 max-w-sm mx-auto">It looks like everything is running smoothly! If you ever have a problem, report it via the Support section.</p>
                <button 
                  onClick={() => navigate('/contact')}
                  className="bg-[#1D3557] text-white font-bold px-8 py-3 rounded-xl shadow-lg shadow-[#1D3557]/20 hover:bg-[#457B9D] transition-all">
                  Contact Support
                </button>
              </motion.div>
            ) : (
              <div className="grid gap-6">
                {requests.map((req, i) => {
                  const info = getStatusInfo(req.status);
                  const isUpdating = updatingId === req._id;

                  return (
                    <motion.div
                      key={req._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#1D3557]/20 transition-all group"
                    >
                      <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between">
                        
                        {/* Info Block */}
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-4">
                            <span className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold border ${info.color}`}>
                              {info.icon}
                              {info.label.toUpperCase()}
                            </span>
                            <span className="text-gray-300 text-sm">{new Date(req.date).toLocaleDateString()}</span>
                            {req.type === "general" && (
                              <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-[10px] font-bold border border-blue-100 uppercase tracking-widest">General Support</span>
                            )}
                          </div>

                          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 group-hover:text-[#1D3557] transition-colors uppercase">
                            {req.title}
                          </h3>
                          <p className="text-gray-600 line-clamp-2 md:line-clamp-none leading-relaxed">
                            {req.issue}
                          </p>

                          {/* Admin Reply for General Issues */}
                          {req.type === "general" && req.adminReply && (
                            <div className="mt-4 bg-[#F1FAEE] p-4 rounded-2xl border border-[#A8DADC]/50">
                               <p className="text-xs font-bold text-[#1D3557] mb-1 flex items-center gap-2">
                                 <MessageSquare size={14} /> Admin Response:
                               </p>
                               <p className="text-sm text-[#1D3557] italic">"{req.adminReply}"</p>
                            </div>
                          )}

                          {req.replyRequested && (
                            <div className="mt-4 flex items-center gap-2 text-amber-600 text-sm font-bold bg-amber-50 w-fit px-3 py-1 rounded-lg">
                              <AlertTriangle size={14} />
                              Reply Requested
                            </div>
                          )}
                        </div>

                        {/* Action Block */}
                        <div className="flex flex-col gap-3 min-w-[200px]">
                          {req.status !== 'completed' && req.status !== 'Resolved' && !req.replyRequested && req.type === "maintenance" ? (
                            <button
                              onClick={() => handleRequestReply(req)}
                              disabled={isUpdating}
                              className={`w-full py-4 rounded-2xl text-white font-bold flex items-center justify-center gap-2 transition-all shadow-lg ${info.btnColor}`}
                            >
                              {isUpdating ? (
                                <Loader2 size={18} className="animate-spin" />
                              ) : (
                                <>
                                  <MessageSquare size={18} />
                                  Request for Reply
                                </>
                              )}
                            </button>
                          ) : (
                            <div className="w-full py-4 rounded-2xl bg-gray-50 border border-gray-100 text-gray-400 font-bold flex items-center justify-center gap-2">
                              {req.status === 'completed' || req.status === 'Resolved' ? (
                                <>
                                  <CheckCircle2 size={18} />
                                  Issue Resolved
                                </>
                              ) : (
                                <>
                                  <Clock size={18} />
                                  {req.type === 'general' ? "In Review" : "Awaiting Response"}
                                </>
                              )}
                            </div>
                          )}
                          <p className="text-[10px] text-gray-400 text-center uppercase tracking-widest font-bold px-2">
                             Reference ID: {req._id.slice(-6).toUpperCase()}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <Footer />
    </>
  );
}
