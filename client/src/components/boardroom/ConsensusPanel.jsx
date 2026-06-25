import React from "react";
import { useStudioStore } from "../../store/useStudioStore";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/Card";
import { advisorFallbacks } from "../../utils/advisors";
import { CheckCircle2, ShieldQuestion, Sparkles } from "lucide-react";

export const ConsensusPanel = () => {
  const { consensusScore, discussion } = useStudioStore();
  const advisorIds = [...new Set(discussion.filter((msg) => msg.senderId !== "user").map((msg) => msg.senderId))];
  const visibleAdvisors = advisorIds.length ? advisorIds : Object.keys(advisorFallbacks).slice(0, 4);

  const getStatusText = (score) => {
    if (!score) return "Awaiting Board Input";
    if (score >= 90) return "Ready for Market Launch";
    if (score >= 75) return "Approved with Minor Revisions";
    return "Needs Strategic Alignment";
  };

  return (
    <Card className="border-white/[0.06] bg-white/[0.01]">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-base">
          <Sparkles className="h-4.5 w-4.5 text-cyan-400" />
          Board Consensus Vetting
        </CardTitle>
        <CardDescription>Consolidated decision criteria status.</CardDescription>
      </CardHeader>

      <CardContent className="space-y-5">
        <div className="space-y-2">
          <div className="flex justify-between items-baseline">
            <span className="text-sm font-bold text-gray-200">{getStatusText(consensusScore)}</span>
            <span className="text-xl font-extrabold text-cyan-400">{consensusScore || 0}%</span>
          </div>
          <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 via-cyan-400 to-emerald-400 rounded-full transition-all duration-500"
              style={{ width: `${consensusScore || 0}%` }}
            />
          </div>
        </div>

        <div className="space-y-3.5 pt-2 border-t border-white/[0.05]">
          {visibleAdvisors.map((id) => {
            const member = advisorFallbacks[id] || { name: "Board Advisor", role: "Advisor", initials: "BA" };
            const latestMessage = [...discussion].reverse().find((msg) => msg.senderId === id);

            return (
              <div key={id} className="flex gap-3 items-start text-xs p-2 rounded-xl bg-white/[0.01] hover:bg-white/[0.02] border border-white/[0.02]">
                <span className="text-[10px] font-black bg-white/5 h-7 w-7 flex items-center justify-center rounded-lg border border-white/5">
                  {member.initials}
                </span>
                <div className="space-y-0.5">
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-bold text-white">{latestMessage?.name || member.name}</span>
                    <span className="text-[9px] text-gray-500 uppercase tracking-widest font-semibold">{latestMessage?.role || member.role}</span>
                  </div>
                  <p className="text-gray-400 leading-relaxed">
                    {latestMessage?.text || "Waiting for this advisor's backend response."}
                  </p>
                </div>

                <div className="ml-auto shrink-0 pt-0.5">
                  {(consensusScore || 0) >= 75 ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  ) : (
                    <ShieldQuestion className="h-4 w-4 text-amber-500" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default ConsensusPanel;
