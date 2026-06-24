import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

export const Card = React.forwardRef(({
  className,
  animate = false,
  glow = false,
  hoverGlow = false,
  children,
  ...props
}, ref) => {
  const Component = animate ? motion.div : "div";

  const glowStyles = glow 
    ? "shadow-[0_0_30px_rgba(99,102,241,0.15)] border-indigo-500/20" 
    : "border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.37)]";

  const hoverGlowStyles = hoverGlow 
    ? "hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] hover:border-cyan-500/30 transition-all duration-300"
    : "";

  return (
    <Component
      ref={ref}
      className={cn(
        "bg-white/[0.03] backdrop-blur-xl rounded-2xl border text-white overflow-hidden",
        glowStyles,
        hoverGlowStyles,
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
});

export const CardHeader = ({ className, children, ...props }) => (
  <div className={cn("p-6 flex flex-col gap-1.5", className)} {...props}>
    {children}
  </div>
);

export const CardTitle = ({ className, children, ...props }) => (
  <h3 className={cn("text-lg font-semibold leading-none tracking-tight text-white", className)} {...props}>
    {children}
  </h3>
);

export const CardDescription = ({ className, children, ...props }) => (
  <p className={cn("text-sm text-gray-400", className)} {...props}>
    {children}
  </p>
);

export const CardContent = ({ className, children, ...props }) => (
  <div className={cn("p-6 pt-0", className)} {...props}>
    {children}
  </div>
);

export const CardFooter = ({ className, children, ...props }) => (
  <div className={cn("p-6 pt-0 flex items-center border-t border-white/[0.05]", className)} {...props}>
    {children}
  </div>
);

Card.displayName = "Card";
export default Card;
