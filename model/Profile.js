import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  banner: {
    type: String,
  },
  profilePhoto: {
    type: String,
  },
  businessName: {
    type: String,
    required: true,
  },
  services: {
    type: [String],
  },
});

export default mongoose.model("Profile", profileSchema);
