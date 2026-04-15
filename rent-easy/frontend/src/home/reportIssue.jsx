import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Send, AlertCircle, CheckCircle2, MessageSquare, ShieldCheck, HelpCircle } from "lucide-react";
import UserNavBar from "../components/userNavBar";
import Footer from "../components/footer";
import { useNavigate, useLocation } from "react-router-dom";

export default function ReportIssue() {
  const { user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Extract query params
  const queryParams = new URLSearchParams(location.search);
  const initialSubject = queryParams.get("subject") || "";
  const initialCategory = queryParams.get("category") || "General";

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    category: initialCategory,
    subject: initialSubject,
    message: "",
    priority: "Medium"
  });

  const categories = ["Billing", "Technical Support", "Product Inquiry", "Feedback", "Other"];
  const priorities = ["Low", "Medium", "High"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // 1. Save to internal Database
      await axios.post("http://localhost:4000/api/issue/create", {
        clerkId: user.id,
        userName: user.fullName || "User",
        userEmail: user.primaryEmailAddress.emailAddress,
        ...formData
      });

      // 2. Send Email Notification via Web3Forms
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "be76b3f8-7fb7-4a9e-8537-28fa5e21c7e9",
          name: user.fullName,
          email: user.primaryEmailAddress.emailAddress,
          subject: `[Issue Report] ${formData.subject}`,
          message: `Category: ${formData.category}\nPriority: ${formData.priority}\n\nMessage: ${formData.message}`,
          from_name: "RentEase Support System"
        })
      });

      setSuccess(true);
      setTimeout(() => navigate("/issue-status"), 3000);
    } catch (error) {
      console.error("Failed to report issue:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <UserNavBar />
      <div className="min-h-screen bg-white pt-24 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-12">
            <motion.div 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-full font-bold text-xs uppercase tracking-widest mb-4"
            >
              <AlertCircle size={14} />
              Support Center
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4"
            >
              Report an <span className="text-red-600">Issue</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-gray-500 text-lg max-w-2xl mx-auto"
            >
              Encountered a problem? We're here to help. Fill out the form below and our team will get back to you shortly.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Left side info */}
            <div className="lg:col-span-1 space-y-8">
              <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <ShieldCheck size={20} className="text-red-600" />
                  Our Guarantee
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  We aim to respond to all technical and billing issues within 24 business hours. Your satisfaction is our top priority.
                </p>
              </div>

              <div className="bg-red-50 p-6 rounded-3xl border border-red-100">
                <h3 className="text-lg font-bold text-red-900 mb-4 flex items-center gap-2">
                  <HelpCircle size={20} className="text-red-600" />
                  Quick Tips
                </h3>
                <ul className="text-sm text-red-800 space-y-3 opacity-80">
                  <li className="flex gap-2"><span>•</span> Be as descriptive as possible.</li>
                  <li className="flex gap-2"><span>•</span> Mention any error codes you saw.</li>
                  <li className="flex gap-2"><span>•</span> Check your internet connection first.</li>
                </ul>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                {success ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="bg-white border-2 border-rose-100 rounded-3xl p-12 text-center shadow-xl shadow-rose-50"
                  >
                    <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 size={40} className="text-rose-600" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Issue Reported!</h2>
                    <p className="text-gray-600 mb-8">Your ticket has been created successfully. Redirecting you to your issue history...</p>
                    <div className="flex justify-center">
                      <div className="w-12 h-1 bg-rose-100 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ x: "-100%" }}
                          animate={{ x: "0%" }}
                          transition={{ duration: 3 }}
                          className="w-full h-full bg-rose-500"
                        />
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white border border-gray-100 rounded-3xl p-8 shadow-2xl relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-bl-full -z-10 opacity-50"></div>
                    
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-gray-700 ml-1">Issue Category</label>
                          <select 
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-400/50 transition-all font-medium appearance-none"
                          >
                            {categories.map(c => <option key={c} value={c}>{c}</option>)}
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-gray-700 ml-1">Priority Level</label>
                          <select 
                            name="priority"
                            value={formData.priority}
                            onChange={handleChange}
                            className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-400/50 transition-all font-medium appearance-none"
                          >
                            {priorities.map(p => <option key={p} value={p}>{p}</option>)}
                          </select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700 ml-1">Subject</label>
                        <input 
                          required
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder="Briefly describe the problem"
                          className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-400/50 transition-all font-medium"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700 ml-1">Detailed Message</label>
                        <textarea 
                          required
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows="6"
                          placeholder="Provide as much detail as possible..."
                          className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-400/50 transition-all font-medium resize-none"
                        ></textarea>
                      </div>

                      <button 
                        type="submit"
                        disabled={loading}
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-5 rounded-2xl shadow-lg shadow-red-200 transition-all flex items-center justify-center gap-2 group disabled:bg-gray-400 active:scale-95"
                      >
                        {loading ? (
                          <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <>
                            Submit Issue
                            <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                          </>
                        )}
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
