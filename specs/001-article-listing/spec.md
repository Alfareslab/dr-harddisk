# Feature Specification: Article Listing (Phase 1.7)

**Feature Branch**: `001-article-listing`  
**Created**: 2026-02-21  
**Status**: Draft  
**Input**: User description: "Article Listing: Articles index page with filtering/categorization capability, acting as the hub for all MDX content."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - View All Articles (Priority: P1)

As a user seeking data recovery knowledge, I want to see a comprehensive list of all available articles so that I can browse the topics and find what I need.

**Why this priority**: It is the core function of the hub index page. Without it, users cannot discover existing knowledge base articles.

**Independent Test**: Can be fully tested by navigating to `/posts` and seeing a list of rendered article cards containing title, description, and date.

**Acceptance Scenarios**:

1. **Given** the user navigates to the articles index, **When** the page loads, **Then** all published articles should be displayed as summary cards.
2. **Given** there are draft articles in the system, **When** the user views the index, **Then** the draft articles must be excluded from the list.

---

### User Story 2 - Bilingual Browsing (Priority: P2)

As a bilingual user, I want the article listings to respect my current language selection so that I only see articles in the language I can read.

**Why this priority**: Datacodex is an Arabic-first platform with English twins. Separating content by language is vital for SEO and user experience.

**Independent Test**: Can be fully tested by switching between `/posts` (Arabic) and `/en/posts` (English) and verifying that only articles matching the language are shown.

**Acceptance Scenarios**:

1. **Given** the user is on the Arabic index (`/posts`), **When** the list is generated, **Then** only Arabic `.mdx` content from `src/content/posts` with `lang: 'ar'` or no lang parameter should be shown.
2. **Given** the user is on the English index (`/en/posts`), **When** the list is generated, **Then** only English `.mdx` content from `src/content/posts` with `lang: 'en'` should be shown.

---

### User Story 3 - Category Filtering (Priority: P3)

As a user experiencing a specific type of media failure (e.g., HDD clicking), I want to filter the articles by relevant categories so that I can quickly zero in on my exact problem.

**Why this priority**: As the number of articles grows, filtering becomes necessary to prevent information overload.

**Independent Test**: Can be tested by clicking on a category tag (e.g., "HDD") and verifying that the list updates to show only articles tagged with "HDD".

**Acceptance Scenarios**:

1. **Given** the user is on the article listing, **When** they select a specific category filter, **Then** the list should be restricted to articles matching that category.
2. **Given** the user has selected a category filter, **When** they click "Clear" or "All", **Then** the full list of articles should be restored.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST render a responsive grid or list of article cards on the index page.
- **FR-002**: System MUST automatically exclude any articles where `draft: true` in the frontmatter.
- **FR-003**: System MUST provide distinct language-based routing: `/posts` for Arabic and `/en/posts` for English.
- **FR-004**: System MUST display the article's title, publication date, short description, and category tags on each card.
- **FR-005**: System MUST allow users to filter articles using predefined categories defined in the MDX frontmatter.
- **FR-006**: System MUST sort the articles in descending order by publication date (newest first).

### Key Entities

- **Article (Post)**: MDX content file. Key attributes include title, description, pubDate, category, and draft status.
- **Category (Tag)**: Metadata attached to articles used to group related topics efficiently.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can view the full list of published articles on the index page.
- **SC-002**: Navigating between the main index and a specific category filter updates the displayed cards without layout shifting.
- **SC-003**: English and Arabic articles are strictly separated on their respective language paths.
- **SC-004**: The design matches the "No Panic UI" philosophy (calm colors, clear typography, no hard-sell CTAs).
