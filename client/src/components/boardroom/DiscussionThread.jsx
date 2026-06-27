import React, { useEffect, useRef, useState } from "react";
import { useStudioStore } from "../../store/useStudioStore";
import { getAdvisorMeta } from "../../utils/advisors";
import { cn } from "../../utils/cn";
import { motion, AnimatePresence } from "framer-motion";
import { ClipLoader } from "../ui/Loader";

export const DiscussionThread = () => {
  const { discussion, isBoardroomTyping } = useStudioStore();
  const threadEndRef = useRef(null);
  const containerRef = useRef(null);
  const [isUserScrolling, setIsUserScrolling] = useState(false);

  const handleScroll = () => {
    if (!containerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    const isAtBottom = scrollHeight - scrollTop <= clientHeight + 50;
    
    setIsUserScrolling(!isAtBottom);
  };

  useEffect(() => {
    if (!isUserScrolling) {
      threadEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [discussion, isBoardroomTyping, isUserScrolling]);

  return (
    <div 
      ref={containerRef}
      onScroll={handleScroll}
      className="flex min-h-[320px] flex-1 overscroll-contain flex-col space-y-4 overflow-y-auto rounded-2xl border border-white/[0.06] bg-white/[0.01] p-4 lg:min-h-0 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent"
    >
      <AnimatePresence initial={false}>
        {discussion.length === 0 && !isBoardroomTyping && (
          <div className="m-auto text-center text-sm text-gray-500 max-w-sm">
            Ask a boardroom question to start a live backend discussion.
          </div>
        )}

        {discussion.map((msg, idx) => {
          const isUser = msg.senderId === "user";
          const meta = getAdvisorMeta(msg);

          return (
            <motion.div
              key={`${msg.timestamp}-${idx}`}
              initial={{ opacity: 0, y: 15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3 }}
              className={cn(
                "flex gap-2 max-w-[75%] border p-3 rounded-xl backdrop-blur-xl shadow-md",
                isUser
                  ? "ml-auto rounded-tr-none bg-purple-500/10 text-purple-300 border-purple-500/35"
                  : "mr-auto rounded-tl-none bg-white/[0.03] text-gray-200 border-white/[0.08]"
              )}
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/5 border border-white/10 shrink-0">
                <span className="text-[10px] font-black text-gray-200">{meta.initials}</span>
              </div>

              <div className="space-y-0.5 min-w-0">
                <div className="flex items-baseline gap-1.5">
                  <span className="font-bold text-[10px] text-white">{meta.name}</span>
                  <span className="text-[8px] text-gray-400 font-semibold px-1 py-0.5 rounded bg-white/5 border border-white/5 uppercase tracking-wider">
                    {meta.role}
                  </span>
                </div>
                <p className="text-xs text-gray-300 leading-snug break-words">{msg.text}</p>
                <span className="block text-[8px] text-gray-500 text-right">{msg.timestamp}</span>
              </div>
            </motion.div>
          );
        })}

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
