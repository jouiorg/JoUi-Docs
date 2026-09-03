export const en = {
  // Site
  'site.title': 'joui — Component Library',
  'site.description': 'An open-source HTML/CSS/JS component library built for the web.',

  // Navigation
  'nav.docs': 'Docs',
  'nav.components': 'Components',
  'nav.github': 'GitHub',

  // Docs sidebar
  'sidebar.gettingStarted': 'Getting Started',
  'sidebar.components': 'Components',

  // Component page
  'component.overview': 'Overview',
  'component.variants': 'Variants',
  'component.usage': 'Usage',
  'component.cssVariables': 'CSS Variables',
  'component.props': 'Props',
  'component.accessibility': 'Accessibility',

  // Component table headers
  'table.variable': 'Variable',
  'table.default': 'Default',
  'table.description': 'Description',
  'table.prop': 'Prop',
  'table.type': 'Type',
} as const;

export type TranslationKey = keyof typeof en;
