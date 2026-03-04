const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    clerkId: {
      type: String,
      required: true,
      unique: true,
    },

    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    address: [
      {
        fullname: { type: String, required: true },
        addressline1: { type: String, required: true },
        addressline2: { type: String },
        city: { type: String, required: true },
        state: { type: String, required: true },
        phone: { type: String, required: true },
        pincode: { type: String, required: true },
      }
    ],

    cart: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
      }
    ],

    activeRentals: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
      }
    ],

    pastRentals: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);