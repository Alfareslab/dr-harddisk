# 🗺️ Master Plan — Dr. Hard Disk
> **Version:** 1.0.0
> **Date:** 2026-02-19
> **Methodology:** Multi-Model Development
> **Depends On:** Nothing (root document)
> **Repository:** [github.com/Alfareslab/dr-harddisk](https://github.com/Alfareslab/dr-harddisk)

---

## 🎯 Project Vision Summary

**Dr. Hard Disk** is a bilingual (Arabic-first, RTL) knowledge platform for data recovery,
built as a static website on Astro v5 + Tailwind v4 + Cloudflare Pages.

It serves individuals and businesses who have experienced data loss (HDD, SSD, USB, SD cards)
and positions itself as a **trusted knowledge brand** — not a local repair shop.

The platform delivers:
- **Knowledge-first content** (articles, case studies, educational material)
- **No Panic UI** — calm, non-pressure design that builds trust
- **SEO dominance** in the Arabic data recovery market (Jeddah focus, expandable)
- **Brand ≠ Location separation** — the brand is permanent, the physical location is swappable

> **Core principle:** Build trust through knowledge, not urgency.

---

## 📊 Master Phase Table

| Phase | Name | Goal | Key Files | Status | CodeRabbit |
|:------|:-----|:-----|:----------|:------:|:----------:|
| 1.1 | Project Scaffolding | Astro v5 + Tailwind v4 + Cloudflare setup | `astro.config.mjs`, `package.json`, `app.css` | ✅ | Yes |
| 1.2 | Core Components | Brand/Location config, Schemas, BaseLayout, GentleNote | `location.ts`, `config.ts`, `BaseLayout.astro`, `GentleNote.astro` | ✅ | Yes |
| 1.3 | Page Templates | Homepage (AR/EN), Contact, 404 pages | `index.astro`, `en/index.astro`, `contact.astro`, `404.astro` | ✅ | Yes |
| 1.4 | Global UI | NavBar, Footer, FloatingWhatsApp + BaseLayout integration | `NavBar.astro`, `Footer.astro`, `FloatingWhatsApp.astro` | 🔄 | Yes |
| 1.5 | Article Template | Single article page template + Content Collection rendering | `[slug].astro`, `PostLayout.astro` | ⏳ | Yes |
| 1.6 | Article Listing | Articles index page with filtering/categorization | `posts/index.astro`, `en/posts/index.astro` | ⏳ | Yes |
| 2.1 | Content: First 5 Articles | Write and publish initial knowledge articles (Arabic) | `content/posts/*.mdx` (5 files) | ⏳ | No |
| 2.2 | Content: English Twins | English translations of the first 5 articles | `content/posts/en/*.mdx` (5 files) | ⏳ | No |
| 2.3 | About Page | "About Dr. Hard Disk" brand story page | `about.astro`, `en/about.astro` | ⏳ | Yes |
| 2.4 | Case Studies Template | Case study page template + collection schema | `cases/[slug].astro`, `CaseLayout.astro` | ⏳ | Yes |
| 2.5 | Content: First 3 Cases | Initial case studies (Arabic) | `content/cases/*.mdx` (3 files) | ⏳ | No |
| 3.1 | SEO: Technical | Sitemap, robots.txt, canonical URLs, structured data | `sitemap.xml`, `robots.txt`, Schema.org JSON-LD | ⏳ | Yes |
| 3.2 | SEO: On-Page | Meta optimization, Open Graph, Twitter Cards | BaseLayout enhancements, social preview images | ⏳ | Yes |
| 3.3 | SEO: Local | Google Business Profile integration, LocalBusiness Schema | Schema markup, location-specific SEO | ⏳ | No |
| 3.4 | Performance | Core Web Vitals optimization, image pipeline, font loading | Image optimization, preload strategies | ⏳ | Yes |
| 4.1 | Deployment: Staging | Cloudflare Pages staging environment setup | `wrangler.toml`, CI/CD configuration | ⏳ | No |
| 4.2 | Deployment: Production | Production deployment + domain configuration | DNS, SSL, redirect rules | ⏳ | No |
| 4.3 | Launch Checklist | Final QA, accessibility audit, cross-browser testing | Test reports, audit documents | ⏳ | No |

---

## 🏗️ Phase Groups (Milestones)

---

### Milestone 1: Foundation (Phase 1.1 → 1.3) ✅

> **Goal:** Build the invisible infrastructure that every future phase depends on.

| Phase | Description | Status |
|:------|:------------|:------:|
| 1.1 | Project Scaffolding | ✅ |
| 1.2 | Core Components | ✅ |
| 1.3 | Page Templates | ✅ |

**CodeRabbit Gate:** PR #1 (all 3 phases in one PR) — Reviewed ✅

**Definition of Done:**
- [x] Astro v5 project builds successfully with `pnpm build`
- [x] `location.ts` separates brand from location data
- [x] `BaseLayout.astro` renders Arabic (RTL) and English (LTR) pages
- [x] 4 pages exist: Homepage AR, Homepage EN, Contact, 404
- [x] Zero sales CTAs across all pages
- [x] All CSS uses logical properties

---

### Milestone 2: Global UI + Content Shell (Phase 1.4 → 1.6) 🔄

> **Goal:** Make the site look and feel "real" — navigation, footer, floating actions,
> and the ability to display articles.

| Phase | Description | Status |
|:------|:------------|:------:|
| 1.4 | Global UI (NavBar + Footer + FloatingWhatsApp) | 🔄 |
| 1.5 | Article Template (single post page) | ⏳ |
| 1.6 | Article Listing (posts index page) | ⏳ |

**CodeRabbit Gate:** One PR per phase (1.4, 1.5, 1.6 = 3 PRs)

**Definition of Done:**
- [ ] Every page has NavBar + Footer
- [ ] FloatingWhatsApp appears globally after hero scroll
- [ ] Article template renders MDX content with proper typography
- [ ] Articles index page lists all posts with bilingual support
- [ ] Language switcher works across all pages
- [ ] Mobile hamburger menu functions correctly

---

### Milestone 3: Content Population (Phase 2.x) ⏳

> **Goal:** Fill the site with real knowledge content — articles, case studies, about page.

| Phase | Description | Status |
|:------|:------------|:------:|
| 2.1 | First 5 Articles (Arabic) | ⏳ |
| 2.2 | English Twins (translations) | ⏳ |
| 2.3 | About Page | ⏳ |
| 2.4 | Case Studies Template | ⏳ |
| 2.5 | First 3 Case Studies | ⏳ |

**CodeRabbit Gate:** PRs for 2.3 and 2.4 (templates). Content-only PRs (2.1, 2.2, 2.5) are optional.

**Definition of Done:**
- [ ] 5 Arabic articles published and rendering correctly
- [ ] 5 English twin articles with matching `translationID`
- [ ] About page tells the brand story (not a service pitch)
- [ ] Case studies template supports before/after narratives
- [ ] All content follows No Panic UI philosophy

---

### Milestone 4: SEO + Performance (Phase 3.x) ⏳

> **Goal:** Optimize the site for search engines and performance metrics.

| Phase | Description | Status |
|:------|:------------|:------:|
| 3.1 | SEO: Technical | ⏳ |
| 3.2 | SEO: On-Page | ⏳ |
| 3.3 | SEO: Local | ⏳ |
| 3.4 | Performance | ⏳ |

**CodeRabbit Gate:** PRs for 3.1, 3.2, 3.4 (code changes). Phase 3.3 is config-only (optional).

**Definition of Done:**
- [ ] Sitemap and robots.txt generated and valid
- [ ] Schema.org JSON-LD on all pages (Article, LocalBusiness)
- [ ] Open Graph + Twitter Card meta tags on article pages
- [ ] Core Web Vitals: LCP < 2.5s, CLS < 0.1, INP < 200ms
- [ ] Lighthouse score ≥ 90 on all categories

> **Reference:** Research/06_SEO_Jeddah_Market_Strategy_v4.1.md

---

### Milestone 5: Deployment + Launch (Phase 4.x) ⏳

> **Goal:** Ship the site to production and verify everything works in the real world.

| Phase | Description | Status |
|:------|:------------|:------:|
| 4.1 | Staging Deployment | ⏳ |
| 4.2 | Production Deployment | ⏳ |
| 4.3 | Launch Checklist | ⏳ |

**CodeRabbit Gate:** No code in these phases — deployment and QA only.

**Definition of Done:**
- [ ] Staging URL accessible and functional
- [ ] SSL certificate valid on production domain
- [ ] All redirects configured (www → non-www, HTTP → HTTPS)
- [ ] Accessibility audit passed (WCAG 2.1 AA)
- [ ] Cross-browser testing: Chrome, Safari, Firefox, Edge
- [ ] Mobile testing: iOS Safari, Android Chrome
- [ ] Google Search Console verified and sitemap submitted

---

## 🐰 CodeRabbit Gate Rules

### When is CodeRabbit MANDATORY?

| Condition | Required? | Reason |
|:----------|:---------:|:-------|
| Phase touches `src/` files (components, pages, layouts, config) | ✅ Yes | Code quality, RTL compliance, No Panic UI |
| Phase adds templates or structural components | ✅ Yes | Architecture integrity |
| Phase modifies `astro.config.mjs` | ✅ Yes | Build system protection |
| Phase modifies `.coderabbit.yaml` | ✅ Yes | Review system integrity |

### When is CodeRabbit OPTIONAL?

| Condition | Required? | Reason |
|:----------|:---------:|:-------|
| Content-only changes (MDX articles) | ⚪ Optional | No code logic to review |
| Documentation-only (`plans/`, `reports/`) | ⚪ Optional | Non-code files |
| Deployment config (`wrangler.toml`, DNS) | ⚪ Optional | Infrastructure, not code |

### Gate Pass/Fail Rules:

```text
┌─────────────────────────────────────────────────────────┐
│  CodeRabbit Severity → Action                            │
│                                                          │
│  🔴 Critical    → STOP. Fix immediately. Re-push.       │
│                   Block merge until Critical = 0.        │
│                                                          │
│  🟡 Warning     → Evaluate. Fix if valid.               │
│                   Document if intentional design choice. │
│                                                          │
│  🟢 Nitpick     → Document in report. Fix only          │
│                   if trivial (< 5 min). Continue.        │
│                                                          │
│  ✅ No issues   → Proceed to merge.                     │
└─────────────────────────────────────────────────────────┘
```

### Correct Workflow (NEVER skip for src/ files):

```text
1. Create feature branch from main
   cmd /c git checkout -b feature/phase-X.X-name

2. Implement all code on the feature branch
   cmd /c git add . && cmd /c git commit -m "phase X.X description"

3. Push the branch
   cmd /c git push origin feature/phase-X.X-name

4. Open Pull Request → main
   Use GitHub MCP or browser agent

5. Wait for CodeRabbit review

6. Fix Critical issues → re-push → re-review

7. Document review in reports/XX-coderabbit-phase-X.X.md

8. Merge ONLY after Critical = 0
```

> ⚠️ **NEVER push directly to `main` for any phase that touches `src/` files.**

---

## 🤖 Model Responsibility Matrix

### Role Definitions:

| Model | Role | Strengths | Weaknesses |
|:------|:-----|:----------|:-----------|
| 🔴 Claude Opus | Architect / Supervisor | Deep reasoning, plan writing, fix strategies, architecture decisions | Limited quota — use strategically |
| 🟠 Gemini Pro | Senior Executor | Heavy implementation, complex components, layouts, multi-file changes | Tends to rush — needs detailed prompts and review |
| 🟢 Gemini Flash | Junior Executor | Simple/mirror implementation, EN twins, single-file components | Limited complexity handling |
| 🟣 Perplexity Comet | Coordinator / Monitor | PR monitoring, CodeRabbit reading, research, coordination | No code execution |

### Phase Assignment:

| Phase | Planning | Execution | Review |
|:------|:--------:|:---------:|:------:|
| 1.1 Scaffolding | 🔴 Claude | 🟠 Gemini Pro | 🐰 CodeRabbit |
| 1.2 Core Components | 🔴 Claude | 🟠 Gemini Pro | 🐰 CodeRabbit |
| 1.3 Page Templates | 🔴 Claude | 🟠 Pro + 🟢 Flash | 🐰 CodeRabbit |
| **1.4 Global UI** | 🔴 Claude | 🟠 Pro + 🟢 Flash | 🐰 CodeRabbit |
| 1.5 Article Template | 🔴 Claude | 🟠 Gemini Pro | 🐰 CodeRabbit |
| 1.6 Article Listing | 🔴 Claude | 🟠 Pro + 🟢 Flash | 🐰 CodeRabbit |
| 2.1 First 5 Articles | 🔴 Claude | 🟠 Gemini Pro | 🟣 Perplexity |
| 2.2 English Twins | — | 🟢 Gemini Flash | 🟣 Perplexity |
| 2.3 About Page | 🔴 Claude | 🟠 Gemini Pro | 🐰 CodeRabbit |
| 2.4 Case Studies Template | 🔴 Claude | 🟠 Gemini Pro | 🐰 CodeRabbit |
| 2.5 First 3 Cases | 🔴 Claude | 🟠 Gemini Pro | 🟣 Perplexity |
| 3.1–3.4 SEO + Performance | 🔴 Claude | 🟠 Gemini Pro | 🐰 CodeRabbit |
| 4.1–4.3 Deployment + Launch | 🔴 Claude | 🟠 Gemini Pro | Developer |

### Model Usage Rules:

| Rule | Details |
|:-----|:--------|
| Claude writes plans ONLY | Claude never implements code — only plans, audits, fix strategies |
| Gemini Pro gets detailed prompts | Every prompt includes: context, branch, rules, exact file paths, verification steps |
| Gemini Flash gets mirror tasks | EN twins, simple components, CSS tweaks — always one file at a time |
| CodeRabbit reviews all `src/` PRs | No merge without CodeRabbit pass on code changes |
| Developer has final merge authority | No AI merges PRs — developer approves and merges |

---

## 📸 Current Status Snapshot

> **As of:** 2026-02-19

### ✅ What's Done:

| Phase | Date | PR | Key Achievement |
|:------|:-----|:---|:----------------|
| 1.1 | 2026-02-18 | PR #1 | Astro v5 + Tailwind v4 project initialized |
| 1.2 | 2026-02-18 | PR #1 | `location.ts` (brand ≠ location), `BaseLayout`, `GentleNote`, Content Schemas |
| 1.3 | 2026-02-18 | PR #1 | 4 page templates (Homepage AR/EN, Contact, 404) |

### 🔄 What's In Progress:

| Phase | Status | Branch |
|:------|:-------|:-------|
| 1.4 — Global UI | Plan written ✅, waiting for execution | `feature/phase-1.4-global-ui` (to be created) |

### ⏭️ What's Next After 1.4:

Phase 1.5 — Article Template: Build the single article page that renders MDX content
from Content Collections. This is the first phase that depends on the Content Layer API.

### ⚠️ Known Issues:

| Issue | Status | Date |
|:------|:-------|:-----|
| `.coderabbit.yaml` had parsing errors (twice) | Fixed — using `path_instructions` with `**/*` pattern | 2026-02-19 |
| `process.env` used instead of `import.meta.env` in `location.ts` | Fixed — switched to `import.meta.env.PUBLIC_SITE_URL` | 2026-02-19 |
| PR #1 had all 3 phases in one PR | Not ideal — future phases will have 1 PR per phase | 2026-02-18 |
| `project-context.md` has placeholder fields | Needs update after Phase 1.4 | — |

---

## 📅 Timeline Estimate

> ⚠️ These are rough estimates based on phase complexity. Not commitments.

| Milestone | Estimated Duration | Target |
|:----------|:-------------------|:-------|
| Milestone 1: Foundation | 2 days | ✅ Done |
| Milestone 2: Global UI + Content Shell | 3–5 days | Week of 2026-02-19 |
| Milestone 3: Content Population | 5–7 days | Week of 2026-02-24 |
| Milestone 4: SEO + Performance | 3–4 days | Week of 2026-03-03 |
| Milestone 5: Deployment + Launch | 2–3 days | Week of 2026-03-10 |

> **Total estimated:** ~3–4 weeks from project start to production launch.

---

## 📚 Research Documents Reference

| # | Document | Purpose | Used In Phases |
|:--|:---------|:--------|:---------------|
| 00 | `Project_Master_Index.md` | Research document index | All |
| 01 | `Project_Vision_v2.0.md` | Brand identity, mission, strategy | All |
| 02 | `Risk_Assessment_v3.md` | Risk analysis and mitigation | 3.x, 4.x |
| 03 | `DrHardDisk_PRD_v4.md` | Product requirements | 1.x, 2.x |
| 04 | `DrHardDisk_UX_v3.2.md` | UX design specs, color tokens, typography | 1.x, 2.x |
| 05 | `DrHardDisk_TAD_v4.2.md` | Technical Architecture — component code specs | 1.x, 2.x |
| 06 | `SEO_Jeddah_Market_Strategy_v4.1.md` | SEO keywords, market analysis | 3.x |
| 07 | `Content_Production_Plan_v1.3.md` | Article topics, content calendar | 2.x |
| 08 | `Content_Tool_Spec_v1.0.md` | Content creation tool specifications | 2.x |
| 09 | `Homepage_Site_Blueprint.md` | Site structure, NavBar, Footer, page layouts | 1.x |
| KB_01 | `Alfares_Profile_Location.md` | Physical facility data | 1.2 (location.ts) |
| KB_02 | `Dr_Hard Disk_Profile_Location.md` | Brand identity data | 1.2 (location.ts) |
| KB_03 | `DataRecovery_Technical.md` | Technical knowledge base | 2.x, 3.x |

---

## 📋 Plan Files Index

| # | Plan File | Phase | Status |
|:--|:----------|:------|:------:|
| 00 | `plans/00-master-plan.md` | Master Roadmap | 📄 This file |
| 01 | `plans/01-project-scaffolding.md` | Phase 1.1 | ✅ |
| 02 | `plans/02-core-components.md` | Phase 1.2 | ✅ |
| 03 | `plans/03-page-templates.md` | Phase 1.3 | ✅ |
| 04 | `plans/04-global-ui.md` | Phase 1.4 | 🔄 |
| 05 | `plans/05-article-template.md` | Phase 1.5 | ⏳ Not written |
| 06 | `plans/06-article-listing.md` | Phase 1.6 | ⏳ Not written |
