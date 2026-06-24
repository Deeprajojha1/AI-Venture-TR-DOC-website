import React, { useEffect, useState, useRef } from "react";
import { Terminal } from "lucide-react";
import { WORKFLOW_NODES_LIST } from "../../data/dummyData";

const AGENT_NAMES = ["Researcher", "Competitor Analyst", "CTO Architect", "CFO Modeler", "CMO Planner", "CEO Vetting"];

const generateLogMessage = (nodeIndex) => {
  const node = WORKFLOW_NODES_LIST[nodeIndex] || WORKFLOW_NODES_LIST[0];
  const agent = AGENT_NAMES[nodeIndex % AGENT_NAMES.length];

  const templates = [
    `[INFO] [${agent}] Booting sandbox container...`,
    `[INFO] [${agent}] Analyzing startup description for details...`,
    `[PROCESS] [${agent}] Running semantic search on target industry: "${node.label}"...`,
    `[SUCCESS] [${agent}] Fetched key parameters and mapped workspace metadata.`,
    `[PROCESS] [${agent}] Compiling deliverable output...`,
    `[READY] [${agent}] Node "${node.label}" finalized. Awaiting review.`
  ];

  return templates;
};

export const WorkflowStatus = ({ currentNodeIndex = 0 }) => {
  const [logs, setLogs] = useState([]);
  const terminalEndRef = useRef(null);

  useEffect(() => {
    // Generate base logs for the current node
    const messages = generateLogMessage(currentNodeIndex);
    let logQueue = [];
    
    // Add some random historical logs
    const prevNode = currentNodeIndex > 0 ? WORKFLOW_NODES_LIST[currentNodeIndex - 1] : null;
    if (prevNode) {
      logQueue.push({
        text: `[SYSTEM] Pipeline node "${prevNode.label}" marked [COMPLETED].`,
        time: new Date().toLocaleTimeString(),
        type: "success"
      });
    }

    logQueue.push({
      text: `[SYSTEM] Advancing pipeline to node [${currentNodeIndex}]: "${WORKFLOW_NODES_LIST[currentNodeIndex]?.label}".`,
      time: new Date().toLocaleTimeString(),
      type: "system"
    });

    setLogs(logQueue);

    // Stagger stream of new logs
    let delay = 300;
    messages.forEach((msg, idx) => {
      setTimeout(() => {
        setLogs((prev) => [
          ...prev,
          {
            text: msg,
            time: new Date().toLocaleTimeString(),
            type: msg.includes("SUCCESS") || msg.includes("READY") ? "success" : msg.includes("PROCESS") ? "process" : "info"
          }
        ]);
      }, delay);
      delay += 800;
    });

  }, [currentNodeIndex]);

  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs]);

  return (
    <div className="flex flex-col h-[220px] rounded-2xl bg-black/80 border border-white/[0.08] font-mono text-xs overflow-hidden shadow-2xl relative">
      {/* Top Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/[0.08] bg-white/[0.02]">
        <div className="flex items-center gap-2 text-gray-400">
          <Terminal className="h-4 w-4 text-cyan-400 animate-pulse" />
          <span>Agent Console Log</span>
        </div>
        <div className="flex gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-rose-500/50" />
          <div className="h-2.5 w-2.5 rounded-full bg-amber-500/50" />
          <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/50" />
        </div>
      </div>

      {/* Terminal logs list */}
      <div className="flex-1 overflow-y-auto p-4 space-y-1.5 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        {logs.map((log, idx) => (
          <div key={idx} className="flex items-start gap-2.5">
            <span className="text-gray-600 shrink-0 select-none">[{log.time}]</span>
            <span className={
              log.type === "success" 
                ? "text-emerald-400 font-bold" 
                : log.type === "process"
                  ? "text-cyan-400"
                  : log.type === "system"
                    ? "text-purple-400"
                    : "text-gray-300"
            }>
              {log.text}
            </span>
          </div>
        ))}
        <div ref={terminalEndRef} />
      </div>
    </div>
  );
};

export default WorkflowStatus;
