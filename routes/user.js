import { Router } from "express";
import { courseModel, purchaseModel, userModel } from "../db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { z } from "zod";
import { JWT_USER_PASSWORD } from "../config.js";
import { userMiddleware } from "../middleware/user.js";

const userRouter = Router();

// ========================= SIGNUP =========================

userRouter.post("/signup", async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  // Zod validation schema
  const requiredBody = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(20),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
  });

  const parsedData = requiredBody.safeParse(req.body);

  if (!parsedData.success) {
    return res.status(400).json({ message: "Invalid format or missing fields" });
  }

  try {
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashPass = await bcrypt.hash(password, 10);

    await userModel.create({
      email,
      password: hashPass,
      firstName,
      lastName,
    });

    return res.status(201).json({ message: "Registration successful" });
  } catch (e) {
    console.error("Signup error:", e);
    return res.status(500).json({ message: "Error during registration" });
  }
});

// ========================= SIGNIN =========================

userRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(403).json({ message: "Incorrect credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(403).json({ message: "Incorrect credentials" });
    }

    const token = jwt.sign({ id: user._id }, JWT_USER_PASSWORD, { expiresIn: "1d" });

    return res.json({ token });
  } catch (error) {
    console.error("Signin error:", error);
    return res.status(500).json({ message: "Error during signin" });
  }
});

// ========================= GET PURCHASES =========================

userRouter.get("/purchases", userMiddleware, async (req, res) => {
  const userId = req.userId;

  try {
    const purchases = await purchaseModel.find({ userId });

    const courseIds = purchases.map(p => p.courseId);

    const courseData = await courseModel.find({ _id: { $in: courseIds } });

    return res.json({ purchases, courseData });
  } catch (e) {
    console.error("Error fetching purchases:", e);
    return res.status(500).json({ message: "Error retrieving purchases" });
  }
});

export default userRouter;
