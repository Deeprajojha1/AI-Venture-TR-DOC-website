import mongoose from "mongoose";
import { inMemoryStore } from "../services/inMemoryStore.js";

export const connectDatabase = async () => {
  if (process.env.MEMORY_STORE === "true") {
    console.log("MEMORY_STORE=true. Using in-memory fallback mode.");
    inMemoryStore.enable();
    return false;
  }

  if (!process.env.MONGODB_URI) {
    console.log("MONGODB_URI missing. Using in-memory fallback mode.");
    inMemoryStore.enable();
    return false;
  }

  try {
    const timeoutMs = Number(process.env.MONGODB_CONNECT_TIMEOUT_MS || 3000);
    await Promise.race([
      mongoose.connect(process.env.MONGODB_URI, {
        serverSelectionTimeoutMS: timeoutMs,
        connectTimeoutMS: timeoutMs,
        socketTimeoutMS: timeoutMs,
        family: 4
      }),
      new Promise((_resolve, reject) => {
        setTimeout(() => reject(new Error(`MongoDB connection timed out after ${timeoutMs}ms`)), timeoutMs + 500);
      })
    ]);
    console.log("MongoDB connected");
    return true;
  } catch (error) {
    console.log(`MongoDB unavailable (${error.message}). Using in-memory fallback mode.`);
    inMemoryStore.enable();
    return false;
  }
};

export const usingMemory = () => inMemoryStore.isActive;
