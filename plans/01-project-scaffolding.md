# 🗺️ Phase 1.1 — Project Scaffolding
> **Version:** 1.0.0
> **Date:** 2026-02-18
> **Methodology:** Multi-Model Development

---

## 🎯 General Goal

Initialize the Datacodex project from scratch using:
- **Astro v5** (Static output, Content Layer API)
- **Tailwind CSS v4** (CSS-first — no `tailwind.config.js`)
- **pnpm** as the package manager
- **Cloudflare Pages** adapter with `imageService: 'compile'`

The result is a clean, buildable project skeleton ready for Phase 1.2 (Core Components).

---

## ⚠️ Pre-Implementation Gates

### 🚪 Simplicity Gate:
- [x] Minimum number of files — only what is needed for scaffolding
- [x] No "future improvements" — only what is required now
- [x] Every technical decision has a clear reason (documented below)

### 🚪 No-Abstraction Gate:
- [x] Using the framework directly (Astro CLI)
- [x] No extra abstraction layers

### 🚪 Clarity Gate:
- [x] Requirements are 100% clear
- [x] No pending `[needs clarification]` items

---

## ⚠️ Critical Constraints (from master-constitution.md)

| Constraint | Rule |
|:-----------|:-----|
| `output: 'static'` | MANDATORY — `output: 'hybrid'` is FORBIDDEN in Astro v5 |
| `imageService: 'compile'` | MANDATORY — Build-time image processing for Cloudflare Edge |
| No `tailwind.config.js` | FORBIDDEN — Tailwind v4 uses CSS-first `@theme` and `@plugin` |
| No `getEntryBySlug()` | FORBIDDEN — Removed in Astro v5, use `getEntry()` |
| No `entry.render()` | FORBIDDEN — Use `render(entry)` (function import) in Astro v5 |
| Logical CSS Properties | MANDATORY — Use `ms-`, `me-`, `ps-`, `pe-`, `start-`, `end-` (never `left`/`right`) |
| `astro.config.mjs` | No-AI-First-Draft — Must be written manually, then agent can edit |
| `src/content/config.ts` | No-AI-First-Draft — Must be written manually, then agent can edit |

---

## 📅 Implementation Phases

---

### **Phase A: Initialize Astro v5 Project** 🚀
> **Model:** `Claude Sonnet 4.5` 🟡
> **Goal:** Create the Astro project skeleton using pnpm
> **Depends on:** Governing files in root ✅

| Execute | Review | Task |
| :---: | :---: | :--- |
| `[x]` | `[x]` | Verify pnpm is installed: `cmd /c pnpm --version` |
| `[x]` | `[x]` | Verify Node.js 22: `cmd /c node --version` |
| `[x]` | `[x]` | Initialize Astro project: `cmd /c pnpm create astro@latest ./ --template minimal --no-install --no-git --typescript strict` |
| `[x]` | `[x]` | Install dependencies: `cmd /c pnpm install` |
| `[x]` | `[x]` | Create `.node-version` file with content `22` |
| `[x]` | `[x]` | Create `.env.example` with `PUBLIC_SITE_URL=https://datacodex.com` |
| `[x]` | `[x]` | Create `.env` with `NODE_ENV=development` and `PUBLIC_SITE_URL=https://datacodex.com` |

**Checkpoint A — Verification:**
```
cmd /c pnpm astro check
```
Expected: No TypeScript errors.

**🔄 Prompt to start this phase:**
```
Phase A: Initialize Astro v5.
Run: cmd /c pnpm create astro@latest ./ --template minimal --no-install --no-git --typescript strict
Then install: cmd /c pnpm install
Then verify: cmd /c pnpm astro check
```

---

### **Phase B: Install Required Packages** 📦
> **Model:** `Claude Sonnet 4.5` 🟡
> **Goal:** Install all approved libraries from master-constitution.md §10.1
> **Depends on:** Phase A ✅

