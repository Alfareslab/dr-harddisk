# Implementation Plan: Article Listing

**Branch**: `001-article-listing` | **Date**: 2026-02-21 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-article-listing/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

This phase implements the hub index page for all knowledge base articles. We will build an Astro-based SSG article listing that filters out drafts, separates English and Arabic content cleanly, and provides client-side category filtering using vanilla JS or Alpine to maintain high performance. The layout will adhere strictly to the "No Panic UI" and "RTL-First" rules.

## Technical Context

**Language/Version**: TypeScript, HTML, CSS (Astro v5)  
**Primary Dependencies**: Astro v5, Tailwind v4  
**Storage**: File System (`src/content/posts/*.mdx`)  
**Testing**: Manual UI Testing & Link Validation  
**Target Platform**: Web (Cloudflare Pages edge network)
**Project Type**: SSG Web Application  
**Performance Goals**: 100/100 Lighthouse score, Instant client-side filtering  
**Constraints**: 
- Must use `export const prerender = true`.
- Must process images at build-time.
- CSS Logical Properties (RTL-First) must be used.
- No heavy frameworks for filtering; prefer vanilla JS to minimize JS payload.
**Scale/Scope**: ~1000 articles, instant search/filtering required.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **SSG By Default**: Verified. The index pages will use `prerender = true` and `getCollection` to pull data at build time.
- [x] **RTL-First Logic**: Verified. All flex/grid layouts and spacing will use Tailwind v4 logical utilities (e.g., `ms-4`, `pe-4`).
- [x] **No Panic UI**: Verified. Soft colors and clean typography will be used for the listing, mimicking a serene library.
- [x] **Twin-File Content Strategy**: Verified. The logic will strictly query `/src/content/posts/*.mdx` for Arabic and `/src/content/posts/en/*.mdx` for English based on the current page's locale.

## Project Structure

### Documentation (this feature)

```text
specs/001-article-listing/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
└── contracts/           # Phase 1 output (N/A for SSG content site)
```

### Source Code (repository root)

```text
src/
├── components/
│   ├── ArticleCard.astro          # Reusable card component for an article
│   └── CategoryFilter.astro       # Client-side filtering UI
├── content/
│   └── posts/                     # Existing MDX collections
├── pages/
│   ├── posts/
│   │   └── index.astro            # Arabic Listing Route
│   └── en/posts/
│       └── index.astro            # English Listing Route
└── utils/
    └── content.ts                 # Helper functions for fetching/filtering collections
```

**Structure Decision**: Selected standard Astro Content Collections structure, keeping strictly aligned to the existing `/pages` routing structure to support the Arabic/English twin strategy.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| *None* | | |
