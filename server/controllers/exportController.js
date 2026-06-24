import Project from "../models/Project.js";
import Report from "../models/Report.js";
import { usingMemory } from "../config/db.js";
import { inMemoryStore } from "../services/inMemoryStore.js";
import { buildJsonBundle, buildMarkdownBundle, streamPdfBundle } from "../services/exportService.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const bundle = async (projectId, userId) => {
  const project = usingMemory()
    ? inMemoryStore.projects.find((item) => item.id === projectId && item.user === userId)
    : await Project.findOne({ _id: projectId, user: userId }).lean();
  if (!project) {
    const error = new Error("Project not found");
    error.statusCode = 404;
    throw error;
  }
  const reports = usingMemory()
    ? inMemoryStore.reports.filter((report) => report.project === projectId && report.user === userId)
    : await Report.find({ project: projectId, user: userId }).sort({ createdAt: 1 }).lean();
  return { project, reports };
};

export const exportJson = asyncHandler(async (req, res) => {
  const data = await bundle(req.params.id, req.user.id);
  res.json(buildJsonBundle(data.project, data.reports));
});

export const exportMarkdown = asyncHandler(async (req, res) => {
  const data = await bundle(req.params.id, req.user.id);
  res.setHeader("Content-Type", "text/markdown; charset=utf-8");
  res.send(buildMarkdownBundle(data.project, data.reports));
});

export const exportPdf = asyncHandler(async (req, res) => {
  const data = await bundle(req.params.id, req.user.id);
  streamPdfBundle(res, data.project, data.reports);
});
