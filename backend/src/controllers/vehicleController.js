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


const getAllVehicles = async (req, res) => {

    try {

        const vehicles = await vehicleService.getAllVehicles();

        return res.status(200).json(vehicles);

    } catch {

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};
const searchVehicles = async (req, res) => {

    try {

        const vehicles = await vehicleService.searchVehicles(req.query);

        return res.status(200).json(vehicles);

    } catch {

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};
const updateVehicle = async (req, res) => {

    try {

        const vehicle = await vehicleService.updateVehicle(
            req.params.id,
            req.body
        );

        return res.status(200).json(vehicle);

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};
const deleteVehicle = async (req, res) => {

    try {

        await vehicleService.deleteVehicle(req.params.id);

        return res.status(200).json({
            success: true,
            message: "Vehicle deleted successfully"
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};
const purchaseVehicle = async (req, res) => {

    try {

        const vehicle = await vehicleService.purchaseVehicle(
            req.params.id
        );

        return res.status(200).json(vehicle);

    } catch (error) {

        if (error.message === "OUT_OF_STOCK") {
            return res.status(400).json({
                success: false,
                message: "Vehicle is out of stock"
            });
        }

        if (error.message === "VEHICLE_NOT_FOUND") {
            return res.status(404).json({
                success: false,
                message: "Vehicle not found"
            });
        }

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};

module.exports = {
    createVehicle, getAllVehicles, searchVehicles, updateVehicle, deleteVehicle, purchaseVehicle
};