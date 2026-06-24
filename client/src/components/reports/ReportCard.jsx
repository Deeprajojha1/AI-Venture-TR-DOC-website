import React from "react";
import { WORKFLOW_NODES_LIST } from "../../data/dummyData";
import { CheckCircle2, Lock, Sparkles } from "lucide-react";
import { cn } from "../../utils/cn";

export const ReportCard = ({ completedNodeIds, activeNodeIndex, selectedReportKey, setSelectedReportKey }) => {
  // Mapping workflow node index to dummy report key names
  const reportKeys = [
    "market_report",       // Node 1: Market Research
    "competitor_report",   // Node 2: Competitor Analysis
    "opportunity_report",  // Node 3: Opportunity Discovery
    "product_strategy",    // Node 4: Product Strategy
    "prd",                 // Node 5: PRD
    "architecture",        // Node 6: Architecture
    "revenue_model",       // Node 7: Revenue Model
    "forecast",            // Node 8: Forecast
    "gtm",                 // Node 9: GTM
    "investor_readiness",  // Node 10: Investor Readiness
    "pitch_deck"           // Node 11: Pitch Deck
  ];

  // Idea node (index 0) has no heavy report; reports start from index 1.
  return (
    <div className="space-y-2">
      <h3 className="px-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
        Deliverables & Artifacts
      </h3>

      <div className="space-y-1 max-h-[480px] overflow-y-auto pr-1">
        {WORKFLOW_NODES_LIST.slice(1).map((node, idx) => {
          const actualNodeIndex = idx + 1; // since we sliced off Idea (index 0)
          const isCompleted = completedNodeIds.includes(actualNodeIndex);
          const isProcessing = actualNodeIndex === activeNodeIndex;
          const reportKey = reportKeys[idx];
          
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
