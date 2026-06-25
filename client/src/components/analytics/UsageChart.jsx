import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/Card";

export const UsageChart = ({ analytics }) => {
  const tokenHistory = [
    {
      name: "Current",
      tokens: analytics?.tokenUsage || 0
    }
  ];
  const agentWorkload = Object.entries(analytics?.agentUsage || {}).map(([name, tasks]) => ({
    name,
    tasks,
    accuracy: analytics?.completionRate || 0
  }));

  // Custom tooltips to match glassmorphic dark design
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-3.5 bg-black/85 backdrop-blur-xl border border-white/10 rounded-xl text-xs space-y-1">
          <p className="font-bold text-white">{label}</p>
          {payload.map((p, idx) => (
            <p key={idx} style={{ color: p.color }} className="font-semibold">
              {p.name}: {p.value.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      
      {/* Token Area Chart */}
      <Card className="border-white/[0.06] bg-white/[0.01]">
        <CardHeader>
          <CardTitle className="text-base text-cyan-400">Token Consumption History</CardTitle>
          <CardDescription>Daily API context token exchange volume.</CardDescription>
        </CardHeader>
        <CardContent className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={tokenHistory} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorTokens" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
              <XAxis dataKey="name" stroke="#6b7280" fontSize={11} tickLine={false} />
              <YAxis stroke="#6b7280" fontSize={11} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey="tokens" 
                name="Context Tokens"
                stroke="#06b6d4" 
                strokeWidth={2.5}
                fillOpacity={1} 
                fill="url(#colorTokens)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Agent Workload Bar Chart */}
      <Card className="border-white/[0.06] bg-white/[0.01]">
        <CardHeader>
          <CardTitle className="text-base text-violet-400">Agent Task Execution Load</CardTitle>
          <CardDescription>Number of operations run successfully per agent role.</CardDescription>
        </CardHeader>
        <CardContent className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={agentWorkload.length ? agentWorkload : [{ name: "No runs", tasks: 0, accuracy: 0 }]} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
              <XAxis dataKey="name" stroke="#6b7280" fontSize={11} tickLine={false} />
              <YAxis stroke="#6b7280" fontSize={11} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="tasks" name="Tasks Processed" fill="#8b5cf6" radius={[4, 4, 0, 0]} maxBarSize={30} />
              <Bar dataKey="accuracy" name="Alignment Rate (%)" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={30} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

    </div>
  );
};

export default UsageChart;
