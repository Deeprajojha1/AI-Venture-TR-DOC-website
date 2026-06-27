import React from "react";
import { useStudioStore } from "../store/useStudioStore";
import ProjectForm from "../components/dashboard/ProjectForm";
import ProjectCard from "../components/dashboard/ProjectCard";
import { FolderGit2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export const DashboardPage = () => {
  const { projects } = useStudioStore();

  return (
    <div className="p-6 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-purple-400" />
            Founder Workspace
          </h1>
          <p className="text-sm text-gray-400">
            Submit new concepts, track current projects, and monitor AI co-founder analytics.
          </p>
        </div>
      </div>

      {/* Main Grid: Form Left, Projects Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Left Column: Submission Form */}
        <div className="lg:col-span-1">
          <ProjectForm />
        </div>

        {/* Right Column: Active Projects */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2 px-2">
            <FolderGit2 className="h-5 w-5 text-gray-500" />
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Active Ventures</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map((proj) => (
              <ProjectCard key={proj.id} project={proj} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardPage;
