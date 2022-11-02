const express = require("express");
const router = express.Router();
const authController = require("../app/controllers/authController");

// sign up user
router.post("/register", authController.registerUser);

// login user
router.post("/login", authController.loginUser);

module.exports = router;
