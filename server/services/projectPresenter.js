import { agentDefinitions } from "../agents/agentDefinitions.js";

const idOf = (value) => value?._id?.toString?.() || value?.id || value?.toString?.() || value;

export const presentProject = (project) => {
  const raw = project.toObject ? project.toObject() : project;
  const completedAgentIndexes = raw.agentRuns
    ?.map((run, index) => (run.status === "completed" ? index + 1 : null))
    .filter((value) => value !== null) || [];
  const nextAgentIndex = raw.agentRuns?.findIndex((run) => run.status !== "completed");
  const overall = raw.startupScore?.overall || 60;

  return {
    ...raw,
    id: idOf(raw),
    user: idOf(raw.user),
    name: raw.startupName,
    score: overall,
    currentNodeIndex: nextAgentIndex === -1 ? agentDefinitions.length : Math.max(0, nextAgentIndex + 1),
    completedNodes: [0, ...completedAgentIndexes],
    lastUpdated: raw.updatedAt ? new Date(raw.updatedAt).toLocaleString() : "Just now",
    healthMetrics: {
      marketPotential: raw.startupScore?.marketDemand || overall,
      technicalFeasibility: raw.startupScore?.technicalFeasibility || overall,
      financialViability: raw.startupScore?.revenuePotential || overall,
      executionReadiness: Math.max(0, 100 - (raw.startupScore?.executionComplexity || 50)),
      competitiveness: raw.startupScore?.competition || overall,
      scalability: Math.round(((raw.startupScore?.marketDemand || overall) + (raw.startupScore?.revenuePotential || overall)) / 2)
    }
  };
};

export const newAgentRuns = () => agentDefinitions.map((agent) => ({
  key: agent.key,
  name: agent.name,
  outputFile: agent.outputFile,
  status: "pending",
  approved: false,
  runtime: 0,
  tokenUsage: 0
}));
