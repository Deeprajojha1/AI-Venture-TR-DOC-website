import mongoose from "mongoose";

const agentRunSchema = new mongoose.Schema({
  key: String,
  name: String,
  outputFile: String,
  status: { type: String, default: "pending" },
  report: { type: mongoose.Schema.Types.ObjectId, ref: "Report" },
  approved: { type: Boolean, default: false },
  runtime: { type: Number, default: 0 },
  tokenUsage: { type: Number, default: 0 },
  error: String
}, { _id: false });

const startupScoreSchema = new mongoose.Schema({
  marketDemand: { type: Number, default: 0 },
  competition: { type: Number, default: 0 },
  revenuePotential: { type: Number, default: 0 },
  technicalFeasibility: { type: Number, default: 0 },
  executionComplexity: { type: Number, default: 0 },
  overall: { type: Number, default: 0 }
}, { _id: false });

const projectSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  startupName: { type: String, required: true, trim: true },
  industry: { type: String, required: true, trim: true },
  targetUsers: { type: String, required: true, trim: true },
  country: { type: String, required: true, trim: true },
  budget: { type: String, required: true, trim: true },
  timeline: { type: String, required: true, trim: true },
  idea: { type: String, required: true, trim: true },
  status: { type: String, default: "Draft" },
  agentRuns: [agentRunSchema],
  startupScore: { type: startupScoreSchema, default: () => ({}) }
}, { timestamps: true });

export default mongoose.model("Project", projectSchema);
