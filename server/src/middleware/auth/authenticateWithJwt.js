//server/src/middleware/AuthenticateWithJwt.js

require("dotenv").config();
const jwt = require("jsonwebtoken");

const authenticateWithJwt = (req, res, next) => {
    // Bearer token from Authorization header
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);

        // Add decoded user info to request
        req.user = user;
        next();
    } catch (err) {
        console.log(
            `JWT verification failed at URL ${req.url}`,
            err.name,
            err.message
        );
        return res.status(401).json({ error: "Invalid token" });
    }
};

module.exports = authenticateWithJwt;