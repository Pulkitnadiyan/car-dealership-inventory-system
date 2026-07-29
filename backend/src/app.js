const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const vehicleRoutes = require("./routes/vehicleRoutes");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Car Dealership API Running",
    });
});


app.use("/api/vehicles", vehicleRoutes);
app.use("/api/auth", authRoutes);

module.exports = app;