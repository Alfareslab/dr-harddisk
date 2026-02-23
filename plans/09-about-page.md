# 🗺️ Phase 2.3: About Page — "من نحن"
> **Version:** 1.0.0
> **Date:** 2026-02-23
> **Methodology:** Multi-Model Development
> **Source:** PRD v4 §4.9 (FR-A1→FR-A6) | Vision v2.0 §2–3 | UX v3.2 §1, §4.9
> **Depends On:** Phase 2.2 ✅

---

## 🎯 Overall Goal

Build the "About Datacodex" page (Arabic + English) that tells the brand story —
**not** a service pitch. The page introduces the brand, its tools, philosophy,
privacy protocol, and realistic success rates.

### Key Constraints (from Research Docs):
- ❌ **No personal photos or personal names** (UX §1.1 #3, PRD FR-A6)
- ❌ **No sales language** ("أفضل خدمة", "اتصل الآن") (UX §1.1 #1, #5)
- ✅ **Allowed images:** Caricature mascot, logos, equipment photos, AI-generated lab (PRD FR-A6)
- ✅ **Allowed tone:** Knowledge-first, educational, professional
- ✅ **Must read all data from `location.ts`** — zero hardcoded values (PRD §4.8)
- ✅ **Must include Schema.org** — `Person` + `worksFor` (PRD FR-A5)

---

## 📅 Execution Phases

### **Phase 1: Arabic About Page 🏗️**
> **Model:** `Gemini 3 Pro` 🟠
> **Goal:** Create the main Arabic About page with all sections and Schema.org
> **Depends On:** Phase 2.2 ✅

| Exec | Review | Task |
| :---: | :---: | :--- |
| `[x]` | `[x]` | Create `src/pages/about.astro` with the sections below |
| `[x]` | `[x]` | Add Schema.org JSON-LD (`Person` + `worksFor`) in `<head>` |
| `[x]` | `[x]` | Add the page link to NavBar (update `NavBar.astro` — add "من نحن" / "About") |
| `[x]` | `[x]` | Verify the page builds without errors (`cmd /c npx astro build`) |

#### Page Structure — `src/pages/about.astro`:

```
---
import BaseLayout from "../layouts/BaseLayout.astro";
import GentleNote from "../components/content/GentleNote.astro";
import { brand, currentLocation } from "../config/location";
---

<BaseLayout
  title={`عن ${brand.name} — ${brand.tagline.ar}`}
  description="تعرّف على Datacodex — قاعدة معرفية متخصصة في استعادة البيانات بخبرة +8 سنوات وأدوات احترافية."
>
```

#### Required Sections (in order):

| # | Section | Content | Tailwind Approach |
|:--|:--------|:--------|:-----------------|
| 1 | **Hero Header** | Brand name + tagline from `brand.tagline.ar`. Subtitle: "مرجعك العربي لاستعادة البيانات" | `text-center`, primary color `#0b4f6c`, same style as Contact hero |
| 2 | **Brand Story** | Who is Datacodex? A portable brand (not a shop). Specialist with 8+ years. Previously managed GigaSoft in Egypt. Now in Saudi Arabia. **No personal names — use "المؤسس" or "المتخصص".** Source: Vision §2.1–§2.3 | `prose` typography, max-w-3xl, centered |
| 3 | **Tools & Equipment** | PC-3000 Portable Pro (from ACE Lab), MRT Lab, CDev, R-Studio, Clean Room capability. **Use AI-generated or stock images of equipment — no personal photos.** Source: Vision §2.2 | Grid 2-col on desktop, icon cards style |
| 4 | **Privacy Protocol** | "الاستعادة العمياء" — blind recovery. Data is recovered without viewing contents. Source: Vision §6.1, PRD FR-A3 | Highlighted box, light gray bg `#F9FAFB`, border |
| 5 | **Success Rates** | Realistic rates by failure type. **Must NOT say 100% or "guaranteed".** Example: Physical HDD: ~85%, Logical: ~95%, RAID: ~75%. Source: PRD FR-A4, Vision §7.1 ("zero false promises") | Table or stat cards, honest amber/green colors |
| 6 | **GentleNote** | Standard `<GentleNote lang="ar" />` component | Already exists, just import and use |

#### Schema.org JSON-LD (in `<head>` via `<script type="application/ld+json">`):

```astro
---
const schema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": brand.name,
  "alternateName": brand.nameEn,
  "jobTitle": "Data Recovery Specialist",
  "description": "Arabic knowledge base specialized in data recovery",
  "knowsAbout": ["Data Recovery", "HDD Repair", "RAID Recovery", "SSD Recovery"],
  "url": `${brand.siteUrl}/about/`,
  "worksFor": {
    "@type": "LocalBusiness",
    "name": currentLocation.facilityName.en,
    "address": `${currentLocation.street.en}, ${currentLocation.district.en}, ${currentLocation.city.en}`
  }
};
---
<script type="application/ld+json" set:html={JSON.stringify(schema)} />
```

> ⚠️ **Important:** All Schema values (worksFor name, address) MUST be read from
> `location.ts` at build time — never hardcoded.

**🔄 Prompt to start this phase:**

```
Phase 2.3 — About Page (Arabic).

Read these files first:
1. `plans/09-about-page.md` — full execution plan
2. `src/pages/contact.astro` — reference for code style and layout patterns
3. `src/config/location.ts` — data source for brand and location info
4. `src/layouts/BaseLayout.astro` — layout wrapper
5. `src/components/content/GentleNote.astro` — existing component to reuse

Create `src/pages/about.astro` following the Phase 1 section of the plan exactly.
Add Schema.org JSON-LD in the head.
Add "من نحن" link to NavBar.astro.
Run `cmd /c npx astro build` to verify.

Rules:
- All text in code files must be in English (comments, variable names).
- Arabic text only in template strings for user-facing content.
- Read ALL data from location.ts — zero hardcoded values.
- No personal photos, no personal names.
- Follow existing code patterns from contact.astro.
```

---

### **Phase 2: English Twin 🌐**
> **Model:** `Gemini 3 Pro` 🟠
> **Goal:** Create the English version mirroring the Arabic page
> **Depends On:** Phase 1 ✅

| Exec | Review | Task |
| :---: | :---: | :--- |
| `[x]` | `[x]` | Create `src/pages/en/about.astro` mirroring Arabic structure |
| `[x]` | `[x]` | All text in English, LTR layout, same sections |
| `[x]` | `[x]` | Schema.org uses English values |
| `[x]` | `[x]` | Add hreflang tags linking AR ↔ EN versions |
| `[x]` | `[x]` | Verify build: `cmd /c npx astro build` |

**🔄 Prompt to start this phase:**

```
Phase 2.3 — About Page (English Twin).

Read these files first:
1. `plans/09-about-page.md` — full execution plan (Phase 2)
2. `src/pages/about.astro` — the Arabic version just created
3. `src/pages/en/index.astro` — reference for English page patterns

Create `src/pages/en/about.astro` as the English mirror of the Arabic about page.
- Same sections, same structure, English text.
- LTR layout (dir="ltr").
- Schema.org in English.
- Add hreflang tags (ar ↔ en) to both pages.
- Run `cmd /c npx astro build` to verify.
```

---

### **Phase 3: Visual QA + Cleanup 🧪**
> **Model:** `Gemini 3 Flash` 🟢
> **Goal:** Visual verification and cleanup
> **Depends On:** Phase 2 ✅

| Exec | Review | Task |
| :---: | :---: | :--- |
| `[x]` | `[x]` | Open `http://localhost:4321/about/` and verify all sections render |
| `[x]` | `[x]` | Check mobile responsiveness (resize viewport) |
| `[x]` | `[x]` | Verify NavBar "من نحن" link works on all pages |
| `[x]` | `[x]` | Check Schema.org in page source (JSON-LD present and valid) |
| `[x]` | `[x]` | Open `/en/about/` and verify English version |
| `[x]` | `[x]` | Run Lighthouse audit on about page |

**🔄 Prompt to start this phase:**

```
Phase 2.3 — Visual QA.

Start dev server: `cmd /c npx astro dev`
Open the about page and verify:
1. All 6 sections render correctly (Hero, Story, Tools, Privacy, Rates, GentleNote)
2. Mobile responsive at 375px, 768px, 1280px
3. NavBar "من نحن" link works
4. Schema.org JSON-LD is valid
5. English version at /en/about/ mirrors Arabic
6. Run Lighthouse on the page

Report any issues found.
```

---

## 🚪 Pre-Implementation Gates

### 🚪 Simplicity Gate:
- [x] Solution uses minimum files: 2 pages (`about.astro`, `en/about.astro`) + 1 edit (`NavBar.astro`)
- [x] No "future improvements" or "might need later"
- [x] Every technical decision has a clear reason

### 🚪 No-Abstraction Gate:
- [x] Using Astro framework directly
- [x] No extra abstraction layers
- [x] Reusing existing components (BaseLayout, GentleNote)

### 🚪 Clarity Gate:
- [x] Requirements are 100% clear from PRD FR-A1→FR-A6
- [x] No `[needs clarification]` items pending

---

## 📊 Model & Phase Summary

| Phase | Model | Files | Risk |
|:------|:------|:------|:-----|
| 1. Arabic About Page | `Gemini 3 Pro` 🟠 | `about.astro`, `NavBar.astro` (edit) | Low — follows existing patterns |
| 2. English Twin | `Gemini 3 Pro` 🟠 | `en/about.astro` | Low — mirror of Phase 1 |
| 3. Visual QA | `Gemini 3 Flash` 🟢 | None (testing only) | Minimal |

---

## 📚 Research References

| Document | Section Used | What It Provides |
|:---------|:-------------|:----------------|
| `Research/01_Project_Vision_v2.0.md` | §2.1–§2.3, §3.1–§3.3, §6.1, §7.1 | Brand story, founder context, privacy protocol, content philosophy |
| `Research/03_Datacodex_PRD_v4.md` | §4.9 (FR-A1→FR-A6) | Functional requirements for About page |
| `Research/04_Datacodex_UX_v3.2.md` | §1 (Philosophy), §4.9 | Design prohibitions, image constraints |
| `src/config/location.ts` | Full file | Brand + location data (single source of truth) |
| `src/pages/contact.astro` | Full file | Code pattern reference (imports, layout, styling) |

---

## ✅ Definition of Done

- [x] Arabic about page at `/about/` renders all 6 sections
- [x] English about page at `/en/about/` mirrors Arabic content
- [x] Schema.org JSON-LD (Person + worksFor) present in page head
- [x] NavBar updated with "من نحن" / "About" link on all pages
- [x] No personal photos or personal names anywhere
- [x] All data from `location.ts` — zero hardcoded values
- [x] Build passes: `cmd /c npx astro build`
- [x] No sales language or storefront tone

---

## 📋 Documentation Updates (after completion)

| File | Update |
|:-----|:-------|
| `project-context.md` | Update current phase status + next step |
| `project-key.md` | Add about page files to index |
| `changelog.md` | Log Phase 2.3 completion |
| `plans/00-master-plan.md` | Mark Phase 2.3 as ✅ |
