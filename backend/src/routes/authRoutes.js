const express = require("express");
const router = express.Router();

const { register } = require("../controllers/authController");
const { registerValidation } = require("../validators/authValidator");
const validate = require("../middlewares/validate");

router.post(
    "/register",
    registerValidation,
    validate,
    register
);

module.exports = router;