const express = require("express");
const router = express.Router();
const issueController = require("../controller/issueController");

// User routes
router.post("/create", issueController.createIssue);
router.get("/user/:clerkId", issueController.getUserIssues);

// Admin routes
router.get("/all", issueController.getAllIssues);
router.put("/update/:issueId", issueController.updateIssue);
router.delete("/:issueId", issueController.deleteIssue);

module.exports = router;
