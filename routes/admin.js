import { Router } from "express";
import{adminModel } from "../db.js"
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
import { string, z } from "zod";


const JWT_ADMIN_PASSWORD = "Nishul123"

const adminRouter = Router();
adminRouter.post("/signup", async function(req, res) {

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
            const existingAdmin = await adminModel.findOne({
                email
            });
    
            if(existingAdmin){
                return res.status(409).json({
                    message : "Admin exist alredy"
                });
            }
            const hashPass = await bcrypt.hash(password ,5)
            await adminModel.create({
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
                message: "Admin already exists"
            });
        }
        
        console.error("Signup error:", e);
        return res.status(500).json({
            message: "Error during registration"
        });
    }
});

adminRouter.post("/signin", async function(req, res) {

    const {email , password} = req.body;

    const admin = await adminModel.findOne({
        email : email,
        password : password
    });

    if(admin) {

        const token = jwt.sign({
            id : admin._id
        }, JWT_ADMIN_PASSWORD);

        res.json({
            token : token
        });

    }else{
        res.status(403).json({
            message: "incorrect creadntials"
        });
    }
});
adminRouter.post("/course", function(req, res) {
    res.json({
        message: "chal raha hai"
    });
});
adminRouter.put("/course", function(req, res) {
    res.json({
        message: "chal raha hai"
    });
});
adminRouter.get("/course/bulk", function(req, res) {
    res.json({
        message: "chal raha hai"
    });
});

export default adminRouter