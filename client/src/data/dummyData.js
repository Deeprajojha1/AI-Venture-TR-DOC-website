// High-fidelity Mock Data for AI-Venture Studio

export const INITIAL_PROJECTS = [
  {
    id: "proj-1",
    name: "AI-Venture Studio",
    industry: "SaaS / Developer Tools",
    targetUsers: "Founders, Indie Hackers, Venture Builders",
    country: "Global",
    budget: "$150,000",
    timeline: "3 Months",
    idea: "An autonomous agentic workflow platform that acts as an AI Co-Founder to research, spec, design architecture, forecast, and compile investor pitch decks for startups.",
    status: "Active", // Active, Completed, Draft
    score: 92,
    lastUpdated: "10 mins ago",
    currentNodeIndex: 4, // Product Strategy
    healthMetrics: {
      marketPotential: 95,
      technicalFeasibility: 88,
      financialViability: 90,
      executionReadiness: 85,
      competitiveness: 92,
      scalability: 90
    },
    completedNodes: [0, 1, 2, 3] // Idea, Market Research, Competitor Analysis, Opportunity Discovery
  },
  {
    id: "proj-2",
    name: "FinAI Ledger",
    industry: "Fintech",
    targetUsers: "Small-Medium Businesses, Accountants",
    country: "United Kingdom",
    budget: "$250,000",
    timeline: "6 Months",
    idea: "Real-time AI accounting agent that reconciles invoices, detects fraud patterns, predicts cashflow issues, and files taxes autonomously using local regulations.",
    status: "Completed",
    score: 88,
    lastUpdated: "Yesterday",
    currentNodeIndex: 11, // Pitch Deck
    healthMetrics: {
      marketPotential: 85,
      technicalFeasibility: 92,
      financialViability: 86,
      executionReadiness: 89,
      competitiveness: 80,
      scalability: 95
    },
    completedNodes: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  },
  {
    id: "proj-3",
    name: "HealthCopilot",
    industry: "Healthcare / Wellness",
    targetUsers: "Outpatient Clinics, General Practitioners",
    country: "Canada",
    budget: "$400,000",
    timeline: "9 Months",
    idea: "A privacy-first AI scribe and diagnosis assistant that plugs into HIPAA compliant EHR systems, translating doctor-patient conversations into structured medical records.",
    status: "Draft",
    score: 74,
    lastUpdated: "5 days ago",
    currentNodeIndex: 1, // Market Research
    healthMetrics: {
      marketPotential: 92,
      technicalFeasibility: 60, // HIPAA compliance & clinical accuracy issues
      financialViability: 82,
      executionReadiness: 65,
      competitiveness: 78,
      scalability: 85
    },
    completedNodes: [0]
  }
];

export const WORKFLOW_NODES_LIST = [
  { id: "node-0", label: "Idea", description: "Vetting the core value proposition" },
  { id: "node-1", label: "Market Research", description: "TAM/SAM/SOM & industry tailwinds" },
  { id: "node-2", label: "Competitor Analysis", description: "SWOT matrix and direct alternatives" },
  { id: "node-3", label: "Opportunity Discovery", description: "Unmet needs & underserved niches" },
  { id: "node-4", label: "Product Strategy", description: "Vision, core value & feature scope" },
  { id: "node-5", label: "PRD", description: "Functional specs and user stories" },
  { id: "node-6", label: "Architecture", description: "System layout, APIs, & cloud infra" },
  { id: "node-7", label: "Revenue Model", description: "Monetization structure & pricing tiers" },
  { id: "node-8", label: "Forecast", description: "3-year financial spreadsheet model" },
  { id: "node-9", label: "GTM", description: "Channels, cost of acquisition, & launch" },
  { id: "node-10", label: "Investor Readiness", description: "Cap table, checklist, and data room" },
  { id: "node-11", label: "Pitch Deck", description: "Multi-slide presentation outline" }
];

