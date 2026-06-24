import bcrypt from "bcryptjs";
import { agentDefinitions } from "../agents/agentDefinitions.js";

const now = () => new Date().toISOString();
const makeId = (prefix) => `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

export const inMemoryStore = {
  isActive: false,
  users: [],
  projects: [],
  reports: [],
  boardroomSessions: [],

  enable() {
    this.isActive = true;
  },

  async seed() {
    if (this.users.length) return;
    const passwordHash = await bcrypt.hash("password123", 10);
    const user = {
      id: "demo-user",
      name: "Demo Founder",
      email: "founder@example.com",
      passwordHash,
      createdAt: now(),
      updatedAt: now()
    };
    const project = {
      id: "proj-1",
      user: user.id,
      startupName: "AI Venture Studio",
      industry: "SaaS / Developer Tools",
      targetUsers: "Founders, Indie Hackers, Venture Builders",
      country: "Global",
      budget: "$150,000",
      timeline: "3 Months",
      idea: "An autonomous agentic workflow platform that acts as an AI Co-Founder.",
      status: "Draft",
      agentRuns: agentDefinitions.map((agent) => ({
        key: agent.key,
        name: agent.name,
        outputFile: agent.outputFile,
        status: "pending",
        approved: false,
        runtime: 0,
        tokenUsage: 0
      })),
      startupScore: {
        marketDemand: 85,
        competition: 72,
        revenuePotential: 80,
        technicalFeasibility: 78,
        executionComplexity: 65,
        overall: 80
      },
      createdAt: now(),
      updatedAt: now()
    };
    this.users.push(user);
    this.projects.push(project);
  },

  makeId,
  now
};
