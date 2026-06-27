import React from "react";
import { useStudioStore } from "../../store/useStudioStore";
import { FolderGit2, Percent, Sparkles, TrendingUp } from "lucide-react";
import { cn } from "../../utils/cn";
import { useNavigate, useLocation } from "react-router-dom";
import { getWorkflowNodes } from "../../utils/workflow";

export const Sidebar = () => {
  const { projects, selectedProjectId, selectProject } = useStudioStore();
  const navigate = useNavigate();
  const location = useLocation();

  const activeProject = projects.find((p) => p.id === selectedProjectId) || projects[0];

  if (!activeProject) return null;

  const totalNodes = Math.max(1, getWorkflowNodes(activeProject).length);
  const completionPercentage = Math.round(
    (activeProject.completedNodes.length / totalNodes) * 100
  );

  const handleSelectProject = (projId) => {
    selectProject(projId);
    // If user is not currently in the studio view, switch routes
    if (location.pathname !== "/studio") {
      navigate("/studio");
    }
  };

  return (
    <aside className={cn('fixed', 'left-0', 'top-16', 'bottom-0', 'z-40', 'w-80', 'border-r', 'border-white/[0.08]', 'bg-black/70', 'backdrop-blur-xl', 'flex', 'flex-col', 'hidden', 'lg:flex', 'overflow-hidden')}>
      {/* Active Project Card Summary */}
      <div className={cn('p-6', 'border-b', 'border-white/[0.08]', 'bg-white/[0.01]')}>
        <div className={cn('flex', 'items-center', 'gap-2', 'text-xs', 'font-semibold', 'uppercase', 'tracking-wider', 'text-purple-400', 'mb-2')}>
          <Sparkles className={cn('h-3.5', 'w-3.5')} />
          Active Workspace
        </div>
        <h2 className={cn('text-xl', 'font-bold', 'text-white', 'mb-1', 'truncate')}>{activeProject.name}</h2>
        <p className={cn('text-xs', 'text-gray-400', 'mb-4')}>{activeProject.industry}</p>

        {/* Progress Bar */}
        <div className={cn('space-y-1.5', 'mb-4')}>
          <div className={cn('flex', 'justify-between', 'text-xs', 'font-medium')}>
            <span className="text-gray-400">Workflow Progress</span>
            <span className={cn('text-purple-300', 'font-semibold')}>{completionPercentage}%</span>
          </div>
          <div className={cn('h-1.5', 'w-full', 'bg-white/5', 'rounded-full', 'overflow-hidden')}>
            <div 
              className={cn('h-full', 'bg-gradient-to-r', 'from-purple-500', 'to-cyan-400', 'rounded-full', 'transition-all', 'duration-500')}
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>

        {/* Venture Score */}
        <div className={cn('flex', 'items-center', 'justify-between', 'p-3', 'rounded-xl', 'bg-white/[0.03]', 'border', 'border-white/[0.06]')}>
          <div className={cn('flex', 'items-center', 'gap-2')}>
            <TrendingUp className={cn('h-4', 'w-4', 'text-cyan-400')} />
            <span className={cn('text-xs', 'text-gray-300', 'font-medium')}>Venture Score</span>
          </div>
          <span className={cn('text-lg', 'font-bold', 'text-transparent', 'bg-clip-text', 'bg-gradient-to-r', 'from-cyan-400', 'to-purple-400')}>
            {activeProject.score}/100
          </span>
        </div>
      </div>

      {/* Projects Switcher List */}
      <div className={cn('flex-1', 'overflow-y-auto', 'p-4', 'space-y-3')}>
        <h3 className={cn('px-2', 'text-xs', 'font-semibold', 'uppercase', 'tracking-wider', 'text-gray-500', 'flex', 'items-center', 'gap-1.5')}>
          <FolderGit2 className={cn('h-3.5', 'w-3.5')} />
          Select Project
        </h3>
        
        <div className="space-y-1">
          {projects.map((proj) => {
            const isSelected = proj.id === selectedProjectId;
            const projectTotalNodes = Math.max(1, getWorkflowNodes(proj).length);
            const completion = Math.round(
              (proj.completedNodes.length / projectTotalNodes) * 100
            );

            return (
              <button
                key={proj.id}
                onClick={() => handleSelectProject(proj.id)}
                className={cn(
                  "w-full text-left p-3 rounded-xl transition-all duration-300 border flex flex-col gap-1 cursor-pointer",
                  isSelected
                    ? "bg-white/[0.06] border-white/15 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]"
                    : "bg-transparent border-transparent text-gray-400 hover:bg-white/[0.02] hover:text-white"
                )}
              >
                <div className={cn('flex', 'justify-between', 'items-center', 'w-full')}>
                  <span className={cn('font-semibold', 'text-sm', 'truncate', 'pr-2')}>{proj.name}</span>
                  <span className={cn(
                    "text-[10px] px-2 py-0.5 rounded-full border",
                    proj.status === "Completed" 
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                      : proj.status === "Active"
                        ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/20"
                        : "bg-gray-500/10 text-gray-400 border-gray-500/20"
                  )}>
                    {proj.status}
                  </span>
                </div>
                <div className={cn('flex', 'justify-between', 'items-center', 'text-[11px]', 'text-gray-500', 'mt-1')}>
                  <span>{proj.industry}</span>
                  <span className={cn('flex', 'items-center', 'gap-0.5')}>
                    <Percent className={cn('h-3', 'w-3')} />
                    {completion}%
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
