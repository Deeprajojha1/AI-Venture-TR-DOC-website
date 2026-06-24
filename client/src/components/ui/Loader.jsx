import React from "react";
import { cn } from "../../utils/cn";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

// 1. ClipLoader: Inline Spinner
export const ClipLoader = ({
  className,
  size = "md",
  color = "indigo"
}) => {
  const sizes = {
    xs: "h-3.5 w-3.5 border",
    sm: "h-5 w-5 border-2",
    md: "h-8 w-8 border-2",
    lg: "h-12 w-12 border-3"
  };

  const colors = {
    indigo: "border-indigo-500/20 border-t-indigo-500",
    cyan: "border-cyan-500/20 border-t-cyan-400",
    purple: "border-purple-500/20 border-t-purple-400",
    white: "border-white/20 border-t-white"
  };

  return (
    <div
      className={cn(
        "animate-spin rounded-full border-t-solid",
        sizes[size],
        colors[color],
        className
      )}
    />
  );
};

// 2. PanelLoader: Card or Panel Level Overlay Spinner
export const PanelLoader = ({
  className,
  message = "Processing models..."
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={cn(
        "absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/60 backdrop-blur-md rounded-2xl border border-white/5",
        className
      )}
    >
      <div className="flex flex-col items-center gap-3">
        <div className="relative flex items-center justify-center">
          <div className="absolute animate-ping h-8 w-8 rounded-full bg-cyan-500/30 opacity-75" />
          <ClipLoader size="md" color="cyan" />
        </div>
        <span className="text-xs font-bold text-cyan-300 uppercase tracking-widest animate-pulse">
          {message}
        </span>
      </div>
    </motion.div>
  );
};

// 3. PageLoader: Full Screen Router Spinner
export const PageLoader = ({
  message = "Syncing AI Workspace..."
}) => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white">
      {/* Background Decoratives */}
      <div className="absolute top-[-10%] right-[-10%] h-[350px] w-[350px] rounded-full bg-violet-600/10 blur-[100px]" />
      <div className="absolute bottom-[-10%] left-[-10%] h-[350px] w-[350px] rounded-full bg-cyan-500/10 blur-[100px]" />

      <div className="flex flex-col items-center gap-4 relative z-10">
        <motion.div
          animate={{ scale: [1, 1.05, 1], rotate: [0, 5, -5, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/[0.03] border border-white/10 shadow-2xl"
        >
          <Sparkles className="h-8 w-8 text-cyan-400 drop-shadow-[0_0_12px_rgba(6,182,212,0.5)]" />
        </motion.div>
        
        <div className="flex flex-col items-center gap-1.5 mt-2">
          <ClipLoader size="sm" color="purple" className="mb-1" />
          <span className="text-xs font-black uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500">
            {message}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ClipLoader;
