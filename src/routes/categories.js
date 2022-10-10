const express = require("express");
const router = express.Router();

const categoryController = require("../app/controllers/categoryController");

// Add new category
router.post("/add", categoryController.addNewCategory);

// Get all categories
router.get("/", categoryController.getAllCategory);

// Get detail one category
router.get("/:id", categoryController.getOneCategory);

// Update category
router.put("/update/:id", categoryController.updateCategory);

// Soft Delete category
router.put("/softdelete/:id", categoryController.softDeleteCategory);

// Delete category
router.delete("/delete/:id", categoryController.deleteCategory);

module.exports = router;
