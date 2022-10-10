const express = require("express");
const router = express.Router();

const galeryController = require("../app/controllers/galeryController");

// Add new galery
router.post("/add", galeryController.addNewGalery);

// Get all galerys
router.get("/", galeryController.getAllGalery);

// Get detail one galery
router.get("/:id", galeryController.getOneGalery);

// Update galery
router.put("/update/:id", galeryController.updateGalery);

// Soft Delete galery
router.put("/softdelete/:id", galeryController.softDeleteGalery);

// Deleted product
router.delete("/delete/:id", galeryController.deleteGalery);

module.exports = router;
