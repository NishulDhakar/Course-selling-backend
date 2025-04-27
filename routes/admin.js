import { Router } from "express";

import{adminModel } from "../db.js"


const adminRouter = Router();
adminRouter.post("/signup", function(req, res) {
    res.json({
        message: "chal raha hai"
    });
});
adminRouter.post("/signin", function(req, res) {
    res.json({
        message: "chal raha hai"
    });
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