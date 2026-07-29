const express = require("express");
const router = express.Router();

const controller = require("../controllers/vehicleController");

const authorizeAdmin = require("../middlewares/adminMiddleware");

const { createVehicle, getAllVehicles, searchVehicles, updateVehicle, deleteVehicle, purchaseVehicle, restockVehicle } = controller;

const authenticate = require("../middlewares/authMiddleware");
router.post("/", authenticate, createVehicle);
router.get("/", getAllVehicles);
router.get("/search", searchVehicles);
router.put("/:id", authenticate, updateVehicle);
router.delete("/:id", authenticate, authorizeAdmin, deleteVehicle);
router.post("/:id/purchase", authenticate, purchaseVehicle);
router.post("/:id/restock", authenticate, authorizeAdmin, restockVehicle);
module.exports = router;