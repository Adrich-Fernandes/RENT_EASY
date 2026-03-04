const express = require("express");
const router = express.Router();
const { createProduct, updateProduct, getAllProducts, deleteProduct } = require("../controller/productController");

router.get("/allProducts", getAllProducts);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;