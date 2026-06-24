import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
  agentKey: { type: String, required: true },
  outputFile: { type: String, required: true },
  content: { type: String, required: true },
  embeddingReference: String
}, { timestamps: true });

export default mongoose.model("Report", reportSchema);
