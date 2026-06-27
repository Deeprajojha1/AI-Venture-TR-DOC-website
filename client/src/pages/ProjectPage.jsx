import React, { useState, useEffect, useMemo } from "react";
import { useStudioStore } from "../store/useStudioStore";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/Card";
import Button from "../components/ui/Button";
import AgentFlow from "../components/workflow/AgentFlow";
import WorkflowStatus from "../components/workflow/WorkflowStatus";
import ApprovalPanel from "../components/reports/ApprovalPanel";
import ReportCard from "../components/reports/ReportCard";
import ReportViewer from "../components/reports/ReportViewer";
import { getReportKey, getWorkflowNodes } from "../utils/workflow";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts";
import { ChevronRight, FileJson, Mail, Sparkles } from "lucide-react";
import { api } from "../services/api";

export const ProjectPage = () => {
  const { projects, selectedProjectId, reportsByProject } = useStudioStore();
  const [selectedReportKey, setSelectedReportKey] = useState(null);
  const [actionStatus, setActionStatus] = useState("");

  const project = projects.find((p) => p.id === selectedProjectId) || projects[0];
  const workflowNodes = useMemo(() => getWorkflowNodes(project), [project]);
  const backendReports = useMemo(() => reportsByProject[project?.id] || [], [reportsByProject, project?.id]);
  const selectedBackendReport = backendReports.find((report) => getReportKey(report) === selectedReportKey);
  const selectedReportContent = selectedBackendReport?.content || "Run the workflow to generate this report.";

  useEffect(() => {
    if (!project) return;

    const latestReport = [...backendReports].reverse().find((report) => getReportKey(report));
    const firstReportNode = workflowNodes.find((node) => node.outputFile);
    setSelectedReportKey(getReportKey(latestReport) || firstReportNode?.outputFile || null);
  }, [backendReports, project, workflowNodes]);

  if (!project) {
    return (
      <div className="p-8 text-center text-gray-500">
        No active project found. Switch to the Dashboard to add one.
      </div>
    );
  }

  // Format health data for Recharts Radar
  const radarData = [
    { subject: "Market Potential", value: project.healthMetrics.marketPotential },
    { subject: "Feasibility", value: project.healthMetrics.technicalFeasibility },
    { subject: "Viability", value: project.healthMetrics.financialViability },
    { subject: "Readiness", value: project.healthMetrics.executionReadiness },
    { subject: "Competition", value: project.healthMetrics.competitiveness },
    { subject: "Scalability", value: project.healthMetrics.scalability }
  ];

  const handleExport = (format) => {
    if (!selectedBackendReport) return;
    const reportTitle = (selectedBackendReport.outputFile || selectedReportKey || "report").replace(/_/g, " ").toUpperCase();
    const content = selectedReportContent;
    
    if (format === "json") {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ title: reportTitle, body: content }, null, 2));
      const downloadAnchor = document.createElement("a");
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `${selectedBackendReport.outputFile || "report"}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    } else {
      // Export markdown / text
      const dataStr = "data:text/plain;charset=utf-8," + encodeURIComponent(content);
      const downloadAnchor = document.createElement("a");
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", selectedBackendReport.outputFile || `report.${format === "md" ? "md" : "txt"}`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    }
  };

  const handlePdfExport = () => {
    if (!project?.id) return;
    window.open(`${import.meta.env.VITE_API_BASE_URL || "/api"}/exports/${project.id}/pdf`, "_blank", "noopener,noreferrer");
  };

  const handleEmail = async () => {
    if (!project?.id) return;
    setActionStatus("Sending project email...");
    try {
      await api.emailProject(project.id);
      setActionStatus("Project email sent.");
    } catch (error) {
      setActionStatus(error.message);
    }
  };

  return (
    <div className="flex min-h-full flex-col gap-6 p-6 lg:h-full lg:min-h-0 lg:overflow-hidden">
      {/* Title Header */}
      <div className="grid shrink-0 grid-cols-1 gap-5 rounded-2xl border border-white/[0.06] bg-white/[0.01] p-6 backdrop-blur-md xl:grid-cols-[minmax(0,1fr)_auto] xl:items-center">
        <div className="min-w-0 space-y-2">
          <div className="flex min-w-0 flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-widest text-purple-400">
            <span className="shrink-0">Project Workspace</span>
            <ChevronRight className="h-3 w-3" />
            <span className="min-w-0 truncate text-cyan-400">{project.industry}</span>
          </div>
          <h2 className="break-words text-3xl font-black leading-tight text-white">{project.name}</h2>
          <p className="max-w-5xl text-sm leading-relaxed text-gray-400 line-clamp-3">{project.idea}</p>
        </div>

        {/* Global Export Buttons */}
        <div className="flex min-w-0 flex-wrap items-center gap-2 xl:w-[420px] xl:justify-end">
          <Button variant="ghost" size="sm" onClick={() => handleExport("md")} className="gap-1.5 border border-white/5 bg-white/5 cursor-pointer">
            Export MD
          </Button>
          <Button variant="ghost" size="sm" onClick={() => handleExport("json")} className="gap-1.5 border border-white/5 bg-white/5 cursor-pointer">
            <FileJson className="h-4 w-4" />
            JSON
          </Button>
          <Button variant="ghost" size="sm" onClick={handlePdfExport} className="gap-1.5 border border-white/5 bg-white/5 cursor-pointer">
            PDF
          </Button>
          <Button variant="ghost" size="sm" onClick={handleEmail} className="gap-1.5 border border-white/5 bg-white/5 cursor-pointer">
            <Mail className="h-4 w-4" />
            Email
          </Button>
          {actionStatus && <span className="min-w-0 flex-1 basis-full truncate text-xs text-gray-400 xl:text-right">{actionStatus}</span>}
        </div>
      </div>

      <div className="min-h-0 space-y-6 lg:flex-1 lg:overflow-y-auto lg:overscroll-contain lg:pr-1 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        {/* Main Grid: Flow & Radar */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* React Flow pipeline (Left/Center) */}
        <div className="xl:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Autonomous Agent Graph</h3>
            <span className="text-xs text-cyan-400 font-semibold px-2 py-0.5 rounded-full bg-cyan-400/10 border border-cyan-400/20">
              Vetting Node: {workflowNodes[project.currentNodeIndex]?.label || "Complete"}
            </span>
          </div>
          
          <AgentFlow workflowNodes={workflowNodes} completedNodes={project.completedNodes} currentNodeIndex={project.currentNodeIndex} />
          
          <WorkflowStatus workflowNodes={workflowNodes} currentNodeIndex={project.currentNodeIndex} />
        </div>

        {/* Radar Health Chart (Right) */}
        <div className="xl:col-span-1 space-y-4">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Startup Health Matrix</h3>
          
          <Card className="border-white/[0.06] bg-white/[0.01] h-[636px] flex flex-col justify-center items-center p-6">
            <CardHeader className="text-center w-full self-start pb-2">
              <CardTitle className="text-base text-cyan-400 flex items-center justify-center gap-1.5">
                <Sparkles className="h-4 w-4" />
                Venture Potential Radar
              </CardTitle>
              <CardDescription>Multi-agent evaluation score: {project.score}/100</CardDescription>
            </CardHeader>
            
            <CardContent className="w-full flex-1 flex items-center justify-center relative">
              <ResponsiveContainer width="100%" height={260}>
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                  <PolarGrid stroke="rgba(255,255,255,0.06)" />
                  <PolarAngleAxis dataKey="subject" stroke="#9ca3af" fontSize={10} />
                  <Radar
                    name="Startup Potential"
                    dataKey="value"
                    stroke="#8b5cf6"
                    fill="#8b5cf6"
                    fillOpacity={0.25}
                  />
                </RadarChart>
              </ResponsiveContainer>

              {/* Detail list of scores */}
              <div className="absolute bottom-2 left-0 right-0 grid grid-cols-2 gap-3 text-xs px-2">
                {radarData.map((d, i) => (
                  <div key={i} className="flex justify-between items-center p-2 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                    <span className="text-gray-400 text-[10px] uppercase font-bold truncate max-w-[90px]">{d.subject}</span>
                    <span className="font-extrabold text-white text-right">{d.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        </div>

        {/* Approval control board */}
        <ApprovalPanel project={project} workflowNodes={workflowNodes} />

        {/* Reports Workspace: Deliverables menu & Markdown Viewer */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        
        {/* Reports Navigation Sidebar */}
        <div className="lg:col-span-1">
          <ReportCard
            completedNodeIds={project.completedNodes}
            activeNodeIndex={project.currentNodeIndex}
            workflowNodes={workflowNodes}
            selectedReportKey={selectedReportKey}
            setSelectedReportKey={setSelectedReportKey}
          />
        </div>

        {/* Markdown Document Viewer */}
        <div className="lg:col-span-3">
          <ReportViewer
            title={selectedBackendReport?.outputFile || selectedReportKey || "No report selected"}
            content={selectedReportContent}
            onExport={() => handleExport("md")}
          />
        </div>

        </div>
      </div>

    </div>
  );
};

export default ProjectPage;
