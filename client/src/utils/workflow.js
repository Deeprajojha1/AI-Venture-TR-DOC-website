export const getWorkflowNodes = (project) => {
  const agentRuns = project?.agentRuns || [];

  return [
    {
      id: "idea",
      label: "Idea",
      description: "Startup concept submitted",
      outputFile: null
    },
    ...agentRuns.map((run, index) => ({
      id: run.key || run.outputFile || `agent-${index}`,
      label: run.name || `Agent ${index + 1}`,
      description: run.status || "pending",
      outputFile: run.outputFile || null
    }))
  ];
};

export const getReportKey = (report) => report?.outputFile || report?.id || report?._id;

export const getNodeStatus = (completedNodes = [], currentNodeIndex = 0, index) => {
  if (completedNodes.includes(index)) return "completed";
  if (index === currentNodeIndex) return "active";
  return "pending";
};
