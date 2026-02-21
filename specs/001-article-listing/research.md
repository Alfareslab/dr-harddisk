# Research: Article Listing

## Output of Phase 0 (/speckit.plan)

### Decision 1: Client-Side vs Server-Side Filtering
- **Decision**: Client-Side Filtering using Vanilla JavaScript + CSS `display: none`.
- **Rationale**: An SSG site means we don't have a live node server to handle filter requests natively without re-rendering the whole page. Since the maximum expected article volume is ~1000, sending the full DOM once (prerendered) and filtering instantly in the client yields the fastest TTFB and UX.
- **Alternatives considered**: Astro islands with Preact/SolidJS. Rejected to minimize JS payload. URL query parameters with SSR. Rejected because it violates the "SSG By Default" constitution rule.

### Decision 2: Routing Architecture for Locale Split
- **Decision**: Physical directory routing (`/pages/posts/index.astro` and `/pages/en/posts/index.astro`).
- **Rationale**: Astro's file-based routing perfectly handles static generation for localized routes. The collection queries will just filter by the existence of `/en/` in the slug.
- **Alternatives considered**: Dynamic routing `[lang]/posts.astro`. Rejected because static routing is clearer for simple twin structures and already established in the project.

### Decision 3: Image Optimization
- **Decision**: Astro `<Image />` component exclusively.
- **Rationale**: Mandatory rule passing. Cloudflare Pages requires pre-rendered imagery.
- **Alternatives considered**: Standard `<img>` tag. Rejected due to poor LCP performance.

---
*All NEEDS CLARIFICATION items resolved.*
