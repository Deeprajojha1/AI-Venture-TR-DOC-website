import React from "react";
import { useStudioStore } from "../../store/useStudioStore";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/Card";
import { EXECUTIVE_MEMBERS } from "../../data/dummyData";
import { CheckCircle2, ShieldQuestion, Sparkles } from "lucide-react";

export const ConsensusPanel = () => {
  const { consensusScore } = useStudioStore();

  const getStatusText = (score) => {
    if (score >= 90) return "Ready for Market Launch";
    if (score >= 75) return "Approved with Minor Revisions";
    return "Needs Strategic Alignment";
  };

  const getDirectorStances = (score) => {
    if (score >= 90) {
      return {
        ceo: "Strategy is bulletproof. Proceed to investor pitch deck.",
        cto: "Architecture scales perfectly. Dev stack approved.",
        cmo: "Landing pages tested. High organic interest.",
        cfo: "Unit economics look solid. Burn rate under control."
      };
    }
    if (score >= 75) {
      return {
        ceo: "Strong vision, but check the GTM channel efficiency.",
        cto: "Tech stack is verified, but set API caps to limit token costs.",
        cmo: "Social proof channels look promising. Launch Product Hunt early.",
        cfo: "Initial projections check out, but audit the SaaS lifetime value."
      };
    }
    return {
      ceo: "Mission statement is clear, but competitive moats are weak.",
      cto: "Architecture lacks clear disaster recovery options.",
      cmo: "GTM campaign lacks a viral loop. Budget allocation is too high.",
      cfo: "Estimated CAC is too high. 3-year ARR is over-optimistic."
    };
  };

  const stances = getDirectorStances(consensusScore);

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
        {/* Consensus Score Indicator */}
        <div className="space-y-2">
          <div className="flex justify-between items-baseline">
            <span className="text-sm font-bold text-gray-200">{getStatusText(consensusScore)}</span>
            <span className="text-xl font-extrabold text-cyan-400">{consensusScore}%</span>
          </div>
          <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 via-cyan-400 to-emerald-400 rounded-full transition-all duration-500"
              style={{ width: `${consensusScore}%` }}
            />
          </div>
        </div>

        {/* Member Stances List */}
        <div className="space-y-3.5 pt-2 border-t border-white/[0.05]">
          {EXECUTIVE_MEMBERS.map((member) => {
            const stance = stances[member.id];
            const isCritical = consensusScore < 75;

            return (
              <div key={member.id} className="flex gap-3 items-start text-xs p-2 rounded-xl bg-white/[0.01] hover:bg-white/[0.02] border border-white/[0.02]">
                <span className="text-lg bg-white/5 h-7 w-7 flex items-center justify-center rounded-lg border border-white/5">{member.avatar}</span>
                <div className="space-y-0.5">
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-bold text-white">{member.name}</span>
                    <span className="text-[9px] text-gray-500 uppercase tracking-widest font-semibold">{member.role}</span>
                  </div>
                  <p className="text-gray-400 leading-relaxed">{stance}</p>
                </div>

                <div className="ml-auto shrink-0 pt-0.5">
                  {consensusScore >= 75 ? (
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
