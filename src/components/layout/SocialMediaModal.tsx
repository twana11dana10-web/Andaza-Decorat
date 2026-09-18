import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../ui/dialog'
import { BRAND_CONFIG } from '../../data/brand'
import { useLanguage } from '../../context/LanguageContext'
import { ExternalLink } from 'lucide-react'

interface SocialMediaModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const SocialMediaModal: React.FC<SocialMediaModalProps> = ({
  open,
  onOpenChange,
}) => {
  const { t } = useLanguage()

  const socialChannels = [
    {
      id: 'facebook',
      platform: 'Facebook',
      name: BRAND_CONFIG.social.facebook.name,
      handle: 'Andaza Decorat',
      url: BRAND_CONFIG.social.facebook.url,
      tagColor: 'text-blue-600 dark:text-blue-400 group-hover:text-[#1877F2]',
      cardHover: 'hover:border-[#1877F2]/70 hover:bg-blue-50/40 dark:hover:bg-[#121929] hover:shadow-[0_8px_30px_rgba(24,119,242,0.22)]',
      iconContainerHover: 'group-hover:bg-[#1877F2] group-hover:border-[#1877F2] group-hover:shadow-[0_0_28px_rgba(24,119,242,0.95),0_0_50px_rgba(24,119,242,0.45)] group-hover:scale-105',
      glowAura: 'bg-[#1877F2]/25',
      renderIcon: () => (
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6 fill-current text-white transition-all duration-300"
          viewBox="0 0 24 24"
        >
          {/* Bold Facebook f glyph matching circular emblem */}
          <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.196h3.312z" />
        </svg>
      ),
    },
    {
      id: 'instagram',
      platform: 'Instagram',
      name: BRAND_CONFIG.social.instagram.handle,
      handle: 'andaza_decoration',
      url: BRAND_CONFIG.social.instagram.url,
      tagColor: 'text-pink-600 dark:text-pink-400 group-hover:text-pink-500',
      cardHover: 'hover:border-pink-500/70 hover:bg-pink-50/40 dark:hover:bg-[#1c1322] hover:shadow-[0_8px_30px_rgba(225,48,108,0.22)]',
      iconContainerHover: 'group-hover:bg-gradient-to-tr group-hover:from-[#f09433] group-hover:via-[#dc2743] group-hover:to-[#bc1888] group-hover:border-transparent group-hover:shadow-[0_0_28px_rgba(225,48,108,0.95),0_0_45px_rgba(240,148,51,0.5)] group-hover:scale-105',
      glowAura: 'bg-gradient-to-tr from-[#f09433]/30 via-[#dc2743]/30 to-[#bc1888]/30',
      renderIcon: () => (
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6 fill-none stroke-current stroke-[2.2] text-white transition-all duration-300"
          viewBox="0 0 24 24"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Rounded square camera contour, center lens, flash dot */}
          <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
          <circle cx="12" cy="12" r="4.2" />
          <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" stroke="none" />
        </svg>
      ),
    },
    {
      id: 'tiktok',
      platform: 'TikTok',
      name: BRAND_CONFIG.social.tiktok.handle,
      handle: 'andaza_decoration',
      url: BRAND_CONFIG.social.tiktok.url,
      tagColor: 'text-rose-600 dark:text-rose-400 group-hover:text-rose-500',
      cardHover: 'hover:border-rose-500/70 hover:bg-rose-50/40 dark:hover:bg-[#19121d] hover:shadow-[0_8px_30px_rgba(254,44,85,0.22)]',
      iconContainerHover: 'group-hover:bg-black group-hover:border-[#fe2c55] group-hover:shadow-[0_0_28px_rgba(254,44,85,0.95),0_0_40px_rgba(37,244,238,0.7)] group-hover:scale-105',
      glowAura: 'bg-rose-500/25',
      renderIcon: () => (
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6 fill-current text-white transition-all duration-300 group-hover:drop-shadow-[-2px_-1.5px_0_#25F4EE] group-hover:drop-shadow-[2px_1.5px_0_#FE2C55]"
          viewBox="0 0 24 24"
        >
          {/* TikTok musical note glyph */}
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.88 2.89 2.89 0 0 1-2.89-2.88 2.89 2.89 0 0 1 2.89-2.89c.35 0 .68.07 1 .18v-3.5a6.37 6.37 0 0 0-1-.08A6.33 6.33 0 0 0 3 15.67 6.34 6.34 0 0 0 9.34 22a6.34 6.34 0 0 0 6.34-6.33V8.87a8.28 8.28 0 0 0 4.84 1.54V6.96a4.85 4.85 0 0 1-.93-.27z" />
        </svg>
      ),
    },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] md:max-w-[580px] w-full p-5 sm:p-7 md:p-8 bg-white/95 dark:bg-[#0c1018]/95 backdrop-blur-2xl border border-slate-200/90 dark:border-slate-800/90 text-slate-900 dark:text-slate-100 shadow-[0_25px_70px_rgba(0,0,0,0.45)] rounded-2xl sm:rounded-3xl">
        
        {/* Header with Project Logo and Title */}
        <DialogHeader className="p-0 text-center flex flex-col items-center pt-1 pb-0.5 space-y-1">
          {/* Project Logo at the Top */}
          <div className="relative flex items-center justify-center">
            <img
              src="/images/andaza-emblem-transparent.png"
              alt={BRAND_CONFIG.name}
              className="h-16 sm:h-20 w-auto object-contain drop-shadow-[0_4px_24px_rgba(217,170,75,0.35)] select-none transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* Official Platforms Title directly under the logo with IBM Font */}
          <DialogTitle className="text-xl sm:text-2xl md:text-[25px] font-ibm font-bold text-slate-900 dark:text-white tracking-tight pt-1">
            {t('social.modalTitle')}
          </DialogTitle>

          <DialogDescription className="sr-only">
            Official social media platforms of {BRAND_CONFIG.name}
          </DialogDescription>
        </DialogHeader>

        {/* Social Accounts List */}
        <div className="space-y-3 sm:space-y-3.5 pt-2">
          {socialChannels.map((channel) => (
            <a
              key={channel.id}
              href={channel.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative flex items-center justify-between gap-3.5 sm:gap-4.5 p-3.5 sm:p-4.5 rounded-2xl bg-slate-50/90 dark:bg-[#121622]/90 border border-slate-200/90 dark:border-slate-800/80 transition-all duration-300 cursor-pointer overflow-hidden ${channel.cardHover}`}
              title={`${channel.platform}: ${channel.name}`}
            >
              {/* Radial ambient background aura glowing on hover */}
              <div
                className={`absolute -right-10 -top-10 w-44 h-44 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${channel.glowAura}`}
              />

              {/* Left: Dark Circle Icon Badge with White Icon (Glows in Brand Color on Hover) */}
              <div className="flex items-center gap-3.5 sm:gap-4 min-w-0 relative z-10">
                <div
                  className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-black dark:bg-[#07090f] border border-slate-700/80 flex items-center justify-center shrink-0 transition-all duration-300 shadow-md ${channel.iconContainerHover}`}
                >
                  {channel.renderIcon()}
                </div>

                {/* Account Details */}
                <div className="min-w-0 text-left rtl:text-right">
                  <span
                    className={`text-[11px] sm:text-xs font-bold uppercase tracking-wider block leading-tight transition-colors duration-300 ${channel.tagColor}`}
                  >
                    {channel.platform}
                  </span>
                  <p
                    className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-black dark:group-hover:text-white transition-colors truncate mt-0.5"
                    dir="ltr"
                  >
                    {channel.name}
                  </p>
                </div>
              </div>

              {/* Right: Visit / Open Badge with Arrow */}
              <div className="relative z-10 flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors shrink-0">
                <span className="hidden min-[360px]:inline text-xs sm:text-sm font-medium">
                  {t('social.openAccount')}
                </span>
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/70 flex items-center justify-center text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-all duration-300 group-hover:scale-105 shadow-xs">
                  <ExternalLink className="h-4 w-4 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform" />
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Brand signature footer */}
        <div className="pt-2 sm:pt-3 text-center border-t border-slate-200/60 dark:border-slate-800/60 -mx-1">
          <p className="text-xs sm:text-[12px] text-slate-400 dark:text-slate-500 font-medium">
            {BRAND_CONFIG.name} • {BRAND_CONFIG.tagline}
          </p>
        </div>

      </DialogContent>
    </Dialog>
  )
}
