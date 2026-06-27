import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { BarChart3, LayoutDashboard, MessageSquare, PlayCircle } from "lucide-react";
import { cn } from "../../utils/cn";

export const WorkspaceTabs = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const tabs = [
    { id: "dashboard", path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "studio", path: "/studio", label: "Studio", icon: PlayCircle },
    { id: "boardroom", path: "/boardroom", label: "Boardroom", icon: MessageSquare },
    { id: "analytics", path: "/analytics", label: "Analytics", icon: BarChart3 }
  ];

  return (
    <div className="flex-shrink-0 flex justify-center sm:justify-start w-full border-b border-white/[0.08] bg-black/10 px-6 py-2">
      <nav className="flex space-x-1.5 p-1 rounded-xl bg-white/[0.03] border border-white/[0.05] backdrop-blur-md">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          // Check if active based on path prefix matching
          const isActive = currentPath.startsWith(tab.path);

          return (
            <NavLink
              key={tab.id}
              to={tab.path}
              className={cn(
                "relative flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-colors duration-300 cursor-pointer text-gray-400 hover:text-white",
                isActive && "text-white"
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="activeTabPill"
                  className="absolute inset-0 rounded-lg bg-gradient-to-r from-violet-600/35 to-cyan-500/35 border border-white/[0.12] shadow-[0_2px_10px_rgba(99,102,241,0.15)]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <Icon className="h-4 w-4 relative z-10" />
              <span className="relative z-10">{tab.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
};

export default WorkspaceTabs;
