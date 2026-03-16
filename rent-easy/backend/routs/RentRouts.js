const express = require("express");
const router = express.Router();
const { getAllRents, updateStatus, updateDeliveryDate } = require("../controller/rentController");

router.get("/allRents", getAllRents);
router.put("/updateStatus/:orderId", updateStatus);
router.put("/updateDelivery/:orderId", updateDeliveryDate);

module.exports = router;
