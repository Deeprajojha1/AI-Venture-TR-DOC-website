import React, { useState } from "react";
import { useStudioStore } from "../store/useStudioStore";
import QuestionInput from "../components/boardroom/QuestionInput";
import DiscussionThread from "../components/boardroom/DiscussionThread";
import ConsensusPanel from "../components/boardroom/ConsensusPanel";
import Button from "../components/ui/Button";
import { Card, CardContent } from "../components/ui/Card";
import { AlertOctagon, HelpCircle, RefreshCw, ShieldAlert, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const BoardroomPage = () => {
  const { resetBoardroom, discussion } = useStudioStore();
  const [showErrorCard, setShowErrorCard] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-6 space-y-6"
    >
      {/* Boardroom Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-6 rounded-2xl bg-white/[0.01] border border-white/[0.06] backdrop-blur-md">
        <div className="space-y-1">
          <h2 className="text-3xl font-black text-white flex items-center gap-2.5">
            <Users className="h-7 w-7 text-purple-400" />
            Executive Boardroom
          </h2>
          <p className="text-sm text-gray-400">
            Consult Elena (CEO), Marcus (CTO), Sarah (CMO), and David (CFO) for automated strategic advice.
          </p>
        </div>

        {/* Action Toggles */}
        <div className="flex items-center gap-2.5 self-end sm:self-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowErrorCard(!showErrorCard)}
            className={`gap-1.5 border border-white/5 bg-white/5 cursor-pointer text-xs ${showErrorCard ? "text-red-400 border-red-500/25" : ""}`}
          >
            <ShieldAlert className="h-4 w-4" />
            {showErrorCard ? "Hide Error state" : "Simulate Error State"}
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={resetBoardroom}
            className="gap-1.5 py-2 px-3 text-xs font-semibold cursor-pointer"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Reset Thread
          </Button>
        </div>
      </div>

      {/* Elegant Error State Card (if toggled) */}
      <AnimatePresence>
        {showErrorCard && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="overflow-hidden"
          >
            <Card className="border-red-500/20 bg-gradient-to-r from-red-950/20 via-black to-red-950/10 shadow-[0_0_30px_rgba(239,68,68,0.1)] relative">
              <div className="absolute top-0 bottom-0 left-0 w-[4px] bg-red-500" />
              <CardContent className="p-5 flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="flex gap-3.5 items-start text-left">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 text-red-400 border border-red-500/25 shrink-0">
                    <AlertOctagon className="h-5.5 w-5.5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-red-200">Simulation Error: Financial Threshold Violation</h4>
                    <p className="text-xs text-gray-400 mt-1 leading-relaxed max-w-xl">
                      CFO David Kross has flagged that the current Customer Acquisition Cost (CAC) model exceeds the LTV ratio boundary (LTV/CAC ratio of 1.4x is below the acceptable 3.0x threshold). Agent auto-analysis is paused.
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 w-full sm:w-auto shrink-0 justify-end">
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => {
                      alert("Regenerating financial assumptions using premium values...");
                      setShowErrorCard(false);
                    }}
                    className="text-xs py-2 px-3 font-semibold cursor-pointer"
                  >
                    Auto-Adjust Projections
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Boardroom Workspace grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Left Column: Discussion Thread & Chat Input */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Live Discussion Thread</h3>
            <span className="text-[11px] text-gray-500 font-semibold">{discussion.length} Messages logged</span>
          </div>

          <DiscussionThread />

          <QuestionInput />
        </div>

        {/* Right Column: Consensus Alignment Dashboard */}
        <div className="lg:col-span-1">
          <ConsensusPanel />

          {/* Quick Consultation Suggestions */}
          <Card className="border-white/[0.06] bg-white/[0.01] mt-4">
            <CardContent className="p-4 space-y-3">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                <HelpCircle className="h-4 w-4 text-purple-400" />
                Consultation Prompts
              </h4>
              <div className="space-y-2">
                {[
                  "How should we structure our SaaS pricing tiers?",
                  "Which database models Marcus recommends for SSE streaming?",
                  "How should we raise our seed funding SAFE round?"
                ].map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      useStudioStore.getState().askBoardroom(prompt);
                    }}
                    className="w-full text-left p-2.5 text-xs text-gray-400 hover:text-white rounded-xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] transition-all cursor-pointer truncate"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </motion.div>
  );
};

export default BoardroomPage;
