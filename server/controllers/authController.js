import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { usingMemory } from "../config/db.js";
import { inMemoryStore } from "../services/inMemoryStore.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { requireFields } from "../utils/validation.js";

const tokenFor = (user) => jwt.sign({ id: user.id || user._id.toString() }, process.env.JWT_SECRET || "dev-secret", { expiresIn: "7d" });
const publicUser = (user) => ({ id: user.id || user._id.toString(), name: user.name, email: user.email });
const authCookieName = "avs_token";
const authCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
  path: "/"
};

const sendSession = (res, statusCode, user) => {
  res
    .status(statusCode)
    .cookie(authCookieName, tokenFor(user), authCookieOptions)
    .json({ success: true, user: publicUser(user) });
};

export const register = asyncHandler(async (req, res) => {
  requireFields(req.body, ["name", "email", "password"]);
  const email = req.body.email.toLowerCase().trim();
  if (req.body.password.length < 8) {
    const error = new Error("Password must be at least 8 characters");
    error.statusCode = 400;
    throw error;
  }

  const existing = usingMemory()
    ? inMemoryStore.users.find((user) => user.email === email)
    : await User.findOne({ email });
  if (existing) {
    const error = new Error("Email already registered");
    error.statusCode = 409;
    throw error;
  }

  const passwordHash = await bcrypt.hash(req.body.password, 10);
  const user = usingMemory()
    ? {
        id: inMemoryStore.makeId("user"),
        name: req.body.name,
        email,
        passwordHash,
        createdAt: inMemoryStore.now(),
        updatedAt: inMemoryStore.now()
      }
    : await User.create({ name: req.body.name, email, passwordHash });

  if (usingMemory()) inMemoryStore.users.push(user);
  sendSession(res, 201, user);
});

export const login = asyncHandler(async (req, res) => {
  requireFields(req.body, ["email", "password"]);
  const email = req.body.email.toLowerCase().trim();
  const user = usingMemory()
    ? inMemoryStore.users.find((item) => item.email === email)
    : await User.findOne({ email });

  if (!user || !(await bcrypt.compare(req.body.password, user.passwordHash))) {
    const error = new Error("Invalid credentials");
    error.statusCode = 401;
    throw error;
  }

  sendSession(res, 200, user);
});

export const me = asyncHandler(async (req, res) => {
  res.json({ success: true, user: req.user });
});

export const logout = asyncHandler(async (_req, res) => {
  res
    .clearCookie(authCookieName, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      path: "/"
    })
    .json({ success: true });
});
