const express = require("express");
const router = express.Router();
const authController = require("../app/controllers/authController");
const middlewareController = require("../app/controllers/middlewareController");

// sign up user
router.post("/register", authController.registerUser);

// login user
router.post("/login", authController.loginUser);

// refresh token
router.post("/refresh", authController.requestRefreshToken);

//logout user
router.post(
    "/logout",
    middlewareController.verifyToken, // phải login rồi thì mới có thể logout được
    authController.logoutUser
);

module.exports = router;
