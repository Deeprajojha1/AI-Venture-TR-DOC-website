import BoardroomSession from "../models/BoardroomSession.js";
import { usingMemory } from "../config/db.js";
import { inMemoryStore } from "../services/inMemoryStore.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { requireFields } from "../utils/validation.js";

const roles = [
  { senderId: "ceo", role: "CEO", name: "Elena Vance" },
  { senderId: "cto", role: "CTO", name: "Marcus Chen" },
  { senderId: "cfo", role: "CFO", name: "David Kross" },
  { senderId: "cmo", role: "CMO", name: "Sarah Jenkins" },
  { senderId: "vc", role: "VC", name: "Ari Patel" }
];

const responseFor = (role, question) => {
  const q = question.toLowerCase();
  if (q.includes("price") || q.includes("pricing")) {
    return `${role.name}: Pricing should connect directly to founder outcomes. Keep a low-friction entry tier, but meter full workflow runs so margins stay healthy.`;
  }
  if (q.includes("tech") || q.includes("database") || q.includes("api")) {
    return `${role.name}: The technical plan should prioritize simple Express services, resilient fallbacks, and clean ownership checks before adding orchestration complexity.`;
  }
  if (q.includes("fund") || q.includes("investor") || q.includes("raise")) {
    return `${role.name}: The fundraising story should lead with speed from idea to investor-ready artifacts, backed by repeat usage and report quality metrics.`;
  }
  return `${role.name}: This is worth exploring, but we should test it against customer urgency, build complexity, and whether it strengthens the core venture workflow.`;
};

export const debate = asyncHandler(async (req, res) => {
  requireFields(req.body, ["question"]);
  const timestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const roleMessages = roles.map((role) => ({
    ...role,
    text: responseFor(role, req.body.question),
    timestamp
  }));
  const consensus = Math.min(95, 68 + roleMessages.length * 4 + (req.body.projectId ? 5 : 0));

  const session = usingMemory()
    ? {
        id: inMemoryStore.makeId("boardroom"),
        user: req.user.id,
        project: req.body.projectId,
        question: req.body.question,
        roleMessages,
        consensus,
        createdAt: inMemoryStore.now(),
        updatedAt: inMemoryStore.now()
      }
    : await BoardroomSession.create({
        user: req.user.id,
        project: req.body.projectId,
        question: req.body.question,
        roleMessages,
        consensus
      });

  if (usingMemory()) inMemoryStore.boardroomSessions.push(session);
  res.json({ success: true, roleMessages, consensus, session });
});
