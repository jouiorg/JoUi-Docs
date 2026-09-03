# joui Component Inventory

Audited from oat.ink (source: `knadh/oat`). Phase 2.1 — Issue #5.

Legend: **CSS** = CSS only | **HTML** = uses HTML-native element | **JS** = JavaScript required | **WC** = Web Component

---

## Typography

| Component  | oat.ink file    | Notes                                      | JS  |
|------------|-----------------|--------------------------------------------|-----|
| Typography | `00-base.css`   | Headings, paragraphs, lists, code blocks — styled by default | CSS |

---

## Layout

| Component | oat.ink file  | Notes                                                          | JS         |
|-----------|---------------|----------------------------------------------------------------|------------|
| Grid      | `grid.css`    | 12-column responsive grid using container queries + CSS grid   | CSS        |
| Sidebar   | `sidebar.css` | Responsive admin layout with sticky sidebar, topnav, mobile overlay | JS (sidebar.js) |

---

## Navigation

| Component   | oat.ink file | Notes                                              | JS          |
|-------------|--------------|----------------------------------------------------|-------------|
| Breadcrumb  | `—`          | Navigation hierarchy via `<nav>` + `<ol>`          | CSS         |
| Pagination  | `—`          | Pagination nav bars                                | CSS         |
| Tabs        | `tabs.css`   | Tabbed interface — Web Component                   | WC (tabs.js) |

---

## Buttons & Actions

| Component | oat.ink file | Notes                             | JS  |
|-----------|--------------|-----------------------------------|-----|
| Button    | `button.css` | Variants: default, outline, ghost. Sizes: small, large | CSS |

---

## Forms

| Component    | oat.ink file    | Notes                                                        | JS            |
|--------------|-----------------|--------------------------------------------------------------|---------------|
| Form elements | `form.css`     | Inputs, selects, textareas, checkboxes, radios, fieldsets    | CSS           |
| Switch       | `—`             | Toggle — `<input type="checkbox" role="switch">`, no JS      | HTML          |
| Meter        | `—`             | Measurements — native `<meter>` element                      | HTML          |
| TagInput     | `taginput.css`  | Type words → tags; supports autocomplete — Web Component     | WC (taginput.js) |
| Upload       | `upload.css`    | Click + drag/drop file uploader — Web Component              | WC (upload.js) |

---

## Data Display

| Component | oat.ink file   | Notes                                          | JS  |
|-----------|----------------|------------------------------------------------|-----|
| Table     | `table.css`    | Data tables with `<thead>/<tbody>` — auto-styled | CSS |
| Avatar    | `avatar.css`   | Images, icons, or text initials                | CSS |
| Badge     | `badge.css`    | Inline labels / tags / pills                   | CSS |
| Progress  | `progress.css` | Progress bars — native `<progress>` element    | HTML |

---

## Feedback

| Component | oat.ink file   | Notes                                          | JS           |
|-----------|----------------|------------------------------------------------|--------------|
| Alert     | `alert.css`    | Alert messages with `role="alert"`             | CSS          |
| Spinner   | `spinner.css`  | Loading indicator with `role="status"`         | CSS          |
| Skeleton  | `skeleton.css` | Loading placeholders with shimmer animation    | CSS          |
| Toast     | `toast.css`    | Notification toasts with placement + stacking  | JS (toast.js) |

---

## Overlays

| Component | oat.ink file    | Notes                                                            | JS             |
|-----------|-----------------|------------------------------------------------------------------|----------------|
| Dialog    | `dialog.css`    | Modal — native `<dialog>` with `commandfor/command`, zero JS     | HTML           |
| Dropdown  | `dropdown.css`  | Dropdown menu                                                    | JS (dropdown.js) |
| Tooltip   | `—`             | Smooth tooltips via native `title` attribute                     | JS (tooltip.js) |

---

## Content

| Component | oat.ink file | Notes                                                  | JS  |
|-----------|--------------|--------------------------------------------------------|-----|
| Card      | `card.css`   | Card containers using semantic `<article>`             | CSS |
| Accordion | `accordion.css` | Collapsible sections — native `<details>/<summary>`, no JS | HTML |

---

## Utilities

| Component  | oat.ink file    | Notes                          | JS  |
|------------|-----------------|--------------------------------|-----|
| Utilities  | `utilities.css` | Helper/utility classes         | CSS |
| Animations | `animations.css`| CSS animation utilities        | CSS |

---

## Summary

| Category         | Count |
|------------------|-------|
| Typography       | 1     |
| Layout           | 2     |
| Navigation       | 3     |
| Buttons & Actions| 1     |
| Forms            | 5     |
| Data Display     | 4     |
| Feedback         | 4     |
| Overlays         | 3     |
| Content          | 2     |
| Utilities        | 2     |
| **Total**        | **27** |

### JS breakdown

- **CSS only** — 15 components: Typography, Grid, Breadcrumb, Pagination, Button, Form elements, Table, Avatar, Badge, Alert, Spinner, Skeleton, Card, Utilities, Animations
- **HTML-native (no JS)** — 5 components: Accordion (`<details>`), Dialog (`<dialog>`), Switch (`<input role="switch">`), Meter (`<meter>`), Progress (`<progress>`)
- **JS required** — 4 components: Sidebar, Toast, Dropdown, Tooltip
- **Web Components (JS)** — 3 components: Tabs, TagInput, Upload

### Port order for Phase 2.2

Simple → Complex:

1. Typography
2. Button ✓ *(already ported as reference implementation)*
3. Badge, Avatar
4. Alert, Spinner, Skeleton
5. Card, Accordion
6. Breadcrumb, Pagination
7. Form elements, Switch, Meter, Progress
8. Table
9. Grid
10. Toast (JS)
11. Dropdown (JS)
12. Tooltip (JS)
13. Dialog (HTML-native)
14. Sidebar (JS)
15. Tabs (WC)
16. TagInput (WC)
17. Upload (WC)
