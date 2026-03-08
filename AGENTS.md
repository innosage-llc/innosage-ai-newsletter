# AGENTS.md - Operational Rules for Agents

## The Non-Negotiable "Gate"
Every task MUST pass the Gate before it is considered complete. No exceptions.
The Gate command for this repository is:
`npm run gate` (which executes: `npm run lint && npm run build && npm run test` inside the web directory)

## Atomic Agentic Committing
- One logical change per commit.
- Agents should commit early and often once the Gate passes.
- Use descriptive commit messages following Conventional Commits.

## Closing the Loop
1. **Identify**: Read the task/issue.
2. **Execute**: Modify the code.
3. **Verify (The Gate)**: Run the Gate. If it fails, fix and repeat until it passes.
4. **Commit/Push**: Create a feature branch and submit a PR.
5. **Optimistic Merge (The 10-Minute Rule)**:
   - Once a PR is open and all CI/Gate checks are green, announce: *"PR is ready for audit. If no feedback is received within 10 minutes, I will proceed to squash-merge."*
   - **Condition**: There must be NO pending code review comments or change requests from a human or another agent.
   - **Action**: If 10 minutes pass with no feedback, perform a squash-merge to production (`main`/`master`).
   - **Logging**: Comment on the PR summarizing the actions taken during the merge and log the completion in `AUDIT.md`.

## Workspace Structure
- `memory/`: Daily logs (`YYYY-MM-DD.md`).
- `MEMORY.md`: Long-term curated memory.
- `ACTIVE_TASKS.md`: Orchestration of current work.
- `scripts/gatekeeper.sh`: The local validation script.
