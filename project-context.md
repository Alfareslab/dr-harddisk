# 🧠 ذاكرة المشروع (Project Context)
> **آخر تحديث:** 2026-02-19
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
  - PR: `feature/phase-1.4-global-ui` — CodeRabbit cleared ✅

### 🔄 قيد العمل:
- **Phase 1.5: Article Template** — Code complete, PR pending CodeRabbit review.
  - Branch: `feature/phase-1.5-article-template`
  - Commit: `4d77c45`
  - Added: `PostLayout.astro`, bilingual routes, test MDX, `@astrojs/mdx`, `sharp`

### ⏭️ الخطوة التالية:
- **Phase 1.6: Article Listing** — Posts index page with filtering/categorization.

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
| `process.env` instead of `import.meta.env` in `location.ts` | Switched to `import.meta.env.PUBLIC_SITE_URL` | 2026-02-19 |
| `brand.siteUrl` empty causing TypeError in `BaseLayout.astro` | Added `siteBase = brand.siteUrl \|\| Astro.url.origin` guard | 2026-02-19 |
| `dir-ltr` invalid Tailwind class in `Footer.astro` | Replaced with `dir="ltr"` HTML attribute | 2026-02-19 |
| Content collection posts empty during build | Added `@astrojs/mdx` integration + `sharp` for image optimization | 2026-02-19 |

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
