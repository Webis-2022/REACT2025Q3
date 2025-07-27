import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { ghPages } from 'vite-plugin-gh-pages';

export default defineConfig({
  base: '/REACT2025Q3/',
  plugins: [
    react(),
    ghPages({
      branch: 'gh-pages',
      repo: 'https://github.com/Webis-2022/REACT2025Q3.git',
      dir: 'dist',
      dotfiles: true,
      push: true,
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    coverage: {
      provider: 'v8',
      enabled: true,
      reporter: ['text', 'json', 'html'],
      reportsDirectory: './coverage',
      include: ['src/**/*.{js,jsx,ts,tsx}'],
      exclude: [
        '**/*.test.{js,ts,jsx,tsx}',
        '**/*.spec.{js,ts,jsx,tsx}',
        'src/main.tsx',
        'src/setupTests.ts',
        '**/types.ts',
        '**/*.d.ts',
        '**/vite-env.d.ts',
      ],
      thresholds: {
        statements: 60,
        branches: 50,
        functions: 50,
        lines: 50,
      },
    },
  },
});
