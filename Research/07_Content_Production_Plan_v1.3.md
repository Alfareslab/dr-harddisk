

# Dr. Hard Disk — Content Production Plan (دليل إنتاج المحتوى)

> **Document:** `07_Content_Production_Plan.md`
> **Version:** 1.3 — Encyclopedic Knowledge Edition
> **Status:** 🟢 Approved with Revisions
> **Tech Stack:** Astro v5 + Custom Content Generator Tool (Twin-File Strategy)
> **Content Engine:** NotebookLM (Source-Grounded Generation)
> **Content Philosophy:** الموسوعة المعرفية — المحتوى هو المنتج، والثقة تأتي من المعلومة لا من الإلحاح.
> **Dependencies:**
> - `05_DrHardDisk_TAD_v4.2.md` → File structure & Content Schema
> - `06_SEO_Jeddah_Market_Strategy_v3.md` → Keywords & content calendar
> - `KB_03_DataRecovery_Technical.md` → Technical accuracy reference
> - `08_Content_Tool_Spec_v1.md` → Content Generator Tool specification
> - `08_Internal_Linking_Map.md` → Cross-linking strategy (separate document)
> **Last Updated:** 17 February 2026

---

## Changelog

- v1.3 (17 February 2026):
  - استبدال CallToAction بـ GentleNote مع أمثلة نصوص لكل category
  - إضافة قائمة "الممنوعات اللغوية الصارمة" (Sales Language Prohibitions)
  - تحديث Frontmatter للحالات الدراسية (Cases) ليشمل `badge` و `device_type`
  - إضافة ملاحظة عن Reels (لا تُنتج في خطة المحتوى)
  - تعزيز إرشادات النبرة لتعكس فلسفة "الموسوعة المعرفية"
  - إضافة معيار "صفر ذكر للمكان" في معايير القبول
  - تحديث المراجع لتتوافق مع TAD v4.2

- v1.2 (January 2025): Updated to reflect 08_Content_Tool_Spec.
  Replaced Keystatic workflow with Content Generator Tool pipeline.
  Updated frontmatter templates with new taxonomy fields.
  Added NotebookLM output format specification.
  Replaced panicLevel with difficulty throughout.
  Added Content Taxonomy section.

---

## Table of Contents

