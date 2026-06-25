import React from "react";
import { useStudioStore } from "../../store/useStudioStore";
import { api } from "../../services/api";
import { LogOut, Rocket, User } from "lucide-react";
import Button from "../ui/Button";

export const Navbar = () => {
  const { user } = useStudioStore();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.08] bg-black/40 backdrop-blur-xl transition-all duration-300">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-violet-600 to-cyan-400 shadow-[0_0_15px_rgba(99,102,241,0.5)]">
            <Rocket className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-400 bg-clip-text text-transparent">
            AI-Venture <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">Studio</span>
          </span>
        </div>

        {/* User Info & Actions */}
        {user && (
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.08]">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-300 text-xs">
                <User className="h-3 w-3" />
              </div>
              <span className="text-xs font-medium text-gray-300">{user.email}</span>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-red-400 gap-1.5 flex items-center hover:bg-red-500/10"
              onClick={api.logout}
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
