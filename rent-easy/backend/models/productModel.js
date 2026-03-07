const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, trim: true },
        description: { type: String, required: true, trim: true },
        category: { type: String, required: true, trim: true },
        subcategory: { type: String, trim: true, default: "" },
        rent: { type: Number, required: true },
        deposit: { type: Number, required: true },
        img: { type: String, required: true, trim: true },
        available: { type: Boolean, default: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);