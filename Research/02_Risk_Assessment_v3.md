
# 02_Risk_Assessment_v3.md — Pre-Mortem Risk Analysis
# Datacodex (datacodex.sa)

> **Document Type:** Pre-Mortem Risk Assessment
> **Version:** 3.1 — Aligned with Project Vision v2.0 + Content Tool Spec v1.0
> **Status:** 🔴 Critical — Must review before writing Line 1 of code
> **Methodology:** "Assume it failed. Now explain why."
> **Migration Note:** v3.0 rebuilds Category 3 (Business & Strategic Risks)
> to reflect the solo-operator portable-brand model defined in Vision v2.0.
> Technical (Cat 1), SEO (Cat 2), and Agent (Cat 4) risks retained from v2.0
> with minor language updates. All Vercel references removed in v2.0.
> **v3.1 Update:** Keystatic-related risks (T-1, T-5, T-7) updated to
> "Resolved" / "Mitigated" status following project pivot to Custom Content
> Generator Tool. Two new low-severity risks (T-10, T-11) added.
> See 08_Content_Tool_Spec_v1.0 for context.
> **Last Updated:** 2026-02-16

---

## Premise

It is February 2027. The Datacodex website has **failed to gain traction**.
This document reconstructs what went wrong across four failure domains.

**Who is building this:**
Ahmad Saleh — a data recovery specialist from Egypt (formerly ran GigaSoft,
a data recovery company in Egypt). He now works in Jeddah, Saudi Arabia,
inside مركز الفارس (Al-Fares Computer Maintenance Center) on a
commission-based arrangement (not salaried). He owns a PC-3000 Portable Pro
personally. His contract may end in ~2 years or continue — it is not guaranteed.

**What is being built:**
A static website (Astro + Cloudflare Pages Free) that serves as Ahmad's
portable professional brand. The site is a free knowledge platform for data
recovery + a content marketing channel that generates real clients for
wherever Ahmad is currently working. Budget: zero (domain cost only).
Builder: Ahmad alone, using AI coding tools (Google Antigravity IDE).

**The portable brand model:**
The site has a "local layer" — a small, swappable section that says
"Currently serving at [location]." If Ahmad changes location, only this
layer updates. All content, SEO authority, and brand equity stay intact.

---

## Category 1: Technical & Infrastructure Risks (فخ V8 Isolates)

