

# DrHardDisk — Technical Architecture Document (TAD)

> **Document Type:** Technical Architecture Document (TAD)
> **Version:** 4.2 — Aligned with Vision v2.0, Risk v3.0, PRD v3.0, UX v3.0
> **Status:** مسودة للاعتماد
> **Tech Stack:** Astro v5 + Tailwind CSS + Cloudflare Pages
> **Content Management:** Custom HTML Content Generator Tool (see 08_Content_Tool_Spec)
> **i18n Strategy:** Standard Routing (ar = default, en = subdirectory)
> **Last Updated:** 17 February 2026

---

## Changelog: v3 → v4 → v4.1 → v4.2

- v4.2 (17 February 2026):
  - استبدال `CallToAction` بـ `GentleNote` (نبرة معرفية بدل بيعية)
  - فصل `PanicButton` إلى مكونين (`FloatingWhatsApp` UI عام + `PanicButton` MDX للطوارئ)
  - إضافة مكونات الصفحة الرئيسية الجديدة (`HeroCards`, `ReelsStrip`, `SuccessStories`)
  - توسيع دور `location.ts` ليشمل نصوص المكونات والكلمات المفتاحية المحلية
  - إضافة صفحة `/cases/` (قصص النجاح) وصفحة `/jeddah/` (SEO محلي)
  - تحديث قائمة الصور المطلوبة (AI-generated assets)
  - تحديث Schema Markup للمكونات الجديدة

- v4.1 (January 2025): Updated to reflect 08_Content_Tool_Spec.
  Removed Keystatic dependency. Added taxonomy fields (category, brands,
  symptoms, difficulty). Replaced panicLevel with difficulty.
  Added Content Collections schema reference.

| Section | Change | Source |
|:---|:---|:---|
| §1.1 Config | Removed hreflang from sitemap (single source: HreflangTags only) | Risk S-1 |
| §1.1 Config | Added `PUBLIC_SITE_URL` env var, removed hardcoded domain | Risk B-3, Vision v2.0 |
| §2 Folders | Images moved to `src/assets/images/` | Risk T-9 |
| §2 Folders | Added `src/config/location.ts` | Vision v2.0, PRD FR-LL1 |
| §2 Folders | Added new components (WarningBox, ArticleDisclaimer, Footer) | UX v3, Risk S-7 |
| §2 Folders | Content format clarification (`.mdx` format) | Content Plan reconciliation |
| §2 Folders | [v4.2] Added `src/components/ui/` (FloatingWhatsApp, HeroCards) | Design v4.2 |
| §2 Folders | [v4.2] Added `src/components/widgets/` (ReelsStrip, SuccessStories) | Design v4.2 |
| §2 Folders | [v4.2] Added `src/components/content/GentleNote.astro` | Design v4.2 |
| §2 Folders | [v4.2] Added `src/content/cases/` collection | Design v4.2 |
| §2 Folders | [v4.2] Added `src/assets/images/ui/` for AI-generated assets | Design v4.2 |
| §3 Content | Updated schema fields (translationID, difficulty, lang) | Content Plan 07, 08_Content_Tool_Spec |
| §3 Content | Image fields point to `src/assets/images/` | Risk T-9 |
| §3 Content | [v4.2] Added CaseEntry schema for `/cases/` collection | Design v4.2 |
| §4.1 Header | Unchanged | — |
| §4.2 PanicButton | [v4.2] Split into FloatingWhatsApp (UI) + PanicButton (MDX) | Design v4.2 |
| §4.3 CallToAction | [v4.2] Removed — replaced by GentleNote | Design v4.2 |
| §4 (NEW) | [v4.2] GentleNote, HeroCards, ReelsStrip, SuccessStories | Design v4.2 |
| §4 (NEW) | Added WarningBox, ArticleDisclaimer, Footer/LocalLayer | UX v3, Risk S-7, PRD FR-LL |
| §4 (NEW) | Added `location.ts` config | Vision v2.0 |
| §5.2 Schema | LocalBusiness reads from `location.ts` | Vision v2.0 |
| §5.2 Schema | [v4.2] Added Cases schema, updated LocalBusiness | Design v4.2 |
| §5.2 Layout | CSS variable approach (from UX v3), `font-display: optional` | UX v3, Risk S-3 |
| §5.3 Hreflang | Note: single source of truth (not sitemap) | Risk S-1 |
| §5.4 Fonts | `swap` → `optional` + fallback font adjustments | Risk S-3, UX v3 |
| §5.4 Tailwind | References UX v3 as source of truth for design values | Prevent duplication |
| §6 Checklist | Updated for new components and changes | All |

---

## 1. استراتيجية التدويل والبنية التحتية

> Unchanged from v3 except for config updates noted below.

| البُعد | التفصيل |
|---|---|
| **المسار الافتراضي** | `/` → المحتوى العربي (RTL) |
| **المسار الثانوي** | `/en/` → المحتوى الإنجليزي (LTR) |
| **آلية التوجيه** | الافتراضي دائماً العربية |
| **مزود الاستضافة** | Cloudflare Pages (Free Commercial Tier) |
| **بيئة التشغيل** | Cloudflare Workers (Edge Runtime — V8 Isolates) |
| **عقد الحافة** | جدة، الرياض، الدمام — <20ms Latency |
| **المحول** | `@astrojs/cloudflare` |

### 1.1 إعدادات `astro.config.mjs` — UPDATED v4

```ts
// astro.config.mjs — v4
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

// ═══ [v4] Domain from environment variable ═══
const siteURL = process.env.PUBLIC_SITE_URL || 'https://drharddisk.sa';

export default defineConfig({
  site: siteURL,

  output: 'hybrid',

  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },
  }),

  vite: {
    build: {
      cssMinify: 'lightningcss',
    },
  },

  build: {
    inlineStylesheets: 'auto',
  },

  i18n: {
    defaultLocale: 'ar',
    locales: ['ar', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },

  integrations: [
    tailwind(),

    // ═══ [v4] Sitemap — NO hreflang here ═══
    // Hreflang is managed ONLY by HreflangTags.astro in <head>
    // (Risk S-1: single source of truth to prevent conflicts)
    sitemap({
      filter: (page) => {
        const excludePatterns = ['/api/', '/404', '/_'];
        return !excludePatterns.some((pattern) => page.includes(pattern));
      },
      serialize: (item) => {
        if (item.url.endsWith('/') && !item.url.includes('/en/') &&
            item.url.split('/').length <= 4) {
          return { ...item, priority: 1.0, changefreq: 'daily' };
        }
        if (item.url.includes('/services/')) {
          return { ...item, priority: 0.9, changefreq: 'weekly' };
        }
        if (item.url.includes('/blog/')) {
          return { ...item, priority: 0.7, changefreq: 'monthly' };
        }
        return { ...item, priority: 0.5, changefreq: 'monthly' };
      },
    }),
  ],
});
```

**ما تغير عن v3:**
- `site` يقرأ من `PUBLIC_SITE_URL` env var (Risk B-3)
- Sitemap: أُزيل `i18n` config بالكامل (Risk S-1: مصدر واحد = HreflangTags.astro)

### 1.2 إعدادات `wrangler.toml`

> Unchanged from v3.

```toml
name = "drharddisk-sa"
compatibility_date = "2024-09-23"
compatibility_flags = ["nodejs_compat"]

[site]
bucket = "./dist"
```

### 1.3 ملفات البيئة — UPDATED v4

```env
# .env (لا تُرفع على GitHub!)
NODE_ENV=development
PUBLIC_SITE_URL=https://drharddisk.sa
```

```env
# .env.example (تُرفع على GitHub كمرجع)
NODE_ENV=development
PUBLIC_SITE_URL=https://drharddisk.sa
```

### 1.4 التطوير والنشر المحلي

> Unchanged from v3.

---

## 2. هيكلة المجلدات — RESTRUCTURED v4.2

