import React from "react";
import { Card, CardContent } from "../ui/Card";
import { Cpu, Hourglass, Percent, ShieldCheck } from "lucide-react";

export const AnalyticsCards = ({ analytics }) => {
  const avgRuntime = analytics?.averageRuntime ? `${Math.round(analytics.averageRuntime / 1000)}s` : "0s";
  const completionRate = `${analytics?.completionRate || 0}%`;
  const tokenUsage = (analytics?.tokenUsage || 0).toLocaleString();
  const mostUsedAgent = analytics?.mostUsedAgent || "None";

  const cardData = [
    {
      title: "Average Agent Runtime",
      value: avgRuntime,
      icon: Hourglass,
      color: "text-violet-400 border-violet-500/20 shadow-[0_0_15px_rgba(139,92,246,0.05)]",
      desc: "Time to compile 12 pipeline nodes"
    },
    {
      title: "Task Completion Rate",
      value: completionRate,
      icon: Percent,
      color: "text-emerald-400 border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.05)]",
      desc: "Agent audit approvals success"
    },
    {
      title: "Accumulated Token Usage",
      value: tokenUsage,
      icon: Cpu,
      color: "text-cyan-400 border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.05)]",
      desc: "Context tokens used by completed runs"
    },
    {
      title: "Most Active Agent",
      value: mostUsedAgent,
      icon: ShieldCheck,
      color: "text-amber-400 border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.05)]",
      desc: "Highest completed run count"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cardData.map((card, idx) => {
        const Icon = card.icon;

        return (
          <Card key={idx} hoverGlow={true} className={`border-white/[0.06] bg-white/[0.01] ${card.color}`}>
            <CardContent className="p-5 flex flex-col gap-2">
              <div className="flex justify-between items-center w-full">
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">{card.title}</span>
                <Icon className="h-5 w-5" />
              </div>
              <div className="text-2xl font-black text-white tracking-tight">{card.value}</div>
              <p className="text-[10px] text-gray-400">{card.desc}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default AnalyticsCards;
