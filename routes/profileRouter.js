import express from "express";
import { createProfile, updateProfile } from "../controllers/profileController.js";

const profileRouter = express.Router();

profileRouter.post("/create", createProfile);
profileRouter.put("/update/:id", updateProfile);

export default profileRouter;
