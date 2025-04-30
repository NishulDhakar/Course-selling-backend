import express from "express";
// import jwt from "jsonwebtoken";
import userRouter from "./routes/user.js"
import courseRouter from "./routes/course.js"
import adminRouter from "./routes/admin.js"
import mongoose from "mongoose";

const app = express();

app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/course", courseRouter);


async function main() {

    mongoose.connect("mongodb+srv://NishulDhakar:Ram1234@cluster0.worc1jg.mongodb.net/coursera-web")
    app.listen(3001 , ()=>{
        console.log("running");
    })
}

main();

