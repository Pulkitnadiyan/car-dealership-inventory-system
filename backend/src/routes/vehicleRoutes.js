const express = require("express");
const router = express.Router();

const controller = require("../controllers/vehicleController");



const { createVehicle, getAllVehicles, searchVehicles, updateVehicle } = controller;

router.post("/", createVehicle);
router.get("/", getAllVehicles);
router.get("/search", searchVehicles);
router.put("/:id", updateVehicle);

module.exports = router;