const express = require("express");
const router = express.Router();

const orderController = require("../app/controllers/orderController");

// Add new order
router.post("/add", orderController.addOrder);

// Get detail one Order
router.get("/:id", orderController.getOneOrder);

// Get all Orders
router.get("/", orderController.getAllOrderDetail);

module.exports = router;
