import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    setupFiles: ['dotenv/config'],
    fileParallelism: false,
    coverage: {
      exclude: [
        'src/Commons/config.js', // Mengabaikan file config.js
        'src/app.js',             // Mengabaikan entrypoint utama jika diperlukan
        'tests/**',               // Mengabaikan helper testing
      ],
    },
  },
});