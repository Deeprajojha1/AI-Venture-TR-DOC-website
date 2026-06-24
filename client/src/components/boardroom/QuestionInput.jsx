import React, { useState } from "react";
import { MessageSquare, Send } from "lucide-react";
import Button from "../ui/Button";
import { useStudioStore } from "../../store/useStudioStore";

export const QuestionInput = () => {
  const [question, setQuestion] = useState("");
  const { askBoardroom, isBoardroomTyping } = useStudioStore();

  const handleSend = (e) => {
    e.preventDefault();
    if (!question.trim() || isBoardroomTyping) return;
    askBoardroom(question);
    setQuestion("");
  };

  return (
    <form onSubmit={handleSend} className="flex gap-2.5 items-center w-full">
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
          <MessageSquare className="h-4.5 w-4.5" />
        </div>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          disabled={isBoardroomTyping}
          placeholder="Ask the board (e.g., 'What database should we use?', 'How should we price?')..."
          className="w-full pl-10.5 pr-4 py-3 rounded-2xl bg-white/[0.03] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/30 transition-all duration-300 disabled:opacity-60"
        />
      </div>

      <Button
        type="submit"
        disabled={!question.trim() || isBoardroomTyping}
        className="px-4 py-3 rounded-2xl shrink-0 cursor-pointer"
      >
        <Send className="h-4 w-4" />
        <span className="hidden sm:inline ml-1.5 font-bold">Consult Board</span>
      </Button>
    </form>
  );
};

export default QuestionInput;
