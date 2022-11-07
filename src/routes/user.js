const express = require("express");
const middlewareController = require("../app/controllers/middlewareController");
const router = express.Router();

const userController = require("../app/controllers/userController");

// Get all users
router.get("/", middlewareController.verifyToken, userController.getAllUser);

// Soft delete user
router.put("/softdelete/:id", userController.softDeleteUser);

// Delete user
router.delete(
    "/delete/:id",
    middlewareController.verifyTokenAndAdminAuth,
    userController.deleteUser
);

module.exports = router;
