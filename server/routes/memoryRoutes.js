import express from "express";
import { requireAuth } from "../middleware/authMiddleware.js";
import { searchMemory } from "../controllers/memoryController.js";

const router = express.Router();

router.use(requireAuth);
router.get("/search", searchMemory);

export default router;
