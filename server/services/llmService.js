import { getResearchSignals } from "./searchService.js";

const fillTemplate = (template, project) => template.replace(/\{\{(\w+)}}/g, (_match, key) => project[key] || "");

const fallbackReport = async (agent, project) => {
  const signals = await getResearchSignals(`${project.startupName} ${project.industry}`);
  return `# ${agent.name} - ${project.startupName}

## Executive Summary
${project.startupName} targets ${project.targetUsers} with a venture concept in ${project.industry}. The current idea is: ${project.idea}

## Key Findings
- Market signal: ${signals.marketSignals[0] || "Demand is present but needs sharper validation."}
- Competitive insight: ${signals.competitorInsights[0] || "Positioning must separate the product from generic AI tooling."}
- Trend: ${signals.industryTrends[0] || "Customers are adopting agentic workflows for repetitive strategic work."}

## Recommendations
- Validate the highest-intent user segment in ${project.country}.
- Package the first release around one measurable outcome.
- Keep execution inside the stated ${project.timeline} timeline and ${project.budget} budget.

## Agent Conclusion
${agent.description} This deterministic report was generated because a live Ollama response was unavailable.`;
};

export const generateReport = async ({ agent, project, previousReports = [] }) => {
  const started = Date.now();
  const prompt = `${fillTemplate(agent.promptTemplate, project)}

Previous context:
${previousReports.map((report) => report.content.slice(0, 1200)).join("\n\n")}`;

  try {
    const baseUrl = process.env.OLLAMA_BASE_URL || "http://127.0.0.1:11434";
    const model = process.env.OLLAMA_MODEL || "llama3";
    const response = await fetch(`${baseUrl}/api/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model, prompt, stream: false }),
      signal: AbortSignal.timeout(45000)
    });

    if (!response.ok) throw new Error(`Ollama HTTP ${response.status}`);
    const data = await response.json();
    const content = data.response?.trim();
    if (!content) throw new Error("Ollama returned empty content");

    return {
      content,
      runtime: Date.now() - started,
      tokenUsage: Math.ceil(prompt.length / 4) + Math.ceil(content.length / 4)
    };
  } catch {
    const content = await fallbackReport(agent, project);
    return {
      content,
      runtime: Date.now() - started,
      tokenUsage: Math.ceil((prompt.length + content.length) / 4)
    };
  }
};
