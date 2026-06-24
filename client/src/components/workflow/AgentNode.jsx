import React from "react";
import { Handle, Position } from "@xyflow/react";
import { cn } from "../../utils/cn";
import { Check, Loader2 } from "lucide-react";

export const AgentNode = ({ data }) => {
  const { label, description, status } = data; // status: "completed" | "active" | "pending"

  const statusStyles = {
    completed: "border-emerald-500/50 bg-emerald-500/10 text-white shadow-[0_0_20px_rgba(16,185,129,0.25)]",
    active: "border-cyan-500 bg-cyan-950/20 text-cyan-200 shadow-[0_0_25px_rgba(6,182,212,0.4)] animate-pulse",
    pending: "border-white/5 bg-white/[0.02] text-gray-500 opacity-60"
  };

  return (
    <div className={cn(
      "px-4 py-3 rounded-2xl border backdrop-blur-xl w-48 text-left transition-all duration-500 select-none",
      statusStyles[status] || statusStyles.pending
    )}>
      {/* Input Handle */}
      <Handle 
        type="target" 
        position={Position.Left} 
        className={cn(
          "w-2.5 h-2.5 !bg-white/10 !border-white/20",
          status === "completed" && "!bg-emerald-400 !border-emerald-500/40",
          status === "active" && "!bg-cyan-400 !border-cyan-400"
        )}
      />

      <div className="flex items-center justify-between gap-1">
        <h5 className="font-bold text-xs truncate max-w-[120px]">{label}</h5>
        <div className="shrink-0">
          {status === "completed" && (
            <div className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-black">
              <Check className="h-2.5 w-2.5 stroke-[4px]" />
            </div>
          )}
          {status === "active" && (
            <Loader2 className="h-3.5 w-3.5 animate-spin text-cyan-400" />
          )}
        </div>
      </div>
      
      <p className="text-[10px] text-gray-400 mt-1 line-clamp-1">
        {status === "pending" ? "Awaiting Pipeline" : description}
      </p>

      {/* Output Handle */}
      <Handle 
        type="source" 
        position={Position.Right} 
        className={cn(
          "w-2.5 h-2.5 !bg-white/10 !border-white/20",
          status === "completed" && "!bg-emerald-400 !border-emerald-500/40",
          status === "active" && "!bg-cyan-400 !border-cyan-400"
        )}
      />
    </div>
  );
};

export default AgentNode;
