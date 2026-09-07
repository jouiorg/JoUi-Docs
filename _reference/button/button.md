---
title: Button
group: Global
slug: button
description: Flexible button component with multiple color variants, size options, icon positioning, outline and ghost styles, and full WCAG 2.1 AA accessibility support.
version: 1.0.0
---

# Button Component

## Overview

The Button component provides quickskin custom button styles for actions in forms, dialogs, and more with support for multiple sizes, states, and configurations.

## Features

- ✅ Multiple color variants (primary, secondary, accent, etc.)
- ✅ Size options (small, default, large)
- ✅ Type variants (outline, ghost, clear, nav)
- ✅ Icon support (left, right, icon-only)
- ✅ Border radius customization
- ✅ Full accessibility support (WCAG 2.1 Level AA)
- ✅ Disabled state handling
- ✅ Flexible HTML tag rendering (button, a, span, summary)

## CSS Classes Generated

The component generates the following CSS classes:

- Base: `button`
- Color: `button-primary`, `button-secondary`
- Type: `button-outline`, `button-ghost`
- Size: `button-sm`, `button-lg`
- Icon position: `button-icon-left`, `button-icon-right`, `button-icon-only`
- Radius: `button-radius-none`, `button-radius-sm`, `button-radius-lg`, `button-radius-pill`

{/_ TAB:Properties _/}

# Properties Reference

## Appearance Properties

| Property        | Type             | Default | Options                          | Description          |
| --------------- | ---------------- | ------- | -------------------------------- | -------------------- |
| `button_color`  | `string or null` | `null`  | `primary`, `secondary`, `accent` | Button color theme   |
| `button_type`   | `string or null` | `null`  | `outline`, `ghost`, `clear`      | Button style variant |
| `button_size`   | `string or null` | `null`  | `sm`, `lg`                       | Button size          |
| `button_radius` | `string or null` | `null`  | `none`, `sm`, `lg`, `pill`       | Button border radius |

## Behavior Properties

| Property               | Type              | Default                                    | Options                          | Description                                                                                  |
| ---------------------- | ----------------- | ------------------------------------------ | -------------------------------- | -------------------------------------------------------------------------------------------- |
| `button_tag`           | `string`          | `button` (or `a` if `button_url` provided) | `a`, `button`, `span`, `summary` | The HTML tag to use for the button                                                           |
| `button_disabled`      | `boolean`         | `false`                                    | `true`, `false`                  | Whether the button is disabled                                                               |
| `button_aria_expanded` | `boolean or null` | `null`                                     | `true`, `false`, `null`          | Indicates whether the button controls an expanded element (only use for expandable controls) |
| `button_aria_label`    | `string or null`  | `null`                                     | Any string                       | Accessible label for screen readers (required for icon-only buttons)                         |
| `button_icon_position` | `string`          | `right`                                    | `left`, `right`, `only`          | Position of the icon relative to the button text                                             |

## Content Properties

| Property       | Type             | Default | Description                                                                  |
| -------------- | ---------------- | ------- | ---------------------------------------------------------------------------- |
| `button_id`    | `string or null` | `null`  | The ID attribute for the button                                              |
| `button_label` | `string`         | `''`    | The text content of the button                                               |
| `button_url`   | `string or null` | `null`  | URL for the button when using anchor tag (`a`)                               |
| `button_icon`  | `string or null` | `null`  | SVG icon code to display in the button (should include `aria-hidden="true"`) |

## Customization Properties

| Property     | Type                             | Default | Description                                   |
| ------------ | -------------------------------- | ------- | --------------------------------------------- |
| `button_uc`  | `array`                          | `[]`    | Array of utility classes to add to the button |
| `button_att` | `Drupal\Core\Template\Attribute` | `{}`    | Additional HTML attributes for the button     |

## Slots

### `slot_icon_before`

Icon positioned to the left of the button text (used when `button_icon_position` is `left`)

### `slot_content`

Main button content/text (used when `button_icon_position` is not `only`)

### `slot_icon`

Icon positioned to the right of the button text or as the only content

# Usage Examples

## Basic Button

```twig
{% include 'mud_egov:button' with {
  button_label: 'Click me'
} %}
{% include 'mud_egov:button' with {
  button_label: 'Click me'
} %}
```

## Primary Button with Icon

```twig
{% include 'mud_egov:button' with {
  button_label: 'Save',
  button_color: 'primary',
  button_icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/></svg>',
  button_icon_position: 'left'
} %}
```

## Link Button (Outline Style)

```twig
{% include 'mud_egov:button' with {
  button_label: 'Learn More',
  button_url: '#',
  button_type: 'outline',
  button_color: 'primary'
} %}
```

## Large Disabled Button

```twig
{% include 'mud_egov:button' with {
  button_label: 'Processing...',
  button_size: 'lg',
  button_disabled: true
} %}
```

## Icon-only Button

```twig
{% include 'mud_egov:button' with {
  button_icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M9.218 2h2.402L16 12.987h-2.402zM4.379 2h2.512l4.38 10.987H8.82l-.895-2.308h-4.58l-.896 2.307H0L4.38 2.001zm2.755 6.64L5.635 4.777 4.137 8.64z"/>
</svg>',
  button_icon_position: 'only',
  button_aria_label: 'Close dialog',
  button_radius: 'pill'
} %}
```

## Button with Custom Classes

```twig
{% include 'mud_egov:button' with {
  button_label: 'Custom Button',
  button_uc: ['my-custom-class', 'another-class']
} %}
```

