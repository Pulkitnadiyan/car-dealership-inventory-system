const bcrypt = require("bcrypt");
const authRepository = require("../repositories/authRepository");

const register = async (userData) => {

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    return authRepository.createUser({
        ...userData,
        password: hashedPassword
    });
};

module.exports = {
    register
};