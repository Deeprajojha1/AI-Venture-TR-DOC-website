import Project from "../models/Project.js";
import { usingMemory } from "../config/db.js";
import { inMemoryStore } from "../services/inMemoryStore.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getAnalytics = asyncHandler(async (req, res) => {
  const projects = usingMemory()
    ? inMemoryStore.projects.filter((project) => project.user === req.user.id)
    : await Project.find({ user: req.user.id }).lean();

  const runs = projects.flatMap((project) => project.agentRuns || []);
  const completed = runs.filter((run) => run.status === "completed");
  const agentUsage = runs.reduce((acc, run) => {
    acc[run.name] = (acc[run.name] || 0) + (run.status === "completed" ? 1 : 0);
    return acc;
  }, {});
  const mostUsedAgent = Object.entries(agentUsage).sort((a, b) => b[1] - a[1])[0]?.[0] || "None";
  const averageRuntime = completed.length
    ? Math.round(completed.reduce((sum, run) => sum + (run.runtime || 0), 0) / completed.length)
    : 0;
  const tokenUsage = completed.reduce((sum, run) => sum + (run.tokenUsage || 0), 0);
  const completionRate = runs.length ? Math.round((completed.length / runs.length) * 1000) / 10 : 0;

  res.json({
    success: true,
    averageRuntime,
    completionRate,
    tokenUsage,
    mostUsedAgent,
    agentUsage
  });
});
