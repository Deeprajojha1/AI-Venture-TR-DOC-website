import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStudioStore } from "../store/useStudioStore";
import { EXECUTIVE_MEMBERS, WORKFLOW_NODES_LIST } from "../data/dummyData";
import { Card, CardContent } from "../components/ui/Card";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import { ArrowRight, BrainCircuit, Check, CheckCircle2, FolderGit2, Rocket, Sparkles, TrendingUp, Users } from "lucide-react";
import { motion } from "framer-motion";

export const LandingPage = () => {
  const { isAuthenticated } = useStudioStore();
  const navigate = useNavigate();

  const handleCTA = () => {
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden font-sans">
      
      {/* Premium Ambient Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-violet-600/10 blur-[130px] animate-pulse-glow" />
      <div className="absolute top-[40%] right-[-10%] h-[600px] w-[600px] rounded-full bg-cyan-500/10 blur-[140px] animate-pulse-glow [animation-delay:-3s]" />
      <div className="absolute bottom-[-10%] left-[10%] h-[500px] w-[500px] rounded-full bg-purple-500/5 blur-[120px] animate-pulse-glow [animation-delay:-1.5s]" />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      {/* Header navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-black/45 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo brand */}
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-violet-600 to-cyan-400 shadow-[0_0_15px_rgba(99,102,241,0.4)]">
              <Rocket className="h-4.5 w-4.5 text-white" />
            </div>
            <span className="text-md font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              AI-Venture <span className="text-violet-400">Studio</span>
            </span>
          </div>

          {/* Nav Anchors */}
          <nav className="hidden md:flex items-center space-x-8 text-xs font-semibold text-gray-400">
            <button onClick={() => handleScrollTo("features")} className="hover:text-white transition-colors cursor-pointer">Features</button>
            <button onClick={() => handleScrollTo("pipeline")} className="hover:text-white transition-colors cursor-pointer">Pipeline</button>
            <button onClick={() => handleScrollTo("pricing")} className="hover:text-white transition-colors cursor-pointer">Pricing</button>
          </nav>

          {/* Action Trigger */}
          <Button
            variant="secondary"
            size="sm"
            onClick={handleCTA}
            className="border-white/10 text-xs px-4 py-2 hover:bg-white/5 cursor-pointer font-bold"
          >
            {isAuthenticated ? "Go to Studio" : "Sign In"}
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-16 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6 max-w-4xl mx-auto"
        >
          {/* Badge Pill */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[10px] font-bold text-purple-300 uppercase tracking-widest animate-float">
            <Sparkles className="h-3 w-3 text-cyan-400" />
            Autonomous Multi-Agent Co-Founder Suite
          </div>

          {/* Main Copy */}
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
            Build Startups at <br />
            <span className="bg-gradient-to-r from-violet-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(99,102,241,0.2)]">
              Agentic Autopilot Speed
            </span>
          </h1>

          <p className="text-sm sm:text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto">
            Input your startup idea. Our autonomous agent network performs market research, generates full technical PRDs, designs system architecture schemas, and constructs investor pitch decks in 5 minutes.
          </p>

          {/* Hero CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button
              variant="primary"
              size="lg"
              onClick={handleCTA}
              className="gap-2 cursor-pointer font-bold shadow-[0_0_25px_rgba(99,102,241,0.5)]"
            >
              Launch Free Workspace
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => handleScrollTo("features")}
              className="border-white/10 hover:bg-white/5 cursor-pointer font-bold"
            >
              Meet the AI Board
            </Button>
          </div>
        </motion.div>

        {/* Dashboard Mockup Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16 relative mx-auto max-w-5xl rounded-2xl border border-white/[0.08] bg-white/[0.01] p-2.5 shadow-2xl backdrop-blur-md overflow-hidden group"
        >
          <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-violet-600 via-cyan-400 to-indigo-600 opacity-30 group-hover:opacity-100 transition-opacity duration-700" />
          
          {/* Glass header representation */}
          <div className="h-8 w-full border-b border-white/[0.06] flex items-center px-4 justify-between bg-white/[0.01]">
            <div className="flex gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-rose-500/40" />
              <div className="h-2.5 w-2.5 rounded-full bg-amber-500/40" />
              <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/40" />
            </div>
            <div className="text-[10px] text-gray-500 font-mono">http://localhost:5173/dashboard</div>
            <div className="w-10" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 p-4 gap-4 text-left">
            {/* mock card 1 */}
            <div className="p-4 rounded-xl border border-white/[0.05] bg-white/[0.01] space-y-2">
              <div className="flex justify-between items-baseline">
                <span className="text-[10px] text-purple-400 font-bold uppercase tracking-wider">TAM Research</span>
                <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Vetted</span>
              </div>
              <h4 className="font-bold text-sm text-white">TAM/SAM/SOM Target</h4>
              <p className="text-[11px] text-gray-400 leading-relaxed">TAM mapped at $24.5B global addressable developers and venture creator markets.</p>
            </div>
            {/* mock card 2 */}
            <div className="p-4 rounded-xl border border-white/[0.05] bg-white/[0.01] space-y-2">
              <div className="flex justify-between items-baseline">
                <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider">Architecture</span>
                <span className="text-[9px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">Active</span>
              </div>
              <h4 className="font-bold text-sm text-white">Database Topology</h4>
              <p className="text-[11px] text-gray-400 leading-relaxed">PostgreSQL models generated with schema triggers, SSE route nodes, and cloud containers.</p>
            </div>
            {/* mock card 3 */}
            <div className="p-4 rounded-xl border border-white/[0.05] bg-white/[0.01] space-y-2">
              <div className="flex justify-between items-baseline">
                <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">Investor Deck</span>
                <span className="text-[9px] px-2 py-0.5 rounded-full bg-white/5 text-gray-400 border border-white/5">Queued</span>
              </div>
              <h4 className="font-bold text-sm text-white">Slide Outline Script</h4>
              <p className="text-[11px] text-gray-400 leading-relaxed">Seeking $750k Pre-seed target with 15% Cap Table valuation models generated.</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Roster Section: Meet the Board */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-20 relative z-10 border-t border-white/[0.04]">
        <div className="text-center space-y-3 mb-16">
          <h2 className="text-3xl font-black text-white">Meet Your Virtual Executive Suite</h2>
          <p className="text-sm text-gray-400 max-w-xl mx-auto">
            Our autonomous specialists possess deep domain capabilities to review and vet every segment of your business.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {EXECUTIVE_MEMBERS.map((member) => (
            <motion.div key={member.id} variants={itemVariants}>
              <Card hoverGlow={true} className="border-white/[0.05] bg-white/[0.01] h-full flex flex-col justify-between">
                <CardContent className="p-6 space-y-4 text-left">
                  <div className="flex justify-between items-center w-full">
                    <span className="text-3xl bg-white/5 h-11 w-11 flex items-center justify-center rounded-xl border border-white/10 shadow-lg">{member.avatar}</span>
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 font-bold uppercase tracking-wider">{member.role}</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-0.5">{member.name}</h4>
                    <p className="text-xs text-gray-500 italic mb-2">{member.bio}</p>
                    <p className="text-xs text-gray-300 leading-relaxed">
                      {member.id === "ceo" && "Oversees overall strategic positioning, vettes product market fit, and runs the milestone gate reviewer orchestrators."}
                      {member.id === "cto" && "Compiles backend server schemas, reviews API load parameters, and designs scalable cloud-hosted network topologies."}
                      {member.id === "cmo" && "Validates go-to-market channels, models customer acquisition costs, and designs viral product-led growth pipelines."}
                      {member.id === "cfo" && "Generates 3-year ARR projections, balances cash burn models, and audits funding safe caps and equity options."}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Workflow Section: Pipeline */}
      <section id="pipeline" className="max-w-7xl mx-auto px-6 py-20 relative z-10 border-t border-white/[0.04] text-center">
        <div className="space-y-3 mb-16">
          <h2 className="text-3xl font-black text-white">The 12-Stage Vetting Pipeline</h2>
          <p className="text-sm text-gray-400 max-w-xl mx-auto">
            From initial brainstorm to investor-ready presentation decks, our pipeline runs checks at every single coordinate.
          </p>
        </div>

        {/* Horizontal steps display */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 text-left">
          {WORKFLOW_NODES_LIST.map((node, index) => (
            <div key={node.id} className="p-4 rounded-xl border border-white/[0.04] bg-white/[0.005] hover:bg-white/[0.015] hover:border-white/10 transition-all duration-300">
              <div className="text-[10px] font-black text-purple-400 mb-1">STAGE {index + 1}</div>
              <h5 className="font-bold text-xs text-white truncate mb-1">{node.label}</h5>
              <p className="text-[10px] text-gray-500 leading-relaxed line-clamp-2">{node.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="max-w-7xl mx-auto px-6 py-20 relative z-10 border-t border-white/[0.04] text-center">
        <div className="space-y-3 mb-16">
          <h2 className="text-3xl font-black text-white">Transparent, Value-Driven Pricing</h2>
          <p className="text-sm text-gray-400 max-w-xl mx-auto">
            Select a workspace subscription tier tailored to your venture speed constraints.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto text-left">
          {/* Builder */}
          <Card hoverGlow={true} className="border-white/[0.05] bg-white/[0.01]">
            <CardContent className="p-6 space-y-6">
              <div className="space-y-1">
                <h4 className="text-lg font-bold text-white">Hacker / Builder</h4>
                <p className="text-xs text-gray-400">Great for side-projects & concept validation.</p>
                <div className="pt-4 flex items-baseline">
                  <span className="text-3xl font-black text-white">$0</span>
                  <span className="text-xs text-gray-500 ml-1">/ month</span>
                </div>
              </div>
              <ul className="space-y-3 text-xs text-gray-300 border-t border-white/[0.05] pt-4">
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-400" /> 1 Active Startup Project</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-400" /> Basic Reports (Idea, TAM Research)</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-400" /> Standard LLM Context limits</li>
                <li className="flex items-center gap-2 text-gray-600"><Check className="h-4 w-4 text-gray-600" /> No Boardroom Consultation</li>
              </ul>
              <Button variant="outline" onClick={handleCTA} className="w-full cursor-pointer font-bold border-white/10 hover:bg-white/5">
                Start Validating
              </Button>
            </CardContent>
          </Card>

          {/* Professional */}
          <Card hoverGlow={true} className="border-purple-500/20 bg-gradient-to-br from-indigo-950/10 to-black/40 shadow-[0_0_20px_rgba(99,102,241,0.08)] relative">
            <div className="absolute top-0 right-6 -translate-y-1/2">
              <span className="px-2.5 py-0.5 rounded-full bg-purple-500 text-white text-[9px] font-black uppercase tracking-widest shadow-md">POPULAR</span>
            </div>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-1">
                <h4 className="text-lg font-bold text-white">Founder Pro</h4>
                <p className="text-xs text-gray-400">Ideal for active solo founders & builders.</p>
                <div className="pt-4 flex items-baseline">
                  <span className="text-3xl font-black text-white">$49</span>
                  <span className="text-xs text-gray-500 ml-1">/ month</span>
                </div>
              </div>
              <ul className="space-y-3 text-xs text-gray-300 border-t border-purple-500/10 pt-4">
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-cyan-400" /> Unlimited Startup Projects</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-cyan-400" /> Full 12-Node Pipeline Vetting</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-cyan-400" /> Simulated Executive Boardroom</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-cyan-400" /> Export Options (Markdown, JSON)</li>
              </ul>
              <Button variant="primary" onClick={handleCTA} className="w-full cursor-pointer font-bold shadow-[0_0_15px_rgba(99,102,241,0.4)]">
                Access Pro Suite
              </Button>
            </CardContent>
          </Card>

          {/* Enterprise */}
          <Card hoverGlow={true} className="border-white/[0.05] bg-white/[0.01]">
            <CardContent className="p-6 space-y-6">
              <div className="space-y-1">
                <h4 className="text-lg font-bold text-white">Venture Studio</h4>
                <p className="text-xs text-gray-400">Tailored for teams and startup incubators.</p>
                <div className="pt-4 flex items-baseline">
                  <span className="text-3xl font-black text-white">$299</span>
                  <span className="text-xs text-gray-500 ml-1">/ month</span>
                </div>
              </div>
              <ul className="space-y-3 text-xs text-gray-300 border-t border-white/[0.05] pt-4">
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-400" /> Multi-user Team workspaces</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-400" /> High-frequency API token keys</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-400" /> Custom Agent Prompts configuration</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-400" /> White-label PDF Pitch Deck downloads</li>
              </ul>
              <Button variant="outline" onClick={handleCTA} className="w-full cursor-pointer font-bold border-white/10 hover:bg-white/5">
                Contact Sales
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t border-white/[0.06] bg-black/40 py-12 text-center text-xs text-gray-500 relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-white/5 border border-white/5">
              <Rocket className="h-3.5 w-3.5 text-purple-400" />
            </div>
            <span className="font-bold text-gray-300">AI-Venture Studio</span>
          </div>
          <div>&copy; 2026 AI-Venture Studio Inc. All rights reserved. Built for autonomous builders.</div>
          <div className="space-x-4">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default LandingPage;
