# 03 — CSS Variable Convention

**Golden rule:** variables use **underscore** (`_`) as separator between segments. **Dash** (`-`) inside a compound name (component-element). Visually distinct from CSS classes.

## Two-layer architecture

- `--_comp_prop` — **local** variable (private, used in rules). Prefix `--_`.
- `--comp_prop` — **public** variable (overridable from outside). Prefix `--`.

### When to create a local `--_` variable

**3 cazuri, în funcție de reutilizare și fallback:**

**1. Reutilizată în mai multe locuri** → declarată sus în `.c--[name]`:
```css
.c--menu {
  --_c-menu_bg: var(--c-menu_bg, var(--body-bg));  /* folosită în ul {} și în a {} */
}
```

**2. Folosită o singură dată, cu fallback** → direct inline, fără variabilă locală:
```css
background: var(--c-menu_ul_bg, var(--_c-menu_bg));
border-radius: var(--c-menu_ul_b-r, 0);
```

**3. Folosită o singură dată, fără fallback** → direct `var(--public)`:
```css
display: var(--c-menu_ul_d);
gap: var(--c-menu_ul_gap);
```
Browserul aplică default-ul nativ dacă variabila nu e setată.

## Variables for sub-elements

```css
--_{comp}-{element}_{prop}
```

Dash between component and element (compound name), underscore between compound name and property.

Examples:
```css
--_card_bg                       /* card → bg */
--_card-title_c                  /* card → title → color */
--_card-imageWrapper_p-b         /* card → imageWrapper → padding-block */
--_mediaText_d                   /* mediaText → display */
--_mediaText-title_f-s           /* mediaText → title → font-size */
```

## Default values

1. Identify the property type (color, spacing, border, typography, etc.).
2. Look for a global theme variable that fits semantically.
3. If found → use it as default: `var(--card_bg, var(--c_gray_50))`.
4. If not found → raw value: `var(--card_bg, 4px)`.

```css
/* ✅ Global variable found */
--_card_bg: var(--card_bg, var(--c_gray_50));
--_card_br: var(--card_br, var(--b-r));
--_card_c:  var(--card_c, var(--body_c));

/* ✅ No matching global variable */
--_pager-item_p-b: var(--pager-item_p-b, 8px);
--_pager-item_p-i: var(--pager-item_p-i, 12px);
```

## State/variant — reassigning local variables

`.is-*` / `.has-*` classes (see [02-css-classes.md](./02-css-classes.md)) **reassign local variables**, NOT rewrite properties directly:

```css
.c--card {
  --_card_bg: var(--card_bg, white);
  --_card_c: var(--card_c, var(--body_c));

  background: var(--_card_bg);
  color: var(--_card_c);

  &.has-type_primary {
    --_card_bg: var(--c_primary_700);
    --_card_c: var(--c_white);
  }

  &.is-active {
    --_card_bg: var(--c_highlight);
  }

  &.has-label_inline {
    --_card_d: flex;
    --_card-label_m-b: 0;
  }
}
```

**Why:** the consumer can override both the base (`--card_bg`) and the variant behavior (by reassigning internal variables), without rewriting selectors.

## `_h` / `_a` suffixes for CSS pseudo-classes

Only for native CSS `:hover` and `:active`:

```css
.c--btn {
  --_btn_bg: var(--btn_bg, blue);
  --_btn_bg_h: var(--btn_bg_h, darkblue);
  --_btn_bg_a: var(--btn_bg_a, navy);

  background: var(--_btn_bg);

  &:hover { background: var(--_btn_bg_h); }
  &:active { background: var(--_btn_bg_a); }

  &.is-active { --_btn_bg: var(--c_highlight); }
}
```

`.is-active` ≠ `:active`. The class = logical state from JS/server. The pseudo-class = native CSS state. They coexist.

## CSS property abbreviations

| CSS Property          | Abbreviation |
|-----------------------|--------------|
| font-size             | `f-s`        |
| font-weight           | `f-w`        |
| line-height           | `l-h`        |
| background            | `bg`         |
| color                 | `c`          |
| padding-block         | `p-b`        |
| padding-inline        | `p-i`        |
| margin                | `m`          |
| margin-block          | `m-b`        |
| margin-block-start    | `m-b-s`      |
| margin-block-end      | `m-b-e`      |
| border-radius         | `b-r`        |
| border-width          | `b-w`        |
| border-color          | `b-c`        |
| gap                   | `gap`        |
| grid-template-columns | `g-t-c`      |
| grid-template-areas   | `g-t-a`      |
| grid-column           | `g-c`        |
| aspect-ratio          | `a-r`        |
| justify-items         | `j-i`        |
| align-content         | `a-c`        |
| flex-direction        | `f-d`        |
| flex-wrap             | `flex-w`     |
| min-width             | `m-w`        |
| transition            | `t-t`        |
| text-decoration       | `d`          |
| display               | `d`          |

## `.css` file structure

```css
/**
 * MediaText Component Styles
 *
 * Short description.
 */

.c--mediaText {
  /* Variables — root */
  --_mediaText_d: var(--mediaText_d, block);
  --_mediaText_bg: var(--mediaText_bg, transparent);

  /* Variables — title */
  --_mediaText-title_c: var(--mediaText-title_c, var(--c_primary_700));
  --_mediaText-title_f-s: var(--mediaText-title_f-s, 1.5rem);

  /* Variables — image */
  --_mediaText-image_b-r: var(--mediaText-image_b-r, var(--b-r));

  /* Base */
  display: var(--_mediaText_d);
  background: var(--_mediaText_bg);

  /* Sub-elements */
  .mediaText-title {
    color: var(--_mediaText-title_c);
    font-size: var(--_mediaText-title_f-s);
  }

  .mediaText-image {
    border-radius: var(--_mediaText-image_b-r);
  }

  /* State + variant classes — reassign local vars */
  &.is-active {
    --_mediaText_bg: var(--c_highlight);
  }

  &.has-direction_horizontal {
    --_mediaText_d: flex;
  }

  /* Responsive */
  @media (--md) {
    --_mediaText-title_f-s: 2rem;
  }
}
```

## See also

- [02-css-classes.md](./02-css-classes.md) — classes that use these variables
- [04-twig-and-yml.md](./04-twig-and-yml.md) — how state/variant classes are generated from props
