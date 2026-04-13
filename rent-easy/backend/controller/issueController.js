const Issue = require("../models/issueModel");

// Create a new issue
exports.createIssue = async (req, res) => {
  try {
    const { clerkId, userName, userEmail, category, subject, message, priority } = req.body;
    
    const issue = await Issue.create({
      clerkId,
      userName,
      userEmail,
      category,
      subject,
      message,
      priority
    });

    res.status(201).json(issue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all issues (Admin)
exports.getAllIssues = async (req, res) => {
  try {
    const issues = await Issue.find().sort({ createdAt: -1 });
    res.status(200).json(issues);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get issues by user
exports.getUserIssues = async (req, res) => {
  try {
    const { clerkId } = req.params;
    const issues = await Issue.find({ clerkId }).sort({ createdAt: -1 });
    res.status(200).json(issues);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update issue status or add reply (Admin)
exports.updateIssue = async (req, res) => {
  try {
    const { issueId } = req.params;
    const { status, adminReply } = req.body;

    const issue = await Issue.findById(issueId);
    if (!issue) return res.status(404).json({ message: "Issue not found" });

    if (status) issue.status = status;
    if (adminReply !== undefined) {
      issue.adminReply = adminReply;
      issue.repliedAt = new Date();
    }

    await issue.save();
    res.status(200).json(issue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete an issue
exports.deleteIssue = async (req, res) => {
  try {
    const { issueId } = req.params;
    await Issue.findByIdAndDelete(issueId);
    res.status(200).json({ message: "Issue deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
