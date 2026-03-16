const express = require("express");
const router = express.Router();
const { getAllRents, updateStatus, updateDeliveryDate, getAllMaintenance, updateMaintenanceStatus } = require("../controller/rentController");

router.get("/allRents", getAllRents);
router.put("/updateStatus/:orderId", updateStatus);
router.put("/updateDelivery/:orderId", updateDeliveryDate);
router.get("/allMaintenance", getAllMaintenance);
router.put("/updateMaintenance/:userId/:requestId", updateMaintenanceStatus);

module.exports = router;
