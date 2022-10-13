const express = require("express");
const router = express.Router();

const warehouseController = require("../app/controllers/warehouseController");

// Add new warehouse
router.post("/add", warehouseController.addNewWarehouse);

// Get all warehouse
router.get("/", warehouseController.getAllWarehouse);

// Get detail one warehouse
router.get("/:id", warehouseController.getOneWarehouse);

// Update warehouse
router.put("/update/:id", warehouseController.updateWarehouse);

// Soft Delete warehouse
router.put("/softdelete/:id", warehouseController.softDeleteWarehouse);

// Delete warehouse
router.delete("/delete/:id", warehouseController.deleteWarehouse);

module.exports = router;
