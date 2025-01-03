import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "tailwindcss";
import process from 'process'

// https://vite.dev/config/
export default defineConfig({
  define: {
    'process.env': process.env
  },
  plugins: [react()],
  server: {
    port: 3000, // Change the port here
  },
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  }
})
