# 🗺️ Phase 1.2: Core Components — Dr. Hard Disk
> **Version:** 1.0.0
> **Date:** 2026-02-18
> **Methodology:** Multi-Model Development
> **Depends On:** Phase 1.1 (Scaffolding) ✅
> **Repository:** [github.com/Alfareslab/dr-harddisk](https://github.com/Alfareslab/dr-harddisk)

---

## 🎯 General Goal

Build the 4 foundational components that all future phases depend on:
1. **`location.ts`** — The Atomic Core (brand ≠ location separation)
2. **`content/config.ts`** — Zod schemas for Content Collections
3. **`BaseLayout.astro`** — Root layout with SEO, fonts, RTL/LTR
4. **`GentleNote.astro`** — Knowledge-first soft-CTA component

---

## 🚪 Pre-Implementation Gates

### Gate 1: Simplicity
- [ ] Each component = 1 file (no premature abstractions)
- [ ] No "future-proofing" — only fields documented in TAD v4.2
- [ ] Every TypeScript type/field has a clear source reference

### Gate 2: No Unnecessary Abstraction
- [ ] No wrapper utilities around Astro APIs
- [ ] No SEO library (meta tags managed directly in BaseLayout)
- [ ] No component library — vanilla Astro + Tailwind v4

### Gate 3: Clarity
- [ ] All brand data sourced from KB_02
- [ ] All facility data sourced from KB_01
- [ ] Content schema matches TAD v4.2 §3.1–§3.3 exactly
- [ ] No `[needs clarification]` pending

---

## ⚠️ Critical Constraints

### C-1: Brand ≠ Location (The Cardinal Rule)
```
Dr. Hard Disk = Knowledge Brand (PERMANENT — never changes)
Al-Fares Center = Physical Facility (SWAPPABLE — changes with relocation)
```
> **Source:** Vision v2.0 §3.1, Constitution §11, §12

**Danger:** Any coupling between brand data and location data turns the
site into a "local shop website" and destroys topical authority.

### C-2: No-AI-First-Draft Rule
> **Source:** Constitution §9.3

The following files MUST be written manually by the developer as first draft:
- `src/config/location.ts`
- `src/content/config.ts`

**Workflow:** The plan provides EXACT content. The agent writes the file
using the plan as source of truth. The developer reviews before commit.

### C-3: Astro v5 Breaking Changes
> **Source:** Constitution §9.2.1

| Topic | v4 (FORBIDDEN) | v5 (REQUIRED) |
|-------|----------------|---------------|
| Collections | `defineCollection()` direct | Content Layer API with `glob()` loader |
| Fetch content | `getEntryBySlug()` | `getEntry()` |
| Render | `entry.render()` | `render(entry)` — function import |
| Params | numbers/objects in params | strings ONLY in `getStaticPaths` |

### C-4: RTL-First Design
> **Source:** Constitution §13.4

- Use logical CSS properties: `margin-inline-start/end` (not `left/right`)
- Use `border-inline-start/end`, `padding-inline-start/end`
- Default direction = RTL (Arabic)

### C-5: GentleNote Tone — Knowledge, Not Sales
> **Source:** Constitution §12, §11 (Critical Files)

| Type | Example | Verdict |
|------|---------|---------|
| ❌ Sales | "Book now! Best service in Jeddah!" | FORBIDDEN |
| ❌ Panic | "Act fast before your data is lost forever!" | FORBIDDEN |
| ✅ Knowledge | "If you need hands-on help, our team at Al-Fares Computer Maintenance & Data Recovery Center (Jeddah) is available for consultation." | CORRECT |

### C-6: Windows Commands
All terminal commands MUST use `cmd /c` prefix.

### C-7: GitHub PR per Component
Each component gets its own commit. CodeRabbit will auto-review.

---

## 📅 Implementation Phases

---

### **Phase A: `src/config/location.ts` — The Atomic Core 🔴**
> **Model:** `Claude Sonnet 4.5 (Thinking)` 🟠
> **Goal:** Create the single source of truth for brand + location data
> **Depends On:** Phase 1.1 ✅
> **Rule:** No-AI-First-Draft — content provided below, agent writes file

#### Data Sources:
- **Brand data:** KB_02_Dr_Hard_Disk_Profile_Location.md
- **Facility data:** KB_01_Alfares_Profile_Location.md
- **Architecture:** Vision v2.0 §3.1–§3.3
- **Critical file rules:** Constitution §11

#### Exact File Content:

```typescript
// src/config/location.ts
// ══════════════════════════════════════════════════════════════
// THE ATOMIC CORE — Dr. Hard Disk Portable Brand
// Source: master-constitution.md §11 | Vision v2.0 §3.1
// ══════════════════════════════════════════════════════════════
//
// ARCHITECTURE:
//   brand        → PERMANENT — never changes (Dr. Hard Disk identity)
//   currentLocation → SWAPPABLE — changes when facility changes
//
// DANGER: Never import brand data from currentLocation or vice versa.
//         Never hardcode location names in .mdx or .astro files.
//         Always read from this file via imports.
//
// WHEN RELOCATING: Only update `currentLocation` object.
//         Brand remains untouched. Site rebuilds automatically.
// ══════════════════════════════════════════════════════════════

// ─── TypeScript Interfaces ───

export interface Brand {
  name: string;
  nameEn: string;
  tagline: { ar: string; en: string };
  title: string;
  titleEn: string;
  specialty: { ar: string; en: string };
  siteUrl: string;
  contact: {
    whatsapp: string;
    whatsappUrl: string;
  };
}

export interface Location {
  facilityName: { ar: string; en: string };
  city: { ar: string; en: string };
  district: { ar: string; en: string };
  street: { ar: string; en: string };
  postalCode: string;
  googleMapsUrl: string;
  contact: {
    phone: string;
    whatsapp: string;
    whatsappUrl: string;
  };
  socialMedia: {
    tiktok: string;
    snapchat: string;
    linktree: string;
  };
  gentleNote: { ar: string; en: string };
}

// ─── BRAND — PERMANENT (never changes) ───

export const brand: Brand = {
  name: "د.هارد ديسك",
  nameEn: "Dr. Hard Disk",

  tagline: {
    ar: "مرجعك العربي لاستعادة البيانات",
    en: "Your Arabic Reference for Data Recovery",
  },

  title: "د.هارد ديسك — مرجعك العربي لاستعادة البيانات",
  titleEn: "Dr. Hard Disk — Your Arabic Reference for Data Recovery",

  specialty: {
    ar: "قاعدة معرفية متخصصة في استعادة البيانات",
    en: "Knowledge Base Specialized in Data Recovery",
  },

  siteUrl: process.env.PUBLIC_SITE_URL ?? "", // From .env — domain not chosen yet

  // Personal contact (Dr. Hard Disk — stable)
  contact: {
    whatsapp: "966507322542",
    whatsappUrl: "https://wa.me/966507322542",
  },
};

// ─── CURRENT LOCATION — SWAPPABLE (update when facility changes) ───

export const currentLocation: Location = {
  facilityName: {
    ar: "مركز الفارس لصيانة الكمبيوتر واستعادة البيانات",
    en: "Al-Fares Computer Maintenance & Data Recovery Center",
  },

  city: { ar: "جدة", en: "Jeddah" },
  district: { ar: "حي الشرفية", en: "Al-Sharafiyah District" },
  street: { ar: "شارع خالد بن الوليد", en: "Khalid Ibn Al-Waleed Street" },
  postalCode: "23218",

  googleMapsUrl: "https://maps.app.goo.gl/DbpKJBbTKQxCTCGW9",

  // Currently same as brand contact (may change with relocation)
  contact: {
    phone: "0507322542",
    whatsapp: "966507322542",
    whatsappUrl: "https://wa.me/966507322542",
  },

  // Social media (facility-specific)
  socialMedia: {
    tiktok: "https://tiktok.com/@alfares.datarecovry",
    snapchat: "https://snapchat.com/add/alfaresrecovery",
    linktree: "https://allmylinks.com/alfares-datarecovry",
  },

  // Gentle note (dynamic — changes with location)
  gentleNote: {
    ar: "لو محتاج مساعدة عملية، فريقنا في مركز الفارس لصيانة الكمبيوتر واستعادة البيانات (جدة) متاح للاستشارة.",
    en: "If you need hands-on help, our team at Al-Fares Computer Maintenance & Data Recovery Center (Jeddah) is available for consultation.",
  },
};
```

#### Tasks:

| Run | Review | Task |
| :-: | :----: | :--- |
| `[x]` | `[x]` | Write `src/config/location.ts` with exact content above |
| `[x]` | `[x]` | Verify TypeScript types compile: `cmd /c pnpm astro check` |
| `[x]` | `[x]` | Verify no hardcoded location names in other files |

#### 🔒 Checkpoint A:
```bash
cmd /c pnpm astro check
```
- Expected: 0 errors
- Verify: `location.ts` exports `brand` and `currentLocation`

#### Git:
```bash
cmd /c git add src/config/location.ts
cmd /c git commit -m "Phase-1.2A-location.ts-Atomic-Core"
cmd /c git push origin main
```

---

### **Phase B: `src/content/config.ts` — Zod Content Schemas 🟠**
> **Model:** `Claude Sonnet 4.5 (Thinking)` 🟠
> **Goal:** Define Zod schemas for posts, services, and cases collections
> **Depends On:** Phase A ✅
> **Rule:** No-AI-First-Draft — content provided below
> **Reference:** TAD v4.2 §3.1–§3.3, Constitution §9.2

#### Schema Sources:
- **Posts & Services frontmatter:** TAD v4.2 §3.1 (lines 354–385)
- **Cases frontmatter:** TAD v4.2 §3.2 (lines 388–408)
- **Validation rules:** TAD v4.2 §3.3 (lines 411–435)
- **v5 API:** Constitution §9.2.1

#### Exact File Content:

```typescript
// src/content/config.ts
// ══════════════════════════════════════════════════════════════
// Content Collections Schema — Dr. Hard Disk
// Source: TAD v4.2 §3.1–§3.3 | Constitution §9.2
// API: Astro v5 Content Layer API (glob loader)
// ══════════════════════════════════════════════════════════════
//
// WARNING: This file uses Astro v5 Content Layer API.
//   - DO NOT use defineCollection() without a loader
//   - DO NOT use getEntryBySlug() — removed in v5
//   - DO NOT use entry.render() — use render(entry) instead
// ══════════════════════════════════════════════════════════════

import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// ─── Shared Enums ───

const categoryEnum = z.enum([
  "hdd",
  "ssd",
  "raid",
  "flash",
  "mobile",
  "nas",
  "general",
]);

const brandEnum = z.enum([
  "western-digital",
  "seagate",
  "samsung",
  "toshiba",
  "kingston",
  "crucial",
  "sandisk",
  "hikvision",
  "other",
]);

const symptomEnum = z.enum([
  "clicking-sound",
  "not-detected",
  "water-damage",
  "fire-damage",
  "deleted-files",
  "formatted-drive",
  "ransomware",
  "bad-sectors",
  "firmware-corruption",
  "pcb-failure",
  "head-crash",
  "motor-failure",
  "electrical-surge",
  "physical-damage",
  "logical-damage",
]);

const difficultyEnum = z.enum(["simple", "moderate", "critical"]);

const langEnum = z.enum(["ar", "en"]);

// ─── Posts Collection ───

const posts = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/posts" }),
  schema: z.object({
    // Core Identity
    title: z.string().min(10).max(120),
    description: z.string().min(50).max(160),
    pubDate: z.coerce.date(),
    heroImage: z.string().startsWith("../../assets/images/"),
    lang: langEnum,
    translationID: z.string(),

    // Taxonomy
    category: categoryEnum,
    brands: z.array(brandEnum).max(3).optional().default([]),
    symptoms: z.array(symptomEnum).max(5).optional().default([]),
    difficulty: difficultyEnum,

    // Control
    draft: z.boolean().optional().default(false),
    featured: z.boolean().optional().default(false),
  }),
});

// ─── Services Collection ───

const services = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/services" }),
  schema: z.object({
    title: z.string().min(10).max(120),
    description: z.string().min(50).max(160),
    pubDate: z.coerce.date(),
    heroImage: z.string().startsWith("../../assets/images/"),
    lang: langEnum,
    translationID: z.string(),

    category: categoryEnum,
    brands: z.array(brandEnum).max(3).optional().default([]),
    symptoms: z.array(symptomEnum).max(5).optional().default([]),
    difficulty: difficultyEnum,

    draft: z.boolean().optional().default(false),
    featured: z.boolean().optional().default(false),
  }),
});

// ─── Cases Collection (Success Stories) — NEW v4.2 ───

const cases = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/cases" }),
  schema: z.object({
    // Case Study Identity
    title: z.string(),
    device_type: z.enum(["hdd", "ssd", "raid", "flash"]),
    brand: brandEnum.optional(),
    problem: z.string(),
    solution: z.string(),
    result: z.string(),
    recovery_percentage: z.number().min(0).max(100),
    badge: z.enum(["success", "challenge"]),
    date: z.coerce.date(),
    lang: langEnum,
    translationID: z.string(),
    heroImage: z.string().startsWith("../../assets/images/").optional(),
    draft: z.boolean().optional().default(false),
  }),
});

// ─── Export ───

export const collections = { posts, services, cases };
```

#### Tasks:

| Run | Review | Task |
| :-: | :----: | :--- |
| `[x]` | `[x]` | Replace `src/content/config.ts` with exact content above |
| `[x]` | `[x]` | Verify TypeScript compiles: `cmd /c pnpm astro check` |
| `[x]` | `[x]` | Verify build succeeds: `cmd /c pnpm build` |
| `[x]` | `[x]` | Confirm no v4 syntax (`getEntryBySlug`, `entry.render()`) |

#### 🔒 Checkpoint B:
```bash
cmd /c pnpm astro check
cmd /c pnpm build
```
- Expected: 0 type errors, build succeeds
- Note: Build may warn about empty collections — that is expected

#### Git:
```bash
cmd /c git add src/content/config.ts
cmd /c git commit -m "Phase-1.2B-content-config-Zod-schemas"
cmd /c git push origin main
```

---

### **Phase C: `src/layouts/BaseLayout.astro` — Root Layout 🟡**
> **Model:** `Claude Sonnet 4.5` 🟡
> **Goal:** Full layout with SEO meta, fonts, RTL/LTR, global.css
> **Depends On:** Phase A ✅ (imports brand from location.ts)
> **Reference:** TAD v4.2 §4.2, UX v3.2 §3.2

#### Requirements:
1. **SEO Meta Tags:** title, description, og:title, og:description, og:image, og:url, og:type, twitter:card
2. **Fonts:** Import Tajawal (Arabic) + Inter Variable (English) from global.css
3. **RTL/LTR:** Set `dir` and `lang` attributes based on `lang` prop
4. **Global CSS:** Import `../styles/global.css`
5. **Canonical URL:** Computed from Astro.url
6. **No FloatingWhatsApp** — deferred to later phase
7. **No `astro-seo`** — manage meta tags directly (Constitution §10.3)
8. **Slot:** Default slot for page content

#### Exact File Content:

```astro
---
// src/layouts/BaseLayout.astro
// ══════════════════════════════════════════════════════════════
// Root Layout — Dr. Hard Disk
// Source: TAD v4.2 §4.2 | Constitution §10.3
// ══════════════════════════════════════════════════════════════

import { brand } from "../config/location";
import "../styles/global.css";



interface Props {
  title?: string;
  description?: string;
  lang?: "ar" | "en";
  heroImage?: string;
  canonicalUrl?: string;
}

const {
  title = brand.title,
  description = brand.tagline.ar,
  lang = "ar",
  heroImage,
  canonicalUrl,
} = Astro.props;

const isRTL = lang === "ar";
const dir = isRTL ? "rtl" : "ltr";
const pageTitle = title.includes(brand.nameEn)
  ? title
  : `${title} | ${lang === "ar" ? brand.name : brand.nameEn}`;
const canonical = canonicalUrl || new URL(Astro.url.pathname, brand.siteUrl).href;
const ogImage = heroImage
  ? new URL(heroImage, brand.siteUrl).href
  : undefined;
---

<!doctype html>
<html lang={lang} dir={dir}>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <!-- SEO Core -->
    <title>{pageTitle}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={canonical} />

    <!-- Open Graph -->
    <meta property="og:title" content={pageTitle} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content={canonical} />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content={lang === "ar" ? "ar_SA" : "en_US"} />
    {ogImage && <meta property="og:image" content={ogImage} />}

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={pageTitle} />
    <meta name="twitter:description" content={description} />
    {ogImage && <meta name="twitter:image" content={ogImage} />}

    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />

    <!-- Generator -->
    <meta name="generator" content={Astro.generator} />
  </head>
  <body>
    <slot />
  </body>
</html>
```

#### Tasks:

| Run | Review | Task |
| :-: | :----: | :--- |
| `[x]` | `[x]` | Replace `src/layouts/BaseLayout.astro` with exact content above |
| `[x]` | `[x]` | Verify build: `cmd /c pnpm astro check` |
| `[x]` | `[x]` | Verify `brand` import resolves correctly |
| `[x]` | `[x]` | Verify RTL/LTR switching works for both `lang` values |

#### 🔒 Checkpoint C:
```bash
cmd /c pnpm astro check
cmd /c pnpm build
```
- Expected: 0 errors, build succeeds
- Verify HTML output has `lang="ar" dir="rtl"` by default

#### Git:
```bash
cmd /c git add src/layouts/BaseLayout.astro
cmd /c git commit -m "Phase-1.2C-BaseLayout-SEO-RTL"
cmd /c git push origin main
```

---

### **Phase D: `src/components/content/GentleNote.astro` — Knowledge CTA 🔴**
> **Model:** `Claude Sonnet 4.5 (Thinking)` 🟠
> **Goal:** Build the soft-CTA component with knowledge-first tone
> **Depends On:** Phase A ✅ (imports currentLocation from location.ts)
> **Reference:** Constitution §11, §12, TAD v4.2 §4.4

#### Critical Tone Rules:
```
❌ FORBIDDEN: "Book now!", "Best price!", "Free inspection!", "Limited offer!"
❌ FORBIDDEN: "Act fast before your data is lost!"
❌ FORBIDDEN: Hardcoded city names ("Jeddah", "جدة")

✅ CORRECT: Knowledge-first, gentle nudge to the facility
✅ CORRECT: Reads ALL location data from currentLocation (location.ts)
✅ CORRECT: Adapts text based on lang prop (ar/en)
```

#### Exact File Content:

```astro
---
// src/components/content/GentleNote.astro
// ══════════════════════════════════════════════════════════════
// GentleNote — Knowledge-First Soft CTA
// Source: Constitution §11, §12 | TAD v4.2 §4.4
// ══════════════════════════════════════════════════════════════
//
// PURPOSE: A gentle, non-aggressive nudge at the end of articles.
//          It bridges the "knowledge layer" to the "local layer"
//          without breaking the site's authority tone.
//
// TONE:   "If you need help, we're here." — NOT "BUY NOW!"
// DATA:   ALL location data comes from location.ts (never hardcoded)
// ══════════════════════════════════════════════════════════════

import { currentLocation } from "../../config/location";

interface Props {
  lang?: "ar" | "en";
}

const { lang = "ar" } = Astro.props;

const isArabic = lang === "ar";
const facility = isArabic
  ? currentLocation.facilityName.ar
  : currentLocation.facilityName.en;
const city = isArabic
  ? currentLocation.city.ar
  : currentLocation.city.en;
const noteText = isArabic
  ? currentLocation.gentleNote.ar
  : currentLocation.gentleNote.en;
const whatsappLabel = isArabic ? "واتساب" : "WhatsApp";
const mapsLabel = isArabic ? "الموقع على الخريطة" : "View on Map";
---

<aside
  class="gentle-note"
  role="complementary"
  aria-label={isArabic ? "ملاحظة" : "Note"}
>
  <p class="gentle-note__icon">💡</p>
  <p class="gentle-note__text">{noteText}</p>
  <div class="gentle-note__links">
    <a
      href={currentLocation.contact.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      class="gentle-note__link"
    >
      {whatsappLabel}
    </a>
    <a
      href={currentLocation.googleMapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      class="gentle-note__link"
    >
      {mapsLabel}
    </a>
  </div>
</aside>

<style>
  .gentle-note {
    margin-block: 2rem;
    padding: 1.25rem 1.5rem;
    border-inline-start: 4px solid var(--color-primary-500, #22c55e);
    background-color: var(--color-primary-50, #f0fdf4);
    border-radius: 0.5rem;
  }

  .gentle-note__icon {
    font-size: 1.25rem;
    margin-block-end: 0.5rem;
  }

  .gentle-note__text {
    font-size: 0.95rem;
    line-height: 1.7;
    color: var(--color-primary-700, #15803d);
    margin: 0;
  }

  .gentle-note__links {
    display: flex;
    gap: 1rem;
    margin-block-start: 0.75rem;
    flex-wrap: wrap;
  }

  .gentle-note__link {
    font-size: 0.85rem;
    color: var(--color-primary-600, #16a34a);
    text-decoration: underline;
    text-underline-offset: 3px;
    transition: color 0.2s ease;
  }

  .gentle-note__link:hover {
    color: var(--color-primary-700, #15803d);
  }
</style>
```

#### Tasks:

| Run | Review | Task |
| :-: | :----: | :--- |
| `[x]` | `[x]` | Create `src/components/content/GentleNote.astro` with exact content above |
| `[x]` | `[x]` | Verify: no hardcoded location names in component |
| `[x]` | `[x]` | Verify: CSS uses logical properties only (no `left`/`right`) |
| `[x]` | `[x]` | Verify build: `cmd /c pnpm astro check` |
| `[x]` | `[x]` | Verify build: `cmd /c pnpm build` |

#### 🔒 Checkpoint D:
```bash
cmd /c pnpm astro check
cmd /c pnpm build
```
- Expected: 0 errors, build succeeds
- Verify: grep for `left` or `right` in GentleNote CSS — must be 0

#### Git:
```bash
cmd /c git add src/components/content/GentleNote.astro
cmd /c git commit -m "Phase-1.2D-GentleNote-knowledge-CTA"
cmd /c git push origin main
```

---

### **Phase E: Final Build Verification 🟢**
> **Model:** `Gemini 3 Flash` 🟢
> **Goal:** Full build verification + documentation update
> **Depends On:** Phases A–D ✅

#### Tasks:

| Run | Review | Task |
| :-: | :----: | :--- |
| `[x]` | `[x]` | Run full type check: `cmd /c pnpm astro check` |
| `[x]` | `[x]` | Run full build: `cmd /c pnpm build` |
| `[x]` | `[x]` | Verify `dist/` output exists |
| `[x]` | `[x]` | Grep entire `src/` for hardcoded "جدة" or "Jeddah" outside `location.ts` |
| `[x]` | `[x]` | Grep entire `src/` for hardcoded "الفارس" or "Alfares" outside `location.ts` |
| `[x]` | `[x]` | Update `project-context.md` with Phase 1.2 status |
| `[x]` | `[x]` | Update `project-key.md` if new files added |
| `[x]` | `[x]` | Update `changelog.md` with Phase 1.2 entry |

#### 🔒 Checkpoint E (Final):
```bash
cmd /c pnpm astro check
cmd /c pnpm build
cmd /c findstr /S /I "جدة" src\*.ts src\*.astro
cmd /c findstr /S /I "Jeddah" src\*.ts src\*.astro
cmd /c findstr /S /I "الفارس" src\*.ts src\*.astro
```
- Expected: Only matches in `src/config/location.ts`
- If any matches outside `location.ts` → STOP and fix

---

## 📊 Model-Phase Summary

| Phase | Component | Model | Complexity | Risk |
|-------|-----------|-------|------------|------|
| A | `location.ts` | Claude Sonnet 4.5 (Thinking) 🟠 | High | 🔴 Brand/Location coupling |
| B | `content/config.ts` | Claude Sonnet 4.5 (Thinking) 🟠 | High | 🟠 v5 API hallucination |
| C | `BaseLayout.astro` | Claude Sonnet 4.5 🟡 | Medium | 🟡 RTL/SEO correctness |
| D | `GentleNote.astro` | Claude Sonnet 4.5 (Thinking) 🟠 | Medium | 🔴 Tone violation |
| E | Verification | Gemini 3 Flash 🟢 | Low | 🟢 Standard checks |

---

## 🔄 Handoff Protocol

### Upon Phase 1.2 Completion:

```
---
✅ Phase 1.2: Core Components — COMPLETE

📋 Summary:
- location.ts: Brand/Location separation implemented
- content/config.ts: Zod schemas (posts, services, cases)
- BaseLayout.astro: SEO + RTL/LTR + Fonts
- GentleNote.astro: Knowledge-first soft CTA

🔄 Next Phase: 1.3 — Page Templates
🤖 Recommended Model: Claude Sonnet 4.5 🟡

📝 Prompt for Phase 1.3:
Phase 1.3: Page Templates.
Context: Core components complete. All 4 critical files implemented.

Required Actions:
1. src/pages/index.astro — Arabic homepage (uses BaseLayout + GentleNote)
2. src/pages/en/index.astro — English homepage
3. src/pages/contact.astro — Contact page (uses currentLocation)
4. Error pages (404)

Reference: 09_Homepage_Site_Blueprint.md + TAD v4.2 §4
start_phase: 1.3
---
```

---

## ⚠️ Failure Protocol

If any checkpoint fails:
1. **STOP immediately**
2. Document failure:
```markdown
#### ⚠️ Failure Report — Phase [X]
- **Date:** YYYY-MM-DD HH:MM
- **Error:** [exact error message]
- **Attempted Fix:** [what was tried]
- **Status:** ⏳ Awaiting developer decision
```
3. Do NOT proceed to next phase

---

## 📚 References

| Document | Section | Used For |
|----------|---------|----------|
| `master-constitution.md` | §9.2, §9.3, §11, §12 | Schema rules, No-AI-First-Draft, Critical files, Forbidden changes |
| `01_Project_Vision_v2.0.md` | §3.1–§3.3, §4 | Portable brand model, 3-layer architecture |
| `05_DrHardDisk_TAD_v4.2.md` | §3.1–§3.3 | Content schema, frontmatter fields, validation rules |
| `KB_01_Alfares_Profile_Location.md` | All | Facility address, phone, hours, social media |
| `KB_02_Dr_Hard Disk_Profile_Location.md` | All | Brand identity, persona, arsenal, tone |
| `04_DrHardDisk_UX_v3.2.md` | §3.2 | Design system, layout structure |