export const DUMMY_REPORTS = {
  market_report: `# Market Research Report - AI-Venture Studio

## 1. Executive Summary
The market for AI-driven developer and founder tooling is experiencing hyper-growth. With the barrier to code collapsing due to LLMs, the bottleneck has shifted from "writing code" to "validating ideas, executing strategy, and securing funding".

## 2. Market Size Analysis
* **TAM (Total Addressable Market)**: $24.5B (Global Startup & SaaS creation ecosystem)
* **SAM (Serviceable Addressable Market)**: $4.2B (Indie hackers, startup incubators, and early-stage entrepreneurs)
* **SOM (Serviceable Obtainable Market)**: $350M (Active AI-powered builders utilizing automation)

## 3. Key Trends
* **Agentic Orchestration**: The shift from passive chat inputs to autonomous multi-agent workflows that run overnight.
* **Cost-Efficient Validation**: Capital requirements to build an MVP have dropped by 80%, driving demand for validation tools.
* **Micro-SaaS Boom**: Individual developers launching multiple specialized apps per year.`,

  competitor_report: `# Competitor Analysis

## 1. Competitive Landscape Matrix
We evaluate AI-Venture Studio against direct and indirect competitors across three main dimensions: automation level, output depth, and user experience.

| Competitor | Automation Level | Output Focus | Pricing Model | Key Deficiencies |
| :--- | :--- | :--- | :--- | :--- |
| **VentureMap** | Low (Templates) | Business Plans | Free / Paid PDF | Static templates, no AI agents |
| **PitchGen** | Medium (Text AI) | Presentation Slides | $29/mo | No architectural or PRD depth |
| **Linear/Notion** | None (SaaS Tool) | General Management| $8/user/mo | Requires manual entry & config |
| **AI-Venture Studio** | **High (Autonomous)**| **End-to-End Specs** | **SaaS Subscription**| **None (This Project)** |

## 2. SWOT Analysis
* **Strengths**: Autonomous multi-agent review, custom local storage, interactive React Flow diagramming.
* **Weaknesses**: Dependency on LLM context windows (mitigated by token slicing).
* **Opportunities**: Integration with Vercel and AWS for one-click deployment.
* **Threats**: Rapidly evolving LLM capabilities requiring frequent prompt engineering adjustments.`,

  opportunity_report: `# Opportunity Discovery & Positioning

## 1. The Startup Validation Gap
90% of startups fail due to a lack of market need, poor financial planning, or weak product strategy. Traditional founders spend 4-6 weeks and thousands of dollars generating reports that become obsolete instantly.

## 2. Our Value Proposition
AI-Venture Studio solves this by automating:
1. **Validation in 5 Minutes**: Immediate feedback on startup ideas.
2. **Deep PRD & Architecture**: Comprehensive specifications that developers can feed directly to code generators.
3. **Investor Readiness**: Automated financial projections and slide formulations based on real market rates.

## 3. Blue Ocean Positioning
By positioning between generic note-taking tools (Notion) and heavy-weight enterprise software, we target the underserved "technical solo-founder" niche who wants to build high-scale startups alone.`,

  product_strategy: `# Product Strategy & Roadmap

## 1. Product Vision
To democratize startup creation by providing every founder with a virtual Board of Directors and a world-class engineering team in a box.

## 2. Core Value Pillars
* **High Fidelity Output**: Produce reports that look like they were crafted by top-tier consulting firms.
* **Actionable Specs**: Transition directly from idea to system architecture.
* **Collaboration & Sandbox**: Interactive boardroom with simulated experts offering counterarguments.

## 3. Product Roadmap (Q1 - Q4)
* **Milestone 1**: Core SaaS UI & Local State Simulation (Current Milestone).
* **Milestone 2**: Multi-agent orchestration backend integration.
* **Milestone 3**: Export bundle (PDF, Markdown, raw JSON files).
* **Milestone 4**: Interactive boardroom voice call simulations.`,

  prd: `# Product Requirements Document (PRD)

## 1. Objective
Build an intuitive, high-performance workspace where founders submit ideas and monitor autonomous agents running market, tech, and financial analyses.

## 2. User Stories
* **US-1**: As a founder, I want to submit my startup idea, industry, and budget so that the agents have clear constraints.
* **US-2**: As a developer, I want to see the system architecture report so I can understand the database schemas and infrastructure nodes.
* **US-3**: As an applicant for funding, I want to view my pitch deck script formatted with slide-by-slide outlines.

## 3. Functional Specifications
* **Tab-based Navigation**: Quick navigation between Dashboard, Studio, Boardroom, and Analytics.
* **Workflow Visualizer**: Glow/Pulse animations mapping the exact pipeline node currently processing.
* **Export Engines**: Download files in \`.md\` or \`.json\` formats.`,

  architecture: `# System Architecture Specification

## 1. System Topology Diagram
\`\`\`
[ React Frontend ] ---> [ API Gateway / Route Handlers ]
                            |
         +------------------+------------------+
         |                  |                  |
   [ Auth Service ]   [ Agent Orchestrator ] [ Database ]
                            |                  |
                     [ LangGraph Engine ]    [ PostgreSQL ]
                            |
                   [ LLM Providers ] (Claude/GPT/Gemini)
\`\`\`

## 2. Data Flow
1. Founder inputs startup parameters.
2. React frontend sends request to API gateway.
3. Orchestrator triggers LangGraph, launching separate agents (Market Researcher, CTO, CFO).
4. Results are compiled, stored in PostgreSQL, and streamed back to the user via Server-Sent Events (SSE).

## 3. Tech Stack
* **Frontend**: React 18, Vite 6, Tailwind CSS, Zustand, Recharts, React Flow.
* **Backend**: Node.js / Express, Python (LangGraph/LangChain).
* **Database**: PostgreSQL with Prisma ORM.`,

  revenue_model: `# Revenue & Monetization Model

## 1. Pricing Strategy
We adopt a value-based pricing strategy targeted at three tiers:

* **Builder (Free/Hacker)**:
  * $0 / mo
  * 1 active project, basic reports (Idea, Market Research).
* **Professional (Founder)**:
  * $49 / mo
  * Unlimited projects, full 12-node workflow execution, export features, boardroom chat.
* **Venture Studio (Enterprise)**:
  * $299 / mo
  * API keys, team collaboration spaces, custom agent prompts, white-label PDF reports.

## 2. Unit Economics
* **Estimated LTV (Lifetime Value)**: $392 (Avg. subscription length of 8 months)
* **Target CAC (Customer Acquisition Cost)**: $85
* **CAC/LTV Ratio**: 4.6x (Healthy tier)
* **Estimated LLM API Costs per Run**: $1.20`,

  forecast: `# Three-Year Financial Forecast

## 1. Key Assumptions
* Customer Growth: 15% Month-over-Month in Year 1, stabilizing at 8% in Year 2.
* Churn Rate: 4.5% monthly.
* ARPU: $58.

## 2. Revenue Projections (USD)
* **Year 1**: $180,000 ARR
* **Year 2**: $720,000 ARR
* **Year 3**: $2,100,000 ARR

## 3. Operational Costs vs Net Income
* Year 1: Infrastructure $36k, LLM APIs $18k, Marketing $40k. Net Margin: ~47%.
* Year 2: Team hiring (3 engineers, 1 marketer). Net Margin: ~55%.
* Year 3: Scale operations. Net Margin: ~68%.`,

  gtm: `# Go-To-Market (GTM) Strategy

## 1. Target Audience Segments
1. **Product Hunt Community**: Tech-savvy early adopters eager to validate projects.
2. **Indie Hackers**: High velocity builders seeking to quickly outline landing pages and specs.
3. **Accelerator Cohorts**: Early stage startups preparing pitches.

## 2. Marketing Channels
* **Product-Led Growth (PLG)**: Offer a free "Market Feasibility Score" widget that users can embed on Twitter.
* **Organic SEO**: Target keywords like "startup idea validator", "AI PRD generator", "how to write a pitch deck".
* **Partnerships**: Partner with micro-VCs and incubators to provide AI-Venture Studio as a value-add.

## 3. Launch Timeline
* **Week 1**: Beta launch to waitlist (500 users).
* **Week 3**: Product Hunt launch.
* **Week 6**: Integration with GitHub/Vercel (push-to-deploy mockups).`,

  investor_readiness: `# Investor Readiness Assessment

## 1. Compliance Checklist
- [x] Incorporation paperwork drafted (Delaware C-Corp recommended)
- [x] Clear Intellectual Property (IP) assignment agreement
- [x] Cap Table modeled (80/20 Founder/Pool split)
- [x] 12-month use of funds sheet ready
- [ ] Financial audit completed

## 2. Funding Ask
* **Pre-Seed Target**: $750,000
* **Instrument**: SAFE (Simple Agreement for Future Equity) with a $6M Valuation Cap.
* **Use of Funds**:
  * 70% Product Development & LLM Orchestration tuning
  * 20% Growth & Direct Channels
  * 10% Compliance, Legal, & IP protection`,

  pitch_deck: `# Pitch Deck Outline & Slide Script

## Slide 1: The Title
* **Headline**: AI-Venture Studio
* **Sub-headline**: The Autonomous AI Co-Founder for Modern Builders.

## Slide 2: The Problem
* **Script**: Building a startup is highly fragmented. Founders waste months conducting research, writing PRDs, and modeling financials before writing a single line of code.

## Slide 3: The Solution
* **Script**: AI-Venture Studio is an autonomous multi-agent workspace. Input your idea, and get a production-ready system architecture, market validation, and investor-ready deck script in 5 minutes.

## Slide 4: Business Model
* **Script**: Simple SaaS subscription starting at $49/mo. High margin (>85%) with low API transaction costs.

## Slide 5: Ask & Team
* **Script**: Seeking $750k pre-seed SAFE to build the core agent framework. Team comprised of top-tier AI researchers and serial SaaS developers.`
};

