const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
{
  clerkId: {
    type: String,
    required: true,
    unique: true
  },

  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  },

  role: {
    type: String,
    enum: ["user","admin"],
    default: "user"
  },


  /* ADDRESSES */

  address: [
    {
      fullname: { type: String, required: true },

      addressline1: { type: String, required: true },

      addressline2: { type: String },

      city: { type: String, required: true },

      state: { type: String, required: true },

      phone: { type: String, required: true },

      pincode: { type: String, required: true },

      isDefault: {
        type: Boolean,
        default: false
      }
    }
  ],


  /* CART */

  cart: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
      },

      quantity: {
        type: Number,
        default: 1
      },

      addedAt: {
        type: Date,
        default: Date.now
      }
    }
  ],


  /* ACTIVE RENTALS */

  activeRentals: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
      },

      rentalStartDate: Date,

      rentalEndDate: Date,

      deliveryDate: Date,

      price: Number,

      status: {
        type: String,
        enum: [
          "ordered",
          "dispatch",
          "out for delivery",
          "complete",
          "active"
        ],
        default: "ordered"
      }
    }
  ],


  /* PAST RENTALS */

  pastRentals: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
      },

      rentalStartDate: Date,

      rentalEndDate: Date,

      returnedAt: Date,

      totalPaid: Number
    }
  ],


  /* MAINTENANCE REQUESTS */

  maintenanceRequests: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
      },

      issue: String,

      requestedAt: {
        type: Date,
        default: Date.now
      },

      expectedCompletionDate: Date,

      completedAt: Date,

      status: {
        type: String,
        enum: [
          "requested",
          "approved",
          "in progress",
          "completed"
        ],
        default: "requested"
      }
    }
  ]

},
{ timestamps:true }
);

module.exports = mongoose.model("User", userSchema);