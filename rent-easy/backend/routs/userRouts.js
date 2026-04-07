const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");

router.post("/create", userController.createUser);

router.get("/:clerkId", userController.getUser);

router.post("/:clerkId/address", userController.addAddress);

router.delete("/:clerkId/address/:addressId", userController.deleteAddress);

router.post("/:clerkId/cart", userController.addToCart);

router.delete("/:clerkId/cart/:productId", userController.removeFromCart);

router.post("/:clerkId/rental", userController.createRental);

router.patch("/:clerkId/rental/:rentalId", userController.completeRental);

router.post("/:clerkId/maintenance", userController.createMaintenanceRequest);

module.exports = router;
