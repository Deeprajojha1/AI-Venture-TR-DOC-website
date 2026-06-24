import mongoose from "mongoose";

const roleMessageSchema = new mongoose.Schema({
  senderId: String,
  role: String,
  name: String,
  text: String,
  timestamp: String
}, { _id: false });

const boardroomSessionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
  question: { type: String, required: true },
  roleMessages: [roleMessageSchema],
  consensus: { type: Number, default: 75 }
}, { timestamps: true });

export default mongoose.model("BoardroomSession", boardroomSessionSchema);
