
import { Router } from "express";

const courseRouter = Router();

courseRouter.post("/purchase" , function(req , res){

    //expect user pay money

    
})

courseRouter.get("/preview" , function(req , res){

    res.json({
        message : "chal raha hai"
    })


    
})


export default courseRouter;