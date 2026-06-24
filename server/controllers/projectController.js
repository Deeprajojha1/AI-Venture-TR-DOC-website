import Project from "../models/Project.js";
import Report from "../models/Report.js";
import { usingMemory } from "../config/db.js";
import { inMemoryStore } from "../services/inMemoryStore.js";
import { presentProject, newAgentRuns } from "../services/projectPresenter.js";
import { calculateStartupScore } from "../services/scoreService.js";
import { sendProjectEmail } from "../services/emailService.js";
import { runWorkflow } from "../workflows/agentWorkflow.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { requireFields } from "../utils/validation.js";

const getProjectOrFail = async (id, userId) => {
  const project = usingMemory()
    ? inMemoryStore.projects.find((item) => item.id === id && item.user === userId)
    : await Project.findOne({ _id: id, user: userId });
  if (!project) {
    const error = new Error("Project not found");
    error.statusCode = 404;
    throw error;
  }
  return project;
};

const getReports = async (projectId, userId) => usingMemory()
  ? inMemoryStore.reports.filter((report) => report.project === projectId && report.user === userId)
  : Report.find({ project: projectId, user: userId }).sort({ createdAt: 1 }).lean();

export const listProjects = asyncHandler(async (req, res) => {
  const projects = usingMemory()
    ? inMemoryStore.projects.filter((project) => project.user === req.user.id)
    : await Project.find({ user: req.user.id }).sort({ updatedAt: -1 });
  res.json({ success: true, projects: projects.map(presentProject) });
});

export const createProject = asyncHandler(async (req, res) => {
  const startupName = req.body.startupName || req.body.name;
  requireFields({ ...req.body, startupName }, ["startupName", "industry", "targetUsers", "country", "budget", "timeline", "idea"]);
  const projectData = {
    user: req.user.id,
    startupName,
    industry: req.body.industry,
    targetUsers: req.body.targetUsers,
    country: req.body.country,
    budget: req.body.budget,
    timeline: req.body.timeline,
    idea: req.body.idea,
    status: "Draft",
    agentRuns: newAgentRuns()
  };
  projectData.startupScore = calculateStartupScore(projectData);

  const project = usingMemory()
    ? { id: inMemoryStore.makeId("proj"), ...projectData, createdAt: inMemoryStore.now(), updatedAt: inMemoryStore.now() }
    : await Project.create(projectData);
  if (usingMemory()) inMemoryStore.projects.unshift(project);

  res.status(201).json({ success: true, project: presentProject(project) });
});

export const getProject = asyncHandler(async (req, res) => {
  const project = await getProjectOrFail(req.params.id, req.user.id);
  const reports = await getReports(req.params.id, req.user.id);
  res.json({ success: true, project: presentProject(project), reports });
});

export const runProject = asyncHandler(async (req, res) => {
  const project = await getProjectOrFail(req.params.id, req.user.id);
  const updated = await runWorkflow({ project, userId: req.user.id, mode: req.body.mode || "manual" });
  res.json({ success: true, project: presentProject(updated) });
});

export const approveAgent = asyncHandler(async (req, res) => {
  const project = await getProjectOrFail(req.params.id, req.user.id);
  const run = project.agentRuns.find((item) => item.key === req.params.agentKey);
  if (!run) {
    const error = new Error("Unknown agent key");
    error.statusCode = 404;
    throw error;
  }
  run.approved = true;
  if (usingMemory()) project.updatedAt = inMemoryStore.now();
  else await project.save();
  res.json({ success: true, project: presentProject(project) });
});

export const regenerateAgent = asyncHandler(async (req, res) => {
  const project = await getProjectOrFail(req.params.id, req.user.id);
  const run = project.agentRuns.find((item) => item.key === req.params.agentKey);
  if (!run) {
    const error = new Error("Unknown agent key");
    error.statusCode = 404;
    throw error;
  }
  if (run.status !== "completed") {
    const error = new Error("Cannot regenerate an agent before it has completed");
    error.statusCode = 409;
    throw error;
  }
  run.status = "pending";
  run.approved = false;
  const updated = await runWorkflow({ project, userId: req.user.id, agentKey: req.params.agentKey, force: true });
  res.json({ success: true, project: presentProject(updated) });
});

export const emailProject = asyncHandler(async (req, res) => {
  const project = await getProjectOrFail(req.params.id, req.user.id);
  const reports = await getReports(req.params.id, req.user.id);
  const status = await sendProjectEmail({ to: req.body.to || req.user.email, project, reports });
  res.json({ success: true, email: status });
});
