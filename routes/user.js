import { Router } from "express";
import{userModel } from "../db.js"
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
import { string, z } from "zod";
import  JWT_USER_PASSWORD from "../config.js";


const userRouter = Router();

userRouter.post("/signup",async function(req, res) {

    const { email , password , firstName , lastName} = req.body;
     // add zode validation

     const requiredBody = z.object({
        email : z.string(),
        password : z.string().min(6).max(20)
     })

     const parsedDataSuccess = requiredBody.safeParse(req.body);

     if(!parsedDataSuccess){

        res.json({
             message : "invalid fortmat"
        })
     }

    try{
        const existingUser = await userModel.findOne({
            email
        });

        if(existingUser){
            return res.status(409).json({
                message : "user exist alredy"
            });
        }
        const hashPass = await bcrypt.hash(password ,5)
        await userModel.create({
        email, 
        password : hashPass,
        firstName, 
        lastName
    });

    return res.status(201).json({
        message: "Registration successful"
    });

}catch(e){
    if (e.code === 11000) {
        return res.status(409).json({
            message: "User already exists"
        });
    }
    
    console.error("Signup error:", e);
    return res.status(500).json({
        message: "Error during registration"
    });
}

});

userRouter.post("/signin", async function(req, res) {

    const {email , password} = req.body;

    const user = await userModel.findOne({
        email : email,
        password : password
    });

    if(user) {

        const token = jwt.sign({
            id : user._id
        }, JWT_USER_PASSWORD);

        res.json({
            token : token
        });

    }else{
        res.status(403).json({
            message: "incorrect creadntials"
        });
    }
    
});

userRouter.get("/purchases", function(req, res) {
    res.json({
        message: "chal raha hai"
    });
});

export default userRouter;