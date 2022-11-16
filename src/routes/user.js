const express = require("express");
const middlewareController = require("../app/controllers/middlewareController");
const router = express.Router();

const userController = require("../app/controllers/userController");

// Get all users
router.get("/", middlewareController.verifyToken, userController.getAllUser);

// Get detail one user
router.get("/:id", userController.getOneUser);

// Update user
router.put("/update/:id", userController.updateUser);

// Soft delete user
router.put("/softdelete/:id", userController.softDeleteUser);

// Delete user
router.delete(
    "/delete/:id",
    middlewareController.verifyTokenAndAdminAuth,
    userController.deleteUser
);

// Add item to Cart
router.post("/addToCart/:id", userController.addToCart);

// Change item from Cart
router.put("/changeItemCart/:id", userController.changeItemCart);

module.exports = router;
