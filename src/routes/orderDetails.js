const express = require("express");
const router = express.Router();

const orderDetailController = require("../app/controllers/orderDetailController");

// Add new orderDetail
router.post("/add", orderDetailController.addOrderDetail);

// Get detail one orderDetail
router.get("/:id", orderDetailController.getOneOrderDetail);

// Get all orderDetails
router.get("/", orderDetailController.getAllOrderDetail);

module.exports = router;
