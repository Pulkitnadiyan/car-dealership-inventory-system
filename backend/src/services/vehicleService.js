const vehicleRepository = require("../repositories/vehicleRepository");

const createVehicle = async (vehicleData) => {
    return vehicleRepository.createVehicle(vehicleData);
};

module.exports = {
    createVehicle
};