const express = require("express");
const router = express.Router();

const controller = require("../controllers/vehicleController");



const { createVehicle } = controller;

router.post("/", createVehicle);

module.exports = router;