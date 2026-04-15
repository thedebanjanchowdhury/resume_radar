import express from "express";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import analyzeRoutes from "./routes/analyzeRoutes.js";

const app = express();
app.use(express.json());
connectDB();

app.use("/api/v1", authRoutes);
app.use("/api/v1", analyzeRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