| # | Risk Scenario | Prob. | Severity | Mitigation Strategy |
| :--- | :--- | :---: | :---: | :--- |
| T-1 | **✅ RESOLVED: CMS Authentication Complexity (January 2025).** Original risk: Keystatic Local Mode required complex GitHub OAuth setup, was difficult to use on mobile, and added unnecessary complexity for a single-operator project. **Resolution:** Keystatic was removed entirely from the tech stack. Replaced with a Custom HTML Content Generator Tool that: (a) runs in any browser (desktop or mobile), (b) requires zero authentication in Phase 1 (ZIP export), (c) requires only a GitHub token in Phase 3 (direct publish), (d) works offline. See `08_Content_Tool_Spec_v1.0` for full specification. **This risk was resolved by root-cause elimination — Keystatic was not fixed, it was removed.** | **High** | **High** | ✅ **RESOLVED.** No mitigation needed — the underlying technology was eliminated from the project. |
| T-2 | **Worker Bundle Size exceeds the 3MB compressed limit.** Cloudflare Workers Free plan enforces a **hard 3MB compressed bundle size limit**. Astro SSR with `@astrojs/cloudflare` adapter compiles all server-side code into a single Worker. When you add React hydration, Markdoc parser, Schema.org generators, and bilingual processing — the bundle can exceed 3MB. **Cloudflare rejects the deployment entirely.** | **High** | **High** | **(1) Code Splitting:** In `astro.config.mjs`, configure `build: { split: true }` to generate one Worker per route. **(2) Heavy library audit:** Run `wrangler deploy --dry-run --outdir=dist` before every deployment. Add CI step that **fails** if any Worker exceeds 2.5MB. **(3) Dynamic imports:** Replace static imports of heavy libraries with `await import()`. **(5) CI measurement:** GitHub Actions step: `npx wrangler deploy --dry-run 2>&1 | grep "Total Upload:"` — alert if above 2.5MB. |
| T-3 | **CPU Time Limit: 10ms per request kills complex SSR.** Cloudflare Workers Free tier enforces **10ms CPU time per request**. If any SSR route exceeds this, users see **Error 1101** — a blank Cloudflare error page. | **Med** | **Med** | **(1) Pre-render EVERYTHING possible.** Use `output: 'hybrid'` and `export const prerender = true` on ALL content pages. Target: **95%+ of pages are static HTML**. Only dynamic API routes (if any) need SSR. **(2) Profile with `wrangler dev --remote`.** Any SSR route >5ms CPU should be pre-rendered. **(3) No runtime computation:** Don't parse Markdown, generate Schema, or process images at request time. All at build time. **(4) Cache aggressively** for any remaining SSR routes. |
| T-4 | **AstroWind template creates an invisible ceiling.** Once customized heavily for bilingual RTL/LTR and Schema.org, **we will have forked so far from upstream that updates become impossible.** | **Med** | **Med** | **Accept the fork explicitly.** (1) Pin AstroWind commit hash in `TEMPLATE_VERSION.md`. (2) Do NOT set up upstream remote. (3) Delete unused components. (4) Write `CUSTOMIZATIONS.md` listing every modified file. (5) Pin all dependency versions with exact versions in `package.json`. |
| T-5 | **Dual Version Coupling: Astro × Cloudflare Adapter.** A single Astro minor update could break the Cloudflare integration. The Cloudflare adapter has a **smaller maintainer pool** than Vercel's. | **Med** | **High** | **(1) Commit `package-lock.json`.** Never run `npm update` without local testing. **(2) GitHub Actions CI** running `npm run build` on every push. **(3) Subscribe to release notes** for both. **(4) Maintain `stable` branch** separate from `dev`. **(5) Pin `wrangler` version.** |
| T-6 | **`.sa` domain registration requires Saudi Commercial Registration (سجل تجاري).** If Ahmad's visa/work arrangement doesn't support a سجل تجاري with "Datacodex" as a trade name, the domain will be rejected. **Additional risk:** if Ahmad returns to Egypt, maintaining a `.sa` domain becomes problematic. | **Med** | **High** | **(1) Verify eligibility BEFORE development.** Confirm سجل تجاري status. **(2) Register a `.com` fallback domain immediately** and develop against that. **(3) Use `PUBLIC_SITE_URL` environment variable** — never hard-code the domain. **(4) If `.sa` is impossible, `.com` works fine** — the local SEO layer doesn't depend on the TLD. |
| T-7 | **Node.js Compatibility Gap in V8 Isolates.** Cloudflare Workers run on V8 Isolates, NOT Node.js. Core APIs (`fs`, `path`, `crypto`) are missing or partially polyfilled. Code that works locally may **crash at runtime** if it relies on missing Node.js APIs. | **High** | **High** | **(1) `nodejs_compat` flag** in `wrangler.toml` — mandatory but insufficient alone. **(2) Test in `wrangler dev --remote`** (NOT `astro dev`) for every feature. **(3) Dependency audit:** check source for `fs`/`path`/`net` before adding any package. **(4) Maintain `WORKERS_COMPAT.md`** with tested dependency status. |
| T-8 | **Git Repository Bloat from Binary Assets.** Content files including images committed to Git. Case study photos alone: 20 cases × 5 images × 1MB = **100MB in Year 1**. GitHub warns at 1GB and **blocks pushes at 2GB**. Cloudflare Pages builds risk hitting the **20-minute timeout** on clone. | **High** | **High** | **(1) DO NOT store images in Git.** Use **Cloudflare R2** (S3-compatible, zero egress fees). **(2) If images must stay in Git:** implement **Git LFS** immediately. **(3) Add `.gitattributes` on Day 1.** **(4) Pre-commit hook** rejecting files >500KB without LFS. **(5) Pre-optimize images:** max 1200px, WebP, quality 80, target <200KB. |
| T-9 | **No Runtime Image Optimization on Free Tier.** Cloudflare Pages Free does NOT include image resizing. Unoptimized case study images → LCP 3-5 seconds on mobile → Google flags "Poor" Core Web Vitals. | **Med** | **Med** | **(1) Use Astro's `<Image />` component** for build-time optimization (Sharp). **(2) Move ALL images to `src/assets/images/`** (NOT `public/`). **(3) Enforce image policy:** max 1200px, WebP, quality 80. **(4) `loading="lazy"` on all below-fold images.** **(5) If runtime optimization ever needed:** Cloudflare Image Resizing is paid but requires zero code changes. |
| T-10 | **Content Tool — Input Format Dependency.** The Content Generator Tool depends on NotebookLM outputting content in a specific structured format (`<<<MARKERS>>>`). If the user pastes incorrectly formatted text, the tool will reject it. | **Low** | **Low** | **(1)** Tool provides clear error messages in Arabic explaining what's wrong. **(2)** Tool shows a confidence score (%) for input quality. **(3)** NotebookLM prompt is documented in `07_Content_Production_Plan_v1.2`. **(4)** Fallback: user can manually write MDX files using templates from `TAD_v4.1`. |
| T-11 | **Content Tool — Local Slug Registry Loss.** The tool tracks used slugs in browser localStorage. If browser data is cleared, the registry is lost, potentially allowing duplicate slugs. | **Low** | **Low** | **(1)** Astro build fails on duplicate filenames (safety net). **(2)** Phase 4 adds GitHub API check against live repository. **(3)** Slug naming convention (category-prefix) reduces natural collision probability. **(4)** Registry backup/restore feature planned for Phase 2. |

