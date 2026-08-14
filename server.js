import express from "express";
import dotenv from "dotenv";
import router from "./routes/router.js";
import mongoose from "mongoose";
import cors from "cors"

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors())
app.use("/api", router);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error);
  });