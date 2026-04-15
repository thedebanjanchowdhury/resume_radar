import User from "../models/User.js";

export const apiMiddleware = async (req, res, next) => {
  try {
    const apiKey = req.headers["x-api-key"];
    if (!apiKey)
      return res.status(401).json({ message: "Please provide Token!" });

    const user = await User.find({ apiKey: apiKey });
    if (!user) return res.status(404).json({ message: "User not found!" });
    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ message: "Middleware Error: ", error });
  }
};
