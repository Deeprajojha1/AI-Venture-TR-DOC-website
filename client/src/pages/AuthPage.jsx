import React, { useState } from "react";
import { useStudioStore } from "../store/useStudioStore";
import { api } from "../services/api";
import Button from "../components/ui/Button";
import { Card, CardContent } from "../components/ui/Card";
import { BrainCircuit, Lock, Mail, Rocket } from "lucide-react";
import { motion } from "framer-motion";
import { PageLoader } from "../components/ui/Loader";

export const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("Founder");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleAuth = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    try {
      if (isLogin) {
        await api.login(email, password);
      } else {
        await api.register(name, email, password);
      }
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-stretch bg-black text-white relative overflow-hidden">
      
      {/* Full-screen Loader Overlay during login */}
      {isLoading && (
        <PageLoader message="Authenticating founder credentials..." />
      )}

      {/* Background Decorative Blur Filters */}
      <div className="absolute top-[-10%] left-[-10%] h-[40%] w-[40%] rounded-full bg-violet-600/10 blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] h-[40%] w-[40%] rounded-full bg-cyan-500/10 blur-[120px]" />

      {/* Left Panel: Auth Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Logo Brand Header */}
          <div className="flex items-center gap-2 mb-8 justify-center lg:justify-start">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-violet-600 to-cyan-400">
              <Rocket className="h-4.5 w-4.5 text-white" />
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-white via-gray-100 to-gray-400 bg-clip-text text-transparent">
              AI-Venture <span className="text-violet-400">Studio</span>
            </span>
          </div>

          {/* Form Header */}
          <div className="mb-6 text-center lg:text-left">
            <h1 className="text-3xl font-black tracking-tight text-white mb-2">
              {isLogin ? "Welcome back, Founder" : "Initialize Workspace"}
            </h1>
            <p className="text-sm text-gray-400">
              {isLogin 
                ? "Sign in to access your virtual co-founder team."
                : "Create an account to begin auto-vetting your ideas."
              }
            </p>
          </div>

          {/* Error Message */}
          {errorMsg && (
            <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/25 text-xs text-red-300 font-semibold animate-shake">
              {errorMsg}
            </div>
          )}

          {/* Credentials Form */}
          <form onSubmit={handleAuth} className="space-y-4">
            {!isLogin && (
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase text-gray-400 tracking-wider">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Founder"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/30 transition-all duration-300"
                />
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase text-gray-400 tracking-wider">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="name@company.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/30 transition-all duration-300"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase text-gray-400 tracking-wider">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/30 transition-all duration-300"
                />
              </div>
            </div>

            <Button
              type="submit"
              isLoading={isLoading}
              className="w-full mt-2 cursor-pointer font-bold"
            >
              {isLogin ? "Authenticate" : "Create Workspace"}
            </Button>
          </form>

          {/* Toggle form button */}
          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-xs text-gray-400 hover:text-white transition-colors duration-200 underline underline-offset-4 cursor-pointer"
            >
              {isLogin 
                ? "Don't have an account? Sign up" 
                : "Already have an account? Sign in"
              }
            </button>
          </div>
        </motion.div>
      </div>

      {/* Right Panel: Premium Brand Illustration */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-indigo-950 via-black to-slate-950 border-l border-white/[0.08] items-center justify-center p-12 relative overflow-hidden">
        
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 opacity-15 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        
        <div className="relative z-10 max-w-md text-center space-y-6">
          
          {/* Animated floating circuit block */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-white/[0.03] border border-white/[0.1] backdrop-blur-xl shadow-2xl mx-auto"
          >
            <BrainCircuit className="h-10 w-10 text-cyan-400 drop-shadow-[0_0_15px_rgba(6,182,212,0.4)]" />
          </motion.div>

          <div className="space-y-2">
            <h2 className="text-2xl font-black text-white tracking-tight">Run your venture on autopilot</h2>
            <p className="text-sm text-gray-400 leading-relaxed">
              Consolidate marketing metrics, technical architecture schemas, and financial predictions in one clean dashboard backed by agent reviews.
            </p>
          </div>

          {/* Floating glass overlay stat card */}
          <Card className="border-indigo-500/10 bg-white/[0.01] backdrop-blur-md shadow-xl text-left">
            <CardContent className="p-4 flex gap-3.5 items-center">
              <span className="text-2xl">⚡</span>
              <div>
                <span className="block text-[10px] uppercase text-indigo-400 font-bold tracking-wider">Startup pipeline</span>
                <span className="text-sm font-semibold text-white">12 Agents Vetting active model...</span>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>

    </div>
  );
};

export default AuthPage;