```bash
drharddisk/
├── astro.config.mjs
├── wrangler.toml
├── tailwind.config.mjs              # ← Source: UX v3 §5.3
├── .env
├── .env.example
├── package.json
│
├── public/
│   ├── robots.txt
│   ├── _headers                     # Cloudflare cache control
│   └── images/
│       └── brand/
│           ├── logo.svg
│           └── og-default.jpg
│
├── src/
│   ├── assets/                      # ← [v4] Images for build-time optimization
│   │   └── images/
│   │       ├── posts/               # Article images (1200×630)
│   │       ├── cases/               # Case study Before/After
│   │       ├── services/            # Service page images
│   │       └── ui/                  # ← [v4.2 NEW] UI images (AI-generated)
│   │           ├── card-hdd.webp        # Hero card — 400×400
│   │           ├── card-ssd.webp
│   │           ├── card-nvme.webp
│   │           ├── card-sdcard.webp
│   │           ├── card-flash.webp
│   │           ├── card-dvr.webp
│   │           ├── card-raid.webp
│   │           ├── card-contact.webp    # Dr. Hard Disk caricature
│   │           ├── about-pc3000.webp    # Equipment — 800×500
│   │           ├── about-mrt.webp
│   │           └── about-cleanroom.webp
│   │
│   ├── config/                      # ← [v4 NEW] App configuration
│   │   └── location.ts             # [v4.2] Expanded — includes GentleNote texts
│   │
│   ├── content/
│   │   ├── config.ts               # Content Collections Schema
│   │   ├── posts/                   # Blog articles
│   │   │   ├── ar/
│   │   │   │   └── clicking-drive-solution.mdx
│   │   │   └── en/
│   │   │       └── clicking-drive-solution.mdx
│   │   ├── cases/                   # Case studies (قصص النجاح)
│   │   │   ├── ar/
│   │   │   └── en/
│   │   └── services/               # Service pages
│   │       ├── ar/
│   │       └── en/
│   │
│   ├── components/
│   │   ├── common/
│   │   │   ├── Header.astro
│   │   │   └── LanguageSwitcher.astro
│   │   ├── ui/                      # ← [v4.2 NEW] Global UI elements
│   │   │   ├── FloatingWhatsApp.astro   # WhatsApp FAB — all pages
│   │   │   └── HeroCards.astro          # Homepage hero grid
│   │   ├── content/                 # ← [v4.2 NEW] Content-level components
│   │   │   ├── GentleNote.astro         # Replaces CallToAction
│   │   │   └── PanicButton.astro        # MDX emergency strip (critical only)
│   │   ├── widgets/                 # ← [v4.2 NEW] Homepage sections
│   │   │   ├── ReelsStrip.astro         # Social media reels
│   │   │   └── SuccessStories.astro     # Featured case studies
│   │   ├── article/                 # ← [v4]
│   │   │   ├── WarningBox.astro
│   │   │   ├── ArticleDisclaimer.astro
│   │   │   ├── VideoEmbed.astro
│   │   │   └── BeforeAfter.astro
│   │   ├── footer/                  # ← [v4]
│   │   │   ├── Footer.astro
│   │   │   └── LocalLayer.astro
│   │   └── seo/
│   │       ├── SchemaLocalBusiness.astro
│   │       ├── SchemaService.astro
│   │       ├── SchemaBreadcrumb.astro
│   │       ├── SchemaFAQ.astro
│   │       └── HreflangTags.astro       # ← SOLE source of hreflang
│   │
│   ├── layouts/
│   │   ├── BaseLayout.astro        # ← [v4.2] Uses FloatingWhatsApp instead of PanicButton
│   │   └── ArticleLayout.astro     # ← [v4.2] Injects GentleNote + PanicButton (if critical)
│   │
│   ├── pages/
│   │   ├── index.astro             # ← [v4.2] Uses HeroCards, ReelsStrip, SuccessStories
│   │   ├── about.astro
│   │   ├── contact.astro
│   │   ├── privacy.astro
│   │   ├── terms.astro
│   │   ├── jeddah/                  # ← [v4.2] Local SEO page (not in nav)
│   │   │   └── index.astro
│   │   ├── services/
│   │   │   └── [slug].astro
│   │   ├── blog/
│   │   │   └── [slug].astro
│   │   ├── cases/                   # ← [v4.2 NEW] Success stories
│   │   │   ├── index.astro          # Grid listing
│   │   │   └── [slug].astro         # Individual case page
│   │   └── en/
│   │       ├── index.astro
│   │       ├── about.astro
│   │       ├── contact.astro
│   │       ├── privacy.astro
│   │       ├── terms.astro
│   │       ├── jeddah/
│   │       │   └── index.astro
│   │       ├── services/
│   │       │   └── [slug].astro
│   │       ├── blog/
│   │       │   └── [slug].astro
│   │       └── cases/
│   │           ├── index.astro
│   │           └── [slug].astro
│   │
│   ├── i18n/
│   │   ├── ar.json
│   │   └── en.json
│   │
│   ├── utils/
│   │   ├── i18n.ts
│   │   └── seo.ts
│   │
│   └── styles/
│       └── global.css              # Font imports + fallback metrics (UX v3 §5.2)
│
├── scripts/
│   └── validate-translations.ts
│
└── docs/
    ├── LOCATION_MIGRATION.md
    ├── WORKERS_COMPAT.md
    ├── CUSTOMIZATIONS.md
    └── RUNBOOK.md
```

**ما تغير عن v4.1 (الجديد في v4.2):**

| التغيير | السبب |
|:--------|:------|
| `src/components/ui/` جديد | فصل عناصر UI العامة (FloatingWhatsApp, HeroCards) |
| `src/components/content/` جديد | مكونات محتوى (GentleNote, PanicButton المعاد هيكلته) |
| `src/components/widgets/` جديد | أقسام الصفحة الرئيسية (ReelsStrip, SuccessStories) |
| أُزيل `PanicButton` من `common/` | انتقل إلى `content/` كمكون MDX |
| أُزيل `CallToAction` بالكامل | حل محله `GentleNote` |
| `src/assets/images/ui/` جديد | صور AI-generated للكروت والأجهزة |
| `src/pages/cases/` جديد | صفحات قصص النجاح |
| `src/pages/jeddah/` أصبح مجلد | صفحة SEO محلية مع index.astro |

### 2.1 ملاحظة عن تنسيق المحتوى

> **القرار:** نستخدم `.mdx` مع Astro Content Collections.
> المحتوى يُنتج عبر Custom Content Generator Tool (see 08_Content_Tool_Spec)
> ويُكتب كـ MDX في الملفات مباشرة.
> هذا يتيح استخدام مكونات Astro داخل المحتوى
> (WarningBox, VideoEmbed, PanicButton, GentleNote, ArticleDisclaimer).
>
> الأداة تتولى توليد الـ frontmatter والمحتوى بصيغة MDX جاهزة للنشر.
> الملفات النهائية تكون `.mdx` في المستودع.

---

## 3. Content Schema & Frontmatter — UPDATED v4.2

> **[v4.1] Keystatic has been removed.** Content is managed via a
> Custom Content Generator Tool. See 08_Content_Tool_Spec for full details.

### 3.1 Frontmatter Template (Posts & Services)

```yaml
---
# ─── Core Identity ───
title: "Article title here"              # Required — string — 10-120 chars
description: "SEO meta description"       # Required — string — 50-160 chars
pubDate: "2025-01-15"                     # Required — date — YYYY-MM-DD format
heroImage: "../../assets/images/posts/slug-name.webp"  # Required — string — relative path
lang: "ar"                                # Required — enum — "ar" | "en"
translationID: "slug-name"               # Required — string — must match between ar/en

# ─── Taxonomy ───
category: "hdd"                           # Required — single enum
# Allowed values: hdd | ssd | raid | flash | mobile | nas | general

brands:                                   # Optional — array (0-3 items)
  - "western-digital"
# Allowed values: western-digital | seagate | samsung | toshiba | kingston | crucial | sandisk | hikvision | other

symptoms:                                 # Optional — array (0-5 items)
  - "clicking-sound"
# Allowed values: clicking-sound | not-detected | water-damage | fire-damage | deleted-files | formatted-drive | ransomware | bad-sectors | firmware-corruption | pcb-failure | head-crash | motor-failure | electrical-surge | physical-damage | logical-damage

difficulty: "critical"                    # Required — single enum — replaces panicLevel
# Allowed values: simple | moderate | critical
# Behavior: "critical" triggers PanicButton + WarningBox auto-injection

# ─── Control ───
draft: false                              # Optional — boolean — default false
featured: false                           # Optional — boolean — default false
---
```

### 3.2 Frontmatter Template (Cases — قصص النجاح) — NEW v4.2

```yaml
---
# ─── Case Study Identity ───
title: "استعادة 500GB من هارد WD بصوت طقطقة"    # Required — string
device_type: "hdd"                        # Required — enum
# Allowed values: hdd | ssd | raid | flash

brand: "western-digital"                  # Optional — string
problem: "الهارد بيطلع صوت طقطقة ومش بيتعرف عليه"  # Required — string
solution: "تم تغيير الهيدز في غرفة نظيفة"          # Required — string
result: "تم استعادة 98% من البيانات"               # Required — string
recovery_percentage: 98                    # Required — number (0-100)
badge: "success"                          # Required — enum: "success" | "challenge"
date: "2025-12-01"                        # Required — date
lang: "ar"                                # Required — enum
translationID: "wd-clicking-case"         # Required — string
heroImage: "../../assets/images/cases/wd-clicking.webp"  # Optional
draft: false
---
```

### 3.3 Content Collections Configuration (Astro) — UPDATED v4.2

