const express = require("express");
const router = express.Router();

const receiptEnterWarehouseController = require("../app/controllers/receiptEnterWarehouseController");
const { route } = require("./products");

// Add new receiptEnterWarehouse
router.post(
    "/add",
    receiptEnterWarehouseController.addNewReceiptEnterWarehouse
);

// Get all receiptEnterWarehouse
router.get("/", receiptEnterWarehouseController.getAllReceiptEnterWarehouse);

// Get detail one receiptEnterWarehouse
router.get("/:id", receiptEnterWarehouseController.getOneReceiptEnterWarehouse);

// Update receiptEnterWarehouse
router.put(
    "/update/:id",
    receiptEnterWarehouseController.updateReceiptEnterWarehouse
);

// Soft Delete receiptEnterWarehouse
router.put(
    "/softdelete/:id",
    receiptEnterWarehouseController.softDeleteReceiptEnterWarehouse
);

// Deleted receiptEnterWarehouse
router.delete(
    "/delete/:id",
    receiptEnterWarehouseController.deleteReceiptEnterWarehouse
);

module.exports = router;
