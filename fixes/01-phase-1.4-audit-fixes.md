# Fix Plan — Phase 1.4 Audit Issues
> **Date:** 2026-02-19
> **Source:** Post-implementation audit of Phase A (NavBar) + Phase B (Footer)
> **Branch:** `feature/phase-1.4-global-ui`
> **Assigned Model:** `Claude Sonnet 4.6`
> **Status:** 🔴 Pending

---

## Bug Summary

| # | Severity | File | Issue | Category |
|---|----------|------|-------|----------|
| 1 | 🟢 Low | `NavBar.astro:16` | Dead commented-out code | Cleanup |
| 2 | 🟡 Medium | `Footer.astro:88` | `dir-ltr` invalid Tailwind class | Bug |
| 3 | 🟡 Medium | `location.ts` | Missing `brand.version` property | Missing Feature |
| 4 | 🟢 Low | `04-global-ui.md` | Social platforms mismatch (plan vs data) | Plan Update |

---

## Fix Details

---

### Bug #1: Dead Code in NavBar (🟢 Low)

**File:**
`src/components/layout/NavBar.astro` — Line 16

**Current Code:**
```typescript
// const dir = isAr ? 'rtl' : 'ltr'; // Removed unused variable
```

**Problem:**
Commented-out code left behind. Violates Zero Tech Debt rule (Constitution §4).

**Fix:**
Delete line 16 entirely. Do not leave blank line in its place.

**Verification:**
`pnpm astro check` — should still pass with 0 errors.

---

### Bug #2: Invalid `dir-ltr` Class in Footer (🟡 Medium)

**File:**
`src/components/layout/Footer.astro` — Line 88

**Current Code:**
```html
<p class="text-primary-500 text-sm dir-ltr">
```

**Problem:**
`dir-ltr` is not a valid Tailwind class. The browser ignores it completely.
The copyright text contains `©` which needs LTR direction to render correctly in RTL pages.

**Fix:**
Replace the class with an HTML `dir` attribute:
```html
<p class="text-primary-500 text-sm" dir="ltr">
```

**Verification:**
- `pnpm astro check` — 0 errors
- Visual: copyright `©` symbol should appear on the correct side in Arabic pages

---

### Bug #3: Missing `brand.version` in Copyright (🟡 Medium)

**File:**
`src/config/location.ts` — Brand interface + brand object

**Problem:**
Plan (`plans/04-global-ui.md` line 279) requires:
> Version display: `brand.version` (per constitution §Semantic Versioning)

But `Brand` interface has no `version` property.

**Fix (2 files):**

**File 1: `src/config/location.ts`**

Add `version` to the `Brand` interface:
```typescript
export interface Brand {
  name: string;
  nameEn: string;
  tagline: { ar: string; en: string };
  title: string;
  titleEn: string;
  specialty: { ar: string; en: string };
  siteUrl: string;
  version: string; // ← ADD THIS
  contact: {
    whatsapp: string;
    whatsappUrl: string;
  };
}
```

Add `version` value to the brand object:
```typescript
export const brand: Brand = {
  // ... existing properties ...
  version: "0.0.1", // ← ADD THIS (matches project-key.md)
  // ...
};
```

**File 2: `src/components/layout/Footer.astro`**

Add version display in the copyright section, after the "All rights reserved" text:
```html
<span class="text-primary-600 text-xs block mt-2">
  v{brand.version}
</span>
```

**Verification:**
- `pnpm astro check` — 0 errors
- Footer should display `v0.0.1` below the copyright text

---

### Bug #4: Social Media Platform Mismatch in Plan (🟢 Low)

**File:**
`plans/04-global-ui.md` — Lines 271-275

**Current Plan Text:**
```markdown
| TikTok | `brand.social.tiktok` | 🎵 TikTok |
| Instagram | `brand.social.instagram` | 📷 Instagram |
| Facebook | `brand.social.facebook` | 📘 Facebook |
```

**Problem:**
Plan references platforms (Instagram, Facebook) that do not exist in `location.ts`.
Also references `brand.social.*` but social data is in `currentLocation.socialMedia.*`.

**Actual data in `location.ts`:**
```typescript
socialMedia: {
  tiktok: "...",
  snapchat: "...",
  linktree: "...",
}
```

**Fix:**
Update the plan table to match reality:
```markdown
| TikTok | `currentLocation.socialMedia.tiktok` | TikTok |
| Snapchat | `currentLocation.socialMedia.snapchat` | Snapchat |
| Linktree | `currentLocation.socialMedia.linktree` | Linktree |
```

**Verification:**
Read the updated plan and confirm it matches the Footer code.

---

## Execution Prompt (Claude Sonnet 4.6)

```text
Context: Datacodex — Astro v5 + Tailwind v4 + Cloudflare SSG.
Branch: feature/phase-1.4-global-ui
Task Type: Fix (per protocols/03-fix-rules.md)

Read: fixes/01-phase-1.4-audit-fixes.md — ALL 4 bugs.

Execute fixes in this order:

Bug #1 — NavBar dead code:
- File: src/components/layout/NavBar.astro
- Delete line 16 entirely (the commented-out `const dir` line)

Bug #2 — Footer dir-ltr:
- File: src/components/layout/Footer.astro
- Line 88: replace `class="text-primary-500 text-sm dir-ltr"` with `class="text-primary-500 text-sm" dir="ltr"`

Bug #3 — brand.version:
- File 1: src/config/location.ts
  - Add `version: string;` to Brand interface (after `siteUrl`)
  - Add `version: "0.0.1",` to brand object (after `siteUrl` value)
- File 2: src/components/layout/Footer.astro
  - In the copyright div, after the "All rights reserved" paragraph, add:
    `<span class="text-primary-600 text-xs block mt-2">v{brand.version}</span>`

Bug #4 — Plan social media table:
- File: plans/04-global-ui.md
- Lines 271-275: Update the social media table to match location.ts data
  (TikTok, Snapchat, Linktree from currentLocation.socialMedia)

After ALL fixes:
1. cmd /c pnpm astro check
2. cmd /c git add -A
3. cmd /c git commit -m "Fix-Phase-1.4-Audit-Issues"
4. cmd /c git push origin feature/phase-1.4-global-ui

Report back:
- Confirm each bug fixed (1-4)
- pnpm astro check result
- Commit SHA

IMPORTANT:
- Do NOT create new files (only modify existing)
- Do NOT change any logic or add features beyond what is specified
- Arabic text in code files goes in localization only
- All CSS must use logical properties
- cmd /c prefix on all terminal commands
```

---

## Fix Results

> _(Filled after execution — 2026-02-19)_

| # | Bug | Status | Notes |
|---|-----|--------|-------|
| 1 | NavBar dead code | ✅ | Line 16 deleted, no blank line left |
| 2 | Footer dir-ltr | ✅ | Replaced with `dir="ltr"` HTML attribute |
| 3 | brand.version | ✅ | `version: string` added to interface + `version: "0.0.1"` in object + span in Footer |
| 4 | Plan social table | ✅ | Updated to TikTok/Snapchat/Linktree with `currentLocation.socialMedia.*` |

**pnpm astro check:**
> Result (15 files): 0 errors, 0 warnings, 3 hints (pre-existing hints in GentleNote.astro and 404.astro — unrelated)

**Commit SHA:**
> `016d895` — "Fix-Phase-1.4-Audit-Issues"

**Reviewer:**
> Antigravity (Gemini) — 2026-02-19

**Final Status:** ✅ Done

