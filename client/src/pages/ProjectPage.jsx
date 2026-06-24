import React, { useState, useEffect } from "react";
import { useStudioStore } from "../store/useStudioStore";
import { DUMMY_REPORTS, WORKFLOW_NODES_LIST } from "../data/dummyData";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/Card";
import Button from "../components/ui/Button";
import AgentFlow from "../components/workflow/AgentFlow";
import WorkflowStatus from "../components/workflow/WorkflowStatus";
import ApprovalPanel from "../components/reports/ApprovalPanel";
import ReportCard from "../components/reports/ReportCard";
import ReportViewer from "../components/reports/ReportViewer";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts";
import { ChevronRight, FileJson, Mail, Share2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export const ProjectPage = () => {
  const { projects, selectedProjectId, reportsByProject } = useStudioStore();
  const [selectedReportKey, setSelectedReportKey] = useState("market_report");

  const project = projects.find((p) => p.id === selectedProjectId) || projects[0];
  const backendReports = reportsByProject[project?.id] || [];
  const reportFileByKey = {
    market_report: "market_report.md",
    competitor_report: "competitor_report.md",
    opportunity_report: "opportunity_report.md",
    product_strategy: "product_strategy.md",
    prd: "prd.md",
    architecture: "architecture.md",
    revenue_model: "revenue_model.md",
    forecast: "forecast.md",
    gtm: "gtm.md",
    investor_readiness: "investor_readiness.md",
    pitch_deck: "pitch_deck.md"
  };
  const selectedBackendReport = backendReports.find((report) => report.outputFile === reportFileByKey[selectedReportKey]);
  const selectedReportContent = selectedBackendReport?.content || DUMMY_REPORTS[selectedReportKey];

  useEffect(() => {
    // If the active project completed nodes list doesn't include the current report key,
    // default to the latest completed report key.
    if (project) {
      const reportKeysOrder = [
        "market_report",
        "competitor_report",
        "opportunity_report",
        "product_strategy",
        "prd",
        "architecture",
        "revenue_model",
        "forecast",
        "gtm",
        "investor_readiness",
        "pitch_deck"
      ];
      
      const lastCompletedNodeIndex = project.completedNodes.filter(idx => idx > 0).pop();
      if (lastCompletedNodeIndex) {
        const key = reportKeysOrder[lastCompletedNodeIndex - 1];
        if (key) setSelectedReportKey(key);
      } else {
        setSelectedReportKey("market_report");
      }
    }
  }, [project?.completedNodes?.length, project?.id]);

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
    const reportTitle = selectedReportKey.replace(/_/g, " ").toUpperCase();
    const content = selectedReportContent;
    
    if (format === "json") {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ title: reportTitle, body: content }, null, 2));
      const downloadAnchor = document.createElement("a");
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `${selectedReportKey}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    } else {
      // Export markdown / text
      const dataStr = "data:text/plain;charset=utf-8," + encodeURIComponent(content);
      const downloadAnchor = document.createElement("a");
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `${selectedReportKey}.${format === "md" ? "md" : "txt"}`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-6 space-y-6"
    >
      {/* Title Header */}
      <div className="flex flex-col xl:flex-row justify-between gap-4 p-6 rounded-2xl bg-white/[0.01] border border-white/[0.06] backdrop-blur-md">
        <div className="space-y-1 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-400 uppercase tracking-widest">
            <span>Project Workspace</span>
            <ChevronRight className="h-3 w-3" />
            <span className="text-cyan-400">{project.industry}</span>
          </div>
          <h2 className="text-3xl font-black text-white">{project.name}</h2>
          <p className="text-sm text-gray-400 leading-relaxed">{project.idea}</p>
        </div>

        {/* Global Export Buttons */}
        <div className="flex flex-wrap items-center gap-2 mt-2 xl:mt-0 xl:self-center">
          <Button variant="ghost" size="sm" onClick={() => handleExport("md")} className="gap-1.5 border border-white/5 bg-white/5 cursor-pointer">
            Export MD
          </Button>
          <Button variant="ghost" size="sm" onClick={() => handleExport("json")} className="gap-1.5 border border-white/5 bg-white/5 cursor-pointer">
            <FileJson className="h-4 w-4" />
            JSON
          </Button>
          <Button variant="ghost" size="sm" onClick={() => alert("PDF compile started...")} className="gap-1.5 border border-white/5 bg-white/5 cursor-pointer">
            PDF
          </Button>
          <Button variant="ghost" size="sm" onClick={() => alert("Email dispatched to registered founder.")} className="gap-1.5 border border-white/5 bg-white/5 cursor-pointer">
            <Mail className="h-4 w-4" />
            Email
          </Button>
        </div>
      </div>

      {/* Main Grid: Flow & Radar */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* React Flow pipeline (Left/Center) */}
        <div className="xl:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Autonomous Agent Graph</h3>
            <span className="text-xs text-cyan-400 font-semibold px-2 py-0.5 rounded-full bg-cyan-400/10 border border-cyan-400/20">
              Vetting Node: {WORKFLOW_NODES_LIST[project.currentNodeIndex]?.label}
            </span>
          </div>
          
          <AgentFlow completedNodes={project.completedNodes} currentNodeIndex={project.currentNodeIndex} />
          
          <WorkflowStatus currentNodeIndex={project.currentNodeIndex} />
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
      <ApprovalPanel project={project} />

      {/* Reports Workspace: Deliverables menu & Markdown Viewer */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        
        {/* Reports Navigation Sidebar */}
        <div className="lg:col-span-1">
          <ReportCard
            completedNodeIds={project.completedNodes}
            activeNodeIndex={project.currentNodeIndex}
            selectedReportKey={selectedReportKey}
            setSelectedReportKey={setSelectedReportKey}
          />
        </div>

        {/* Markdown Document Viewer */}
        <div className="lg:col-span-3">
          <ReportViewer
            title={`${selectedReportKey.replace(/_/g, " ").toUpperCase()}.MD`}
            content={selectedReportContent}
            onExport={() => handleExport("md")}
          />
        </div>

      </div>

    </motion.div>
  );
};

export default ProjectPage;
