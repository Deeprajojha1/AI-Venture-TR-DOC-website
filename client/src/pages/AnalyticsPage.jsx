import React from "react";
import AnalyticsCards from "../components/analytics/AnalyticsCards";
import UsageChart from "../components/analytics/UsageChart";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/Card";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts";
import { BarChart3, ShieldCheck, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export const AnalyticsPage = () => {
  // Mock performance vector for agent capabilities
  const capabilityData = [
    { subject: "Context Depth", A: 90, B: 85, fullMark: 100 },
    { subject: "Task Speed", A: 95, B: 70, fullMark: 100 },
    { subject: "Accuracy", A: 92, B: 90, fullMark: 100 },
    { subject: "Code Quality", A: 88, B: 95, fullMark: 100 },
    { subject: "Compliance", A: 85, B: 80, fullMark: 100 },
    { subject: "Creative GTM", A: 94, B: 85, fullMark: 100 }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-6 space-y-6"
    >
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-6 rounded-2xl bg-white/[0.01] border border-white/[0.06] backdrop-blur-md">
        <div className="space-y-1">
          <h2 className="text-3xl font-black text-white flex items-center gap-2.5">
            <BarChart3 className="h-7 w-7 text-purple-400" />
            Agent Diagnostics & Analytics
          </h2>
          <p className="text-sm text-gray-400">
            Real-time tracking of token exchange metrics, agent task completion load, and neural alignment.
          </p>
        </div>
      </div>

      {/* Metric Cards Row */}
      <AnalyticsCards />

      {/* Charts section: Area and Bar */}
      <UsageChart />

      {/* Bottom section: Radar chart & health audit log */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Agent Capabilities Radar */}
        <Card className="border-white/[0.06] bg-white/[0.01] lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-base text-purple-400 flex items-center gap-1.5">
              <Sparkles className="h-4.5 w-4.5" />
              Agent Capability Matrix
            </CardTitle>
            <CardDescription>System competence index comparing active models.</CardDescription>
          </CardHeader>
          <CardContent className="h-[250px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={capabilityData}>
                <PolarGrid stroke="rgba(255,255,255,0.06)" />
                <PolarAngleAxis dataKey="subject" stroke="#9ca3af" fontSize={10} />
                <Radar name="Active Agent Cluster" dataKey="A" stroke="#a855f7" fill="#a855f7" fillOpacity={0.2} />
                <Radar name="Baseline Model" dataKey="B" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.1} />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Security / System Health Log */}
        <Card className="border-white/[0.06] bg-white/[0.01] lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base text-emerald-400 flex items-center gap-1.5">
              <ShieldCheck className="h-4.5 w-4.5" />
              System Vetting Log
            </CardTitle>
            <CardDescription>Log outputs from security checking models.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { time: "14:20:11", module: "AUTH", text: "Verified session signature for founder@example.com", type: "success" },
              { time: "14:02:44", module: "ORCHESTRATOR", text: "Successfully saved finalized artifact competitor_report.md", type: "success" },
              { time: "13:58:32", module: "SECURITY", text: "Scanned database models - Zero vulnerabilities found. HIPAA checks passed.", type: "success" },
              { time: "13:30:19", module: "COSTS", text: "Total token billing threshold is within normal bounds (<$1.50 per execution block)", type: "info" }
            ].map((log, idx) => (
              <div key={idx} className="flex gap-2.5 text-xs font-mono p-2.5 rounded-xl bg-white/[0.01] border border-white/[0.03]">
                <span className="text-gray-600">[{log.time}]</span>
                <span className="text-purple-400 font-semibold">{log.module}</span>
                <span className={log.type === "success" ? "text-emerald-400" : "text-gray-300"}>{log.text}</span>
              </div>
            ))}
          </CardContent>
        </Card>

      </div>
    </motion.div>
  );
};

export default AnalyticsPage;
