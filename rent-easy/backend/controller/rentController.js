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

    // If status is "complete", move to pastRentals
    if (status === "complete") {
      user.pastRentals.push({
        product: rental.product,
        rentalStartDate: rental.rentalStartDate,
        rentalEndDate: rental.rentalEndDate,
        returnedAt: new Date(),
        totalPaid: rental.price
      });
      user.activeRentals.pull(orderId);
    }

    await user.save();
    
    // Return updated order or a placeholder if it was moved
    if (status === "complete") {
      return res.status(200).json({ ...rental.toObject(), status: "complete", _id: orderId });
    }

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
