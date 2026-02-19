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

### Added (Phase 1.3 — 2026-02-18)
- `src/pages/index.astro`: Arabic homepage (RTL, bilingual GentleNote, No Panic UI)
- `src/pages/en/index.astro`: English homepage (LTR mirror)
- `src/pages/contact.astro`: Bilingual contact page with WhatsApp link
- `src/pages/404.astro`: Custom 404 error page (AR/EN)

### Added (Phase 1.4 — 2026-02-19)
- `src/components/layout/NavBar.astro`: Sticky bilingual NavBar (CSS-only mobile toggle)
- `src/components/layout/Footer.astro`: Brand-only dark footer (TikTok, Snapchat, Linktree)
- `src/components/ui/FloatingWhatsApp.astro`: Floating WhatsApp CTA (scroll-based fade-in)
- `reports/02-coderabbit-phase-1.4.md`: CodeRabbit review report for Phase 1.4

### Changed (Phase 1.4 — 2026-02-19)
- `src/layouts/BaseLayout.astro`: Integrated NavBar, Footer, FloatingWhatsApp; added `siteBase` URL guard
- `src/config/location.ts`: Added `version: string` to Brand interface + `version: "0.0.1"` value
- `project-key.md`: Updated file tree to list FloatingWhatsApp.astro under `ui/`

### Fixed (Phase 1.4E — 2026-02-19)
- `src/layouts/BaseLayout.astro`: TypeError: Invalid URL when `brand.siteUrl` is empty (added `siteBase` fallback to `Astro.url.origin`)

### Removed
- 

---

## [0.1.0] - [DATE]

### Added
- Initial project setup

---

> **تذكير:** هذا الملف يتحدث مع كل تغيير فعلي في الكود.
> 📎 راجع بروتوكول التوثيق في:
>
> `master-constitution.md` → قسم 4
