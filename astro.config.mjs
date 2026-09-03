// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://astro.build/config
export default defineConfig({
  vite: {
    resolve: {
      alias: {
        '@primitives': path.resolve(__dirname, 'src/primitives'),
        '@components': path.resolve(__dirname, 'src/components'),
      },
    },
  },
  site: 'https://joui.org',
  // base: '/JoUi-Docs', // uncomment if deploying to jouiorg.github.io/JoUi-Docs (no custom domain)
  integrations: [mdx()],
  redirects: {
    '/': '/docs',
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ro'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