---

## Category 2: SEO & Content Risks (فخ عقوبة جوجل)

| # | Risk Scenario | Prob. | Severity | Mitigation Strategy |
| :--- | :--- | :---: | :---: | :--- |
| S-1 | **Hreflang misconfiguration causes Google to ignore one language entirely.** Dual sources (sitemap plugin + `HreflangTags.astro` component) emit conflicting signals. Arabic slug without matching English slug → hreflang points to 404 → penalty signal. | **High** | **High** | **(1) Single Source of Truth:** Implement hreflang **ONLY** via `HreflangTags.astro` in `<head>`. Remove from sitemap config. **(2) Build-time validation:** `scripts/validate-translations.ts` fails build if any slug pair is incomplete. **(3) Self-referencing tags mandatory** on every page. **(4) x-default → Arabic root.** **(5) Post-launch: crawl audit** with Screaming Frog monthly. |
| S-2 | **Keyword cannibalization between Egyptian slang and Standard Arabic pages.** "الهارد بيتك ومش قاري" (Egyptian) and "حل مشكلة التكتكة في القرص الصلب" (Standard) target the same intent → two pages from same domain compete. | **High** | **Med** | **(1) Consolidate, don't duplicate.** One comprehensive article per topic weaving both registers. **(2) Egyptian slang as H2/H3/FAQ** within main article, not standalone pages. **(3) Canonical URL on every page.** **(4) Monitor query overlap** in Search Console — merge immediately if two pages compete. |
| S-3 | **CLS from Arabic font loading tanks Core Web Vitals.** Tajawal with `font-display: swap` causes layout shift. CLS 0.2-0.4 (Google "poor" threshold = 0.1). | **High** | **Med** | **(1) Preload both font weights** with highest priority. **(2) Use `font-display: optional`** instead of `swap`. **(3) Define `size-adjust`, `ascent-override`, `descent-override`** on fallback font. **(4) Subset fonts** to Arabic + Latin + numerals (<30KB per weight). **(5) Test on real budget Android devices** (Samsung Galaxy A, Xiaomi Redmi). |
| S-4 | **Schema.org markup conflicts between site and Google Business Profile.** Site uses `"ComputerRepair"` but GBP is `"DataRecoveryService"` → Knowledge Panel confusion. | **Med** | **High** | **(1) Align Schema `@type` with GBP primary category.** **(2) Use `@type` array** if needed. **(3) NAP consistency** across Schema, GBP, and all citations. **(4) Test with Rich Results Test** before launch. |
| S-5 | **Thin content on templated service pages triggers quality filter.** If service pages share 80% boilerplate, Google's Helpful Content system flags them. | **Med** | **High** | **(1) Minimum 800 words UNIQUE content per service page.** **(2) Each case study ≥400 words** with specific failure modes and recovery percentages. **(3) Build-time validation** on body field length. **(4) Content audit before launch:** <30% similarity between any two service pages. |
| S-6 | **Arabic URL Encoding Corruption in sitemap XML.** Arabic slugs may be double-encoded (`%25D8%25AD...`) in generated sitemap — Google can't resolve them. | **Med** | **Med** | **(1) CI validation** for double-encoded `%25` sequences post-build. **(2) Use Latin-only slugs** for Arabic content (Arabic title/keywords in `<title>`, `<h1>`, body). **(3) `trailingSlash: 'never'`** in Astro config. **(4) Submit sitemap** in Search Console + Bing. Monitor errors. |
| S-7 | **محتوى يسبب ضرر — Content advice causes actual data loss.** The knowledge base covers topics where wrong advice is catastrophic: (a) "خرافة الفريزر" — if poorly worded, someone reads "put it in the freezer" before reaching the debunking paragraph. (b) DIY software guides — reader uses Disk Drill, overwrites data. (c) RAID rebuild advice — reader initiates rebuild on degraded array, kills data. (d) "فك الهارد" — reader opens hard drive outside clean room. **If a user follows advice from the site and loses data permanently, the reputational and (potentially) legal damage is severe.** In Saudi Arabia, consumer protection complaints via وزارة التجارة are public and devastating for a personal brand. | **High** | **High** | **(1) Anti-DIY content strategy:** Every article about a dangerous topic MUST lead with a red warning box: "⚠️ لا تفعل هذا بنفسك — هذا المقال يشرح لماذا." **(2) "Myth-busting" structure:** Title names the myth, first paragraph debunks it, detailed explanation follows. Never present the myth as advice, even temporarily. **(3) Software articles:** Replace "how to use X" with "why X might destroy your data." Position as anti-tutorial. **(4) RAID content:** Every RAID article must include: "لا تعمل Rebuild — اتصل بمتخصص أولاً" in bold, above the fold. **(5) Disclaimer footer on every knowledge article:** "هذا المحتوى تعليمي. أي إجراء تتخذه على مسؤوليتك. للحالات الحرجة، استشر متخصصًا." **(6) Legal review:** Have the Terms of Service page explicitly disclaim liability for actions taken based on content. **(7) Content review protocol:** Before publishing any article that describes a procedure, verify it passes the "أسوأ قارئ" test — what would the least careful reader do after reading this? |

