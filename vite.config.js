import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: 'src/javascript/stripe-cart.js',
      formats: ['es'],
      fileName: 'stripe-cart'
    },
    outDir: '_site/javascript'
  }
})
