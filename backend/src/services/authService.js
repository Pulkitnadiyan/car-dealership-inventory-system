const authRepository = require("../repositories/authRepository");

const register = async (userData) => {
    return await authRepository.createUser(userData);
};

module.exports = {
    register,
};