---

## Category 3: Strategic & Business Risks (فخ البراند المحمول)

> **Context:** This category is specific to the "portable brand" model described
> in Vision v2.0. The risks here don't exist for a traditional business website.
> They exist because Datacodex is designed to survive location changes,
> and because Ahmad is simultaneously the technician, the developer, the content
> creator, and the marketer — with zero budget and a temporary work arrangement.

| # | Risk Scenario | Prob. | Severity | Mitigation Strategy |
| :--- | :--- | :---: | :---: | :--- |
| B-1 | **عقد الفارس ينتهي — Contract with Al-Fares ends unexpectedly.** Ahmad works on commission at Al-Fares. If the contract ends (dispute, visa issue, business closure), the "local layer" needs immediate replacement. But: (a) the site currently says "خدماتنا في مركز الفارس" across Footer, Contact, local pages, and Schema markup. (b) If Ahmad cannot find a new location quickly, the site points to a place that no longer serves him. (c) Worse: Al-Fares continues using Ahmad's SEO work (Google Business Profile he set up, reviews he earned) without him. (d) The transition period — where the site says one thing and reality is another — destroys trust with any client who shows up at Al-Fares expecting Ahmad. | **High** | **High** | **(1) The "local layer" must be truly atomic.** All location-specific content MUST be isolated in clearly marked files/components that can be swapped in under 1 hour. Specifically: one `LocationConfig` object (name, address, phone, coordinates, Schema), one `LocalPage` template, Footer component, Contact page. **No location reference anywhere else.** **(2) Prepare a "transitional" local layer** that says: "Datacodex حاليًا يقدم خدمات استشارية عن بُعد — للحالات العاجلة تواصل واتساب." This can be deployed immediately if the contract ends before a new location is secured. **(3) Google Business Profile ownership:** If Ahmad created/manages the Al-Fares GBP, clarify ownership NOW. If it belongs to Al-Fares, accept it. Ahmad's personal GBP (as a practitioner, not a business) is a separate asset he can take. **(4) Reviews:** Any Google reviews earned under Al-Fares' GBP stay with Al-Fares. Ahmad should encourage satisfied clients to also mention "Datacodex" or "أحمد صالح" by name in reviews — this builds his personal brand equity even within Al-Fares' GBP. **(5) Exit plan documentation:** Write a `LOCATION_MIGRATION.md` with step-by-step instructions for swapping the local layer. Include estimated time (target: <1 hour). |
| B-2 | **سلطة SEO المحلية غير محمولة — Local SEO equity doesn't travel.** The Vision v2.0 correctly separates "topical authority" (portable) from "local authority" (location-dependent). But the risk is underestimated. When Ahmad moves from Jeddah to (say) Riyadh or Cairo: (a) "استعادة بيانات جدة" rankings took 6+ months to build — they are lost. (b) Google Maps visibility in Jeddah disappears. (c) The new city has its own competitors already ranking. (d) Any backlinks from Jeddah-specific directories or local blogs become irrelevant. **(e) The site has to rebuild local authority from scratch in the new city.** The topical authority (articles, knowledge base) survives — but the leads that actually pay come from local searches. | **High** | **High** | **(1) Accept this as an inherent cost of the model.** Local SEO equity is partially disposable — this is the price of portability. **(2) Minimize local SEO investment relative to topical.** Follow Vision v2.0's three-layer model: invest 70% effort in Layer 1 (reference content) and Layer 2 (services), only 30% in Layer 3 (local). **(3) Build "city-agnostic" commercial pages** that rank for "استعادة بيانات من هارد خارجي" (no city) — these survive any move. **(4) When moving cities:** Don't delete old local page. Archive it: "خدمنا سابقًا في جدة — حاليًا نخدم في [المدينة الجديدة]." This preserves any backlinks and redirects users. **(5) Prepare local SEO playbook:** A repeatable checklist for establishing local presence in a new city (GBP setup, local directories, city-specific page, Schema update). Target: basic local visibility within 30 days of relocation. **(6) Social media is location-independent.** YouTube/TikTok/Instagram followers don't care about Ahmad's physical location. Double down on social content during any transition period. |
| B-3 | **نطاق `.sa` مرتبط بالتواجد السعودي — `.sa` domain tied to Saudi presence.** A `.sa` domain requires an active Saudi سجل تجاري. If Ahmad's residency/work arrangement in Saudi Arabia ends, renewing the domain becomes difficult or impossible. The entire site's URL structure, backlinks, and search rankings are tied to this domain. | **Med** | **High** | **(1) Register `datacodex.com` immediately** as a guaranteed fallback. Cost: ~$12/year. **(2) Use `PUBLIC_SITE_URL` environment variable** throughout the codebase — never hard-code the domain. **(3) If `.sa` proves difficult to obtain:** Launch on `.com` from Day 1. A `.com` domain does NOT hurt local Saudi SEO — Google uses GBP location, hreflang, and content signals, not TLD, for local ranking. **(4) If already on `.sa` and must migrate to `.com`:** Implement 301 redirects (via Cloudflare Rules, no code needed) from every `.sa` URL to `.com`. Google transfers ~90% of ranking equity via 301s. **(5) Consider `.com.sa`** — less restrictive requirements than `.sa` and still signals Saudi presence. |
| B-4 | **إرهاق المشغّل الفردي — Solo operator overload.** Ahmad is simultaneously: (a) a full-time data recovery technician (revenue source), (b) the website developer, (c) the content writer (15 articles + 5 service pages for MVP), (d) the SEO strategist, (e) the social media creator, (f) the customer service handler (WhatsApp). This is unsustainable. The most likely failure mode is NOT the website breaking — it's **content stagnation.** Ahmad launches the site, writes 5-10 articles, gets busy with recovery work, and the blog goes silent for 6 months. Google notices. Rankings decay. The site becomes a static brochure that generates zero leads. | **High** | **High** | **(1) Set a realistic content cadence.** 2 articles per month maximum. Not 15 in the first month. The MVP can launch with 5 articles + 5 service pages. The rest are added gradually. **(2) Batch content creation.** Dedicate one full day every two weeks to writing. Write 2 articles in one sitting while the research is fresh. **(3) Repurpose ruthlessly.** Every YouTube/TikTok video Ahmad already makes = one blog article. The video script IS the article draft. AI tools can transcribe and format. **(4) Template-ize writing.** Create article templates: "Problem Article" (symptom → cause → what to do → when to call a specialist), "Myth Article" (myth → why it's wrong → what to do instead), "Case Study" (problem → diagnosis → recovery → result). Writing from templates is 3x faster. **(5) Acceptable minimum:** Even 1 article/month keeps the site "alive" in Google's eyes. Below that, the site is decaying. **(6) Hard rule:** Recovery work always takes priority. The website exists to serve the recovery business, not the other way around. If it's a choice between finishing a client's recovery or writing an article — the client wins every time. |
| B-5 | **"بدون بيانات — بدون رسوم" تخلق مسؤولية مالية وقانونية.** Data recovery has ~60-70% success rate for physical failures. If 30-40% of jobs yield no charge despite hours of clean room labor, the business hemorrhages money. Additionally, in Saudi Arabia, consumer disputes escalate to وزارة التجارة — a public complaint there is devastating for a personal brand. The risk is compounded because Ahmad works on commission — unsuccessful cases cost him labor AND earn him nothing. | **High** | **High** | **(1) Precise legal language:** "رسوم الفحص: مجانية. رسوم الاستعادة: تُحتسب فقط عند استعادة الملفات المحددة من قِبَل العميل." **(2) Define "successful recovery"** on the Terms page: percentage of specified files, not 100%. **(3) Require digital consent** (WhatsApp message screenshot or simple web form) before starting any job. **(4) Track success rate internally** — if below 60%, re-evaluate which cases to accept. **(5) Tiered pricing model:** Charge a nominal "diagnosis fee" (50-100 SAR) refundable against recovery — this filters out non-serious inquiries and reduces zero-revenue cases. |
| B-6 | **لغة التسويق توحي بيقين مطلق — Marketing implies guaranteed recovery.** Phrases like "الداتا بترجع" or "نرجّعلك كل حاجة" imply certainty. When an unrecoverable case arises, the client feels deceived. **One 1-star Google review** from "قالولي هيرجّعوا وما رجّعوا حاجة" can undo months of SEO and trust-building. This is especially damaging for a personal brand — the complaint is about Ahmad personally, not about a faceless company. | **High** | **High** | **(1) Vision v2.0's "zero false promises" policy must be enforced literally.** Audit every page for absolute language. Replace "نرجّعلك" with "نحاول نسترجع" / "نقيّم إمكانية الاستعادة." **(2) Add "Recovery Success Rates" section** on the About or Services page with honest statistics by failure type. **(3) Create a "حالات لا يمكن استعادتها" page** — this ranks for "[X] ممكن يترجع؟" queries AND pre-qualifies clients AND demonstrates honesty. **(4) Every case study MUST include recovery percentage** (e.g., "94.2% of targeted files recovered"). Never "100% success." **(5) Google Review response protocol:** respond within 24 hours, professionally, acknowledge the disappointment, explain what was attempted. Never argue publicly. |
| B-7 | **عدم الامتثال لنظام حماية البيانات الشخصية (PDPL) — Privacy & data protection compliance failure.** The site collects/processes personal data via: (a) WhatsApp click tracking (phone numbers), (b) Cloudflare Web Analytics (request metadata including IPs), (c) any future contact/diagnostic form, (d) case study images that might contain client-identifiable details. PDPL (effective September 2023) requires explicit consent, published privacy policy, and data breach notification. Fines: up to **5 million SAR**. Additionally: case study Before/After images showing file trees could contain personal file names visible to viewers. | **Med** | **High** | **(1) Privacy Policy page** (`/privacy` + `/en/privacy`) BEFORE launch. **(2) Cookie consent banner** using `vanilla-cookieconsent` — even though Cloudflare Analytics is cookieless, any future analytics/pixels require consent. **(3) WhatsApp CTAs:** Use `https://wa.me/` format WITHOUT pre-filled user data. **(4) Case study images: NEVER use real client data.** All images must be anonymized/staged. File trees must show generic file names. **(5) `<meta name="robots" content="noimageindex">` on case study pages** if images are sensitive. **(6) Enable 2FA on GitHub AND Cloudflare account.** **(7) Require client consent** (Arabic) before using any aspect of their case publicly. |
| B-8 | **الاعتماد على شخص واحد — Ahmad is the single point of everything.** If Ahmad is unavailable for 2+ weeks (illness, travel, visa issue), both the recovery business AND the website are frozen. No one can: update content, fix a deployment error, respond to WhatsApp inquiries, or update the local layer if something changes. This is not a typical "bus factor" risk for a software project — it's a **business continuity risk** for a one-person operation. | **Med** | **Med** | **(1) The website is STATIC — it runs without Ahmad.** This is the single biggest advantage of the Astro + Cloudflare architecture. If Ahmad disappears for a month, the site keeps serving content and ranking in Google. WhatsApp inquiries go unanswered, but the site itself doesn't go down. **(2) `RUNBOOK.md`** with deployment instructions written for a junior developer — in case someone needs to make an emergency update. **(3) Ensure TWO accounts have admin access** to GitHub repo AND Cloudflare dashboard (Ahmad + one trusted person). **(4) Pre-write "away" WhatsApp auto-reply:** "شكرًا لتواصلك — حاليًا خارج ساعات العمل. سنرد خلال 24 ساعة." **(5) Accept the limitation.** This is a one-person business. The mitigation is the static architecture, not hiring staff. |

