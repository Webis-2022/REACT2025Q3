import { defineConfig } from 'vite';
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
});
