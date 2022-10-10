const express = require("express");
const router = express.Router();

const productController = require("../app/controllers/productController");

// Add new product
router.post("/add", productController.addNewProduct);

// Get all products
router.get("/", productController.getAllProduct);

// Get detail one product
router.get("/:id", productController.getOneProduct);

// Update product
router.put("/update/:id", productController.updateProduct);

// Soft Delete Product
router.put("/softdelete/:id", productController.softDeleteProduct);

// Deleted product
router.delete("/delete/:id", productController.deleteProduct);

module.exports = router;