## Dropdown Toggle Button

```twig
{% include 'mud_egov:button' with {
  button_label: 'Menu',
  button_aria_expanded: false,
  button_icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M9.218 2h2.402L16 12.987h-2.402zM4.379 2h2.512l4.38 10.987H8.82l-.895-2.308h-4.58l-.896 2.307H0L4.38 2.001zm2.755 6.64L5.635 4.777 4.137 8.64z"/>
</svg>'
} %}
```

# Accessibility

The button component follows WCAG 2.1 Level AA guidelines and implements comprehensive accessibility features:

## Keyboard Navigation

- ✅ All buttons are keyboard focusable (can be reached with Tab key)
- ✅ Disabled buttons are removed from tab order (`tabindex="-1"`)
- ✅ Enter and Space keys activate buttons
- ✅ Visible focus indicator on `:focus-visible` state

## Screen Reader Support

- ✅ **Icon-only buttons**: Must have `button_aria_label` for screen reader context
- ✅ **Decorative icons**: SVG icons should include `aria-hidden="true"` to hide from screen readers
- ✅ **Button type**: `<button>` elements automatically get `type="button"` to prevent form submission
- ✅ **Expandable controls**: Use `button_aria_expanded` (true/false) for dropdowns, accordions, etc.

## Disabled State Handling

- ✅ **`<button>` elements**: Use native `disabled` attribute
- ✅ **`<a>` elements**: Use `aria-disabled="true"` (links cannot be semantically disabled)
- ✅ **Visual feedback**: Reduced opacity (0.6) and `not-allowed` cursor
- ✅ **Interaction prevention**: `pointer-events: none` prevents all interactions

## Focus Management

- ✅ **`:focus-visible`**: Shows outline only for keyboard navigation
- ✅ **`:focus:not(:focus-visible)`**: Hides outline for mouse clicks
- ✅ **Outline color**: Uses button background color for branded focus indicator
- ✅ **Outline offset**: 2px offset for better visibility

## Color Contrast

- ✅ All color combinations meet WCAG AA contrast requirements (4.5:1 minimum)
- ✅ Focus indicators have sufficient contrast against backgrounds
- ✅ Disabled states maintain readable contrast

## Best Practices

1. **Icon-only buttons** automatically get `aria-label="Button"` as fallback (should be overridden)
2. **`aria-expanded`** only applied when explicitly needed (not on all buttons)
3. **Links as buttons** get `role="link"` when disabled for semantic clarity
4. **SVG pointer events** set to `none` to prevent interference with button interactions

# CSS Variables

> **Note:** For complete CSS variable documentation, see `BUTTON_CSS_DOCS.md`

## Variable Naming Convention

The component uses a structured naming system with different categories:

### 1. Component Variables (`btn_*`)

- **Global** (without `_` prefix): Can be customized from outside (e.g., `--btn_c`, `--btn_bg`)
- **Internal** (with `_` prefix): Used only within the component (e.g., `--_btn_c`, `--_btn_bg`)

### 2. Meta-Variables (Special Namespaces)

- **`btn-type_*`**: Set by button type variants (outline, ghost, clear)
- **`btn-mix_*`**: Color mixing utilities for hover/focus effects
- **`btn-state_*`**: Dynamic state variables that change based on interaction

## Base Button Variables

| Variable       | Default Value    | Description                 |
| -------------- | ---------------- | --------------------------- |
| `--btn_c`      | `var(--body-c)`  | Default text color          |
| `--btn_bg`     | `color-mix(...)` | Default background color    |
| `--btn_b-c`    | `var(--btn_bg)`  | Border color                |
| `--btn_f-s`    | `1rem`           | Font size                   |
| `--btn_l-h`    | `1.2`            | Line height                 |
| `--btn_p-b`    | `0.5em`          | Padding block (top/bottom)  |
| `--btn_p-i`    | `1.2em`          | Padding inline (left/right) |
| `--btn_b-w`    | `1px`            | Border width                |
| `--btn_b-r`    | `0.5em`          | Border radius               |
| `--btn_cursor` | `pointer`        | Cursor style                |

## State Variables

| Variable                | Description                                     |
| ----------------------- | ----------------------------------------------- |
| `--btn_c_h`             | Text color on hover                             |
| `--btn_bg_h`            | Background color on hover (auto: color-mix 20%) |
| `--btn_b-c_h`           | Border color on hover                           |
| `--btn_c_f`             | Text color on focus                             |
| `--btn_bg_f`            | Background color on focus (auto: color-mix 30%) |
| `--btn_b-c_f`           | Border color on focus                           |
| `--btn_cursor-disabled` | Cursor when disabled (`not-allowed`)            |

## Color Variants

| Class               | Text Color       | Background Color         |
| ------------------- | ---------------- | ------------------------ |
| `.button-primary`   | `var(--c_white)` | `var(--c_primary_500)`   |
| `.button-secondary` | `var(--c_white)` | `var(--c_secondary_500)` |
| `.button-accent`    | `var(--c_white)` | `var(--c_accent_500)`    |

## Size Variants

| Class        | Font Size | Padding Block | Padding Inline |
| ------------ | --------- | ------------- | -------------- |
| `.button-sm` | `0.875em` | `0.25em`      | `0.5em`        |
| Default      | `1rem`    | `0.5em`       | `1.2em`        |
| `.button-lg` | `1.25em`  | `1em`         | `2em`          |
