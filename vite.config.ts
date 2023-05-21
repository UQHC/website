import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import { sveltePreprocess } from 'svelte-preprocess/dist/autoProcess';
// add svelte-preprocess

export default defineConfig({
  server: {
    port: 8090,
    host: "0.0.0.0",
    cors: true
  },
  plugins: [
    sveltekit()
  ],
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}']
  }
});
