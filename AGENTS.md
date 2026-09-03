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

## Source Structure

```
src/
  primitives/   # Atomic building blocks (heading, button, badge…)
  components/   # Composed/complex components (accordion, dialog, sidebar…)
  styles/       # Global CSS — imported once in Layout.astro
  layouts/      # Page wrappers
  pages/        # File-based routes
```

## Global styles (`src/styles/`)

Files here are imported **once** in `Layout.astro` and apply site-wide:

- `tokens.css` — design tokens (CSS custom properties)
- `typography.css` — base HTML element styles (h1–h6, p, a, code…)

When adding a new global style file, add its import to `Layout.astro`.

## Primitives vs Components

Both follow the same file pattern — CSS lives in the component directory and is imported by the `.astro` wrapper:

```
src/primitives/[name]/
  [name].css     # Standalone CSS — also consumable by Drupal SDC directly
  [name].astro   # Astro wrapper — imports its own CSS

src/components/[name]/
  [name].css     # Standalone CSS — also consumable by Drupal SDC directly
  [name].astro   # Astro wrapper — imports its own CSS
  [name].js      # Optional — only when JS is strictly necessary
```

The distinction is conceptual:
- **Primitives** — atomic elements used as building blocks everywhere (heading, button, badge, avatar, spinner, skeleton)
- **Components** — composed or context-specific (accordion, card, alert, dialog, sidebar…)

Rules for both:
- CSS is standalone (no scoped `<style>` blocks) so it can be consumed by Drupal SDC independently
- CSS uses custom properties for all variable values (variants, sizes, states)
- Variants are expressed as modifier classes (`btn--primary`) or `data-variant` attributes
- JS is used only when HTML-native APIs (`<dialog>`, `<details>`) are not sufficient

## Stack

- **Astro 7** — static site, no framework integrations (no React/Vue/Svelte)
- **TypeScript** — strict mode (`astro/tsconfigs/strict`)
- **Plain CSS with `@layer`** — no Tailwind; styles in standalone `.css` files per component

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
