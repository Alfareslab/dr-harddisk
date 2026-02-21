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
- **Phase 2.2 — First 5 English Articles (2026-02-22)**
  - Translated all 5 Arabic articles to English (`en-hdd-clicking`, `en-ssd-not-detected`, `en-usb-format`, `en-mobile-recovery`, `en-ransomware-recovery`).
  - Implemented bilingual mapping using the `translationID` frontmatter.
- **Phase 2.1 — First 5 Arabic Articles (2026-02-21)**
  - `src/content/posts/hdd-clicking-sound.mdx` (Moderate, HDD category)
  - `src/content/posts/ssd-not-detected.mdx` (Moderate, SSD category)
  - `src/content/posts/usb-format-error.mdx` (Simple, Flash category)
  - `src/content/posts/mobile-data-recovery.mdx` (Critical, Mobile category)
  - `src/content/posts/ransomware-recovery.mdx` (Critical, General category)
  - Generated dummy hero images for the new articles inside `src/assets/images/posts/`.

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

### Added (Phase 1.5 — 2026-02-19)
- `src/layouts/PostLayout.astro`: Article layout with RTL/LTR, Hero Image, Prose typography
- `src/pages/posts/[slug].astro`: Dynamic route for Arabic articles (lang filter)
- `src/pages/en/posts/[slug].astro`: Dynamic route for English articles (lang filter)
- `src/content/posts/ar-test-hdd-clicking.mdx`: Arabic test article with GentleNote
- `src/content/posts/en-test-hdd-clicking.mdx`: English test article with GentleNote
- `src/assets/images/placeholder.svg`: Placeholder hero image for testing

### Added (Phase 1.6 — 2026-02-21)
- `.specify/`: Directory for GitHub Spec-Kit tooling (Templates and Core logic)
- Intialized Spec-Kit for Spec-Driven Development.

### Changed (Phase 1.6 — 2026-02-21)
- `project-context.md`: Updated project memory for Phase 1.6 completion.
- `project-key.md`: Added `.specify/` dir to project tree index.

### Changed (Phase 1.5 — 2026-02-19)
- `astro.config.mjs`: Added `@astrojs/mdx` integration
- `package.json`: Added `sharp` and `@astrojs/mdx` dependencies

### Fixed (Phase 1.4E — 2026-02-19)
- `src/layouts/BaseLayout.astro`: TypeError: Invalid URL when `brand.siteUrl` is empty (added `siteBase` fallback to `Astro.url.origin`)

### Fixed (Phase 1.5 — 2026-02-21)
- `src/pages/*/posts/[slug].astro`: Excluded draft posts from build step.
- `src/layouts/PostLayout.astro`: Improved `heroImage` path validation with console warning, and refined `pubDate` locale string (`ar-SA`/`en-US`).
- `.coderabbit.yaml`: Moved `knowledge_base` custom rules to `reviews.instructions` to fix parsing error.

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
