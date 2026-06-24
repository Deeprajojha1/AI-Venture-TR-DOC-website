import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { connectDatabase } from "../config/db.js";
import { inMemoryStore } from "../services/inMemoryStore.js";
import authRoutes from "../routes/authRoutes.js";
import projectRoutes from "../routes/projectRoutes.js";
import exportRoutes from "../routes/exportRoutes.js";
import boardroomRoutes from "../routes/boardroomRoutes.js";
import memoryRoutes from "../routes/memoryRoutes.js";
import analyticsRoutes from "../routes/analyticsRoutes.js";
import { notFound, errorHandler } from "../middleware/errorMiddleware.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.CLIENT_ORIGIN?.split(",") || "*",
  credentials: true
}));
app.use(express.json({ limit: "2mb" }));

app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    service: "AI Venture Studio",
    ollamaModel: process.env.OLLAMA_MODEL || "llama3",
    mode: inMemoryStore.isActive ? "memory" : "mongodb"
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/exports", exportRoutes);
app.use("/api/boardroom", boardroomRoutes);
app.use("/api/memory", memoryRoutes);
app.use("/api/analytics", analyticsRoutes);

app.use(notFound);
app.use(errorHandler);

const start = async () => {
  console.log("Starting AI Venture Studio API...");
  await connectDatabase();
  if (inMemoryStore.isActive) {
    await inMemoryStore.seed();
  }

  app.listen(port, () => {
    console.log(`AI Venture Studio API listening on http://localhost:${port}`);
  });
};

start().catch(async (error) => {
  console.error("Startup failed, enabling in-memory fallback:", error.message);
  inMemoryStore.enable();
  await inMemoryStore.seed();
  app.listen(port, () => {
    console.log(`AI Venture Studio API listening in memory mode on http://localhost:${port}`);
  });
});
