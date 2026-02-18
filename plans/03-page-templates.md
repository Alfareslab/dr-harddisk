# 🗺️ Phase 1.3: Page Templates — Dr. Hard Disk
> **Version:** 1.0.0
> **Date:** 2026-02-18
> **Methodology:** Multi-Model Development
> **Depends On:** Phase 1.2 (Core Components) ✅
> **Repository:** [github.com/Alfareslab/dr-harddisk](https://github.com/Alfareslab/dr-harddisk)

---

## 🎯 General Goal

Build the 4 initial page templates that form the site's visible structure:

1. **`src/pages/index.astro`** — Homepage (Arabic, RTL, default)
2. **`src/pages/en/index.astro`** — Homepage (English, LTR)
3. **`src/pages/contact.astro`** — Contact page (Arabic)
4. **`src/pages/404.astro`** — Error page (Bilingual)

### What Phase 1.3 Is NOT:
- No navigation bar (future phase)
- No footer (future phase)
- No floating WhatsApp button (future phase)
- No AI-generated images (structural placeholders only)
- No dynamic content from collections (no articles/cases yet)
- No Reels/Social media section (requires external embeds — future phase)

> **Design philosophy:** We build the **skeletal structure** of each page with
> real text, real colors, real spacing, and real semantic HTML. Images and
> dynamic content will be injected in later phases.

---

## 🚪 Pre-Implementation Gates

### Gate 1: Simplicity
- [ ] Each page = 1 file (no page-level component extraction)
- [ ] No data fetching from Content Collections (pages are static)
- [ ] No JavaScript on any page (pure Astro SSG)

### Gate 2: No Unnecessary Abstraction
- [ ] Pages import `BaseLayout` and `GentleNote` directly (no wrapper layouts)
- [ ] Contact data comes from `currentLocation` (no props drilling)
- [ ] No i18n library — text is hardcoded per language page (Astro standard routing)

### Gate 3: Clarity
- [ ] All location data from `location.ts` → `currentLocation` (never hardcoded)
- [ ] All brand data from `location.ts` → `brand` (never hardcoded)
- [ ] `No Panic UI` rule enforced: zero sales CTAs, zero urgency language
- [ ] RTL-First: all CSS uses Logical Properties (`inline-start`, `block-end`, etc.)
- [ ] No `[needs clarification]` pending

---

## ⚠️ Critical Constraints

### C-1: No Panic UI (Constitution / UX v3.2 §1.1)
```
FORBIDDEN on ALL pages:
  ❌ "Start free scan" / "Book appointment" / "Call now"
  ❌ Pulse animations or attention-grabbing effects
  ❌ Price lists or service packages
  ❌ Sales-oriented CTAs

ALLOWED:
  ✅ Knowledge-oriented language: "Learn more" / "Contact us"
  ✅ GentleNote with quiet educational tone
  ✅ WhatsApp link (in contact page only — naturally placed)
```

### C-2: RTL-First + Logical CSS (Constitution)
```
FORBIDDEN:
  ❌ margin-left / margin-right / padding-left / padding-right
  ❌ text-align: left / text-align: right
  ❌ border-left / border-right
  ❌ float: left / float: right

USE INSTEAD:
  ✅ margin-inline-start / margin-inline-end
  ✅ text-align: start / text-align: end
  ✅ border-inline-start / border-inline-end
  ✅ inset-inline-start / inset-inline-end
```

### C-3: Brand ≠ Location Separation (Vision v2.0)
```
Homepage → brand data only (ZERO location references)
Contact  → currentLocation only (the ONLY page with address/map)
404      → brand data only
```

### C-4: No Images in This Phase
```
Placeholder strategy:
  - Hero section: text-only (H1 + subtitle) with background gradient
  - Cards grid: CSS-only cards with emoji icons (no <img>)
  - Contact: map link (no embed) + text info
  - This matches the user's explicit constraint
```

---

## 📅 Implementation Phases

---

### **Phase A: Homepage Arabic — `src/pages/index.astro`** 🏠
> **Model:** `Gemini Pro` 🟠
> **Goal:** Build the Arabic homepage skeleton with all text sections
> **Depends On:** Phase 1.2 ✅

#### What This Page Contains (from Blueprint §3):

```
┌─────────────────────────────────────────────────────────┐
│  HOMEPAGE (Arabic — /)                                   │
│                                                          │
│  ┌─────────────────────────────────────────┐             │
│  │  HERO SECTION                           │             │
│  │  H1: "إيه مشكلة جهازك؟"                │             │
│  │  Subtitle: "Dr. Hard Disk — موسوعتك..." │             │
│  │  8 CSS-only placeholder cards (no imgs) │             │
│  └─────────────────────────────────────────┘             │
│                                                          │
│  ┌─────────────────────────────────────────┐             │
│  │  LATEST ARTICLES (Placeholder)          │             │
│  │  H2: "أحدث الشروحات التقنية"            │             │
│  │  "Content coming soon" message          │             │
│  └─────────────────────────────────────────┘             │
│                                                          │
│  ┌─────────────────────────────────────────┐             │
│  │  SUCCESS STORIES (Placeholder)          │             │
│  │  H2: "قصص حقيقية من المختبر"            │             │
│  │  "Content coming soon" message          │             │
│  └─────────────────────────────────────────┘             │
│                                                          │
│  ┌─────────────────────────────────────────┐             │
│  │  ABOUT SECTION (Static)                 │             │
│  │  H2: "Dr. Hard Disk"                    │             │
│  │  Brand intro text (from Blueprint §3.5) │             │
│  │  3 equipment badges (text-only)          │             │
│  └─────────────────────────────────────────┘             │
└─────────────────────────────────────────────────────────┘
```

#### Implementation Details:

**Hero Section (Blueprint §3.1):**
- `<section data-section="hero">` — required for FloatingWhatsApp observer (future)
- H1: `"إيه مشكلة جهازك؟"` — color: `#0B4F6C` (Engineering Blue)
- Subtitle: `"Dr. Hard Disk — موسوعتك التقنية لفهم مشاكل التخزين واستعادة البيانات"`
- Background: gradient `#F8F9FA` → `#EFF1F3`
- Cards grid: 4×2 desktop / 2×4 mobile — CSS Grid
- Each card: emoji icon + Arabic name + English name (sub-text)
- Card 8 (contact): green background `#F0FDF4`, links to `/contact/`
- Cards are `<a>` tags (fully clickable) with hover: `scale(1.05)` + deeper shadow

**Card Data:**

| # | Emoji | Arabic | English | Link |
|---|-------|--------|---------|------|
| 1 | 💿 | هارد ديسك | HDD | `/posts/?category=hdd` |
| 2 | 💾 | SSD | SSD | `/posts/?category=ssd` |
| 3 | ⚡ | NVMe | NVMe | `/posts/?category=ssd` |
| 4 | 🃏 | كرت ذاكرة | SD Card | `/posts/?category=flash` |
| 5 | 🔌 | فلاش ميموري | USB | `/posts/?category=flash` |
| 6 | 📹 | كاميرات مراقبة | DVR | `/posts/?category=dvr` |
| 7 | 🖥️ | سيرفر RAID | RAID | `/posts/?category=raid` |
| 8 | 💬 | محتاج مساعدة؟ | Contact | `/contact/` |

**Latest Articles Section (Blueprint §3.2 — Placeholder):**
- H2: `"أحدث الشروحات التقنية"`
- Subtitle: `"مقالات من المختبر — بعيداً عن الخرافات والمعلومات المغلوطة"`
- Placeholder: `<p>` with message "Content coming soon — stay tuned for expert articles."
- Background: white

**Success Stories Section (Blueprint §3.4 — Placeholder):**
- H2: `"قصص حقيقية من المختبر"`
- Subtitle: `"كل حالة تحدي وكل نجاح بنتعلم منه"`
- Placeholder: `<p>` with message
- Background: `#F1F5F9` (light gray)

**About Section (Blueprint §3.5 — Static):**
- Background: gradient `#0B4F6C` → darker
- Text color: white
- H2: `"Dr. Hard Disk"`
- Text from Blueprint §3.5 (8+ years experience, no software, physical access)
- 3 equipment badges (text-only): PC-3000, MRT Ultra, Clean Room
- Link: `"تعرف على Dr. Hard Disk أكتر ←"` → `/about/` (placeholder href)
- **No personal name, no location, no contact info**

#### Task Table:

| Execute | Review | Task |
| :---: | :---: | :--- |
| `[x]` | `[x]` | Create `src/pages/index.astro` with BaseLayout wrapper |
| `[x]` | `[x]` | Implement Hero section with H1, subtitle, and 8 emoji cards grid |
| `[x]` | `[x]` | Implement Latest Articles placeholder section |
| `[x]` | `[x]` | Implement Success Stories placeholder section |
| `[x]` | `[x]` | Implement About section with brand text and equipment badges |
| `[x]` | `[x]` | All CSS uses Logical Properties only |
| `[x]` | `[x]` | Zero hardcoded location data (brand data from `location.ts`) |
| `[x]` | `[x]` | `data-section="hero"` attribute on hero `<section>` |

**🔄 Prompt for this phase:**
```
Context: Phase 1.3A — Homepage Arabic. Phase 1.2 complete.
Available: BaseLayout.astro, location.ts (brand + currentLocation), GentleNote.astro, global.css.
Task: Create src/pages/index.astro per plan 03-page-templates.md Phase A.
Rules: No images (emoji icons only). No Panic UI. RTL-First Logical CSS. Brand data from location.ts.
No nav/footer/WhatsApp FAB (future phases).
```

---

### **Phase B: Homepage English — `src/pages/en/index.astro`** 🇬🇧
> **Model:** `Gemini Flash` 🟢
> **Goal:** English mirror of the Arabic homepage
> **Depends On:** Phase A ✅

#### Key Differences from Arabic:

| Property | Arabic (`/`) | English (`/en/`) |
|:---------|:-------------|:-----------------|
| `lang` | `"ar"` | `"en"` |
| `dir` | RTL (auto) | LTR (auto) |
| H1 | `"إيه مشكلة جهازك؟"` | `"What's wrong with your device?"` |
| Subtitle | Arabic text | `"Dr. Hard Disk — Your tech encyclopedia..."` |
| Section headings | Arabic | English equivalents |
| About text | Arabic | English (same content, translated) |
| Card labels | Arabic first, English sub | English first (no Arabic sub) |
| Equipment labels | Arabic descriptions | English descriptions |

#### Implementation:

- **Same structure as Arabic** — identical sections, identical grid
- `BaseLayout` with `lang="en"`
- Cards link to same hrefs (no `/en/` prefix for posts — future phase)
- About section text from Blueprint §3.5 (English equivalent)

#### Task Table:

| Execute | Review | Task |
| :---: | :---: | :--- |
| `[ ]` | `[ ]` | Create `src/pages/en/index.astro` mirroring Arabic homepage structure |
| `[ ]` | `[ ]` | All text in English |
| `[ ]` | `[ ]` | BaseLayout with `lang="en"` |
| `[ ]` | `[ ]` | Verify LTR layout renders correctly |

**🔄 Prompt for this phase:**
```
Context: Phase 1.3B — Homepage English. Phase A (Arabic homepage) complete.
Task: Create src/pages/en/index.astro mirroring the Arabic homepage structure.
Rules: All text English. lang="en". Same CSS grid, same emoji cards, same sections.
```

---

### **Phase C: Contact Page — `src/pages/contact.astro`** 📞
> **Model:** `Gemini Pro` 🟠
> **Goal:** The ONLY page with location data. Gentle, natural tone.
> **Depends On:** Phase A ✅

#### What This Page Contains (from Blueprint §8):

```
┌─────────────────────────────────────────────────────────┐
│  CONTACT PAGE (Arabic — /contact/)                       │
│                                                          │
│  ┌─────────────────────────────────────────┐             │
│  │  HEADER                                  │             │
│  │  H1: "تواصل مع Dr. Hard Disk"           │             │
│  └─────────────────────────────────────────┘             │
│                                                          │
│  ┌─────────────────────────────────────────┐             │
│  │  DIRECT CONTACT                         │             │
│  │  WhatsApp button (large + prominent)    │             │
│  │  Note: "For emergencies mention 'طوارئ'" │             │
│  └─────────────────────────────────────────┘             │
│                                                          │
│  ┌─────────────────────────────────────────┐             │
│  │  LOCATION (from currentLocation)        │             │
│  │  H2: "موقع المختبر الحالي"               │             │
│  │  Full address from currentLocation      │             │
│  │  Link to Google Maps (no embed)         │             │
│  │  "نستقبلكم شخصياً. الفحص مجاني."       │             │
│  └─────────────────────────────────────────┘             │
│                                                          │
│  ┌─────────────────────────────────────────┐             │
│  │  GentleNote (bottom)                    │             │
│  └─────────────────────────────────────────┘             │
└─────────────────────────────────────────────────────────┘
```

#### Implementation Details:

**All data from `currentLocation`** — MANDATORY imports:
```typescript
import { brand, currentLocation } from "../config/location";
```

**Section 1 — Direct Contact:**
- H1: `"تواصل مع Dr. Hard Disk"` (brand name, not facility name)
- WhatsApp link: `currentLocation.contact.whatsappUrl`
- WhatsApp message: pre-filled `"مرحباً، عندي استفسار عن استعادة البيانات"`
- Button: styled green `#25D366`, large, centered — THIS IS ALLOWED on /contact/
- Emergency note: `"للحالات الطارئة (سيرفرات شركات)، يرجى ذكر كلمة 'طوارئ' في رسالتك"`

**Section 2 — Location:**
- H2: `"موقع المختبر الحالي"`
- Facility name: `currentLocation.facilityName.ar`
- Full address: constructed from `currentLocation.city.ar`, `district.ar`, `street.ar`
- Map link: `<a href={currentLocation.googleMapsUrl}>` (link, NOT embed — no images constraint)
- Note: `"نستقبلكم شخصياً. الفحص والتشخيص مجاني."`

**Section 3 — GentleNote:**
- `<GentleNote lang="ar" />` at the bottom

#### Task Table:

| Execute | Review | Task |
| :---: | :---: | :--- |
| `[ ]` | `[ ]` | Create `src/pages/contact.astro` with BaseLayout |
| `[ ]` | `[ ]` | Import and use `brand` + `currentLocation` from location.ts |
| `[ ]` | `[ ]` | Implement Direct Contact section with WhatsApp link |
| `[ ]` | `[ ]` | Implement Location section (all from currentLocation) |

| `[ ]` | `[ ]` | Add `<GentleNote lang="ar" />` at bottom |
| `[ ]` | `[ ]` | Zero hardcoded location names (all from currentLocation) |
| `[ ]` | `[ ]` | Logical CSS Properties only |
| `[ ]` | `[ ]` | SEO: unique page title + description in BaseLayout |

**🔄 Prompt for this phase:**
```
Context: Phase 1.3C — Contact Page. Phase A complete.
Available: BaseLayout.astro, location.ts (brand + currentLocation), GentleNote.astro.
Task: Create src/pages/contact.astro per plan 03-page-templates.md Phase C.
Rules: ALL location data from currentLocation import. No hardcoding. Logical CSS. GentleNote at bottom.
```

---

### **Phase D: 404 Page — `src/pages/404.astro`** 🔍
> **Model:** `Gemini Flash` 🟢
> **Goal:** Friendly, branded 404 page with RTL support
> **Depends On:** Phase A ✅ (needs BaseLayout)

#### Design (not in Blueprint — custom design):

```
┌─────────────────────────────────────────────────────────┐
│  404 PAGE                                                │
│                                                          │
│  ┌─────────────────────────────────────────┐             │
│  │         Background: #F8F9FA              │             │
│  │                                          │             │
│  │      💿 (large emoji, decorative)        │             │
│  │                                          │             │
│  │    AR: "الصفحة غير موجودة"               │             │
│  │    EN: "Page not found"                  │             │
│  │                                          │             │
│  │    AR: "يبدو إن الرابط قديم أو خاطئ."    │             │
│  │    EN: "Looks like this link is broken." │             │
│  │                                          │             │
│  │    [ارجع للرئيسية ←]   [← Go Home]      │             │
│  │                                          │             │
│  └─────────────────────────────────────────┘             │
└─────────────────────────────────────────────────────────┘
```

#### Implementation Details:

- **Bilingual:** Both Arabic and English text shown (no language detection for 404)
- Background: `#F8F9FA` (Medical White)
- Large decorative emoji: 💿 (hard disk — on-brand)
- H1: `"الصفحة غير موجودة"` (Arabic, larger)
- English subheading: `"Page not found"` (smaller, muted)
- Explanation text in both languages
- Two buttons: Arabic → `/` and English → `/en/`
- No location data, no contact info
- Colors: Engineering Blue `#0B4F6C` for headings, `#2D3A4A` for body

#### Task Table:

| Execute | Review | Task |
| :---: | :---: | :--- |
| `[ ]` | `[ ]` | Create `src/pages/404.astro` with BaseLayout |
| `[ ]` | `[ ]` | Bilingual text (Arabic primary, English secondary) |
| `[ ]` | `[ ]` | Two "go home" links (`/` and `/en/`) |
| `[ ]` | `[ ]` | Centered layout, branded colors |
| `[ ]` | `[ ]` | Logical CSS Properties only |

**🔄 Prompt for this phase:**
```
Context: Phase 1.3D — 404 Page.
Task: Create src/pages/404.astro per plan 03-page-templates.md Phase D.
Rules: Bilingual. No location data. Branded colors. Logical CSS.
```

---

### **Phase E: Build Verification & QA** ✅
> **Model:** `Gemini Pro` 🟠
> **Goal:** Verify all 4 pages build and pass quality gates
> **Depends On:** Phases A, B, C, D ✅

#### Quality Gates:

| Execute | Review | Gate |
| :---: | :---: | :--- |
| `[ ]` | `[ ]` | `npm run build` succeeds (exit code 0) |
| `[ ]` | `[ ]` | Zero errors in build output |
| `[ ]` | `[ ]` | Location hardcoding scan: `grep -rn "جدة\|Jeddah\|الفارس\|Alfares"` in `/src/pages/` returns ONLY `contact.astro` |
| `[ ]` | `[ ]` | Logical CSS scan: `grep -rn "margin-left\|margin-right\|padding-left\|padding-right\|text-align: left\|text-align: right" src/pages/` returns 0 results |
| `[ ]` | `[ ]` | No Panic UI scan: `grep -rn "فحص مجاني\|احجز\|اتصل الآن\|Book\|Free scan" src/pages/` returns 0 results |
| `[ ]` | `[ ]` | Every page passes BaseLayout with proper title + description |

---

## ⚠️ Failure Protocol

### If build fails:
1. 🛑 Stop immediately
2. 📝 Document error message
3. Check if error is in page template or in dependency (BaseLayout, location.ts)
4. Fix only the failing page — do not touch Phase 1.2 files
5. If Phase 1.2 file needs modification → stop and report to developer

---

## 📊 Model & Phase Summary

| Phase | Description | Model | Files |
|:------|:------------|:------|:------|
| A | Homepage Arabic | 🟠 Gemini Pro | `src/pages/index.astro` |
| B | Homepage English | 🟢 Gemini Flash | `src/pages/en/index.astro` |
| C | Contact Page | 🟠 Gemini Pro | `src/pages/contact.astro` |
| D | 404 Page | 🟢 Gemini Flash | `src/pages/404.astro` |
| E | Build & QA | 🟠 Gemini Pro | (verification only) |

**Total new files:** 4 (2 modified, 2 new)
**Total modified files:** 0 (Phase 1.2 files remain untouched)

---

## 📚 References

| File | Section | Used For |
|:-----|:--------|:---------|
| `09_Homepage_Site_Blueprint.md` | §3, §8 | Homepage sections, contact page spec |
| `04_DrHardDisk_UX_v3.2.md` | §1-§5 | Design system, colors, typography, components |
| `05_DrHardDisk_TAD_v4.2.md` | §2, §4 | File structure, component architecture |
| `master-constitution.md` | Brand/Location rules | No Panic UI, RTL-First, Brand ≠ Location |
| `src/config/location.ts` | — | Brand + currentLocation data source |
| `src/layouts/BaseLayout.astro` | — | Root layout (SEO, fonts, meta) |
| `src/components/content/GentleNote.astro` | — | Soft CTA for contact page |
