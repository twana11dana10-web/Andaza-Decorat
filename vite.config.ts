import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { randomUUID } from 'crypto'

// Dev-only stand-in for netlify/functions/invoice.mjs so checkout links work with `npm run dev`.
// PDFs are kept in memory; links point at this machine, so they only open locally.
function devInvoiceStore(): Plugin {
  const invoices = new Map<string, Buffer>()
  return {
    name: 'dev-invoice-store',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.method === 'POST' && req.url === '/api/invoice') {
          const chunks: Buffer[] = []
          req.on('data', (chunk: Buffer) => chunks.push(chunk))
          req.on('end', () => {
            const id = randomUUID()
            invoices.set(id, Buffer.concat(chunks))
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ url: `http://${req.headers.host}/invoice/${id}.pdf` }))
          })
          return
        }
        const match = req.method === 'GET' && req.url?.match(/^\/invoice\/([a-f0-9-]{36})\.pdf$/)
        const pdf = match ? invoices.get(match[1]) : undefined
        if (pdf) {
          res.setHeader('Content-Type', 'application/pdf')
          res.end(pdf)
          return
        }
        next()
      })
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), devInvoiceStore()],
  server: {
    allowedHosts: [
      // Allow Cloudflare quick-tunnel testing (temporary https domain for mobile testing)
      '.trycloudflare.com',
    ],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          jspdf: ['jspdf'],
          radix: ['@radix-ui/react-dialog', '@radix-ui/react-separator', '@radix-ui/react-slot', '@radix-ui/react-tabs', '@radix-ui/react-tooltip'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
})
