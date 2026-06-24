import Project from "../models/Project.js";
import Report from "../models/Report.js";
import { usingMemory } from "../config/db.js";
import { inMemoryStore } from "../services/inMemoryStore.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const scoreText = (text, q) => {
  const lower = String(text || "").toLowerCase();
  return q.split(/\s+/).filter(Boolean).reduce((score, word) => score + (lower.includes(word) ? 1 : 0), 0);
};

export const searchMemory = asyncHandler(async (req, res) => {
  const q = String(req.query.q || "").toLowerCase().trim();
  if (!q) return res.json({ success: true, matches: [] });

  const projects = usingMemory()
    ? inMemoryStore.projects.filter((project) => project.user === req.user.id)
    : await Project.find({ user: req.user.id }).lean();
  const reports = usingMemory()
    ? inMemoryStore.reports.filter((report) => report.user === req.user.id)
    : await Report.find({ user: req.user.id }).lean();

  const matches = [
    ...projects.map((project) => ({
      type: "project",
      id: project.id || project._id.toString(),
      title: project.startupName,
      snippet: project.idea,
      score: scoreText(`${project.startupName} ${project.industry} ${project.idea}`, q)
    })),
    ...reports.map((report) => ({
      type: "report",
      id: report.id || report._id.toString(),
      title: report.outputFile,
      snippet: report.content.slice(0, 240),
      score: scoreText(`${report.outputFile} ${report.content}`, q)
    }))
  ].filter((match) => match.score > 0).sort((a, b) => b.score - a.score);

  res.json({ success: true, matches });
});
