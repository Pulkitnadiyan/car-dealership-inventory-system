const express = require("express");
const router = express.Router();

const controller = require("../controllers/vehicleController");



const { createVehicle, getAllVehicles } = controller;

router.post("/", createVehicle);
router.get("/", getAllVehicles);

module.exports = router;