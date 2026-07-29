const authService = require("../services/authService");

const register = async (req, res) => {

    try {

        await authService.register(req.body);

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
        });

    } catch (error) {

        if (error.message === "EMAIL_EXISTS") {
            return res.status(409).json({
                success: false,
                message: "Email already exists",
            });
        }

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });

    }

};

module.exports = {
    register,
};