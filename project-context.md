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
- **CodeRabbit PR #4 Fixes** — Addressed all minor issues, nitpicks, and fixed the language switcher mapping & homepage placeholders.

### 🔄 قيد العمل:
- لا يوجد حالياً.

### ⏭️ الخطوة التالية:
- بدء Phase 3.1 (Service Details Pages).

✅ **تم الانتهاء للتو من:** إصلاحات CodeRabbit لـ PR #4 وتفعيل مبدل اللغات (Language Switcher) بين المقالات المترجمة بدقة، بالإضافة لإظهار المقالات ديناميكياً في الصفحة الرئيسية العربية والإنجليزية.

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
