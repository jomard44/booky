import express from "express";
import authRouter from "./authRouter.js";
import profileRouter from "./profileRouter.js";
const router = express.Router();

router.use("/auth", authRouter);
router.use("/profile", profileRouter)

export default router;
