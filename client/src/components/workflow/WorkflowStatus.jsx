import React, { useEffect, useRef, useState } from "react";
import { Terminal } from "lucide-react";

const buildLogMessages = (node) => {
  if (!node) return [];

  return [
    `[INFO] [${node.label}] Preparing agent runtime...`,
    `[PROCESS] [${node.label}] Loading project context...`,
    `[PROCESS] [${node.label}] Compiling deliverable output...`,
    `[READY] [${node.label}] Awaiting backend result.`
  ];
};

export const WorkflowStatus = ({ currentNodeIndex = 0, workflowNodes = [] }) => {
  const [logs, setLogs] = useState([]);
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const node = workflowNodes[currentNodeIndex] || workflowNodes[0];
    const prevNode = currentNodeIndex > 0 ? workflowNodes[currentNodeIndex - 1] : null;
    const messages = buildLogMessages(node);
    const logQueue = [];

    if (prevNode) {
      logQueue.push({
        text: `[SYSTEM] Pipeline node "${prevNode.label}" marked [COMPLETED].`,
        time: new Date().toLocaleTimeString(),
        type: "success"
      });
    }

    if (node) {
      logQueue.push({
        text: `[SYSTEM] Active pipeline node [${currentNodeIndex}]: "${node.label}".`,
        time: new Date().toLocaleTimeString(),
        type: "system"
      });
    }

    setLogs(logQueue);

    let delay = 300;
    const timers = messages.map((msg) => {
      const timer = setTimeout(() => {
        setLogs((prev) => [
          ...prev,
          {
            text: msg,
            time: new Date().toLocaleTimeString(),
            type: msg.includes("READY") ? "success" : msg.includes("PROCESS") ? "process" : "info"
          }
        ]);
      }, delay);
      delay += 800;
      return timer;
    });

    return () => timers.forEach(clearTimeout);
  }, [currentNodeIndex, workflowNodes]);

  useEffect(() => {
    if (!isUserScrolling && containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [logs, isUserScrolling]);

  // Detect when user is manually scrolling
  const handleScroll = () => {
    if (!containerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    const isAtBottom = scrollHeight - scrollTop <= clientHeight + 50;
    
    setIsUserScrolling(!isAtBottom);
  };

  return (
    <div className="flex flex-col h-[220px] rounded-2xl bg-black/80 border border-white/[0.08] font-mono text-xs overflow-hidden shadow-2xl relative">
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

      <div 
        ref={containerRef}
        onScroll={handleScroll}
        className="flex-1 overscroll-contain overflow-y-auto p-4 space-y-1.5 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent"
      >
        {logs.length === 0 && (
          <div className="text-gray-500">No workflow activity yet.</div>
        )}
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
      </div>
    </div>
  );
};

export default WorkflowStatus;
