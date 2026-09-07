# 02 — CSS Class Convention

**Golden rule:** classes use **dash** (`-`) as separator. **camelCase** for compound names. **NEVER** `__` or `--`.

## Component root class

`.c--{name}` — the `c--` prefix only on root.

| Folder name | Root class |
|---|---|
| `card` | `.c--card` |
| `footer` | `.c--footer` |
| `media` | `.c--media` |
| `media_text_section` | `.c--mediaText` |
| `color_card` | `.c--colorCard` |
| `layout_fn` | `.c--layoutFn` |
| `timeline_item` | `.c--timelineItem` |

**Rule:** simple name → lowercase. Compound name → camelCase (`mediaText`, not `media-text` or `media_text`).

## Sub-elements

`.{comp}-{element}` — no `c--`, with dash.

| Element | Pattern | Examples |
|---|---|---|
| Simple sub-element | `.{comp}-{element}` | `.card-title`, `.card-body`, `.field-label` |
| Compound sub-element | `.{comp}-{elementCamelCase}` | `.mediaText-title`, `.card-imageWrapper`, `.footer-bottomLeft` |

## Modifiers (state + variant)

Exclusively these 3 patterns on the component root:

| Pattern | When | Examples |
|---|---|---|
| `.is-{state}` | Runtime boolean state (UI state) | `.is-active`, `.is-disabled`, `.is-loading`, `.is-expanded`, `.is-open`, `.is-hidden` |
| `.has-{thing}` | Boolean "has/contains" | `.has-image`, `.has-icon`, `.has-children`, `.has-label` |
| `.has-{prop}_{value}` | Enum variant with discrete value | `.has-label_inline`, `.has-type_primary`, `.has-size_large`, `.has-direction_horizontal` |

**Format rules:**
- All lowercase.
- Single dash between `is`/`has` and the prop name. Underscore between prop and value (for enum).
- `is-` = temporary state. `has-` = possession/variant.

## Forbidden

- `__` (double underscore — BEM, conflicts with Bootstrap).
- `--` between component and variant (`.c--card--featured` ❌).
- `is--horizontal` with two dashes (✓ `is-horizontal`).
- Mixed separators for the same type of element.

## See also

- [03-css-variables.md](./03-css-variables.md) — CSS variables that work with these classes
- [04-twig-and-yml.md](./04-twig-and-yml.md) — how YAML props map to these classes
