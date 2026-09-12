import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { Product } from '../../types/product'
import { useShowroom } from '../../context/ShowroomContext'
import { useShoppingBox } from '../../context/ShoppingBoxContext'
import { useLanguage } from '../../context/LanguageContext'
import { formatPrice, productImage } from '../../lib/helpers'
import { getLocalizedProduct } from '../../lib/localizeProduct'
import { cn } from '../../lib/utils'
import { QuantityStepper } from '../ui/QuantityStepper'

interface ProductCardProps {
  product: Product
  priority?: boolean
  className?: string
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product: rawProduct,
  priority = false,
  className,
}) => {
  const { setInspectedProduct } = useShowroom()
  const {
    addItem,
    updateQuantity,
    incrementItem,
    decrementItem,
    incrementProductQuantity,
    decrementProductQuantity,
    getItemForProduct,
  } = useShoppingBox()
  const { t, language } = useLanguage()

  const product = getLocalizedProduct(rawProduct, language)

  const [imageError, setImageError] = useState(false)

  const cartItem = getItemForProduct(rawProduct.id)
  const isInCart = Boolean(cartItem)
  const currentQuantity = cartItem?.quantity || 0

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation()
    addItem(rawProduct, rawProduct.options?.[0], 1)
  }

  const handleIncrement = () => {
    if (cartItem) {
      incrementItem(cartItem.id)
    } else {
      incrementProductQuantity(rawProduct, rawProduct.options?.[0])
    }
  }

  const handleDecrement = () => {
    if (cartItem) {
      decrementItem(cartItem.id)
    } else {
      decrementProductQuantity(rawProduct, rawProduct.options?.[0])
    }
  }

  const imageUrl = imageError
    ? 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80'
    : productImage(product.mainImage, priority ? 800 : 500)

  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      onClick={() => setInspectedProduct(rawProduct)}
      className={cn(
        "group relative rounded-xl sm:rounded-2xl overflow-hidden p-2 sm:p-3 lg:p-3.5 flex flex-col justify-between cursor-pointer transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.015] w-full",
        "bg-white dark:bg-[#131823] hover:bg-slate-50/95 dark:hover:bg-[#161e2e]",
        "border transition-all",
        isInCart
          ? "border-sky-500 dark:border-sky-400 ring-2 ring-sky-400/60 dark:ring-sky-400/70 shadow-[0_6px_22px_rgba(0,0,0,0.08),0_0_26px_rgba(14,165,233,0.36),0_0_40px_rgba(56,189,248,0.18)] dark:shadow-[0_8px_28px_rgba(0,0,0,0.7),0_0_30px_rgba(56,189,248,0.42),0_0_50px_rgba(14,165,233,0.2)]"
          : "border-slate-200/90 dark:border-slate-800/90 hover:border-amber-400 dark:hover:border-amber-400 shadow-[0_4px_16px_rgba(0,0,0,0.05),0_0_16px_rgba(217,170,75,0.12)] dark:shadow-[0_6px_24px_rgba(0,0,0,0.6),0_0_20px_rgba(217,170,75,0.18)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.12),0_0_30px_rgba(217,170,75,0.42),0_0_55px_rgba(217,170,75,0.18)] dark:hover:shadow-[0_16px_36px_rgba(0,0,0,0.8),0_0_35px_rgba(217,170,75,0.52),0_0_65px_rgba(217,170,75,0.24)]",
        className
      )}
    >
      {/* Dynamic ambient radial lighting aura */}
      <div
        className={cn(
          "absolute -top-12 -right-12 w-36 h-36 rounded-full blur-2xl pointer-events-none transition-all duration-500",
          isInCart
            ? "bg-sky-400/25 dark:bg-sky-400/30 opacity-90 scale-110"
            : "bg-amber-400/20 dark:bg-amber-400/25 opacity-40 group-hover:opacity-100 group-hover:scale-125"
        )}
      />
      <div
        className={cn(
          "absolute -bottom-10 -left-10 w-28 h-28 rounded-full blur-xl pointer-events-none transition-opacity duration-500",
          isInCart
            ? "bg-sky-500/15 dark:bg-sky-600/20 opacity-80"
            : "bg-amber-500/10 dark:bg-amber-600/15 opacity-0 group-hover:opacity-100"
        )}
      />

      {/* 1. Rich Photo Frame (Cover Fill with Subtle Glow) */}
      <div
        className={cn(
          "relative aspect-square w-full rounded-lg sm:rounded-xl bg-slate-100 dark:bg-[#080b10] overflow-hidden flex items-center justify-center border mb-1.5 sm:mb-2.5 transition-colors shadow-inner",
          isInCart
            ? "border-sky-400/50 dark:border-sky-400/40"
            : "border-slate-200 dark:border-slate-800/70 group-hover:border-amber-400/40 dark:group-hover:border-amber-400/30"
        )}
      >
        <img
          src={imageUrl}
          alt={product.name}
          loading={priority ? 'eager' : 'lazy'}
          onError={() => setImageError(true)}
          className="w-full h-full object-cover object-center"
        />
        {/* Soft bottom vignette for photo depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 dark:from-[#0c1017]/40 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* 2. Product Meta & Pricing */}
      <div className="space-y-0.5 sm:space-y-1 text-left flex-1 flex flex-col justify-between">
        <div className="space-y-0.5">
          {/* Title with 2-line clamp */}
          <h3
            className={cn(
              "font-sans font-semibold text-[11px] sm:text-[13px] transition-colors leading-snug line-clamp-2 min-h-[1.6rem] sm:min-h-[2rem]",
              isInCart
                ? "text-sky-700 dark:text-sky-300"
                : "text-slate-900 dark:text-slate-100 group-hover:text-amber-600 dark:group-hover:text-amber-300"
            )}
          >
            {product.name}
          </h3>

          {/* Brand Name */}
          <p className="text-[9px] min-[360px]:text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate">
            {product.brand || t('brand.name')}
          </p>
        </div>

        {/* Price Display and Bottom-Right Spinbutton / Action Button */}
        <div className={cn(
          "pt-1 sm:pt-1 flex items-center justify-between gap-1 sm:gap-1.5 -mx-2 sm:-mx-3 -mb-2 sm:-mb-3 px-2 sm:px-3 pb-2 sm:pb-3 mt-0.5 sm:mt-0.5 rounded-b-xl sm:rounded-b-2xl transition-all duration-300",
          isInCart
            ? "bg-sky-50/80 dark:bg-sky-950/30 border-t border-sky-400/40 dark:border-sky-500/30 shadow-[inset_0_2px_8px_rgba(14,165,233,0.08)] dark:shadow-[inset_0_2px_8px_rgba(14,165,233,0.12)]"
            : "border-t border-transparent"
        )}>
          <div className="flex items-baseline min-w-0">
            <span className={cn(
              "font-sans font-bold text-[10px] min-[360px]:text-[11px] sm:text-[13px] tracking-tight transition-colors duration-300 truncate",
              isInCart
                ? "text-sky-700 dark:text-sky-300"
                : "text-slate-900 dark:text-white"
            )}>
              {formatPrice(product.price, product.currency)}
            </span>
          </div>

          {/* Spinbutton / Stepper or Add Button */}
          {isInCart ? (
            <QuantityStepper
              quantity={currentQuantity}
              onIncrement={handleIncrement}
              onDecrement={handleDecrement}
              onChangeQuantity={(newQty) => {
                if (cartItem) {
                  updateQuantity(cartItem.id, newQty)
                }
              }}
            />
          ) : (
            <button
              onClick={handleQuickAdd}
              className="inline-flex items-center gap-0.5 sm:gap-1 px-1.5 min-[360px]:px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg sm:rounded-xl font-bold text-[9px] min-[360px]:text-[10px] sm:text-[11px] tracking-wider uppercase bg-amber-500 hover:bg-amber-400 text-slate-950 border border-amber-400/40 hover:shadow-[0_0_15px_rgba(197,160,89,0.45)] transition-all duration-200 cursor-pointer shadow-sm active:scale-95 shrink-0"
              title={t('card.add')}
              aria-label={`${t('card.add')} ${product.name}`}
            >
              <Plus className="h-2.5 sm:h-3 w-2.5 sm:w-3 stroke-[3]" />
              <span>{t('card.add')}</span>
            </button>
          )}
        </div>
      </div>
    </motion.article>
  )
}
