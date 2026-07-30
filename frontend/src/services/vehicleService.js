import api from "../api/axios";

export const getVehicles = async () => {
    return api.get("/vehicles");
};