---

## Category 4: Implementation Risks (فخ الوكيل الذكي)

| # | Risk Scenario | Prob. | Severity | Mitigation Strategy |
| :--- | :--- | :---: | :---: | :--- |
| A-1 | **AI Agent generates physical CSS instead of logical properties, breaking RTL.** AI models trained on LTR codebases generate `pl-4 pr-2` instead of `ps-4 pe-2`, `text-left` instead of `text-start`. Looks correct in English, **breaks silently in Arabic.** | **High** | **High** | **(1) Create `AGENTS.md`** with logical-property rules and mapping table. **(2) ESLint rule** flagging physical directional classes as errors. **(3) Manual RTL test** after every major component — toggle `dir="rtl"` and screenshot both directions. **(4) Pre-fill AI context** with golden component examples. |
| A-2 | **AI Agent hallucinates invalid Astro v5 / Cloudflare API calls.** Dual hallucination surface. Code compiles locally (Node.js) but **fails on Cloudflare's V8 runtime.** | **High** | **Med** | **(1) Pin documentation** in agent context. **(2) Build early, build often:** `npm run build && wrangler deploy --dry-run` after every AI-generated file. **(3) Create `src/content/config.ts` MANUALLY.** **(4) Maintain `KNOWN_ISSUES.md`** logging hallucinations. **(5) Test with `wrangler dev`** not `astro dev`. |
| A-3 | **Orphaned content across `ar/`/`en/` directories breaks hreflang.** No automated parity enforcement → Arabic posts without English counterparts → hreflang 404s → penalty. | **High** | **Med** | **(1) Build-time validator:** `scripts/validate-translations.ts` fails build if slug pairs are orphaned. **(2) Required `translationSlug` field** in content collection schema. **(3) Content creation SOP:** Always create in pairs. English can be `draft: true` stub, but file must exist. |
| A-4 | **AI Agent generates components that break Layout.astro integration.** Missing required props, duplicated `<head>`, hardcoded `lang="ar"`, injected second `<html>` tag. | **Med** | **Med** | **(1) Create Layout.astro FIRST** with TypeScript `Props` interface. **(2) Create `_PAGE_TEMPLATE.astro`** as canonical example. **(3) Playwright test** asserting: one `<html>` with correct `dir`/`lang`, hreflang presence, Schema.org presence. **(4) Astro `Astro.props` validation** — throw at build if required props missing. |
| A-5 | **PanicButton has incorrect RTL positioning or is inaccessible.** Fixed positioning + directional properties + overlapping banners + missing `aria-label` + blocking mobile navigation. | **Med** | **Med** | **(1) Logical positioning:** `fixed bottom-4 end-4`. Test both `dir` values. **(2) z-index scale** in Tailwind config. **(3) Bilingual `aria-label`.** **(4) Mobile: bottom sticky bar** instead of floating circle. **(5) Keyboard navigation test.** |
| A-6 | **Markdoc format creates future migration friction.** Fewer editor plugins, no `markdownlint`, smaller community than standard Markdown. | **Low** | **Med** | **(1) Accept trade-off, document it.** **(2) Keep content simple** — standard Markdown syntax within `.mdoc` files. **(3) Migration script skeleton** (`scripts/mdoc-to-md.ts`). **(4) Markdoc VS Code extension** in `.vscode/extensions.json`. |

