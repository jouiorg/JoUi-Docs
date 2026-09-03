# joui.org — Project Plan

Component library based on oat.ink, documented with Astro.js, compatible with Drupal SDC.

**Reference sites:**
- Source components: https://oat.ink/
- Docs model: https://heroui.com/en/docs/react/components/button
- Site inspiration: https://creativethemes.com/blocksy/

---

## Phase 1 — Setup & Foundation

### 1.1 Rename & GitHub — closes #1
- [x] Rename project from `.joui-oat.ink` to `joui.org`
- [x] Create public GitHub repo `jouiorg/JoUi-Docs`
- [x] Configure git, initial commit, push

### 1.2 SDC-Compatible Component Structure — closes #2
- [x] Define directory structure for components:
  ```
  src/components/
    [component-name]/
      [component-name].astro   # Astro wrapper (docs only)
      [component-name].css     # Standalone — shared with Drupal
      [component-name].js      # Optional, only if needed
      index.ts                 # Exports
  ```
- [x] Document the structure in CLAUDE.md

### 1.3 i18n Setup — closes #3
- [x] Configure Astro i18n (`defaultLocale: 'en'`, add `ro` as second locale)
- [x] Set up translation file structure (`src/i18n/en.ts`, `src/i18n/ro.ts`)
- [x] All UI strings go through i18n from day one — content in English only for now

### 1.4 Design Tokens — closes #4
- [x] Audit oat.ink tokens (colors, spacing, typography, radius, shadows)
- [x] Create `src/tokens/tokens.css` with oat.ink tokens as starting point
- [x] Structure tokens as CSS custom properties ready for theming:
  ```css
  :root {
    /* Colors */
    /* Typography */
    /* Spacing */
    /* Radius */
    /* Shadows */
  }
  ```

---

## Phase 2 — Component Audit & Port

### 2.1 Audit oat.ink Components — closes #5
- [ ] Go through oat.ink and list all components
- [ ] Group by category (Typography, Forms, Buttons, Navigation, Feedback, Layout, Overlay, etc.)
- [ ] Note which ones need JS and which are HTML-native
- [ ] Save full list in `COMPONENTS.md`

### 2.2 Port Components (simple → complex) — closes #6
For each component:
- [ ] Create component directory
- [ ] Write standalone CSS (oat.ink naming for now)
- [ ] Write `.astro` component wrapper
- [ ] Add JS only if strictly necessary
- [ ] Use HTML-native APIs where possible:
  - Dropdown → `<details>` / `<select>`
  - Modal → `<dialog>`
  - Accordion → `<details>`

**Order:** Typography → Buttons → Forms → Cards → Navigation → Overlays → Complex

---

## Phase 3 — Documentation Site

### 3.1 Docs Layout — closes #7
- [ ] Design and build docs shell:
  - Sidebar with component categories + links
  - Main content area
  - Top navigation (theme switcher placeholder, GitHub link, language switcher placeholder)
- [ ] Mobile-responsive layout

### 3.2 Per-Component Doc Page Template — closes #8
Each component page includes:
- [ ] **Overview** — short description
- [ ] **Variants** — visual preview per variant (live rendered)
- [ ] **Usage** — copyable HTML code block per variant
- [ ] **CSS Variables** — table: variable name, default value, description
- [ ] **Props / Attributes** — table: name, type, default, description
- [ ] **Accessibility notes** — where relevant

### 3.3 Claude Skill — Generate Component Docs — closes #9
- [ ] Create a Claude skill that generates a full component doc page from a component directory
- [ ] Input: component name
- [ ] Output: complete `.astro` doc page with all sections pre-filled

---

## Phase 4 — joui Design System

### 4.1 CSS Naming Convention — closes #10
- [ ] Define joui CSS naming convention (based on oat.ink, adapted)
- [ ] Document rules in `DESIGN-SYSTEM.md`
- [ ] Migrate all components from oat.ink naming to joui naming

### 4.2 joui Design Tokens — closes #11, #15
- [ ] Replace oat.ink tokens with joui-specific values
- [ ] Define token tiers:
  - **Primitive tokens** — raw values (colors, sizes)
  - **Semantic tokens** — purpose-based (color-primary, color-surface, etc.)
- [ ] Theme 1 finalized

### 4.3 Claude Skill — Generate Component — closes #12
- [ ] Create a Claude skill that scaffolds a new joui component
- [ ] Input: component name + variants
- [ ] Output: full directory with `.astro`, `.css`, `.js`, doc page

---

## Phase 5 — Themes & Drupal Compatibility

### 5.1 Drupal SDC Compatibility — closes #13
- [ ] Verify component CSS/JS works as Drupal SDC
- [ ] Add `component.component.yml` metadata files per component
- [ ] Test with a Drupal theme

### 5.2 Multiple Themes — closes #14
- [ ] Define theme architecture (token overrides per theme)
- [ ] Theme 2 (TBD)
- [ ] Theme 3 (TBD)
- [ ] Each theme compatible with both Astro.js and Drupal

---

## Skills to Build (throughout)

| Skill | When | Purpose |
|---|---|---|
| Generate component docs page | Phase 3 | Scaffold doc page from component dir |
| Generate component scaffold | Phase 4 | New component with all files |
| Port oat.ink component | Phase 2 | Guided port of a specific component |
| Create Drupal SDC metadata | Phase 5 | Generate `.component.yml` for Drupal |

---

## Notes

- Start with one visual theme, add more in Phase 5
- English first, Romanian-ready from Phase 1.3
- No CSS bundling strategy yet — revisit when Drupal integration begins
- GitHub repo: public
- License: MIT

## Open Questions

- **Marketing site (blocksy-style):** Same repo as docs or separate repo? If same repo, CSS tokens must be shared between docs and marketing site — decide when we get there.
