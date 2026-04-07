const express = require("express");
const router = express.Router();
const { createProduct, updateProduct, getAllProducts, deleteProduct } = require("../controller/productController");

router.get("/allProducts", getAllProducts);
router.post("/insertProduct", createProduct);
router.put("/updateProduct/:id", updateProduct);
router.delete("/deleteProduct/:id", deleteProduct);

module.exports = router;