export const EXECUTIVE_MEMBERS = [
  { id: "ceo", name: "Elena Vance", role: "CEO", avatar: "👩‍💼", bio: "Former YC founder, strategy and fundraising expert." },
  { id: "cto", name: "Marcus Chen", role: "CTO", avatar: "👨‍💻", bio: "Ex-Google Staff Engineer, systems architect and AI developer." },
  { id: "cmo", name: "Sarah Jenkins", role: "CMO", avatar: "👩‍🎨", bio: "Growth marketer, expert in viral PLG loops and GTM launch." },
  { id: "cfo", name: "David Kross", role: "CFO", avatar: "👨‍💼", bio: "Venture capitalist, financial modeling and cap table wizard." }
];

export const INITIAL_DISCUSSION = [
  {
    senderId: "ceo",
    text: "Welcome to the boardroom. Let's analyze the AI-Venture Studio idea. Marcus, how are we looking from a technical feasibility standpoint?",
    timestamp: "10:02 AM"
  },
  {
    senderId: "cto",
    text: "Building the agent orchestrator is viable using LangGraph. Our main challenge will be LLM latency and state synchronization across long-running reports. We should build an event-driven SSE pipeline.",
    timestamp: "10:04 AM"
  },
  {
    senderId: "cmo",
    text: "From a market perspective, this is gold. Founders are tired of manual templates. The GTM should focus heavily on Product Hunt and Twitter building-in-public communities.",
    timestamp: "10:05 AM"
  },
  {
    senderId: "cfo",
    text: "Agreed. The pricing at $49/month easily offsets the LLM token cost, leaving us with a ~90% gross margin. We need to model the CAC carefully though.",
    timestamp: "10:07 AM"
  }
];

