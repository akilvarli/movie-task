/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite'
import { configDefaults } from 'vitest/config'

import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})