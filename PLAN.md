# InnoSage AI Newsletter: Project Master Plan (Q1 2026)

## 1. Executive Summary
This project transforms our internal AI curation into a strategic corporate asset and a marketing engine for the **InnoSage Notion-Style Markdown Editor**. By automating the "News-to-Markdown-to-Web" pipeline, we demonstrate our "Performance-First" architecture while building a high-trust, "Stable Output" (情绪稳定输出端) brand for everyday professionals and entrepreneurs transforming into entry-level AI builders.

---

## 2. Current Status & Assets
- [x] **Repository Scaffolded:** All core directories (`sources`, `engine`, `templates`, `publishing`, `archives`) initialized.
- [x] **Strategic Alignment:** README.md updated with Q1 2026 focus.
- [x] **Curated Sources:** `sources/ai_news_sources.md` populated with global/domestic RSS feeds.
- [x] **Documentation Infrastructure:** Copied standard InnoSage FFD/LDD/MVP templates into `docs/templates/`.
- [x] **Newsletter Template:** Initial "Stable Output" weekly template created.

---

## 3. Phased Execution Plan

### Phase 1: Engine Foundation (Automated Fetching)
- **Objective:** Build a Python/Node.js script to fetch all RSS sources listed in `sources/ai_news_sources.md`.
- **Key Task:** Implement a "Discovery Agent" that can handle RSSHub routes and raw RSS XML.
- **Artifact:** `engine/fetcher.[py/js]`

### Phase 2: AI Summarization & "Stable" Tone
- **Objective:** Integrate LLM (Claude/Gemini) to process raw news into high-signal summaries.
- **Constraint:** Must adhere to the "Stable Output" persona (rational, non-hyped, accessible).
  - The AI summarizer should be specifically instructed to extract practical, no-code/low-code use cases.
  - It should translate technical AI news into everyday business impact.
- **Artifact:** `engine/summarizer.py` + `.agent/prompts/stable_tone_brief.md`

### Phase 3: "Markdown-to-Web" Publishing Pipeline
- **Objective:** Automate the transfer of finalized Markdown issues to our Cloudflare Worker + R2 setup.
- **Wedge Integration:** Demonstrate "Sub-100ms latency" for the published newsletter.
- **Artifact:** `publishing/deploy_worker.js` + `publishing/wrangler.toml`

### Phase 4: Agentic Curation (Jules Integration)
- **Objective:** Allow Jules or other agents to autonomously prepare a "Draft Issue" every Thursday night.
- **Workflow:** Agent reads `sources/`, runs `engine/`, populates `archives/draft-YYYY-MM-DD.md`, and notifies the human navigator.

---

## 4. Editorial Strategy: "Stable Output" (情绪稳定输出端)
- **Target Audience:** Non-tech professionals and entrepreneurs seeking to become entry-level AI builders. They are time-poor but eager to leverage AI to future-proof their careers and businesses.
- **Frequency:** Weekly (Friday morning launch).
- **Differentiator:** No "Breaking News" hype. We focus on **"What this means for your business/workflow,"** **"How you can use this today,"** and **"Rational Reflection."**

---

## 5. Operational Framework (Internal Docs)
We will use the templates in `docs/templates/` to manage the evolution of this system:
- **Brainstorming:** Use `brainstorm-session.md` for new feature ideas (e.g., "AI Podcast from Newsletter").
- **Feature Specs:** Use `feature-spec-template.md` before building complex engine parts.
- **Post-Mortems:** Use `post_mortem_template.md` to document and fix any data-fetch or summarization failures.

---

## 6. Next Immediate Action Items
1. [ ] **Select Engine Tech Stack:** Choose between Python (best for AI/RSS libs) or Node.js (best for Cloudflare/Markdown integration).
2. [ ] **Initialize Engine:** Scaffold a basic `engine/package.json` or `requirements.txt`.
3. [ ] **Draft Issue #1:** Manually curate one issue using the `stable_output_weekly.md` template to define the "Gold Standard" for the AI summarizer.
