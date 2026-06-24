import express from "express";
import { requireAuth } from "../middleware/authMiddleware.js";
import { debate } from "../controllers/boardroomController.js";

const router = express.Router();

router.use(requireAuth);
router.post("/debate", debate);

export default router;
