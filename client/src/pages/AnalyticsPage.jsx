import React, { useEffect, useState } from "react";
import AnalyticsCards from "../components/analytics/AnalyticsCards";
import UsageChart from "../components/analytics/UsageChart";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/Card";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts";
import { BarChart3, ShieldCheck, Sparkles } from "lucide-react";
import { api } from "../services/api";

export const AnalyticsPage = () => {
  const [analytics, setAnalytics] = useState(null);
  const [systemLogs, setSystemLogs] = useState([]);

  useEffect(() => {
    api.getAnalytics()
      .then((data) => {
        setAnalytics(data);
        setSystemLogs([
          { module: "AUTH", text: "Cookie session verified", type: "success" },
          { module: "ANALYTICS", text: `Loaded ${Object.keys(data.agentUsage || {}).length} agent counters`, type: "success" },
          { module: "WORKFLOW", text: `${data.completionRate || 0}% completion rate across current user runs`, type: "info" }
        ]);
      })
      .catch(() => {
        setAnalytics({ averageRuntime: 0, completionRate: 0, tokenUsage: 0, mostUsedAgent: "None", agentUsage: {} });
        setSystemLogs([{ module: "ANALYTICS", text: "Unable to load analytics from backend", type: "info" }]);
      });
  }, []);

  const capabilityData = [
    { subject: "Completion", A: analytics?.completionRate || 0, fullMark: 100 },
    { subject: "Usage", A: Math.min(100, Math.round((analytics?.tokenUsage || 0) / 1000)), fullMark: 100 },
    { subject: "Runtime", A: analytics?.averageRuntime ? Math.max(1, 100 - Math.round(analytics.averageRuntime / 1000)) : 0, fullMark: 100 }
  ];

  return (
    <div className="flex min-h-full flex-col gap-6 p-6 lg:h-full lg:min-h-0 lg:overflow-hidden">
      {/* Page Header */}
      <div className="flex shrink-0 flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-6 rounded-2xl bg-white/[0.01] border border-white/[0.06] backdrop-blur-md">
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

      <div className="min-h-0 space-y-6 lg:flex-1 lg:overflow-y-auto lg:overscroll-contain lg:pr-1 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        {/* Metric Cards Row */}
        <AnalyticsCards analytics={analytics} />

        {/* Charts section: Area and Bar */}
        <UsageChart analytics={analytics} />

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
              {systemLogs.map((log, idx) => (
                <div key={idx} className="flex min-w-0 flex-wrap gap-2.5 rounded-xl border border-white/[0.03] bg-white/[0.01] p-2.5 font-mono text-xs">
                  <span className="shrink-0 text-gray-600">[{new Date().toLocaleTimeString()}]</span>
                  <span className="shrink-0 font-semibold text-purple-400">{log.module}</span>
                  <span className={log.type === "success" ? "min-w-0 flex-1 break-words text-emerald-400" : "min-w-0 flex-1 break-words text-gray-300"}>{log.text}</span>
                </div>
              ))}
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
