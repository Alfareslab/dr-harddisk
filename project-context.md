# 🧠 ذاكرة المشروع (Project Context)
> **آخر تحديث:** 2026-02-22
> **الإصدار الحالي:** 0.0.1

---

> هذا الملف هو **الذاكرة الحية** للمشروع.
> الوكيل بيقرأه أول ما يدخل محادثة جديدة عشان يفهم الحالة الحالية.
>
> **السؤال اللي بيجاوب عليه:** إيه حالة المشروع؟
> **بيتحدث:** مع كل مهمة.

---

## 1. الرؤية والهدف (Vision & Goal)

> `[وصف المشروع في جملة واحدة: بيعمل إيه ولمين]`

---

## 2. المعمارية والمكونات (Architecture & Components)

| المكون | التقنية | الدور |
|--------|---------|-------|
| `[component]` | `[tech]` | `[role]` |

---

## 3. الحالة الحالية (Current Status)

### ✅ تم:
- **Phase 1.1: Project Skeleton** (Astro v5 + Tailwind v4)
- **Phase 1.2: Core Components** (Location, Content Schemas, BaseLayout, GentleNote)
- **Phase 1.3: Page Templates** (Homepage AR/EN, Contact, 404)
- **Phase 1.4: Global UI** (NavBar, Footer, FloatingWhatsApp + BaseLayout integration)
- **Phase 1.5: Article Template** (PostLayout, MDX support, Bilingual routes)
  - PR: `feature/phase-1.5-article-template` — Merged ✅
- **Phase 1.6: Install Spec-Kit** — Setting up GitHub spec-kit for Spec-Driven Development.
- **Phase 1.7: Article Listing** — Built the bilingual index pages and integrated vanilla JS CategoryFilter.
- **Phase 2.1: Arabic Articles** — Wrote and published the first 5 Arabic articles with metadata.
- **Phase 2.2: English Twins** — Translated the 5 articles to English and ensured seamless language switching.
- **Phase 2.3: About Page** — Built bilingual corporate identity page with Schema.org formatting and NO sales language.
- **Phase 2.4 Planning** — Created the execution plan `11-service-pages-plan.md` based on PRD v4.
- **CodeRabbit PR #4 Fixes** — Addressed all minor issues, nitpicks, and fixed the language switcher mapping & homepage placeholders.
- **Comprehensive Audit** — فحص شامل لمطابقة الكود والرؤية و UX. تقرير: `docs/audits/audit-2026-02-22-comprehensive.md`

### 🔄 قيد العمل:
- Phase 2.4 (Service Pages × 5) - Execution Phase.

### ⏭️ الخطوة التالية:
- تنفيذ المرحلة الأولى من Phase 2.4 (عنصر GentleNote وتجهيز المسارات).
- بعدها: Phase 2.5 (Case Studies Template).

✅ **تم الانتهاء للتو من:** مراجعة استراتيجية شاملة للخطة الكبرى وإضافة 4 مراحل مفقودة (Service Pages, Local Page, Legal Pages, MDX Components) + تصحيح Milestone 2 وتحديث الجدول الزمني.

---

## 4. حالة الميزات (Feature Status)

| الميزة | الحالة | ملاحظات |
|--------|--------|---------|
| `[feature]` | `[✅ / 🔄 / ⏳ / ❌]` | `[notes]` |

---

## 5. المشاكل المعروفة وحلولها (Known Issues)

| المشكلة | الحل المطبّق | التاريخ |
|---------|-------------|---------|
| `.coderabbit.yaml` parsing errors (twice) | Fixed with `path_instructions` `**/*` pattern | 2026-02-19 |
| `.coderabbit.yaml` knowledge_base array error | Fixed by moving rules to `reviews.instructions` | 2026-02-21 |
| `process.env` instead of `import.meta.env` in `location.ts` | Switched to `import.meta.env.PUBLIC_SITE_URL` | 2026-02-19 |
| `brand.siteUrl` empty causing TypeError in `BaseLayout.astro` | Added `siteBase = brand.siteUrl \|\| Astro.url.origin` guard | 2026-02-19 |
| `dir-ltr` invalid Tailwind class in `Footer.astro` | Replaced with `dir="ltr"` HTML attribute | 2026-02-19 |
| Content collection posts empty during build | Added `@astrojs/mdx` integration + `sharp` for image optimization | 2026-02-19 |
| Draft posts being built to static routes | Added `!post.data.draft` filter to `getStaticPaths` | 2026-02-21 |
| Article Title Clipping (AR Homepage) | Added margin-top to section container to clear skewed background pattern | 2026-02-22 |
| ArticleCard Broken Images & Badge Overlap | Fixed glob import path to absolute `/src/assets/...` and normalized frontend string format | 2026-02-22 |
| Crowded Article Cards Text | Added sufficient padding-top to card content wrapper for visual breathing room | 2026-02-22 |
| FloatingWhatsApp Inline Styles | Replaced inline styles with Tailwind classes (`bottom-4 start-4 bg-[#25D366]/70`) | 2026-02-22 |
| Tajawal `font-display` not optional | Overrode `@fontsource` defaults by declaring `@font-face` explicitly | 2026-02-22 |
| Homepage `index.astro` bloated with cards HTML | Extracted Hero grid cards into a dedicated `HeroCard.astro` component | 2026-02-22 |

---

## 6. القائمة السوداء (Blacklist — Failed Solutions)

> ⚠️ الحلول التالية **فشلت** ولا يجب تكرارها:

| الحل الفاشل | لماذا فشل | التاريخ |
|-------------|-----------|---------|
| `[failed_solution]` | `[reason]` | `[date]` |

---

## 7. خريطة الطريق (Roadmap)

### عاجل (Immediate):
- `[task]`

### قريب (Short-term):
- `[task]`

### مستقبلي (Long-term):
- `[task]`

---

## 8. ملاحظات الوكيل (Agent Notes)

> مساحة حرة للوكيل يسجّل ملاحظاته وقراراته المهمة:

```
[PLACEHOLDER — الوكيل يكتب ملاحظاته هنا]
```

---

> **تذكير:** هذا الملف لازم يتحدث مع كل مهمة.
> 📎 راجع بروتوكول التوثيق في:
>
> `master-constitution.md` → قسم 4
