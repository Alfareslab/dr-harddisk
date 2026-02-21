// src/content/config.ts
// ══════════════════════════════════════════════════════════════
// Content Collections Schema — Dr. Hard Disk
// Source: TAD v4.2 §3.1–§3.3 | Constitution §9.2
// API: Astro v5 Content Layer API (glob loader)
// ══════════════════════════════════════════════════════════════
//
// WARNING: This file uses Astro v5 Content Layer API.
//   - DO NOT use defineCollection() without a loader
//   - DO NOT use getEntryBySlug() — removed in v5
//   - DO NOT use entry.render() — use render(entry) instead
// ══════════════════════════════════════════════════════════════

import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// ─── Shared Enums ───

const categoryEnum = z.enum([
    "hdd",
    "ssd",
    "raid",
    "flash",
    "mobile",
    "nas",
    "general",
]);

const brandEnum = z.enum([
    "western-digital",
    "seagate",
    "samsung",
    "toshiba",
    "kingston",
    "crucial",
    "sandisk",
    "hikvision",
    "other",
]);

const symptomEnum = z.enum([
    "clicking-sound",
    "not-detected",
    "water-damage",
    "fire-damage",
    "deleted-files",
    "formatted-drive",
    "ransomware",
    "bad-sectors",
    "firmware-corruption",
    "pcb-failure",
    "head-crash",
    "motor-failure",
    "electrical-surge",
    "physical-damage",
    "logical-damage",
]);

const difficultyEnum = z.enum(["simple", "moderate", "critical"]);

const langEnum = z.enum(["ar", "en"]);

// ─── Posts Collection ───

const posts = defineCollection({
    loader: glob({ pattern: "**/*.mdx", base: "src/content/posts" }),
    schema: z.object({
        // Core Identity
        title: z.string().min(10).max(120),
        description: z.string().min(50).max(160),
        pubDate: z.coerce.date(),
        heroImage: z.string().startsWith("../../assets/images/"),
        lang: langEnum,
        translationID: z.string(),

        // Taxonomy
        category: categoryEnum,
        brands: z.array(brandEnum).max(3).optional().default([]),
        symptoms: z.array(symptomEnum).max(5).optional().default([]),
        difficulty: difficultyEnum,

        // Control
        draft: z.boolean().optional().default(false),
        featured: z.boolean().optional().default(false),
    }),
});

// ─── Services Collection ───

const services = defineCollection({
    loader: glob({ pattern: "**/*.mdx", base: "src/content/services" }),
    schema: z.object({
        title: z.string().min(10).max(120),
        description: z.string().min(50).max(160),
        pubDate: z.coerce.date(),
        heroImage: z.string().startsWith("../../assets/images/"),
        lang: langEnum,
        translationID: z.string(),

        category: categoryEnum,
        brands: z.array(brandEnum).max(3).optional().default([]),
        symptoms: z.array(symptomEnum).max(5).optional().default([]),
        difficulty: difficultyEnum,

        draft: z.boolean().optional().default(false),
        featured: z.boolean().optional().default(false),
    }),
});

// ─── Cases Collection (Success Stories) — NEW v4.2 ───

const cases = defineCollection({
    loader: glob({ pattern: "**/*.mdx", base: "src/content/cases" }),
    schema: z.object({
        // Case Study Identity
        title: z.string(),
        device_type: z.enum(["hdd", "ssd", "raid", "flash"]),
        brand: brandEnum.optional(),
        problem: z.string(),
        solution: z.string(),
        result: z.string(),
        recovery_percentage: z.number().min(0).max(100),
        badge: z.enum(["success", "challenge"]),
        date: z.coerce.date(),
        lang: langEnum,
        translationID: z.string(),
        heroImage: z.string().startsWith("../../assets/images/").optional(),

        draft: z.boolean().optional().default(false),
    }),
});

// ─── Export ───

export const collections = { posts, services, cases };