The project uses Astro's built-in Content Collections with Zod validation.
The schema is defined in `src/content/config.ts` and must match the frontmatter
fields defined above.

Key validation rules for **posts** and **services**:
- title: min 10 chars, max 120 chars
- description: min 50 chars, max 160 chars (SEO requirement)
- slug: lowercase English only, pattern: [a-z0-9]+(-[a-z0-9]+)*
- category: must be one of the allowed enum values
- brands: array, max 3 items, each must be from allowed enum values
- symptoms: array, max 5 items, each must be from allowed enum values
- difficulty: must be one of: simple, moderate, critical
- heroImage: must start with "../../assets/images/"
- translationID: must be identical in both ar and en versions of the same article

Key validation rules for **cases** (NEW v4.2):
- device_type: must be one of: hdd, ssd, raid, flash
- recovery_percentage: min 0, max 100
- badge: must be one of: success, challenge
- problem, solution, result: required strings

Build will fail if any required field is missing or any enum value is invalid.
This is intentional — it prevents publishing broken content.

See 08_Content_Tool_Spec for the full enum lists (Section 2.2).

### 3.4 Content Input Method

Content is created using a Custom Content Generator Tool (HTML-based).
The tool converts raw text from NotebookLM into structured MDX files
ready for deployment.

Full specification: see 08_Content_Tool_Spec_v1.md

The tool handles:
- Frontmatter generation (all fields including taxonomy)
- Twin-file creation (Arabic + English)
- Component injection (PanicButton, WarningBox, GentleNote, ArticleDisclaimer)
- Image naming and path assignment
- Slug generation and deduplication
- ZIP export for manual upload to GitHub

---

## 4. المكونات المشتركة — UPDATED v4.2

### 4.1 Header.astro

> Unchanged from v3 (language switcher logic is the same).

### 4.2 FloatingWhatsApp.astro (الزر العائم) — NEW v4.2

> **[v4.2] Replaces the old PanicButton in `common/`.**
> This is a global UI element — appears on every page of the site.

```astro
---
// src/components/ui/FloatingWhatsApp.astro — v4.2
import { location } from '../../config/location';

const waText = encodeURIComponent('مرحباً، عندي استفسار عن استعادة البيانات');
---

<a
  href={`https://wa.me/${location.whatsapp_number}?text=${waText}`}
  target="_blank"
  rel="noopener"
  aria-label="تواصل عبر واتساب"
  id="floating-wa"
  class="fixed bottom-4 start-4 z-40
         w-10 h-10 rounded-full
         bg-[#25D366]/70 hover:bg-[#25D366]
         flex items-center justify-center
         shadow-lg hover:shadow-xl
         transition-all duration-300 ease-out
         opacity-0 translate-y-4
         focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
>
  <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
    <!-- WhatsApp icon SVG path -->
  </svg>
</a>

<script>
  // Fade-in after scrolling past first section (Hero)
  const btn = document.getElementById('floating-wa');
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) {
        btn?.classList.remove('opacity-0', 'translate-y-4');
        btn?.classList.add('opacity-100', 'translate-y-0');
      } else {
        btn?.classList.add('opacity-0', 'translate-y-4');
        btn?.classList.remove('opacity-100', 'translate-y-0');
      }
    },
    { threshold: 0.1 }
  );

  const hero = document.querySelector('[data-section="hero"]');
  if (hero) observer.observe(hero);
  else btn?.classList.remove('opacity-0', 'translate-y-4'); // no hero = always visible
</script>
```

**المواصفات:**

| الخاصية | القيمة |
|:--------|:-------|
| Position | fixed, bottom-left (في RTL: `start-4`) |
| الشكل | دائرة 40px — أيقونة واتساب فقط |
| اللون | `#25D366` بشفافية 70% |
| السلوك | fade-in بعد سكرول أول قسم (Hero) |
| z-index | 40 |
| بدون | نص، pulse animation، tooltip |

### 4.3 PanicButton.astro (شريط الطوارئ) — REWRITTEN v4.2

> **[v4.2] Moved from `common/` to `content/`.**
> This is now an MDX component for critical articles only — not a global FAB.

