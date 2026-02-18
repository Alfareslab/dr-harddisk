

# Dr. Hard Disk — Design System Document v3.2

> **Project Name:** Dr. Hard Disk
> **Document Type:** UX/UI Design System & Specifications
> **Status:** مسودة للاعتماد
> **Theme Base:** AstroWind (Tailwind CSS)
> **Language Architecture:** Arabic (RTL) + English (LTR) — Standard Mirroring
> **Last Updated:** 2026-02-17

---

## Changelog

### v3.1 → v3.2

| Section | Change | Rationale |
|:---|:---|:---|
| **§1 Philosophy** | Added "Knowledge Encyclopedia" philosophy with explicit prohibited/allowed lists | Alignment with 09_Homepage_Blueprint — site is an encyclopedia, not a storefront |
| **§2.1 (NEW)** | Added Navigation Bar specification | 09_Homepage_Blueprint requires defined nav structure |
| **§3 (NEW)** | Added Hero Cards Grid section | Replaces traditional hero — 8 interactive cards as entry points |
| **§4.1 PanicButton** | Split into two components: Floating WhatsApp Button + PanicButton Component | Clear separation: quiet global button vs. emergency MDX component |
| **§4.3 (REPLACED)** | CallToAction → GentleNote | Knowledge-first tone: "لو محتاج مساعدة..." instead of "اتصل الآن!" |
| **§4.7 (NEW)** | Added Reels Strip ("من المختبر مباشرة") | Social media integration on homepage |
| **§4.8 (NEW)** | Added Success Stories Section | Homepage section for real lab cases |
| **§4.9 (NEW)** | Added About page image constraints | No personal photos — mascot/equipment only |
| **§4.6 Behavior** | Updated component table: CallToAction → GentleNote, PanicButton split | Reflects new component architecture |

### v2 → v3 (preserved)

| Section | Change | Rationale |
|:---|:---|:---|
| **§1 Philosophy** | Added portable brand context from Vision v2.0 | UX must serve a brand that moves between locations |
| **§3.1 Fonts** | Changed `font-display: swap` → `font-display: optional` | Risk S-3: eliminates CLS from Arabic font loading |
| **§3.1 Fonts** | Added fallback font adjustments (`size-adjust`, `ascent-override`) | Risk S-3: ensures zero CLS even on first visit |
| **§4 PanicButton** | Changed `tel:` → `wa.me` + updated labels | PRD v3 FR-P2: WhatsApp is primary CTA, not phone |
| **§4 (NEW)** | Added WarningBox component spec | Risk S-7 + PRD FR-K4: Anti-DIY warning for dangerous content |
| **§4 (NEW)** | Added ArticleDisclaimer component spec | Risk S-7 + PRD FR-K5: liability disclaimer on all articles |
| **§4 (NEW)** | Added Footer / Local Layer visual spec | PRD FR-LL1-7 + Risk B-1: atomic swappable location component |
| **§5 Config** | Added note on relationship with TAD (05) | Prevents config duplication/conflict |
| **§7 Performance** | Updated font strategy for `optional` | Consistency with §3.1 change |
| **§8 File Structure** | `articles/` → `posts/` | Alignment with TAD v3 and Content Plan (07) |

### v3 → v3.1 (preserved)

| Section | Change | Rationale |
|:---|:---|:---|
| **§4.1 PanicButton** | Added visibility rule: `difficulty: "critical"` | Per 05_TAD_v4.1 and 08_Content_Tool_Spec |
| **§4.2 WarningBox** | Updated trigger logic to `difficulty: "critical"` + `:::warning` marker | Per 08_Content_Tool_Spec Section 6 |
| **§4 (NEW)** | Added §4.6 Component Behavior Summary | Centralizes all auto-injection rules |
| **§5 Config** | Removed Keystatic reference | Keystatic is no longer part of the stack |
| **General** | Replaced `warningBox: true` with `difficulty` field | `showPanicButton`/`showWarning`/`warningBox` are deprecated |

### v1 → v2 (preserved)

| Section | Change | Rationale |
|:---|:---|:---|
| **§3 Typography** | Added full English "Inter" specification | Bilingual architecture |
| **§3.3** | Added line-height physics | Arabic/English have different vertical rhythm needs |
| **§3.4** | Added `[lang]` selector strategy | Automatic font/leading switching |
| **§5 Config** | Complete rewrite for bilingual | Single source of truth for design system |

---

## 1. فلسفة التصميم: "موسوعة معرفية.. وغرفة عمليات" {#philosophy}

> **v3.2 CHANGE:** Philosophy reframed from "operating room + library"
> to "knowledge encyclopedia + emergency room."
> Every design decision is measured by one question:
> **"هل هذا يساعد الزائر على الفهم، أم يحاول إقناعه بالشراء؟"**

The site must serve two visitor states:

1. **المذعور (Panic User):** Needs calm, controlled emergency guidance and
   colors that convey medical/engineering authority.
2. **الباحث (Knowledge Seeker):** Needs to read a 2000+ word article without
   eye strain (Deep Reading Comfort).

### 1.1 الممنوعات المطلقة (Non-Negotiable Prohibitions)

| # | Prohibited Element | Reason |
|:--|:---|:---|
| 1 | Buttons: "ابدأ فحص مجاني" / "احجز ميعاد" / "اتصل الآن" | Storefront language, not encyclopedia |
| 2 | Classic sales CTA (bright green, urgent tone) | Contradicts knowledge-first philosophy |
| 3 | Personal photos or personal names | Brand is Dr. Hard Disk, not an individual |
| 4 | Pulse animations or attention-grabbing effects on buttons | Creates anxiety, not trust |
| 5 | Language like "تعال عندنا" or "أفضل خدمة" | Marketing speak, not educational tone |

### 1.2 المسموحات (Allowed Elements)

| # | Allowed Element | Context |
|:--|:---|:---|
| 1 | "تعرف على المشكلة" / "اقرأ المزيد" / "لو محتاج مساعدة" | Knowledge-oriented CTAs |
| 2 | Quiet notes (light gray) with educational tone | GentleNote component |
| 3 | Caricature mascot or logo (no realistic photos) | Brand identity |
| 4 | Small quiet WhatsApp icon (not a button) | Floating contact, not a CTA |

### The Bilingual Dimension (v2)

These two personas exist across **two language surfaces**. The design system
must deliver identical emotional weight — authority, calm, readability —
regardless of whether the user is reading `dir="rtl"` Arabic or `dir="ltr"`
English. The visual "feel" must be the same; the typographic "physics"
must differ.

```
┌──────────────────────────────────────────────────────────┐
│                  SAME EMOTIONAL WEIGHT                    │
│                                                           │
│   ┌─── Arabic (RTL) ───┐    ┌─── English (LTR) ───┐    │
│   │  Tajawal 500        │    │  Inter 400            │    │
│   │  Leading: 1.8–2.0   │    │  Leading: 1.5–1.65    │    │
│   │  70ch max-width     │    │  65ch max-width       │    │
│   │  Heavier ink weight │    │  Standard ink weight   │    │
│   └─────────────────────┘    └────────────────────────┘   │
│                                                           │
│   Both → Same colors, same spacing rhythm, same          │
│          component architecture, same emotional tone.     │
└──────────────────────────────────────────────────────────┘
```

### The Portable Brand Dimension (v3)

The design system must also support the **portable brand model** (Vision v2.0).
This means:

- The Footer contains a **Local Layer** that is visually and structurally
  isolated — it can be swapped when the physical location changes.
- No design element outside the Local Layer should reference a specific
  physical location, business name, or address.
- The brand identity (colors, typography, logo, tone) belongs to
  Dr. Hard Disk permanently, regardless of which lab provides the service.

---

## 2. نظام الألوان (The Eye-Comfort Palette) {#colors}

> ⚠️ No changes from v2. The color system is language-agnostic and
> location-agnostic. Colors do not have a direction or an address.

### 🎨 The Winning Palette

We avoided pure black (`#000`) and pure white (`#FFF`) to reduce eye
strain (Halation Effect).

| Element | Hex Code | Semantic Name | Rationale |
|:---|:---|:---|:---|
| **Primary** | `#0B4F6C` | **Engineering Blue** | Deep blue conveying engineering trust |
| **Secondary** | `#5B6F82` | **Technical Slate** | For secondary text and UI elements |
| **Background** | `#F8F9FA` | **Medical White** | Off-white to reduce glare |
| **Text Body** | `#2D3A4A` | **Deep Ink** | Black alternative, `11.5:1` contrast (WCAG AAA) |
| **Accent (HDD)** | `#2B6F4B` | **Mechanical Green** | Color-codes Hard Disk articles |
| **Accent (SSD)** | `#B43E6F` | **Chip Magenta** | Color-codes Flash/SSD articles |
| **Accent (RAID)** | `#C96A2B` | **Server Amber** | Color-codes RAID/Server articles |
| **Warning** | `#F59E0B` | **Alert Amber** | For warnings (avoids alarming red) |

