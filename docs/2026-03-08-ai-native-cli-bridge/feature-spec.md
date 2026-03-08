# Feature Specification Document: AI-Native CLI Bridge

## 1. Executive Summary

- **Feature**: AI-Native CLI Bridge (`innosage-opal-cli`)
- **Status**: Planned
- **Summary**: This feature allows users to interact with the visual workflow manager directly from their local terminal using their own local AI agents (e.g., Gemini Code, Claude Code), instead of relying solely on the built-in remote agents offered by the app. This creates a bridge between the web-based visual interface and the user's powerful, private local terminal environment.

## 2. Design Philosophy & Guiding Principles

**Clarity vs. Power:**
- **Our Principle**: Prioritize a seamless developer experience. The bridge should be easy to set up, and the commands should feel natural to a terminal user.

**Convention vs. Novelty:**
- **Our Principle**: Adhere strictly to CLI conventions (like robust error handling, standard I/O) while offering a novel way to control a web-based visual canvas.

**Guidance vs. Freedom:**
- **Our Principle**: Provide a flexible sandbox for users to script and automate their workflows via their local agents, with strong guardrails to prevent breaking the visual state.

**Forgiveness vs. Strictness:**
- **Our Principle**: Design for forgiveness. Allow dry-runs of commands and easy ways to revert state if a CLI command produces an unintended workflow structure.

## 3. Problem Statement & Goals

- **Problem**: Power users and developers often prefer to use their local, highly-customized terminal environments and powerful local AI agents rather than being constrained by a web application's built-in, potentially less capable, or less private remote agents.
- **Goals**:
  - Goal 1: Provide a Node.js-based CLI tool (`innosage-opal-cli`) that can receive instructions and manipulate the workflow state.
  - Goal 2: Ensure real-time (or near real-time) synchronization between CLI actions and the visual React Flow canvas.
- **Success Metrics**:
  - Metric 1: Users can successfully add a node via the CLI and see it appear on the web canvas.
  - Metric 2: Minimal latency (Sub-100ms ideally, per core principles) between command execution and visual update.

## 4. Scope

- **In Scope:**
  - Developing the `innosage-opal-cli` executable.
  - Creating a communication mechanism (e.g., local server, file watching, or WebSockets) to sync state between the CLI and the web app running locally.
  - Basic commands: add node, connect nodes, list nodes.
- **Out of Scope:**
  - Full remote cloud syncing for this CLI (focusing on local-first interaction for now).
  - Complex visual layout auto-arrangement algorithms within the CLI (can just place nodes sequentially for now).

## 5. User Stories

- As a **Power User**, I want **to use Claude Code in my terminal to script a complex news aggregation workflow** so that **I can leverage its advanced reasoning capabilities without being restricted by the web UI.**
- As a **Developer**, I want **the CLI to provide clear, parseable output** so that **my local agent can easily read the current state of the workflow and decide what to do next.**

## 6. Acceptance Criteria

- **Scenario: Adding a node via CLI**
  - **Given**: The web application is running locally and the `innosage-opal-cli` is configured to point to it.
  - **When**: I run `innosage-opal-cli add-node --type fetchRss --label "TechCrunch"`
  - **Then**: A new "Fetch RSS" node labeled "TechCrunch" appears on the React Flow canvas in the browser.

## 7. Technical Design & Implementation

- **High-Level Approach**: We will create a local API or a shared state file mechanism. Since the web app uses Next.js, we can add a local API route that the CLI tool hits. The React Flow component will poll or listen via SSE/WebSocket to this API route to update its state. Alternatively, for a simpler "local-first" approach, both could read/write to a local JSON file in the project directory, and the web app watches for file changes (though API route is more robust). We'll go with a simple API route on the Next.js dev server for immediate implementation.

- **Component Breakdown**:
  - `web/src/app/api/workflow/route.ts`: New API endpoint to get/set workflow state.
  - `web/src/components/workflow/WorkflowCanvas.tsx`: Update to fetch state from the API on load and periodically poll or use SWR/React Query for updates (or just simple `setInterval` for the MVP).
  - `cli/innosage-opal-cli.js`: A new Node.js script to interact with the local API.

## 8. Data Management & Schema

### 8.1. Data Schema
A simple JSON representation of the nodes and edges.
```json
{
  "nodes": [...],
  "edges": [...]
}
```

## 10. Storage Compatibility Strategy (Critical)

| Feature Aspect | Firebase (Cloud) | Google Drive (BYOS) | Static Mirror (R2) |
| :--- | :--- | :--- | :--- |
| **CLI Sync** | N/A (Local Dev feature) | N/A | N/A |
*Note: This feature is primarily for local development/interaction bridge.*

## 12. Manual Verification Script (QA)

```javascript
(async () => {
  console.group('🧪 Feature Verification');
  try {
     // Execute: Hit the local API to add a node
     const res = await fetch('/api/workflow', {
       method: 'POST',
       body: JSON.stringify({ action: 'addNode', type: 'fetchRss', label: 'CLI Test' })
     });
     if(!res.ok) throw new Error("API failed");

     // Assert: Check if the node is rendered in the DOM
     // (Requires waiting for re-render, simplified here)
     console.log('✅ SUCCESS');
  } catch (e) {
     console.error('❌ FAILED', e);
  }
  console.groupEnd();
})();
```
