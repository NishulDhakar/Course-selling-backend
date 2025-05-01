import { JWT_USER_PASSWORD } from "../config.js";
import jwt from "jsonwebtoken";

function userMiddleware(req, res, next) {
    const token = req.headers.token;
    
    if (!token) {
        return res.status(401).json({
            message: "No authentication token provided"
        });
    }
    
    try {
        const decoded = jwt.verify(token, JWT_USER_PASSWORD);
        
        if (decoded) {
            req.userId = decoded.id; // Changed userID to userId for consistency
            next();
        } else {
            res.status(403).json({
                message: "You are not authenticated"
            });
        }
    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
}

export { userMiddleware };