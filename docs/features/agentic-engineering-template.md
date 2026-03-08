# Feature Specification Document: Agentic Engineering Template Integration

## 1. Executive Summary

- **Feature**: Integrate the Agentic Engineering Template
- **Status**: Implemented
- **Summary**: This feature establishes a robust, AI-agent-friendly repository structure by importing operational guidelines and validation mechanisms from the `innosage-agentic-template`. It introduces essential tracking and behavioral files (`AGENTS.md`, `SOUL.md`, `MEMORY.md`, etc.) and sets up "The Gate"—a mandatory pre-commit validation script (`gatekeeper.sh`) to ensure code quality through linting, building, and testing before any code is merged.

## 2. Design Philosophy & Guiding Principles

**Clarity vs. Power:**
- **Our Principle**: Prioritize clarity and strict adherence to rules. The "Gate" must be simple to run (`npm run gate`) but powerful enough to catch regressions.

**Convention vs. Novelty:**
- **Our Principle**: Leverage standard Next.js conventions. While the original template used `oxlint` and `vitest`, we opted to retain Next.js native defaults (`eslint` and `jest`) to ensure deep compatibility with the App Router and React Server Components, avoiding configuration overhead for minimal latency gains.

**Guidance vs. Freedom:**
- **Our Principle**: Provide strong guardrails. Agents are given explicit instructions via `AGENTS.md` and are forced to pass `gatekeeper.sh` to prevent entropy from entering the codebase.

## 3. Problem Statement & Goals

- **Problem**: As AI agents increasingly autonomously modify the codebase, there is a high risk of introducing regressions, breaking builds, or losing context between sessions without a formalized structure.
- **Goals**:
  - Establish a standardized instruction layer for AI agents.
  - Enforce a strict, automated validation pipeline ("The Gate") that runs locally.
  - Maintain long-term memory and context for autonomous tasks.
- **Success Metrics**:
  - Zero broken `main` branch builds due to agentic commits.
  - 100% of agent tasks log their context in `MEMORY.md` or `ACTIVE_TASKS.md`.

## 4. Scope

- **In Scope:**
  - Copying context files: `AGENTS.md`, `SOUL.md`, `IDENTITY.md`, `MEMORY.md`, `ACTIVE_TASKS.md`, `USER.md`.
  - Creating `scripts/gatekeeper.sh` tailored for a Next.js environment.
  - Adding a root `package.json` to expose the `npm run gate` command.
- **Out of Scope:**
  - Migrating the existing Next.js `web/` application to use `oxlint` or `vitest`.
  - Setting up GitHub Actions (explicitly removed to save CI quota; validation must be local).

## 5. User Stories

- As an **AI Agent**, I want **explicit instructions in `AGENTS.md`** so that **I know the rules and boundaries of modifying this repository**.
- As a **Human Reviewer**, I want **a `gatekeeper.sh` script** so that **I can trust the agent has verified its changes before submitting a PR**.
- As a **Developer**, I want **the repository to use standard Next.js linting/testing tools** so that **I don't have to learn custom configuration for an agentic framework**.

## 6. Acceptance Criteria

- **Scenario: Running The Gate**
  - **Given**: An agent or developer has made changes to the `web/` directory.
  - **When**: They execute `npm run gate` from the root directory.
  - **Then**: The script changes into the correct directory relative to itself.
  - **And**: It successfully executes `npm run lint`, `npm run build`, and `npm run test` in sequence.

## 7. UI/UX Flow & Requirements

- **User Flow**: Purely CLI-based. Developer/Agent runs `npm run gate`. The terminal outputs emojis and clear steps (🛡️, 🔍, 🏗️, 🧪, ✅) to indicate progress and success.

## 8. Technical Design & Implementation

- **High-Level Approach**: The implementation is purely structural and script-based.
- **Component Breakdown**:
  - `scripts/gatekeeper.sh`: A bash script that uses `cd "$(dirname "$0")/../web"` to robustly locate the Next.js app, then runs npm scripts.
  - Root `package.json`: A simple proxy file containing `{"scripts": {"gate": "./scripts/gatekeeper.sh"}}`.
  - Context Files: Static Markdown files placed in the root directory.

## 9. Data Management & Schema

- N/A - This feature does not manage application data. It manages repository metadata via Markdown files.

## 10. Storage Compatibility Strategy (Critical)

- N/A - Not a product feature.

## 11. Environment & Runtime Compatibility

| Feature Aspect | Local Dev (localhost) | AI Studio / Cloud IDE | Production (Deployed) |
| :--- | :--- | :--- | :--- |
| **Availability** | Full | Full | N/A |
| **Behavior** | `npm run gate` executes | `npm run gate` executes | N/A |
| **Degradation** | Fails if `npm` is not installed | Fails if environment lacks `bash` | N/A |

## 12. Manual Verification Script (QA)

### 12.1. Executable Validation Script
Because this is a CLI tooling feature, validation is performed via bash, not the browser console.

```bash
# Execute from the root of the repository
npm run gate
# Verify the output ends with:
# ✅ Gate Passed! The changes are safe to commit.
```

### 12.2. Critical Edge Cases (P0)

-   **Scenario**: Running the script from a different working directory.
    -   **Action**: `cd scripts && ./gatekeeper.sh`
    -   **Check**: The script should still successfully locate the `web/` directory and run the Next.js commands.

## 13. Limitations & Known Issues

-   **Limitation 1**: The validation is entirely local. Because GitHub Actions were removed to save quota, there is no server-side enforcement preventing a user from bypassing the Gate and merging broken code directly.

## 14. Architectural Visuals (Optional)

N/A

## 15. Setup & Configuration Guide (Optional)

No special setup required. Ensure you are using a Node environment compatible with Next.js (Node >= 18) and run `npm install` inside the `web/` directory before running `npm run gate` for the first time.
