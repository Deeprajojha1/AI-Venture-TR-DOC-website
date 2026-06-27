import { useStudioStore } from "../store/useStudioStore";
import QuestionInput from "../components/boardroom/QuestionInput";
import DiscussionThread from "../components/boardroom/DiscussionThread";
import ConsensusPanel from "../components/boardroom/ConsensusPanel";
import Button from "../components/ui/Button";
import { Card, CardContent } from "../components/ui/Card";
import { HelpCircle, RefreshCw, Users } from "lucide-react";

export const BoardroomPage = () => {
  const { resetBoardroom, discussion } = useStudioStore();

  return (
    <div className="flex min-h-full flex-col gap-6 p-6 lg:h-full lg:min-h-0 lg:overflow-hidden">
      {/* Boardroom Header */}
      <div className="flex shrink-0 flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-6 rounded-2xl bg-white/[0.01] border border-white/[0.06] backdrop-blur-md">
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

      {/* Main Boardroom Workspace grid */}
      <div className="grid min-h-0 flex-1 grid-cols-1 gap-6 lg:grid-cols-3 lg:items-stretch">
        
        {/* Left Column: Discussion Thread & Chat Input */}
        <div className="flex min-h-0 flex-col gap-4 lg:col-span-2">
          <div className="flex shrink-0 items-center justify-between px-2">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Live Discussion Thread</h3>
            <span className="text-[11px] text-gray-500 font-semibold">{discussion.length} Messages logged</span>
          </div>

          <DiscussionThread />

          <QuestionInput />
        </div>

        {/* Right Column: Consensus Alignment Dashboard */}
        <div className="min-h-0 lg:col-span-1 lg:overflow-y-auto lg:pr-1 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
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
                  "How should we structure pricing tiers?",
                  "Which database model fits this product?",
                  "How should we prepare for seed funding?"
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
    </div>
  );
};

export default BoardroomPage;
