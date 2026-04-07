const Product = require("../models/productModel");

const createProduct = async (req, res) => {
  try {
    const { title, description, category, subcategory, rent, deposit, imgs } = req.body
    const product = new Product({ title, description, category, subcategory, rent, deposit, imgs })
    await product.save()
    res.status(201).json({ message: "Product created successfully", product })
  } catch (err) {
    res.status(500).json({ message: "Error creating product", error: err.message })
  }
}

const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!updatedProduct) return res.status(404).json({ message: "Product not found" })
    res.status(200).json({ message: "Product updated successfully", product: updatedProduct })
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error: error.message })
  }
}

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
    res.status(200).json(products)
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error: error.message })
  }
}

const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id)
    if (!deletedProduct) return res.status(404).json({ message: "Product not found" })
    res.status(200).json({ message: "Product deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error: error.message })
  }
}

module.exports = { createProduct, updateProduct, getAllProducts, deleteProduct }
