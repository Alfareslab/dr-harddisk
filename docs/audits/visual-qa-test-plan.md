# Visual QA Test Plan — Datacodex

> **Purpose:** Browser-based visual audit from a real customer's perspective
> **Executor:** Gemini (via Browser Agent — screenshots + analysis)
> **Authored by:** Claude Opus (Planning)
> **Date:** 2026-02-22
> **Site URL:** `http://localhost:4321`

---

## Test Objectives

Verify the site visually matches specifications and delivers a polished, professional experience. Specifically check for:

- Text overlapping or clipping
- Broken layouts or misaligned elements
- RTL/LTR direction issues
- Responsive design breakpoints (Desktop → Mobile)
- Navigation and language switching behavior
- Component rendering (cards, filters, buttons, GentleNote)
- Color consistency and typography hierarchy
- Interactive elements (hover states, click targets)

---

## Test Rounds

### Round 1: Arabic Homepage (`/`)

**URLs:** `http://localhost:4321/`
**Viewports:** Desktop (1440×900), Mobile (375×812)

**Checklist:**
- [ ] Page loads without console errors
- [ ] Text direction is RTL — all Arabic text flows right-to-left
- [ ] Hero section: `h1` ("إيه مشكلة جهازك؟") is centered, readable, no overlap
- [ ] Hero subtitle references brand name correctly
- [ ] Category cards grid: 2 columns on mobile, 4 on desktop
- [ ] Each card has emoji, Arabic name, English sub-name — no text clipping
- [ ] The green "محتاج مساعدة؟" card is visually distinct
- [ ] **Latest Articles section:** Shows exactly 3 article cards (not a placeholder)
- [ ] Article cards have image, title, description — no overflow or truncation issues
- [ ] "عرض جميع المقالات ←" button is visible and styled
- [ ] Success Stories section: "Content coming soon" placeholder is acceptable
- [ ] About section: Dark gradient background, white text, readable
- [ ] Certification badges (PC-3000, MRT Ultra, Clean Room) render correctly
- [ ] NavBar: Logo/brand visible, links work, language toggle (AR/EN) present
- [ ] Footer: Renders with social links, copyright text
- [ ] FloatingWhatsApp: Appears after scrolling down

**Screenshots to capture:**
1. Full page — desktop viewport (scroll to capture all sections)
2. Full page — mobile viewport
3. NavBar close-up (desktop)
4. Category cards grid (desktop)
5. Latest Articles section close-up

---

### Round 2: English Homepage (`/en/`)

**URLs:** `http://localhost:4321/en/`
**Viewports:** Desktop (1440×900), Mobile (375×812)

**Checklist:**
- [ ] Page loads without console errors
- [ ] Text direction is LTR
- [ ] Hero section: `h1` ("What's wrong with your device?") centered, readable
- [ ] Category cards have English names and subtitles
- [ ] **Latest Articles section:** Shows up to 3 English article cards (not placeholder)
- [ ] "View All Articles →" button is visible
- [ ] About section: English text, no Arabic mixing
- [ ] NavBar: Language toggle shows EN as active (highlighted), AR as inactive
- [ ] All text is purely English — no Arabic characters leaking
- [ ] Footer: Same design as Arabic, LTR direction

**Screenshots to capture:**
1. Full page — desktop
2. Full page — mobile
3. Language toggle close-up showing EN active

---

### Round 3: Article Listing Pages (`/posts/` & `/en/posts/`)

**URLs:**
- `http://localhost:4321/posts/`
- `http://localhost:4321/en/posts/`

**Viewports:** Desktop (1440×900), Mobile (375×812)

**Checklist:**
- [ ] Arabic listing: Header "المقالات المعرفية" is centered, readable
- [ ] English listing: Header "Knowledge Base" is centered, readable
- [ ] Category filter buttons are visible and horizontally aligned
- [ ] Article cards grid: 1 column on mobile, 2 on tablet, 3 on desktop
- [ ] Each card shows: hero image (or placeholder SVG), title, description, category badge
- [ ] No text overflow or clipping on any card
- [ ] Cards have consistent height and spacing
- [ ] Clicking a category filter button visually filters the cards (test with "hdd" or "flash")
- [ ] Arabic cards: Text direction is RTL
- [ ] English cards: Text direction is LTR

