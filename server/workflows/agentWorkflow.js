import Project from "../models/Project.js";
import Report from "../models/Report.js";
import { usingMemory } from "../config/db.js";
import { inMemoryStore } from "../services/inMemoryStore.js";
import { agentDefinitions, getAgentDefinition } from "../agents/agentDefinitions.js";
import { generateReport } from "../services/llmService.js";
import { calculateStartupScore } from "../services/scoreService.js";

const idOf = (value) => value?._id?.toString?.() || value?.id || value?.toString?.() || value;

const getReports = async (projectId, userId) => {
  if (usingMemory()) {
    return inMemoryStore.reports.filter((report) => report.project === projectId && report.user === userId);
  }
  return Report.find({ project: projectId, user: userId }).sort({ createdAt: 1 }).lean();
};

const saveReport = async ({ userId, projectId, agent, content }) => {
  if (usingMemory()) {
    const existing = inMemoryStore.reports.find((report) => (
      report.user === userId && report.project === projectId && report.agentKey === agent.key
    ));
    if (existing) {
      existing.content = content;
      existing.updatedAt = inMemoryStore.now();
      return existing;
    }
    const report = {
      id: inMemoryStore.makeId("report"),
      user: userId,
      project: projectId,
      agentKey: agent.key,
      outputFile: agent.outputFile,
      content,
      embeddingReference: `${projectId}:${agent.key}`,
      createdAt: inMemoryStore.now(),
      updatedAt: inMemoryStore.now()
    };
    inMemoryStore.reports.push(report);
    return report;
  }

  return Report.findOneAndUpdate(
    { user: userId, project: projectId, agentKey: agent.key },
    {
      user: userId,
      project: projectId,
      agentKey: agent.key,
      outputFile: agent.outputFile,
      content,
      embeddingReference: `${projectId}:${agent.key}`
    },
    { new: true, upsert: true }
  );
};

const persistProject = async (project) => {
  if (usingMemory()) {
    project.updatedAt = inMemoryStore.now();
    return project;
  }
  await project.save();
  return project;
};

export const runWorkflow = async ({ project, userId, mode = "manual", agentKey = null, force = false }) => {
  const raw = project.toObject ? project.toObject() : project;
  const projectId = idOf(raw);
  const mutableProject = project;
  const reports = await getReports(projectId, userId);

  const runOne = async (index) => {
    const run = mutableProject.agentRuns[index];
    const agent = getAgentDefinition(run.key);
    run.status = "running";
    run.error = undefined;
    await persistProject(mutableProject);

    try {
      const result = await generateReport({ agent, project: raw, previousReports: reports });
      const report = await saveReport({ userId, projectId, agent, content: result.content });
      reports.push(report);
      run.status = "completed";
      run.report = idOf(report);
      run.runtime = result.runtime;
      run.tokenUsage = result.tokenUsage;
      run.outputFile = agent.outputFile;
      mutableProject.status = index === agentDefinitions.length - 1 ? "Completed" : "Active";
      mutableProject.startupScore = calculateStartupScore(raw, reports);
      await persistProject(mutableProject);
    } catch (error) {
      run.status = "failed";
      run.error = error.message;
      mutableProject.status = "Error";
      await persistProject(mutableProject);
      throw error;
    }
  };

  if (agentKey) {
    const requestedIndex = mutableProject.agentRuns.findIndex((run) => run.key === agentKey);
    if (requestedIndex === -1) {
      const error = new Error("Unknown agent key");
      error.statusCode = 404;
      throw error;
    }
    const firstIncomplete = mutableProject.agentRuns.findIndex((run) => run.status !== "completed");
    if (!force && requestedIndex !== firstIncomplete) {
      const error = new Error("Agents must run sequentially; previous agents must complete first");
      error.statusCode = 409;
      throw error;
    }
    await runOne(requestedIndex);
    return mutableProject;
  }

  const startIndex = mutableProject.agentRuns.findIndex((run) => run.status !== "completed");
  if (startIndex === -1) return mutableProject;

  if (mode === "auto") {
    for (let index = startIndex; index < mutableProject.agentRuns.length; index += 1) {
      await runOne(index);
    }
    return mutableProject;
  }

  await runOne(startIndex);
  return mutableProject;
};
