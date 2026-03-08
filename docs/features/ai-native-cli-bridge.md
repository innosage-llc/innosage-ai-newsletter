# Feature Specification Document: AI-Native CLI Bridge

## 1. Executive Summary

- **Feature**: AI-Native CLI Bridge (`innosage-opal-cli`)
- **Status**: Planned
- **Summary**: This feature provides a dedicated Command Line Interface (CLI) tool that acts as an AI-native bridge. It allows users running local terminal-based AI agents (like Claude Code, Cursor, or custom Gemini scripts) to interact directly with the InnoSage visual workflow manager's state. Instead of relying on the app's built-in remote agents, users can leverage their own local compute to read canvas states, update nodes, and trigger pipelines, achieving sub-100ms latency and absolute data privacy.

## 2. Design Philosophy & Guiding Principles

**Clarity vs. Power:**

- **Guiding Question**: Is the primary goal for this feature to be immediately understandable and simple, or to be feature-rich and powerful for expert users?
- **Our Principle**: Prioritize **Power and Extensibility**. This tool is explicitly designed for everyday professionals transforming into *builders*. It should provide robust access to the underlying state machine of the workflow canvas, enabling complex automation via their terminal agents.

**Convention vs. Novelty:**

- **Guiding Question**: Should this feature leverage familiar, industry-standard patterns, or should we introduce a novel interaction to solve the problem in a unique way?
- **Our Principle**: Adhere strictly to **Platform Conventions** (POSIX CLI standards). Commands should follow standard verb-noun syntax (e.g., `get-state`, `update-node`) and input/output should be standard JSON, easily parseable by any terminal-based LLM.

**Guidance vs. Freedom:**

- **Guiding Question**: How much should we guide the user? Should we provide a highly opinionated, step-by-step workflow, or give them a flexible "sandbox" to work in?
- **Our Principle**: Provide a flexible **Sandbox**. The CLI is a set of building blocks. How the user's local agent combines them to automate the newsletter generation pipeline is entirely up to their prompting and logic.

**Forgiveness vs. Strictness:**

- **Guiding Question**: How do we handle user error? Should the system prevent errors from happening, or make it easy to undo mistakes after they've been made?
- **Our Principle**: Design for **Strictness and Validation**. Because AI agents can hallucinate payloads, the CLI and the receiving bridge must rigorously validate all incoming JSON mutations against the React Flow schema before applying them. Invalid states must be rejected with clear error messages for the agent to self-correct.

**Aesthetic & Tone:**

- **Guiding Question**: What is the emotional goal of this feature? What should the user feel?
- **Our Principle**: The tone is **"Stable Output"**—professional, minimalist, and exceptionally fast. Error messages should be analytical and actionable, not apologetic or conversational.

## 3. Problem Statement & Goals

- **Problem**: Power users and builders want to use their preferred, heavily customized local agents (running locally via terminal) to interact with the InnoSage workflow canvas. Currently, the platform relies on built-in remote agents, creating friction for users who want zero-latency execution, air-gapped data privacy, or specific local LLM capabilities.
- **Goals**:
  - Goal 1: Enable standard CRUD operations on the workflow canvas state via a local CLI tool.
  - Goal 2: Maintain sub-100ms latency between terminal command execution and canvas state update.
  - Goal 3: Ensure the Next.js web application can securely receive and reflect local CLI state changes without requiring external network routing.
- **Success Metrics**:
  - Metric 1: A local terminal agent can successfully read the canvas state, identify a target node, and update its text content using the CLI with 0 errors.
  - Metric 2: Latency between CLI execution and visual update in the locally running Next.js app is < 100ms.

## 4. Scope

- **In Scope:**
  - Creating a Node.js-based CLI tool (`innosage-opal-cli`).
  - Commands to get the current workflow state (nodes and edges).
  - Commands to mutate specific nodes (e.g., update content, change status).
  - Adding a lightweight, localhost-only API/WebSocket bridge to the Next.js `/web` application to listen for CLI commands.
- **Out of Scope:**
  - Remote synchronization of CLI commands (this is strictly a local-first feature).
  - Graphical UI for configuring the CLI (configuration is via environment variables or `.rc` files).
  - Supporting terminal agents that cannot execute shell commands.

## 5. User Stories

- As a **Builder with a local AI agent**, I want **to run `innosage-opal-cli get-state`** so that **my agent can understand the current structure of my newsletter workflow without looking at the screen.**
- As a **Builder with a local AI agent**, I want **to run `innosage-opal-cli update-node --id=123 --data='{"text": "New summary"}'`** so that **my agent can automatically inject its generated content directly into the visual canvas.**

## 6. Acceptance Criteria

- **Scenario: Reading canvas state**
  - **Given**: The Next.js web application is running locally.
  - **When**: The user executes `innosage-opal-cli get-state` in their terminal.
  - **Then**: The CLI outputs a valid JSON representation of the current React Flow nodes and edges.

- **Scenario: Mutating a node**
  - **Given**: The Next.js web application is running locally with a node ID `test-node-1`.
  - **When**: The user executes `innosage-opal-cli update-node --id=test-node-1 --data='{"label": "Updated by Agent"}'`.
  - **Then**: The CLI returns a success message.
  - **And**: The visual canvas in the browser immediately updates to show "Updated by Agent" on that node.

## 7. UI/UX Flow & Requirements

- **User Flow**:
  1. User starts the InnoSage web application locally (`npm run dev` in `/web`).
  2. User starts their local AI agent (e.g., Claude Code) in a separate terminal.
  3. The agent executes `innosage-opal-cli get-state` to read the context.
  4. The agent generates new content locally.
  5. The agent executes `innosage-opal-cli update-node` to push the new content to the canvas.
