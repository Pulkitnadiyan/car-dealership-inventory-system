import api from "../api/axios";

export const getVehicles = async () => {
    return api.get("/vehicles");
};

export const searchVehicles = async (params) => {
    return api.get("/vehicles/search", { params });
};

export const purchaseVehicle = async (id) => {
    return api.post(`/vehicles/${id}/purchase`);
};

export const createVehicle = async (vehicleData) => {
    return api.post("/vehicles", vehicleData);
};

export const updateVehicle = async (id, vehicleData) => {
    return api.put(`/vehicles/${id}`, vehicleData);
};

export const deleteVehicle = async (id) => {
    return api.delete(`/vehicles/${id}`);
};

export const restockVehicle = async (id, quantity) => {
    return api.post(`/vehicles/${id}/restock`, { quantity });
};
