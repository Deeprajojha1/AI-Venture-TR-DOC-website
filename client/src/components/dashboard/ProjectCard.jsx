import React from "react";
import { Card, CardContent } from "../ui/Card";
import Badge from "../ui/Badge";
import ScorePreview from "./ScorePreview";
import Button from "../ui/Button";
import { ArrowUpRight, Calendar, Users } from "lucide-react";
import { useStudioStore } from "../../store/useStudioStore";
import { useNavigate } from "react-router-dom";

export const ProjectCard = ({ project }) => {
  const { selectProject } = useStudioStore();
  const navigate = useNavigate();

  const handleOpenStudio = () => {
    selectProject(project.id);
    navigate("/studio");
  };

  const getStatusVariant = (status) => {
    switch (status) {
      case "Completed": return "success";
      case "Active": return "primary";
      default: return "outline";
    }
  };

  return (
    <Card 
      animate={true} 
      hoverGlow={true}
      className="group relative border-white/[0.06] hover:border-white/15 bg-white/[0.02]"
    >
      <CardContent className="p-6">
        {/* Glowing top line on hover */}
        <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-violet-500 via-cyan-400 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Header: Title & Status */}
        <div className="flex justify-between items-start gap-4 mb-4">
          <div>
            <h4 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors duration-300 truncate max-w-[200px]">
              {project.name}
            </h4>
            <span className="text-xs text-purple-400 font-semibold">{project.industry}</span>
          </div>
          <Badge variant={getStatusVariant(project.status)}>
            {project.status}
          </Badge>
        </div>

        {/* Short description */}
        <p className="text-sm text-gray-400 line-clamp-2 mb-5 min-h-[40px]">
          {project.idea}
        </p>

        {/* Specifications metadata */}
        <div className="grid grid-cols-2 gap-3 mb-6 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] text-xs">
          <div className="flex items-center gap-1.5 text-gray-400">
            <Users className="h-3.5 w-3.5 text-cyan-400" />
            <span className="truncate">{project.targetUsers}</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-400 justify-end">
            <Calendar className="h-3.5 w-3.5 text-indigo-400" />
            <span>{project.timeline}</span>
          </div>
        </div>

        {/* Bottom row: Score & Launch Button */}
        <div className="flex items-center justify-between pt-4 border-t border-t-white/[0.05]">
          <div className="flex items-center gap-3">
            <ScorePreview score={project.score} size="sm" />
            <div>
              <span className="block text-[10px] uppercase text-gray-500 tracking-wider font-semibold">Venture Score</span>
              <span className="text-xs font-semibold text-gray-300">
                {project.score >= 85 ? "Excellent Potential" : project.score >= 70 ? "Healthy Model" : "Needs Vetting"}
              </span>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleOpenStudio}
            className="gap-1 border-white/10 hover:border-purple-500/40 hover:bg-purple-500/10 cursor-pointer"
          >
            Open Studio
            <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
