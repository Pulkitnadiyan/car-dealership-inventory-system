const express = require("express");
const router = express.Router();

const controller = require("../controllers/vehicleController");



const { createVehicle, getAllVehicles, searchVehicles, updateVehicle, deleteVehicle } = controller;

router.post("/", createVehicle);
router.get("/", getAllVehicles);
router.get("/search", searchVehicles);
router.put("/:id", updateVehicle);
router.delete("/:id", deleteVehicle);

module.exports = router;