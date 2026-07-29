const prisma = require("../config/prisma");

const createVehicle = async (vehicleData) => {
    return prisma.vehicle.create({
        data: vehicleData
    });
};
const getAllVehicles = async () => {
    return prisma.vehicle.findMany();
};
const searchVehicles = async (filters) => {
    return prisma.vehicle.findMany({
        where: filters
    });
};

module.exports = {
    createVehicle, getAllVehicles, searchVehicles
};