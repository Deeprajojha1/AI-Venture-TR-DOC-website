export const agentDefinitions = [
  {
    key: "market",
    name: "Market Research",
    description: "Sizes the market, identifies buyer demand, and surfaces macro trends.",
    outputFile: "market_report.md",
    promptTemplate: "Create a market research report for {{startupName}} in {{industry}} serving {{targetUsers}} in {{country}}."
  },
  {
    key: "competitor",
    name: "Competitor Analysis",
    description: "Maps direct, indirect, and substitute competitors.",
    outputFile: "competitor_report.md",
    promptTemplate: "Create a competitor analysis for {{startupName}} with SWOT and positioning gaps."
  },
  {
    key: "opportunity",
    name: "Opportunity Discovery",
    description: "Finds underserved segments and wedge opportunities.",
    outputFile: "opportunity_report.md",
    promptTemplate: "Identify strategic opportunities for {{startupName}} based on the idea: {{idea}}."
  },
  {
    key: "product",
    name: "Product Strategy",
    description: "Defines product vision, scope, and roadmap.",
    outputFile: "product_strategy.md",
    promptTemplate: "Create product strategy for {{startupName}}, including ICP, MVP, and roadmap."
  },
  {
    key: "prd",
    name: "PRD",
    description: "Turns the strategy into product requirements and user stories.",
    outputFile: "prd.md",
    promptTemplate: "Write a PRD for {{startupName}} with functional requirements and acceptance criteria."
  },
  {
    key: "architecture",
    name: "Architecture",
    description: "Designs backend, data, integration, and deployment architecture.",
    outputFile: "architecture.md",
    promptTemplate: "Create a technical architecture for {{startupName}} using pragmatic cloud-native design."
  },
  {
    key: "revenue",
    name: "Revenue Model",
    description: "Builds pricing, packaging, and unit economics.",
    outputFile: "revenue_model.md",
    promptTemplate: "Create a revenue model for {{startupName}} with tiers, CAC/LTV, and margins."
  },
  {
    key: "financial",
    name: "Financial Forecast",
    description: "Produces three-year revenue, cost, and runway assumptions.",
    outputFile: "forecast.md",
    promptTemplate: "Create a three-year financial forecast for {{startupName}} with assumptions."
  },
  {
    key: "gtm",
    name: "Go-To-Market",
    description: "Builds launch channels, messaging, and growth loops.",
    outputFile: "gtm.md",
    promptTemplate: "Create a GTM strategy for {{startupName}} targeting {{targetUsers}}."
  },
  {
    key: "investor",
    name: "Investor Readiness",
    description: "Checks fundraising story, data room needs, and risks.",
    outputFile: "investor_readiness.md",
    promptTemplate: "Create an investor readiness assessment for {{startupName}}."
  },
  {
    key: "pitch",
    name: "Pitch Deck",
    description: "Creates the investor pitch deck outline and slide script.",
    outputFile: "pitch_deck.md",
    promptTemplate: "Create a pitch deck outline and slide script for {{startupName}}."
  }
];

export const getAgentDefinition = (key) => agentDefinitions.find((agent) => agent.key === key);