**Screenshots to capture:**
1. Arabic listing — desktop (full page)
2. English listing — desktop (full page)
3. Arabic listing — mobile
4. Category filter buttons close-up
5. After clicking a filter — filtered state

---

### Round 4: Individual Article Pages (Arabic + English)

**URLs:**
- `http://localhost:4321/posts/hdd-clicking-sound` (Arabic article)
- `http://localhost:4321/en/posts/en-hdd-clicking-sound` (English twin)

**Viewports:** Desktop (1440×900), Mobile (375×812)

**Checklist:**
- [ ] Arabic article: RTL direction, text flows correctly
- [ ] English article: LTR direction
- [ ] Article header: Title is large, centered, readable
- [ ] Meta badges (category + difficulty) render with correct colors
- [ ] Date is formatted correctly (Arabic: "٢٢ فبراير ٢٠٢٦", English: "February 22, 2026")
- [ ] Hero image renders (either actual image or placeholder SVG)
- [ ] Article body: Prose typography is clean — headings, paragraphs, lists
- [ ] Blockquotes (e.g., GentleNote or important warnings) are visually distinct
- [ ] Bold text, inline code, and links render correctly
- [ ] No text overlapping or clipping anywhere in the article body
- [ ] **Language switcher test:** On the Arabic article, click "EN" → should navigate to the English twin (NOT the homepage)
- [ ] **Language switcher test (reverse):** On the English article, click "AR" → should navigate to the Arabic twin
- [ ] Mobile: Article is readable, no horizontal scrolling needed

**Screenshots to capture:**
1. Arabic article header — desktop
2. Arabic article body (first two sections) — desktop
3. English article header — desktop
4. Mobile article view
5. Language switcher state on the article page

---

### Round 5: Contact Page (`/contact/`)

**URL:** `http://localhost:4321/contact/`
**Viewports:** Desktop (1440×900), Mobile (375×812)

**Checklist:**
- [ ] Page title "تواصل مع Datacodex" is centered and readable
- [ ] WhatsApp button: Green background, large, centered, clickable appearance
- [ ] Emergency note (الحالات الطارئة) is visible below the button
- [ ] Location section: Lab name, address, postal code render correctly
- [ ] Google Maps link button is styled and visible
- [ ] GentleNote component renders at the bottom
- [ ] RTL direction throughout the page
- [ ] Mobile: All elements stack vertically without overlap

**Screenshots to capture:**
1. Full page — desktop
2. Full page — mobile
3. WhatsApp CTA button close-up

---

### Round 6: 404 Page & NavBar Navigation

**URLs:**
- `http://localhost:4321/this-page-does-not-exist` (trigger 404)
- Navigate via NavBar links

**Viewports:** Desktop (1440×900)

**Checklist:**
- [ ] 404 page: Animated disc emoji is visible and pulsing
- [ ] Title "الصفحة غير موجودة" + "Page Not Found" render correctly
- [ ] Two buttons visible: "الرئيسية (العربية)" and "Home (English)"
- [ ] Clicking "الرئيسية" goes to `/`
- [ ] Clicking "Home (English)" goes to `/en/`
- [ ] **NavBar navigation test:** From homepage, click "المقالات" → goes to `/posts/`
- [ ] **NavBar navigation test:** Click language toggle to EN → page changes to English context
- [ ] **Mobile hamburger menu:** On mobile viewport, hamburger icon appears, menu opens on click

**Screenshots to capture:**
1. 404 page — desktop
2. Mobile hamburger menu open state

---

## Report Format

After executing all rounds, generate a report with the following structure:

```markdown
# Visual QA Report — Datacodex
## Date: [date]
## Summary: [PASS / FAIL / PARTIAL]
## Issues Found: [count]

### Round 1: Arabic Homepage
- Status: [PASS/FAIL]
- Issues: [list each issue with screenshot reference]

### Round 2: English Homepage
...

### Critical Issues (Must Fix)
[Text overlap, broken layout, navigation failures]

### Minor Issues (Nice to Fix)
[Spacing inconsistencies, color mismatches, minor alignment]

### Suggestions (Optional Improvements)
[Design polish, accessibility, UX enhancements]
```

---

## Pre-requisites

Before running the tests, the dev server must be started:

```bash
cd f:\Myprojects\Datacodex
npm run dev
```

The server should be running on `http://localhost:4321`.
