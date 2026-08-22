const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {

    try {

        const authHeader =
            req.headers.authorization;

        if (
            !authHeader ||
            !authHeader.startsWith("Bearer ")
        ) {
            return res.status(401).json({
                success: false,
                message: "Authentication required"
            });
        }

        const token =
            authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Invalid authentication token"
            });
        }

        const decoded =
            jwt.verify(
                token,
                process.env.JWT_SECRET
            );

        req.user = decoded;

        next();

    } catch (error) {

        console.error(
            "Auth Middleware Error:",
            error.message
        );

        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });

    }

};

module.exports = authMiddleware;