| Execute | Review | Task |
| :---: | :---: | :--- |
| `[x]` | `[x]` | Install Cloudflare adapter: `cmd /c pnpm add @astrojs/cloudflare` |
| `[x]` | `[x]` | Install Tailwind CSS v4: `cmd /c pnpm add tailwindcss@^4 @tailwindcss/vite` |
| `[x]` | `[x]` | Install Tailwind Typography plugin: `cmd /c pnpm add @tailwindcss/typography` |
| `[x]` | `[x]` | Install Astro Sitemap: `cmd /c pnpm add @astrojs/sitemap` |
| `[x]` | `[x]` | Install Arabic font (Tajawal): `cmd /c pnpm add @fontsource/tajawal` |
| `[x]` | `[x]` | Install English font (Inter Variable): `cmd /c pnpm add @fontsource-variable/inter` |
| `[x]` | `[x]` | Install Iconify utils: `cmd /c pnpm add @iconify/utils` |

**Checkpoint B — Verification:**
```
cmd /c pnpm list --depth=0
```
Expected: All packages listed above appear in the output.

---

### **Phase C: Write `astro.config.mjs` (Manual Draft)** ⚙️
> **Model:** `Claude Sonnet 4.5` 🟡
> **Goal:** Write the canonical config file following master-constitution.md §9.1 and §9.1.1
> **Depends on:** Phase B ✅

> **⚠️ No-AI-First-Draft Rule:** This file is written by the agent under direct supervision.
> The agent writes it based on the exact spec in master-constitution.md — not from memory.

**Final content of `astro.config.mjs`:**

```javascript
// astro.config.mjs — Datacodex v1.0.0
// Source of truth: master-constitution.md §9.1 + TAD §1.1
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Domain from environment variable (Risk B-3)
const siteURL = process.env.PUBLIC_SITE_URL || 'https://datacodex.com';

export default defineConfig({
  site: siteURL,

  // Pre-render First (master-constitution.md §9.1)
  // output: 'hybrid' is FORBIDDEN in this project
  output: 'static',

  adapter: cloudflare({
    // Build-time image processing — required for V8 Isolates (§9.1.1)
    imageService: 'compile',
    platformProxy: {
      enabled: true,
    },
  }),

  vite: {
    plugins: [tailwindcss()],
    build: {
      cssMinify: 'lightningcss',
    },
  },

  build: {
    inlineStylesheets: 'auto',
  },

  // i18n: Arabic default, English as subdirectory
  i18n: {
    defaultLocale: 'ar',
    locales: ['ar', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },

  integrations: [
    // Sitemap — NO hreflang here (Risk S-1: single source = HreflangTags.astro)
    sitemap({
      filter: (page) => {
        const excludePatterns = ['/api/', '/404', '/_'];
        return !excludePatterns.some((pattern) => page.includes(pattern));
      },
    }),
  ],
});
```

| Execute | Review | Task |
| :---: | :---: | :--- |
| `[x]` | `[x]` | Write `astro.config.mjs` with exact content above |
| `[x]` | `[x]` | Verify build: `cmd /c pnpm astro check` |

**Checkpoint C — Verification:**
```
cmd /c pnpm astro check
```
Expected: No errors related to config.

---

### **Phase D: Create Tailwind CSS v4 Config (CSS-First)** 🎨
> **Model:** `Claude Sonnet 4.5` 🟡
> **Goal:** Create `src/styles/global.css` with Tailwind v4 CSS-first configuration
> **Depends on:** Phase C ✅

> **⚠️ FORBIDDEN:** Do NOT create `tailwind.config.js` — this is Tailwind v3 syntax.
> Tailwind v4 uses `@theme` and `@plugin` inside CSS files.

**Content of `src/styles/global.css`:**

```css
/* src/styles/global.css — Tailwind v4 CSS-first config */
/* Source: master-constitution.md §9.1.3 + UX v3.2 */

@import "tailwindcss";

/* Typography plugin — Tailwind v4 activation via @plugin */
@plugin "@tailwindcss/typography";

/* ═══ Design Tokens ═══ */
@theme {
  /* Fonts */
  --font-family-arabic: 'Tajawal', sans-serif;
  --font-family-english: 'Inter Variable', sans-serif;
  --font-family-sans: var(--font-family-arabic);

  /* Brand Colors (from UX v3.2) */
  --color-primary-50: #f0fdf4;
  --color-primary-100: #dcfce7;
  --color-primary-500: #22c55e;
  --color-primary-600: #16a34a;
  --color-primary-700: #15803d;

  /* Neutral */
  --color-surface: #f9fafb;
  --color-border: #e5e7eb;
}

/* ═══ Font Imports (self-hosted — no external requests) ═══ */
@import "@fontsource/tajawal/400.css";
@import "@fontsource/tajawal/700.css";
@import "@fontsource-variable/inter";

/* ═══ Base Styles ═══ */
@layer base {
  html {
    font-family: var(--font-family-arabic);
    /* font-display: optional — Risk S-3 */
  }

  /* RTL default for Arabic */
  [lang="ar"] {
    direction: rtl;
    text-align: start;
  }

  [lang="en"] {
    direction: ltr;
    font-family: var(--font-family-english);
  }
}
```

