import express from "express";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import analyzeRoutes from "./routes/analyzeRoutes.js";

const app = express();
app.use(express.json());
connectDB();

app.use("/api/v1", authRoutes);
app.use("/api/v1", analyzeRoutes);

module.exports = app;
