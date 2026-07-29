const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {

    const header = req.headers.authorization;

    if (!header) {
        return res.status(401).json({
            success: false,
            message: "Access denied"
        });
    }

    const token = header.split(" ")[1];

    try {

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded;

        next();

    } catch {

        return res.status(401).json({
            success: false,
            message: "Invalid token"
        });

    }

};

module.exports = authenticate;