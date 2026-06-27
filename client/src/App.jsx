import React, { Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useStudioStore } from "./store/useStudioStore";
import { api } from "./services/api";
import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import WorkspaceTabs from "./components/layout/WorkspaceTabs";
import AuthPage from "./pages/AuthPage";
import DashboardPage from "./pages/DashboardPage";
import ProjectPage from "./pages/ProjectPage";
import BoardroomPage from "./pages/BoardroomPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import LandingPage from "./pages/LandingPage";
import { PageLoader } from "./components/ui/Loader";

// Layout for all authenticated routes
const DashboardLayout = () => {
  const { isAuthenticated, isAuthLoading } = useStudioStore();

  if (isAuthLoading) {
    return <PageLoader message="Checking secure session..." />;
  }

  // Route guarding: redirect to login if unauthenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col relative overflow-x-hidden selection:bg-purple-500/30 selection:text-white">
      
      {/* Ambient Background Blur Orbs */}
      <div className="absolute top-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-violet-600/10 blur-[130px] animate-pulse-glow pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] left-[-15%] h-[550px] w-[550px] rounded-full bg-cyan-500/10 blur-[140px] animate-pulse-glow [animation-delay:-4s] pointer-events-none z-0" />
      <div className="absolute top-1/2 left-1/3 h-[450px] w-[450px] rounded-full bg-indigo-500/5 blur-[120px] animate-pulse-glow [animation-delay:-2s] pointer-events-none z-0" />

      {/* Main Canvas layout */}
      <div className="relative z-10 h-screen overflow-hidden">
        <Navbar />
        <Sidebar />

        <main className="fixed inset-x-0 bottom-0 top-16 flex min-w-0 flex-col overflow-hidden bg-white/[0.005] lg:left-80">
          <WorkspaceTabs />

          <div className="flex-1 min-h-0 overflow-y-auto">
            {/* Suspense wrapper for lazy routes, standardizing loading transitions */}
            <Suspense fallback={<PageLoader message="Loading workspace components..." />}>
              <Outlet />
            </Suspense>
          </div>
        </main>
      </div>

    </div>
  );
};

// Main routing configuration
export const App = () => {
  const { isAuthenticated, isAuthLoading } = useStudioStore();

  useEffect(() => {
    api.checkSession();
  }, []);

  if (isAuthLoading) {
    return <PageLoader message="Checking secure session..." />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/landing" element={isAuthenticated ? <LandingPage /> : <Navigate to="/login" replace />} />

        {/* Guest Auth route */}
        <Route 
          path="/login" 
          element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <AuthPage />} 
        />

        {/* Authenticated Dashboard Routes */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/studio" element={<ProjectPage />} />
          <Route path="/boardroom" element={<BoardroomPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
        </Route>

        {/* Fallback route */}
        <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
