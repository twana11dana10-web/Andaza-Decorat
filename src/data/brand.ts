export const BRAND_CONFIG = {
  name: "ANDAZA DECORAT",
  tagline: "Luxury Decoration is here",
  currency: "IQD",
  subtitle: "A digital showroom dedicated to luxury exterior decorations, facade architectural design, and premium cladding for houses and towers.",
  showroomAddress: "742 Al-Andalus Boulevard, Design District, Riyadh, KSA",
  contact: {
    email: "atelier@andazadecorat.com",
    phone: "07509151156",
    whatsapp: "9647509151156",
    whatsappDisplay: "07509151156",
    contactDisplay: "0750 915 1156 - 0778 291 3892",
    phones: ["07509151156", "07782913892"],
    hours: "Sat – Thu: 10:00 AM – 9:00 PM (By Appointment & Walk-in)",
  },
  social: {
    instagram: "@andazadecorat",
    tiktok: "https://www.tiktok.com/@andaza_decorat",
    linkedin: "andaza-decorat",
  },
  logo: {
    full: '/images/andaza-logo-transparent.png',
    transparent: '/images/andaza-logo-transparent.png',
    emblem: '/images/andaza-emblem-transparent.png',
    emblemTransparent: '/images/andaza-emblem-transparent.png',
  },
  storage: {
    // Cloud storage configurations for direct WhatsApp invoice links
    // Can also be configured via .env (VITE_SUPABASE_URL, VITE_CLOUDINARY_CLOUD_NAME, etc.)
    supabase: {
      url: import.meta.env.VITE_SUPABASE_URL || '',
      anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
      bucket: 'invoices',
    },
    cloudinary: {
      cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || '',
      uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || '',
    },
    customEndpoint: import.meta.env.VITE_CUSTOM_STORAGE_ENDPOINT || '',
  },
  year: 2026,
}
