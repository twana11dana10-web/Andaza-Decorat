import React, { useState } from 'react'
import { useLanguage } from '../../context/LanguageContext'
import { openWhatsAppChat } from '../../lib/helpers'
import { BRAND_CONFIG } from '../../data/brand'
import { ArrowRight, Share2 } from 'lucide-react'
import { SocialMediaModal } from './SocialMediaModal'

export const WhatsAppFloatingHelp: React.FC = () => {
  const { t } = useLanguage()
  const [isSocialModalOpen, setIsSocialModalOpen] = useState(false)

  const handleWhatsAppChat = () => {
    openWhatsAppChat(t('help.whatsappPreset'))
  }

  return (
    <footer className="w-full relative z-10 py-2.5 sm:py-3 border-t border-slate-200/80 dark:border-slate-800/80 mt-auto bg-white/70 dark:bg-[#0a0e14]/70 backdrop-blur-xl">
      <div className="max-w-[1700px] mx-auto px-3 sm:px-6 lg:px-8 flex flex-row items-center justify-between gap-2.5 sm:gap-6">

        {/* Brand Information & Credits (Left side on both mobile and desktop) */}
        <div className="flex-1 min-w-0 space-y-0.5 sm:space-y-1.5 text-left rtl:text-right">
          <p className="text-[10px] sm:text-xs font-semibold text-slate-700 dark:text-slate-300 truncate">
            {t('brand.tagline')}
          </p>
          <p className="text-[10px] sm:text-xs font-medium text-slate-600 dark:text-slate-400 truncate" dir="ltr">
            Contact: {BRAND_CONFIG.contact.contactDisplay}
          </p>
          <div className="flex flex-wrap items-center justify-start rtl:justify-end gap-x-1 sm:gap-x-2 gap-y-0.5 text-[9px] sm:text-[11px] text-slate-400 dark:text-slate-500">
            <span>© 2026 Andaza Decorat.</span>
            <span className="hidden min-[380px]:inline">•</span>
            <span className="hidden min-[380px]:inline">All rights reserved.</span>
            <span>•</span>
            <span>Developed by <strong className="text-slate-600 dark:text-slate-300 font-semibold">Twana</strong></span>
          </div>
        </div>

        {/* Actions Container: Stacked buttons on right for mobile, side-by-side on desktop */}
        <div className="flex flex-col sm:flex-row items-end sm:items-center justify-end gap-1.5 sm:gap-2.5 shrink-0">

          {/* Social Media Channels Button (Opens popup listing Facebook, Instagram, TikTok) */}
          <button
            onClick={() => setIsSocialModalOpen(true)}
            className="w-full sm:w-auto group inline-flex items-center justify-between sm:justify-start gap-1.5 sm:gap-2.5 bg-white dark:bg-[#131823] hover:bg-amber-50/70 dark:hover:bg-amber-950/30 text-slate-800 dark:text-slate-100 hover:text-amber-600 dark:hover:text-amber-400 px-2.5 sm:px-4 py-1.5 sm:py-2.5 rounded-lg sm:rounded-xl border border-slate-200 dark:border-slate-800 hover:border-amber-500/60 dark:hover:border-amber-500/50 shadow-sm hover:shadow-[0_0_20px_rgba(217,170,75,0.25)] transition-all duration-300 cursor-pointer active:scale-98 shrink-0"
            title={t('social.buttonTitle')}
            aria-label={t('social.buttonTitle')}
          >
            <div className="flex items-center gap-1.5 sm:gap-2.5 min-w-0">
              <div className="w-5 h-5 sm:w-7 sm:h-7 rounded-md sm:rounded-lg bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/20 flex items-center justify-center text-amber-600 dark:text-amber-400 group-hover:scale-110 group-hover:bg-amber-500/25 transition-all duration-300 shrink-0 shadow-xs">
                <Share2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </div>

              <span className="text-[10px] sm:text-[13px] font-semibold tracking-wide truncate">
                {t('social.buttonText')}
              </span>
            </div>
          </button>

          {/* WhatsApp Direct Contact Button */}
          <button
            onClick={handleWhatsAppChat}
            className="w-full sm:w-auto group inline-flex items-center justify-between sm:justify-start gap-1.5 sm:gap-3 bg-white dark:bg-[#131823] hover:bg-sky-50/70 dark:hover:bg-sky-950/40 text-slate-800 dark:text-slate-100 hover:text-sky-700 dark:hover:text-sky-300 px-2.5 sm:px-4 py-1.5 sm:py-2.5 rounded-lg sm:rounded-xl border border-slate-200 dark:border-slate-800 hover:border-sky-500/60 dark:hover:border-sky-500/50 shadow-sm hover:shadow-[0_0_20px_rgba(14,165,233,0.25)] transition-all duration-300 cursor-pointer active:scale-98 shrink-0"
            aria-label="Contact us on WhatsApp for help"
          >
            <div className="flex items-center gap-1.5 sm:gap-2.5 min-w-0">
              {/* Glowing sky blue icon badge */}
              <div className="w-5 h-5 sm:w-7 sm:h-7 rounded-md sm:rounded-lg bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-500 dark:text-sky-400 group-hover:scale-110 group-hover:bg-sky-500/25 transition-all duration-300 shrink-0 shadow-xs">
                <svg
                  className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-sky-500 dark:fill-sky-400"
                  viewBox="0 0 24 24"
                >
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
              </div>

              {/* Text next to the icon */}
              <span className="text-[10px] sm:text-[13px] font-semibold tracking-wide truncate">
                {t('help.floatingText')}
              </span>
            </div>

            {/* Subtle mobile arrow */}
            <div className="hidden min-[380px]:inline sm:hidden text-slate-400 group-hover:text-sky-500 transition-colors shrink-0">
              <ArrowRight className="h-3 w-3 rtl:rotate-180" />
            </div>
          </button>

        </div>

      </div>

      {/* Social Media Channels Modal */}
      <SocialMediaModal
        open={isSocialModalOpen}
        onOpenChange={setIsSocialModalOpen}
      />
    </footer>
  )
}
