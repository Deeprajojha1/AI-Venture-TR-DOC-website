import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, BarChart3, BrainCircuit, Check, FileText, Layers3, Rocket, ShieldCheck, Workflow } from "lucide-react";
import Button from "../components/ui/Button";
import heroImage from "../assets/images.jpg";
import { useStudioStore } from "../store/useStudioStore";

const workflowItems = [
  { label: "Capture", detail: "Founder inputs idea, market, users, budget, and timeline." },
  { label: "Analyze", detail: "Backend agents generate research, strategy, PRD, and architecture." },
  { label: "Review", detail: "Approve, regenerate, export, and consult the boardroom from one workspace." }
];

const capabilityItems = [
  { icon: BrainCircuit, title: "Agent Reports", copy: "Generate market, competitor, product, technical, financial, GTM, and pitch artifacts from backend workflow runs." },
  { icon: Workflow, title: "Live Pipeline", copy: "Track each project through a dynamic agent graph sourced from the project run state." },
  { icon: BarChart3, title: "Operational Analytics", copy: "Monitor runtime, completion rate, token usage, and agent workload from authenticated API data." },
  { icon: ShieldCheck, title: "Secure Workspace", copy: "JWT sessions are handled with httpOnly cookies and protected backend routes." }
];

const artifactItems = [
  "Markdown reports",
  "PDF export",
  "Boardroom consultation",
  "Project email delivery",
  "Startup health scoring",
  "Cookie-authenticated workspace"
];

