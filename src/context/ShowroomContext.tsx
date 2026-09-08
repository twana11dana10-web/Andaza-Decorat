import React, { createContext, useContext, useState, useMemo } from 'react'
import { Product, ProductCategory } from '../types/product'
import { SHOWROOM_PRODUCTS } from '../data/products'
import { TRANSLATIONS, Language } from '../data/translations'

export type GridDensity = '5-col' | '4-col'

interface ShowroomContextType {
  products: Product[]
  selectedCategory: ProductCategory
  setSelectedCategory: (category: ProductCategory) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
  gridDensity: GridDensity
  setGridDensity: (density: GridDensity) => void
  inspectedProduct: Product | null
  setInspectedProduct: (product: Product | null) => void
  filteredProducts: Product[]
  totalCatalogCount: number
  resetAllFilters: () => void
}

const ShowroomContext = createContext<ShowroomContextType | undefined>(undefined)

export const ShowroomProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [gridDensity, setGridDensity] = useState<GridDensity>('5-col')
  const [inspectedProduct, setInspectedProduct] = useState<Product | null>(null)

  const resetAllFilters = () => {
    setSelectedCategory('all')
    setSearchQuery('')
  }

  const filteredProducts = useMemo(() => {
    const langs: Language[] = ['en', 'ar', 'ku', 'tr']
    return SHOWROOM_PRODUCTS.filter(product => {
      if (selectedCategory !== 'all' && selectedCategory !== 'more') {
        if (product.category !== selectedCategory) return false
      }
      if (searchQuery.trim()) {
        const query = searchQuery.trim().toLowerCase()
        const matchesName = product.name.toLowerCase().includes(query)
        const matchesBrand = product.brand?.toLowerCase().includes(query) || false
        const matchesCode = product.code.toLowerCase().includes(query)
        const matchesLocalized = langs.some(lang => {
          const locName = TRANSLATIONS[lang]?.[`prod.${product.id}.name`]?.toLowerCase()
          return locName && locName.includes(query)
        })

        if (!matchesName && !matchesBrand && !matchesCode && !matchesLocalized) {
          return false
        }
      }
      return true
    })
  }, [selectedCategory, searchQuery])

  return (
    <ShowroomContext.Provider
      value={{
        products: SHOWROOM_PRODUCTS,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        gridDensity,
        setGridDensity,
        inspectedProduct,
        setInspectedProduct,
        filteredProducts,
        totalCatalogCount: SHOWROOM_PRODUCTS.length,
        resetAllFilters,
      }}
    >
      {children}
    </ShowroomContext.Provider>
  )
}

export const useShowroom = () => {
  const context = useContext(ShowroomContext)
  if (!context) {
    throw new Error('useShowroom must be used within a ShowroomProvider')
  }
  return context
}
