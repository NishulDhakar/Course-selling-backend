import { Router } from "express";

const userRouter = Router();

userRouter.post("/signup", function(req, res) {
    res.json({
        message: "chal raha hai"
    });
});

userRouter.post("/signin", function(req, res) {
    res.json({
        message: "chal raha hai"
    });
});

userRouter.get("/purchases", function(req, res) {
    res.json({
        message: "chal raha hai"
    });
});

export default userRouter;