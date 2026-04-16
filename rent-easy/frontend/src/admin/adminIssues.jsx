import { useState, useEffect } from "react";
import axios from "axios";
import AdminNavBar from "../components/adminNavBar";
import { 
  Search, 
  Filter, 
  MessageSquare, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  MoreVertical,
  ChevronDown,
  User,
  Mail,
  Send,
  Trash2,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminIssues() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/issue/all");
      setIssues(res.data);
    } catch (err) {
      console.error("Failed to fetch issues:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (issueId, status, reply) => {
    setUpdating(true);
    try {
      const res = await axios.put(`http://localhost:4000/api/issue/update/${issueId}`, { status, adminReply: reply });
      setIssues(prev => prev.map(iss => iss._id === issueId ? res.data : iss));
      if (selectedIssue?._id === issueId) {
        setSelectedIssue(res.data);
      }
      if (reply) setReplyText("");
    } catch (err) {
      alert("Failed to update issue");
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async (issueId) => {
    if (!window.confirm("Are you sure you want to delete this issue?")) return;
    try {
      await axios.delete(`http://localhost:4000/api/issue/${issueId}`);
      setIssues(prev => prev.filter(iss => iss._id !== issueId));
      setSelectedIssue(null);
    } catch (err) {
      alert("Failed to delete issue");
    }
  };

  const filteredIssues = issues.filter(iss => {
    const matchesSearch = 
      iss.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      iss.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      iss.userEmail.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === "All" || iss.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const getStatusStyle = (status) => {
    switch (status) {
      case "Pending": return "bg-amber-100 text-amber-700 border-amber-200";
      case "In Progress": return "bg-blue-100 text-blue-700 border-blue-200";
      case "Resolved": return "bg-[#E63946]/10 text-[#E63946] border-[#E63946]/20";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getPriorityStyle = (priority) => {
    switch (priority) {
      case "High": return "text-[#E63946]";
      case "Medium": return "text-amber-600";
      case "Low": return "text-[#E63946]";
      default: return "text-gray-600";
    }
  };

  return (
    <>
      <AdminNavBar />
      <div className="p-6 md:p-8 bg-gray-50/50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900">User <span className="text-[#E63946]">Issues</span></h1>
              <p className="text-gray-500 mt-1">Manage and respond to support tickets from users.</p>
            </div>
            
            <div className="flex flex-wrap items-center gap-4">
              <div className="relative">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text"
                  placeholder="Search issues..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#A8DADC] w-64 shadow-sm"
                />
              </div>
              
              <div className="flex border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
                {["All", "Pending", "In Progress", "Resolved"].map(s => (
                  <button
                    key={s}
                    onClick={() => setFilterStatus(s)}
                    className={`px-4 py-2 text-xs font-bold transition-all ${
                      filterStatus === s 
                      ? "bg-[#1D3557] text-white" 
                      : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            
            {/* List Section */}
            <div className="xl:col-span-2">
              {loading ? (
                <div className="flex items-center justify-center h-64 bg-white rounded-3xl border border-gray-100">
                  <div className="w-10 h-10 border-4 border-[#E63946] border-t-transparent rounded-full animate-spin" />
                </div>
              ) : filteredIssues.length === 0 ? (
                <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm">
                  <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-gray-400">
                    <MessageSquare size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">No issues found</h3>
                  <p className="text-gray-500">Try adjusting your search or filter.</p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {filteredIssues.map(iss => (
                    <motion.div
                      layout
                      key={iss._id}
                      onClick={() => setSelectedIssue(iss)}
                      className={`group bg-white p-5 rounded-3xl border-2 transition-all cursor-pointer ${
                        selectedIssue?._id === iss._id 
                        ? "border-[#457B9D] shadow-xl shadow-[#457B9D]/20" 
                        : "border-transparent hover:border-gray-200 shadow-sm"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                          iss.status === 'Resolved' ? "bg-[#E63946]/10 text-[#E63946]" : "bg-amber-50 text-amber-600"
                        }`}>
                          {iss.status === 'Resolved' ? <CheckCircle2 size={24} /> : <AlertTriangle size={24} />}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{iss.category}</span>
                            <span className="text-[10px] text-gray-400">{new Date(iss.createdAt).toLocaleDateString()}</span>
                          </div>
                          <h3 className="font-bold text-gray-900 truncate group-hover:text-[#E63946] transition-colors uppercase">{iss.subject}</h3>
                          <div className="flex items-center gap-3 mt-3">
                            <div className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold border ${getStatusStyle(iss.status)}`}>
                              {iss.status.toUpperCase()}
                            </div>
                            <div className={`text-[10px] font-bold flex items-center gap-1 ${getPriorityStyle(iss.priority)}`}>
                              <div className={`w-1.5 h-1.5 rounded-full bg-current`} />
                              {iss.priority} Priority
                            </div>
                          </div>
                        </div>

                        <div className="hidden md:flex flex-col items-end gap-1">
                          <div className="text-xs font-bold text-gray-900">{iss.userName}</div>
                          <div className="text-[10px] text-gray-400">{iss.userEmail}</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Detail Section */}
            <div className="xl:col-span-1">
              <AnimatePresence mode="wait">
                {selectedIssue ? (
                  <motion.div
                    key="detail"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="bg-white rounded-3xl border border-gray-100 shadow-2xl sticky top-24 overflow-hidden"
                  >
                    {/* Header */}
                    <div className="p-6 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
                      <div className="flex items-center gap-4">
                         <div className="w-10 h-10 bg-[#1D3557] text-white rounded-xl flex items-center justify-center font-bold">
                           {selectedIssue.userName[0]}
                         </div>
                         <div>
                           <h3 className="font-bold text-gray-900 leading-tight">{selectedIssue.userName}</h3>
                           <p className="text-[10px] text-gray-500 uppercase tracking-tighter">Reference #{selectedIssue._id.slice(-6)}</p>
                         </div>
                      </div>
                      <button 
                        onClick={() => setSelectedIssue(null)}
                        className="p-2 hover:bg-gray-100 rounded-full text-gray-400 transition-colors"
                      >
                        <X size={20} />
                      </button>
                    </div>

                    <div className="p-6 space-y-6">
                      {/* Contact Info */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-3 bg-gray-50 rounded-2xl flex items-center gap-3">
                          <Mail size={16} className="text-gray-400" />
                          <span className="text-xs font-medium text-gray-700 truncate">{selectedIssue.userEmail}</span>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-2xl flex items-center gap-3">
                          <User size={16} className="text-gray-400" />
                          <span className="text-xs font-medium text-gray-700 truncate">ID: {selectedIssue.clerkId.slice(0, 10)}...</span>
                        </div>
                      </div>

                      {/* Content */}
                      <div>
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Issue Description</h4>
                        <div className="bg-[#F1FAEE]/30 p-4 rounded-2xl border border-[#457B9D]/30">
                          <p className="text-sm text-gray-800 leading-relaxed italic">"{selectedIssue.message}"</p>
                        </div>
                      </div>

                      {/* Status Control */}
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-gray-500 mr-2">Status:</span>
                        {["Pending", "In Progress", "Resolved"].map(s => (
                          <button
                            key={s}
                            disabled={updating}
                            onClick={() => handleUpdate(selectedIssue._id, s, selectedIssue.adminReply)}
                            className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${
                              selectedIssue.status === s 
                              ? "bg-gray-900 text-white ring-2 ring-gray-900 ring-offset-2" 
                              : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                            }`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>

                      <hr className="border-gray-50" />

                      {/* Reply Section */}
                      <div>
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                          <MessageSquare size={14} />
                          Admin Reply
                        </h4>
                        
                        {selectedIssue.adminReply && !updating && (
                          <div className="mb-4 bg-[#F1FAEE] p-4 rounded-2xl border border-[#457B9D]/30">
                             <p className="text-xs text-[#1D3557] font-medium leading-relaxed">{selectedIssue.adminReply}</p>
                             <p className="text-[10px] text-[#457B9D] mt-2">Sent: {new Date(selectedIssue.repliedAt).toLocaleString()}</p>
                          </div>
                        )}

                        <textarea
                          placeholder="Type your response to the user..."
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#A8DADC] text-sm min-h-[120px] resize-none"
                        />
                        
                        <div className="flex gap-3 mt-4">
                           <button
                             disabled={updating || !replyText.trim()}
                             onClick={() => handleUpdate(selectedIssue._id, selectedIssue.status, replyText)}
                             className="flex-1 bg-[#1D3557] hover:bg-[#457B9D] disabled:bg-gray-300 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 text-sm transition-all"
                           >
                             {updating ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <><Send size={16} /> Send Reply</>}
                           </button>
                           <button
                             onClick={() => handleDelete(selectedIssue._id)}
                             className="p-3 bg-gray-100 hover:bg-[#E63946]/10 hover:text-[#E63946] rounded-xl text-gray-400 transition-all"
                           >
                             <Trash2 size={18} />
                           </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-white rounded-3xl p-12 text-center border-2 border-dashed border-gray-100 flex flex-col items-center justify-center h-[500px]"
                  >
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6 text-gray-300">
                       <MoreVertical size={40} className="rotate-90" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-400">Select an issue to view details</h3>
                    <p className="text-gray-400 mt-2 text-sm">Choose a ticket from the list to start responding.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
