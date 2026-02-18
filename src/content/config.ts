// src/content/config.ts — PLACEHOLDER
// No-AI-First-Draft Rule: This file must be written manually.
// Full Zod schema implementation in Phase 1.2.
// Reference: master-constitution.md §9.2 + TAD §3.3
import { defineCollection } from 'astro:content';

export const collections = {
    posts: defineCollection({}),
    services: defineCollection({}),
    cases: defineCollection({}),
};
