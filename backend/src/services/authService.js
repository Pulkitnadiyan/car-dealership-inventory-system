const bcrypt = require("bcrypt");
const authRepository = require("../repositories/authRepository");

const register = async (userData) => {

    const existingUser = await authRepository.findUserByEmail(
        userData.email
    );

    if (existingUser) {
        throw new Error("EMAIL_EXISTS");
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    return authRepository.createUser({
        ...userData,
        password: hashedPassword,
    });
};

module.exports = {
    register,
};