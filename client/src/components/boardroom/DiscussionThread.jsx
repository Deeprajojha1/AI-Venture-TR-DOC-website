import React, { useEffect, useRef } from "react";
import { useStudioStore } from "../../store/useStudioStore";
import { EXECUTIVE_MEMBERS } from "../../data/dummyData";
import { cn } from "../../utils/cn";
import { motion, AnimatePresence } from "framer-motion";
import { ClipLoader } from "../ui/Loader";

export const DiscussionThread = () => {
  const { discussion, isBoardroomTyping } = useStudioStore();
  const threadEndRef = useRef(null);

  useEffect(() => {
    if (threadEndRef.current) {
      threadEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [discussion, isBoardroomTyping]);

  const getSenderMeta = (senderId) => {
    if (senderId === "user") {
      return {
        name: "Founder (You)",
        role: "Operator",
        avatar: "👑",
        color: "bg-purple-500/10 text-purple-300 border-purple-500/35 self-end"
      };
    }

    const exec = EXECUTIVE_MEMBERS.find((m) => m.id === senderId);
    if (exec) {
      return {
        name: exec.name,
        role: exec.role,
        avatar: exec.avatar,
        color: "bg-white/[0.03] text-gray-200 border-white/[0.08] self-start"
      };
    }

    return {
      name: "Board Advisor",
      role: "Advisor",
      avatar: "🤖",
      color: "bg-white/[0.03] text-gray-200 border-white/[0.08] self-start"
    };
  };

  return (
    <div className="flex flex-col h-[400px] rounded-2xl bg-white/[0.01] border border-white/[0.06] p-4 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
      <AnimatePresence initial={false}>
        {discussion.map((msg, idx) => {
          const isUser = msg.senderId === "user";
          const meta = getSenderMeta(msg.senderId);

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3 }}
              className={cn(
                "flex gap-3 max-w-[85%] border p-4 rounded-2xl backdrop-blur-xl shadow-md",
                isUser ? "ml-auto rounded-tr-none" : "mr-auto rounded-tl-none",
                meta.color
              )}
            >
              {/* Avatar Icon */}
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 border border-white/10 shrink-0 text-xl">
                {meta.avatar}
              </div>

              {/* Message Details */}
              <div className="space-y-1 min-w-0">
                <div className="flex items-baseline gap-2">
                  <span className="font-bold text-xs text-white">{meta.name}</span>
                  <span className="text-[10px] text-gray-400 font-semibold px-1.5 py-0.5 rounded bg-white/5 border border-white/5 uppercase tracking-wider">
                    {meta.role}
                  </span>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed break-words">{msg.text}</p>
                <span className="block text-[9px] text-gray-500 text-right">{msg.timestamp}</span>
              </div>
            </motion.div>
          );
        })}

        {/* Typing indicator featuring ClipLoader spinner */}
        {isBoardroomTyping && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2.5 p-3.5 bg-cyan-950/10 border border-cyan-500/25 rounded-2xl rounded-tl-none self-start max-w-[240px] shadow-[0_0_15px_rgba(6,182,212,0.1)] animate-pulse"
          >
            <ClipLoader size="xs" color="cyan" className="shrink-0" />
            <span className="text-[10px] text-cyan-300 font-bold uppercase tracking-wider">
              Board members composing reply...
            </span>
          </motion.div>
        )}
      </AnimatePresence>
      <div ref={threadEndRef} />
    </div>
  );
};

export default DiscussionThread;