---

## Risk Heat Map (v3.1)

```
                      SEVERITY
                      Low         Medium          High
                ┌───────────┬─────────────┬─────────────────┐
           High │           │ S-2, S-3    │ ~~T-1~~, T-2,    │
                │           │             │ T-7, T-8, S-1,   │
                │           │ A-2, A-3    │ S-7, B-1, B-2,   │
                │           │             │ B-4, B-5, B-6,   │
                │           │             │ A-1              │
   PROBABILITY  ├───────────┼─────────────┼─────────────────┤
         Medium │           │ T-3, T-4,   │ T-5, T-6, S-4,   │
                │           │ T-9, S-6,   │ S-5, B-7         │
                │           │ A-4, A-5,   │                   │
                │           │ B-8         │                   │
                ├───────────┼─────────────┼─────────────────┤
            Low │           │ A-6,        │                   │
                │           │ T-10, T-11  │                   │
                └───────────┴─────────────┴───────────────────┘
```

---

### 🔴 Critical (High Prob × High Severity) — Block launch until resolved:

| # | Risk | Category |
|:--|:-----|:---------|
| T-1 | ~~Keystatic local mode~~ — ✅ RESOLVED via Content Tool | Technical |
| T-2 | Worker bundle size exceeds 3MB limit | Technical |
| T-7 | Node.js compatibility gap in V8 Isolates | Technical |
| T-8 | Git repository bloat from binary assets | Technical |
| S-1 | Hreflang dual-source conflict | SEO |
| S-7 | Content advice causes actual data loss | Content |
| B-1 | Contract with Al-Fares ends unexpectedly | Strategic |
| B-2 | Local SEO equity not portable across cities | Strategic |
| B-4 | Solo operator overload → content stagnation | Strategic |
| B-5 | "No Data No Charge" legal/financial liability | Business |
| B-6 | Marketing implies guaranteed recovery | Business |
| A-1 | AI Agent physical CSS breaks RTL | Agent |

