const vehicleRepository = require("../repositories/vehicleRepository");

const createVehicle = async (vehicleData) => {
    return vehicleRepository.createVehicle(vehicleData);
};
const getAllVehicles = async () => {
    return vehicleRepository.getAllVehicles();
};

module.exports = {
    createVehicle,
    getAllVehicles
};