```astro
---
// src/components/content/PanicButton.astro — v4.2
import { location } from '../../config/location';

interface Props {
  message: string; // النص المخصص للمقال
}

const { message } = Astro.props;
const waText = encodeURIComponent(message);
---

<aside class="w-full bg-gradient-to-b from-[#D1FAE5] to-[#A7F3D0]
              py-8 px-6 my-8 rounded-lg text-center">
  <div class="max-w-2xl mx-auto">
    <span class="text-2xl mb-3 block" role="img" aria-label="تحذير">⚠️</span>
    <p class="text-gray-800 font-bold text-lg mb-4 leading-relaxed">
      {message}
    </p>
    <a
      href={`https://wa.me/${location.whatsapp_number}?text=${waText}`}
      target="_blank"
      rel="noopener"
      class="inline-flex items-center gap-2
             bg-[#25D366] hover:bg-[#1DA851]
             text-white font-bold
             px-8 py-4 rounded-xl
             shadow-lg hover:shadow-xl
             transition-all duration-200
             text-lg"
    >
      <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <!-- WhatsApp icon SVG path -->
      </svg>
      تواصل الآن عبر واتساب
    </a>
  </div>
</aside>
```

**متى يظهر:**
- يُحقن تلقائياً **بعد أول H2** في المقالات التي `difficulty: critical`
- يمكن أيضاً إدراجه يدوياً في MDX

**الفرق بين FloatingWhatsApp و PanicButton:**

| الخاصية | FloatingWhatsApp | PanicButton |
|:--------|:-----------------|:------------|
| النوع | UI global | MDX component |
| المسار | `components/ui/` | `components/content/` |
| الحجم | 40px دائرة صغيرة | Full-width شريط كبير |
| الموضع | Fixed خارج المحتوى | داخل تدفق المحتوى |
| السياق | كل صفحات الموقع | `difficulty: critical` فقط |
| z-index | 40 | لا ينطبق (في تدفق الصفحة) |
| النص | بدون نص | رسالة مخصصة + زر واتساب كبير |

### 4.4 GentleNote.astro (الملاحظة الهادية) — NEW v4.2

> **[v4.2] Replaces `CallToAction.astro`.**
> نبرة معرفية بدل بيعية. يعرض نصاً يتغير تلقائياً حسب تصنيف المقال.

```astro
---
// src/components/content/GentleNote.astro — v4.2
import { location } from '../../config/location';

interface Props {
  category: string;        // من frontmatter المقال
  symptoms?: string[];     // من frontmatter المقال
}

const { category, symptoms = [] } = Astro.props;

// ═══ اختيار النص المناسب ═══
// أولوية: symptom-specific → category-level → generic
function getNoteText(cat: string, syms: string[]): string {
  // نصوص محددة بالأعراض (أولوية أعلى)
  if (cat === 'hdd' && syms.includes('clicking-sound')) {
    return 'لو بتسمع صوت طقطقة دلوقتي، ما تحاولش تشغل الهارد تاني.';
  }
  if (cat === 'hdd' && syms.includes('not-detected')) {
    return 'لو الكمبيوتر مش شايف الهارد، ما تحاولش تفكه بنفسك.';
  }

  // نصوص على مستوى الفئة
  const categoryNotes: Record<string, string> = {
    hdd: 'مشاكل الهارد ديسك ممكن تتفاقم لو اتعاملت معاها غلط.',
    ssd: 'مشاكل الـ SSD غالباً بتحتاج أدوات متخصصة.',
    raid: 'لو السيرفر وقع، ما تحاولش تعمل rebuild بنفسك.',
    flash: 'لو الفلاشة مش شغالة، ما تعملش فورمات.',
    dvr: 'كاميرات المراقبة محتاجة تعامل متخصص للحفاظ على التسجيلات.',
    general: 'لو محتاج مساعدة متخصصة في استعادة البيانات.',
  };

  // أولاً: حاول من location.ts (قابل للتخصيص بدون تعديل الكود)
  if (location.gentle_notes[cat]) {
    return location.gentle_notes[cat];
  }

  return categoryNotes[cat] || categoryNotes['general'];
}

const noteText = getNoteText(category, symptoms);
const suffix = `تواصل عبر واتساب أو زورنا في ${location.short_address}.`;
---

<aside class="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-5 my-8
              max-w-prose mx-auto">
  <div class="flex gap-3 items-start">
    <span class="text-lg flex-shrink-0 mt-0.5" role="img" aria-hidden="true">💡</span>
    <div>
      <p class="text-gray-700 text-sm leading-relaxed mb-2">
        {noteText}
      </p>
      <p class="text-gray-500 text-xs leading-relaxed">
        {suffix}
      </p>
    </div>
  </div>
</aside>
```

**المواصفات:**

| الخاصية | القيمة |
|:--------|:-------|
| الخلفية | `#F9FAFB` (رمادي فاتح جداً) |
| الحدود | `#E5E7EB` (رمادي) |
| الأيقونة | 💡 |
| الألوان | **بدون** أخضر جذاب أو أزرق بارز — نبرة محايدة |
| الموضع | يُحقن تلقائياً **قبل آخر فقرة** في كل مقال/خدمة |
| الاستثناءات | **لا** يظهر في الصفحة الرئيسية أو صفحة About |

**منطق اختيار النص:**
1. إذا وُجد تطابق `category + symptom` → نص محدد جداً
2. إذا وُجد نص مخصص في `location.gentle_notes[category]` → يُستخدم
3. وإلا → نص الفئة الافتراضي من القاموس الداخلي

**Schema Integration:**
لا يحتاج Schema خاص (ليس CTA تقليدي).

### 4.5 HeroCards.astro (شبكة الكروت) — NEW v4.2

```astro
---
// src/components/ui/HeroCards.astro — v4.2
import { Image } from 'astro:assets';

// ← استيراد صور الكروت من assets
import cardHdd from '../../assets/images/ui/card-hdd.webp';
import cardSsd from '../../assets/images/ui/card-ssd.webp';
import cardNvme from '../../assets/images/ui/card-nvme.webp';
import cardSdcard from '../../assets/images/ui/card-sdcard.webp';
import cardFlash from '../../assets/images/ui/card-flash.webp';
import cardDvr from '../../assets/images/ui/card-dvr.webp';
import cardRaid from '../../assets/images/ui/card-raid.webp';
import cardContact from '../../assets/images/ui/card-contact.webp';

const cards = [
  { image: cardHdd,    arName: 'هارد ديسك',  enName: 'HDD',      href: '/posts/?category=hdd' },
  { image: cardSsd,    arName: 'إس إس دي',   enName: 'SSD',      href: '/posts/?category=ssd' },
  { image: cardNvme,   arName: 'إن في إم إي', enName: 'NVMe',     href: '/posts/?category=ssd' },
  { image: cardSdcard, arName: 'كارت ذاكرة',  enName: 'SD Card',  href: '/posts/?category=flash' },
  { image: cardFlash,  arName: 'فلاش ميموري', enName: 'USB Flash', href: '/posts/?category=flash' },
  { image: cardDvr,    arName: 'كاميرات مراقبة', enName: 'DVR',   href: '/posts/?category=dvr' },
  { image: cardRaid,   arName: 'سيرفرات',     enName: 'RAID',     href: '/posts/?category=raid' },
];
---

<section data-section="hero" class="py-12 px-4">
  <div class="max-w-6xl mx-auto
              grid grid-cols-2 md:grid-cols-4 gap-4">

    {cards.map((card, i) => (
      <a
        href={card.href}
        class="group relative overflow-hidden rounded-xl bg-white
               shadow-md hover:shadow-xl
               transform hover:scale-105
               transition-all duration-300 ease-out
               focus:outline-none focus:ring-2 focus:ring-primary-500"
        style={`animation-delay: ${i * 50}ms`}
      >
        <Image
          src={card.image}
          alt={card.arName}
          width={400}
          height={400}
          format="webp"
          quality={80}
          class="w-full aspect-square object-cover
                 group-hover:brightness-110 transition-all duration-300"
        />
        <div class="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <p class="text-white font-bold text-base">{card.arName}</p>
          <p class="text-white/70 text-xs">{card.enName}</p>
        </div>
        <!-- Shimmer effect on hover -->
        <div class="absolute inset-0 opacity-0 group-hover:opacity-100
                    bg-gradient-to-r from-transparent via-white/20 to-transparent
                    -translate-x-full group-hover:translate-x-full
                    transition-all duration-700 ease-out pointer-events-none" />
      </a>
    ))}

    <!-- الكارت الثامن: تواصل -->
    <a
      href="/contact/"
      class="group relative overflow-hidden rounded-xl
             bg-[#F0FDF4] border-2 border-[#BBF7D0]
             shadow-md hover:shadow-xl
             transform hover:scale-105
             transition-all duration-300 ease-out
             flex flex-col items-center justify-center
             aspect-square p-6 text-center
             focus:outline-none focus:ring-2 focus:ring-primary-500"
      style={`animation-delay: ${7 * 50}ms`}
    >
      <Image
        src={cardContact}
        alt="Dr. Hard Disk"
        width={200}
        height={200}
        format="webp"
        class="w-24 h-24 rounded-full mb-4 object-cover"
      />
      <p class="text-gray-800 font-bold text-sm">محتاج مساعدة متخصصة؟</p>
      <p class="text-gray-500 text-xs mt-1">تواصل معنا</p>
    </a>

  </div>
</section>
```

**المواصفات:**

| الخاصية | القيمة |
|:--------|:-------|
| Layout | Grid 4×2 (Desktop) / 2×4 (Mobile) |
| عدد الكروت | 7 أجهزة + 1 تواصل |
| حجم الصور | 400×400 (AI-generated) |
| Animations | Stagger 50ms بين كل كارت |
| Hover | scale 1.05 + shadow + shimmer effect |
| Clickable | الكارت بالكامل (link wraps everything) |

**الكروت السبعة + وجهاتها:**

| الكارت | النص العربي | النص الإنجليزي | الوجهة |
|:-------|:-----------|:--------------|:-------|
| 1 | هارد ديسك | HDD | `/posts/?category=hdd` |
| 2 | إس إس دي | SSD | `/posts/?category=ssd` |
| 3 | إن في إم إي | NVMe | `/posts/?category=ssd` |
| 4 | كارت ذاكرة | SD Card | `/posts/?category=flash` |
| 5 | فلاش ميموري | USB Flash | `/posts/?category=flash` |
| 6 | كاميرات مراقبة | DVR | `/posts/?category=dvr` |
| 7 | سيرفرات | RAID | `/posts/?category=raid` |
| 8 | محتاج مساعدة متخصصة؟ | — | `/contact/` |

**Schema:** لا Schema خاص — الكروت navigation elements.

### 4.6 ReelsStrip.astro (قسم السوشيال ميديا) — NEW v4.2

```astro
---
// src/components/widgets/ReelsStrip.astro — v4.2

interface Props {
  reels: Array<{
    thumbnail: string;
    title: string;
    views: string;
    url: string;
  }>;
}

const { reels } = Astro.props;
---

<section class="py-12 px-4 bg-gray-50">
  <div class="max-w-6xl mx-auto">
    <h2 class="text-2xl font-bold text-center mb-8">شاهد قصصنا</h2>

    <div class="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory
                md:grid md:grid-cols-4 md:overflow-visible">

      {reels.map((reel) => (
        <a
          href={reel.url}
          target="_blank"
          rel="noopener noreferrer"
          class="flex-shrink-0 w-44 md:w-auto snap-center
                 group relative overflow-hidden rounded-xl
                 shadow-md hover:shadow-xl
                 transition-all duration-300"
        >
          <div class="aspect-[9/16] bg-gray-200 overflow-hidden">
            <img
              src={reel.thumbnail}
              alt={reel.title}
              class="w-full h-full object-cover
                     group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          </div>
          <div class="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-3">
            <p class="text-white text-xs font-bold line-clamp-2">{reel.title}</p>
            <p class="text-white/60 text-[10px] mt-1">👁️ {reel.views}</p>
          </div>
          <!-- Play icon overlay -->
          <div class="absolute inset-0 flex items-center justify-center
                      opacity-0 group-hover:opacity-100 transition-opacity">
            <div class="w-12 h-12 bg-white/30 backdrop-blur-sm rounded-full
                        flex items-center justify-center">
              <span class="text-white text-xl">▶</span>
            </div>
          </div>
        </a>
      ))}

    </div>
  </div>
</section>
```

**المواصفات:**

| الخاصية | القيمة |
|:--------|:-------|
| الشكل | 3-4 مستطيلات عمودية (نسبة 9:16) |
| Desktop | 4 في صف (grid) |
| Mobile | horizontal scroll مع snap |
| المحتوى | thumbnail + عنوان + عدد المشاهدات |
| السلوك | يفتح URL في tab جديد (external link) |

**البيانات:**
يقرأ من مصفوفة `reels` تُمرر كـ prop من الصفحة الرئيسية:
```typescript
reels: Array<{
  thumbnail: string;  // URL صورة مصغرة
  title: string;      // عنوان الفيديو
  views: string;      // "12K" أو "5.2K"
  url: string;        // رابط TikTok/Instagram
}>
```

### 4.7 SuccessStories.astro (قصص النجاح) — NEW v4.2

```astro
---
// src/components/widgets/SuccessStories.astro — v4.2
import { getCollection } from 'astro:content';

// أحضر أول 3 قصص نجاح (أحدث أولاً)
const allCases = await getCollection('cases', ({ data }) => {
  return data.lang === 'ar' && !data.draft;
});

const latestCases = allCases
  .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime())
  .slice(0, 3);

// أيقونات حسب نوع الجهاز
const deviceIcons: Record<string, string> = {
  hdd: '💽',
  ssd: '🔲',
  raid: '🖥️',
  flash: '🔌',
};
---

<section class="py-12 px-4">
  <div class="max-w-4xl mx-auto">
    <h2 class="text-2xl font-bold text-center mb-8">قصص نجاح</h2>

    <div class="grid gap-6">
      {latestCases.map((caseEntry) => (
        <a
          href={`/cases/${caseEntry.slug}/`}
          class="flex items-start gap-4 p-6 bg-white rounded-xl
                 border border-gray-100 shadow-sm hover:shadow-md
                 transition-all duration-200 group"
        >
          <!-- أيقونة الجهاز -->
          <span class="text-3xl flex-shrink-0 mt-1">
            {deviceIcons[caseEntry.data.device_type] || '💾'}
          </span>

          <!-- المحتوى -->
          <div class="flex-1 min-w-0">
            <h3 class="font-bold text-gray-900 group-hover:text-primary-600
                       transition-colors mb-2">
              {caseEntry.data.title}
            </h3>
            <p class="text-gray-600 text-sm mb-1">
              <span class="font-medium">المشكلة:</span> {caseEntry.data.problem}
            </p>
            <p class="text-gray-600 text-sm">
              <span class="font-medium">النتيجة:</span> {caseEntry.data.result}
            </p>
          </div>

          <!-- Badge -->
          <span class={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-bold
            ${caseEntry.data.badge === 'success'
              ? 'bg-green-100 text-green-800'
              : 'bg-orange-100 text-orange-800'
            }`}
          >
            {caseEntry.data.badge === 'success' ? 'نجاح ✅' : 'تحدي 💪'}
          </span>
        </a>
      ))}
    </div>

    <div class="text-center mt-8">
      <a href="/cases/" class="text-primary-600 hover:text-primary-800
                               text-sm font-medium underline underline-offset-4">
        عرض كل قصص النجاح ←
      </a>
    </div>
  </div>
