# Phase 1.5E — Push + PR + CodeRabbit Review

> **Executor:** Gemini Pro
> **Branch:** `feature/phase-1.5-article-template`
> **Target:** `main`
> **Date:** 2026-02-19

---

## Context

Phase 1.5 (Article Template) is **100% code-complete**. All files are committed and clean on branch `feature/phase-1.5-article-template`. Your job is to push the branch and open a Pull Request for CodeRabbit review.

### What was implemented in this phase:

| File | Description |
|------|-------------|
| `src/layouts/PostLayout.astro` | Article layout wrapping BaseLayout with RTL/LTR, hero image, prose typography |
| `src/pages/posts/[slug].astro` | Dynamic route for Arabic articles (filters `lang === "ar"`) |
| `src/pages/en/posts/[slug].astro` | Dynamic route for English articles (filters `lang === "en"`) |
| `src/content/posts/ar-test-hdd-clicking.mdx` | Arabic test article with GentleNote component |
| `src/content/posts/en-test-hdd-clicking.mdx` | English test article with GentleNote component |
| `src/assets/images/placeholder.svg` | Placeholder SVG for heroImage testing |
| `astro.config.mjs` | Added `@astrojs/mdx` integration |
| `package.json` + `pnpm-lock.yaml` | Added `sharp` + `@astrojs/mdx` dependencies |
| `src/content/config.ts` | Minor path fix for glob loader base |
| `project-context.md` | Updated status to Phase 1.5 |
| `project-key.md` | Updated file tree with new files |
| `changelog.md` | Added Phase 1.5 entries |

### Build verification (already passed):

- `pnpm astro check`: 0 errors
- `pnpm build`: success
- Generated output: `/posts/ar-test-hdd-clicking/index.html` + `/en/posts/en-test-hdd-clicking/index.html`

---

## Steps to Execute

### Step 1: Push the branch

```bash
cmd /c git push origin feature/phase-1.5-article-template
```

### Step 2: Open a Pull Request

Use the GitHub MCP tool `create_pull_request` with these exact parameters:

- **owner:** `Alfareslab`
- **repo:** `dr-harddisk`
- **title:** `Phase 1.5: Article Template + Bilingual Routing`
- **head:** `feature/phase-1.5-article-template`
- **base:** `main`
- **body:** (use this exact text below)

```markdown
## Phase 1.5 — Article Template (The Quiet Reader)

### Summary
Implements the single article page template with bilingual routing for Arabic and English MDX content.

### Changes

#### New Files
- `src/layouts/PostLayout.astro` — Article layout (RTL/LTR, Hero Image, Prose typography)
- `src/pages/posts/[slug].astro` — Arabic article route (lang filter)
- `src/pages/en/posts/[slug].astro` — English article route (lang filter)
- `src/content/posts/ar-test-hdd-clicking.mdx` — Arabic test article
- `src/content/posts/en-test-hdd-clicking.mdx` — English test article
- `src/assets/images/placeholder.svg` — Test hero image

#### Modified Files
- `astro.config.mjs` — Added `@astrojs/mdx` integration
- `package.json` — Added `sharp` and `@astrojs/mdx` dependencies
- `src/content/config.ts` — Fixed glob loader base path
- Documentation files updated (`project-context.md`, `project-key.md`, `changelog.md`)

### Verification
- [x] `pnpm astro check` — 0 errors
- [x] `pnpm build` — success
- [x] Arabic route generates: `/posts/ar-test-hdd-clicking/index.html`
- [x] English route generates: `/en/posts/en-test-hdd-clicking/index.html`

### Architecture Decisions
- **Routing:** Arabic at `/posts/[slug]`, English at `/en/posts/[slug]` (separate `getStaticPaths` with language filter)
- **Content Rendering:** Uses Astro v5 `render(entry)` API (NOT `entry.render()`)
- **Image Handling:** Dynamic `import.meta.glob` for heroImage resolution from string paths
- **Typography:** `@tailwindcss/typography` prose classes with RTL support

### Plan Reference
`plans/05-article-template.md`
```

### Step 3: Wait for CodeRabbit

After the PR is created, CodeRabbit will automatically review it. Check the PR for CodeRabbit comments.

### Step 4: Handle CodeRabbit Results

| Severity | Action |
|----------|--------|
| **Critical** | STOP. Fix the issue, commit, push. Re-request review. |
| **Warning** | Evaluate. Fix if valid. Document if intentional. |
| **Nitpick** | Note it. Fix only if trivial (< 5 min). |
| **No issues** | Report success to developer. |

### Step 5: Report Results

After CodeRabbit review completes, provide a report including:

1. CodeRabbit result summary (pass/fail)
2. List of issues found (if any) with severity
3. Any fixes applied
4. Final PR status

---

## Rules

1. ENV: Windows. You MUST use `cmd /c` prefix for all terminal commands.
2. Do NOT merge the PR. Developer will merge.
3. Do NOT modify any code files unless CodeRabbit finds Critical issues.
4. All code comments must be in English only.
5. Do NOT push to `main` directly.
6. Write your report summary in Egyptian Arabic.

---

## Verification Checklist (before reporting done)

- [ ] Branch pushed successfully
- [ ] PR opened and URL confirmed
- [ ] CodeRabbit review triggered
- [ ] CodeRabbit results documented
- [ ] Report delivered in Arabic
