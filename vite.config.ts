/// <reference types="vitest/config" />
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svgr(), react()],
  server: {
    port: 3000,
  },
  test: {
    environment: 'jsdom',
    setupFiles: "./src/setup-test.ts",
    coverage: {
      provider: "v8",
      exclude: ["src/theme", "src/screens/app/start", "src/config", "src/main.tsx", "src/App.tsx", "vite.config.ts", "**.cjs", "src/**/*.d.ts"],
      thresholds: {
        lines: 100,
        functions: 100,
        branches: 100,
        statements: 100,
      },
    }
  }
})
