import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/Card";
import Button from "../ui/Button";
import { api } from "../../services/api";
import { Sparkles, Terminal } from "lucide-react";
import { PanelLoader } from "../ui/Loader";
import { useNavigate } from "react-router-dom";

export const ProjectForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    industry: "",
    targetUsers: "",
    country: "",
    budget: "",
    timeline: "",
    idea: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.idea) return;

    setIsLoading(true);
    setSuccessMsg("");
    try {
      const response = await api.submitIdea(formData);
      setSuccessMsg("Idea successfully submitted to the agent cluster! Loading studio...");
      setFormData({
        name: "",
        industry: "",
        targetUsers: "",
        country: "",
        budget: "",
        timeline: "",
        idea: ""
      });
      
      // Auto transition to Studio page after a short delay
      setTimeout(() => {
        setSuccessMsg("");
        navigate("/studio");
      }, 1500);

    } catch (err) {
      console.error(err);
    } finally {
      // Keep loading active slightly during transition
      setTimeout(() => setIsLoading(false), 1500);
    }
  };

  return (
    <Card className="border-white/[0.06] bg-white/[0.01] relative overflow-hidden">
      {/* Action Loader Overlay */}
      {isLoading && (
        <PanelLoader message="Spawning agent pipeline nodes..." />
      )}

      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Terminal className="h-5 w-5 text-purple-400 animate-pulse" />
          Co-Founder Agent Hub
        </CardTitle>
        <CardDescription>
          Pitch your startup idea. Our autonomous agents will research the market, build your technical specs, and compile your pitch deck.
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Startup Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Startup Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. AI-Venture Studio"
                required
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/30 transition-all duration-300"
              />
            </div>
            
            {/* Industry */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Industry</label>
              <input
                type="text"
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                placeholder="e.g. Fintech, Developer Tools"
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/30 transition-all duration-300"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Target Users */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Target Users</label>
              <input
                type="text"
                name="targetUsers"
                value={formData.targetUsers}
                onChange={handleChange}
                placeholder="e.g. Solo-founders, Small businesses"
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/30 transition-all duration-300"
              />
            </div>

            {/* Country */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Target Region</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="e.g. Global, US, UK"
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/30 transition-all duration-300"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Budget */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Pre-seed Budget</label>
              <input
                type="text"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                placeholder="e.g. $100,000"
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/30 transition-all duration-300"
              />
            </div>

            {/* Timeline */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Target Timeline</label>
              <input
                type="text"
                name="timeline"
                value={formData.timeline}
                onChange={handleChange}
                placeholder="e.g. 4 Months"
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/30 transition-all duration-300"
              />
            </div>
          </div>

          {/* Startup Idea Description */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Describe your startup idea</label>
            <textarea
              name="idea"
              value={formData.idea}
              onChange={handleChange}
              rows={4}
              required
              placeholder="What problem are you solving? How does your product work? Describe the business model..."
              className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/30 transition-all duration-300 resize-none"
            />
          </div>

          {successMsg && (
            <div className="p-3 text-xs rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 font-semibold animate-pulse">
              {successMsg}
            </div>
          )}

          <Button
            type="submit"
            isLoading={isLoading}
            className="w-full mt-2 gap-1 cursor-pointer"
          >
            <Sparkles className="h-4 w-4" />
            Initialize AI Co-Founder Pipeline
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProjectForm;
