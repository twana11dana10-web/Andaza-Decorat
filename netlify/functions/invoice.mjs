// Stores invoice PDFs in Netlify Blobs and serves them back by id, so the
// checkout can draft a WhatsApp message containing a link to the PDF.
//
//   POST /api/invoice        body: raw PDF bytes  ->  { url }
//   GET  /invoice/<id>.pdf   ->  the PDF
import { getStore } from '@netlify/blobs'

const MAX_PDF_BYTES = 5 * 1024 * 1024
const ID_PATTERN = /^[a-f0-9-]{36}$/

export default async (req, context) => {
  const store = getStore('invoices')

  if (req.method === 'POST') {
    const bytes = new Uint8Array(await req.arrayBuffer())
    const header = new TextDecoder().decode(bytes.subarray(0, 4))
    if (header !== '%PDF') return new Response('Not a PDF', { status: 400 })
    if (bytes.length > MAX_PDF_BYTES) return new Response('PDF too large', { status: 413 })

    const id = crypto.randomUUID()
    await store.set(id, bytes)
    const url = new URL(`/invoice/${id}.pdf`, req.url).toString()
    return Response.json({ url })
  }

  if (req.method === 'GET') {
    const id = String(context.params.file || '').replace(/\.pdf$/, '')
    if (!ID_PATTERN.test(id || '')) return new Response('Not found', { status: 404 })
    const pdf = await store.get(id, { type: 'arrayBuffer' })
    if (!pdf) return new Response('Not found', { status: 404 })
    return new Response(pdf, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="invoice-${id.slice(0, 8)}.pdf"`,
        'Cache-Control': 'private, max-age=3600',
      },
    })
  }

  return new Response('Method not allowed', { status: 405 })
}

export const config = {
  path: ['/api/invoice', '/invoice/:file'],
}
