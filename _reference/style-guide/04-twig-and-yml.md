# 04 — Twig + .component.yml

## Twig variables (snake_case + camelCase for compound)

Twig variables from props use **underscore** as separator between segments. The component prefix follows the root class name:

| Component (folder) | Twig prefix | Example variables |
|---|---|---|
| `card` | `card_` | `card_title`, `card_image`, `card_link` |
| `field` | `field_` | `field_label`, `field_items`, `field_label_display` |
| `media_text_section` | `mediaText_` | `mediaText_title`, `mediaText_image` |
| `color_card` | `colorCard_` | `colorCard_bg`, `colorCard_title` |

**Rules:**
- Variable prefix = camelCase of component name (`mediaText_`, `colorCard_`, `timelineItem_`).
- After prefix: snake_case between parts (`mediaText_title`, `mediaText_image_alt`).
- Established suffixes: `_uc` (utility classes array), `_att` (Drupal Attribute object).

## `.component.yml` structure

```yaml
$schema: https://git.drupalcode.org/project/drupal/-/raw/10.1.x/core/modules/sdc/src/metadata.schema.json
name: MyComp
status: stable
version: 1.0.0
group: Components
description: 'Short description.'

# Props.
props:
  type: object
  required:
    - field_required_prop

  properties:
    # component variations (enum)
    comp_variant:
      type: string
      title: 'Variant'
      enum: ['default', 'featured', 'compact']
      default: 'default'

    # boolean states
    is_active:
      type: boolean
      title: 'Active state'
      default: false

    # fields values
    comp_title:
      type: ['string', 'null']
      title: 'Title'
      default: null

    # uc -> utility_classes
    comp_uc:
      type: array
      items:
        type: string
      title: 'Utility classes'
      default: []

    # att -> attributes
    comp_att:
      type: Drupal\Core\Template\Attribute
      title: 'Attributes'

# Slots.
slots:
  slot_title:
    title: 'Title'
    description: 'Title slot.'
```

**Props order in YAML:**
1. Variations (enums)
2. Boolean states (`is_*`, `has_*`)
3. Fields values (content)
4. Utility classes (`_uc`)
5. Attributes (`_att`)

## Props → classes mapping in Twig

```twig
{# Component classes #}
{% set comp_classes = [
  'c--myComp',
  is_active ? 'is-active',
  has_image ? 'has-image',
  comp_variant ? 'has-variant_' ~ comp_variant|clean_class,
  size ? 'has-size_' ~ size|clean_class,
]|merge(comp_uc ?: []) %}
```

| YAML prop type | Example | Resulting class |
|---|---|---|
| `boolean` (state) | `is_active: true` | `.is-active` |
| `boolean` (possession) | `has_image: true` | `.has-image` |
| `enum` (variant) | `comp_variant: 'featured'` | `.has-variant_featured` |
| `enum` (display) | `label_display: 'inline'` | `.has-label_inline` |

**Canonical example:** `components/drupal/field/field.twig` — maps `field_label_display: 'inline'` → class `.has-label_inline`.

## `.twig` file structure

```twig
{#
/**
  * @file
  * MyComp component.
  *
  * Available variations:
  * - comp_variant (string) Default: 'default'.
  *
  * Available values:
  * - comp_title (string|null) (default: null)
  *
  * Available Utility classes -> uc
  * - comp_uc (array) (default: [])
  *
  * Available attributes -> att
  * - comp_att (Drupal\Core\Template\Attribute)
  *
  * Available slots
  * - slot_title: Title slot.
  */
#}

{# Set default value #}
{% set comp_variant = comp_variant|default('default') %}
{% set is_active = is_active|default(false) %}
{% set comp_title = comp_title|default(null) %}

{# Create attributes #}
{% set comp_att = comp_att ?: create_attribute() %}

{# Component classes #}
{% set comp_classes = [
  'c--myComp',
  is_active ? 'is-active',
  comp_variant ? 'has-variant_' ~ comp_variant|clean_class,
]|merge(comp_uc ?: []) %}

{# Change attributes #}

{# Render component #}
<div{{ comp_att.addClass(comp_classes) }}>
  {% if block('slot_title') %}
    <h3 class="myComp-title">
      {% block slot_title %}{% endblock %}
    </h3>
  {% endif %}

  {% block slot_content %}{% endblock %}
</div>
```

**Required comments** in order:
1. `{# Set default value #}`
2. `{# Create attributes #}`
3. `{# Component classes #}`
4. `{# Change attributes #}` (can be empty)
5. `{# Render component #}`

## Slot patterns

```twig
{# Direct slot (no wrapper) #}
{% block slot_addons %}{% endblock %}

{# Slot with conditional wrapper (appears only if slot has content) #}
{% if block('slot_image') %}
  <div{{ image_att.addClass(image_classes) }}>
    {% block slot_image %}{% endblock %}
  </div>
{% endif %}
```

**Forbidden:** `{{- block('slot_name') -}}` in render without prior definition — `{% block %}{% endblock %}` must be in the HTML structure for SDC to inject content at the correct position.

## See also

- [01-architecture.md](./01-architecture.md) — component vs Drupal template separation
- [02-css-classes.md](./02-css-classes.md) — generated class convention
- [03-css-variables.md](./03-css-variables.md) — CSS variable convention
