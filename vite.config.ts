import { fileURLToPath, URL } from 'node:url'

import tailwindcss from '@tailwindcss/vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/wedezy/',
  plugins: [
    // Must run before the react plugin so generated routes are transformed too.
    tanstackRouter({ target: 'react', autoCodeSplitting: true }),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  experimental: {
    // Force all asset/chunk URLs to be absolute so that dynamically-imported
    // route chunks resolve correctly on nested GitHub Pages paths like
    // /wedezy/venues/$venueId — relative paths would resolve against the
    // wrong directory and produce a 404.
    renderBuiltUrl(filename) {
      return '/wedezy/' + filename
    },
  },
})