- **Visual Design**: No new primary visual UI. The Next.js app may show a small non-intrusive indicator (e.g., a green dot in the footer) indicating "Local Bridge Active."
- **Copywriting**: CLI output messages must be concise JSON or plain text formats optimized for LLM parsing.

## 8. Technical Design & Implementation

- **High-Level Approach**:
  1. **The App Bridge**: The Next.js application will initialize a lightweight local server (e.g., using standard Node `http` or WebSockets, bound *strictly* to `127.0.0.1`) alongside the Next.js dev server. This bridge holds a reference to the React Flow state setter functions.
  2. **The CLI**: A standalone Node script (the CLI) that parses arguments (using a library like `commander` or plain `process.argv`) and sends standard HTTP POST/GET requests to the App Bridge on `127.0.0.1`.
- **Component Breakdown**:
  - `web/src/lib/local-bridge.ts`: Initializes the localhost server/listener.
  - `web/src/components/WorkflowCanvas.tsx`: Connects React Flow state to the `local-bridge` singleton to receive state updates.
  - `cli/index.js` (or similar): The entry point for the `innosage-opal-cli` command.
- **API Endpoints (Internal Localhost)**:
  - `GET http://127.0.0.1:4040/state`: Returns full state.
  - `POST http://127.0.0.1:4040/nodes/:id`: Updates a specific node.
- **Key Logic**: Strict validation of incoming state updates against the expected React Flow schema to prevent terminal agents from corrupting the visual canvas.

## 9. Data Management & Schema

### 9.1. Data Source
The data originates from the Next.js React Flow state (browser memory) and is mutated by the local CLI acting as an external actor.

### 9.2. Data Schema
```json
{
  "nodes": [
    {
      "id": "string",
      "type": "string",
      "position": { "x": 0, "y": 0 },
      "data": { "label": "string", "content": "string" }
    }
  ],
  "edges": []
}
```

### 9.3. Persistence
The CLI itself does not persist data. It merely acts as a bridge to mutate the in-memory state of the running web application. The web application handles persistence according to its standard rules (e.g., saving to local storage or a remote backend if configured).

## 10. Storage Compatibility Strategy (Critical)

| Feature Aspect | Firebase (Cloud) | Google Drive (BYOS) | Static Mirror (R2) |
| :--- | :--- | :--- | :--- |
| **Data Storage** | Works seamlessly; CLI mutates local state, app syncs to Firebase. | Works seamlessly; CLI mutates local state, app syncs to Drive. | N/A (Read-only mirror). |
| **Real-time Sync** | Handled by app. | Handled by app. | N/A. |
| **Permissions** | CLI bypasses remote auth as it operates locally on the client's machine. | Same as above. | N/A. |
| **CLI Bridge** | **Fully Supported locally.** | **Fully Supported locally.** | **Not Applicable.** |

## 11. Environment & Runtime Compatibility

| Feature Aspect | Local Dev (localhost) | AI Studio / Cloud IDE | Production (Deployed) |
| :--- | :--- | :--- | :--- |
| **Availability** | Full | Restricted | Disabled |
| **Behavior** | App opens local port (e.g., 4040). CLI connects successfully. | May fail if Cloud IDE restricts arbitrary port binding. | Bridge does not initialize in production builds. CLI cannot connect. |
| **Degradation** | N/A | Bridge silently fails to bind; UI shows "Local Bridge Unavailable". | Bridge code stripped or dead-code eliminated. |

## 12. Manual Verification Script (QA)

### 12.1. Executable Validation Script
*(Run this in the terminal after starting the local web app)*

```bash
#!/bin/bash
echo "🧪 Testing CLI Bridge"

# 1. Start the app in background (assuming it runs on standard port, bridge on 4040)
# npm run dev &
# sleep 5

# 2. Get State
STATE=$(curl -s http://127.0.0.1:4040/state)
if [[ -z "$STATE" ]]; then
  echo "❌ FAILED: Could not fetch state from bridge."
  exit 1
fi
echo "✅ State fetched."

# 3. Mutate (Mock request simulating the CLI tool)
RESPONSE=$(curl -s -X POST http://127.0.0.1:4040/nodes/test-id \
  -H "Content-Type: application/json" \
  -d '{"data": {"label": "CLI Test"}}')

if [[ "$RESPONSE" != *"success"* ]]; then
  echo "❌ FAILED: Mutation rejected."
  exit 1
fi
echo "✅ Mutation successful."
echo "✅ ALL TESTS PASSED."
```

### 12.2. Critical Edge Cases (P0)

-   **Scenario**: Web application is not running.
    -   **Action**: Execute `innosage-opal-cli get-state`.
    -   **Check**: CLI fails gracefully with a clear error: "Connection Refused: Ensure the InnoSage web app is running locally."
-   **Scenario**: AI agent sends malformed JSON to mutate node.
    -   **Action**: Execute `innosage-opal-cli update-node --id=1 --data='{bad json}'`.
    -   **Check**: CLI catches syntax error before sending, or Bridge rejects payload with a clear schema validation error.

## 13. Limitations & Known Issues

-   **Limitation 1**: The bridge requires the web app to be running on the same physical machine (localhost) as the CLI tool. It will not work if the app is hosted remotely.
-   **Limitation 2**: Security assumes `127.0.0.1` is a trusted environment. Any local process could theoretically interact with the bridge port.

## 14. Setup & Configuration Guide (Optional)

### Step 1: Install CLI

1.  In the repository root, developers should link the CLI locally: `npm link` (within the `/cli` package directory once created).
2.  Alternatively, use `npx` if published.

### Step 2: Ensure App is Running

1.  Navigate to `/web`.
2.  Run `npm run dev`.
3.  Ensure the console logs indicate the Local Bridge has started on port 4040.