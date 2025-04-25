import express from "express";
// import jwt from "jsonwebtoken";
// import mongoose from "mongoose";
import userRouter from "./routes/user.js"
import courseRouter from "./routes/course.js"
import adminRouter from "./routes/admin.js"

const app = express();

app.use("/api/v1/user", userRouter);
app.use("/api/v1/course", adminRouter);
app.use("/api/v1/course", courseRouter);


app.listen(3001 , ()=>{
    console.log("running");
})