### 🟠 High Priority (Med Prob × High Severity) — Resolve in Sprint 1:

| # | Risk | Category |
|:--|:-----|:---------|
| T-5 | Dual version coupling (Astro × Cloudflare) | Technical |
| T-6 | `.sa` domain registration uncertainty | Technical |
| S-4 | Schema.org / GBP type mismatch | SEO |
| S-5 | Thin content on templated service pages | SEO |
| B-7 | PDPL compliance + case study data exposure | Business |

### 🟡 Medium Priority — Resolve before launch:

| # | Risk | Category |
|:--|:-----|:---------|
| T-3 | CPU time limit on SSR routes | Technical |
| T-4 | AstroWind fork maintenance | Technical |
| T-9 | No runtime image optimization on free tier | Technical |
| S-2 | Keyword cannibalization (Egyptian vs. Standard Arabic) | SEO |
| S-3 | CLS from Tajawal font swap | SEO |
| S-6 | Arabic sitemap URL encoding | SEO |
| B-8 | Single point of everything (Ahmad unavailable) | Strategic |
| A-2 | AI Agent hallucinations (Astro/Cloudflare) | Agent |
| A-3 | Orphaned bilingual content | Agent |
| A-4 | Layout.astro integration failures | Agent |
| A-5 | PanicButton RTL/accessibility | Agent |
| A-6 | Markdoc format lock-in | Agent |

---

### ❌ Removed Risks from v2.0:

