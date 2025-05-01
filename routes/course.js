import { Router } from "express";
import { courseModel, purchaseModel } from "../db.js";
import { userMiddleware } from "../middleware/user.js";
const courseRouter = Router();
courseRouter.post("/purchases" ,userMiddleware, async function(req , res){

    const userId = req.userId;
    const courseId = req.body.courseId;

    await purchaseModel.create({
        userId,
        courseId
    })

    res.json({
        message : "Bought course"
    })
})
courseRouter.get("/preview" ,userMiddleware, async function(req , res){

    const courses = await courseModel.find({});

    res.json({
        courses
    })
})
export default courseRouter;