</section>
```

**المواصفات:**

| الخاصية | القيمة |
|:--------|:-------|
| العدد | 3 كروت أفقية |
| Data Source | `src/content/cases/` (أول 3 بالتاريخ) |
| محتوى كل كارت | أيقونة + عنوان + المشكلة + النتيجة + Badge |
| Badge ألوان | نجاح ✅ = أخضر / تحدي 💪 = برتقالي |

### 4.8 WarningBox — v4

> Full spec in UX v3 §4.2. Implementation unchanged from v4:

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
  : 'This article explains why this procedure is dangerous. Do not attempt it — consult a specialist.';
---
<aside role="alert" class="bg-danger-bg border-s-4 border-danger rounded-e-card p-4 sm:p-5 mb-8">
  <p class="font-heading font-bold text-danger-text text-base mb-1">
    {Astro.props.title || defaultTitle}
  </p>
  <p class="text-danger-text text-sm leading-relaxed">
    {Astro.props.body || defaultBody}
  </p>
</aside>
```

### 4.9 ArticleDisclaimer — v4

> Unchanged from v4:

```astro
---
// src/components/article/ArticleDisclaimer.astro
const { lang = 'ar' } = Astro.props;
const text = lang === 'ar'
  ? 'ℹ️ هذا المحتوى تعليمي ولا يُغني عن استشارة متخصص. أي إجراء تتخذه بناءً على هذا المحتوى يكون على مسؤوليتك الشخصية.'
  : 'ℹ️ This content is educational and does not replace professional consultation. Any action taken is at your own risk.';
---
<footer class="border-t border-primary-100 pt-6 mt-10 max-w-prose-drhd mx-auto">
  <p class="text-ink-muted text-xs leading-relaxed">{text}</p>
</footer>
```

### 4.10 Footer / LocalLayer — v4

> Full visual spec in UX v3 §4.4. Unchanged from v4:

```astro
---
// src/components/footer/LocalLayer.astro
import { location } from '../../config/location';

const { lang = 'ar' } = Astro.props;
const isInactive = location.status === 'inactive';
---

{isInactive ? (
  <div class="bg-primary-800 border-t border-primary-600 py-6 px-5 text-center">
    <p class="text-primary-200 text-sm">
      📍 حاليًا نقدم خدمات استشارية عن بُعد — للحالات العاجلة تواصل واتساب
    </p>
    <a
      href={`https://wa.me/${location.whatsapp_number}`}
      class="inline-block mt-3 text-white underline text-sm"
    >
      💬 {lang === 'ar' ? 'تواصل واتساب' : 'Contact WhatsApp'}
    </a>
  </div>
) : (
  <div class="bg-primary-800 border-t border-primary-600 py-6 px-5">
    <p class="text-primary-300 text-xs mb-2">
      📍 {lang === 'ar' ? 'حاليًا نقدم خدماتنا في:' : 'Currently serving at:'}
    </p>
    <p class="text-white font-heading font-bold">
      {location.short_address}
    </p>
    <p class="text-primary-200 text-sm mt-1">
      {location.full_address}
    </p>
    <div class="flex gap-4 mt-3 text-sm">
      <a href={`https://wa.me/${location.whatsapp_number}`}
         class="text-primary-200 hover:text-white">
        💬 واتساب
      </a>
      <a href={location.map_embed_url} target="_blank" rel="noopener"
         class="text-primary-200 hover:text-white">
        🗺️ {lang === 'ar' ? 'الخريطة' : 'Map'}
      </a>
    </div>
  </div>
)}
```

### 4.11 Location Config — EXPANDED v4.2

```ts
// src/config/location.ts — v4.2
// ═══════════════════════════════════════════════════════════════
// SINGLE SOURCE OF TRUTH for all location + component text data.
// When changing location, update ONLY this file.
//
// Components that read from this file:
//   - GentleNote.astro       (نصوص + عنوان)
//   - FloatingWhatsApp.astro (رقم واتساب)
//   - PanicButton.astro      (رقم واتساب)
//   - Footer/LocalLayer.astro (سطر واحد)
//   - /contact/ page         (كل البيانات)
//   - /jeddah/ page          (كل البيانات + كلمات مفتاحية)
//   - SchemaLocalBusiness    (الإحداثيات والعنوان)
//
// When moving to a new location:
//   → تعديل ملف واحد → كل الموقع يتحدث تلقائياً.
// ═══════════════════════════════════════════════════════════════

export interface LocationConfig {
  // البيانات الأساسية
  city: string;              // "جدة"
  neighborhood: string;      // "حي الشرفية"
  street: string;            // "شارع خالد بن الوليد"
  landmark: string;          // "داخل مركز الفارس للكمبيوتر"
  full_address: string;      // العنوان الكامل (سطر واحد)
  short_address: string;     // "مركزنا في جدة — حي الشرفية"

  // بيانات الاتصال
  whatsapp_number: string;   // "966XXXXXXXXX"
  map_embed_url: string;     // رابط خرائط جوجل

  // ساعات العمل
  working_hours: {
    weekdays: string;        // "السبت-الخميس: 9ص-10م"
    friday: string;          // "الجمعة: مغلق" أو "4م-10م"
  };

  // Schema Markup
  coordinates: {
    lat: number;
    lng: number;
  };

  // نصوص GentleNote (لكل category — تُكمل القاموس الداخلي)
  gentle_notes: {
    [key: string]: string;   // category → نص مخصص
  };

  // الكلمات المفتاحية المحلية (لصفحة /jeddah/)
  local_keywords: string[];

  status: 'active' | 'inactive';
}

