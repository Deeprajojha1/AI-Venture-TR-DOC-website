import React from "react";
import { Card, CardContent } from "../ui/Card";
import { Download, FileText } from "lucide-react";
import Button from "../ui/Button";

// Custom light-weight markdown parser for premium rendering
const parseMarkdown = (markdownText) => {
  if (!markdownText) return <p className="text-gray-500 italic">No report content available.</p>;

  const lines = markdownText.split("\n");
  let inList = false;
  let listItems = [];
  let inTable = false;
  let tableRows = [];

  const elements = [];

  const flushList = (key) => {
    if (listItems.length > 0) {
      elements.push(
        <ul key={`list-${key}`} className="list-disc pl-5 my-3.5 space-y-2 text-gray-300">
          {listItems}
        </ul>
      );
      listItems = [];
      inList = false;
    }
  };

  const flushTable = (key) => {
    if (tableRows.length > 0) {
      // Filter out markdown divider row like |---|---|
      const filteredRows = tableRows.filter(row => !row.every(cell => cell.trim().startsWith("---") || cell.trim().startsWith(":---")));
      
      if (filteredRows.length > 0) {
        const headers = filteredRows[0];
        const bodyRows = filteredRows.slice(1);

        elements.push(
          <div key={`table-wrapper-${key}`} className="overflow-x-auto my-5 rounded-xl border border-white/[0.08] bg-white/[0.01]">
            <table className="min-w-full divide-y divide-white/[0.08] text-sm">
              <thead className="bg-white/[0.03]">
                <tr>
                  {headers.map((cell, idx) => (
                    <th key={`th-${idx}`} className="px-4 py-3 text-left font-bold text-gray-200">
                      {cell.trim().replace(/\*\*/g, "")}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {bodyRows.map((row, rowIdx) => (
                  <tr key={`tr-${rowIdx}`} className="hover:bg-white/[0.01] transition-colors">
                    {row.map((cell, cellIdx) => (
                      <td key={`td-${cellIdx}`} className="px-4 py-3 text-gray-300 font-medium">
                        {cell.trim().replace(/\*\*/g, "")}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
      tableRows = [];
      inTable = false;
    }
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    // Handle Table rows: starts and ends with |
    if (trimmed.startsWith("|") && trimmed.endsWith("|")) {
      flushList(index);
      inTable = true;
      const cells = trimmed.split("|").slice(1, -1);
      tableRows.push(cells);
      return;
    } else if (inTable) {
      flushTable(index);
    }

    // Handle Lists
    if (trimmed.startsWith("* ") || trimmed.startsWith("- ") || trimmed.match(/^\d+\.\s/)) {
      inList = true;
      const bulletContent = trimmed.replace(/^(\*\s|-\s|\d+\.\s)/, "");
      
      // Inline bold parsing
      const formattedContent = bulletContent.split("**").map((part, idx) => 
        idx % 2 === 1 ? <strong key={idx} className="text-white font-bold">{part}</strong> : part
      );

      listItems.push(
        <li key={`li-${index}`} className="text-gray-300">
          {formattedContent}
        </li>
      );
      return;
    } else if (inList) {
      flushList(index);
    }

    // Handle Headings
    if (trimmed.startsWith("# ")) {
      elements.push(
        <h1 key={index} className="text-3xl font-extrabold text-white mt-6 mb-4 border-b border-white/[0.08] pb-2 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
          {trimmed.substring(2)}
        </h1>
      );
    } else if (trimmed.startsWith("## ")) {
      elements.push(
        <h2 key={index} className="text-xl font-bold text-purple-300 mt-5 mb-3">
          {trimmed.substring(3)}
        </h2>
      );
    } else if (trimmed.startsWith("### ")) {
      elements.push(
        <h3 key={index} className="text-base font-semibold text-cyan-300 mt-4 mb-2">
          {trimmed.substring(4)}
        </h3>
      );
    } else if (trimmed === "") {
      // Empty line, spacing
    } else {
      // Paragraph with inline bold parsing
      const formattedLine = trimmed.split("**").map((part, idx) => 
        idx % 2 === 1 ? <strong key={idx} className="text-white font-bold">{part}</strong> : part
      );
      elements.push(
        <p key={index} className="text-sm text-gray-300 leading-relaxed my-2">
          {formattedLine}
        </p>
      );
    }
  });

  // Flush any remaining active blocks
  flushList(lines.length);
  flushTable(lines.length);

  return elements;
};

export const ReportViewer = ({ title, content, onExport }) => {
  return (
    <Card className="flex flex-col h-[550px] border-white/[0.06] bg-white/[0.01]">
      {/* Header bar */}
      <div className="flex justify-between items-center p-4 border-b border-white/[0.08] bg-white/[0.02]">
        <div className="flex items-center gap-2 text-sm text-gray-300 font-semibold">
          <FileText className="h-4.5 w-4.5 text-purple-400" />
          <span>{title}</span>
        </div>

        <Button 
          variant="secondary" 
          size="sm"
          onClick={onExport}
          className="gap-1.5 py-1 px-3 text-xs font-semibold cursor-pointer"
        >
          <Download className="h-3.5 w-3.5" />
          Export
        </Button>
      </div>

      {/* Content panel */}
      <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        <article className="prose prose-invert max-w-none text-left">
          {parseMarkdown(content)}
        </article>
      </div>
    </Card>
  );
};

export default ReportViewer;