| Execute | Review | Task |
| :---: | :---: | :--- |
| `[x]` | `[x]` | Create `src/styles/` directory |
| `[x]` | `[x]` | Write `src/styles/global.css` with exact content above |
| `[x]` | `[x]` | Confirm NO `tailwind.config.js` file exists in root |

---

### **Phase E: Create Directory Structure** 📁
> **Model:** `Claude Sonnet 4.5` 🟡
> **Goal:** Create all required directories and placeholder files (TAD §2)
> **Depends on:** Phase D ✅

**Directories and placeholder files to create:**

```
src/
├── config/
│   └── location.ts          ← PLACEHOLDER (content comes later)
├── content/
│   ├── config.ts            ← PLACEHOLDER (No-AI-First-Draft — manual write)
│   ├── posts/
│   │   ├── ar/              ← empty dir (needs .gitkeep)
│   │   └── en/              ← empty dir (needs .gitkeep)
│   ├── cases/
│   │   ├── ar/
│   │   └── en/
│   └── services/
│       ├── ar/
│       └── en/
├── layouts/
│   └── BaseLayout.astro     ← PLACEHOLDER
├── components/
│   ├── common/
│   ├── ui/
│   ├── content/
│   ├── widgets/
│   ├── article/
│   ├── footer/
│   └── seo/
├── pages/
│   ├── index.astro          ← PLACEHOLDER
│   └── en/
│       └── index.astro      ← PLACEHOLDER
├── assets/
│   └── images/
│       ├── posts/
│       ├── cases/
│       ├── services/
│       └── ui/
├── i18n/
│   ├── ar.json              ← PLACEHOLDER {}
│   └── en.json              ← PLACEHOLDER {}
├── utils/
│   ├── i18n.ts              ← PLACEHOLDER
│   └── seo.ts               ← PLACEHOLDER
└── styles/
    └── global.css           ← Created in Phase D ✅

public/
├── robots.txt
└── images/
    └── brand/               ← empty dir (logo goes here later)

scripts/
└── validate-translations.ts ← PLACEHOLDER

docs/
├── LOCATION_MIGRATION.md    ← PLACEHOLDER
└── RUNBOOK.md               ← PLACEHOLDER
```

**Placeholder content for `src/config/location.ts`:**
```typescript
// src/config/location.ts — PLACEHOLDER
// This file is the atomic core of the Portable Brand.
// Content will be filled in Phase 1.2.
// DO NOT hardcode location data anywhere else in the project.

export const location = {
  city: 'PLACEHOLDER',
  short_address: 'PLACEHOLDER',
  whatsapp_number: '966XXXXXXXXX',
  gentle_notes: {} as Record<string, string>,
};
```

**Placeholder content for `src/layouts/BaseLayout.astro`:**
```astro
---
// src/layouts/BaseLayout.astro — PLACEHOLDER
// Full implementation in Phase 1.2
interface Props {
  title: string;
  description: string;
  lang?: 'ar' | 'en';
}
const { title, description, lang = 'ar' } = Astro.props;
---
<!DOCTYPE html>
<html lang={lang} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{title}</title>
    <meta name="description" content={description} />
  </head>
  <body>
    <slot />
  </body>
</html>
```

**Placeholder content for `src/content/config.ts`:**
```typescript
// src/content/config.ts — PLACEHOLDER
// No-AI-First-Draft Rule: This file must be written manually.
// Full Zod schema implementation in Phase 1.2.
// Reference: master-constitution.md §9.2 + TAD §3.3
import { defineCollection } from 'astro:content';

export const collections = {
  posts: defineCollection({}),
  services: defineCollection({}),
  cases: defineCollection({}),
};
```

