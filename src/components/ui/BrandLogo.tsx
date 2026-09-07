import React from 'react'
import { cn } from '../../lib/utils'
import { useLanguage } from '../../context/LanguageContext'

interface BrandLogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'hero'
  showText?: boolean
  showTagline?: boolean
  variant?: 'emblem' | 'full'
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className,
  size = 'md',
  showText = true,
  showTagline = false,
  variant = 'full',
}) => {
  const { t, language, isRTL } = useLanguage()

  const sizeMap = {
    sm: {
      emblem: 'h-7 min-[380px]:h-8.5 sm:h-11 md:h-12 w-auto object-contain',
      textImg: 'h-3 min-[380px]:h-3.5 sm:h-5 md:h-5.5 w-auto object-contain',
      text: 'text-xs min-[380px]:text-sm sm:text-base md:text-lg font-bold tracking-tight',
      sub: 'text-[9px] sm:text-xs',
    },
    md: {
      emblem: 'h-9 min-[380px]:h-10.5 sm:h-13 md:h-15 w-auto object-contain',
      textImg: 'h-3.5 min-[380px]:h-4.5 sm:h-6 md:h-7 w-auto object-contain',
      text: 'text-sm sm:text-lg md:text-xl font-bold tracking-tight',
      sub: 'text-[10px] sm:text-xs',
    },
    lg: {
      emblem: 'h-13 sm:h-18 md:h-22 w-auto object-contain',
      textImg: 'h-5 sm:h-8 md:h-10 w-auto object-contain',
      text: 'text-lg sm:text-2xl md:text-3xl font-bold tracking-wider',
      sub: 'text-xs sm:text-sm',
    },
    hero: {
      emblem: 'h-18 sm:h-26 md:h-32 w-auto object-contain',
      textImg: 'h-7 sm:h-11 md:h-14 w-auto object-contain',
      text: 'text-xl sm:text-3xl md:text-4xl font-bold tracking-wider',
      sub: 'text-xs sm:text-sm',
    },
  }

  const { emblem, textImg, text, sub } = sizeMap[size]

  // For Kurdish and Arabic, render the localized script alongside the emblem
  const isRtlLang = isRTL || language === 'ar' || language === 'ku'

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 sm:gap-3 select-none group",
        className
      )}
    >
      {/* 1. Architectural AD Monogram / Emblem */}
      <div className="relative flex items-center justify-center shrink-0">
        {/* Subtle Luxury Ambient Glow */}
        <div className="absolute inset-0 bg-amber-400/15 dark:bg-amber-400/20 rounded-full blur-md sm:blur-lg pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <img
          src="/images/andaza-emblem-transparent.png"
          alt="ANDAZA DECORAT"
          className={cn(
            "transition-all duration-300 group-hover:scale-105 select-none drop-shadow-[0_2px_8px_rgba(212,175,55,0.2)] dark:drop-shadow-[0_2px_12px_rgba(245,158,11,0.3)]",
            emblem
          )}
          loading="eager"
        />
      </div>

      {/* 2. Brand Name next to the logo on the right */}
      {showText && variant !== 'emblem' && (
        <div className="flex flex-col justify-center shrink min-w-0">
          {isRtlLang ? (
            /* Localized script for Kurdish / Arabic */
            <div className="flex flex-col">
              <span
                className={cn(
                  "text-slate-900 dark:text-amber-100 font-sans font-extrabold leading-tight transition-colors whitespace-nowrap",
                  text
                )}
              >
                {t('brand.name')}
              </span>
              {showTagline && (
                <span
                  className={cn(
                    "text-amber-600 dark:text-amber-400/90 font-medium leading-none tracking-normal mt-0.5",
                    sub
                  )}
                >
                  {t('brand.tagline')}
                </span>
              )}
            </div>
          ) : (
            /* Authentic Gold 3D Metallic Lettering for English / Turkish */
            <div className="flex flex-col justify-center">
              <img
                src="/images/andaza-text-transparent.png"
                alt="ANDAZA DECORAT"
                className={cn(
                  "transition-all duration-300 group-hover:brightness-110 select-none drop-shadow-[0_1px_4px_rgba(212,175,55,0.25)] dark:drop-shadow-[0_1px_6px_rgba(245,158,11,0.35)]",
                  textImg
                )}
                loading="eager"
              />
              {showTagline && (
                <span
                  className={cn(
                    "text-amber-600 dark:text-amber-400/90 uppercase font-semibold leading-none tracking-widest mt-1",
                    sub
                  )}
                >
                  {t('brand.tagline')}
                </span>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

