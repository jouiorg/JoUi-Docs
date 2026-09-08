# joui Component Conventions

## File structure

```
src/primitives/{name}/     ← atomic, used everywhere
  {name}.astro
  {name}.css
  {name}.js                ← only if JS is strictly needed

src/components/{name}/     ← composed or context-specific
  {name}.astro
  {name}.css
  {name}.js                ← only if JS is strictly needed
```

**Primitive vs component:** Primitives are atomic building blocks (button, badge, avatar, spinner, skeleton, heading). Components are composed or context-specific (accordion, card, dialog, alert, sidebar, toast).

---

## Props convention — `p` prefix (ALL props, no exceptions)

```ts
interface Props {
  pVariant?: 'primary' | 'secondary';
  pSize?: 'sm' | 'md' | 'lg';
  pDisabled?: boolean;
  pHref?: string;
  pClass?: string;   // always include
}

const { pVariant = 'primary', pClass, ...attrs } = Astro.props;
```

The `p` prefix applies to **all** props — including those that mirror native HTML attributes (`name`, `size`, `type`, `href`). Native attributes are then set explicitly on the rendered element. Non-joui attributes (`id`, `aria-*`, `data-*`, `style`) pass through via `...attrs` without prefix.

---

## CSS layer

Always wrap in `@layer components { }`. CSS is standalone (no `<style>` blocks in `.astro`) so it can be consumed by Drupal SDC independently.

---

## CSS var pattern — public/private

```css
@layer components {
  .{name} {
    /* public override → private computed → fallback token */
    --_{name}_bg:   var(--{name}_bg,   var(--c_surface));
    --_{name}_b-r:  var(--{name}_b-r,  var(--b-r));
    --_{name}_c:    var(--{name}_c,    var(--c_fg));
    --_{name}_bg_h: var(--{name}_bg_h, var(--c_hover_bg));

    background:    var(--_{name}_bg);
    border-radius: var(--_{name}_b-r);
    color:         var(--_{name}_c);

    &:hover  { background: var(--_{name}_bg_h); }
  }
}
```

- `--{name}_bg` — **public** override (consumers set this)
- `--_{name}_bg` — **private** computed (underscore prefix, component uses this)
- `--_{name}_bg_h` — hover state (`_h` suffix)
- `--_{name}_bg_a` — active state (`_a` suffix)

**Only add vars that are actually variable.** Don't create vars for everything — only for properties that genuinely need overriding.

---

## Variants

### Modifier classes — primitives with structural variants

```css
.btn--primary { --_btn_bg: var(--c_accent); }
.btn--outline { --_btn_bg: transparent; }
```

```astro
const classes = ['btn', `btn--${pVariant}`, pClass].filter(Boolean).join(' ');
```

### `data-variant` — status/semantic variants (alert, badge, toast)

```css
[data-variant="success"] { color: var(--_variant-color); }
```

```astro
const dataVariant = pVariant !== 'default' ? pVariant : undefined;
// <div data-variant={dataVariant}>
```

`--_variant-color` is set globally in `tokens.css` for `success` / `warning` / `danger` / `error`.

---

## JS pattern (only when HTML-native won't work)

```js
import { OtBase } from '../../js/base.js';

class Ot{Name} extends OtBase {
  init() {
    // setup — called once on connect
  }
  // event handlers as on{event}(e) methods
}

customElements.define('ot-{name}', Ot{Name});
```

In the `.astro` file, import via `<script>`:

```astro
<ot-{name} class={pClass} {...attrs}>
  <slot />
</ot-{name}>

<script>
  import './{name}.js';
</script>
```

Use `<details>/<summary>` for accordion, `<dialog>` for modal — no JS needed.  
JS is needed for: dropdown positioning, sidebar toggle, tabs, toast queue, tooltip anchor, tag input.

---

## Token reference (most used)

```
--c_fg, --c_fg_muted, --c_fg_subtle
--c_bg, --c_bg_subtle, --c_bg_muted
--c_surface, --c_surface_raised, --c_surface_muted
--c_accent, --c_accent_h, --c_accent_a, --c_accent_fg
--c_border, --c_border_muted
--c_hover_bg, --c_active_bg

--s_1 (0.25rem) … --s_8 (2rem) … --s_16 (4rem)
--b-r (0.375rem), --b-r_s, --b-r_l, --b-r_full
--f-s_6 (1rem body), --f-s_7 (0.875rem small), --f-s_8 (0.75rem caption)
--f-w_normal, --f-w_md, --f-w_semibold, --f-w_bold
--t (200ms ease), --t_fast (120ms ease)
--sh_s, --sh_m, --sh_l
```