### Topic Color-Coding Usage (Language-Independent)

```html
<!-- Same markup works in both AR and EN — border-s adapts automatically -->
<article class="border-s-4 border-s-hdd bg-white rounded-lg p-5"
         dir="rtl" lang="ar">
  <span class="text-xs font-medium text-hdd bg-green-50 px-2 py-1 rounded">
    أقراص صلبة HDD
  </span>
</article>

<article class="border-s-4 border-s-ssd bg-white rounded-lg p-5"
         dir="ltr" lang="en">
  <span class="text-xs font-medium text-ssd bg-pink-50 px-2 py-1 rounded">
    SSD / Flash Memory
  </span>
</article>
```

### Full Color Tokens

```javascript
// For reference — implementation in §5 Config
colors: {
  primary: {
    DEFAULT: '#0B4F6C',
    50:  '#F0F7FA',
    100: '#E1EFF5',
    200: '#B5D8E8',
    300: '#89C1DB',
    400: '#4A9BC2',
    500: '#0B4F6C',
    600: '#093F56',
    700: '#062F41',
    800: '#04202B',
    900: '#021016',
  },
  hdd:       '#2B6F4B',
  ssd:       '#B43E6F',
  raid:      '#C96A2B',
  'hdd-bg':  '#ECFDF5',
  'ssd-bg':  '#FDF2F8',
  'raid-bg': '#FFFBEB',
  page:      '#F8F9FA',
  ink:       '#2D3A4A',
  'ink-muted':  '#5B6F82',
  'ink-subtle': '#94A3B8',
  warning:   { DEFAULT: '#F59E0B', bg: '#FFFBEB', border: '#FDE68A', text: '#92400E' },
  danger:    { DEFAULT: '#DC2626', bg: '#FEF2F2', border: '#FECACA', text: '#991B1B' },
  info:      { DEFAULT: '#2563EB', bg: '#EFF6FF', border: '#BFDBFE', text: '#1E40AF' },
  success:   { DEFAULT: '#16A34A', bg: '#F0FDF4', border: '#BBF7D0', text: '#166534' },
  emergency: { DEFAULT: '#C93B3B', hover: '#A83232', light: '#FEF2F2' },
}
```

---

### 2.1 Navigation Bar (القائمة العلوية) — NEW v3.2

