# 📝 سجل التغييرات (Changelog)

> جميع التغييرات الملحوظة في هذا المشروع ستُوثّق في هذا الملف.
>
> يتبع هذا الملف معيار:
>
> [Keep a Changelog](https://keepachangelog.com/)
>
> ونظام الترقيم:
>
> [Semantic Versioning](https://semver.org/)

---

## [Unreleased]

### Added
- **Phase 1.2 — Core Components (2026-02-18)**
  - `src/config/location.ts`: Brand/Location separation (Atomic Core)
  - `src/content/config.ts`: Zod schemas (posts, services, cases) — Astro v5 API
  - `src/layouts/BaseLayout.astro`: ISO-compliant root layout (SEO + RTL/LTR + Fonts)
  - `src/components/content/GentleNote.astro`: Knowledge-first soft CTA component
- **Phase 1.3 — Page Templates (2026-02-19)**
  - `src/pages/index.astro`: Homepage Arabic (RTL, 8 emoji cards, brand-only data)
  - `src/pages/en/index.astro`: Homepage English (LTR mirror)
  - `src/pages/contact.astro`: Contact page (WhatsApp + Location from currentLocation)
  - `src/pages/404.astro`: Bilingual 404 page (brand-only, no location data)

### Fixed
- `.coderabbit.yaml`: Fixed YAML schema parsing error — moved `knowledge_base` rules to `reviews.instructions`, moved `path_instructions` under `reviews`, restructured `knowledge_base` as proper object (2026-02-19)

---

## [0.1.0] - [DATE]

### Added
- Initial project setup

---

> **تذكير:** هذا الملف يتحدث مع كل تغيير فعلي في الكود.
> 📎 راجع بروتوكول التوثيق في:
>
> `master-constitution.md` → قسم 4
