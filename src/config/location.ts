// src/config/location.ts
// ══════════════════════════════════════════════════════════════
// THE ATOMIC CORE — Datacodex Portable Brand
// Source: master-constitution.md §11 | Vision v2.0 §3.1
// ══════════════════════════════════════════════════════════════
//
// ARCHITECTURE:
//   brand        → PERMANENT — never changes (Datacodex identity)
//   currentLocation → SWAPPABLE — changes when facility changes
//
// DANGER: Never import brand data from currentLocation or vice versa.
//         Never hardcode location names in .mdx or .astro files.
//         Always read from this file via imports.
//
// WHEN RELOCATING: Only update `currentLocation` object.
//         Brand remains untouched. Site rebuilds automatically.
// ══════════════════════════════════════════════════════════════

// ─── TypeScript Interfaces ───

export interface Brand {
    name: string;
    nameEn: string;
    tagline: { ar: string; en: string };
    title: string;
    titleEn: string;
    specialty: { ar: string; en: string };
    siteUrl: string;
    version: string;
    contact: {
        whatsapp: string;
        whatsappUrl: string;
    };
}

export interface Location {
    facilityName: { ar: string; en: string };
    city: { ar: string; en: string };
    district: { ar: string; en: string };
    street: { ar: string; en: string };
    postalCode: string;
    googleMapsUrl: string;
    contact: {
        phone: string;
        whatsapp: string;
        whatsappUrl: string;
    };
    socialMedia: {
        tiktok: string;
        snapchat: string;
        linktree: string;
    };
    gentleNotes: Record<string, { ar: string; en: string }>;
}

// ─── BRAND — PERMANENT (never changes) ───

export const brand: Brand = {
    name: "Datacodex",
    nameEn: "Datacodex",

    tagline: {
        ar: "مرجعك العربي لاستعادة البيانات",
        en: "Your Arabic Reference for Data Recovery",
    },

    title: "Datacodex — مرجعك العربي لاستعادة البيانات",
    titleEn: "Datacodex — Your Arabic Reference for Data Recovery",

    specialty: {
        ar: "قاعدة معرفية متخصصة في استعادة البيانات",
        en: "Knowledge Base Specialized in Data Recovery",
    },

    siteUrl: import.meta.env.PUBLIC_SITE_URL ?? "", // Fixed: use import.meta.env
    version: "0.0.1",

    // Personal contact (Datacodex — stable)
    contact: {
        whatsapp: "966507322542",
        whatsappUrl: "https://wa.me/966507322542",
    },
};

// ─── CURRENT LOCATION — SWAPPABLE (update when facility changes) ───

export const currentLocation: Location = {
    facilityName: {
        ar: "مركز الفارس لصيانة الكمبيوتر واستعادة البيانات",
        en: "Al-Fares Computer Maintenance & Data Recovery Center",
    },

    city: { ar: "جدة", en: "Jeddah" },
    district: { ar: "حي الشرفية", en: "Al-Sharafiyah District" },
    street: { ar: "شارع خالد بن الوليد", en: "Khalid Ibn Al-Waleed Street" },
    postalCode: "23218",

    googleMapsUrl: "https://maps.app.goo.gl/DbpKJBbTKQxCTCGW9",

    // Currently same as brand contact (may change with relocation)
    contact: {
        phone: "0507322542",
        whatsapp: "966507322542",
        whatsappUrl: "https://wa.me/966507322542",
    },

    // Social media (facility-specific)
    socialMedia: {
        tiktok: "https://tiktok.com/@alfares.datarecovry",
        snapchat: "https://snapchat.com/add/alfaresrecovery",
        linktree: "https://allmylinks.com/alfares-datarecovry",
    },

    // Gentle notes (dynamic — changes with location, categorised for services and articles)
    gentleNotes: {
        hdd: {
            ar: "لو بتسمع صوت طقطقة أو الهارد مش بيقرأ، ماتحاولش تشغله تاني. فريقنا في مركز الفارس متاح للمساعدة المتخصصة.",
            en: "If you hear clicking or the drive is not reading, do not power it on again. Our team at Al-Fares Center is available for specialized help."
        },
        ssd: {
            ar: "لو الـ SSD توقف فجأة عن العمل، المشكلة غالبا بتكون في وحدة التحكم (Controller). فريقنا في مركز الفارس متاح للمساعدة المتخصصة.",
            en: "If your SSD suddenly stopped working, it's likely a Controller issue. Our team at Al-Fares Center is available for specialized help."
        },
        flash: {
            ar: "لو الفلاشة اتكسرت أو بتطلب فورمات، ماتعملش فورمات للبيانات. فريقنا في مركز الفارس متاح للمساعدة المتخصصة.",
            en: "If your flash drive is physically broken or asking to format, do not format it. Our team at Al-Fares Center is available for specialized help."
        },
        raid: {
            ar: "لو مصفوفة الـ RAID وقعت، أي محاولة غير دقيقة لإعادة البناء ممكن تدمر البيانات للأبد. فريقنا في مركز الفارس متاح للمساعدة المتخصصة.",
            en: "If a RAID array fails, any inaccurate rebuild attempt can permanently destroy data. Our team at Al-Fares Center is available for specialized help."
        },
        general: {
            ar: "لو محتاج مساعدة متخصصة في استعادة البيانات، فريقنا في مركز الفارس لصيانة الكمبيوتر واستعادة البيانات (جدة) متاح.",
            en: "If you need specialized help in data recovery, our team at Al-Fares Computer Maintenance & Data Recovery Center (Jeddah) is available."
        }
    },
};
