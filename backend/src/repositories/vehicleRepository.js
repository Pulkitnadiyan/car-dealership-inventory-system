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
const updateVehicle = async (id, vehicleData) => {
    return prisma.vehicle.update({
        where: {
            id: Number(id)
        },
        data: vehicleData
    });
};
const deleteVehicle = async (id) => {
    return prisma.vehicle.delete({
        where: {
            id: Number(id)
        }
    });
};

module.exports = {
    createVehicle, getAllVehicles, searchVehicles, updateVehicle, deleteVehicle
};