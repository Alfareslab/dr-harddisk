// astro.config.mjs — Dr. Hard Disk v1.0.0
// Source of truth: master-constitution.md §9.1 + TAD §1.1
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';

// Domain from environment variable (Risk B-3)
const siteURL = process.env.PUBLIC_SITE_URL || 'https://drharddisk.sa';

export default defineConfig({
  site: siteURL,

  // Pre-render First (master-constitution.md §9.1)
  // output: 'hybrid' is FORBIDDEN in this project
  output: 'static',

  adapter: cloudflare({
    // Build-time image processing — required for V8 Isolates (§9.1.1)
    imageService: 'compile',
    platformProxy: {
      enabled: true,
    },
  }),

  vite: {
    plugins: [tailwindcss()],
    build: {
      cssMinify: 'lightningcss',
    },
  },

  build: {
    inlineStylesheets: 'auto',
  },

  // i18n: Arabic default, English as subdirectory
  i18n: {
    defaultLocale: 'ar',
    locales: ['ar', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },

  integrations: [
    // Sitemap — NO hreflang here (Risk S-1: single source = HreflangTags.astro)
    sitemap({
      filter: (page) => {
        const excludePatterns = ['/api/', '/404', '/_'];
        return !excludePatterns.some((pattern) => page.includes(pattern));
      },
    }),
    mdx(),
  ],
});
