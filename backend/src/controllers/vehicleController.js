const vehicleService = require("../services/vehicleService");

const createVehicle = async (req, res) => {

    try {

        await vehicleService.createVehicle(req.body);

        return res.status(201).json({
            success: true,
            message: "Vehicle created successfully"
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};

module.exports = {
    createVehicle
};