const register = (req, res) => {
    return res.status(201).json({
        success: true,
        message: "User registered successfully",
    });
};

module.exports = {
    register,
};