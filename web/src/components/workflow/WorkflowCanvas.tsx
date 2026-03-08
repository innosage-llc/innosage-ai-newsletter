'use client';

import React, { useCallback, useEffect } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  BackgroundVariant
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';

import FetchNode from './FetchNode';
import AiSummarizeNode from './AiSummarizeNode';

const nodeTypes = {
  fetchRss: FetchNode,
  aiSummarize: AiSummarizeNode,
};

const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

export default function WorkflowCanvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const fetchState = async () => {
      try {
        const response = await fetch('/api/workflow');
        if (response.ok) {
          const data = await response.json();

          const mergeItems = <T extends { id: string }>(
            prevItems: T[],
            serverItems: T[],
          ): T[] => {
            const existingIds = new Set(prevItems.map((item) => item.id));
            const itemsToAdd = serverItems.filter((item) => !existingIds.has(item.id));

            if (itemsToAdd.length > 0) {
              return [...prevItems, ...itemsToAdd];
            }

            return prevItems;
          };

          setNodes((prevNodes) => mergeItems(prevNodes, data.nodes));
          setEdges((prevEdges) => mergeItems(prevEdges, data.edges));
        }
      } catch (error) {
        console.error('Failed to fetch workflow state:', error);
      } finally {
        timeoutId = setTimeout(fetchState, 1000);
      }
    };

    // Initial fetch
    fetchState();

    return () => clearTimeout(timeoutId);
  }, [setNodes, setEdges]);

  const onConnect = useCallback(
    (params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  return (
    <div className="flex-grow w-full border border-border rounded-lg overflow-hidden bg-muted/20">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}