import { Router } from "express";
import { courseModel, purchaseModel } from "../db.js";
import { userMiddleware } from "../middleware/user.js";


const courseRouter = Router();
courseRouter.post("/purchases", userMiddleware, async function(req, res) {
    const userId = req.userId;
    const courseId = req.body.courseId;
    
    try {
        // Validate courseId exists
        const courseExists = await courseModel.findById(courseId);
        if (!courseExists) {
            return res.status(404).json({
                message: "Course not found"
            });
        }
        
        // Check if already purchased
        const alreadyPurchased = await purchaseModel.findOne({
            userId,
            courseId
        });
        
        if (alreadyPurchased) {
            return res.status(409).json({
                message: "Course already purchased"
            });
        }
        
        // Create purchase
        await purchaseModel.create({
            userId,
            courseId
        });
        
        res.status(201).json({
            message: "Course purchased successfully"
        });
    } catch (error) {
        console.error("Purchase error:", error);
        res.status(500).json({
            message: "Error processing purchase"
        });
    }
});

courseRouter.get("/preview" ,userMiddleware, async function(req , res){

    const courses = await courseModel.find({});

    res.json({
        courses
    })
})


export default courseRouter;