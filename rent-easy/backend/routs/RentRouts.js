const express = require("express");
const router = express.Router();
const { getAllRents, updateStatus, updateDeliveryDate, updatePickupDate, getAllMaintenance, updateMaintenanceStatus } = require("../controller/rentController");

router.get("/allRents", getAllRents);
router.put("/updateStatus/:orderId", updateStatus);
router.put("/updateDelivery/:orderId", updateDeliveryDate);
router.put("/updatePickup/:orderId", updatePickupDate);
router.get("/allMaintenance", getAllMaintenance);
router.put("/updateMaintenance/:userId/:requestId", updateMaintenanceStatus);

module.exports = router;