**الموضع:** ثابتة أعلى الصفحة (Sticky, z-index: 50)
**الخلفية:** شفافة تتحول لبيضاء (#FFFFFF) عند السكرول
**Shadow:** يظهر فقط بعد السكرول (0 2px 8px rgba(0,0,0,0.08))

**الترتيب (RTL):**

```
┌──────────────────────────────────────────────────────────────────┐
│                         NAVIGATION BAR                            │
│                                                                   │
│  ┌── Right (RTL) ──┐   ┌───── Center ─────┐   ┌── Left ──┐     │
│  │ Dr. Hard Disk    │   │ الرئيسية          │   │ 📱 (WA)  │     │
│  │ د.هارد ديسك  │   │ المقالات          │   │ [EN]     │     │
│  │ → clickable /    │   │ قصص النجاح        │   │          │     │
│  │                  │   │ عن Dr. Hard Disk  │   │          │     │
│  │                  │   │ تواصل             │   │          │     │
│  └──────────────────┘   └──────────────────┘   └──────────┘     │
│                                                                   │
│  Transition: background transparent → white on scroll             │
│  Shadow: none → 0 2px 8px rgba(0,0,0,0.08) on scroll            │
└──────────────────────────────────────────────────────────────────┘
```

**يمين (RTL):**
- اللوجو: "Dr. Hard Disk" + أيقونة صغيرة
- تحته بخط أصغر: "د.هارد ديسك"
- Clickable → الرئيسية

**وسط:**
الروابط (بهذا الترتيب بالضبط):
1. الرئيسية → /
2. المقالات → /posts/
3. قصص النجاح → /cases/
4. عن Dr. Hard Disk → /about/
5. تواصل → /contact/

**يسار (RTL):**
- أيقونة واتساب صغيرة (رمادية تتحول خضراء عند hover)
- زر تبديل اللغة: "EN" (outline, صغير)

**Mobile:** Hamburger menu (الأيقونات تبقى ظاهرة)

**Styling Tokens:**

| Element | Value |
|:---|:---|
| Height | 64px desktop / 56px mobile |
| Background (initial) | transparent |
| Background (scrolled) | #FFFFFF |
| Shadow (scrolled) | 0 2px 8px rgba(0,0,0,0.08) |
| Logo font | font-heading, 700, 1.25rem |
| Logo subtitle | font-sans, 400, 0.75rem, ink-muted |
| Nav links | font-sans, 500, 0.875rem, ink |
| Nav links hover | primary, underline offset 4px |
| Active link | primary, font-bold |
| WA icon (idle) | ink-subtle |
| WA icon (hover) | #25D366 |
| Language button | border ink-subtle, 0.75rem, rounded-badge |
| z-index | 50 |
| Transition | all 300ms ease |

---

## 3. الصفحة الرئيسية — قسم Hero {#hero} — NEW v3.2

### 3.1 Hero Cards Grid (بدلاً من Hero التقليدي)

**المفهوم:**
الصفحة الرئيسية تبدأ بشبكة كروت تفاعلية (8 كروت) بدلاً من hero صورة+نص تقليدي. كل كارت يمثل نوع جهاز أو نقطة دخول.

**العنوان فوق الكروت:**
- H1: "إيه مشكلة جهازك؟"
- نص توضيحي: "Dr. Hard Disk — موسوعتك التقنية لفهم مشاكل التخزين واستعادة البيانات"

**التخطيط:**

```
┌──────────────────────────────────────────────────────────────────┐
│                     HERO CARDS GRID                                │
│                                                                   │
│  H1: "إيه مشكلة جهازك؟"                                         │
│  Subtitle: "Dr. Hard Disk — موسوعتك التقنية..."                  │
│                                                                   │
│  Desktop (4×2):                                                   │
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐                                │
│  │ HDD │ │ SSD │ │NVMe │ │ SD  │                                │
│  └─────┘ └─────┘ └─────┘ └─────┘                                │
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────────┐                            │
│  │ USB │ │ DVR │ │RAID │ │محتاج    │                            │
│  │     │ │     │ │     │ │مساعدة؟  │                            │
│  └─────┘ └─────┘ └─────┘ └─────────┘                            │
│                                                                   │
│  Tablet (2×4) | Mobile (2×4 or horizontal scroll)                │
└──────────────────────────────────────────────────────────────────┘
```

**مواصفات كل كارت:**

| Property | Value |
|:---|:---|
| Aspect Ratio | 1:1 (square) |
| Content | Image/Icon + Arabic text + smaller English text below |
| Clickable | Entire card (no internal button) |
| Background | #FFFFFF |
| Border | 1px solid #E5E7EB (gray-200) |
| Border-radius | card (0.75rem) |
| Hover: scale | 1.05 |
| Hover: shadow | card-hover + shimmer effect (subtle) |
| Animation | stagger on page load (each card +50ms delay) |
| Transition | transform 300ms ease, box-shadow 300ms ease |

**الكروت السبعة:**

| # | Label (AR) | Label (EN) | Link |
|:--|:---|:---|:---|
| 1 | هارد ديسك | HDD | /posts/?category=hdd |
| 2 | SSD | SSD | /posts/?category=ssd |
| 3 | NVMe | NVMe | /posts/?category=ssd |
| 4 | كرت ذاكرة | SD Card | /posts/?category=flash |
| 5 | فلاش ميموري | USB | /posts/?category=flash |
| 6 | DVR | DVR | /posts/?category=dvr |
| 7 | سيرفر RAID | RAID Server | /posts/?category=raid |

**الكارت الثامن (تواصل):**

| Property | Value |
|:---|:---|
| Background | #F0FDF4 (green-50) instead of white |
| Text | "محتاج مساعدة متخصصة؟" |
| Icon | WhatsApp icon or Dr. Hard Disk caricature |
| Link | /contact/ (NOT direct WhatsApp link) |
| Border | 1px solid #BBF7D0 (green-200) |

**ملاحظة للمطور:** الصور AI-generated، مواصفاتها في ملف 09 قسم 13.

---

## 4. التايبوجرافي ثنائي اللغة (Bilingual Typography) {#typography}

### 4.1 The Dual-Font Pairing Strategy

#### Why Inter + Tajawal?

| Criterion | Inter ✅ | Roboto ❌ | Source Sans ❌ |
|:---|:---|:---|:---|
| x-height match with Tajawal | Near-identical | Slightly taller | Shorter |
| Geometric authority | Swiss-style precision | Humanist "friendly" | Too soft |
| Weight range overlap | 400–800 maps to Tajawal 400–700 | Acceptable | Limited |
| OpenType features | Tabular numbers, slashed zero | Basic | Basic |

#### The Decision

```
┌─────────────────────────────────────────────────────────┐
│  ARABIC (RTL)                                            │
│  ├── Headings:  Tajawal 700     (Bold, authoritative)   │
│  ├── Body:      Tajawal 500     (Medium, prevents fade)  │
│  ├── Captions:  Tajawal 400     (Regular, secondary)     │
│  └── Code:      IBM Plex Mono Arabic (fallback: mono)    │
│                                                          │
│  ENGLISH (LTR)                                           │
│  ├── Headings:  Inter 700       (Bold, matches Tajawal)  │
│  ├── Body:      Inter 400       (Regular — sufficient)   │
│  ├── Captions:  Inter 400       (Regular, secondary)     │
│  └── Code:      JetBrains Mono / IBM Plex Mono          │
└─────────────────────────────────────────────────────────┘

WHY different body weights?
─────────────────────────────
Tajawal at 400 appears "faded" on high-DPI screens — Arabic
letterforms have thinner strokes. 500 compensates.

Inter at 400 is already optically dense (high x-height).
500 would feel aggressive.

Result: BOTH languages feel equally "present."
```

#### Font Loading Strategy (v3 — CHANGED)

> **v3 CHANGE:** `font-display: swap` → `font-display: optional`
> **Reason:** Risk S-3 identifies that Tajawal with `swap` causes CLS scores
> of 0.2-0.4 on Arabic pages due to drastically different glyph metrics
> from system fallback fonts. `optional` eliminates CLS entirely.

**How `font-display: optional` works:**

```
First visit (font not cached):
─────────────────────────────
  Browser allows ~100ms for font to load.
  If loaded in time → uses custom font.
  If NOT loaded → uses fallback for THIS page load.
  Font is cached for next visit.
  CLS = ZERO (no swap ever happens).

Repeat visits (font cached):
─────────────────────────────
  Font loads instantly from cache.
  Custom font used immediately.
  CLS = ZERO.

On Cloudflare Edge (Jeddah/Riyadh PoP):
─────────────────────────────────────────
  Font files are cached on nearby edge nodes.
  Even first visits typically load within 100ms.
  Most users (local business traffic) are repeat visitors.
  Practical result: nearly everyone sees custom fonts.
```

**Fallback Font Adjustments:**

To minimize visual difference between fallback and custom font during
that rare first-visit scenario, we define adjusted fallback fonts:

```css
/* In global.css — fallback font metrics matching */

@font-face {
  font-family: 'Tajawal-fallback';
  src: local('Tahoma'), local('Arial');
  size-adjust: 94%;
  ascent-override: 105%;
  descent-override: 30%;
  line-gap-override: 0%;
}

@font-face {
  font-family: 'Inter-fallback';
  src: local('system-ui'), local('Segoe UI'), local('Arial');
  size-adjust: 107%;
  ascent-override: 90%;
  descent-override: 22%;
  line-gap-override: 0%;
}
```

**Font Installation:**

```bash
# Self-hosted via @fontsource (recommended for Astro)
npm install @fontsource-variable/inter
npm install @fontsource/tajawal
```

```css
/* src/styles/global.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Inter — Variable font */
@import '@fontsource-variable/inter';

/* Tajawal — Static weights */
@import '@fontsource/tajawal/400.css';
@import '@fontsource/tajawal/500.css';
@import '@fontsource/tajawal/700.css';
```

> **Note:** `@fontsource` defaults to `font-display: swap`. To override to
> `optional`, add custom `@font-face` declarations AFTER the imports that
> re-declare the same font-family with `font-display: optional`. The CSS
> cascade ensures the override takes effect. See TAD (05) for implementation.

### 4.2 The Language-Aware Font Stack

**The Core Problem:** Tailwind's `fontFamily` is a single stack. We need
different primary fonts based on `<html lang>`.

**The Solution:** CSS custom properties set by `[lang]` selectors at
`:root`, referenced in Tailwind's `fontFamily`.

```
<html lang="ar" dir="rtl">  →  --font-sans: "Tajawal", "Tajawal-fallback"...
                                --body-weight: 500
                                --body-leading: 1.8

<html lang="en" dir="ltr">  →  --font-sans: "Inter Variable", "Inter-fallback"...
                                --body-weight: 400
                                --body-leading: 1.6
```

Implemented via Tailwind's `addBase` plugin (see §6). The HTML `lang`
attribute is the single control switch.

### 4.3 The Physics of Line-Height {#line-height}

> No changes from v2. Rationale remains valid.

| Property | Arabic (RTL) | English (LTR) | Reasoning |
|:---|:---|:---|:---|
| Body line-height | `1.8` | `1.6` | Arabic dots need vertical headroom |
| Heading line-height | `1.4` | `1.3` | Tighter on short text is intentional |
| Body font-weight | `500` | `400` | Tajawal 400 fades; Inter 400 is strong |
| Max prose width | `70ch` | `65ch` | Arabic words are visually denser |
| Paragraph spacing | `1.5em` | `1.25em` | Proportional to leading |
| Letter-spacing | `normal` | `normal` (tight on headings) | Arabic cursive breaks with spacing |

### 4.4 Implementation: The `[lang]` Selector Approach {#lang-selectors}

> No changes from v2. See §6 Config for full implementation.

**The HTML Shell:**

```astro
---
// src/layouts/BaseLayout.astro
interface Props {
  lang?: 'ar' | 'en';
  title?: string;
}
const { lang = 'ar', title = 'Dr. Hard Disk' } = Astro.props;
const dir = lang === 'ar' ? 'rtl' : 'ltr';
---
<!DOCTYPE html>
<html lang={lang} dir={dir} class="scroll-smooth">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>{title}</title>
</head>
<body class="bg-page text-ink font-sans antialiased">
  <slot />
</body>
</html>
```

### 4.5 Quick Reference: Typography Classes

```
✅ USE (Language-Agnostic):
  font-sans          → Tajawal (AR) or Inter (EN) via CSS var
  font-heading       → Same
  text-ink           → Body text color
  text-primary       → Heading color
  prose prose-drhd   → Article typography (auto-adjusts per lang)

⚠️ AVOID:
  leading-loose      → Use prose instead
  leading-normal     → Use prose instead
  font-medium        → Correct for AR, too heavy for EN
  tracking-wide      → BREAKS Arabic cursive

✅ SAFE OVERRIDES:
  [lang="ar"]:leading-[1.8]    → Scoped to Arabic
  [lang="en"]:leading-[1.6]    → Scoped to English
  rtl:font-medium              → Weight only in RTL
```

---

## 5. المكونات الذكية (Smart Behaviors) {#components}

### 💬 5.1 Floating WhatsApp Button (زر عائم هادئ) — NEW v3.2

> **v3.2 CHANGE:** This replaces the old PanicButton floating behavior.
> The floating button is now a **quiet, non-intrusive** WhatsApp icon.
> The emergency PanicButton is now a **separate MDX component** (§5.2).

**الموضع:** الزاوية السفلية اليسرى (في RTL)
**الشكل:** دائرة صغيرة 40px — أيقونة واتساب فقط بدون نص
**اللون:** أخضر واتساب (#25D366) بشفافية 70%

**السلوك:**
- لا يظهر عند فتح الصفحة
- يظهر fade-in بعد ما الزائر يسكرول أول قسم (Hero)
- بدون pulse animation
- بدون tooltip أو نص مرافق
- عند hover: الشفافية تصبح 100%

**الرسالة عند الضغط:**
"مرحباً، عندي استفسار عن استعادة البيانات"

**Visual Spec:**

```
┌─────────────────────────────────────────────────────────┐
│  Floating WhatsApp Button                                │
│                                                          │
│                                          ┌────┐         │
│                                          │ 📱 │ ← 40px  │
│                                          └────┘         │
│                                                          │
│  Position: fixed, bottom-6, start-6 (left in RTL)       │
│  Size: 40×40px circle                                    │
│  Background: #25D366 at 70% opacity                     │
│  Hover: opacity 100% + slight scale(1.1)                │
│  Transition: opacity 200ms ease, transform 200ms ease   │
│  z-index: 40                                             │
│  NO pulse animation                                      │
│  NO text label                                           │
│  NO tooltip                                              │
│                                                          │
│  Visibility: hidden on load                              │
│  Appears: fade-in after user scrolls past Hero section   │
│  Animation: opacity 0→1 over 300ms ease-out              │
└─────────────────────────────────────────────────────────┘
```

**Styling Tokens:**

| Property | Value |
|:---|:---|
| Size | 40×40px |
| Border-radius | 50% (circle) |
| Background | #25D366 / opacity: 0.7 |
| Background (hover) | #25D366 / opacity: 1.0 |
| Shadow | 0 2px 8px rgba(0,0,0,0.15) |
| z-index | 40 |
| Position | fixed, bottom-6, start-6 |
| Transition | opacity 200ms ease, transform 200ms ease |

---

### 🚨 5.2 PanicButton Component (داخل المقالات الحرجة) — UPDATED v3.2

> **v3.2 CHANGE:** This is now a **separate MDX component**, not a floating button.
> It appears **only inside articles** with `difficulty: "critical"`.
> It is a full-width bar placed after the first H2.

**هذا مكون MDX منفصل تماماً عن الزر العائم.**

**متى يظهر:** تلقائياً في المقالات التي `difficulty: critical` بعد أول H2

**Visual Spec:**

```
┌─────────────────────────────────────────────────────────┐
│  PanicButton Component (inside critical articles)        │
│                                                          │
│  ┌─────────────────────────────────────────────────────┐│
│  │ ⚠️  هل تسمع صوت طقطقة الآن؟ افصل الجهاز فوراً.    ││
│  │                                                      ││
│  │  Dr. Hard Disk متخصص في الحالات الحرجة              ││
│  │                                                      ││
│  │  [💬 تواصل عبر واتساب]                              ││
│  └─────────────────────────────────────────────────────┘│
│                                                          │
│  Styling:                                                │
│  ├── Width: full-width bar (100% of content area)       │
│  ├── Background: gradient from #D1FAE5 → #A7F3D0       │
│  ├── Padding: 32px vertical                             │
│  ├── Border: none                                       │
│  ├── Shadow: 0 1px 3px rgba(0,0,0,0.06) (subtle)       │
│  ├── Border-radius: card (0.75rem)                      │
│  ├── Icon: ⚠️ (large, 24px)                             │
│  ├── Primary text: font-heading, 700, ink               │
│  ├── Secondary text: font-sans, 400, ink-muted          │
│  └── WhatsApp button: bg-success, white text, large     │
└─────────────────────────────────────────────────────────┘
```

**المحتوى:**
- أيقونة: ⚠️
- نص رئيسي (يتغير حسب المقال): "هل تسمع صوت طقطقة الآن؟ افصل الجهاز فوراً."
- نص ثانوي: "Dr. Hard Disk متخصص في الحالات الحرجة"
- زرار واتساب (كبير هنا — مسموح لأن السياق طوارئ)

**الفرق عن الزر العائم:**

| Property | Floating WhatsApp Button (§5.1) | PanicButton Component (§5.2) |
|:---|:---|:---|
| Scope | موجود في كل صفحات الموقع | في مقالات critical فقط |
| Size | صغير وهادئ (40px) | كبير وواضح (full-width bar) |
| Appearance | يظهر بعد سكرول | يظهر مباشرة بعد أول H2 |
| Type | UI element (global) | MDX component (per-article) |
| Animation | fade-in only | none |
| WhatsApp button | icon only | full button with text |

---

### ⚠️ 5.3 صندوق التحذير (WarningBox) — UPDATED v3.1

> **New component required by:** Risk S-7, PRD v3 FR-K4
> **Purpose:** Prominent warning at the top of articles covering dangerous
> procedures (freezer myth, DIY software, RAID rebuild, opening hard drive).
>
> **v3.1 — Visibility Rule (per 08_Content_Tool_Spec):**
> WarningBox appears in two scenarios:
> 1. **Auto-injected** at article start when `difficulty: "critical"`
> 2. At **marker position** when content contains `:::warning` marker
> Context: Posts only.

**Design Principle:** This box must be **impossible to miss**. A reader
who skims the article must see the warning before reading any procedure
description. It uses the `danger` color token — the ONLY place in the
entire site where we use red prominently.

**Visual Spec:**

```
┌─────────────────────────────────────────────────────────┐
│  Arabic Version:                                         │
│                                                          │
│  ┌─────────────────────────────────────────────────────┐ │
│  │ ⚠️ تحذير: لا تفعل هذا بنفسك                        │ │
│  │                                                      │ │
│  │ هذا المقال يشرح لماذا هذا الإجراء خطير على          │ │
│  │ بياناتك. لا تحاول تنفيذه — استشر متخصصًا.           │ │
│  └─────────────────────────────────────────────────────┘ │
│                                                          │
│  English Version:                                        │
│                                                          │
│  ┌─────────────────────────────────────────────────────┐ │
│  │ ⚠️ Warning: Do NOT attempt this yourself             │ │
│  │                                                      │ │
│  │ This article explains why this procedure is          │ │
│  │ dangerous to your data. Do not attempt it —          │ │
│  │ consult a specialist.                                │ │
│  └─────────────────────────────────────────────────────┘ │
│                                                          │
│  Styling:                                                │
│  ├── Background: danger-bg (#FEF2F2)                    │
│  ├── Border: border-s-4 border-danger (#DC2626)         │
│  ├── Icon: ⚠️ or 🚫 (text-danger)                       │
│  ├── Title: font-heading font-bold text-danger-text     │
│  ├── Body: text-danger-text text-sm                     │
│  ├── Border-radius: card (0.75rem) on end side          │
│  ├── Padding: p-4 sm:p-5                                │
│  └── Margin: mb-8 (space before article content)        │
└─────────────────────────────────────────────────────────┘
```

**Implementation:**

```astro
---
// src/components/article/WarningBox.astro
interface Props {
  lang?: 'ar' | 'en';
  title?: string;
  body?: string;
}
const { lang = 'ar' } = Astro.props;
const defaultTitle = lang === 'ar'
  ? '⚠️ تحذير: لا تفعل هذا بنفسك'
  : '⚠️ Warning: Do NOT attempt this yourself';
const defaultBody = lang === 'ar'
  ? 'هذا المقال يشرح لماذا هذا الإجراء خطير على بياناتك. لا تحاول تنفيذه — استشر متخصصًا.'
  : 'This article explains why this procedure is dangerous to your data. Do not attempt it — consult a specialist.';
const title = Astro.props.title || defaultTitle;
const body = Astro.props.body || defaultBody;
---
<aside
  role="alert"
  class="bg-danger-bg border-s-4 border-danger rounded-e-card p-4 sm:p-5 mb-8"
>
  <p class="font-heading font-bold text-danger-text text-base mb-1">
    {title}
  </p>
  <p class="text-danger-text text-sm leading-relaxed">
    {body}
  </p>
</aside>
```

**When to use (trigger = `difficulty: "critical"`):**

| Topic | `difficulty` Value | WarningBox? |
|:---|:---|:---|
| Freezer myth | `critical` | ✅ Auto-injected |
| DIY recovery software (Disk Drill, Recuva) | `critical` | ✅ Auto-injected |
| RAID rebuild on degraded array | `critical` | ✅ Auto-injected |
| Opening hard drive outside clean room | `critical` | ✅ Auto-injected |
| General troubleshooting (check cables, BIOS) | `simple` | ❌ No |
| Explaining what Head Crash means | `moderate` | ❌ No |

> Additionally, `:::warning` markers in the content body will render
> a WarningBox at the marker position, regardless of `difficulty` value.

---

### 📝 5.4 إخلاء المسؤولية (ArticleDisclaimer) — NEW v3

> **New component required by:** Risk S-7, PRD v3 FR-K5
> **Purpose:** Liability disclaimer at the bottom of every knowledge article.

**Design Principle:** Present but not aggressive. It should feel like a
professional footnote, not a legal wall. Uses `ink-muted` color — visible
but doesn't distract from the content.

**Visual Spec:**

```
┌─────────────────────────────────────────────────────────┐
│  Appears at the bottom of every knowledge article,      │
│  AFTER the content, BEFORE the footer.                  │
│                                                          │
│  ┌─────────────────────────────────────────────────────┐ │
│  │  ℹ️ هذا المحتوى تعليمي ولا يُغني عن استشارة       │ │
│  │  متخصص. أي إجراء تتخذه على مسؤوليتك الشخصية.      │ │
│  │  للحالات الحرجة، تواصل مع متخصص.                   │ │
│  └─────────────────────────────────────────────────────┘ │
│                                                          │
│  Styling:                                                │
│  ├── Background: transparent                            │
│  ├── Border-top: 1px border-primary-100                 │
│  ├── Text: text-ink-muted text-xs                       │
│  ├── Padding: pt-6 mt-10                                │
│  ├── Icon: ℹ️ inline                                    │
│  └── Max-width: same as prose (var(--prose-max-width))  │
└─────────────────────────────────────────────────────────┘
```

**Implementation:**

```astro
---
// src/components/article/ArticleDisclaimer.astro
const { lang = 'ar' } = Astro.props;
const text = lang === 'ar'
  ? 'ℹ️ هذا المحتوى تعليمي ولا يُغني عن استشارة متخصص. أي إجراء تتخذه بناءً على هذا المحتوى يكون على مسؤوليتك الشخصية. للحالات الحرجة، تواصل مع متخصص في استعادة البيانات.'
  : 'ℹ️ This content is educational and does not replace professional consultation. Any action you take based on this content is at your own risk. For critical cases, contact a data recovery specialist.';
---
<footer class="border-t border-primary-100 pt-6 mt-10 max-w-prose-drhd mx-auto">
  <p class="text-ink-muted text-xs leading-relaxed">
    {text}
  </p>
</footer>
```

---

### 💡 5.5 GentleNote Component (الملاحظة الهادئة) — NEW v3.2

> **v3.2 CHANGE:** This component **replaces CallToAction** entirely.
> Philosophy: instead of "اتصل الآن!" we use "لو محتاج مساعدة..."

**الفلسفة:** بدلاً من "اتصل الآن!" نستخدم نبرة معرفية هادئة: "لو محتاج مساعدة..."

**Visual Spec:**

```
┌─────────────────────────────────────────────────────────┐
│  GentleNote Component                                    │
│                                                          │
│  ┌─────────────────────────────────────────────────────┐ │
│  │ 💡 لو بتسمع صوت طقطقة دلوقتي، ما تحاولش تشغل    │ │
│  │    الهارد تاني. Dr. Hard Disk متخصص في             │ │
│  │    الحالات دي.                                      │ │
│  │                                                      │ │
│  │    تواصل عبر واتساب أو زورنا في [المكان].          │ │
│  └─────────────────────────────────────────────────────┘ │
│                                                          │
│  Styling:                                                │
│  ├── Background: #F9FAFB (gray-50)                      │
│  ├── Border: 1px solid #E5E7EB (gray-200)               │
│  ├── Border-radius: 8px                                 │
│  ├── Padding: 20px                                      │
│  ├── Icon: 💡 or ℹ️ (small, inline)                     │
│  ├── Text: ink, text-sm, leading-relaxed                │
│  ├── NOT prominent — blends with content                │
│  └── No bright colors, no urgency                       │
└─────────────────────────────────────────────────────────┘
```

**المحتوى:**
النص **يتغير تلقائياً** حسب `category` و `symptoms` من frontmatter المقال.

**أمثلة:**
- مقال عن clicking: "لو بتسمع صوت طقطقة دلوقتي، ما تحاولش تشغل الهارد تاني. Dr. Hard Disk متخصص في الحالات دي."
- مقال عن فورمات: "لو عملت فورمات بالغلط، ما تكتبش أي حاجة على القرص. Dr. Hard Disk يقدر يساعدك."
- مقال عام: "لو محتاج مساعدة متخصصة في استعادة البيانات، Dr. Hard Disk موجود."

**كل نص يُذيَّل بـ:**
"تواصل عبر واتساب أو زورنا في [المكان]."

**حيث [المكان] يُقرأ من `src/config/location.ts`**

**الموضع:** قبل آخر فقرة في كل مقال (بدلاً من CallToAction)

**Props:**

```typescript
interface GentleNoteProps {
  category: string;
  symptoms?: string[];
  location: LocationConfig; // from location.ts
}
```

**Behavior Rules:**

| Context | Appears? |
|:---|:---|
| Posts (all articles) | ✅ Yes |
| Services pages | ✅ Yes |
| Homepage | ❌ No |
| About page | ❌ No |
| Contact page | ❌ No |

---

### 🦶 5.6 Footer والطبقة المحلية (Footer & Local Layer) — NEW v3

> **New component required by:** PRD v3 FR-LL1-7, Risk B-1
> **Purpose:** Site footer with an **isolated, swappable local section**
> that can be updated in <1 hour when the physical location changes.

**Design Principle:** The footer has two visually distinct zones:

1. **Brand Zone (permanent):** Dr. Hard Disk logo, social media links,
   legal pages links, copyright. This NEVER changes.
2. **Local Zone (swappable):** Current location name, address, phone,
   map link. This is the only part that changes when Ahmad moves.

The Local Zone is visually separated to make its "swappability" obvious
to both the user and the developer.

**Visual Spec:**

```
┌─────────────────────────────────────────────────────────┐
│  FOOTER                                                  │
│                                                          │
│  ┌─────────────── Brand Zone (permanent) ──────────────┐│
│  │                                                      ││
│  │  [Dr. Hard Disk Logo]                                ││
│  │                                                      ││
│  │  الخدمات        المعرفة         القانونية            ││
│  │  ─────────     ─────────       ──────────            ││
│  │  HDD           المدونة         الخصوصية             ││
│  │  هارد خارجي     الحالات         الشروط               ││
│  │  RAID                                                ││
│  │  SSD                                                 ││
│  │  فلاش                                                ││
│  │                                                      ││
│  │  [YouTube] [TikTok] [Instagram] [Twitter]            ││
│  │                                                      ││
│  └──────────────────────────────────────────────────────┘│
│                                                          │
│  ┌─────────────── Local Zone (swappable) ──────────────┐│
│  │                                                      ││
│  │  📍 حاليًا نقدم خدماتنا في:                          ││
│  │  مركز الفارس لصيانة الكمبيوتر                       ││
│  │  شارع خالد بن الوليد، جدة                           ││
│  │  📞 966XXXXXXXXX                                     ││
│  │  🗺️ [رابط خرائط جوجل]                               ││
│  │                                                      ││
│  │  Background: primary-800 (darker than brand zone)    ││
│  │  Border-top: 1px border-primary-600                  ││
│  │  Text: white/primary-200                             ││
│  │  Subtle visual indicator of separateness             ││
│  │                                                      ││
│  └──────────────────────────────────────────────────────┘│
│                                                          │
│  ── Copyright ──────────────────────────────────────────│
│  © 2026 Dr. Hard Disk. جميع الحقوق محفوظة.             │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

**Styling Tokens:**

| Element | Value |
|:---|:---|
| Footer background (brand zone) | `primary-900` (#021016) |
| Footer background (local zone) | `primary-800` (#04202B) |
| Separator between zones | `border-t border-primary-600` |
| Footer text | `primary-200` (#B5D8E8) |
| Footer headings | `white` |
| Footer links hover | `white` with underline |
| Local zone label ("حاليًا نقدم خدماتنا في") | `primary-300` with ℹ️ icon |
| Padding | `py-12` (brand) / `py-6` (local) |

**Developer Note:**

```
<!-- ═══════════════════════════════════════════
     LOCAL LAYER — SWAPPABLE ZONE
     To change location:
     1. Update src/config/location.ts
     2. All Footer, Contact, and LocalPage
        components read from this single file.
     3. See LOCATION_MIGRATION.md for full steps.
     ═══════════════════════════════════════════ -->
```

---

### 📺 5.7 مكتبة الفيديو (Binge-Watch Layout)

> No changes from v2.

- **Layout:** Horizontal scroll carousels by topic (Netflix-style rows).
- **Killer Feature:** "Continue Watching" bar via `localStorage`.
- **Scroll direction:** `overflow-x-auto` adapts naturally for RTL.
- **Video embed:** Facade/Lazy Loading via `astro-embed` (no raw `<iframe>`).

---

### 📋 5.8 Component Behavior Rules — UPDATED v3.2

> **Source:** `08_Content_Tool_Spec_v1.md` — Section 6
> **Principle:** Components are **auto-injected** by the build pipeline.
> No manual `import` or JSX tags needed in MDX files.

| # | Component | Appears When | Position | Context |
|:--|:----------|:-------------|:---------|:--------|
| 1 | **Floating WhatsApp** | Always — all pages | Fixed bottom-start, after scroll | Global UI element |
| 2 | **PanicButton** | `difficulty: "critical"` | Full-width bar after first H2 | Posts only (critical) |
| 3 | **WarningBox** | `difficulty: "critical"` (auto at article start) OR `:::warning` marker in content (at marker position) | Top of article / marker position | Posts only |
| 4 | **GentleNote** | Always — every post and service | Before last paragraph | Posts + Services |
| 5 | **ArticleDisclaimer** | Always in posts, never in services | End of article | Posts only |
| 6 | **VideoEmbed** | `<<<VIDEO_ID: xxxxx>>>` marker in content | At marker location | Posts + Services |

> **Deprecated fields:** `showPanicButton`, `showWarning`, `warningBox`,
> and `panicLevel` are no longer used. All component visibility is now
> derived from the `difficulty` frontmatter field or content markers.
>
> **Deprecated components:** `CallToAction` is replaced by `GentleNote` in v3.2.

---

### 🎬 5.9 Reels Strip ("من المختبر مباشرة") — NEW v3.2

**الموقع:** قسم في الصفحة الرئيسية بين "أحدث المقالات" و "قصص النجاح"

**Visual Spec:**

```
┌──────────────────────────────────────────────────────────────────┐
│  REELS STRIP                                                      │
│                                                                   │
│  Background: #F1F5F9 (slate-100)                                 │
│  Padding: py-16                                                   │
│                                                                   │
│  H2: "من المختبر مباشرة"                                         │
│  Subtitle: "شاهد عمليات استعادة البيانات الحقيقية"                │
│                                                                   │
│  Desktop (4 reels in a row):                                      │
│  ┌───────┐ ┌───────┐ ┌───────┐ ┌───────┐                        │
│  │       │ │       │ │       │ │       │                        │
│  │  9:16 │ │  9:16 │ │  9:16 │ │  9:16 │                        │
│  │       │ │       │ │       │ │       │                        │
│  │ 👁 12K│ │ 👁 8K │ │ 👁 25K│ │ 👁 5K │                        │
│  └───────┘ └───────┘ └───────┘ └───────┘                        │
│                                                                   │
│  Mobile: horizontal scroll                                        │
│                                                                   │
│  "تابعنا:" [TikTok] [Instagram] [Facebook]                      │
└──────────────────────────────────────────────────────────────────┘
```

**الشكل:**
- خلفية: رمادي فاتح (#F1F5F9)
- عنوان: "من المختبر مباشرة"
- نص: "شاهد عمليات استعادة البيانات الحقيقية"

**المحتوى:**
- 3-4 مستطيلات عمودية (نسبة 9:16 — شكل ريلز)
- كل مستطيل: thumbnail من الفيديو + عدد المشاهدات
- Desktop: 4 ريلز في صف أفقي
- Mobile: horizontal scroll

**التفاعل:**
- عند الضغط: يفتح الفيديو على تيك توك/إنستاجرام (tab جديد)
- عند hover: overlay خفيف + أيقونة play

**Styling Tokens:**

| Element | Value |
|:---|:---|
| Section background | #F1F5F9 |
| Section padding | py-16 |
| Reel card width | 200px desktop / 160px mobile |
| Reel card aspect | 9:16 |
| Reel border-radius | card (0.75rem) |
| Reel shadow | card |
| Reel hover | card-hover + play overlay (bg-black/30) |
| Views badge | absolute bottom-2, bg-black/50, text-white, text-xs |
| Social icons | 24px, ink-muted, hover → brand color |

**أيقونات تحت القسم:**
"تابعنا:" + أيقونات (TikTok, Instagram, Facebook)

---

### 🏆 5.10 Success Stories Section — NEW v3.2

**الموقع:** قسم في الصفحة الرئيسية بعد قسم Reels

**Visual Spec:**

```
┌──────────────────────────────────────────────────────────────────┐
│  SUCCESS STORIES                                                  │
│                                                                   │
│  Background: white (#FFFFFF)                                      │
│  Padding: py-16                                                   │
│                                                                   │
│  H2: "قصص حقيقية من المختبر"                                     │
│  Subtitle: "كل حالة تحدي وكل نجاح بنتعلم منه"                    │
│                                                                   │
│  ┌───────────────┐ ┌───────────────┐ ┌───────────────┐           │
│  │ 💿 HDD        │ │ 🗄️ RAID       │ │ 💧 Water      │           │
│  │               │ │               │ │               │           │
│  │ هارد WD —     │ │ سيرفر HP —    │ │ لابتوب Dell — │           │
│  │ سقوط من متر   │ │ RAID 5 —      │ │ انسكاب ماء    │           │
│  │ ونصف          │ │ قرصين فشلوا   │ │               │           │
│  │               │ │               │ │               │           │
│  │ طقطقة ولا يعمل│ │ Array degraded│ │ لا يشتغل      │           │
│  │               │ │               │ │               │           │
│  │ ✅ نجاح 98%    │ │ ✅ نجاح 100%   │ │ 💪 تحدي 85%   │           │
│  │ صور عائلية    │ │ قاعدة بيانات  │ │ ملفات شركة    │           │
│  └───────────────┘ └───────────────┘ └───────────────┘           │
│                                                                   │
│  [كل قصص المختبر ←] → /cases/                                    │
└──────────────────────────────────────────────────────────────────┘
```

**الكروت (3 كروت أفقية):**
كل كارت يحتوي:
- أيقونة نوع الجهاز (💿 HDD / 🗄️ RAID / 💧 Water)
- عنوان القصة: "هارد WD — سقوط من متر ونصف"
- سطر المشكلة: "الهارد يصدر صوت طقطقة ولا يعمل نهائياً"
- سطر النتيجة: "تم استعادة 98% من البيانات — صور عائلية لـ 10 سنوات"
- Badge: "نجاح ✅" (أخضر) أو "تحدي 💪" (برتقالي)

**Styling Tokens:**

| Element | Value |
|:---|:---|
| Card background | white |
| Card border | 1px solid primary-100 |
| Card border-radius | card (0.75rem) |
| Card shadow | card |
| Card hover | card-hover |
| Badge (success) | bg-success-bg, text-success-text, rounded-badge |
| Badge (challenge) | bg-warning-bg, text-warning-text, rounded-badge |
| Device icon | 24px, centered |
| Story title | font-heading, 600, primary |
| Problem line | text-sm, ink-muted |
| Result line | text-sm, ink, font-medium |
| CTA button | text-primary, font-medium, hover underline |

**زرار في الأسفل:** "كل قصص المختبر ←" → /cases/

---

### 🖼️ 5.11 صفحة About — قيود الصور — NEW v3.2

**ممنوع:**

| # | Prohibited | Reason |
|:--|:---|:---|
| 1 | صور شخصية (للمؤسس أو أي شخص) | Brand is Dr. Hard Disk, not an individual |
| 2 | صور "behind the scenes" فيها أشخاص | Privacy + portable brand |
| 3 | استخدام الاسم الشخصي (المهندس أحمد) | Brand identity separation |

**مسموح:**

| # | Allowed | Usage |
|:--|:---|:---|
| 1 | كاريكاتير Dr. Hard Disk (AI-generated mascot) | Hero of About page |
| 2 | لوجو نصي أو رمزي | Header and identity sections |
| 3 | صور الأجهزة (PC-3000, MRT) بدون أشخاص | Equipment showcase |
| 4 | صور AI-generated للمعدات | Lab environment illustration |

**النبرة:**
"Dr. Hard Disk — خبرة أكثر من 8 سنوات"
(وليس "أنا أحمد، عندي خبرة...")

---

## 6. كود التنفيذ (Implementation Config) {#config}

> **Relationship with TAD (05):**
> This config defines the **design decisions** (colors, fonts, spacing, prose styles).
> TAD (05) defines the **build and deployment configuration** (Cloudflare settings,
> content collections config, wrangler.toml, compatibility flags).
> If both files define the same Tailwind config key, **this file (UX) is the
> source of truth for design values**. TAD may extend with build-specific settings.

### 6.1 Package Dependencies

```bash
npm install -D tailwindcss @tailwindcss/typography
npm install @fontsource-variable/inter
npm install @fontsource/tajawal
```

> **Note on logical properties:** Tailwind v3.3+ supports `ps-`, `pe-`, `ms-`,
> `me-`, `border-s-`, `border-e-`, `start-`, `end-` natively. No plugin needed.

### 6.2 Font Imports (Global CSS) — UPDATED v3

```css
/* src/styles/global.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* ═══════════════════════════════════════════════
   FONT IMPORTS
   ═══════════════════════════════════════════════ */
@import '@fontsource-variable/inter';
@import '@fontsource/tajawal/400.css';
@import '@fontsource/tajawal/500.css';
@import '@fontsource/tajawal/700.css';

/* ═══════════════════════════════════════════════
   FALLBACK FONT METRICS (v3 — Risk S-3 fix)
   These ensure near-zero visual shift if the
   custom font doesn't load within 100ms
   (font-display: optional).
   ═══════════════════════════════════════════════ */
@font-face {
  font-family: 'Tajawal-fallback';
  src: local('Tahoma'), local('Arial');
  size-adjust: 94%;
  ascent-override: 105%;
  descent-override: 30%;
  line-gap-override: 0%;
}

@font-face {
  font-family: 'Inter-fallback';
  src: local('system-ui'), local('Segoe UI'), local('Arial');
  size-adjust: 107%;
  ascent-override: 90%;
  descent-override: 22%;
  line-gap-override: 0%;
}
```

### 6.3 The Complete `tailwind.config.mjs`

```javascript
// tailwind.config.mjs
// Dr. Hard Disk — Design System v3.2 (Bilingual AR/EN)

import defaultTheme from 'tailwindcss/defaultTheme';
import typographyPlugin from '@tailwindcss/typography';
import plugin from 'tailwindcss/plugin';

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],

  theme: {
    extend: {

      // ── COLORS (unchanged from v2) ──
      colors: {
        primary: {
          DEFAULT: '#0B4F6C',
          50: '#F0F7FA', 100: '#E1EFF5', 200: '#B5D8E8',
          300: '#89C1DB', 400: '#4A9BC2', 500: '#0B4F6C',
          600: '#093F56', 700: '#062F41', 800: '#04202B',
          900: '#021016',
        },
        hdd: '#2B6F4B', ssd: '#B43E6F', raid: '#C96A2B',
        'hdd-bg': '#ECFDF5', 'ssd-bg': '#FDF2F8', 'raid-bg': '#FFFBEB',
        page: '#F8F9FA', ink: '#2D3A4A',
        'ink-muted': '#5B6F82', 'ink-subtle': '#94A3B8',
        warning:   { DEFAULT: '#F59E0B', bg: '#FFFBEB', border: '#FDE68A', text: '#92400E' },
        danger:    { DEFAULT: '#DC2626', bg: '#FEF2F2', border: '#FECACA', text: '#991B1B' },
        info:      { DEFAULT: '#2563EB', bg: '#EFF6FF', border: '#BFDBFE', text: '#1E40AF' },
        success:   { DEFAULT: '#16A34A', bg: '#F0FDF4', border: '#BBF7D0', text: '#166534' },
        emergency: { DEFAULT: '#C93B3B', hover: '#A83232', light: '#FEF2F2' },
      },

      // ── FONT FAMILIES ──
      // v3: Added fallback fonts for font-display: optional
      fontFamily: {
        sans: ['var(--font-sans)', ...defaultTheme.fontFamily.sans],
        heading: ['var(--font-heading)', ...defaultTheme.fontFamily.sans],
        mono: ['JetBrains Mono', 'IBM Plex Mono', ...defaultTheme.fontFamily.mono],
      },

      // ── SPACING ──
      spacing: {
        'paragraph': 'var(--paragraph-spacing)',
        'section': '3.5rem',
        'subsection': '2.5rem',
        'block-gap': '2rem',
      },

      maxWidth: {
        'prose-drhd': 'var(--prose-max-width)',
        'breakout': '90ch',
      },

      borderRadius: {
        'card': '0.75rem',
        'button': '0.625rem',
        'badge': '0.375rem',
        'video': '1rem',
      },

      boxShadow: {
        'card': '0 1px 3px 0 rgb(0 0 0 / 0.06), 0 1px 2px -1px rgb(0 0 0 / 0.06)',
        'card-hover': '0 4px 12px 0 rgb(0 0 0 / 0.08), 0 2px 4px -2px rgb(0 0 0 / 0.06)',
        'video': '0 8px 30px -4px rgb(0 0 0 / 0.15)',
        'fab': '0 4px 14px 0 rgb(201 59 59 / 0.35)',
        'fab-hover': '0 6px 20px 0 rgb(201 59 59 / 0.45)',
      },

      keyframes: {
        'pulse-ring': {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(1.5)', opacity: '0' },
        },
      },
      animation: {
        'pulse-ring': 'pulse-ring 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },

      // ── PROSE TYPOGRAPHY ──
      typography: (theme) => ({
        drhd: {
          css: {
            '--tw-prose-body': theme('colors.ink'),
            '--tw-prose-headings': theme('colors.primary.DEFAULT'),
            '--tw-prose-links': theme('colors.primary.DEFAULT'),
            '--tw-prose-bold': theme('colors.ink'),
            '--tw-prose-counters': theme('colors.primary.600'),
            '--tw-prose-bullets': theme('colors.primary.400'),
            '--tw-prose-hr': theme('colors.primary.100'),
            '--tw-prose-quotes': theme('colors.ink'),
            '--tw-prose-quote-borders': theme('colors.primary.300'),
            '--tw-prose-code': theme('colors.ink'),
            '--tw-prose-pre-code': '#E2E8F0',
            '--tw-prose-pre-bg': theme('colors.ink'),
            '--tw-prose-th-borders': theme('colors.primary.200'),
            '--tw-prose-td-borders': theme('colors.primary.100'),

            fontFamily: 'var(--font-sans)',
            maxWidth: 'var(--prose-max-width)',
            fontWeight: 'var(--body-weight)',
            lineHeight: 'var(--body-leading)',

            p: {
              marginTop: '0',
              marginBottom: 'var(--paragraph-spacing)',
              fontWeight: 'var(--body-weight)',
              lineHeight: 'var(--body-leading)',
            },
            '[class~="lead"]': {
              fontSize: '1.25rem',
              lineHeight: 'var(--body-leading)',
              fontWeight: 'var(--lead-weight, 500)',
            },
            'h1, h2, h3, h4': {
              fontFamily: 'var(--font-heading)',
              color: 'var(--tw-prose-headings)',
              fontWeight: '700',
              lineHeight: 'var(--heading-leading)',
            },
            h1: { fontSize: '2.25rem' },
            h2: {
              fontSize: '1.75rem',
              marginTop: '3.5rem', marginBottom: '1.25rem',
              paddingBottom: '0.75rem',
              borderBottomWidth: '1px',
              borderBottomColor: theme('colors.primary.100'),
            },
            h3: { fontSize: '1.375rem', marginTop: '2.5rem', marginBottom: '1rem' },
            h4: { fontSize: '1.1875rem', marginTop: '1.5rem', marginBottom: '0.75rem', fontWeight: '600' },
            a: {
              color: 'var(--tw-prose-links)',
              textDecoration: 'underline',
              textDecorationColor: theme('colors.primary.200'),
              textUnderlineOffset: '4px',
              textDecorationThickness: '2px',
              fontWeight: 'inherit',
              '&:hover': { textDecorationColor: theme('colors.primary.DEFAULT') },
            },
            blockquote: {
              fontStyle: 'italic', fontWeight: '500',
              borderInlineStartWidth: '4px',
              borderInlineStartColor: 'var(--tw-prose-quote-borders)',
              backgroundColor: theme('colors.primary.50'),
              borderStartEndRadius: '0.75rem',
              borderEndEndRadius: '0.75rem',
              padding: '1rem 1.5rem',
              quotes: 'none',
            },
            'blockquote p:first-of-type::before': { content: 'none' },
            'blockquote p:last-of-type::after': { content: 'none' },
            li: { marginTop: '0.5rem', marginBottom: '0.5rem', lineHeight: 'var(--body-leading)' },
            'code, pre': { direction: 'ltr', textAlign: 'left' },
            code: {
              backgroundColor: theme('colors.primary.50'),
              padding: '0.2em 0.4em', borderRadius: '0.25rem',
              fontSize: '0.875em', fontWeight: '500',
              '&::before': { content: 'none' },
              '&::after': { content: 'none' },
            },
            pre: { borderRadius: '0.75rem', padding: '1.25rem 1.5rem' },
            img: { borderRadius: '0.75rem' },
            figcaption: { textAlign: 'center', fontSize: '0.875rem', color: theme('colors.ink-muted') },
          },
        },
      }),
    },
  },

  plugins: [
    typographyPlugin,

    // ── THE BILINGUAL BASE LAYER ──
    plugin(function ({ addBase }) {
      addBase({
        // ARABIC (Default)
        ':root, [lang="ar"]': {
          '--font-sans': '"Tajawal", "Tajawal-fallback", "Tahoma", sans-serif',
          '--font-heading': '"Tajawal", "Tajawal-fallback", "Tahoma", sans-serif',
          '--body-weight': '500',
          '--body-leading': '1.8',
          '--heading-leading': '1.4',
          '--lead-weight': '500',
          '--prose-max-width': '70ch',
          '--paragraph-spacing': '1.5em',
        },
        // ENGLISH
        '[lang="en"]': {
          '--font-sans': '"Inter Variable", "Inter", "Inter-fallback", "system-ui", sans-serif',
          '--font-heading': '"Inter Variable", "Inter", "Inter-fallback", "system-ui", sans-serif',
          '--body-weight': '400',
          '--body-leading': '1.6',
          '--heading-leading': '1.3',
          '--lead-weight': '400',
          '--prose-max-width': '65ch',
          '--paragraph-spacing': '1.25em',
        },
        // SAFEGUARDS
        '[lang="ar"] *': { letterSpacing: '0 !important' },
        '[lang="en"] h1, [lang="en"] h2': { letterSpacing: '-0.025em' },
        'pre, code': { direction: 'ltr !important', textAlign: 'left !important' },
      });
    }),
  ],

  darkMode: 'class',
};
```

### 6.4 Usage Reference

```astro
---
// Article page — same markup for both languages
import BaseLayout from '../../layouts/BaseLayout.astro';
const { entry } = Astro.props;
const { Content } = await entry.render();
const lang = entry.data.lang || 'ar';
---
<BaseLayout lang={lang} title={entry.data.title}>
  <main class="bg-page min-h-screen py-10 lg:py-16">
    <header class="max-w-prose-drhd mx-auto px-5 sm:px-8 lg:px-0 mb-10">
      <h1 class="font-heading text-4xl font-bold text-primary">
        {entry.data.title}
      </h1>
    </header>
    <article class="prose prose-drhd max-w-prose-drhd mx-auto px-5 sm:px-8 lg:px-0">
      <Content />
    </article>
  </main>
</BaseLayout>
```

---

## 7. RTL/LTR Mirroring Checklist {#rtl-checklist}

> No changes from v2. All components must use logical properties.

| Physical (❌) | Logical (✅) | RTL Result |
|:---|:---|:---|
| `pl-4` | `ps-4` | padding-right |
| `pr-4` | `pe-4` | padding-left |
| `ml-4` | `ms-4` | margin-right |
| `mr-4` | `me-4` | margin-left |
| `border-l-4` | `border-s-4` | border-right |
| `border-r-4` | `border-e-4` | border-left |
| `left-0` | `start-0` | right: 0 |
| `right-0` | `end-0` | left: 0 |
| `text-left` | `text-start` | text-align: right |
| `text-right` | `text-end` | text-align: left |
| `rounded-l-lg` | `rounded-s-lg` | right side |
| `rounded-r-lg` | `rounded-e-lg` | left side |
| `float-left` | `float-start` | float: right |
| `float-right` | `float-end` | float: left |

---

## 8. Performance Budget {#performance}

| Metric | Target | Strategy |
|:---|:---|:---|
| **LCP** | < 2.5s | Self-hosted fonts, `font-display: optional` + fallback metrics |
| **CLS** | < 0.1 | `font-display: optional` = zero CLS. Fixed `aspect-video` on embeds |
| **FID** | < 100ms | Astro islands: `client:idle` or `client:visible` |
| **JS Bundle** | < 15KB | Floating WhatsApp (~0.5KB) + Header (~0.5KB) |
| **Font Budget** | < 150KB | AR: Tajawal 400+500+700 (~90KB) / EN: Inter Variable (~45KB) |
| **Images** | WebP/AVIF | Astro `<Image />` at build time |

> **v3 Note:** Switching to `font-display: optional` means first-time visitors
> on very slow connections might see system fonts (Tahoma for Arabic, system-ui
> for English) on their first page load. The adjusted fallback font metrics
> (§6.2) minimize this visual difference. On Cloudflare's edge network with
> Saudi Arabia PoPs, fonts load within ~50ms — well within the 100ms window.
> Repeat visitors always see custom fonts (cached).

---

## 9. File Structure {#file-structure}

> **v3 CHANGE:** `articles/` → `posts/` (alignment with TAD v3 and Content Plan 07)
> **v3.2 CHANGE:** Added `FloatingWhatsApp`, `GentleNote`, `HeroCardsGrid`, `ReelsStrip`, `SuccessStories`. Removed `PanicButton` from global scope (now MDX component only). Removed `CallToAction`.

```
src/
├── content/
│   └── posts/                           # ← Changed from "articles" in v3
│       ├── ar/                          # Arabic articles (MDX)
│       │   ├── clicking-drive-solution.mdx
│       │   └── freezer-myth.mdx
│       └── en/                          # English articles (MDX)
│           ├── clicking-drive-solution.mdx
│           └── freezer-myth.mdx
│
├── components/
│   ├── article/
│   │   ├── WarningBox.astro             # 🆕 v3: Anti-DIY warning
│   │   ├── ArticleDisclaimer.astro      # 🆕 v3: Liability disclaimer
│   │   ├── GentleNote.astro             # 🆕 v3.2: Replaces CallToAction
│   │   ├── PanicButton.astro            # 🆕 v3.2: MDX component (critical articles only)
│   │   ├── AlertBox.astro               # Info/Warning/Danger boxes
│   │   ├── VideoEmbed.astro             # Facade video + transcript
│   │   └── BeforeAfter.astro            # Side-by-side comparison
│   ├── home/
│   │   ├── HeroCardsGrid.astro          # 🆕 v3.2: 8-card hero grid
│   │   ├── ReelsStrip.astro             # 🆕 v3.2: Social media reels
│   │   └── SuccessStories.astro         # 🆕 v3.2: Case study cards
│   ├── video/
│   │   ├── VideoHero.astro
│   │   ├── VideoRow.astro
│   │   ├── VideoCard.astro
│   │   └── ProgressTracker.astro
│   ├── footer/
│   │   ├── Footer.astro                 # 🆕 v3: Full footer
│   │   └── LocalLayer.astro             # 🆕 v3: Swappable location zone
│   ├── FloatingWhatsApp.astro           # 🆕 v3.2: Global floating icon (was PanicButton)
│   ├── NavigationBar.astro              # 🆕 v3.2: Sticky top nav
│   ├── SmartHeader.astro
│   ├── LanguageSwitcher.astro
│   └── TopicBadge.astro
│
├── config/
│   └── location.ts                      # 🆕 v3: Single source for location data
│
├── layouts/
│   ├── BaseLayout.astro
│   └── ArticleLayout.astro
│
├── pages/
│   ├── index.astro                      # Arabic homepage
│   ├── en/
│   │   └── index.astro                  # English homepage
│   ├── posts/                           # ← Changed from "articles"
│   │   └── [slug].astro
│   ├── cases/                           # 🆕 v3.2: Success stories
│   │   └── index.astro
│   ├── contact/                         # 🆕 v3.2: Contact page
│   │   └── index.astro
│   ├── en/
│   │   └── posts/                       # ← Changed
│   │       └── [slug].astro
│   └── videos/
│       ├── index.astro
│       └── [slug].astro
│
├── styles/
│   └── global.css                       # Font imports + fallback metrics
│
├── i18n/
│   ├── ar.json
│   └── en.json
│
└── tailwind.config.mjs
```

### 🆕 Location Config File

```typescript
// src/config/location.ts
// ═══════════════════════════════════════════
// SINGLE SOURCE OF TRUTH for all location data.
// When changing location, update ONLY this file.
// All components (Footer, Contact, LocalPage,
// Schema, GentleNote) read from here.
// ═══════════════════════════════════════════

export const currentLocation = {
  // Status: 'active' | 'transitional' | 'remote'
  status: 'active' as const,

  name: {
    ar: 'مركز الفارس لصيانة الكمبيوتر',
    en: 'Al-Fares Computer Maintenance Center',
  },
  city: {
    ar: 'جدة',
    en: 'Jeddah',
  },
  address: {
    ar: 'شارع خالد بن الوليد، جدة',
    en: 'Khalid Ibn Al-Walid Street, Jeddah',
  },
  phone: '+966XXXXXXXXX',
  whatsapp: '966XXXXXXXXX',
  coordinates: {
    lat: 21.XXXXX,
    lng: 39.XXXXX,
  },
  googleMapsUrl: 'https://maps.google.com/?q=...',
  schema: {
    type: 'ComputerRepair' as const, // Must match GBP primary category
    relationship: 'worksFor' as const,
  },
};

// Transitional fallback (used when status = 'transitional')
export const transitionalMessage = {
  ar: 'حاليًا نقدم خدمات استشارية عن بُعد — للحالات العاجلة تواصل واتساب',
  en: 'Currently offering remote consultation — for urgent cases contact via WhatsApp',
};
```

---

## 10. Quick Decision Reference {#decisions}

| Decision | Arabic | English | Why |
|:---|:---|:---|:---|
| Primary Font | Tajawal | Inter | Matched x-heights, geometric authority |
| Body Weight | 500 | 400 | Tajawal fades; Inter is dense |
| Body Leading | 1.8 | 1.6 | Arabic dots need clearance |
| Heading Leading | 1.4 | 1.3 | Tighter on short text |
| Prose Width | 70ch | 65ch | Arabic is visually denser |
| Paragraph Gap | 1.5em | 1.25em | Proportional to leading |
| Letter-Spacing | 0 (forced) | Normal / -0.025em on headings | Arabic cursive breaks |
| **font-display** | **optional** | **optional** | **v3: Zero CLS (Risk S-3)** |
| **Primary CTA** | **واتساب** | **WhatsApp** | **v3: Solo operator (Risk B-4)** |
| **Footer Local Zone** | **معزولة بصريًا** | **Visually isolated** | **v3: Portable brand (Vision v2)** |
| **WarningBox** | **أحمر بارز** | **Red prominent** | **v3: Anti-DIY (Risk S-7)** |
| **Disclaimer** | **رمادي خفيف** | **Subtle gray** | **v3: Liability (Risk S-7)** |
| **Hero Cards Grid** | **8 كروت تفاعلية** | **8 interactive cards** | **v3.2: Knowledge encyclopedia entry** |
| **GentleNote** | **ملاحظة هادئة** | **Gentle note** | **v3.2: Replaces CallToAction** |
| **Floating WhatsApp** | **أيقونة هادئة** | **Quiet icon** | **v3.2: Separated from PanicButton** |

---

> **This Design System Document is v3.2.**
> **Changes from v3.1:**
> - **Philosophy:** Added "Knowledge Encyclopedia" framing with explicit prohibited/allowed lists
> - **Navigation Bar:** New §2.1 with sticky nav, RTL layout, and language switcher
> - **Hero Cards Grid:** New §3 — 8-card interactive grid replaces traditional hero
> - **Floating WhatsApp:** Separated from PanicButton — quiet 40px icon after scroll (§5.1)
> - **PanicButton:** Now MDX component only — full-width bar in critical articles (§5.2)
> - **GentleNote:** Replaces CallToAction — context-aware, calm tone (§5.5)
> - **Reels Strip:** New homepage section for social media content (§5.9)
> - **Success Stories:** New homepage section for case study cards (§5.10)
> - **About Constraints:** Image and tone restrictions for the About page (§5.11)
> - **File Structure:** Updated with new components and routes (§9)
>
> **The system auto-adapts to `<html lang>` — zero class changes between languages.**

---
