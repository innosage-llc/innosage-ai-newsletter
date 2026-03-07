# [Issue Title] - Post Mortem

**Date:** [YYYY-MM-DD]
**Tags:** [Component], [Bug Type], [Severity]

## 1. The "Sticky" Issue

**Symptoms:**

- [Observable behavior 1]
- [Observable behavior 2]

**Context:**

- What was the user trying to do?
- What was the agent's initial hypothesis?

## 2. Root Cause Analysis (The "Why")

**Technical Failure:**

- [Exact technical reason, e.g., variable shadowing, race condition]

**Process Failure (if any):**

- [e.g., "Assumed CSS was standard without inspecting", "Relied on outdated docs"]

**Strategic & Process Review (The "5 Whys"):**

1. **Why did we face this issue again?** (Recurrence check: Was this "temporarily fixed" before?)
2. **What is new?** (What new information/conditions revealed the failure now?)
3. **If nothing new, why couldn't we fix this before?** (Patch vs Cure: Did we apply a bandage instead of addressing root cause?)
4. **Strategic Value:** (Why do we keep the problematic component? e.g., "Why keep UniqueID if it causes bugs?")
5. **Alternatives:** (Have we evaluated removing it or replacing it entirely?)

## 3. The Resolution (The "How")

**Key Fixes:**

- [File/Component]: [Change description]
- [Configuration]: [Change description]

**Why this blocked us:**

- [Explanation of why this was hard to find]

## 4. Co-Debugging Learnings

**Effective Patterns:**

- [Tool Usage]: e.g., 'Using `browser_subagent` to check computed styles was faster than guessing.'
- [Workflow]: e.g., 'Isolating variables X and Y helped pinpoint the race condition.'

**Anti-Patterns (What to avoid):**

- [e.g., "Trying to fix multiple test failures at once"]

## 5. Human Navigator Evaluation

**Performance Review:**

- Did the human provide the right strategic direction at the right time?
- Did the human intervene too late or too early?

**What went well:**

- [e.g., "Provided the critical hint about the specific extension"]
- [e.g., "Forced the agent to pause and 'think' instead of writing code"]

**Areas for Improvement (Navigator):**

- [e.g., "Could have asked for logs earlier"]
- [e.g., "Should not have accepted 'it works' without seeing proof"]

## 6. Action Items (Mandatory)

**Preventative Measures & Tech Debt Paydown:**
| Action Item | Owner | Deadline | Status |
|-------------|-------|----------|--------|
| [e.g., Remove dependency X] | [Agent/User] | [YYYY-MM-DD] | [ ] |
| [e.g., Update CI pipeline] | [Agent] | [YYYY-MM-DD] | [ ] |

**Documentation Updates:**

- [ ] Create/Update [Workflow Name] in `.agent/workflows`.
- [ ] Update [Old Post-Mortem] if this session disproves previous learnings.
