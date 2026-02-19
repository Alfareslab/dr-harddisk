# 🗺️ Phase 1.4: Global UI — Dr. Hard Disk
> **Version:** 1.0.0
> **Date:** 2026-02-19
> **Methodology:** Multi-Model Development
> **Depends On:** Phase 1.3 (Page Templates) ✅
> **Repository:** [github.com/Alfareslab/dr-harddisk](https://github.com/Alfareslab/dr-harddisk)

---

## 🎯 General Goal

Build the 3 global UI elements missing from all pages, then integrate them into `BaseLayout.astro`:

1. **`src/components/layout/NavBar.astro`** — Navigation bar (AR/EN, RTL/LTR)
2. **`src/components/layout/Footer.astro`** — Site footer (brand-only, bilingual)
3. **`src/components/ui/FloatingWhatsApp.astro`** — Floating WhatsApp button (uses `currentLocation`)

### What Phase 1.4 Is NOT:
- No Local Zone in Footer (future phase — currently brand-only)
- No hamburger menu JavaScript logic (CSS-only mobile toggle for now)
- No search functionality in NavBar
- No login / authentication
- No mega menu or dropdown sub-menus
- No AI-generated logo images (text-only logo with emoji)
- No Services / Cases links in NavBar (no content collections yet)

> **Design philosophy:** We build **minimal, functional global chrome** that
> frames the existing pages. Every page should feel like a "real website" after
> this phase. Complexity is added in future phases only when content exists to
> justify it.

---

## 🚪 Pre-Implementation Gates

### Gate 1: Simplicity
- [ ] NavBar = 1 file, no sub-components, no JavaScript scroll logic
- [ ] Footer = 1 file, brand data only, no Local Zone (deferred to later phase)
- [ ] FloatingWhatsApp = 1 file with inline `<script>` for hero observer

### Gate 2: No Unnecessary Abstraction
- [ ] Components import `brand` / `currentLocation` from `location.ts` directly
- [ ] No i18n library — bilingual via `lang` prop passed from BaseLayout
- [ ] No HOC / wrapper pattern — components are self-contained Astro files

### Gate 3: Clarity
- [ ] All brand data from `location.ts` → `brand` (never hardcoded)
- [ ] FloatingWhatsApp reads from `currentLocation.contact.whatsappUrl` only
- [ ] Footer has NO location data (address, phone, map — all deferred)
- [ ] `No Panic UI` rule enforced: zero sales CTAs across all 3 components
- [ ] RTL-First: all CSS uses Logical Properties
- [ ] No `[needs clarification]` pending

---

## ⚠️ Critical Constraints

### C-1: No Panic UI (Constitution / UX v3.2 §1.1)
```text
FORBIDDEN on ALL components:
  ❌ "Book appointment" / "Start free scan" / "Call now"
  ❌ Pulse animations or attention-grabbing effects on NavBar/Footer
  ❌ FloatingWhatsApp with text, tooltip, or pulse animation
  ❌ Sales-oriented CTAs in Footer
  ❌ Urgency language anywhere

ALLOWED:
  ✅ Quiet WhatsApp icon (40px circle, 70% opacity)
  ✅ NavBar links to knowledge pages (/, /posts/, /about/, /contact/)
  ✅ Footer with brand description and social media links
  ✅ Language switcher (AR/EN) — functional, not promotional
```

### C-2: RTL-First + Logical CSS (Constitution)
```text
  ❌ margin-left / margin-right / padding-left / padding-right
  ❌ text-align: left / text-align: right
  ❌ border-left / border-right
  ❌ float: left / float: right
  ❌ left: / right: (use inset-inline-start / inset-inline-end)

USE INSTEAD:
  ✅ margin-inline-start / margin-inline-end
  ✅ text-align: start / text-align: end
  ✅ border-inline-start / border-inline-end
  ✅ inset-inline-start / inset-inline-end
  ✅ Flexbox with logical properties (gap, not margins)
```

### C-3: Brand ≠ Location Separation (Vision v2.0)
```text
NavBar           → brand data only (logo, name)
Footer           → brand data only (description, social links, copyright)
FloatingWhatsApp → currentLocation.contact.whatsappUrl ONLY
                   (the only global component allowed to use location data)
```

### C-4: BaseLayout Modification Rule
```text
⚠️ BaseLayout.astro is a Phase 1.2 file.
Modification is REQUIRED in this phase (adding NavBar, Footer, FloatingWhatsApp).
This must be:
  - Documented explicitly in Phase D
  - Limited to import + placement (no structural refactoring)
  - Tested with all 4 existing pages after modification
```

---

## 📅 Implementation Phases

---

### **Phase A: NavBar — `src/components/layout/NavBar.astro`** 🧭
> **Model:** `Gemini Pro` 🟠
> **Goal:** Build a minimal, bilingual navigation bar with logo and language links
> **Depends On:** Phase 1.2 ✅
> **⚠️  IMPORTANT:** All code must be committed to branch `feature/phase-1.4-global-ui`,
> NOT to `main`. Create the branch BEFORE writing any code.

#### What This Component Contains (Blueprint §2.1 — Simplified):

```text
┌─────────────────────────────────────────────────────────┐
│  NAVBAR (Sticky Top — transparent → white on scroll)     │
│                                                          │
│  ┌──────────┬──────────────────────┬──────────────┐     │
│  │  LOGO    │     NAV LINKS        │  LANG SWITCH │     │
│  │          │                      │              │     │
│  │  💿      │  الرئيسية  المقالات  │  [AR] [EN]   │     │
│  │  Dr.Hard │  تواصل    عن        │              │     │
│  │  Disk    │                      │              │     │
│  └──────────┴──────────────────────┴──────────────┘     │
│                                                          │
│  Mobile: Logo + Language Switch visible                  │
│          Hamburger → toggles nav links visibility        │
│          CSS-only (:checked pseudo-class)                │
└─────────────────────────────────────────────────────────┘
```

#### Implementation Details:

**Logo Section:**
- Emoji: `💿` (matching brand identity)
- Text: `brand.name` ("Dr. Hard Disk")
- Arabic sub-text: `brand.nameAr` ("د.هارد ديسك")
- Link: `/` (always points to Arabic homepage)
- No `<img>` — text-only logo with emoji

**Navigation Links (Arabic — Default RTL):**

| Label | Link | Notes |
|:------|:-----|:------|
| الرئيسية | `/` | Homepage |
| المقالات | `/posts/` | Future content (link exists now) |
| تواصل | `/contact/` | Contact page |
| عن Dr. Hard Disk | `/about/` | Future page (link exists now) |

**Navigation Links (English — LTR):**

| Label | Link | Notes |
|:------|:-----|:------|
| Home | `/en/` | English homepage |
| Articles | `/en/posts/` | Future content |
| Contact | `/contact/` | Same contact page |
| About | `/en/about/` | Future page |

**Language Switcher:**
- Two small outline links: `AR` and `EN`
- `AR` → `/` (Arabic homepage)
- `EN` → `/en/` (English homepage)
- Active language = filled/bold, inactive = outline
- Uses `lang` prop from BaseLayout to determine active state

**Props Interface:**
```ts
interface Props {
  lang?: "ar" | "en"; // default: "ar"
}
```

**Styling:**
- Position: `sticky top-0 z-50`
- Background: `transparent` → `bg-white/95 backdrop-blur-sm` on scroll (CSS-only using `@supports` or a tiny inline script)
- Shadow on scroll: `shadow-sm`
- Max-width container: `max-w-6xl mx-auto`
- All spacing: logical properties only
- Font: inherits from page (`Tajawal` for AR, `Inter` for EN)

**Mobile (< 768px):**
- Logo + language switch always visible
- Hamburger icon: CSS-only toggle using `<input type="checkbox">` + `:checked` sibling selector
- Nav links stack vertically when menu is open
- No JavaScript needed for basic toggle

#### Task Table:

| Execute | Review | Task |
| :---: | :---: | :--- |
| `[ ]` | `[ ]` | Create branch `feature/phase-1.4-global-ui` from `main` |
| `[ ]` | `[ ]` | Create `src/components/layout/NavBar.astro` with Props interface |
| `[ ]` | `[ ]` | Implement logo section with emoji + brand name (AR/EN) |
| `[ ]` | `[ ]` | Implement nav links (4 links, bilingual via `lang` prop) |
| `[ ]` | `[ ]` | Implement language switcher (AR/EN outline links) |
| `[ ]` | `[ ]` | Implement CSS-only mobile hamburger toggle |
| `[ ]` | `[ ]` | Verify: zero physical CSS properties (RTL scan) |
| `[ ]` | `[ ]` | Verify: zero sales CTAs or urgency language |

**🔄 Prompt for Phase A:**
```text
Context: Dr. Hard Disk — Astro v5 + Tailwind v4 + Cloudflare SSG.
Branch: feature/phase-1.4-global-ui (create from main FIRST).
Read: plans/04-global-ui.md Phase A.
Implement: src/components/layout/NavBar.astro

Rules:
- Import { brand } from location.ts — NO location data
- Props: { lang?: "ar" | "en" } — default "ar"
- Sticky top, transparent → white on scroll (minimal JS or CSS-only)
- 4 nav links (bilingual), logo with 💿 emoji, AR/EN switcher
- CSS-only hamburger on mobile — NO JS framework
- Logical CSS only (no margin-left, no padding-right)
- No Panic UI — no pulse, no urgency, no sales CTAs
- Do NOT modify BaseLayout yet (Phase D)

After implementation:
1. cmd /c pnpm astro check
2. Commit to feature/phase-1.4-global-ui branch
```

---

### **Phase B: Footer — `src/components/layout/Footer.astro`** 🦶
> **Model:** `Gemini Flash` 🟢
> **Goal:** Build a brand-only footer with social links and copyright
> **Depends On:** Phase A ✅

#### What This Component Contains (UX v3.2 §5.6 — Brand Zone Only):

```text
┌─────────────────────────────────────────────────────────┐
│  FOOTER (Dark theme — primary-900)                       │
│                                                          │
│  ┌─────────────── Brand Zone (permanent) ──────────────┐│
│  │                                                      ││
│  │  💿 Dr. Hard Disk                                    ││
│  │  د.هارد ديسك                                        ││
│  │                                                      ││
│  │  brand.tagline (bilingual)                           ││
│  │                                                      ││
│  │  [TikTok] [Instagram] [Facebook]                     ││
│  │                                                      ││
│  └──────────────────────────────────────────────────────┘│
│                                                          │
│  ── Copyright ──────────────────────────────────────────│
│  © 2026 Dr. Hard Disk. All rights reserved.             │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

#### Implementation Details:

**Brand Section:**
- Logo: `💿` emoji + `brand.name` ("Dr. Hard Disk")
- Arabic name: `brand.nameAr` ("د.هارد ديسك")
- Tagline: `brand.tagline.ar` / `brand.tagline.en` (depending on `lang` prop)
- Social media icons (text-based links, no SVGs in this phase):

| Platform | URL Source | Display |
|:---------|:-----------|:--------|
| TikTok | `currentLocation.socialMedia.tiktok` | TikTok |
| Snapchat | `currentLocation.socialMedia.snapchat` | Snapchat |
| Linktree | `currentLocation.socialMedia.linktree` | Linktree |

**Copyright:**
- Text: `© 2026 Dr. Hard Disk.` + bilingual "All rights reserved" / "جميع الحقوق محفوظة"
- Version display: `brand.version` (per constitution §Semantic Versioning)

**What This Footer Does NOT Have (deferred):**
- ❌ Local Zone (address, phone, map) — future phase
- ❌ Service category links — no content collections yet
- ❌ Legal page links (privacy, terms) — pages don't exist yet
- ❌ YouTube link — channel not launched yet

**Props Interface:**
```ts
interface Props {
  lang?: "ar" | "en"; // default: "ar"
}
```

**Styling (UX v3.2 Tokens):**

| Element | Value |
|:--------|:------|
| Background | `primary-900` (#021016) |
| Text color | `primary-200` (#B5D8E8) |
| Headings | `white` |
| Links hover | `white` with underline |
| Padding | `py-12` |
| Max-width | `max-w-6xl mx-auto` |

#### Task Table:

| Execute | Review | Task |
| :---: | :---: | :--- |
| `[ ]` | `[ ]` | Create `src/components/layout/Footer.astro` with Props interface |
| `[ ]` | `[ ]` | Implement brand section (logo, name, tagline) |
| `[ ]` | `[ ]` | Implement social media links (TikTok, Instagram, Facebook) |
| `[ ]` | `[ ]` | Implement copyright bar with year and version |
| `[ ]` | `[ ]` | Verify: zero location data (no address, phone, map) |
| `[ ]` | `[ ]` | Verify: zero physical CSS properties (RTL scan) |

**🔄 Prompt for Phase B:**
```text
Context: Dr. Hard Disk — Astro v5 + Tailwind v4.
Branch: feature/phase-1.4-global-ui (already exists from Phase A).
Read: plans/04-global-ui.md Phase B.
Implement: src/components/layout/Footer.astro

Rules:
- Import { brand } from location.ts — NO currentLocation data
- Props: { lang?: "ar" | "en" } — default "ar"
- Dark theme: bg primary-900, text primary-200
- Brand zone only: logo, tagline, social links, copyright
- NO Local Zone (no address, no phone, no map — deferred)
- Logical CSS only
- No Panic UI
- Do NOT modify BaseLayout yet (Phase D)

After implementation:
1. cmd /c pnpm astro check
2. Commit to feature/phase-1.4-global-ui branch
```

---
✏️ **Handoff A → B:**
```text
---
✅ Phase A: NavBar completed successfully.
📋 Summary: [fill after execution]

🔄 Next Phase: B — Footer
🤖 Model: `Gemini Flash` 🟢

📝 Next prompt: [see Phase B prompt above]
---
```

---

### **Phase C: FloatingWhatsApp — `src/components/ui/FloatingWhatsApp.astro`** 💬
> **Model:** `Gemini Pro` 🟠
> **Goal:** Build a quiet floating WhatsApp button that appears after hero scroll
> **Depends On:** Phase B ✅

#### What This Component Contains (TAD v4.2 §4.2):

```
┌──────────────────────────────────────────┐
│  FloatingWhatsApp                         │
│                                           │
│  Position: fixed, bottom-start            │
│  Size: 40px circle                        │
│  Color: #25D366 at 70% opacity            │
│  Icon: WhatsApp SVG (white, 20px)         │
│  Behavior: hidden → fade-in after hero    │
│  z-index: 40                              │
│  On click: wa.me/{whatsappUrl}?text=...   │
│                                           │
│  NO text, NO pulse, NO tooltip            │
│                                           │
└──────────────────────────────────────────┘
```

#### Implementation Details:

**Data Source:**
- WhatsApp URL: `currentLocation.contact.whatsappUrl` ("https://wa.me/966507322542")
- Pre-filled message: `encodeURIComponent('مرحباً، عندي استفسار عن استعادة البيانات')`
- This is the ONLY global component allowed to use `currentLocation`

**Visual Spec (TAD v4.2 §4.2):**

| Property | Value |
|:---------|:------|
| Position | `fixed` bottom-start (logical: `inset-block-end: 1rem; inset-inline-start: 1rem`) |
| Size | `w-10 h-10` (40px circle) |
| Shape | `rounded-full` |
| Color | `#25D366` at 70% opacity → 100% on hover |
| Icon | WhatsApp SVG path, white, 20px |
| z-index | `40` |
| Shadow | `shadow-lg` → `shadow-xl` on hover |
| Focus | `ring-2 ring-[#25D366] ring-offset-2` |

**Scroll Behavior (inline `<script>`):**
- Initially hidden: `opacity-0 translate-y-4`
- Uses `IntersectionObserver` to watch `[data-section="hero"]`
- When hero exits viewport → fade-in: `opacity-100 translate-y-0`
- When hero re-enters viewport → fade-out
- If no hero section exists → always visible
- Transition: `transition-all duration-300 ease-out`

**aria-label:**
- `"تواصل عبر واتساب"` (for accessibility)

#### Task Table:

| Execute | Review | Task |
| :---: | :---: | :--- |
| `[ ]` | `[ ]` | Create `src/components/ui/FloatingWhatsApp.astro` |
| `[ ]` | `[ ]` | Implement SVG WhatsApp icon (inline, white, 20px) |
| `[ ]` | `[ ]` | Implement IntersectionObserver script for hero fade-in |
| `[ ]` | `[ ]` | Use `currentLocation.contact.whatsappUrl` as href source |
| `[ ]` | `[ ]` | Verify: 40px circle, 70% opacity, no text, no pulse |
| `[ ]` | `[ ]` | Verify: logical CSS (inset-inline-start, not left) |
| `[ ]` | `[ ]` | Verify: accessible (aria-label, focus ring) |

**🔄 Prompt for Phase C:**
```
Context: Dr. Hard Disk — Astro v5 + Tailwind v4.
Branch: feature/phase-1.4-global-ui.
Read: plans/04-global-ui.md Phase C.
Implement: src/components/ui/FloatingWhatsApp.astro

Rules:
- Import { currentLocation } from location.ts — use currentLocation.contact.whatsappUrl
- Fixed position, bottom-start (logical: inset-inline-start, not left)
- 40px circle, #25D366/70%, WhatsApp SVG icon (white, 20px)
- IntersectionObserver on [data-section="hero"] — fade-in after hero
- If no hero → always visible
- NO text, NO pulse animation, NO tooltip
- aria-label: "تواصل عبر واتساب"
- Logical CSS only, No Panic UI
- Do NOT modify BaseLayout yet (Phase D)

After implementation:
1. cmd /c pnpm astro check
2. Commit to feature/phase-1.4-global-ui branch
```

---
✏️ **Handoff B → C:**
```
---
✅ Phase B: Footer completed successfully.
📋 Summary: [fill after execution]

🔄 Next Phase: C — FloatingWhatsApp
🤖 Model: `Gemini Pro` 🟠

📝 Next prompt: [see Phase C prompt above]
---
```

---

### **Phase D: BaseLayout Integration + Build Verify** 🔗
> **Model:** `Gemini Pro` 🟠
> **Goal:** Integrate all 3 components into BaseLayout and verify all existing pages
> **Depends On:** Phases A, B, C ✅

#### ⚠️ Modifying a Phase 1.2 File

`src/layouts/BaseLayout.astro` was created in Phase 1.2. This phase requires
adding 3 imports and placing the components in the layout. Changes are
strictly limited to:
1. Import statements (3 new imports)
2. Component placement (NavBar before `<main>`, Footer after `<main>`, FloatingWhatsApp before `</body>`)
3. **No other changes** to BaseLayout's structure, SEO logic, or existing props

#### Changes to BaseLayout.astro:

```diff
 ---
 import { brand } from "../config/location";
+import NavBar from "../components/layout/NavBar.astro";
+import Footer from "../components/layout/Footer.astro";
+import FloatingWhatsApp from "../components/ui/FloatingWhatsApp.astro";
 // ... existing code unchanged ...
 ---

 <html lang={lang} dir={dir}>
   <head>
     <!-- existing head unchanged -->
   </head>
   <body>
+    <NavBar lang={lang} />
     <main>
       <slot />
     </main>
+    <Footer lang={lang} />
+    <FloatingWhatsApp />
   </body>
 </html>
```

#### Quality Gates:

| Execute | Review | Gate |
| :---: | :---: | :--- |
| `[ ]` | `[ ]` | Add 3 imports to BaseLayout.astro |
| `[ ]` | `[ ]` | Place NavBar before `<main>` |
| `[ ]` | `[ ]` | Place Footer after `<main>` |
| `[ ]` | `[ ]` | Place FloatingWhatsApp before `</body>` |
| `[ ]` | `[ ]` | `pnpm astro check` — 0 errors |
| `[ ]` | `[ ]` | `pnpm build` — exit code 0 |
| `[ ]` | `[ ]` | All 4 existing pages render with NavBar + Footer |
| `[ ]` | `[ ]` | FloatingWhatsApp appears after scrolling past hero |
| `[ ]` | `[ ]` | Arabic pages: RTL layout, Tajawal font, correct direction |
| `[ ]` | `[ ]` | English pages: LTR layout, Inter font, correct direction |
| `[ ]` | `[ ]` | Language switcher navigates correctly (/ ↔ /en/) |

**🔄 Prompt for Phase D:**
```
Context: Dr. Hard Disk — Astro v5 + Tailwind v4.
Branch: feature/phase-1.4-global-ui.
Read: plans/04-global-ui.md Phase D.
Task: Integrate NavBar, Footer, and FloatingWhatsApp into BaseLayout.astro.

Rules:
- ONLY add imports and component placement — do not change existing BaseLayout logic
- NavBar receives lang prop from BaseLayout
- Footer receives lang prop from BaseLayout
- FloatingWhatsApp has no props (reads from location.ts internally)
- Test ALL 4 existing pages:
  1. src/pages/index.astro (Arabic homepage)
  2. src/pages/en/index.astro (English homepage)
  3. src/pages/contact.astro (Contact page)
  4. src/pages/404.astro (404 page)

After integration:
1. cmd /c pnpm astro check
2. cmd /c pnpm build
3. Commit to feature/phase-1.4-global-ui branch
```

---
✏️ **Handoff C → D:**
```
---
✅ Phase C: FloatingWhatsApp completed successfully.
📋 Summary: [fill after execution]

🔄 Next Phase: D — BaseLayout Integration + Build Verify
🤖 Model: `Gemini Pro` 🟠

📝 Next prompt: [see Phase D prompt above]
---
```

---

### **Phase E: CodeRabbit Review** 🐰
> **Model:** `Gemini Pro` 🟠
> **Goal:** Push branch, open PR, get CodeRabbit review, fix any issues
> **Depends On:** Phase D ✅

#### Workflow:

1. **Ensure all changes are committed** to `feature/phase-1.4-global-ui`
2. **Push the branch:**
   ```
   cmd /c git push origin feature/phase-1.4-global-ui
   ```
3. **Open Pull Request** from `feature/phase-1.4-global-ui` → `main`
   - Title: `Phase 1.4: Global UI (NavBar + Footer + FloatingWhatsApp)`
   - Description: List the 3 new files + BaseLayout modification
4. **Wait for CodeRabbit review** to complete
5. **Read all comments** via browser agent or GitHub MCP
6. **Evaluate and fix:**

#### Pass/Fail Criteria:

| CodeRabbit Severity | Action |
|:--------------------|:-------|
| **Critical** | 🛑 STOP. Fix immediately. Re-push. Re-review. |
| **Warning** | ⚠️ Evaluate. Fix if valid. Document if intentional. |
| **Nitpick** | 📝 Document in report. Fix only if trivial. Continue. |

#### Report:

After CodeRabbit completes review, create:

`reports/02-coderabbit-phase-1.4.md`

With the following structure:
```markdown
# CodeRabbit Review — Phase 1.4: Global UI
> Date: YYYY-MM-DD
> PR: #X
> Branch: feature/phase-1.4-global-ui
> Commit: [hash]

## Summary
- Total comments: X
- Critical: X
- Warnings: X
- Nitpicks: X

## Details
| # | Severity | File | Comment | Action Taken |
|---|----------|------|---------|--------------|
| 1 | ... | ... | ... | ... |

## Status: [PASSED / FAILED — FIXING]
```

#### Task Table:

| Execute | Review | Task |
| :---: | :---: | :--- |
| `[ ]` | `[ ]` | Push `feature/phase-1.4-global-ui` to origin |
| `[ ]` | `[ ]` | Open PR `feature/phase-1.4-global-ui` → `main` |
| `[ ]` | `[ ]` | Wait for CodeRabbit review to complete |
| `[ ]` | `[ ]` | Read all CodeRabbit comments |
| `[ ]` | `[ ]` | Fix any Critical issues and re-push |
| `[ ]` | `[ ]` | Document all feedback in `reports/02-coderabbit-phase-1.4.md` |
| `[ ]` | `[ ]` | Final approval from developer |

**🔄 Prompt for Phase E:**
```
Context: Dr. Hard Disk — Phase 1.4 Global UI.
Branch: feature/phase-1.4-global-ui (should be pushed already).
Read: plans/04-global-ui.md Phase E.

Task:
1. Open PR from feature/phase-1.4-global-ui → main
   Title: "Phase 1.4: Global UI (NavBar + Footer + FloatingWhatsApp)"
2. Wait for CodeRabbit review
3. Read all comments using browser agent
4. Fix Critical issues immediately
5. Create reports/02-coderabbit-phase-1.4.md with full report
6. If all Critical fixed → request developer approval to merge
```

---
✏️ **Handoff D → E:**
```
---
✅ Phase D: BaseLayout Integration completed successfully.
📋 Summary: [fill after execution]

🔄 Next Phase: E — CodeRabbit Review
🤖 Model: `Gemini Pro` 🟠

📝 Next prompt: [see Phase E prompt above]
---
```

---

## ⚠️ Failure Protocol

### If build fails:
1. 🛑 Stop immediately
2. 📝 Document error message
3. Check if error is in new component or in BaseLayout integration
4. Fix only the failing component — do not touch other Phase 1.4 files
5. If Phase 1.2 file (other than BaseLayout) needs modification → stop and report to developer

### If CodeRabbit raises Critical:
1. 🛑 Stop PR merge
2. 📝 Read the Critical comment fully
3. Fix the issue in the component file
4. Commit and push to same branch
5. Wait for CodeRabbit re-review
6. Repeat until zero Critical issues

---

## 📊 Model & Phase Summary

| Phase | Description | Model | Files |
|:------|:------------|:------|:------|
| A | NavBar | 🟠 Gemini Pro | `src/components/layout/NavBar.astro` |
| B | Footer | 🟢 Gemini Flash | `src/components/layout/Footer.astro` |
| C | FloatingWhatsApp | 🟠 Gemini Pro | `src/components/ui/FloatingWhatsApp.astro` |
| D | Integration + Verify | 🟠 Gemini Pro | `src/layouts/BaseLayout.astro` (MODIFY) |
| E | CodeRabbit Review | 🟠 Gemini Pro | `reports/02-coderabbit-phase-1.4.md` (NEW) |

**Total new files:** 4 (3 components + 1 report)
**Total modified files:** 1 (`BaseLayout.astro` — Phase 1.2 file, documented)

---

## 📚 References

| File | Section | Used For |
|:-----|:--------|:---------|
| `09_Homepage_Site_Blueprint.md` | §2.1, §2.2, §2.3 | NavBar spec, floating button, footer layout |
| `04_DrHardDisk_UX_v3.2.md` | §5.6 | Footer visual spec, Brand Zone / Local Zone |
| `05_DrHardDisk_TAD_v4.2.md` | §4.2, §4.10 | FloatingWhatsApp code, Footer/LocalLayer |
| `master-constitution.md` | Brand/Location rules | No Panic UI, RTL-First, Brand ≠ Location |
| `src/config/location.ts` | — | Brand + currentLocation data source |
| `src/layouts/BaseLayout.astro` | — | Root layout (target for integration) |
| `plans/03-page-templates.md` | — | Previous phase format reference |