export const LandingPage = () => {
  const { isAuthenticated } = useStudioStore();
  const navigate = useNavigate();

  const handleCTA = () => {
    navigate(isAuthenticated ? "/dashboard" : "/login");
  };

  const handleScrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#050607] text-white font-sans selection:bg-cyan-400/20 selection:text-white flex flex-col">
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.08] bg-[#050607]/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <button onClick={() => handleScrollTo("top")} className="flex items-center gap-2.5 cursor-pointer">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-cyan-400 text-black">
              <Rocket className="h-4 w-4" />
            </span>
            <span className="text-sm font-black tracking-wide">AI-Venture Studio</span>
          </button>

          <nav className="hidden items-center gap-7 text-xs font-semibold text-gray-400 md:flex">
            <button onClick={() => handleScrollTo("workflow")} className="hover:text-white transition-colors cursor-pointer">Workflow</button>
            <button onClick={() => handleScrollTo("capabilities")} className="hover:text-white transition-colors cursor-pointer">Capabilities</button>
            <button onClick={() => handleScrollTo("outputs")} className="hover:text-white transition-colors cursor-pointer">Outputs</button>
          </nav>

          <Button variant="secondary" size="sm" onClick={handleCTA} className="border-white/10 text-xs font-bold cursor-pointer">
            {isAuthenticated ? "Open Workspace" : "Sign In"}
          </Button>
        </div>
      </header>

      <main id="top" className="flex-1 pt-16">
        <section className="relative overflow-hidden border-b border-white/[0.06]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:48px_48px]" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#050607] to-transparent" />

          <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:py-20">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="max-w-3xl"
            >
              <div className="mb-5 inline-flex items-center gap-2 rounded-md border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-cyan-200">
                <Layers3 className="h-3.5 w-3.5" />
                Agentic startup workspace
              </div>

              <h1 className="text-4xl font-black leading-[1.02] tracking-normal text-white sm:text-6xl lg:text-7xl">
                Turn a raw venture idea into an investor-ready workspace.
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-7 text-gray-300 sm:text-lg">
                Submit a concept once. The backend agent pipeline creates structured reports, tracks project health, and keeps every artifact available inside a secure founder dashboard.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button variant="primary" size="lg" onClick={handleCTA} className="gap-2 cursor-pointer font-bold">
                  {isAuthenticated ? "Open Dashboard" : "Start Workspace"}
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="lg" onClick={() => handleScrollTo("workflow")} className="border-white/10 cursor-pointer font-bold">
                  View Workflow
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="relative min-h-[360px]"
            >
              <div className="absolute inset-0 rounded-md border border-white/[0.08] bg-white/[0.025]" />
              <div className="relative h-full rounded-md border border-white/[0.08] bg-[#0a0d0f] p-5 shadow-2xl">
                <div className="mb-5 flex items-center justify-between border-b border-white/[0.08] pb-4">
                  <div>
                    <div className="text-xs font-bold uppercase tracking-widest text-cyan-300">Pipeline Status</div>
                    <div className="mt-1 text-2xl font-black">Venture OS</div>
                  </div>
                  <img src={heroImage} alt="Layered AI workflow visual" className="h-20 w-20 object-contain" />
                </div>

                <div className="space-y-3">
                  {workflowItems.map((item, index) => (
                    <div key={item.label} className="grid grid-cols-[36px_1fr] gap-3 rounded-md border border-white/[0.06] bg-white/[0.025] p-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-md bg-cyan-400/10 text-xs font-black text-cyan-200">
                        {index + 1}
                      </span>
                      <div>
                        <div className="text-sm font-bold text-white">{item.label}</div>
                        <p className="mt-1 text-xs leading-5 text-gray-400">{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="workflow" className="border-b border-white/[0.06] bg-[#080a0c]">
          <div className="mx-auto max-w-7xl px-6 py-14">
            <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <h2 className="text-3xl font-black tracking-normal text-white">One Continuous Founder Flow</h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-400">
                  The landing page now reflects the real app shape: authenticated users move into dashboard, studio, boardroom, and analytics screens backed by API data.
                </p>
              </div>
              <Button variant="secondary" size="sm" onClick={handleCTA} className="cursor-pointer font-bold">
                Continue
              </Button>
            </div>

            <div className="grid gap-px overflow-hidden rounded-md border border-white/[0.08] bg-white/[0.08] md:grid-cols-3">
              {workflowItems.map((item, index) => (
                <div key={item.label} className="bg-[#080a0c] p-6">
                  <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-md bg-white text-sm font-black text-black">
                    {index + 1}
                  </div>
                  <h3 className="text-lg font-black text-white">{item.label}</h3>
                  <p className="mt-2 text-sm leading-6 text-gray-400">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="capabilities" className="border-b border-white/[0.06] bg-[#050607]">
          <div className="mx-auto max-w-7xl px-6 py-14">
            <div className="mb-8 max-w-2xl">
              <h2 className="text-3xl font-black tracking-normal text-white">Built Around Dynamic Project Data</h2>
              <p className="mt-2 text-sm leading-6 text-gray-400">
                No fake project inventory or subscription tables. The workspace experience is centered on live backend state.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {capabilityItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="rounded-md border border-white/[0.08] bg-white/[0.025] p-5">
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-cyan-400/10 text-cyan-300">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-base font-black text-white">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-gray-400">{item.copy}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="outputs" className="bg-[#080a0c]">
          <div className="mx-auto grid max-w-7xl gap-8 px-6 py-14 lg:grid-cols-[0.8fr_1fr] lg:items-start">
            <div>
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-md bg-white text-black">
                <FileText className="h-5 w-5" />
              </div>
              <h2 className="text-3xl font-black tracking-normal text-white">Outputs That Stay In The Workspace</h2>
              <p className="mt-3 text-sm leading-6 text-gray-400">
                Generated artifacts are tied to authenticated projects, making the first screen a direct path into real venture execution.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {artifactItems.map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-md border border-white/[0.08] bg-[#050607] p-4 text-sm font-semibold text-gray-200">
                  <Check className="h-4 w-4 text-emerald-400" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/[0.06] bg-[#050607] py-8 text-xs text-gray-500">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 md:flex-row md:items-center md:justify-between">
          <div className="font-bold text-gray-300">AI-Venture Studio</div>
          <div>Secure agentic workspace for venture builders.</div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
