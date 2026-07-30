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
