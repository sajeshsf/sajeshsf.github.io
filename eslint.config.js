import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
  // Tooling / Node scripts (run in CI and locally)
  {
    files: [
      'vite.config.js',
      'playwright.config.js',
      'start-server.js',
      'check-setup.js',
    ],
    languageOptions: {
      globals: globals.node,
      parserOptions: {
        sourceType: 'module',
      },
    },
  },
  // CommonJS config files (needed even though project is ESM)
  {
    files: ['lighthouserc.cjs'],
    languageOptions: {
      globals: globals.node,
      parserOptions: {
        sourceType: 'script',
      },
    },
  },
])
