<!--
Sync Impact Report:
- Version change: 0.1.0 → 3.2.0 (Aligning with master-constitution.md)
- Modified principles:
  - Added Trinity Protocol
  - Added Ideal Code Philosophy
  - Added Standard Project Structure
  - Added Semantic Versioning & UI/UX Standards
  - Added Portable Brand & Architecture Constraints
- Templates requiring updates: ✅ Checked (no modifications required)
-->
# Dr. Hard Disk Constitution

## Core Principles

### I. The Trinity Protocol
The workflow relies on strict roles:
- **Developer (Visionary)**: Defines "what" and "why". Final decision maker.
- **Supervisor (AI Architect)**: Translates natural language to technical plans, monitors execution.
- **Agent (Executor)**: Expert implementer. Writes code based on supervisor's plans. Cannot violate constitution without explicit approval.

### II. The Ideal Code Philosophy & Zero Tech Debt
- **Separation of Concerns**: UI, logic, and data sources must remain independent.
- **Zero Tech Debt**: No temporary workarounds or patches. Fix the root cause. No `TODO`s permitted without an associated date and execution plan.
- **Simplicity**: Favor the simplest viable solution. YAGNI (You Aren't Gonna Need It) applies.
- **Sustainability**: Self-documenting, maintainable code built to last.

### III. Documentation Protocol
If it's not documented, it didn't happen. Any change (Plan/Fix/Audit) must process through three steps:
1. Log in the appropriate working file (`plans/`, `fixes/` or `reports/`).
2. Update `project-context.md` (Living memory and status tracker).
3. Update `project-key.md` (Project index), and `changelog.md` (Version history).

### IV. UI/UX & Native Arabic Support
- **Structural Stability**: The UI must not bounce or spontaneously resize. Use scrolling or pagination.
- **RTL-First Logic**: Use CSS Logical Properties (e.g., `margin-start` instead of `margin-left`). One stylesheet serves both RTL and LTR smoothly.
- **No Panic UI**: The UI must project authority and calm. No aggressive red alerts or flashing buttons unless inside a specifically designated critical component like the `PanicButton`.
- **Portable Brand**: No hardcoded location information in UI or MDX files. All location data binds to `src/config/location.ts`.

### V. Pre-render First (Architecture Constraints)
- **SSG By Default**: `export const prerender = true` is the baseline for Astro pages.
- **Image Pipeline**: Images (`astro:assets`, `<Image />`) must be processed at **build-time**. Edge Runtime (Cloudflare V8 Isolates) does not support native image processing modules.
- SSR (`prerender = false`) is forbidden for content pages without explicit developer approval.

### VI. Twin-File Content Strategy
- For every Arabic `.mdx` file, an English twin must exist with the identical `slug` and `translationID`.
- Translations are cultural adaptations, not literal word-for-word maps. Both files must share the same `heroImage`.

## Governance

- **Supremacy clause**: This document supersedes all agent instructions. Any code violating these principles is automatically rejected.
- **Approved Libraries**: Only libraries listed in the master constitution (e.g., Astro v5, Tailwind v4, Preact as fallback) are permitted. Explicit developer approval is required for new dependencies.
- **AI Hallucination Guardrails**: The Agent must be strictly monitored for emitting outdated Astro v4 syntax (like `entry.render()`) or Tailwind v3 configurations (`tailwind.config.js`). Native Astro v5 and Tailwind v4 implementations must be used.
- **Amendment Process**: Amendments require documentation, explicit developer approval, and version bumping adhering to Semantic Versioning principles.

**Version**: 3.2.0 | **Ratified**: 2026-02-17 | **Last Amended**: 2026-02-21
