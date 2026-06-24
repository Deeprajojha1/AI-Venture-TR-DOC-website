import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

export const Button = React.forwardRef(({
  className,
  variant = "primary",
  size = "md",
  isLoading = false,
  children,
  ...props
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50 disabled:opacity-50 disabled:pointer-events-none cursor-pointer";
  
  const variants = {
    primary: "bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 hover:from-violet-500 hover:via-indigo-500 hover:to-cyan-400 text-white shadow-[0_0_15px_rgba(99,102,241,0.4)] border border-violet-500/20",
    secondary: "bg-white/10 hover:bg-white/15 text-white border border-white/10 backdrop-blur-md hover:border-white/20",
    outline: "bg-transparent border border-white/20 text-white hover:bg-white/5 hover:border-white/40",
    glow: "bg-transparent border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 shadow-[0_0_15px_rgba(6,182,212,0.15)] hover:shadow-[0_0_20px_rgba(6,182,212,0.35)]",
    danger: "bg-red-500/20 border border-red-500/30 text-red-200 hover:bg-red-500/30",
    ghost: "bg-transparent hover:bg-white/5 text-gray-400 hover:text-white"
  };

  const sizes = {
    sm: "px-3.5 py-1.5 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "px-7 py-3 text-base"
  };

  return (
    <motion.button
      ref={ref}
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.98 }}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Loading...
        </span>
      ) : children}
    </motion.button>
  );
});

Button.displayName = "Button";
export default Button;
