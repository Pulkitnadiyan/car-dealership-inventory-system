const express = require("express");
const router = express.Router();

const controller = require("../controllers/vehicleController");



const { createVehicle, getAllVehicles, searchVehicles, updateVehicle, deleteVehicle } = controller;

const authenticate = require("../middlewares/authMiddleware");
router.post("/", authenticate, createVehicle);
router.get("/", getAllVehicles);
router.get("/search", searchVehicles);
router.put("/:id", authenticate, updateVehicle);
router.delete("/:id", authenticate, deleteVehicle);

module.exports = router;