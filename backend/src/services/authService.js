const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authRepository = require("../repositories/authRepository");

const register = async (userData) => {

    const existingUser = await authRepository.findUserByEmail(userData.email);

    if (existingUser) {
        throw new Error("EMAIL_EXISTS");
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    return authRepository.createUser({
        ...userData,
        password: hashedPassword
    });
};

const login = async (email, password) => {

    const user = await authRepository.findUserByEmail(email);

    if (!user) {
        throw new Error("INVALID_CREDENTIALS");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error("INVALID_CREDENTIALS");
    }

    return jwt.sign(
        {
            id: user.id,
            role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d"
        }
    );
};

module.exports = {
    register,
    login
};