# 🗺️ Phase 2.4 Completion: English Service Pages + Navigation Linkage
> **Version:** 1.0.0
> **Date:** 2026-02-23
> **Methodology:** Multi-Model Development
> **Depends On:** Phase 2.4 Stage 2 (Arabic Service Pages) ✅

---

## 🎯 Overall Goal
Complete Phase 2.4 by creating 5 English service pages (mirroring the Arabic versions),
adding the English dynamic route, and linking the services into the navigation (NavBar + Homepage).

---

## 📄 Current State (What Already Exists)

| Item | Status |
|:-----|:------:|
| `src/content/services/ar/*.mdx` (5 files) | ✅ Done |
| `src/pages/services/[slug].astro` (Arabic route) | ✅ Done |
| `src/content/services/en/*.mdx` (5 files) | ❌ Not created |
| `src/pages/en/services/[slug].astro` (English route) | ❌ Not created |
| NavBar linkage to services | ❌ Not done |

---

## 📅 Execution Phases

### **Phase 1: English Service Content (5 MDX files) 🇬🇧**
> **Model:** `Gemini Flash` 🟢
> **Goal:** Create 5 English MDX files mirroring the Arabic versions.
> **Depends On:** Arabic content ✅

| Exec | Review | Task |
| :---: | :---: | :--- |
| `[ ]` | `[ ]` | Create `src/content/services/en/hdd-data-recovery.mdx` (matching `translationID`) |
| `[ ]` | `[ ]` | Create `src/content/services/en/external-hdd-recovery.mdx` |
| `[ ]` | `[ ]` | Create `src/content/services/en/raid-server-recovery.mdx` |
| `[ ]` | `[ ]` | Create `src/content/services/en/ssd-nvme-recovery.mdx` |
| `[ ]` | `[ ]` | Create `src/content/services/en/flash-sd-card-recovery.mdx` |

**🔄 Prompt:**
```
Phase 2.4 — English Service Pages.

Read these files first:
1. plans/11-service-pages-english.md — this plan
2. src/content/services/ar/*.mdx — the 5 Arabic sources to mirror
3. src/content.config.ts — schema validation rules
4. src/pages/services/[slug].astro — existing Arabic route (reference)

Create 5 English MDX files in src/content/services/en/.
Each file must:
- Have the SAME translationID as the Arabic twin
- Set lang: "en"
- Match all frontmatter fields (category, brands, symptoms, difficulty)
- Be a professional English translation (NOT a literal word-for-word copy)
- Use heroImage paths pointing to the same SVGs in ../../assets/images/services/

Run: cmd /c pnpm build — to verify.

Rules:
- All code comments in English.
- No sales language ("call now", "free diagnosis", "100% guaranteed").
- Follow existing schema constraints (max 3 brands, valid symptoms only).
```

---

### **Phase 2: English Dynamic Route 🛤️**
> **Model:** `Gemini Flash` 🟢
> **Goal:** Create the English services dynamic route page.
> **Depends On:** Phase 1 ✅

| Exec | Review | Task |
| :---: | :---: | :--- |
| `[ ]` | `[ ]` | Create `src/pages/en/services/[slug].astro` (filter `lang === "en"`) |
| `[ ]` | `[ ]` | Verify build: `cmd /c pnpm build` |

**🔄 Prompt:**
```
Phase 2.4 — English Service Route.

Read: src/pages/services/[slug].astro (Arabic version).
Create: src/pages/en/services/[slug].astro mirroring it but filtering for lang === "en".
Run: cmd /c pnpm build — to verify.
```

---

### **Phase 3: Navigation Linkage + hreflang ✅**
> **Model:** `Gemini Pro` 🟠
> **Goal:** Link services to NavBar and add hreflang cross-references.
> **Depends On:** Phase 2 ✅

| Exec | Review | Task |
| :---: | :---: | :--- |
| `[ ]` | `[ ]` | Add "الخدمات" / "Services" link to `NavBar.astro` |
| `[ ]` | `[ ]` | Add hreflang tags linking AR ↔ EN service pages |
| `[ ]` | `[ ]` | Final build + visual verification: `cmd /c pnpm build` |

**🔄 Prompt:**
```
Phase 2.4 — Navigation Linkage.

Read:
1. src/components/layout/NavBar.astro
2. src/pages/services/[slug].astro
3. src/pages/en/services/[slug].astro

Tasks:
1. Add "الخدمات" (AR) / "Services" (EN) as a NavBar link.
2. Add hreflang alternate links between AR and EN service pages.
3. Run: cmd /c pnpm build
4. Visual verify on dev server if possible.
```

---

## 🚪 Pre-Implementation Gates

### 🚪 Simplicity Gate:
- [x] Solution uses minimum files: 5 EN MDX + 1 route + 1 edit (NavBar)
- [x] No "future improvements" or "might need later"
- [x] Every technical decision has a clear reason

### 🚪 No-Abstraction Gate:
- [x] Using Astro framework directly
- [x] No extra abstraction layers
- [x] Reusing existing components (PostLayout, GentleNote)

### 🚪 Clarity Gate:
- [x] Requirements 100% clear from master plan
- [x] No `[needs clarification]` items pending

---

## 📊 Model & Phase Summary

| Phase | Model | Files | Risk |
|:------|:------|:------|:-----|
| 1. English Content | `Gemini Flash` 🟢 | 5 MDX files | Low — mirror work |
| 2. English Route | `Gemini Flash` 🟢 | 1 Astro page | Low — copy + filter change |
| 3. NavBar Linkage | `Gemini Pro` 🟠 | NavBar edit + hreflang | Low — small edit |

---

## 🐰 CodeRabbit Review

> **Required: ✅ Yes** — Phase 2.4 touches `src/` files (pages, components, content).
> Per the master plan CodeRabbit Gate Rules, any phase modifying `src/` requires a PR review.

**Workflow:**
1. Complete all 3 phases on `feature/phase-2.4-service-pages` branch.
2. Push and open PR to `main`.
3. Wait for CodeRabbit review.
4. Fix any Critical issues → re-push.
5. Merge after Critical = 0.

---

## ✅ Definition of Done

- [ ] 5 English MDX service pages created and rendering.
- [ ] English route at `/en/services/[slug]/` works.
- [ ] AR ↔ EN hreflang tags present on all service pages.
- [ ] NavBar has "الخدمات" / "Services" link.
- [ ] `pnpm build` passes with zero errors.
- [ ] CodeRabbit PR review completed (Critical = 0).
- [ ] Master plan (`plans/00-master-plan.md`) updated: Phase 2.4 → ✅.
