# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

Other commands:

```
npm run build     # Build to ./dist/
npm run preview   # Preview production build
```

No linter or test runner is currently configured.

## Component Structure (SDC-compatible)

Each component lives in its own directory under `src/components/`:

```
src/components/
  [component-name]/
    [component-name].astro   # Astro wrapper — imports the CSS, defines Props interface
    [component-name].css     # Standalone CSS — shared with Drupal SDC
    [component-name].js      # Optional — only when JS is strictly necessary
```

Rules:
- CSS is standalone (no scoped `<style>` blocks) so it can be consumed by Drupal independently
- CSS uses custom properties for all variable values (variants, sizes, states)
- Variants and sizes are expressed as modifier classes: `btn--primary`, `btn--lg`
- JS is used only when HTML-native APIs (`<dialog>`, `<details>`) are not sufficient

See `src/components/button/` as the reference implementation.

## Stack

- **Astro 7** — static site, no framework integrations (no React/Vue/Svelte)
- **TypeScript** — strict mode (`astro/tsconfigs/strict`)
- **Plain scoped CSS** — no Tailwind, no CSS variables system; styles live in `<style>` blocks inside `.astro` files

## Architecture

```
src/
  assets/       # Optimized at build time (SVGs, images)
  components/   # Astro components
  layouts/      # Page wrappers (Layout.astro is the root shell)
  pages/        # File-based routes → HTML pages
public/         # Copied as-is to dist/ (favicons, static assets)
```

`src/pages/index.astro` is the only route. `src/layouts/Layout.astro` wraps it with the HTML shell. No content collections are set up yet.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
