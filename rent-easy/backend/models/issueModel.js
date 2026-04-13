const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema(
  {
    clerkId: {
      type: String,
      required: true
    },
    userName: {
      type: String,
      required: true
    },
    userEmail: {
      type: String,
      required: true
    },
    category: {
      type: String,
      enum: ["Billing", "Technical Support", "Product Inquiry", "Feedback", "General Inquiry", "Maintenance Request", "Partner With Us", "Other"],
      default: "Other"
    },
    subject: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Resolved"],
      default: "Pending"
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium"
    },
    adminReply: {
      type: String,
      default: ""
    },
    repliedAt: {
      type: Date
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Issue", issueSchema);
