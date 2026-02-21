# Quickstart: Article Listing

## Overview
This feature introduces the Article Listing hub (`/posts` and `/en/posts`) in the Dr. Hard Disk project. The goal is to dynamically render `.mdx` files defined in `src/content/posts/*` and implement client-side filtering by category.

## Development Setup

The standard Astro development server is all that is required.

```bash
# Install dependencies
npm install

# Run the dev server
npm run dev
```

## Local Testing

Navigate to:
- `http://localhost:4321/posts` for the Arabic article index.
- `http://localhost:4321/en/posts` for the English article index.

## Verifying Constraints
- Click on the category chips to ensure the lists filter down instantly without page reloads.
- Verify that draft articles (e.g., those with `draft: true` in their frontmatter) do not appear in the grid.
- Build the project using `npm run build` and serve locally using `npm run preview` to confirm zero SSR hydration errors or image optimization issues from Cloudflare Pages output constraints.