export const location: LocationConfig = {
  status: 'active',

  city: 'جدة',
  neighborhood: 'حي الشرفية',
  street: 'شارع خالد بن الوليد',
  landmark: 'داخل مركز الفارس للكمبيوتر',
  full_address: 'شارع خالد بن الوليد، حي الشرفية، جدة — داخل مركز الفارس للكمبيوتر',
  short_address: 'مركزنا في جدة — حي الشرفية',

  whatsapp_number: '966XXXXXXXXX',
  map_embed_url: 'https://maps.google.com/?q=21.4858,39.1925',

  working_hours: {
    weekdays: 'السبت–الخميس: 9:00ص – 10:00م',
    friday: 'الجمعة: مغلق',
  },

  coordinates: {
    lat: 21.4858,
    lng: 39.1925,
  },

  // نصوص GentleNote المخصصة للمكان
  // هذه تُكمل القاموس الداخلي في GentleNote.astro
  // مفيدة لو عايز تغير النبرة بدون تعديل كود المكون
  gentle_notes: {
    hdd: 'لو الهارد عمل مشكلة، بلاش تجرب بنفسك.',
    ssd: 'مشاكل الـ SSD غالباً بتحتاج أدوات متخصصة.',
    raid: 'لو السيرفر وقع، ما تحاولش تعمل rebuild بنفسك.',
    flash: 'لو الفلاشة مش شغالة، ما تعملش فورمات.',
    general: 'لو محتاج مساعدة متخصصة في استعادة البيانات.',
  },

  // كلمات مفتاحية لصفحة /jeddah/
  local_keywords: [
    'استعادة بيانات جدة',
    'استرجاع بيانات هارد ديسك جدة',
    'مركز صيانة هارد ديسك جدة',
    'data recovery jeddah',
    'استعادة ملفات محذوفة جدة',
    'إصلاح هارد ديسك جدة',
    'فورمات هارد جدة',
  ],
};
```

**ما تغير عن v4:**

| التغيير | السبب |
|:--------|:------|
| Interface أبسط وأوضح (عربي مباشر) | تسهيل التعديل لغير المبرمجين |
| `gentle_notes` dictionary جديد | GentleNote يقرأ منه بدل hardcoded |
| `local_keywords` array جديد | صفحة `/jeddah/` SEO |
| `short_address` جديد | يُستخدم في GentleNote و Footer |
| `working_hours` مبسط | أوضح من الشكل السابق |
| حُذفت الحقول الإنجليزية | المكان عربي — الإنجليزي يُترجم في المكون |

---

## 5. هندسة الأرشفة التقنية (Technical SEO Architecture)

### 5.1 Sitemap & Robots.txt

> **Sitemap:** Unchanged from v3 EXCEPT hreflang removed (see §1.1).
> **Robots.txt:** Unchanged from v3.

### 5.2 البيانات المنظمة (Schema) — UPDATED v4.2

#### Layout / BaseLayout.astro — UPDATED v4.2

> **[v4.2] Changes from v4:**
> - `PanicButton` → `FloatingWhatsApp` (global UI)
> - PanicButton and GentleNote now injected by ArticleLayout, not BaseLayout

```astro
---
// src/layouts/BaseLayout.astro — v4.2
import SchemaLocalBusiness from '../components/seo/SchemaLocalBusiness.astro';
import SchemaBreadcrumb from '../components/seo/SchemaBreadcrumb.astro';
import SchemaService from '../components/seo/SchemaService.astro';
import SchemaFAQ from '../components/seo/SchemaFAQ.astro';
import HreflangTags from '../components/seo/HreflangTags.astro';
import FloatingWhatsApp from '../components/ui/FloatingWhatsApp.astro';
import Footer from '../components/footer/Footer.astro';

interface Props {
  title: string;
  description: string;
  lang?: 'ar' | 'en';
  ogImage?: string;
  canonicalURL?: string;
  pageType?: 'home' | 'service' | 'blog' | 'case' | 'page';
  serviceData?: { name: string; description: string; priceRange?: string };
  faqData?: Array<{ question: string; answer: string }>;
  breadcrumbs?: Array<{ name: string; url: string }>;
  translationID?: string;
}

const {
  title,
  description,
  lang = 'ar',
  ogImage = '/images/brand/og-default.jpg',
  canonicalURL = Astro.url.href,
  pageType = 'page',
  serviceData,
  faqData,
  breadcrumbs,
  translationID,
} = Astro.props;

const dir = lang === 'ar' ? 'rtl' : 'ltr';
const siteURL = import.meta.env.PUBLIC_SITE_URL || 'https://drharddisk.sa';
const fullTitle = `${title} | ${lang === 'ar' ? 'د.هارد ديسك' : 'Dr. Hard Disk'}`;
---

<!doctype html>
<html lang={lang} dir={dir} class="scroll-smooth">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <!-- Primary Meta -->
  <title>{fullTitle}</title>
  <meta name="description" content={description} />
  <link rel="canonical" href={canonicalURL} />

  <!-- OpenGraph -->
  <meta property="og:type" content="website" />
  <meta property="og:title" content={fullTitle} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={`${siteURL}${ogImage}`} />
  <meta property="og:url" content={canonicalURL} />
  <meta property="og:locale" content={lang === 'ar' ? 'ar_SA' : 'en_US'} />

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={fullTitle} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={`${siteURL}${ogImage}`} />

  <!-- Hreflang (SOLE source — not duplicated in sitemap) -->
  <HreflangTags
    currentLang={lang}
    currentPath={Astro.url.pathname}
    translationID={translationID}
  />

  <!-- Structured Data -->
  <SchemaLocalBusiness lang={lang} />
  {breadcrumbs && <SchemaBreadcrumb items={breadcrumbs} />}
  {pageType === 'service' && serviceData && (
    <SchemaService
      name={serviceData.name}
      description={serviceData.description}
      priceRange={serviceData.priceRange}
      lang={lang}
    />
  )}
  {faqData && faqData.length > 0 && <SchemaFAQ items={faqData} />}

  <!-- Fonts: loaded via @fontsource in global.css (UX v3 §5.2) -->

</head>

<body class="bg-page text-ink font-sans antialiased">
  <slot />
  <!-- [v4.2] FloatingWhatsApp replaces old PanicButton as global element -->
  <FloatingWhatsApp />
  <Footer lang={lang} />
</body>
</html>
```

#### 5.2.1 SchemaLocalBusiness — UPDATED v4.2

> **Change:** Reads from expanded `location.ts` (v4.2 interface).

```astro
---
// src/components/seo/SchemaLocalBusiness.astro — v4.2
import { location } from '../../config/location';

interface Props {
  lang: 'ar' | 'en';
}
const { lang } = Astro.props;
const siteURL = import.meta.env.PUBLIC_SITE_URL || 'https://drharddisk.sa';

const schema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${siteURL}/#business`,
  "name": lang === 'ar' ? "د.هارد ديسك" : "Dr Hard Disk",
  "alternateName": "DrHardDisk",
  "description": lang === 'ar'
    ? `مركز متخصص في استعادة البيانات في ${location.city}. خبرة +15 سنة.`
    : `Specialized data recovery center in Jeddah. 15+ years experience.`,
  "url": siteURL,
  "telephone": `+${location.whatsapp_number}`,

  "address": {
    "@type": "PostalAddress",
    "streetAddress": location.street,
    "addressLocality": location.city,
    "addressRegion": "منطقة مكة المكرمة",
    "addressCountry": "SA"
  },

  "geo": {
    "@type": "GeoCoordinates",
    "latitude": location.coordinates.lat,
    "longitude": location.coordinates.lng,
  },

  "areaServed": {
    "@type": "City",
    "name": location.city,
  },

  "priceRange": "$$",
  "currenciesAccepted": "SAR",

  "openingHoursSpecification": [{
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
    "opens": "09:00",
    "closes": "22:00",
  }],

  "image": `${siteURL}/images/brand/og-default.jpg`,
};
---

<script type="application/ld+json" set:html={JSON.stringify(schema)} />
```

#### 5.2.2-4 Schema: Service, Breadcrumb, FAQ

> **SchemaService:** Updated to read `siteURL` from env var. Rest unchanged.
> **SchemaBreadcrumb:** Updated `siteURL` from env var. Rest unchanged.
> **SchemaFAQ:** Unchanged from v3.

#### 5.2.5 Schema للمكونات الجديدة — NEW v4.2

**GentleNote:**
لا يحتاج Schema (ليس CTA تقليدي).

**HeroCards:**
لا Schema خاص. الكروت navigation elements.

**FloatingWhatsApp:**
لا Schema خاص.

**Cases (قصص النجاح):**

```astro
---
// يُضاف في صفحة /cases/[slug].astro
const caseSchema = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "headline": entry.data.title,
  "articleBody": entry.data.problem + " " + entry.data.solution,
  "about": {
    "@type": "Service",
    "name": "Data Recovery",
    "provider": {
      "@type": "LocalBusiness",
      "@id": `${siteURL}/#business`
    }
  },
  "datePublished": entry.data.date,
};
---
<script type="application/ld+json" set:html={JSON.stringify(caseSchema)} />
```

**LocalBusiness (ملخص — يقرأ من location.ts):**

```json
{
  "@type": "LocalBusiness",
  "name": "Dr. Hard Disk",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "[from location.street]",
    "addressLocality": "[from location.city]"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "[from location.coordinates.lat]",
    "longitude": "[from location.coordinates.lng]"
  },
  "openingHours": "[from location.working_hours]",
  "telephone": "[from location.whatsapp_number]"
}
```

### 5.3 Hreflang — UPDATED v4

> **Critical change:** `translationSlug` → `translationID`.
> Logic otherwise unchanged.

```astro
---
// src/components/seo/HreflangTags.astro — v4
interface Props {
  currentLang: 'ar' | 'en';
  currentPath: string;
  translationID?: string;
}

