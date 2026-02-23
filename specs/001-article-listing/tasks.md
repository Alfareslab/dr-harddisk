# Tasks: Article Listing

## Phase 1: Setup & Infrastructure
**Goal**: Prepare the Astro project for the Article Listing feature.

- [x] T001 Initialize the feature branch (`001-article-listing`) if not already active.
- [x] T002 Update `src/content.config.ts` to ensure the `posts` collection schema defines `title`, `description`, `pubDate`, `heroImage`, `category`, `draft`, and `translationID`.
- [x] T003 Ensure dummy `.mdx` content exists in `src/content/posts` and `src/content/posts/en` to test the listing before frontend implementation is finalized.

## Phase 2: Foundational (Blocking)
**Goal**: Create the shared utility functions needed across both Arabic and English pages.

- [x] T004 Create `src/utils/content.ts` with a function `getPublishedPosts()` that fetches all posts and filters out `draft: true`.
- [x] T005 Create `src/components/ArticleCard.astro` to render individual article summaries in a consistent, RTL-compatible grid format.
- [x] T006 Create `src/components/CategoryFilter.astro` (UI skeleton only, no JS yet) to hold the category chips.

## Phase 3: User Story 1 - View All Articles (P1)
**Goal**: Render the base list of published articles on the Arabic index page.
**Independent Test**: Navigate to `/posts` and observe the list of Arabic articles excluding drafts.

- [x] T007 [US1] Create `src/pages/posts/index.astro`.
- [x] T008 [US1] Inside `src/pages/posts/index.astro`, fetch published Arabic posts using `getPublishedPosts()`.
- [x] T009 [US1] Render the fetched posts using a grid of `<ArticleCard />` components.

## Phase 4: User Story 2 - Bilingual Browsing (P2)
**Goal**: Implement the English equivalent index page and ensure language separation.
**Independent Test**: Navigate to `/en/posts` and observe ONLY English articles.

- [x] T010 [US2] Create `src/pages/en/posts/index.astro`.
- [x] T011 [US2] Inside `src/pages/en/posts/index.astro`, fetch published English posts using `getPublishedPosts()` and filtering for the `/en/` locale.
- [x] T012 [US2] Render the fetched posts using a grid of `<ArticleCard />` components, validating LTR layout consistency.

## Phase 5: User Story 3 - Category Filtering (P3)
**Goal**: Add instant client-side filtering by category.
**Independent Test**: Click a category chip on `/posts` and see the list update instantly.

- [x] T013 [US3] Add a client-side vanilla JavaScript block (`<script>`) to `src/components/CategoryFilter.astro` that listens for clicks on category buttons.
- [x] T014 [US3] Implement the filtering logic in the script to toggle a hidden utility class (e.g., `hidden`) on `ArticleCard` DOM elements based on their mapped category data attributes.
- [x] T015 [US3] Integrate `<CategoryFilter />` into both `src/pages/posts/index.astro` and `src/pages/en/posts/index.astro` above the article grids.

## Phase 6: Polish & Cross-Cutting
**Goal**: Finalize UI, SEO, and ensure all design rules are met.

- [x] T016 Apply standard Arabic fonts (e.g., IBM Plex Sans Arabic/Cairo) and consistent "No Panic" colors to the listing pages.
- [x] T017 Verify that Astro `<Image />` is correctly optimizing all `heroImage` props at build time to satisfy the Edge Runtime restrictions.
- [x] T018 Test SEO metadata (`<title>`, `<meta name="description">`) for both LTR and RTL index pages.

## Implementation Strategy
- **MVP**: First complete Phase 1 through Phase 3 to establish the core knowledge base routing for Arabic.
- **Incremental**: Add Phase 4 for English support.
- **Final Polish**: Implement the JS filtering (Phase 5) and verify final RTL styling (Phase 6).
