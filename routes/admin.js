import { Router } from "express";
import { adminModel, courseModel } from "../db.js"
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
import { string, z } from "zod";
import { JWT_ADMIN_PASSWORD } from "../config.js";
import { adminMiddleware } from "../middleware/admin.js";

const adminRouter = Router();

adminRouter.post("/signup", async function(req, res) {

        const { email , password , firstName , lastName} = req.body;
    
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
    const { email, password } = req.body;

    try {
        // Find admin by email only
        const admin = await adminModel.findOne({ email });

        // If admin doesn't exist
        if (!admin) {
            return res.status(403).json({
                message: "Incorrect credentials"
            });
        }

        // Compare password with stored hash
        const passwordMatch = await bcrypt.compare(password, admin.password);
        
        if (passwordMatch) {
            // Generate token
            const token = jwt.sign({
                id: admin._id
            }, JWT_ADMIN_PASSWORD);

            return res.json({
                token: token
            });
        } else {
            return res.status(403).json({
                message: "Incorrect credentials"
            });
        }
    } catch (error) {
        console.error("Signin error:", error);
        return res.status(500).json({
            message: "Error during signin"
        });
    }
});

adminRouter.post("/course", adminMiddleware , async function(req, res) {

    const adminId = req.userId;

    const {title , description , price , imageUrl }  = req.body;
    

    const course = await courseModel.create({

        title , description , price , imageUrl, creatorId : adminId

    })


    res.json({
        message: "course created",
        courseId : course._id
    });
});

adminRouter.put("/course",adminMiddleware , async function(req, res) {

        const adminId = req.userId;
    
        const {title , description , price , imageUrl , courseId}  = req.body;
        
    
        const course = await courseModel.updateOne({

            _id : courseId,
            creatorId : adminId
    
        }, {title , description , price , imageUrl
    
        })
        res.json({
            message: "course updated",
            courseId : course._id
        });
});

adminRouter.get("/course/bulk", adminMiddleware, async function(req, res) {
    const adminId = req.userId;
    
    try {
        const courses = await courseModel.find({
            creatorId: adminId
        });
        
        res.json({
            message: "Courses retrieved successfully",
            courses
        });
    } catch (error) {
        console.error("Error fetching courses:", error);
        res.status(500).json({
            message: "Error retrieving courses"
        });
    }
});

export default adminRouter