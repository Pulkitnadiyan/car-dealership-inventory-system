const vehicleRepository = require("../repositories/vehicleRepository");

const createVehicle = async (vehicleData) => {
    return vehicleRepository.createVehicle(vehicleData);
};
const getAllVehicles = async () => {
    return vehicleRepository.getAllVehicles();
};

const searchVehicles = async (query) => {

    const filters = {};

    if (query.make) {
        filters.make = query.make;
    }

    if (query.model) {
        filters.model = query.model;
    }

    if (query.category) {
        filters.category = query.category;
    }

    return vehicleRepository.searchVehicles(filters);

};
const updateVehicle = async (id, vehicleData) => {
    return vehicleRepository.updateVehicle(id, vehicleData);
};
module.exports = {
    createVehicle,
    getAllVehicles,
    searchVehicles,
    updateVehicle
};