const { currentLang, currentPath, translationID } = Astro.props;
const siteURL = import.meta.env.PUBLIC_SITE_URL || 'https://drharddisk.sa';

const cleanPath = currentPath.startsWith('/en/')
  ? currentPath.replace(/^\/en/, '')
  : currentPath;

const arPath = cleanPath === '/' ? '/' : cleanPath;
const enPath = `/en${cleanPath === '/' ? '/' : cleanPath}`;

let finalArURL = `${siteURL}${arPath}`;
let finalEnURL = `${siteURL}${enPath}`;

if (translationID) {
  const pageType = currentPath.match(/\/(blog|services|cases)\//)?.[1];
  if (pageType) {
    if (currentLang === 'ar') {
      finalEnURL = `${siteURL}/en/${pageType}/${translationID}/`;
    } else {
      finalArURL = `${siteURL}/${pageType}/${translationID}/`;
    }
  }
}
---

<link rel="alternate" hreflang="ar-SA" href={finalArURL} />
<link rel="alternate" hreflang="en-US" href={finalEnURL} />
<link rel="alternate" hreflang="x-default" href={finalArURL} />
```

### 5.4 تحسينات الأداء

#### 5.4.0 ميزات Cloudflare المجانية

> Unchanged from v3.

#### `_headers` File

> Unchanged from v3.

#### 5.4.1 تحسين الصور — UPDATED v4

> **Change:** Images in `src/assets/images/` instead of `public/images/`.

```astro
---
import { Image } from 'astro:assets';

const beforeSrc = `../../assets/images/cases/${entry.data.beforeImage}`;
const afterSrc = `../../assets/images/cases/${entry.data.afterImage}`;
---

<section class="grid grid-cols-1 md:grid-cols-2 gap-6">
  <div>
    <h3 class="text-lg font-bold mb-2">
      {lang === 'ar' ? 'قبل الإصلاح' : 'Before Recovery'}
    </h3>
    <Image
      src={import(beforeSrc)}
      alt={lang === 'ar' ? 'صورة العطل' : 'Failure image'}
      width={600}
      height={400}
      format="webp"
      quality={80}
      loading="lazy"
      class="rounded-card shadow-card w-full"
    />
  </div>
  <div>
    <h3 class="text-lg font-bold mb-2">
      {lang === 'ar' ? 'بعد الاستعادة' : 'After Recovery'}
    </h3>
    <Image
      src={import(afterSrc)}
      alt={lang === 'ar' ? 'الملفات المستعادة' : 'Recovered files'}
      width={600}
      height={400}
      format="webp"
      quality={80}
      loading="lazy"
      class="rounded-card shadow-card w-full"
    />
  </div>
</section>
```

#### 5.4.2 تحسين الخطوط — UPDATED v4

> **Change:** `font-display: swap` → `font-display: optional` (Risk S-3, UX v3 §3.1)

**The font strategy is defined in UX v3 §3.1 and §5.2.**

1. **Fonts are self-hosted via `@fontsource`** (in `global.css`):

```css
/* src/styles/global.css — font section */
@import '@fontsource-variable/inter';
@import '@fontsource/tajawal/400.css';
@import '@fontsource/tajawal/500.css';
@import '@fontsource/tajawal/700.css';

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

2. **Tailwind config references CSS variables set by `[lang]` selectors:**

```
The complete tailwind.config.mjs is defined in UX v3 §5.3.
TAD does not duplicate it. The config file in the project root
IS the UX v3 config.
```

#### 5.4.3 Core Web Vitals Summary — UPDATED v4

| المقياس | الهدف | الاستراتيجية | Cloudflare |
|---|---|---|---|
| **LCP** | < 2.5s | `fetchpriority="high"` on hero + `@fontsource` self-hosted | Early Hints + Edge Cache |
| **CLS** | < 0.1 | `font-display: optional` + fallback metrics (zero CLS) | Fonts cached on edge |
| **INP** | < 200ms | Astro Islands — zero JS by default | HTTP/3 + QUIC |
| **TTFB** | < 20ms | SSG — static HTML from CDN | Jeddah/Riyadh edge nodes |

#### 5.4.4 أوامر التحقق

> Unchanged from v3.

---

## 6. الصفحات — UPDATED v4.2

### 6.1 الصفحة الرئيسية — UPDATED v4.2

**المسار:** `src/pages/index.astro`

**المكونات المستخدمة (بالترتيب):**
1. `HeroCards.astro` — شبكة 8 كروت تفاعلية
2. `SuccessStories.astro` — 3 قصص نجاح
3. `ReelsStrip.astro` — فيديوهات سوشيال ميديا

**ملاحظة:** لا يظهر `GentleNote` أو `PanicButton` في الصفحة الرئيسية.

### 6.2 /cases/ (قصص النجاح) — NEW v4.2

**المسار:** `src/pages/cases/index.astro`

**الوصف:**
صفحة قائمة تعرض كل قصص النجاح في شبكة كروت.

**Data Source:** `src/content/cases/*.md`

**تصميم الكارت:**
- أيقونة الجهاز (حسب `device_type`)
- عنوان القصة
- سطر المشكلة
- سطر النتيجة
- Badge ملون (نجاح ✅ أو تحدي 💪)

**الصفحة الداخلية:** `/cases/[slug]/`

تصميم مشابه للمقال لكن ببنية مختلفة:
1. **المشكلة** — ماذا حدث
2. **التحدي** — لماذا كانت الحالة صعبة
3. **الحل** — ماذا فعلنا
4. **النتيجة** — نسبة الاستعادة والتفاصيل
5. **الدروس** — نصائح للقارئ

**Schema:** `TechArticle` + `Service` (see §5.2.5)

### 6.3 /jeddah/ (SEO محلي) — UPDATED v4.2

**المسار:** `src/pages/jeddah/index.astro`

**الوصف:**
صفحة SEO محلية **لا تظهر في Navigation**. مخصصة لاستهداف كلمات "استعادة بيانات جدة".

**البيانات:**
تقرأ **كل شيء** من `location.ts`:
- العنوان الكامل والمختصر
- الخريطة (`map_embed_url`)
- ساعات العمل (`working_hours`)
- الكلمات المفتاحية (`local_keywords`)
- الإحداثيات (`coordinates`)

**Schema:**
`LocalBusiness` + `Service` (data recovery in Jeddah).

**ملاحظة:**
عند الانتقال للرياض: تُنشأ صفحة `/riyadh/` جديدة، وتبقى `/jeddah/` بتعديل بسيط ("كنا نخدمكم في جدة").

---

## 7. Static Assets — UPDATED v4.2

### 7.1 src/assets/images/ui/ (صور الواجهة — AI-generated)

**كروت Hero (8 صور — 400×400):**

| الملف | الوصف |
|:------|:------|
| `card-hdd.webp` | Hard disk drive مفتوح |
| `card-ssd.webp` | 2.5" SSD |
| `card-nvme.webp` | NVMe M.2 stick |
| `card-sdcard.webp` | SD cards collection |
| `card-flash.webp` | USB flash drive |
| `card-dvr.webp` | DVR device |
| `card-raid.webp` | Server RAID array |
| `card-contact.webp` | Dr. Hard Disk caricature |

**صور الأجهزة (3 صور — 800×500):**

| الملف | الوصف |
|:------|:------|
| `about-pc3000.webp` | PC-3000 device |
| `about-mrt.webp` | MRT Ultra system |
| `about-cleanroom.webp` | Clean room environment |

**صور المقالات (حسب الحاجة — 1200×630):**

| الملف | الوصف |
|:------|:------|
| `hero-clicking-drive.webp` | مقال صوت الطقطقة |
| `hero-format-recovery.webp` | مقال استعادة الفورمات |
| `hero-freezer-myth.webp` | مقال خرافة الفريزر |

> **ملاحظة:** كل الصور تُولّد بالذكاء الاصطناعي (AI-generated). لا صور شخصية.

### 7.2 public/images/brand/

> Unchanged from v4:
- `logo.svg` — شعار الموقع
- `og-default.jpg` — صورة OG الافتراضية

---

## 8. Build-Time Validation Scripts — v4

### 8.1 Translation Parity Validator

> Required by Risk S-1 and A-3.

```ts
// scripts/validate-translations.ts
import { readdir } from 'fs/promises';
import { join } from 'path';

const CONTENT_DIRS = ['posts', 'services', 'cases'];
const CONTENT_BASE = 'src/content';

async function validate() {
  let errors = 0;

  for (const dir of CONTENT_DIRS) {
    const arDir = join(CONTENT_BASE, dir, 'ar');
    const enDir = join(CONTENT_BASE, dir, 'en');

    let arFiles: string[] = [];
    let enFiles: string[] = [];

    try { arFiles = await readdir(arDir); } catch { /* dir may not exist yet */ }
    try { enFiles = await readdir(enDir); } catch { /* dir may not exist yet */ }

    const arSlugs = new Set(arFiles.map(f => f.replace(/\.(mdx|mdoc)$/, '')));
    const enSlugs = new Set(enFiles.map(f => f.replace(/\.(mdx|mdoc)$/, '')));

    for (const slug of arSlugs) {
      if (!enSlugs.has(slug)) {
        console.error(`❌ Missing EN translation: ${dir}/en/${slug}`);
        errors++;
      }
    }

    for (const slug of enSlugs) {
      if (!arSlugs.has(slug)) {
        console.error(`❌ Missing AR translation: ${dir}/ar/${slug}`);
        errors++;
      }
    }
  }

  if (errors > 0) {
    console.error(`\n🚫 ${errors} translation parity errors found. Fix before deploying.`);
    process.exit(1);
  } else {
    console.log('✅ All translation pairs are complete.');
  }
}

validate();
```

**Add to `package.json`:**

```json
{
  "scripts": {
    "validate:i18n": "tsx scripts/validate-translations.ts",
    "prebuild": "npm run validate:i18n",
    "build": "astro build"
  }
}
```

---

## 9. تسليمات المبرمج (Developer Checklist) — UPDATED v4.2

```
الأولوية 0 (قبل أي كود):
  ☐ Domain: verify .sa eligibility OR register .com fallback
  ☐ Set PUBLIC_SITE_URL in .env and Cloudflare Pages dashboard
  ☐ Create Cloudflare Pages project → connect to GitHub
  ☐ Create wrangler.toml with nodejs_compat
  ☐ Decide image storage: src/assets/ for build-time (recommended)

الأولوية 1 (يوم 1-2):
  ☐ Set up Astro v5 with astro.config.mjs (§1.1)
  ☐ Apply folder structure (§2) — including all new directories
  ☐ Configure Content Collections with posts + cases schemas (§3)
  ☐ Create src/config/location.ts with full v4.2 interface (§4.11)
  ☐ Install @fontsource packages (Inter Variable + Tajawal)
  ☐ Set up global.css with font imports + fallback metrics (UX v3 §5.2)
  ☐ Set up tailwind.config.mjs from UX v3 §5.3
  ☐ Create BaseLayout.astro with FloatingWhatsApp (§5.2)

الأولوية 2 (يوم 3-4):
  ☐ Build FloatingWhatsApp.astro (§4.2) — global UI
  ☐ Build PanicButton.astro (§4.3) — MDX component for critical articles
  ☐ Build GentleNote.astro (§4.4) — replaces CallToAction
  ☐ Build WarningBox.astro (§4.8)
  ☐ Build ArticleDisclaimer.astro (§4.9)
  ☐ Build Footer.astro + LocalLayer.astro (§4.10)
  ☐ Implement Schema components (§5.2.1-5) — reading from location.ts
  ☐ Implement HreflangTags.astro (§5.3) — SOLE hreflang source
  ☐ Place robots.txt and _headers in /public/

الأولوية 3 (يوم 5-6):
  ☐ Build HeroCards.astro (§4.5) — homepage hero
  ☐ Build ReelsStrip.astro (§4.6) — homepage social section
  ☐ Build SuccessStories.astro (§4.7) — homepage cases section
  ☐ Create /cases/ index + [slug] pages (§6.2)
  ☐ Create /jeddah/ local SEO page (§6.3)
  ☐ Generate AI images for Hero Cards (8 images — 400×400)
  ☐ Generate AI images for equipment (3 images — 800×500)

الأولوية 4 (يوم 7-8):
  ☐ Create validate-translations.ts script (§8.1)
  ☐ Create privacy.astro + terms.astro pages
  ☐ Set up GitHub Actions CI (build + wrangler dry-run + i18n validation)
  ☐ First deployment to Cloudflare Pages

التحقق النهائي:
  ☐ Google Rich Results Test → no errors
  ☐ PageSpeed Mobile → 95+
  ☐ Lighthouse CLS → < 0.1 (font-display: optional working)
  ☐ Hreflang validator → no conflicts, single source
  ☐ robots.txt → admin paths blocked
  ☐ sitemap → NO hreflang tags (only URLs)
  ☐ Location swap test: change location.ts → verify <1 hour
  ☐ RTL/LTR test: every component renders correctly in both directions
  ☐ GentleNote appears before last paragraph in articles (not homepage)
  ☐ GentleNote text changes per category correctly
  ☐ FloatingWhatsApp appears after hero scroll on all pages
  ☐ FloatingWhatsApp is 40px circle, no text, no pulse
  ☐ PanicButton appears after first H2 on critical articles only
  ☐ PanicButton is full-width strip (not floating)
  ☐ HeroCards 8 cards render in 4×2 grid (desktop) / 2×4 (mobile)
  ☐ HeroCards stagger animation works
  ☐ ReelsStrip horizontal scroll on mobile
  ☐ SuccessStories reads from cases collection (3 latest)
  ☐ /cases/ page lists all case studies
  ☐ /jeddah/ page reads from location.ts (not hardcoded)
  ☐ WarningBox appears on difficulty: critical articles
  ☐ ArticleDisclaimer appears on ALL knowledge articles
  ☐ Edge TTFB from Jeddah → < 20ms
  ☐ All AI-generated images present and optimized
```

---

## Appendix A: Reference Commands — UPDATED v4.2

```bash
# 1. Create project
npm create astro@latest -- --template onwidget/astrowind

# 2. Install core dependencies
npm install @astrojs/cloudflare

# 3. Install dev tools
npm install -D wrangler lightningcss tsx

# 4. Install fonts (self-hosted — UX v3 §3.1)
npm install @fontsource-variable/inter @fontsource/tajawal

# 5. Install Tailwind typography plugin
npm install -D @tailwindcss/typography

# 6. All-in-one:
npm install @astrojs/cloudflare @fontsource-variable/inter @fontsource/tajawal && npm install -D wrangler lightningcss tsx @tailwindcss/typography
```

---

## Appendix B: Relationship Between TAD and Other Documents

| Concern | Source of Truth | TAD's Role |
|:--------|:---------------|:-----------|
| Design values (colors, fonts, spacing) | **UX v3** (§5.3 config) | References UX, does not duplicate |
| Tailwind config file | **UX v3** | TAD may add build-specific settings only |
| Font loading strategy | **UX v3** (§3.1) | TAD implements in global.css |
| Component visual specs | **UX v3** (§4) | TAD implements the code |
| Content fields and structure | **Content Plan (07)** | TAD implements in Content Collections schema |
| SEO keyword strategy | **SEO Strategy (06)** | TAD implements Schema markup |
| Risk mitigations | **Risk v3 (02)** | TAD implements technical fixes |
| Page requirements | **PRD v3 (03)** | TAD implements page structure |
| Strategic direction | **Vision v2 (01)** | TAD serves the portable brand model |

---

## Appendix C: Component Injection Rules — NEW v4.2

> Summary of which components appear where and how they're triggered.

| المكون | أين يظهر | شرط الظهور | طريقة الحقن |
|:-------|:---------|:-----------|:------------|
| **FloatingWhatsApp** | كل الموقع | دائماً (بعد سكرول Hero) | BaseLayout |
| **GentleNote** | مقالات + خدمات | دائماً (قبل آخر فقرة) | ArticleLayout auto-inject |
| **PanicButton** | مقالات critical | `difficulty: critical` | ArticleLayout auto-inject بعد أول H2 |
| **WarningBox** | مقالات critical | `difficulty: critical` | ArticleLayout auto-inject / MDX manual |
| **ArticleDisclaimer** | كل المقالات | دائماً | ArticleLayout |
| **HeroCards** | الصفحة الرئيسية فقط | — | index.astro |
| **ReelsStrip** | الصفحة الرئيسية فقط | — | index.astro |
| **SuccessStories** | الصفحة الرئيسية فقط | — | index.astro |

**لا يظهر في الصفحة الرئيسية:** GentleNote, PanicButton, WarningBox, ArticleDisclaimer.
**لا يظهر في About:** GentleNote, PanicButton.

---

> **End of Document — TAD v4.2**
>
> **Key principle carried from Vision v2.0:**
> Every technical decision serves the portable brand model.
> The `location.ts` file is the atomic unit of location change.
> Everything else — content, SEO authority, brand — is permanent.
>
> **Key principle carried from Risk v3.0:**
> Pre-render everything. SSR nothing. Keep it static.
> The best system for a solo operator is one that runs without him.
>
> **Key principle from v4.2:**
> Components serve the user's context, not conversion pressure.
> GentleNote informs. PanicButton rescues. FloatingWhatsApp waits quietly.