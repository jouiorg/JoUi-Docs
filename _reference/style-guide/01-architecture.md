# 01 — Component Architecture

## Philosophy

**Custom convention** (NOT BEM) to avoid collisions with other systems (Bootstrap, Tailwind, frameworks using `__`/`--`). Real isolation comes from:
- `c--` prefix on root = namespace.
- Scoping via CSS nesting for sub-elements.

This is a deliberate decision — a developer coming from BEM needs to learn the convention, but for AI and reusable components it's safer.

## Component = self-contained

The SDC component **does NOT read from Drupal context**. All values come as **props** declared in `.component.yml`.

### Who does what

| Role | Location | Responsibility |
|---|---|---|
| **Drupal override template** | `web/themes/custom/joui/templates/.../*.html.twig` | Extracts from Drupal context (`label`, `items`, `entity_type`, `field_name`, etc.). Builds Drupal-specific classes. Includes the SDC component passing data as props. |
| **SDC component** | `web/themes/custom/joui/components/.../*.twig` | Receives everything as props. Does not access Drupal variables directly. |

## Class separation

Classes are grouped into 3 categories, each with its own location:

| Class type | Where declared | Examples |
|---|---|---|
| **Structural (component)** | In `.twig` (SDC component) | `c--card`, `card-title`, `card-image` |
| **State/variant (component)** | In `.twig` (from enum/boolean props) | `is-active`, `has-type_primary`, `has-label_inline` |
| **Drupal-specific** | In `.html.twig` (Drupal override), passed via `_uc` | `field--type-text-with-summary`, `field--name-body`, `node--type-article` |

**Rule:** the component declares ONLY its structural + state/variant classes. Drupal context-specific classes go via utility classes (`_uc`) or attributes (`_att`).

## Canonical example

`web/themes/custom/joui/components/drupal/field/field.twig`:
- Receives `field_label`, `field_items`, `field_label_display`, `field_label_hidden`, `field_multiple` as props.
- Does not read from native Drupal `attributes`, `label`, `items`.
- Maps `field_label_display: 'inline'` → class `.has-label_inline`.

The override template `templates/fields/field.html.twig` (when it exists) is the one that extracts from context and includes the component.

## See also

- [02-css-classes.md](./02-css-classes.md) — class naming convention
- [03-css-variables.md](./03-css-variables.md) — CSS variable convention
- [04-twig-and-yml.md](./04-twig-and-yml.md) — Twig + .component.yml
