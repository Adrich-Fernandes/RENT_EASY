import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Send, Instagram, Twitter, Facebook, Clock, User } from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import UserNavBar from "../components/userNavBar";
import Footer from "../components/footer";

export default function Contact() {
  const { user } = useUser();
  const [formData, setFormData] = useState({
    name: user?.fullName || user?.firstName || "",
    email: user?.primaryEmailAddress?.emailAddress || "",
    subject: "General Inquiry",
    message: ""
  });
  const [status, setStatus] = useState("idle");

  // Sync user data if it loads later
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: prev.name || user.fullName || user.firstName || "",
        email: prev.email || user.primaryEmailAddress?.emailAddress || ""
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Please sign in to send a trackable message.");
      return;
    }

    setStatus("sending");
    try {
      // 1. Save to internal Database
      await axios.post("http://localhost:4000/api/issue/create", {
        clerkId: user.id,
        userName: formData.name,
        userEmail: formData.email,
        category: formData.subject,
        subject: formData.subject,
        message: formData.message,
        priority: "Medium"
      });

      // 2. Send Email Notification via Web3Forms
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "be76b3f8-7fb7-4a9e-8537-28fa5e21c7e9",
          name: formData.name,
          email: formData.email,
          subject: `[Contact Form] ${formData.subject}`,
          message: formData.message,
          from_name: "RentEase Support System"
        })
      });

      setStatus("success");
      setFormData({ name: "", email: "", subject: "General Inquiry", message: "" });
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };

  return (
    <>
      <UserNavBar />
      <div className="min-h-screen bg-white pt-16">
        <section className="bg-[#F1FAEE] py-20 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6"
            >
              Get in <span className="text-[#1D3557]">Touch</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-gray-600 max-w-2xl mx-auto"
            >
              Have questions about our furniture or appliances? We're here to help you create your dream space.
            </motion.p>
          </div>
        </section>

        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
                className="space-y-12"
              >
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-8">Contact Information</h2>
                  <div className="space-y-6">
                    <motion.div variants={fadeUp} className="flex items-start gap-5">
                      <div className="bg-[#A8DADC]/30 p-4 rounded-2xl text-[#457B9D]">
                        <Mail size={24} />
                      </div>
                      <div>
                        <p className="font-bold text-lg">Email Us</p>
                        <p className="text-gray-600">support@rentease.com</p>
                        <p className="text-gray-600">info@rentease.com</p>
                      </div>
                    </motion.div>

                    <motion.div variants={fadeUp} className="flex items-start gap-5">
                      <div className="bg-[#A8DADC]/30 p-4 rounded-2xl text-[#457B9D]">
                        <Phone size={24} />
                      </div>
                      <div>
                        <p className="font-bold text-lg">Call Us</p>
                        <p className="text-gray-600">+91 98765 43210</p>
                        <p className="text-gray-600">Mon - Sat: 9:00 AM - 7:00 PM</p>
                      </div>
                    </motion.div>

                    <motion.div variants={fadeUp} className="flex items-start gap-5">
                      <div className="bg-[#A8DADC]/30 p-4 rounded-2xl text-[#457B9D]">
                        <MapPin size={24} />
                      </div>
                      <div>
                        <p className="font-bold text-lg">Visit Us</p>
                        <p className="text-gray-600">123 Design Square, Furniture District</p>
                        <p className="text-gray-600">Mumbai, Maharashtra 400001</p>
                      </div>
                    </motion.div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Follow Us</h3>
                  <div className="flex gap-4">
                    {[Instagram, Twitter, Facebook].map((Icon, i) => (
                      <motion.a
                        key={i}
                        href="#"
                        whileHover={{ scale: 1.1, backgroundColor: "#1D3557", color: "#FFFFFF" }}
                        className="bg-gray-100 p-4 rounded-2xl text-gray-600 transition-colors"
                      >
                        <Icon size={20} />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white border border-gray-100 rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#F1FAEE] rounded-bl-full -z-10"></div>
                
                {status === "success" ? (
                  <div className="text-center py-10">
                    <div className="bg-[#A8DADC]/30 text-[#457B9D] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Send size={30} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                    <p className="text-gray-600 mb-8">Thank you for reaching out. We'll get back to you at {formData.email} soon.</p>
                    <div className="flex flex-col gap-4 items-center">
                      <button 
                        onClick={() => setStatus("idle")}
                        className="bg-[#1D3557] text-white font-bold px-8 py-3 rounded-xl shadow-lg shadow-[#1D3557]/20 hover:bg-[#457B9D] transition-all"
                      >
                        Send another message
                      </button>
                      <Link to="/issue-status" className="flex items-center gap-2 text-gray-500 text-sm hover:text-[#457B9D] font-bold transition-colors">
                        <Clock size={16} /> Track your requests in Issue Status
                      </Link>
                    </div>
                  </div>
                ) : !user ? (
                  <div className="text-center py-12 px-4 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                       <User className="text-gray-300" size={30} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Sign in to contact us</h3>
                    <p className="text-gray-500 text-sm mb-6 max-w-xs mx-auto">
                      Please sign in to send a message. This allows us to track your request and reply to you directly.
                    </p>
                    <button 
                      onClick={() => window.location.href = "/"}
                      className="bg-[#1D3557] text-white font-bold px-8 py-3 rounded-xl shadow-lg shadow-[#1D3557]/20 hover:bg-[#457B9D] transition-all"
                    >
                      Sign In / Sign Up
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700 ml-1">Full Name</label>
                        <input 
                          required
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          type="text" 
                          placeholder="John Doe"
                          className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-400/50 transition-all font-medium"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700 ml-1">Email Address</label>
                        <input 
                          required
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          type="email" 
                          placeholder="john@example.com"
                          className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-400/50 transition-all font-medium"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700 ml-1">Subject</label>
                      <select 
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-400/50 transition-all font-medium appearance-none"
                      >
                        <option>General Inquiry</option>
                        <option>Maintenance Request</option>
                        <option>Billing Question</option>
                        <option>Partner With Us</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700 ml-1">Message</label>
                      <textarea 
                        required
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="5"
                        placeholder="How can we help you?"
                        className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-400/50 transition-all font-medium resize-none"
                      ></textarea>
                    </div>

                    {status === "error" && (
                      <p className="text-red-500 text-sm font-medium ml-1">Something went wrong. Please try again later.</p>
                    )}

                    <button 
                      type="submit"
                      disabled={status === "sending"}
                      className="w-full bg-[#1D3557] hover:bg-[#457B9D] text-white font-bold py-5 rounded-2xl shadow-lg shadow-[#1D3557]/20 transition-all flex items-center justify-center gap-2 group disabled:bg-gray-400 disabled:shadow-none"
                    >
                      {status === "sending" ? "Sending..." : "Send Message"}
                      <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </button>
                  </form>
                )}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Map Placeholder */}
        <section className="px-6 pb-20">
          <div className="max-w-7xl mx-auto">
            <div className="h-[400px] bg-gray-100 rounded-3xl relative overflow-hidden">
               {/* This would be an actual map in a production app */}
               <div className="absolute inset-0 flex items-center justify-center">
                 <div className="text-center">
                   <div className="bg-white p-6 rounded-3xl shadow-xl inline-block mb-4">
                     <MapPin size={40} className="text-[#1D3557] mx-auto" />
                   </div>
                   <p className="font-bold text-xl text-gray-800">Our Main Hub</p>
                   <p className="text-gray-500">Mumbai, Maharashtra</p>
                 </div>
               </div>
               <img 
                 src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?fm=jpg&q=60&w=3000&auto=format&fit=crop" 
                 alt="Map background"
                 className="w-full h-full object-cover opacity-40"
               />
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
