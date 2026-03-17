const User = require("../models/userModel");

/* =========================
   CREATE USER (after Clerk login)
========================= */

exports.createUser = async (req, res) => {
  try {

    const { clerkId, name, email } = req.body;

    const existingUser = await User.findOne({ clerkId });

    if (existingUser) {
      return res.status(200).json(existingUser);
    }

    const user = await User.create({
      clerkId,
      name,
      email
    });

    res.status(201).json(user);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




/* =========================
   GET USER
========================= */

exports.getUser = async (req, res) => {

  try {

    const { clerkId } = req.params;

    const user = await User.findOne({ clerkId })
      .populate("cart.product")
      .populate("activeRentals.product")
      .populate("pastRentals.product")
      .populate("maintenanceRequests.product");

    res.json(user);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }

};




/* =========================
   ADD ADDRESS
========================= */

exports.addAddress = async (req, res) => {

  try {

    const { clerkId } = req.params;

    const user = await User.findOne({ clerkId });

    user.address.push(req.body);

    await user.save();

    res.json(user.address);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }

};




/* =========================
   DELETE ADDRESS
========================= */

exports.deleteAddress = async (req, res) => {

  try {

    const { clerkId, addressId } = req.params;

    const user = await User.findOne({ clerkId });

    user.address = user.address.filter(
      (addr) => addr._id.toString() !== addressId
    );

    await user.save();

    res.json(user.address);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }

};




/* =========================
   ADD TO CART
========================= */

exports.addToCart = async (req, res) => {

  try {

    const { clerkId } = req.params;
    const { productId, tenure = 1 } = req.body;

    const user = await User.findOne({ clerkId });

    const existingItem = user.cart.find(
      (item) => item.product.toString() === productId
    );

    if (existingItem) {
      existingItem.tenure = tenure;
    } else {
      user.cart.push({ product: productId, tenure });
    }

    await user.save();

    res.json(user.cart);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }

};




/* =========================
   REMOVE FROM CART
========================= */

exports.removeFromCart = async (req, res) => {

  try {

    const { clerkId, productId } = req.params;

    const user = await User.findOne({ clerkId });

    user.cart = user.cart.filter(
      (item) => item.product.toString() !== productId
    );

    await user.save();

    res.json(user.cart);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }

};




/* =========================
   CREATE RENTAL
========================= */

exports.createRental = async (req, res) => {

  try {

    const { clerkId } = req.params;

    const {
      productId,
      rentalStartDate,
      rentalEndDate,
      price,
      shippingAddress
    } = req.body;

    const user = await User.findOne({ clerkId });

    user.activeRentals.push({
      product: productId,
      rentalStartDate,
      rentalEndDate,
      price,
      shippingAddress,
      status: "ordered"
    });

    await user.save();

    res.json(user.activeRentals);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }

};




/* =========================
   COMPLETE RENTAL
========================= */

exports.completeRental = async (req, res) => {

  try {

    const { clerkId, rentalId } = req.params;

    const user = await User.findOne({ clerkId });

    const rental = user.activeRentals.id(rentalId);

    user.pastRentals.push({
      product: rental.product,
      rentalStartDate: rental.rentalStartDate,
      rentalEndDate: rental.rentalEndDate,
      returnedAt: new Date(),
      totalPaid: rental.price
    });

    rental.deleteOne();

    await user.save();

    res.json(user.pastRentals);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }

};




/* =========================
   CREATE MAINTENANCE REQUEST
========================= */

exports.createMaintenanceRequest = async (req, res) => {

  try {

    const { clerkId } = req.params;

    const { productId, issue } = req.body;

    const user = await User.findOne({ clerkId });

    user.maintenanceRequests.push({
      product: productId,
      issue
    });

    await user.save();

    res.json(user.maintenanceRequests);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }

};