# Data Model: Article Listing

## Entities

### `Article` (Content Collection: `posts`)

The core entity representing a single knowledge base article. It is defined in `src/content.config.ts` using Astro's `zod` validation.

**Fields**:
- `title` (String, Required): The H1 title of the article.
- `description` (String, Required): A short summary for the index card and SEO meta tag.
- `pubDate` (Date, Required): The publication date, used for sorting.
- `updatedDate` (Date, Optional): The last modification date.
- `heroImage` (Image, Optional): The main image for the article and thumbnail for the card. Must be processed by Astro.
- `category` (String, Required): The primary category tag for client-side filtering.
- `draft` (Boolean, Optional): If `true`, the article is excluded from the published listing.
- `translationID` (String, Required for Arabic, ignored for English if identical slug): The ID connecting an English twin to its Arabic original.

**Relationships**:
- Translated English twins share the same `slug` under `src/content/posts/en/`.
- Belongs to a single `Category`.

### `Category` (Metadata)

An implicit entity extracted dynamically from all published articles.

**Fields**:
- `name` (String): Stored internally as a normalized tag string (e.g., 'hdd', 'ssd', 'usb').

## Validation Rules

1. `getCollection('posts')` must filter out any entry where `data.draft === true`.
2. Astro's `zod` schema must enforce required frontmatter fields, failing the build if `title`, `description`, `pubDate`, or `category` is missing.

## State Transitions

- **Draft → Published**: The author removes or sets `draft: false` in the MDX frontmatter. The SSG build will now include the article in the listing.
