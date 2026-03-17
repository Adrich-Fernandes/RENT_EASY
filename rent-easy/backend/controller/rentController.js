const User = require("../models/userModel");

// Get all rentals across all users
exports.getAllRents = async (req, res) => {
  try {
    const users = await User.find({ "activeRentals.0": { $exists: true } })
      .populate("activeRentals.product");

    const allRents = [];
    users.forEach(user => {
      user.activeRentals.forEach(rental => {
        allRents.push({
          ...rental.toObject(),
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            clerkId: user.clerkId
          }
        });
      });
    });

    res.status(200).json(allRents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update status of a specific rental
exports.updateStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const user = await User.findOne({ "activeRentals._id": orderId });
    if (!user) return res.status(404).json({ message: "Rental not found" });

    const rental = user.activeRentals.id(orderId);
    rental.status = status;

    await user.save();
    
    const updatedRental = user.activeRentals.id(orderId);
    res.status(200).json({
      ...updatedRental.toObject(),
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update delivery date of a specific rental
exports.updateDeliveryDate = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { deliveryDate } = req.body;

    const user = await User.findOne({ "activeRentals._id": orderId });
    if (!user) return res.status(404).json({ message: "Rental not found" });

    const rental = user.activeRentals.id(orderId);
    rental.deliveryDate = new Date(deliveryDate);

    await user.save();

    const updatedRental = user.activeRentals.id(orderId);
    res.status(200).json({
      ...updatedRental.toObject(),
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all maintenance requests across all users
exports.getAllMaintenance = async (req, res) => {
  try {
    const users = await User.find({ "maintenanceRequests.0": { $exists: true } })
      .populate("maintenanceRequests.product");

    const allRequests = [];
    users.forEach(user => {
      user.maintenanceRequests.forEach(request => {
        allRequests.push({
          ...request.toObject(),
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            clerkId: user.clerkId
          }
        });
      });
    });

    res.status(200).json(allRequests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update maintenance request
exports.updateMaintenanceStatus = async (req, res) => {
  try {
    const { userId, requestId } = req.params;
    const { status, expectedCompletionDate, pickupDate } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const request = user.maintenanceRequests.id(requestId);
    if (!request) return res.status(404).json({ message: "Request not found" });

    if (status) request.status = status;
    if (expectedCompletionDate) request.expectedCompletionDate = new Date(expectedCompletionDate);
    if (pickupDate) {
      request.pickupDate = new Date(pickupDate);
      // Auto-approve if currently in "requested" state
      if (request.status === "requested") {
        request.status = "approved";
      }
    }
    if (status === "completed") request.completedAt = new Date();

    await user.save();

    res.status(200).json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
