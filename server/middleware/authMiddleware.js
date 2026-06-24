import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { usingMemory } from "../config/db.js";
import { inMemoryStore } from "../services/inMemoryStore.js";

export const requireAuth = async (req, _res, next) => {
  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : null;
    if (!token) {
      const error = new Error("Authorization token required");
      error.statusCode = 401;
      throw error;
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET || "dev-secret");
    const user = usingMemory()
      ? inMemoryStore.users.find((item) => item.id === payload.id)
      : await User.findById(payload.id).lean();

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 401;
      throw error;
    }

    req.user = {
      id: user.id || user._id.toString(),
      name: user.name,
      email: user.email
    };
    next();
  } catch (error) {
    error.statusCode = error.statusCode || 401;
    next(error);
  }
};
