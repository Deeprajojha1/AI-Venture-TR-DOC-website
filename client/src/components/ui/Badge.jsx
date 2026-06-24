import React from "react";
import { cn } from "../../utils/cn";

export const Badge = ({
  className,
  variant = "primary",
  children,
  ...props
}) => {
  const baseStyles = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-all duration-300 border backdrop-blur-md";
  
  const variants = {
    primary: "bg-indigo-500/10 text-indigo-300 border-indigo-500/30 shadow-[0_0_10px_rgba(99,102,241,0.1)]",
    success: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.1)]",
    warning: "bg-amber-500/10 text-amber-300 border-amber-500/30 shadow-[0_0_10px_rgba(245,158,11,0.1)]",
    danger: "bg-rose-500/10 text-rose-300 border-rose-500/30 shadow-[0_0_10px_rgba(244,63,94,0.1)]",
    info: "bg-cyan-500/10 text-cyan-300 border-cyan-500/30 shadow-[0_0_10px_rgba(6,182,212,0.1)]",
    outline: "bg-transparent text-gray-300 border-white/20"
  };

  return (
    <span className={cn(baseStyles, variants[variant], className)} {...props}>
      {children}
    </span>
  );
};

export default Badge;
