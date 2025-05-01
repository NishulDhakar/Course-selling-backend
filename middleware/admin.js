import { JWT_ADMIN_PASSWORD } from "../config.js";
import jwt from "jsonwebtoken";

function adminMiddleware(req, res, next) {
    // Use standard 'Authorization' header with 'Bearer <token>' format
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            message: "Authorization token missing or malformed"
        });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, JWT_ADMIN_PASSWORD);
        req.userId = decoded.id; // consistent naming
        next();
    } catch (error) {
        return res.status(403).json({
            message: "Invalid or expired token"
        });
    }
}

export { adminMiddleware };