| Execute | Review | Task |
| :---: | :---: | :--- |
| `[x]` | `[x]` | Create all directories listed above |
| `[x]` | `[x]` | Create `.gitkeep` in all empty content subdirectories |
| `[x]` | `[x]` | Write `src/config/location.ts` placeholder |
| `[x]` | `[x]` | Write `src/layouts/BaseLayout.astro` placeholder |
| `[x]` | `[x]` | Write `src/content/config.ts` placeholder |
| `[x]` | `[x]` | Write `src/pages/index.astro` placeholder |
| `[x]` | `[x]` | Write `src/i18n/ar.json` and `en.json` as `{}` |
| `[x]` | `[x]` | Write `public/robots.txt` with basic content |
| `[x]` | `[x]` | Write `.node-version` with content `22` |

---

### **Phase F: Update `package.json` Scripts** 📋
> **Model:** `Claude Sonnet 4.5` 🟡
> **Goal:** Ensure all required scripts are in `package.json`
> **Depends on:** Phase E ✅

**Required scripts:**
```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "check": "astro check",
    "validate": "tsx scripts/validate-translations.ts"
  }
}
```

| Execute | Review | Task |
| :---: | :---: | :--- |
| `[x]` | `[x]` | Verify `package.json` scripts match the above |
| `[x]` | `[x]` | Add `tsx` as dev dependency if missing: `cmd /c pnpm add -D tsx` |

---

### **Phase G: Final Build Verification** ✅
> **Model:** `Claude Sonnet 4.5` 🟡
> **Goal:** Confirm the project builds without errors
> **Depends on:** Phase F ✅

| Execute | Review | Task |
| :---: | :---: | :--- |
| `[x]` | `[x]` | Run TypeScript check: `cmd /c pnpm astro check` |
| `[x]` | `[x]` | Run build: `cmd /c pnpm build` |
| `[x]` | `[x]` | Confirm `dist/` directory was created |
| `[x]` | `[x]` | Confirm no `tailwind.config.js` exists in root |
| `[x]` | `[x]` | Confirm `output: 'static'` is in `astro.config.mjs` |
| `[x]` | `[x]` | Confirm `imageService: 'compile'` is in `astro.config.mjs` |

---

## 📊 Model & Phase Summary

| Phase | Name | Model | Files Affected |
|:------|:-----|:------|:--------------|
| A | Initialize Astro | `Claude Sonnet 4.5` 🟡 | `package.json`, base structure |
| B | Install Packages | `Claude Sonnet 4.5` 🟡 | `package.json` |
| C | `astro.config.mjs` | `Claude Sonnet 4.5` 🟡 | `astro.config.mjs` |
| D | Tailwind CSS v4 | `Claude Sonnet 4.5` 🟡 | `src/styles/global.css` |
| E | Directory Structure | `Claude Sonnet 4.5` 🟡 | ~20 files/dirs |
| F | Package Scripts | `Claude Sonnet 4.5` 🟡 | `package.json` |
| G | Final Verification | `Claude Sonnet 4.5` 🟡 | Read-only |

---

## 🔄 Handoff Protocol

Upon successful completion of Phase G:

```
---
✅ Phase 1.1: Project Scaffolding — COMPLETE

📋 Summary:
- Astro v5 initialized with pnpm
- Tailwind CSS v4 configured (CSS-first, no tailwind.config.js)
- Cloudflare adapter installed with imageService: 'compile'
- output: 'static' confirmed
- All directories and placeholder files created
- Project builds successfully

🔄 Next Phase: 1.2 — Core Components
🤖 Recommended Model: `Claude Sonnet 4.5` 🟡

📝 Prompt for Next Phase:
Phase 1.2: Core Components.
Context: Scaffolding is complete. Now implement:
1. src/content/config.ts — Full Zod schema (posts, services, cases)
2. src/config/location.ts — Full location data (will be provided)
3. src/layouts/BaseLayout.astro — Full implementation with SEO, fonts, FloatingWhatsApp
4. src/components/content/GentleNote.astro — Knowledge-tone CTA replacement
Reference: master-constitution.md + TAD §3.3 + TAD §4.4
---
```

---

## ⚠️ Failure Protocol

If any phase fails 3 times:
```
#### ⚠️ Failure Log — Phase [X]
- Date: 2026-02-18
- Problem: [exact description]
- Proposed Solutions:
  1. [solution 1]
  2. [solution 2]
- Status: ⏳ Awaiting developer decision
```
