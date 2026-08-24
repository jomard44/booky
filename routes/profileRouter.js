import express from "express";
import {
  createProfile,
  updateProfile,
  getProfile,
} from "../controllers/profileController.js";

const profileRouter = express.Router();
profileRouter.get("/:id", getProfile);
profileRouter.post("/create", createProfile);
profileRouter.put("/update/:id", updateProfile);

export default profileRouter;
