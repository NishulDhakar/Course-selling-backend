import { Router } from "express";
const adminRouter = Router();
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
userRouter.post("/course", function(req, res) {
    res.json({
        message: "chal raha hai"
    });
});
userRouter.put("/course", function(req, res) {
    res.json({
        message: "chal raha hai"
    });
});
userRouter.get("/course/bulk", function(req, res) {
    res.json({
        message: "chal raha hai"
    });
});

export default adminRouter