| Old # | Risk | Reason |
|:------|:-----|:-------|
| O-6 | Language barrier with staff on phone | Ahmad answers personally. He is bilingual (Arabic/English). No staff involved. |
| O-1 | (Replaced by B-5) | Rewritten for solo commission-based model |
| O-2 | (Replaced by B-6) | Rewritten for personal brand context |
| O-3 | (Merged into B-7) | Combined with case study image risk (old O-4) |
| O-4 | (Merged into B-7) | Combined with PDPL compliance |
| O-5 | (Replaced by B-8) | Rewritten for solo operator reality |

---

## Immediate Action Items (Pre-Development Checklist — v3.1)

> Priority order: items that block ALL other work come first.

**🔴 Before writing Line 1 of code:**

- [ ] **Domain decision:** Verify `.sa` eligibility OR register `.com` fallback. Set `PUBLIC_SITE_URL` as env variable (T-6, B-3)
- [ ] **Image storage decision:** Cloudflare R2 vs. Git LFS — choose BEFORE first content commit (T-8)
- [x] **~~Keystatic mode decision:~~** ✅ RESOLVED — Keystatic eliminated. Replaced with Custom Content Generator Tool. See `08_Content_Tool_Spec_v1.0` (T-1, T-7)
- [ ] **Set up Cloudflare Pages project** connected to GitHub repo (T-2, T-5)
- [ ] **Add `wrangler.toml`** with `nodejs_compat` flag (T-7)
- [ ] **Configure `output: 'hybrid'`** — pre-render 95%+ of routes (T-3)

**🟠 Before first deployment:**

- [ ] **Create `AGENTS.md`** with RTL/logical-properties rules (A-1)
- [ ] **Create `_PAGE_TEMPLATE.astro`** as canonical page structure (A-4)
- [ ] **Write `scripts/validate-translations.ts`** for i18n parity (A-3, S-1)
- [ ] **Move all images to `src/assets/images/`** (T-9)
- [ ] **Draft Privacy Policy** (Arabic + English) for PDPL (B-7)
- [ ] **Draft Terms of Service** with recovery liability boundaries (B-5, B-6)
- [ ] **Align Schema.org `@type` with GBP** primary category (S-4)
- [ ] **Pin ALL dependency versions** with exact versions (T-5)
- [ ] **Set up GitHub Actions CI** with `wrangler deploy --dry-run` (T-2, T-7)

**🟡 Before launch:**

- [ ] **Isolate the local layer** into atomic swappable components. Document in `LOCATION_MIGRATION.md` (B-1)
- [ ] **Prepare "transitional" local layer** for contract-end scenario (B-1)
- [ ] **Content liability review:** Every knowledge article passes the "أسوأ قارئ" test (S-7)
- [ ] **Add disclaimer footer** to all knowledge articles (S-7)
- [ ] **Audit all marketing language** for absolute promises (B-6)
- [ ] **Write `RUNBOOK.md`** for emergency updates (B-8)
- [ ] **Set up WhatsApp Business** with auto-reply + quick-reply templates (B-8)
- [ ] **Create `WORKERS_COMPAT.md`** (T-7)
- [ ] **Decide slug strategy:** Latin-only slugs recommended (S-6)
- [ ] **Font optimization:** subset Tajawal, configure `font-display: optional` (S-3)

**📋 Post-launch (first 30 days):**

- [ ] **Submit sitemap** to Search Console + Bing (S-6)
- [ ] **Crawl audit** with Screaming Frog — verify hreflang (S-1)
- [ ] **Monitor Error 1101** occurrences (T-3)
- [ ] **Monitor bundle size** in CI (T-2)
- [ ] **Set content cadence:** 2 articles/month, batched (B-4)
- [ ] **Google Review response protocol** documented and active (B-6)

---

> **Final Note (v3.1):**
>
> The #1 risk in this entire document is **B-4 (content stagnation from solo
> operator overload)** — not because it has the highest severity, but because
> it is the most likely to actually happen and the hardest to mitigate with
> technical solutions. Every other risk has a concrete fix (patch a bug, add
> a script, configure a setting). B-4 requires sustained human discipline
> from a person who is already working full-time in a demanding technical job.
>
> The entire architecture (static site, pre-rendered pages, zero backend, zero
> cost) exists specifically to make B-4 survivable. If Ahmad writes zero new
> content for 3 months, the site keeps running, keeps serving existing articles,
> and keeps ranking for existing keywords. It doesn't grow — but it doesn't die.
> That resilience is by design, not by accident.
>
> **The overarching mitigation principle remains:**
> **Pre-render everything. SSR nothing. Keep it static. Keep it simple.**
> **The best system for a solo operator is one that runs without him.**
```

> **v3.1 Addendum:** The elimination of Keystatic in favor of the Custom
> Content Generator Tool (see `08_Content_Tool_Spec_v1.0`) resolved three
> critical technical risks (T-1, T-7 partially, T-5 reduced) and introduced
> two low-severity risks (T-10, T-11). The net risk profile has improved.

---
