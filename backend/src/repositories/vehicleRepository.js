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
const purchaseVehicle = async (id) => {

    const vehicle = await prisma.vehicle.findUnique({
        where: {
            id: Number(id)
        }
    });

    if (!vehicle) {
        throw new Error("VEHICLE_NOT_FOUND");
    }

    if (vehicle.quantity <= 0) {
        throw new Error("OUT_OF_STOCK");
    }

    return prisma.vehicle.update({
        where: {
            id: Number(id)
        },
        data: {
            quantity: vehicle.quantity - 1
        }
    });

};
const restockVehicle = async (id, quantity) => {

    const vehicle = await prisma.vehicle.update({
        where: {
            id: Number(id)
        },
        data: {
            quantity: {
                increment: quantity
            }
        }
    });

    return vehicle;
};
module.exports = {
    createVehicle, getAllVehicles, searchVehicles, updateVehicle, deleteVehicle, purchaseVehicle, restockVehicle
};