1. [The Content Playlist (MVP Launch)](#1-the-content-playlist-mvp-launch)
2. [The Technical Spec (File Structure & Frontmatter)](#2-the-technical-spec)
3. [The Content Engine (NotebookLM Workflow)](#3-the-content-engine-notebooklm-workflow)
4. [Quality Rules (The Content Constitution)](#4-quality-rules)
5. [Content Taxonomy](#5-content-taxonomy)
6. [Content Types & Channels](#6-content-types--channels)

---

## 0. Content Philosophy — NEW v1.3

> **المبدأ الذهبي:**
> "المحتوى هو المنتج. الزائر يثق في المعلومة فيتواصل — لا نلح عليه."

**التحول الجوهري:**

| من (النموذج القديم) | إلى (النموذج الجديد) |
|:---------------------|:----------------------|
| محتوى تسويقي بـ CTAs بيعية | محتوى معرفي يبني ثقة بدون بيع مباشر |
| "اتصل الآن!" في نهاية كل مقال | "لو محتاج مساعدة..." كملاحظة هادئة |
| الزائر يشعر أنه في "محل" | الزائر يشعر أنه في "مكتبة" |
| CallToAction أخضر بارز | GentleNote رمادي محايد |
| الضغط لأخذ قرار فوري | ترك المعلومة تعمل عمل البائع |

**القاعدة:** كل مقال يُنشر يجب أن يصلح كمرجع معرفي مستقل — حتى لو الزائر لم يتواصل معنا أبداً.

---

## 1. The Content Playlist (MVP Launch)

> **Scope:** 15 Technical Articles + 5 Service Landing Pages + 5 Case Studies
> **Source:** `06_SEO_Jeddah_Market_Strategy_v3.md` (Sections 6 & 7)
> **Priority:** Ordered by business impact (highest first)

---

### A. Service Landing Pages (5 Pages)

| # | Slug | Translation ID | Title (AR) | Title (EN) | Keywords (AR) | Keywords (EN) | Priority |
|:--|:-----|:---------------|:-----------|:-----------|:---------------|:---------------|:---------|
| S1 | `data-recovery-hdd` | `svc-01-hdd` | استعادة بيانات الهارد ديسك | HDD Data Recovery | تصليح هارد ديسك تكتكة جدة، استرجاع بيانات هارد ميكانيكي، هارد لا يقرأ | hard drive clicking repair Jeddah, mechanical HDD data recovery, hard drive not reading | 🔴 P0 |
| S2 | `data-recovery-external` | `svc-02-external` | استعادة بيانات الهارد الخارجي | External HDD Data Recovery | هارد خارجي لا يتعرف عليه، WD Passport لا يظهر، Seagate Backup Plus لا يقرأ | external hard drive not recognized, WD Passport not showing, Seagate Backup Plus not reading | 🔴 P0 |
| S3 | `data-recovery-raid-server` | `svc-03-raid` | استعادة بيانات السيرفرات و RAID | RAID & Server Data Recovery | استعادة بيانات RAID 5 جدة، السيرفر وقف فجأة، RAID rebuild stuck | RAID 5 data recovery Jeddah, server crash recovery, RAID rebuild failure | 🔴 P0 |
| S4 | `data-recovery-ssd` | `svc-04-ssd` | استعادة بيانات SSD و NVMe | SSD & NVMe Data Recovery | SSD فصل فجأة، SATAFIRM S11، Samsung SSD لا يعمل | SSD sudden death recovery, SATAFIRM S11 fix, Samsung SSD data recovery | 🟡 P1 |
| S5 | `data-recovery-flash-sd` | `svc-05-flash` | استعادة بيانات الفلاش والكروت | Flash Drive & SD Card Recovery | فلاشة مكسورة، كارت كاميرا لا يقرأ، استرجاع صور كاميرا | broken flash drive repair, camera card not reading, camera photo recovery | 🟡 P1 |

---

### B. Technical Blog Articles (15 Articles)

| # | Slug | Translation ID | Title (AR) | Title (EN) | Type | Priority | Words |
|:--|:-----|:---------------|:-----------|:-----------|:-----|:---------|:------|
| A01 | `clicking-drive-solution` | `post-01-clicking` | أسباب صوت التكتكة في الهارد — وماذا تفعل فوراً | Hard Drive Clicking Sound — Causes & What To Do Immediately | Awareness | 🔴 P0 | 2,000 |
| A02 | `water-damage-emergency` | `post-02-water` | ماذا تفعل لو وقع هاردك في الماء؟ — دليل الطوارئ | What To Do If Your Hard Drive Falls In Water — Emergency Guide | 🔥 Viral | 🔴 P0 | 1,800 |
| A03 | `freezer-myth-busted` | `post-03-freezer` | لماذا لا يجب وضع الهارد في الفريزر | Why You Should NEVER Put Your Hard Drive In The Freezer | Anti-DIY | 🔴 P0 | 1,500 |
| A04 | `format-photo-recovery` | `post-04-format` | هل يمكن استرجاع صور بعد الفورمات؟ الحقيقة الكاملة | Can You Recover Photos After Formatting? The Complete Truth | Volume | 🔴 P0 | 2,000 |
| A05 | `free-software-danger` | `post-05-free-sw` | لماذا البرامج المجانية لاستعادة البيانات خطيرة؟ | Why Free Data Recovery Software Is Dangerous | Anti-DIY | 🔴 P0 | 1,800 |
| A06 | `delete-vs-damage` | `post-06-delete` | الفرق بين حذف الملفات وتلف الهارد | The Difference Between Deleting Files and Hard Drive Damage | Awareness | 🟡 P1 | 1,500 |
| A07 | `washing-machine-flash` | `post-07-washing` | فلاشة غسلت في الغسالة؟ لا تيأس! | Flash Drive Went Through The Washing Machine? Don't Panic! | 🔥 Viral | 🟡 P1 | 1,200 |
| A08 | `smr-slow-drive` | `post-08-smr` | لماذا هاردك الجديد (SMR) أبطأ مما تتوقع — وكيف يؤثر على بياناتك | Why Your New SMR Hard Drive Is Slower Than Expected — And How It Affects Your Data | Tech | 🟡 P1 | 2,200 |
| A09 | `raid-not-backup` | `post-09-raid-backup` | لماذا RAID ليس نسخة احتياطية — والفرق بينهما | Why RAID Is NOT a Backup — And The Difference Between Them | B2B | 🟡 P1 | 1,800 |
| A10 | `raid-rebuild-danger` | `post-10-raid-rebuild` | RAID Rebuild: لماذا قد يقتل بياناتك بدل ما ينقذها | RAID Rebuild: Why It Might Kill Your Data Instead of Saving It | B2B Tech | 🟡 P1 | 2,500 |
| A11 | `dvr-vs-nvr` | `post-11-dvr-nvr` | الفرق بين DVR و NVR — وكيف نستعيد التسجيلات من كل نوع | DVR vs NVR — How We Recover Recordings From Each | B2B | 🟢 P2 | 1,800 |
| A12 | `forgot-hdd-password` | `post-12-password` | نسيت باسورد الهارد؟ إليك الحل | Forgot Your Hard Drive Password? Here's The Solution | Awareness | 🟢 P2 | 1,500 |
| A13 | `windows-reinstall-recovery` | `post-13-windows` | سطبت ويندوز وضاعت ملفاتك؟ هناك أمل! | Reinstalled Windows and Lost Your Files? There's Still Hope! | 🔥 Volume | 🟢 P2 | 1,500 |
| A14 | `ssd-health-check` | `post-14-ssd-health` | كيف تفحص صحة الـ SSD قبل أن يموت فجأة | How To Check Your SSD Health Before It Dies Suddenly | Tech | 🟢 P2 | 2,000 |
| A15 | `kids-deleted-files` | `post-15-kids` | الأطفال مسحوا ملفاتك؟ لا تصرخ — اتبع هذه الخطوات | Kids Deleted Your Files? Don't Panic — Follow These Steps | 🔥 Relatable | 🟢 P2 | 1,200 |

> **Keywords Reference:** Full keyword sets (AR/EN) for each article are maintained in `06_SEO_Jeddah_Market_Strategy_v3.md`.

---

### C. Case Studies (5 Cases — MVP)

> **Source:** `01_Project_Vision_v2.md` — Pillar 2: Case Studies
> **Goal:** Minimum 2 case studies per month post-launch

| # | Slug | Translation ID | Title (AR) | Title (EN) | Device Type | Failure Type | Priority | Words |
|:--|:-----|:---------------|:-----------|:-----------|:------------|:-------------|:---------|:------|
| CS1 | `case-seagate-clicking-recovery` | `case-01-seagate` | حالة: هارد Seagate 2TB بصوت تكتكة — استعادة 98% | Case: Seagate 2TB Clicking Drive — 98% Recovery | Seagate Barracuda 2TB | Head Crash | 🔴 P0 | 1,200 |
| CS2 | `case-wd-passport-dropped` | `case-02-wd-drop` | حالة: هارد WD Passport وقع على الأرض | Case: WD Passport Dropped — Full Recovery | WD My Passport 1TB | Physical Drop | 🔴 P0 | 1,000 |
| CS3 | `case-raid5-server-crash` | `case-03-raid5` | حالة: سيرفر RAID 5 توقف فجأة — استعادة قاعدة بيانات كاملة | Case: RAID 5 Server Crash — Full Database Recovery | Dell PowerEdge R740 (RAID 5) | Multiple Drive Failure | 🟡 P1 | 1,500 |
| CS4 | `case-ssd-satafirm` | `case-04-satafirm` | حالة: SSD يظهر SATAFIRM S11 بدل اسمه | Case: SSD Showing SATAFIRM S11 Instead of Model Name | SSD 256GB (Various) | Firmware Corruption | 🟡 P1 | 1,000 |
| CS5 | `case-wedding-sd-card` | `case-05-wedding` | حالة: كارت ذاكرة كاميرا حفل زفاف — 3000 صورة | Case: Wedding Camera SD Card — 3,000 Photos Recovered | SD Card 64GB | Logical Corruption | 🟢 P2 | 1,000 |

---

### D. Priority Legend

| Symbol | Meaning | Target Date |
|:-------|:--------|:------------|
| 🔴 P0 | Must launch with site (MVP Critical) | Week 1-2 |
| 🟡 P1 | Launch within first month | Week 3-4 |
| 🟢 P2 | Publish within second month | Week 5-8 |

---

## 2. The Technical Spec

> **Source:** `05_DrHardDisk_TAD_v4.2.md` — Section 2 (Folder Structure) & Section 3 (Content Schema)
> **Strategy:** Twin-File — each language lives in a separate `.mdx` file linked via `translationID`

---

### A. File Path Rules (Strict — No Exceptions)

| Language | Content Type | Path Pattern | Example |
|:---------|:-------------|:-------------|:--------|
| Arabic | Blog Post | `src/content/posts/ar/{slug}.mdx` | `src/content/posts/ar/clicking-drive-solution.mdx` |
| English | Blog Post | `src/content/posts/en/{slug}.mdx` | `src/content/posts/en/clicking-drive-solution.mdx` |
| Arabic | Service Page | `src/content/services/ar/{slug}.mdx` | `src/content/services/ar/data-recovery-hdd.mdx` |
| English | Service Page | `src/content/services/en/{slug}.mdx` | `src/content/services/en/data-recovery-hdd.mdx` |
| Arabic | Case Study | `src/content/cases/ar/{slug}.mdx` | `src/content/cases/ar/case-seagate-clicking-recovery.mdx` |
| English | Case Study | `src/content/cases/en/{slug}.mdx` | `src/content/cases/en/case-seagate-clicking-recovery.mdx` |

**Rules:**
1. Both language versions MUST use the **same slug** (English slug always).
2. Both language versions MUST share the **same `translationID`**.
3. Both language versions MUST reference the **same `heroImage`** path.
4. Slugs are always lowercase, hyphenated English — even for Arabic files.

---

### B. Frontmatter Template — Blog Posts (YAML) — UPDATED v1.2

```yaml
---
title: "عنوان المقال هنا"
description: "وصف قصير للسيو لا يزيد عن 160 حرف"
pubDate: "2025-01-15"
heroImage: "../../assets/images/posts/article-slug.webp"
lang: "ar"
translationID: "article-slug"
category: "hdd"
brands:
  - "western-digital"
symptoms:
  - "clicking-sound"
  - "head-crash"
difficulty: "critical"
draft: false
featured: false
---
```

> For the complete field reference, allowed enum values, and validation rules,
> see 05_TAD_v4.2 (Content Schema section) and 08_Content_Tool_Spec (Section 2.2).

**Changes from v1.1:**
- `showPanicButton` removed — replaced by `difficulty` field ("critical" triggers PanicButton + WarningBox)
- `dir` field removed — derived from `lang` automatically
- `seoTitle` / `keywords` / `faq` removed from frontmatter — handled differently
- `heroImage` path updated to `../../assets/images/` (build-time optimization)
- Added taxonomy fields: `category`, `brands`, `symptoms`, `difficulty`
- Added control fields: `draft`, `featured`

---

### C. Frontmatter Template — Service Pages (YAML) — UPDATED v1.2

```yaml
---
title: "عنوان الخدمة هنا"
description: "وصف قصير للسيو لا يزيد عن 160 حرف"
pubDate: "2025-01-15"
heroImage: "../../assets/images/services/service-slug.webp"
lang: "ar"
translationID: "service-slug"
category: "hdd"
brands: []
symptoms: []
difficulty: "moderate"
draft: false
featured: false
---
```

> For the complete field reference, allowed enum values, and validation rules,
> see 05_TAD_v4.2 (Content Schema section) and 08_Content_Tool_Spec (Section 2.2).

---

### D. Frontmatter Template — Case Studies (YAML) — REWRITTEN v1.3

> **[v1.3] Simplified and restructured** to match the new Cases content collection
> schema defined in TAD v4.2.

```yaml
---
title: "هارد WD Blue — سقوط من متر ونصف"
description: "كيف استعدنا 98% من بيانات هارد WD Blue بعد سقوط من ارتفاع متر ونصف"
heroImage: "../../assets/images/cases/wd-blue-fall.webp"
lang: "ar"
translationID: "case-wd-blue-fall"
pubDate: "2025-01-15"

# ═══ CASE-SPECIFIC FIELDS (v1.3) ═══
device_type: hdd                          # Required — enum: hdd | ssd | raid | flash
brand: "western-digital"                  # Optional — string
problem: "الهارد يصدر صوت طقطقة ولا يعمل نهائياً"      # Required — جملة واحدة
solution: "فتح في Clean Room + استبدال رؤوس القراءة + قراءة مباشرة للأسطوانات"  # Required — 2-3 جمل
result: "تم استعادة 98% من البيانات — صور عائلية لـ 10 سنوات"  # Required — نتيجة واضحة
recovery_percentage: 98                   # Required — رقم من 0 إلى 100
badge: success                            # Required — enum: success | challenge

draft: false
featured: false
---
```

**الحقول الإلزامية:**
- `title`, `device_type`, `problem`, `solution`, `result`, `recovery_percentage`, `badge`, `pubDate`

**الحقول الاختيارية:**
- `brand`, `heroImage`, `featured`

**معايير كتابة الحالات:**

| الحقل | القاعدة | مثال |
|:------|:--------|:-----|
| `problem` | جملة واحدة تصف العَرَض الذي جاء به العميل | "الهارد يصدر صوت طقطقة ولا يعمل نهائياً" |
| `solution` | وصف تقني مختصر للحل (2-3 جمل) | "فتح في Clean Room + استبدال رؤوس القراءة" |
| `result` | النتيجة النهائية بنسبة واضحة + نوع البيانات | "تم استعادة 98% — صور عائلية لـ 10 سنوات" |
| `badge` | `success` = نسبة 90%+ / `challenge` = أقل من 90% أو حالة معقدة | `success` |

**الفرق عن v1.2:**
- أُزيلت الحقول المكررة (`category`, `brands`, `symptoms`, `difficulty`) — الحالات لا تحتاج taxonomy كامل
- أُضيفت حقول `device_type`, `badge`, `recovery_percentage` — مصممة لمكون `SuccessStories.astro`
- `problem/solution/result` حقول مستقلة بدل حشوها في المحتوى فقط

---

### E. MDX Body Structure — Blog Posts — UPDATED v1.3

> **[v1.3] Component references updated:** CallToAction → GentleNote.
> The Content Generator Tool auto-injects all components based on frontmatter fields
> and content markers. See 08_Content_Tool_Spec (Section 6) for full injection rules.

```mdx
---
(frontmatter — see Section 2.B)
---

{/* ═══ AUTO-INJECTED: PanicButton — when difficulty: "critical" ═══ */}
{/* ═══ AUTO-INJECTED: WarningBox — when difficulty: "critical" or :::warning marker ═══ */}

## المقدمة — ادخل مباشرة في المشكلة

{/* NO FLUFF. Start with the problem. First sentence = the user's exact pain. */}
{/* NO SALES LANGUAGE. This is an encyclopedia entry, not a brochure. */}

## التشخيص التقني — ماذا يحدث داخل الهارد؟

{/* Engineering explanation with diagrams/photos */}
{/* <<<IMAGE>>> description of what image is needed <<<END_IMAGE>>> */}

## ماذا تفعل فوراً (Emergency Steps)

{/* Numbered list — clear, actionable, urgent */}

## ماذا لا تفعل أبداً (Anti-DIY Section)

{/* Numbered list of dangerous actions to avoid */}

## كيف تُحل هذه المشكلة تقنياً

{/* [v1.3] Changed: from "كيف نحل في مركزنا" to neutral technical explanation */}
{/* Explain the professional process — builds trust through transparency */}
{/* <<<IMAGE>>> Lab/equipment photo suggestion <<<END_IMAGE>>> */}

## الأسئلة الشائعة

{/* Auto-rendered from frontmatter FAQ array — for SEO Rich Snippets */}

{/* ═══ AUTO-INJECTED: GentleNote — all posts and services ═══ */}
{/* ═══ AUTO-INJECTED: ArticleDisclaimer — all posts ═══ */}
```

**Auto-Injected Components (per 08_Content_Tool_Spec Section 6.1) — UPDATED v1.3:**

| Component | Trigger | Placement |
|:----------|:--------|:----------|
| `PanicButton` | `difficulty: "critical"` | After first H2 |
| `WarningBox` | `difficulty: "critical"` or `:::warning` marker | After PanicButton or at marker |
| `GentleNote` | Always (all posts and services) | Before last paragraph |
| `ArticleDisclaimer` | Always (all posts) | After GentleNote (end of article) |
| `VideoEmbed` | `<<<VIDEO_ID: xxxxx>>>` marker | At marker position |

> **[v1.3] Change:** `CallToAction` → `GentleNote`. الأخير يُحقن قبل آخر فقرة (وليس في نهاية المقال مباشرة).
> GentleNote لا يظهر في الصفحة الرئيسية أو صفحة About.

---

### F. MDX Body Structure — Case Studies — UPDATED v1.3

> **[v1.3] CTA component removed.** Case studies end with GentleNote (auto-injected).
> The tone is narrative-technical, not promotional.

```mdx
---
(frontmatter — see Section 2.D)
---

{/* ═══ CASE STATS CARD (Auto-generated from frontmatter fields) ═══ */}
{/* device_type, brand, problem, solution, result, recovery_percentage, badge */}

## المشكلة — ماذا حدث؟

{/* What happened to the client. Their words, their situation. */}
{/* Narrative tone — engineering story, not marketing testimonial */}
{/* <<<IMAGE>>> Photo of the damaged device before recovery <<<END_IMAGE>>> */}

## التشخيص — ماذا وجدنا؟

{/* Technical diagnosis using professional equipment. */}
{/* Reference specific tools: PC-3000, MRT, Clean Room (Class 100) */}

## التحدي — لماذا هذه الحالة صعبة؟

{/* What made this case special or difficult */}

## الحل — كيف تمت استعادة البيانات؟

{/* [v1.3] Changed: neutral voice — "كيف تمت" not "كيف استعدنا" */}
{/* Step-by-step process followed */}
{/* <<<IMAGE>>> Recovery process or equipment photo <<<END_IMAGE>>> */}

## النتيجة

{/* Recovery rate, data types recovered, time taken */}

## الدروس المستفادة

{/* [v1.3 NEW] Tips for the reader based on this case */}
{/* Educational takeaway — what can the reader learn from this? */}

{/* ═══ AUTO-INJECTED: GentleNote — based on device_type ═══ */}
{/* ═══ AUTO-INJECTED: ArticleDisclaimer ═══ */}
```

---

## 3. The Content Engine (NotebookLM Workflow)

> **Primary Tool:** [NotebookLM](https://notebooklm.google.com/)
> **Philosophy:** Source-grounded generation eliminates AI hallucination.
> **Rule:** All content MUST be generated from verified source documents — never from AI general knowledge.

---

### A. Why NotebookLM (Not Direct AI Prompting)

| Direct AI Prompting | NotebookLM Approach |
|:--------------------|:--------------------|
| AI writes from general knowledge | AI writes ONLY from uploaded sources |
| Risk of hallucination: **high** | Risk of hallucination: **minimal** |
| No source verification | Every claim traceable to a source document |
| Quality depends on prompt quality | Quality depends on source quality |
| Inconsistent tone across articles | Consistent tone via persona customization |

---

### B. Source Documents to Upload

| # | Document | Type | Purpose |
|:--|:---------|:-----|:--------|
| 1 | `KB_03_DataRecovery_Technical.md` | Internal | Core Q&A, technical accuracy, myth busting |
| 2 | Seagate official documentation | External | HDD failure modes, specifications, recovery procedures |
| 3 | Western Digital official documentation | External | Product specs, common failures |
| 4 | ACE Lab (PC-3000) documentation | External | Professional recovery procedures, equipment capabilities |
| 5 | Industry whitepapers on data recovery | External | Best practices, success rates, statistical data |
| 6 | `07_Content_Production_Plan.md` (this file) | Internal | Frontmatter templates, quality rules, structure |

> **Rule:** Add more sources over time as new technical documents become available. The richer the source library, the better the output.

---

### C. NotebookLM Persona Customization — UPDATED v1.3

> **[v1.3] Updated to reflect encyclopedic tone and sales language prohibitions.**

Paste this in NotebookLM's **"Customize Response"** section:

```
You are the Senior Technical Content Writer for "Dr. Hard Disk" (د.هارد ديسك),
a specialized data recovery knowledge platform.

YOUR CONTENT PHILOSOPHY:
This is an ENCYCLOPEDIA, not a sales brochure.
The reader should feel they are in a LIBRARY, not a SHOP.
We teach, explain, and warn — we NEVER sell, push, or pressure.

YOUR VOICE IS BUILT ON THREE PILLARS:

1. ENCYCLOPEDIC AUTHORITY:
   - Write as a knowledgeable expert sharing information freely.
   - Always use correct technical terms (English in parentheses on first mention).
   - Reference equipment: PC-3000, MRT, Clean Room (Class 100).
   - Cite specific failure modes from the uploaded source documents.
   - Back every claim with mechanically/electronically verifiable facts.
   - Use Modern Standard Arabic, simplified — NOT colloquial, NOT academic.

2. TRUST THROUGH EDUCATION:
   - Teach the reader WHY something happens, not just WHAT to do.
   - Explain the engineering behind failures.
   - The reader should learn something valuable even if they never contact us.
   - Pattern: "Here's what's happening technically" → "Here's what you should know" → "Here's the professional approach."

3. CALM GUIDANCE (NOT PANIC SELLING):
   - Acknowledge the reader's concern in the FIRST sentence.
   - Follow with a calming technical explanation.
   - NEVER use urgency to push for contact.
   - Pattern: "This is concerning" → "here's why it happens" → "here's the right approach."
   - The article ends naturally — GentleNote is auto-injected by the system.

ABSOLUTELY BANNED (NEVER USE — article will be REJECTED):
- "فحص مجاني" / "free diagnosis"
- "احجز ميعاد" / "book an appointment"
- "اتصل الآن" / "call now"
- "عروضنا" / "our offers"
- "أسعارنا" / "our prices"
- "أفضل محل" / "best shop"
- "رقم 1 في جدة" / "number 1 in Jeddah"
- "تفضل بزيارتنا" / "visit us"
- "خصم خاص" / "special discount"
- "عرض محدود" / "limited offer"
- Any imperative sales command ("اتصل!" / "احجز!")
- Any time urgency ("الآن!" / "فوراً!" / "before it's too late!")
- Any superlatives ("الأفضل" / "الأسرع" / "نضمن 100%")

ALSO BANNED (AI filler):
- "في عالم التكنولوجيا المتطور..."
- "لا شك أن البيانات أصبحت..."
- "في هذا المقال سنتعرف على..."
- "ختاماً، نود أن نؤكد أن..."
- Any generic AI filler or introductory padding.

FIRST SENTENCE RULE:
Every article MUST start with the reader's EXACT problem in their own words.

IMAGE PLACEHOLDERS:
When the content needs an image, write:
<<<IMAGE>>> Description of what image is needed <<<END_IMAGE>>>

PHYSICAL ADDRESS RULE:
NEVER write a specific street address, neighborhood, or center name in the content body.
NEVER mention "جدة" or "Jeddah" in the article body (except in service pages).
The physical location is handled by the GentleNote component dynamically.
Reference "the professional approach" or "specialized equipment" — never a specific place.

TONE EXAMPLES:
✅ "صوت الطقطقة معناه تلف في رؤوس القراءة (Read/Write Heads)"
❌ "عندنا أفضل الأجهزة لإصلاح التلف — اتصل الآن!"

✅ "تشغيل الهارد في هذه الحالة قد يزيد الضرر"
❌ "لو ما اتصلتش دلوقتي هتخسر بياناتك للأبد!"

✅ "Dr. Hard Disk — خبرة أكثر من 8 سنوات في استعادة البيانات"
❌ "أنا أحمد، عندي خبرة 8 سنوات وأنا الأفضل في جدة"
```

---

### D. NotebookLM Output Instructions (Per Article) — UPDATED v1.3

> **[v1.3] Added language constraint reminder and GentleNote reference.**

Use this template when requesting each article from NotebookLM:

```
Generate article #{number} from the Content Playlist.

ARTICLE DETAILS:
- Slug: {slug}
- Translation ID: {translationID}
- Language: Arabic (original) + English adaptation
- Category: {category}
- Brands: {brands — comma-separated or "none"}
- Symptoms: {symptoms — comma-separated or "none"}
- Difficulty: {simple | moderate | critical}
- Target Word Count: {word_count}

OUTPUT FORMAT (MUST follow exactly):

<<<ARTICLE_START>>>
slug: {slug}
translationID: {translationID}
category: {category}
brands: {brand1, brand2}
symptoms: {symptom1, symptom2}
difficulty: {difficulty}

<<<AR_CONTENT>>>

# {Arabic Title}

{Arabic content body — all H2 sections as specified in the MDX template}

<<<IMAGE>>> description of what image is needed <<<END_IMAGE>>>

<<<EN_CONTENT>>>

# {English Title}

{English content body — culturally adapted, NOT literal translation}

<<<IMAGE>>> description of what image is needed <<<END_IMAGE>>>

<<<ARTICLE_END>>>

IMPORTANT:
- Do NOT include YAML frontmatter — the Content Generator Tool builds it.
- Do NOT import components — they are auto-injected.
- Do NOT end with a call-to-action — GentleNote is auto-injected by the system.
- Do NOT mention any physical address, neighborhood, or center name.
- Do NOT use any word from the BANNED list in the persona.
- Use <<<IMAGE>>> markers instead of [📷 IMAGE PLACEHOLDER].
- Use <<<VIDEO_ID: {youtube_id}>>> for video embeds.
- Use :::warning for emergency warnings in critical articles.
- Write the last H2 section as educational/technical — NOT promotional.

ACCURACY RULES:
- Every technical claim must come from the uploaded source documents.
- If you cannot verify a claim from the sources, say "⚠️ NEEDS EXPERT VERIFICATION" instead.
- Never recommend: freezer trick, hitting the drive, opening at home, or free software for hardware issues.
```

---

### E. English Adaptation Instructions — UPDATED v1.2

> **[v1.2] English content is now generated alongside Arabic** in the same
> NotebookLM output using the `<<<EN_CONTENT>>>` marker. The Content Generator
> Tool automatically creates twin MDX files from the single output.

When generating the English section within the NotebookLM output:

```
ENGLISH ADAPTATION RULES (within <<<EN_CONTENT>>> section):

CRITICAL RULES:
1. This is a CULTURAL ADAPTATION, not a literal translation.
2. The Content Generator Tool handles lang, dir, and file separation.
3. Same sales language prohibitions apply in English — NO "call now", "free", "best", "guaranteed".

VOICE (ENGLISH-SPECIFIC):
1. Direct & Professional — no emotional Arabic rhetoric. Facts first.
2. Expat-Focused Trust — address "I'm in a foreign country and my data is gone" anxiety.
   Mention: English-speaking staff, transparent pricing (SAR), no-fix-no-fee policy.
3. Technical Without Jargon Overload — use technical terms with brief inline explanations.
4. Encyclopedic tone — reader is learning, not being sold to.

ADAPTATION TABLE:
| Arabic Approach | English Adaptation |
|:----------------|:-------------------|
| Opens with emotional empathy | Opens with clear problem statement |
| Uses dramatic metaphors | Uses direct statistics or process steps |
| References local Saudi context | References expat-relevant context |
| Longer, flowing paragraphs | Shorter, scannable paragraphs with bullet points |
| Religious/cultural references | Professional confidence language |

Target length: 80-100% of Arabic original.
```

---

### F. Case Study Generation Instructions — UPDATED v1.3

> **[v1.3] Updated to use new frontmatter fields and encyclopedic tone.**

```
Generate Case Study #{number} from the Content Playlist.

CASE DETAILS:
- Slug: {slug}
- Translation ID: {translationID}
- Device Type: {device_type — hdd | ssd | raid | flash}
- Brand: {brand — or "none"}
- Problem: {one-sentence problem description}
- Solution: {2-3 sentence technical solution}
- Result: {result with percentage and data type}
- Recovery Percentage: {number 0-100}
- Badge: {success | challenge}
- Duration: {duration}

STRUCTURE:
1. YAML frontmatter (as specified in Section 2.D of the Production Plan v1.3)
2. MDX body following the Case Study template:
   - المشكلة (What happened — the situation, NOT sales testimonial)
   - التشخيص (Technical diagnosis with equipment references)
   - التحدي (Why this case was difficult — engineering perspective)
   - الحل (Step-by-step recovery process — neutral voice)
   - النتيجة (Recovery results — facts and numbers)
   - الدروس المستفادة (Educational takeaway for the reader)
3. Mark image locations with <<<IMAGE>>> description <<<END_IMAGE>>>
4. Do NOT end with a CTA — GentleNote is auto-injected.

TONE: Tell the story as an engineering narrative — not marketing success story.
Focus on the PROCESS and the LEARNING, not emotions or promotion.
The reader should understand HOW data recovery works from reading this case.

BANNED IN CASE STUDIES:
- "Client was amazed" / "العميل انبهر"
- "Thanks to our expertise" / "بفضل خبرتنا"
- "Only we could do this" / "نحن الوحيدين"
- Any self-congratulatory language
```

---

## 4. Quality Rules (The Content Constitution)

> **These rules are NON-NEGOTIABLE. Violation = content rejected.**

---

### A. The AI Fluff Ban (حظر الحشو)

The following patterns are **EXPLICITLY BANNED** from all content:

| # | Banned Pattern (AR) | Banned Pattern (EN) | Why |
|:--|:--------------------|:--------------------|:----|
| 1 | "في عالم التكنولوجيا المتطور..." | "In today's rapidly evolving tech landscape..." | Generic filler that wastes the reader's first 3 seconds |
| 2 | "لا شك أن البيانات أصبحت..." | "There's no doubt that data has become..." | States the obvious — anyone reading this already knows |
| 3 | "مع التطور المستمر في..." | "With the continuous advancement of..." | Academic filler with zero actionable value |
| 4 | "يعتبر الهارد ديسك من أهم..." | "The hard drive is considered one of the most important..." | Waste of attention span — the reader has a PROBLEM |
| 5 | "في هذا المقال سنتعرف على..." | "In this article, we will explore..." | Self-referential — just DO it, don't announce it |
| 6 | "ختاماً، نود أن نؤكد أن..." | "In conclusion, we'd like to emphasize..." | Filler conclusion — end naturally, GentleNote handles the rest |

**The Golden Rule:** The first sentence of every article MUST be the reader's exact problem in their own words.

**✅ Good first sentence:**
> "هاردك يصدر صوت تكتكة متكرر وخايف ملفاتك ضاعت — هنا تفهم إيش اللي بيحصل تقنياً."

**❌ Bad first sentence:**
> "في عصر التكنولوجيا الحديثة، أصبحت البيانات الرقمية من أهم الأصول التي يمتلكها الفرد..."

---

### B. Sales Language Prohibitions (الممنوعات اللغوية الصارمة) — NEW v1.3

> **القاعدة:**
> هذا الموقع **موسوعة معرفية** وليس موقع خدمات تقليدي.
> اللغة البيعية المباشرة **ممنوعة تماماً** في المقالات وقصص النجاح.

---

#### الممنوعات المطلقة (في المقالات والخدمات وقصص النجاح):

❌ **ممنوع استخدام هذه الكلمات/العبارات:**

| # | الكلمة/العبارة الممنوعة | السبب |
|:--|:------------------------|:------|
| 1 | "فحص مجاني" | لغة عروض — ليست لغة موسوعة |
| 2 | "احجز ميعاد" | أمر بيعي مباشر |
| 3 | "اتصل الآن" | إلحاح زمني |
| 4 | "عروضنا" | لغة تجارية بحتة |
| 5 | "أسعارنا" | الموسوعة لا تتحدث عن أسعار |
| 6 | "أفضل محل" | مبالغة تسويقية |
| 7 | "رقم 1 في جدة" | ادعاء غير قابل للتحقق |
| 8 | "تفضل بزيارتنا" | دعوة بيعية |
| 9 | "خصم خاص" | لغة عروض |
| 10 | "عرض محدود" | إلحاح مصطنع |

❌ **ممنوع النبرة:**
- صيغة الأمر المباشر ("اتصل!" / "احجز!")
- الإلحاح الزمني ("الآن!" / "فوراً!" / "قبل فوات الأوان!")
- المبالغة ("الأفضل" / "الأسرع" / "نضمن 100%")
- التمجيد الذاتي ("بفضل خبرتنا الفريدة" / "نحن الوحيدين")

---

#### البدائل المسموحة:

✅ **استخدم بدلاً منها:**

| بدلاً من | استخدم |
|:---------|:-------|
| "اتصل الآن!" | — (لا بديل — GentleNote يتولى هذا تلقائياً) |
| "أفضل مركز" | "Dr. Hard Disk متخصص في..." |
| "عروضنا الحصرية" | — (ممنوع — لا بديل) |
| "احجز فحص مجاني" | — (ممنوع — لا بديل في المقال) |
| "اكتشف المزيد عن خدماتنا" | "تعرف على المشكلة" / "اقرأ المزيد" |
| "نحن الأفضل لأن..." | "الأسلوب التقني المتبع هو..." |

✅ **النبرة المسموحة:**
- التعليم: "هنا نشرح لك..."
- النصيحة: "من الأفضل أن..."
- التحذير المعرفي: "تجنب... لأنه يسبب..."
- الإحالة الهادئة: "لو محتاج مساعدة متخصصة..." (في GentleNote فقط)

---

#### الاستثناءات (حيث اللغة التجارية مسموحة):

هاتان الصفحتان **فقط** يُسمح فيهما باستخدام لغة تجارية واضحة:

| الصفحة | المسموح | السبب |
|:-------|:--------|:------|
| `/contact/` | "فحص مجاني وتشخيص دقيق" | صفحة تواصل — الزائر قرر بالفعل |
| `/jeddah/` | "أفضل مختبر استعادة بيانات في جدة" | صفحة SEO محلية — مصممة للتحويل |

**كل ما عدا ذلك: لغة معرفية فقط.**

---

#### معيار التطبيق:

**قبل نشر أي مقال:**
1. ابحث في النص عن كل كلمة من قائمة الممنوعات (Ctrl+F)
2. لو وجدت **أي واحدة** → المقال **مرفوض** حتى يُعدَّل
3. الهدف: الزائر يجب أن يشعر أنه في **"مكتبة"** وليس في **"محل"**

---

### C. Overall Tone Guidelines (إرشادات النبرة العامة) — UPDATED v1.3

> **[v1.3] Strengthened to reflect encyclopedic identity.**

**الهوية:**
نكتب بصوت **Dr. Hard Disk** — خبير واثق ومطمئن، وليس بائع.

**القواعد:**

**1. نستخدم صيغة البراند القوي:**
- ✅ "Dr. Hard Disk — خبرة أكثر من 8 سنوات"
- ❌ "أنا أحمد، عندي خبرة 8 سنوات"

**2. نُعلّم ولا نروّج:**
- ✅ "صوت الطقطقة معناه تلف في رؤوس القراءة (Read/Write Heads)"
- ❌ "عندنا أفضل الأجهزة لإصلاح التلف"

**3. نحذّر ولا نخوّف عشان نبيع:**
- ✅ "تشغيل الهارد في هذه الحالة قد يزيد الضرر"
- ❌ "لو ما اتصلتش دلوقتي هتخسر بياناتك للأبد!"

**4. نستخدم المصطلحات التقنية بوضوح:**
- المصطلح الإنجليزي بين قوسين بجانب الترجمة عند أول ذكر
- مثال: "رؤوس القراءة (Read/Write Heads)"
- مثال: "الأسطوانات المغناطيسية (Platters)"

**5. بالعربي الفصيح المبسط:**
- ❌ لا عامية: "الهارد اتخرب خالص"
- ❌ لا أكاديمي معقد: "حدث اضطراب في المنظومة الميكانيكية للقرص الصلب"
- ✅ فصيح مبسط: "الهارد تعرض لتلف ميكانيكي في رؤوس القراءة"

**6. المقال ينتهي بشكل طبيعي:**
- ✅ آخر فقرة تلخص المعلومة أو تقدم نصيحة أخيرة
- ❌ آخر فقرة تدفع للتواصل أو الشراء
- GentleNote يتولى الإحالة الهادئة تلقائياً — لا حاجة لكتابة خاتمة بيعية

---

### D. The PanicButton Mandate — UPDATED v1.3

> **[v1.3]** PanicButton is now a **content-level MDX component** (not a global FAB).
> It appears as a full-width emergency strip inside the article content.
> See TAD v4.2 §4.3 for visual specs.

**When `difficulty: "critical"` is triggered:**
- Any article about physical damage (drops, water, fire)
- Any article about data disappearance (not detected, RAW, clicking)
- Any article about active degradation (slow drive, bad sectors)
- Any article about RAID/Server failures
- Water/liquid damage emergency guides

**Auto-injected behavior:**
- `PanicButton` — placed immediately after the first H2 heading (full-width emergency strip)
- `WarningBox` — placed after PanicButton (or at `:::warning` markers)

**Note:** PanicButton's message is context-specific, not generic sales language. Example:
> "⚠️ لو الهارد بيطلع صوت طقطقة دلوقتي، أوقفه فوراً. كل دقيقة تشغيل بتقلل فرص الاستعادة."
> → Followed by a large WhatsApp button for immediate contact.

---

### E. GentleNote Component (الملاحظة الهادية) — NEW v1.3

> **[v1.3] Replaces CallToAction.** See TAD v4.2 §4.4 for technical implementation.

**الفلسفة:**
بدلاً من "اتصل الآن!" نستخدم نبرة معرفية هادئة: "لو محتاج مساعدة..."

**كيف يعمل:**
- يُحقن تلقائياً **قبل آخر فقرة** في كل مقال/خدمة
- النص **يتغير تلقائياً** حسب `category` و `symptoms` من frontmatter
- يقرأ بيانات المكان من `location.ts`
- **لا يظهر** في الصفحة الرئيسية أو صفحة About

**أمثلة النصوص لكل تصنيف:**

---

**HDD + Clicking:**
> 💡 لو بتسمع صوت طقطقة دلوقتي، ما تحاولش تشغل الهارد تاني. Dr. Hard Disk متخصص في الحالات دي. تواصل عبر واتساب أو زورنا في [المكان].

**HDD + Not Detected:**
> 💡 لو الكمبيوتر مش شايف الهارد، ما تحاولش تفكه بنفسك. Dr. Hard Disk يقدر يفحصه بأجهزة متخصصة. تواصل عبر واتساب أو زورنا في [المكان].

**Deleted/Format (symptoms: deleted-files أو formatted-drive):**
> 💡 لو عملت فورمات بالغلط، ما تكتبش أي حاجة على القرص. Dr. Hard Disk يقدر يساعدك. تواصل عبر واتساب أو زورنا في [المكان].

**SSD:**
> 💡 مشاكل الـ SSD غالباً بتحتاج أدوات متخصصة. Dr. Hard Disk عنده الأجهزة المناسبة. تواصل عبر واتساب أو زورنا في [المكان].

**RAID:**
> 💡 لو السيرفر وقع، ما تحاولش تعمل rebuild بنفسك. كل خطوة غلط بتقلل فرص الاستعادة. تواصل عبر واتساب أو زورنا في [المكان].

**Flash:**
> 💡 لو الفلاشة أو الكارت مش شغالين، ما تعملش فورمات. فيه فرصة للاستعادة. تواصل عبر واتساب أو زورنا في [المكان].

**General (fallback):**
> 💡 لو محتاج مساعدة متخصصة في استعادة البيانات، Dr. Hard Disk موجود. تواصل عبر واتساب أو زورنا في [المكان].

---

**ملاحظات للكاتب/الأداة:**
- `[المكان]` يُستبدل تلقائياً من `location.ts` — حالياً: "مركزنا في جدة — حي الشرفية"
- النبرة: **نصيحة** وليست **ضغط**
- التصميم: صندوق رمادي فاتح (`#F9FAFB`) مع حدود رمادية (`#E5E7EB`) — ليس أخضر بارز
- الأيقونة: 💡 — وليست 🔔 أو ⚡ أو أي رمز يوحي بالإلحاح
- النص يتغير تلقائياً — **الكاتب لا يكتب نص GentleNote** — المكون يختاره بنفسه

**أولوية اختيار النص:**
1. إذا وُجد تطابق `category + symptom` ← نص محدد جداً (أعلى أولوية)
2. إذا وُجد نص مخصص في `location.gentle_notes[category]` ← يُستخدم
3. وإلا ← نص الفئة الافتراضي من القاموس الداخلي للمكون

---

### F. Technical Accuracy Mandate (KB_03 Reference)

> **Reference Document:** `KB_03_DataRecovery_Technical.md`

**Rules:**
1. Every technical claim MUST be verifiable against KB_03 answers or uploaded NotebookLM sources.
2. If KB_03 doesn't cover a topic, the writer must flag it as `⚠️ NEEDS EXPERT VERIFICATION`.
3. The following myths are **BANNED** from all content:

| # | Myth | Reality (from KB_03) |
|:--|:-----|:---------------------|
| 1 | "Put the hard drive in the freezer" | Condensation causes corrosion and further damage. NEVER recommend this. |
| 2 | "Hit the hard drive gently to fix it" | Physical impact can worsen head damage or cause platter scoring. |
| 3 | "Free recovery software can fix anything" | Software cannot fix hardware damage; using it on a failing drive can overwrite data. |
| 4 | "Opening the hard drive at home is OK" | Dust particles cause platter scratches. Clean room (Class 100) is required. |
| 5 | "Format will erase everything permanently" | Format only erases file tables; raw data remains recoverable in most cases. |
| 6 | "RAID is a backup solution" | RAID protects against drive failure, not against deletion, corruption, or ransomware. |

---

### G. The Physical Address Rule — STRENGTHENED v1.3

> **NEVER hardcode a physical street address, neighborhood, or center name in content body.**

**Rationale:** The website is a sustainable informational reference that outlives any single physical location. If the business moves to a new address, content should NOT need to be rewritten.

**How it works:**
- Physical location data lives in `src/config/location.ts` (single source of truth)
- The `GentleNote` component dynamically injects the current address
- Content **never** mentions a specific place — GentleNote handles it

**Banned in content body (articles, services, case studies):**
```
❌ "مركزنا في شارع فلسطين..."
❌ "مركز الفارس للكمبيوتر"
❌ "Visit us at Al Faris Center..."
❌ "في جدة" (except in /jeddah/ page)
❌ "حي الشرفية"
❌ Any hardcoded address, street name, building name, or city name
```

**Allowed in content body:**
```
✅ "Dr. Hard Disk متخصص في..." (brand name — not location)
✅ "الأسلوب التقني المتبع..." (neutral reference to process)
✅ "الأجهزة المتخصصة مثل PC-3000..." (equipment — not place)
```

> **[v1.3] Enforcement:** أي مقال يذكر "جدة" أو "مركز الفارس" أو أي اسم مكان في المحتوى التقني → **مرفوض فوراً**.

---

### H. Acceptance Criteria (معايير القبول النهائية) — UPDATED v1.3

**قبل نشر أي مقال، تحقق من:**

**✅ المحتوى:**
- [ ] العنوان (H1) يحتوي على الكلمة المفتاحية
- [ ] 3+ عناوين H2
- [ ] 1500+ كلمة (مقالات) / 1000+ كلمة (حالات)
- [ ] صورة Hero (1200×630)
- [ ] 2-3 روابط داخلية
- [ ] أول جملة = مشكلة القارئ بكلماته

**✅ Frontmatter:**
- [ ] `category` صحيح ومن القيم المسموحة
- [ ] `difficulty` محدد بشكل صحيح
- [ ] `symptoms` مناسبة (لو موجودة)
- [ ] `translationID` متطابق بين النسختين العربية والإنجليزية
- [ ] `heroImage` يشير إلى مسار صحيح في `src/assets/images/`

**✅ اللغة (v1.3 — صارم):**
- [ ] **صفر** كلمات من قائمة الممنوعات (Section 4.B)
- [ ] النبرة معرفية (ليست بيعية)
- [ ] بدون مبالغات ("الأفضل"، "نضمن"، "الأسرع")
- [ ] بدون أوامر بيعية ("اتصل!"، "احجز!")
- [ ] بدون إلحاح زمني ("الآن!"، "فوراً!")
- [ ] آخر فقرة تلخص المعلومة — ليست دعوة للتواصل

**✅ المكونات (يُحقن تلقائياً — تحقق من السلوك):**
- [ ] WarningBox (لو difficulty: critical)
- [ ] PanicButton (يُحقن تلقائياً بعد أول H2 لو critical)
- [ ] GentleNote (يُحقن تلقائياً قبل آخر فقرة)
- [ ] ArticleDisclaimer (يُحقن في النهاية)

**✅ المكان (v1.3 — صارم):**
- [ ] **صفر** ذكر لأسماء أماكن في المحتوى التقني
- [ ] **صفر** ذكر لـ "جدة" أو "حي الشرفية" أو "مركز الفارس"
- [ ] **صفر** ذكر لأي شارع أو حي أو مدينة
- [ ] المكان يُذكر **فقط** في GentleNote تلقائياً من `location.ts`

**❌ المقال المرفوض:**
أي مقال يحتوي على:
- كلمة واحدة من قائمة الممنوعات اللغوية
- ذكر "جدة" أو "مركز الفارس" أو أي اسم مكان في المحتوى التقني
- نبرة بيعية أو إلحاح في أي فقرة
- خاتمة تدفع للاتصال بدلاً من تلخيص المعلومة

---

### I. Structural Quality Checklist

Before publishing ANY content file, verify:

- [ ] Frontmatter is complete with ALL required fields (see Section 2.B/C/D)
- [ ] `translationID` matches between AR and EN versions
- [ ] `heroImage` path uses `../../assets/images/` prefix and is identical in both versions
- [ ] `lang` is correctly set (`"ar"` or `"en"`)
- [ ] `category` is a valid enum value
- [ ] `difficulty` is set correctly (`"simple"`, `"moderate"`, or `"critical"`)
- [ ] `brands` array contains only allowed enum values (0-3 items)
- [ ] `symptoms` array contains only allowed enum values (0-5 items)
- [ ] `slug` is identical in both versions
- [ ] No Arabic text exists in the English file body (except brand names)
- [ ] No English-only paragraphs in the Arabic file body (technical terms in parentheses are OK)
- [ ] `difficulty: "critical"` articles will have PanicButton + WarningBox auto-injected
- [ ] GentleNote and ArticleDisclaimer are auto-injected (no manual check needed)
- [ ] Article word count matches target ±10%
- [ ] No banned fluff patterns from Section 4.A
- [ ] No banned sales language from Section 4.B
- [ ] No location names in article body (Section 4.G)
- [ ] All technical claims verified against KB_03 or NotebookLM sources
- [ ] No freezer myth, no hit-the-drive myth, no open-at-home myth
- [ ] No hardcoded physical address in content body
- [ ] All `<<<IMAGE>>>` markers have been resolved with actual images
- [ ] Images reviewed and approved by project owner

---

### J. Image Strategy — UPDATED v1.2

> **Approach:** Hybrid (Real Photography + AI-Generated Illustrations)
> **[v1.2]** Image paths updated to use `src/assets/images/` (build-time optimization via Astro).

| Image Type | Source | When to Use |
|:-----------|:-------|:------------|
| Equipment photos | Real photography | Lab shots: PC-3000, MRT, Clean Room |
| Damaged device close-ups | Real photography | Before/after recovery shots for Case Studies |
| Conceptual diagrams | AI-generated | Internal HDD anatomy, RAID architecture, data flow |
| Hero images for blog posts | AI-generated | Custom illustrations matching article topic |
| Process illustrations | AI-generated or designed | Step-by-step recovery workflows |

**Image Specs:**

| Field | Rule |
|:------|:-----|
| `heroImage` | Real photo OR custom AI illustration. **NO generic stock photos.** |
| Blog image path | `src/assets/images/posts/{slug}.webp` |
| Service image path | `src/assets/images/services/{slug}.webp` |
| Case Study image path | `src/assets/images/cases/{slug}.webp` |
| Alt text | Descriptive, in the file's language, includes primary keyword |
| Format | `.webp` preferred — max 200KB after optimization |
| Dimensions | 1200×630px (Open Graph compatible) |
| Naming | `{slug}.webp` — must match `translationID` in frontmatter |

**Image Workflow:**
1. NotebookLM generates `<<<IMAGE>>>` markers in content with descriptions
2. Content Generator Tool extracts image markers and lists them in the output
3. Project owner reviews each marker and decides: real photo or AI-generated
4. Images are created/selected, optimized to `.webp`, and placed in `src/assets/images/`
5. The `heroImage` frontmatter field uses relative path: `../../assets/images/posts/{slug}.webp`

---

### K. Content Production Workflow (Complete) — UPDATED v1.3

> **[v1.3] Updated to reference GentleNote instead of CTA, and added language review step.**

```
Stage 1: CONTENT GENERATION (NotebookLM)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1.1  Upload source documents to NotebookLM notebook (one-time setup)
     - KB_03, Seagate docs, WD docs, ACE Lab docs, this Production Plan
     - Responsibility: Project Owner

1.2  Configure NotebookLM persona (Section 3.C — v1.3 updated)
     - Paste into "Customize Response"
     - Includes sales language prohibitions
     - Responsibility: Project Owner

1.3  Select article from Content Playlist (Section 1)
     - Responsibility: Project Owner

1.4  Send Output Instructions (Section 3.D) to NotebookLM
     - Fill in: slug, translationID, category, brands, symptoms, difficulty, word count
     - NotebookLM outputs structured text with <<<ARTICLE_START>>> markers
     - Includes BOTH Arabic and English content in one output

Stage 2: CONTENT PROCESSING (Content Generator Tool)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2.1  Paste NotebookLM output into Content Generator Tool
     - Tool URL: local HTML page (see 08_Content_Tool_Spec)
     - Responsibility: Project Owner

2.2  Tool automatically:
     - Parses the structured markers
     - Validates all required fields
     - Generates YAML frontmatter for both AR and EN
     - Creates twin .mdx files (ar/{slug}.mdx + en/{slug}.mdx)
     - Auto-injects components (PanicButton, WarningBox, GentleNote, ArticleDisclaimer)
     - Handles image marker extraction
     - Exports ZIP file with complete article package

Stage 3: REVIEW & PUBLISH — UPDATED v1.3
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
3.1  Language Review (NEW v1.3)
     - Ctrl+F for EVERY word in the sales language ban list (Section 4.B)
     - Ctrl+F for location names: "جدة", "الشرفية", "الفارس", "Jeddah"
     - If ANY banned word found → reject and regenerate
     - Reviewer: Project Owner
     - This step is MANDATORY — no exceptions

3.2  Content Review
     - Reviewer: Project Owner
     - Criteria: KB_03 compliance, no banned myths, no fluff, encyclopedic tone
     - Check: taxonomy fields are correct, difficulty level is appropriate
     - Check: first sentence = reader's problem (not generic intro)
     - Check: last paragraph = information summary (not CTA)

3.3  Image Production
     - Review <<<IMAGE>>> markers extracted by the tool
     - Create/select images (real or AI-generated)
     - Optimize to .webp, ≤200KB, 1200×630px
     - Place in src/assets/images/{posts|services|cases}/{slug}.webp

3.4  Place Files via GitHub Desktop (MVP phase)
     - AR → src/content/posts/ar/{slug}.mdx
     - EN → src/content/posts/en/{slug}.mdx
     - IMG → src/assets/images/posts/{slug}.webp
     - Future: direct publish via Content Tool page → GitHub API → Cloudflare Worker

Stage 4: BUILD & DEPLOY (Automatic)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
4.1  Commit & Push → Cloudflare Pages auto-rebuilds and deploys
4.2  Verify both language versions render correctly on live site
4.3  Verify GentleNote appears with correct text for the article's category
4.4  Verify PanicButton appears (if difficulty: critical)
```

---

## 5. Content Taxonomy — UPDATED v1.3

> **Source:** `08_Content_Tool_Spec_v1.md` — Section 2.2
> **Architecture Decision:** Flat file structure with frontmatter-based classification.
> Dynamic pages (e.g., /category/hdd/) will be generated from taxonomy fields in a future phase.

### A. Taxonomy Fields Overview

| Field | Type | Required | Values |
|:------|:-----|:---------|:-------|
| `category` | Single enum | Yes | `hdd`, `ssd`, `raid`, `flash`, `mobile`, `nas`, `general` |
| `brands` | Array (0-3) | No | `western-digital`, `seagate`, `samsung`, `toshiba`, `kingston`, `crucial`, `sandisk`, `hikvision`, `other` |
| `symptoms` | Array (0-5) | No | `clicking-sound`, `not-detected`, `water-damage`, `fire-damage`, `deleted-files`, `formatted-drive`, `ransomware`, `bad-sectors`, `firmware-corruption`, `pcb-failure`, `head-crash`, `motor-failure`, `electrical-surge`, `physical-damage`, `logical-damage` |
| `difficulty` | Single enum | Yes | `simple`, `moderate`, `critical` |

### B. Difficulty Behavior

| Value | Arabic Label | English Label | Site Behavior |
|:------|:-------------|:--------------|:--------------|
| `simple` | بسيط — برمجي | Simple | GentleNote + ArticleDisclaimer only |
| `moderate` | متوسط — أدوات متخصصة | Moderate | GentleNote + ArticleDisclaimer only |
| `critical` | حرج — غرفة نظيفة | Critical | PanicButton + WarningBox + GentleNote + ArticleDisclaimer |

> **Note:** `difficulty: "critical"` replaces the old `panicLevel: "high"` / `showPanicButton: true`.
> The behavior is identical — critical articles get emergency UI components.

### C. Category → GentleNote Text Mapping — NEW v1.3

> This table shows which GentleNote text is selected per category.
> The component reads `category` and `symptoms` from frontmatter automatically.

| Category | Primary Symptom | GentleNote Text |
|:---------|:----------------|:----------------|
| `hdd` | `clicking-sound` | "لو بتسمع صوت طقطقة دلوقتي، ما تحاولش تشغل الهارد تاني." |
| `hdd` | `not-detected` | "لو الكمبيوتر مش شايف الهارد، ما تحاولش تفكه بنفسك." |
| `hdd` | (other/none) | "مشاكل الهارد ديسك ممكن تتفاقم لو اتعاملت معاها غلط." |
| `ssd` | (any) | "مشاكل الـ SSD غالباً بتحتاج أدوات متخصصة." |
| `raid` | (any) | "لو السيرفر وقع، ما تحاولش تعمل rebuild بنفسك." |
| `flash` | (any) | "لو الفلاشة أو الكارت مش شغالين، ما تعملش فورمات." |
| `dvr` | (any) | "كاميرات المراقبة محتاجة تعامل متخصص للحفاظ على التسجيلات." |
| `general` | (any) | "لو محتاج مساعدة متخصصة في استعادة البيانات." |

> All texts are suffixed with: "تواصل عبر واتساب أو زورنا في [المكان]."
> `[المكان]` reads from `location.short_address` in `location.ts`.

---

## 6. Content Types & Channels — NEW v1.3

### A. Content Produced by This Plan

| نوع المحتوى | الشكل | يُنتج هنا؟ | الأداة |
|:-------------|:------|:-----------|:-------|
| مقالات تقنية (Blog Posts) | `.mdx` | ✅ نعم | NotebookLM → Content Tool |
| صفحات خدمات (Service Pages) | `.mdx` | ✅ نعم | NotebookLM → Content Tool |
| قصص نجاح (Case Studies) | `.mdx` | ✅ نعم | NotebookLM → Content Tool |
| صفحات ثابتة (About, Contact, Privacy) | `.astro` | ❌ لا | كتابة مباشرة |
| صفحة SEO محلية (/jeddah/) | `.astro` | ❌ لا | كتابة مباشرة |
| ريلز (TikTok/Instagram) | فيديو | ❌ لا | إنتاج فيديو منفصل |

### B. Social Media Reels — NOTE v1.3

**ملاحظة مهمة:**
الريلز (TikTok/Instagram) **لا تُنتج عبر هذه الخطة**. هي محتوى فيديو يُنتج بشكل منفصل.

**دور خطة المحتوى:**
توثيق الريلز المنشورة فقط. عند نشر ريل جديد:
1. أضف بياناته في ملف `src/pages/index.astro` (قسم ReelsStrip)
2. البيانات المطلوبة: `thumbnail`, `title`, `views`, `url`
3. **لا تُنشئ ملفات MDX للريلز**

**مثال على بيانات ريل:**
```javascript
const reels = [
  {
    thumbnail: "/images/reels/burnt-hdd.jpg",
    title: "استخراج بيانات من هارد متفحم 🔥",
    views: "47K",
    url: "https://tiktok.com/@drhdd/video/xxxxx"
  },
  {
    thumbnail: "/images/reels/clicking-sound.jpg",
    title: "ليش الهارد بيطلع صوت طقطقة؟ 🔊",
    views: "23K",
    url: "https://tiktok.com/@drhdd/video/yyyyy"
  }
];
```

**ملاحظة عن المحتوى:**
- الريلز يمكن أن تشير لمقالات الموقع (cross-promotion)
- لكن الريلز ليست مصدراً للمحتوى المكتوب
- عند ذكر ريل في مقال: يكفي رابط خارجي عادي

---

## Appendix: Quick Reference Card — UPDATED v1.3

| Item | Value |
|:-----|:------|
| Content Philosophy | الموسوعة المعرفية — "المحتوى هو المنتج" |
| Total MVP Content | 5 Service Pages + 15 Blog Articles + 5 Case Studies = **50 files** (25 AR + 25 EN) |
| Content Pipeline | NotebookLM → Content Generator Tool → Language Review → GitHub → Cloudflare Pages |
| File Format | `.mdx` (MDX — Markdown with JSX components) |
| Frontmatter Format | YAML |
| AR Blog Path | `src/content/posts/ar/{slug}.mdx` |
| EN Blog Path | `src/content/posts/en/{slug}.mdx` |
| AR Case Study Path | `src/content/cases/ar/{slug}.mdx` |
| EN Case Study Path | `src/content/cases/en/{slug}.mdx` |
| Image Path (Blog) | `src/assets/images/posts/{slug}.webp` |
| Image Path (Services) | `src/assets/images/services/{slug}.webp` |
| Image Path (Cases) | `src/assets/images/cases/{slug}.webp` |
| Image Format | `.webp` (preferred) — max 200KB |
| Linking Mechanism | `translationID` field (MUST match in both files) |
| Auto-Injected (all) | `GentleNote` (before last paragraph) + `ArticleDisclaimer` (end) |
| Auto-Injected (critical) | `PanicButton` (after first H2) + `WarningBox` (after PanicButton) |
| Taxonomy Fields | `category`, `brands`, `symptoms`, `difficulty` |
| Case-Specific Fields | `device_type`, `badge`, `recovery_percentage`, `problem`, `solution`, `result` |
| Accuracy Reference | `KB_03_DataRecovery_Technical.md` |
| SEO Reference | `06_SEO_Jeddah_Market_Strategy_v3.md` |
| Internal Linking | `08_Internal_Linking_Map.md` (separate document) |
| Technical Architecture | `05_DrHardDisk_TAD_v4.2.md` |
| Content Tool Spec | `08_Content_Tool_Spec_v1.md` |
| Sales Language | **ممنوعة تماماً** في المقالات والخدمات وقصص النجاح |
| Location Mentions | **ممنوعة تماماً** في المحتوى التقني (GentleNote يتولاها) |
| Allowed Sales Pages | `/contact/` و `/jeddah/` فقط |

---

> **Document Status:** 🟢 Approved (v1.3)
> **Author:** Content Architecture Team
>
> **المبدأ الذهبي:**
> "المحتوى هو المنتج. الزائر يثق في المعلومة فيتواصل — لا نلح عليه."