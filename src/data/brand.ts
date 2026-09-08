export const BRAND_CONFIG = {
  name: "ANDAZA DECORAT",
  tagline: "Luxury Decoration is here",
  currency: "IQD",
  subtitle: "A digital showroom dedicated to luxury exterior decorations, facade architectural design, and premium cladding for houses and towers.",
  showroomAddress: "742 Al-Andalus Boulevard, Design District, Riyadh, KSA",
  contact: {
    email: "atelier@andazadecorat.com",
    phone: "07782913892",
    whatsapp: "9647782913892",
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
  whatsappApi: {
    // WhatsApp Document API provider for sending native PDF document messages
    // Can be configured in .env (VITE_WHATSAPP_INSTANCE_ID, VITE_WHATSAPP_TOKEN)
    provider: (import.meta.env.VITE_WHATSAPP_API_PROVIDER as 'ultramsg' | 'green-api') || 'ultramsg',
    instanceId: import.meta.env.VITE_WHATSAPP_INSTANCE_ID || '',
    token: import.meta.env.VITE_WHATSAPP_TOKEN || '',
  },
  year: 2026,
}
