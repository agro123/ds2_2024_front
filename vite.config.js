import { defineConfig } from 'vite'
import { coverageConfigDefaults } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test : {
    environment: 'jsdom',
    setupFiles: ['./src/__tests__/vitest-setup.js'],
    coverage: {
      exclude: [
        '**/src/main.jsx',
        '**/src/constants',
        '**/src/context',
        ...coverageConfigDefaults.exclude
      ],
      thresholds: {
        lines: 60,
        functions: 60,
        branches: 60,
        statements: 60
      }
    }
  }
})
