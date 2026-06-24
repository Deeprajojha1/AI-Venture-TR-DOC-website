import express from "express";
import { requireAuth } from "../middleware/authMiddleware.js";
import { exportJson, exportMarkdown, exportPdf } from "../controllers/exportController.js";

const router = express.Router();

router.use(requireAuth);
router.get("/:id/json", exportJson);
router.get("/:id/markdown", exportMarkdown);
router.get("/:id/pdf", exportPdf);

export default router;
