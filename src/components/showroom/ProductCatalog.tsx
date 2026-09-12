import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ProductCard } from './ProductCard'
import { useShowroom } from '../../context/ShowroomContext'
import { useLanguage } from '../../context/LanguageContext'
import { RotateCcw, PackageOpen } from 'lucide-react'
import { cn } from '../../lib/utils'

export const ProductCatalog: React.FC = () => {
  const {
    filteredProducts,
    resetAllFilters,
  } = useShowroom()
  const { t } = useLanguage()

  const shouldReduceMotion = useReducedMotion()

  return (
    <section id="catalog-section" className="w-full relative bg-transparent">
      {/* Product Vitrine Grid Area */}
      <div className="w-full max-w-[1720px] mx-auto px-3 sm:px-6 lg:px-8 pt-3 sm:pt-4 pb-2 sm:pb-3">
        {filteredProducts.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: shouldReduceMotion ? 0.01 : 0.25 }}
            className={cn(
              "grid gap-3.5 sm:gap-4 lg:gap-5 xl:gap-6 justify-center mx-auto",
              filteredProducts.length === 1
                ? "grid-cols-1 max-w-[280px]"
                : filteredProducts.length === 2
                ? "grid-cols-2 max-w-[570px]"
                : filteredProducts.length === 3
                ? "grid-cols-2 sm:grid-cols-3 max-w-[850px]"
                : filteredProducts.length === 4
                ? "grid-cols-2 sm:grid-cols-4 max-w-[1360px]"
                : filteredProducts.length === 5
                ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 max-w-[1420px]"
                : "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 max-w-[1720px]"
            )}
          >
            {filteredProducts.map((product, idx) => (
              <ProductCard
                key={product.id}
                product={product}
                priority={idx < 12}
              />
            ))}
          </motion.div>
        ) : (
          /* Clean Empty State */
          <div className="py-16 px-6 text-center bg-white dark:bg-[#131823] border border-slate-200 dark:border-slate-800 rounded-2xl max-w-sm mx-auto space-y-3.5 shadow-lg my-10">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto">
              <PackageOpen className="h-5 w-5" />
            </div>

            <div className="space-y-1">
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">{t('catalog.noProducts')}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {t('catalog.adjustSearch')}
              </p>
            </div>

            <button
              onClick={resetAllFilters}
              className="inline-flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs px-4 py-2 rounded-xl cursor-pointer transition-all shadow-md active:scale-95"
            >
              <RotateCcw className="h-3 w-3" />
              <span>{t('catalog.resetAll')}</span>
            </button>
          </div>
        )}

      </div>
    </section>
  )
}
