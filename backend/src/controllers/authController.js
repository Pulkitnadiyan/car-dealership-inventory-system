const authService = require("../services/authService");

const register = async (req, res) => {
    await authService.register(req.body);

    return res.status(201).json({
        success: true,
        message: "User registered successfully",
    });
};

module.exports = {
    register,
};