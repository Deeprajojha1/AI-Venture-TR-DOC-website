const clamp = (value) => Math.max(0, Math.min(100, Math.round(value)));

export const calculateStartupScore = (project, reports = []) => {
  const text = `${project.idea} ${project.industry} ${project.targetUsers} ${reports.map((report) => report.content).join(" ")}`.toLowerCase();
  const positiveSignals = ["ai", "automation", "b2b", "saas", "workflow", "compliance", "revenue", "platform", "founder"];
  const hardSignals = ["health", "fintech", "regulated", "hardware", "clinical", "banking"];
  const positive = positiveSignals.filter((signal) => text.includes(signal)).length;
  const hard = hardSignals.filter((signal) => text.includes(signal)).length;

  const marketDemand = clamp(58 + positive * 5 + reports.length * 2);
  const competition = clamp(72 - positive * 2 + hard * 4);
  const revenuePotential = clamp(55 + positive * 4 + String(project.budget || "").length);
  const technicalFeasibility = clamp(82 - hard * 7 + reports.length);
  const executionComplexity = clamp(38 + hard * 9 + reports.length);
  const overall = clamp((marketDemand + revenuePotential + technicalFeasibility + (100 - executionComplexity) + competition) / 5);

  return { marketDemand, competition, revenuePotential, technicalFeasibility, executionComplexity, overall };
};
