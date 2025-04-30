import  JWT_USER_PASSWORD from "../config.js";
import jwt from "jsonwebtoken";
function userMiddleware(req, res, next){

    const token = req.headers.token
    const decode = jwt.verify(token, JWT_USER_PASSWORD);

    if(decode){
        req.userID = decode.id;
        next();
    }else{
        res.status(403).json({
            massage : "you are not signed in"
        })
    }


}

export {
    userMiddleware,
}