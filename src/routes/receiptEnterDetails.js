const express = require("express");
const router = express.Router();

const receiptEnterDetailController = require("../app/controllers/receiptEnterDetailController");

// Add new receiptEnterDetail
router.post("/add", receiptEnterDetailController.addNewReceiptEnterDetail);

// Get all receiptEnterDetail
router.get("/", receiptEnterDetailController.getAllReceiptEnterDetail);

// Get detail one receiptEnterDetail
router.get("/:id", receiptEnterDetailController.getOneReceiptEnterDetail);

// Update one receiptEnterDetail
router.put(
    "/update/:id",
    receiptEnterDetailController.updateReceiptEnterDetail
);

// Soft Delete receiptEnterDetail
router.put(
    "/softdelete/:id",
    receiptEnterDetailController.softDeleteReceiptEnterDetail
);

// Delete receiptEnterDetail
router.delete(
    "/delete/:id",
    receiptEnterDetailController.deleteReceiptEnterDetail
);

module.exports = router;