export const SIMULATED_RESPONSES = {
  pricing: {
    ceo: "We should focus on a value-based tier. Standardizing at $49/mo is great, but let's offer an enterprise tier for venture studios at $299/mo.",
    cto: "We need an API usage cap on the $49 plan to prevent billing spikes. Running a full 12-stage analysis eats about 300k tokens.",
    cmo: "Let's lead with a free trial that gives them a preview report. Once they see the value in the PRD, they'll swipe their card.",
    cfo: "I'll model the margins. Enterprise plans will subsidize high-usage power users on the standard plan."
  },
  database: {
    ceo: "Let's keep the user data secured and isolated. Privacy is a major selling point for founders.",
    cto: "We'll use PostgreSQL with Supabase for quick setup, and store the markdown reports as binary files or in a secure bucket.",
    cmo: "No database issues should block registration. Let's keep the sign-up flow extremely frictionless.",
    cfo: "Self-hosting database costs are negligible in the first 12 months. AWS/Supabase credits will cover us."
  },
  funding: {
    ceo: "We should aim for $750k on a SAFE cap. That gives us 18 months of runway to reach $50k MRR.",
    cto: "Most of that money should go towards engineering and LLM evaluation datasets. We need robust testing frameworks.",
    cmo: "I'll need $50k allocated for targeted sponsorships and launch marketing.",
    cfo: "We'll build a cap table projection showing a 15% dilution pool for early employees."
  },
  default: {
    ceo: "That is an interesting angle. We need to verify if this aligns with our core Q3 milestones.",
    cto: "Technically, we can prototype this in a week using mock services before doing full API integration.",
    cmo: "Let's run a quick A/B test on the landing page to gauge audience interest.",
    cfo: "Let's check the ROI of this feature. We don't want to expand scope without seeing immediate retention benefits."
  }
};

export const ANALYTICS_DATA = {
  cards: {
    avgRuntime: "4.8 mins",
    completionRate: "94.2%",
    tokenUsage: "12,450,210",
    mostUsedAgent: "CTO Architect"
  },
  tokenHistory: [
    { name: "Mon", tokens: 1200000, cost: 6.0 },
    { name: "Tue", tokens: 1800000, cost: 9.0 },
    { name: "Wed", tokens: 1400000, cost: 7.0 },
    { name: "Thu", tokens: 2200000, cost: 11.0 },
    { name: "Fri", tokens: 2800000, cost: 14.0 },
    { name: "Sat", tokens: 1600000, cost: 8.0 },
    { name: "Sun", tokens: 1450000, cost: 7.25 }
  ],
  agentWorkload: [
    { name: "Researcher", tasks: 85, accuracy: 96 },
    { name: "CTO", tasks: 72, accuracy: 92 },
    { name: "CFO", tasks: 60, accuracy: 89 },
    { name: "CMO", tasks: 68, accuracy: 91 },
    { name: "CEO Vetting", tasks: 94, accuracy: 95 }
  ]
};
