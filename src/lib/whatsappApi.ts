import { BRAND_CONFIG } from '../data/brand'

/**
 * Normalizes phone numbers to international standard with Iraqi code (964...).
 */
export function formatInternationalPhone(rawPhone: string): string {
  const digits = rawPhone.replace(/\D/g, '')
  if (digits.startsWith('964')) return digits
  if (digits.startsWith('0')) return '964' + digits.slice(1)
  return '964' + digits
}

/**
 * wa.me link that opens the showroom chat with `message` already drafted.
 */
export function showroomWhatsAppUrl(message: string): string {
  const phone = formatInternationalPhone(
    BRAND_CONFIG.contact.whatsapp || BRAND_CONFIG.contact.phone
  )
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
}

/**
 * Uploads the invoice PDF to the `invoice` Netlify function and returns its public link,
 * or null when the function is unavailable (e.g. plain `vite` dev server).
 */
export async function uploadInvoicePdf(pdfBlob: Blob): Promise<string | null> {
  try {
    const response = await fetch('/api/invoice', {
      method: 'POST',
      headers: { 'Content-Type': 'application/pdf' },
      body: pdfBlob,
    })
    if (!response.ok) return null
    const data = await response.json()
    return typeof data?.url === 'string' ? data.url : null
  } catch (err) {
    console.warn('Invoice upload failed:', err)
    return null
  }
}
