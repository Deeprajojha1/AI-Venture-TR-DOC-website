import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

export const ScorePreview = ({ score = 0, size = "md" }) => {
  // Determine score color
  const getColor = (s) => {
    if (s >= 85) return "text-emerald-400 stroke-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]";
    if (s >= 70) return "text-amber-400 stroke-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]";
    return "text-rose-400 stroke-rose-400 drop-shadow-[0_0_8px_rgba(248,113,113,0.5)]";
  };

  const dimensions = {
    sm: { sizePx: 50, strokeWidth: 4, textStyle: "text-xs font-bold" },
    md: { sizePx: 80, strokeWidth: 6, textStyle: "text-lg font-bold" },
    lg: { sizePx: 120, strokeWidth: 8, textStyle: "text-2xl font-black" }
  };

  const current = dimensions[size] || dimensions.md;
  const radius = (current.sizePx - current.strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center" style={{ width: current.sizePx, height: current.sizePx }}>
      <svg className="transform -rotate-90 w-full h-full">
        {/* Track circle */}
        <circle
          cx={current.sizePx / 2}
          cy={current.sizePx / 2}
          r={radius}
          className="stroke-white/5 fill-transparent"
          strokeWidth={current.strokeWidth}
        />
        {/* Animated indicator circle */}
        <motion.circle
          cx={current.sizePx / 2}
          cy={current.sizePx / 2}
          r={radius}
          className={cn("fill-transparent transition-all duration-1000 ease-out", getColor(score))}
          strokeWidth={current.strokeWidth}
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          strokeLinecap="round"
        />
      </svg>
      {/* Centered text overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={cn("text-white", current.textStyle)}>
          {score}
        </span>
        {size === "lg" && <span className="text-[10px] text-gray-500 uppercase tracking-widest -mt-1 font-semibold">Score</span>}
      </div>
    </div>
  );
};

export default ScorePreview;
