import React, { useMemo } from "react";
import { ReactFlow, Background, Controls } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import AgentNode from "./AgentNode";
import { getNodeStatus } from "../../utils/workflow";

// Register custom node types
const nodeTypes = {
  agentNode: AgentNode
};

export const AgentFlow = ({ workflowNodes = [], completedNodes = [], currentNodeIndex = 0 }) => {
  // Generate React Flow nodes
  const nodes = useMemo(() => {
    // Snake layout coordinates
    const layout = [
      // Row 1 (Left to Right)
      { x: 40, y: 40 },
      { x: 260, y: 40 },
      { x: 480, y: 40 },
      { x: 700, y: 40 },
      // Row 2 (Right to Left)
      { x: 700, y: 160 },
      { x: 480, y: 160 },
      { x: 260, y: 160 },
      { x: 40, y: 160 },
      // Row 3 (Left to Right)
      { x: 40, y: 280 },
      { x: 260, y: 280 },
      { x: 480, y: 280 },
      { x: 700, y: 280 }
    ];

    return workflowNodes.map((node, index) => {
      return {
        id: node.id,
        type: "agentNode",
        position: layout[index] || { x: index * 200, y: 50 },
        data: {
          label: node.label,
          description: node.description,
          status: getNodeStatus(completedNodes, currentNodeIndex, index)
        }
      };
    });
  }, [completedNodes, currentNodeIndex, workflowNodes]);

  // Generate React Flow edges connecting the nodes sequentially
  const edges = useMemo(() => {
    const edgeList = [];
    for (let i = 0; i < workflowNodes.length - 1; i++) {
      const sourceId = workflowNodes[i].id;
      const targetId = workflowNodes[i + 1].id;

      // Determine edge glow colors based on completion state
      const isSourceCompleted = completedNodes.includes(i);
      const isTargetCompleted = completedNodes.includes(i + 1);
      const isCurrentActive = i === currentNodeIndex || (i + 1) === currentNodeIndex;

      let strokeColor = "rgba(255,255,255,0.06)";
      let animated = false;

      if (isSourceCompleted && isTargetCompleted) {
        strokeColor = "#10b981"; // green completed path
      } else if (isSourceCompleted && isCurrentActive) {
        strokeColor = "#06b6d4"; // cyan active path
        animated = true;
      }

      edgeList.push({
        id: `e-${sourceId}-${targetId}`,
        source: sourceId,
        target: targetId,
        animated: animated,
        style: {
          stroke: strokeColor,
          strokeWidth: 2,
          filter: strokeColor !== "rgba(255,255,255,0.06)" ? `drop-shadow(0 0 6px ${strokeColor})` : "none"
        }
      });
    }
    return edgeList;
  }, [completedNodes, currentNodeIndex, workflowNodes]);

  return (
    <div className="w-full h-[400px] rounded-2xl bg-white/[0.01] border border-white/[0.06] overflow-hidden relative shadow-[inset_0_4px_30px_rgba(0,0,0,0.5)]">
      {/* Background Grid Accent */}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.15 }}
        minZoom={0.5}
        maxZoom={1.5}
        nodesConnectable={false}
        nodesDraggable={false}
        elementsSelectable={false}
        panOnDrag={true}
        zoomOnScroll={true}
      >
        <Background color="#fff" opacity={0.03} gap={16} size={1} />
        <Controls 
          showInteractive={false} 
          className="!bg-black/80 !border-white/10 !text-white flex gap-1 rounded-xl !shadow-none [&>button]:!bg-transparent [&>button]:!border-none [&>button]:!text-gray-400 [&>button:hover]:!text-white"
        />
      </ReactFlow>
    </div>
  );
};

export default AgentFlow;
