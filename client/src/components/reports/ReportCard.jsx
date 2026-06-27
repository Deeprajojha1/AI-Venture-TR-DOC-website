import React, { useRef, useState, useEffect } from "react";
import { CheckCircle2, Lock } from "lucide-react";
import { cn } from "../../utils/cn";

export const ReportCard = ({ workflowNodes = [], completedNodeIds = [], activeNodeIndex, selectedReportKey, setSelectedReportKey }) => {
  const reportNodes = workflowNodes.slice(1).filter((node) => node.outputFile);
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const containerRef = useRef(null);
  const lastCompletedIndex = completedNodeIds[completedNodeIds.length - 1];

  const handleScroll = () => {
    if (!containerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    const isAtBottom = scrollHeight - scrollTop <= clientHeight + 50;
    
    setIsUserScrolling(!isAtBottom);
  };

  // Auto-scroll to bottom when new report is completed, but only if user isn't scrolling
  useEffect(() => {
    if (!isUserScrolling && containerRef.current) {
      if (lastCompletedIndex !== undefined) {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
      }
    }
  }, [lastCompletedIndex, isUserScrolling]);

  return (
    <div className="space-y-2">
      <h3 className="px-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
        Deliverables & Artifacts
      </h3>

      <div 
        ref={containerRef}
        onScroll={handleScroll}
        className="space-y-1 max-h-[480px] overscroll-contain overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent"
      >
        {reportNodes.length === 0 && (
          <div className="p-3 rounded-xl border border-white/[0.04] bg-white/[0.02] text-xs text-gray-500">
            Reports will appear after backend agents run.
          </div>
        )}

        {reportNodes.map((node) => {
          const actualNodeIndex = workflowNodes.findIndex((item) => item.id === node.id);
          const isCompleted = completedNodeIds.includes(actualNodeIndex);
          const isProcessing = actualNodeIndex === activeNodeIndex;
          const reportKey = node.outputFile;
          const isSelected = selectedReportKey === reportKey;

          return (
            <button
              key={node.id}
              disabled={!isCompleted}
              onClick={() => setSelectedReportKey(reportKey)}
              className={cn(
                "w-full text-left p-3 rounded-xl border transition-all duration-300 flex items-center justify-between gap-3 cursor-pointer",
                !isCompleted
                  ? "bg-black/10 border-transparent text-gray-600 cursor-not-allowed opacity-60"
                  : isSelected
                    ? "bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border-purple-500/35 text-white"
                    : "bg-white/[0.02] border-white/[0.04] text-gray-300 hover:bg-white/[0.04] hover:text-white"
              )}
            >
              <div className="flex flex-col min-w-0">
                <span className="font-semibold text-xs truncate">{node.label}</span>
                <span className="text-[10px] text-gray-500 truncate">{node.description}</span>
              </div>

              <div className="flex items-center shrink-0">
                {isCompleted ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 drop-shadow-[0_0_5px_rgba(52,211,153,0.3)]" />
                ) : isProcessing ? (
                  <span className="flex h-2.5 w-2.5 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
                  </span>
                ) : (
                  <Lock className="h-3.5 w-3.5 text-gray-600" />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ReportCard;
