// src/config/location.ts
// ══════════════════════════════════════════════════════════════
// THE ATOMIC CORE — Dr. Hard Disk Portable Brand
// Source: master-constitution.md §11 | Vision v2.0 §3.1
// ══════════════════════════════════════════════════════════════
//
// ARCHITECTURE:
//   brand        → PERMANENT — never changes (Dr. Hard Disk identity)
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
  gentleNote: { ar: string; en: string };
}

// ─── BRAND — PERMANENT (never changes) ───

export const brand: Brand = {
  name: "د.هارد ديسك",
  nameEn: "Dr. Hard Disk",

  tagline: {
    ar: "مرجعك العربي لاستعادة البيانات",
    en: "Your Arabic Reference for Data Recovery",
  },

  title: "د.هارد ديسك — مرجعك العربي لاستعادة البيانات",
  titleEn: "Dr. Hard Disk — Your Arabic Reference for Data Recovery",

  specialty: {
    ar: "قاعدة معرفية متخصصة في استعادة البيانات",
    en: "Knowledge Base Specialized in Data Recovery",
  },

  siteUrl: import.meta.env.PUBLIC_SITE_URL ?? "", // From .env — domain not chosen yet

  // Personal contact (Dr. Hard Disk — stable)
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

  // Gentle note (dynamic — changes with location)
  gentleNote: {
    ar: "لو محتاج مساعدة عملية، فريقنا في مركز الفارس لصيانة الكمبيوتر واستعادة البيانات (جدة) متاح للاستشارة.",
    en: "If you need hands-on help, our team at Al-Fares Computer Maintenance & Data Recovery Center (Jeddah) is available for consultation.",
  },
};
