import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
  user_token: String,
  name: String,
  email: String,
  phone: String,
  skills: [String],
  experience: [
    { company: String, role: String, duration: String, description: String },
  ],
  education: [{ institution: String, degree: String, duration: String }],
  rawText: String,
});

export default mongoose.model("Resume", resumeSchema);
