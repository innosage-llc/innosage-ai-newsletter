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
    const fetchState = async () => {
      try {
        const response = await fetch('/api/workflow');
        if (response.ok) {
          const data = await response.json();
          // To prevent constant re-rendering if nodes haven't changed,
          // we could deep compare, but for now we just update state
          // A simple shallow length check or stringify check helps a bit
          // We only want to add new nodes from the server that don't exist locally
          // to avoid overwriting node positions changed by the user in the UI.
          setNodes((prevNodes) => {
             let changed = false;
             const newNodes = [...prevNodes];

             data.nodes.forEach((serverNode: Node) => {
               const existingNodeIndex = newNodes.findIndex(n => n.id === serverNode.id);
               if (existingNodeIndex === -1) {
                 newNodes.push(serverNode);
                 changed = true;
               }
             });

             return changed ? newNodes : prevNodes;
          });

          setEdges((prevEdges) => {
             let changed = false;
             const newEdges = [...prevEdges];

             data.edges.forEach((serverEdge: Edge) => {
               const existingEdgeIndex = newEdges.findIndex(e => e.id === serverEdge.id);
               if (existingEdgeIndex === -1) {
                 newEdges.push(serverEdge);
                 changed = true;
               }
             });

             return changed ? newEdges : prevEdges;
          });
        }
      } catch (error) {
        console.error('Failed to fetch workflow state:', error);
      }
    };

    // Initial fetch
    fetchState();

    // Poll every 1000ms
    const intervalId = setInterval(fetchState, 1000);

    return () => clearInterval(intervalId);
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