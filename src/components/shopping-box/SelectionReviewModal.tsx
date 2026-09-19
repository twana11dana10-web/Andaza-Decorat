import React, { useState } from 'react'
import {
  ArrowLeft,
  Loader2,
  AlertTriangle,
  Send,
  User,
  Phone,
  MapPin,
  Share2,
  Download,
  FileText,
  Sparkles,
} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'
import { useShoppingBox } from '../../context/ShoppingBoxContext'
import { useLanguage } from '../../context/LanguageContext'
import { BRAND_CONFIG } from '../../data/brand'
import { PDFDocumentData } from '../../types/pdf'
import { generateSpecificationPDF } from '../../lib/pdfGenerator'
import { loadArabicFont, loadLatinFont, needsArabicFont, needsLatinFont } from '../../lib/pdfFontLoader'
import { formatPrice, getNextInvoiceNumber } from '../../lib/helpers'
import { getLocalizedProduct } from '../../lib/localizeProduct'

interface ReadyInvoice {
  docNumber: string
  blob: Blob
  file: File
  summaryText: string
}

export const SelectionReviewModal: React.FC = () => {
  const {
    items,
    isReviewOpen,
    setIsReviewOpen,
    setIsOpen,
    clientInfo,
    setClientInfo,
    exportOptions,
    totalCount,
    totalValuation,
  } = useShoppingBox()
  const { t, language } = useLanguage()

  const [isGenerating, setIsGenerating] = useState(false)
  const [generationError, setGenerationError] = useState<string | null>(null)
  const [phoneError, setPhoneError] = useState<string | null>(null)
  const [readyInvoice, setReadyInvoice] = useState<ReadyInvoice | null>(null)
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null)

  if (!isReviewOpen) return null

  const handleBackToDrawer = () => {
    setIsReviewOpen(false)
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsReviewOpen(false)
    setGenerationError(null)
    setPhoneError(null)
    setReadyInvoice(null)
    setDownloadNotice(null)
  }

  const downloadPdf = (blob: Blob, docNumber: string) => {
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `Invoice-${docNumber.replace(/[^a-zA-Z0-9_-]/g, '')}.pdf`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  /**
   * Generates the official invoice PDF file and transitions to the simple PDF share screen.
   */
  const handleCheckout = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (items.length === 0) return

    // Validate phone number: must be 10 or 11 digits
    const digitsOnly = (clientInfo.phone || '')
      .replace(/[\u0660-\u0669]/g, d => String(d.charCodeAt(0) - 0x0660))
      .replace(/[\u06F0-\u06F9]/g, d => String(d.charCodeAt(0) - 0x06F0))
      .replace(/\D/g, '')
    if (digitsOnly.length < 10 || digitsOnly.length > 11) {
      setPhoneError(t('review.phoneError'))
      return
    }
    setPhoneError(null)

    setIsGenerating(true)
    setGenerationError(null)
    try {
      if (needsArabicFont(language)) {
        await loadArabicFont()
      } else if (needsLatinFont(language)) {
        await loadLatinFont()
      }

      const dateObj = new Date()
      const invoiceNumber = getNextInvoiceNumber()
      const docNum = `No.${invoiceNumber}`
      const datePart = dateObj.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
      const timePart = dateObj.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      })
      const now = `${datePart}, ${timePart}`

      const localizedItems = items.map(item => ({
        ...item,
        product: getLocalizedProduct(item.product, language),
      }))

      const documentData: PDFDocumentData = {
        documentNumber: docNum,
        generatedAt: now,
        branding: {
          companyName: t('brand.name'),
          tagline: t('brand.tagline'),
          address: BRAND_CONFIG.showroomAddress,
          contactEmail: BRAND_CONFIG.contact.email,
          contactPhone: BRAND_CONFIG.contact.phone,
        },
        client: clientInfo,
        items: localizedItems,
        totalItems: totalCount,
        estimatedTotal: totalValuation,
        currency: 'IQD',
        options: exportOptions,
      }

      const doc = await generateSpecificationPDF(documentData, language)
      const blob = doc.output('blob')
      const fileName = `Invoice-${docNum.replace(/[^a-zA-Z0-9_-]/g, '')}.pdf`
      const file = new File([blob], fileName, { type: 'application/pdf' })

      // Clean text summary (WITHOUT any URL link)
      let summaryText = `📋 ${t('review.waMessageCaption').replace('{docNumber}', docNum)}`
      if (clientInfo.clientName?.trim()) {
        summaryText += `\n👤 ${clientInfo.clientName.trim()}`
      }
      if (clientInfo.phone?.trim()) {
        summaryText += `\n📞 ${clientInfo.phone.trim()}`
      }
      summaryText += `\n💰 ${formatPrice(totalValuation)}`

      setReadyInvoice({
        docNumber: docNum,
        blob,
        file,
        summaryText,
      })
      setDownloadNotice(null)
    } catch (err) {
      console.error('Error generating invoice:', err)
      setGenerationError(t('review.generationError'))
    } finally {
      setIsGenerating(false)
    }
  }


  /** Direct Native Device Share */
  const handleNativeShare = async () => {
    if (!readyInvoice) return
    if (
      typeof navigator !== 'undefined' &&
      navigator.canShare &&
      navigator.canShare({ files: [readyInvoice.file] })
    ) {
      try {
        await navigator.share({
          files: [readyInvoice.file],
          title: `Invoice ${readyInvoice.docNumber}`,
        })
      } catch (err: any) {
        if (err?.name === 'AbortError') return
      }
    } else {
      downloadPdf(readyInvoice.blob, readyInvoice.docNumber)
      setDownloadNotice(t('review.waDesktopNote'))
    }
  }

  return (
    <Dialog open={isReviewOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="max-w-md w-full sm:w-[92vw] p-5 sm:p-7 max-h-[94vh] sm:max-h-[90vh] overflow-y-auto bg-white dark:bg-[#0c1017] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 shadow-2xl rounded-2xl">
        
        {/* =================================================================== */}
        {/* VIEW 2: Reorganized, High-End Luxury Invoice PDF Share Screen       */}
        {/* =================================================================== */}
        {readyInvoice ? (
          <div className="space-y-4 animate-fade-in text-center pt-2 sm:pt-1">
            
            {/* 1. Luxury Invoice Card */}
            <div className="relative overflow-hidden rounded-2xl border border-amber-500/30 bg-gradient-to-b from-amber-500/12 via-amber-500/5 to-transparent p-4 sm:p-5 text-center shadow-md">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/25 mb-2.5">
                <FileText className="w-3.5 h-3.5" />
                <span>{t('review.officialPdfInvoice')}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white font-mono">
                {readyInvoice.docNumber}
              </h3>

              <p className="text-lg sm:text-xl font-bold text-amber-600 dark:text-amber-400 mt-1">
                {formatPrice(totalValuation)}
              </p>

              {clientInfo.clientName && (
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 truncate">
                  {clientInfo.clientName} {clientInfo.phone ? `• ${clientInfo.phone}` : ''}
                </p>
              )}
            </div>

            {/* Desktop Notice if downloaded */}
            {downloadNotice && (
              <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs animate-fade-in">
                {downloadNotice}
              </div>
            )}

            {/* 2. Two Simple Action Buttons */}
            <div className="space-y-3 pt-2">
              
              {/* Send / Share PDF Button (Primary) */}
              <button
                type="button"
                onClick={handleNativeShare}
                className="w-full py-4 px-5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-md hover:shadow-[0_0_24px_rgba(217,170,75,0.35)] active:scale-[0.98] transition-all cursor-pointer"
              >
                <Share2 className="w-5 h-5" />
                <span>{t('review.sharePdfFile')}</span>
              </button>

              {/* Download PDF Button (Secondary) */}
              <button
                type="button"
                onClick={() => downloadPdf(readyInvoice.blob, readyInvoice.docNumber)}
                className="w-full py-3.5 px-5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#141a26] hover:bg-slate-100 dark:hover:bg-[#1a2230] text-slate-800 dark:text-slate-200 font-semibold text-sm flex items-center justify-center gap-2.5 shadow-xs transition-all cursor-pointer active:scale-[0.98]"
              >
                <Download className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                <span>{t('review.downloadPdf')}</span>
              </button>

            </div>

            {/* 4. Elegant Clean Footer Navigation */}
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-3 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setReadyInvoice(null)}
                className="hover:text-amber-500 transition-colors cursor-pointer flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-180" />
                <span>{t('review.editDetails')}</span>
              </button>

              <button
                type="button"
                onClick={handleClose}
                className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
              >
                {t('review.returnToShowroom')}
              </button>
            </div>

          </div>
        ) : (
          
          /* =================================================================== */
          /* VIEW 1: User Information Form                                      */
          /* =================================================================== */
          <form onSubmit={handleCheckout} className="space-y-3.5 sm:space-y-4 animate-fade-in text-left rtl:text-right">
            
            {/* Header */}
            <div className="space-y-1.5 border-b border-slate-200 dark:border-slate-800 pb-3.5">
              <button
                type="button"
                onClick={handleBackToDrawer}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer mb-1"
              >
                <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
                <span>{t('review.backToShoppingBox')}</span>
              </button>

              <DialogHeader className="p-0 text-left rtl:text-right">
                <DialogTitle className="text-lg sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-500 shrink-0" />
                  <span>{t('review.title')}</span>
                </DialogTitle>
              </DialogHeader>

              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                {t('review.subtitle')}
              </p>
            </div>

            {/* Inputs Grid */}
            <div className="space-y-3.5 pt-1">
              
              {/* Row 1: Full Name & Phone Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5 items-start">
                <div>
                  <label className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-2">
                    <User className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0" />
                    <span>{t('review.fullName')} {t('common.required')}</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={t('review.namePlaceholder')}
                    value={clientInfo.clientName || ''}
                    onChange={(e) =>
                      setClientInfo(prev => ({ ...prev, clientName: e.target.value }))
                    }
                    className="w-full bg-slate-50 dark:bg-[#141a26] border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-amber-500 transition-all"
                  />
                </div>

                <div>
                  <label className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-2">
                    <Phone className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0" />
                    <span>{t('review.phone')} {t('common.required')}</span>
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      maxLength={11}
                      minLength={10}
                      pattern="[0-9]{10,11}"
                      placeholder={t('review.phonePlaceholder')}
                      value={clientInfo.phone || ''}
                      onChange={(e) => {
                        const normalized = e.target.value
                          .replace(/[\u0660-\u0669]/g, d => String(d.charCodeAt(0) - 0x0660))
                          .replace(/[\u06F0-\u06F9]/g, d => String(d.charCodeAt(0) - 0x06F0))
                        const digits = normalized.replace(/\D/g, '').slice(0, 11)
                        setClientInfo(prev => ({ ...prev, phone: digits }))
                        if (digits.length >= 10 && digits.length <= 11 && phoneError) {
                          setPhoneError(null)
                        }
                      }}
                      className={`w-full bg-slate-50 dark:bg-[#141a26] border rounded-xl pl-3.5 pr-14 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none transition-all ${
                        phoneError
                          ? 'border-red-500 focus:border-red-500 ring-1 ring-red-500/30'
                          : 'border-slate-200 dark:border-slate-800 focus:border-amber-500'
                      }`}
                    />
                    <span
                      className={`absolute right-3 rtl:right-auto rtl:left-3 top-1/2 -translate-y-1/2 text-[10px] sm:text-[11px] font-mono pointer-events-none transition-colors select-none ${
                        (clientInfo.phone || '').length >= 10 && (clientInfo.phone || '').length <= 11
                          ? 'text-sky-500 font-bold'
                          : 'text-slate-400 dark:text-slate-500'
                      }`}
                    >
                      {(clientInfo.phone || '').length}/11
                    </span>
                  </div>
                  {phoneError && (
                    <p className="text-xs text-red-500 dark:text-red-400 mt-1 flex items-center gap-1 font-medium">
                      <AlertTriangle className="h-3 w-3 shrink-0" />
                      <span>{phoneError}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Row 2: City / Address (Optional) */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-slate-500 dark:text-slate-400 shrink-0" />
                  <span>{t('review.cityAddress')}</span>
                </label>
                <input
                  type="text"
                  placeholder={t('review.addressPlaceholder')}
                  value={clientInfo.address || clientInfo.city || ''}
                  onChange={(e) =>
                    setClientInfo(prev => ({ ...prev, address: e.target.value, city: e.target.value }))
                  }
                  className="w-full bg-slate-50 dark:bg-[#141a26] border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-amber-500 transition-all"
                />
              </div>

              {/* Row 3: Special Notes (Optional) */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  {t('review.specialNotes')}
                </label>
                <textarea
                  rows={2}
                  placeholder={t('review.notesPlaceholder')}
                  value={clientInfo.notes || ''}
                  onChange={(e) =>
                    setClientInfo(prev => ({ ...prev, notes: e.target.value }))
                  }
                  className="w-full bg-slate-50 dark:bg-[#141a26] border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-amber-500 transition-all resize-none"
                />
              </div>

            </div>

            {/* Total Summary Box */}
            <div className="bg-slate-50 dark:bg-[#141a26] border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 sm:p-4 flex items-center justify-between">
              <div>
                <span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 block uppercase font-medium">
                  {totalCount} {totalCount === 1 ? t('review.productOrdered') : t('review.productsOrdered')}
                </span>
                <span className="text-xs sm:text-sm text-amber-600 dark:text-amber-300">
                  {t('review.readyToSend')}
                </span>
              </div>
              <div className="text-right rtl:text-left">
                <span className="text-[11px] text-slate-500 dark:text-slate-400 uppercase block font-medium">{t('review.totalInDinar')}</span>
                <span className="text-base sm:text-xl font-bold text-slate-900 dark:text-white">{formatPrice(totalValuation)}</span>
              </div>
            </div>

            {/* Error Message */}
            {generationError && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-300 text-xs sm:text-sm">
                <AlertTriangle className="h-4 w-4 shrink-0" />
                <span>{generationError}</span>
              </div>
            )}

            {/* Submit CTA */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isGenerating}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-md active:scale-98 cursor-pointer disabled:opacity-60 hover:shadow-[0_0_20px_rgba(197,160,89,0.45)]"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>{t('review.generating')}</span>
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 rtl:rotate-180" />
                    <span>{t('review.sendInvoice')}</span>
                  </>
                )}
              </button>
            </div>

          </form>
        )}

      </DialogContent>
    </Dialog>
  )
}
