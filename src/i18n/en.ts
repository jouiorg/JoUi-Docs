export const en = {
  // Site
  'site.title': 'joui — Component Library',
  'site.description': 'An open-source HTML/CSS/JS component library built for the web.',

  // Navigation
  'nav.docs': 'Docs',
  'nav.components': 'Components',
  'nav.github': 'GitHub',
  'nav.toggleTheme': 'Toggle theme',
  'nav.toggleMenu': 'Toggle menu',

  // Docs sidebar sections
  'sidebar.gettingStarted': 'Getting Started',
  'sidebar.primitives': 'Primitives',
  'sidebar.components': 'Components',
  'sidebar.content': 'Content',
  'sidebar.feedback': 'Feedback',
  'sidebar.navigation': 'Navigation',
  'sidebar.forms': 'Forms',
  'sidebar.dataDisplay': 'Data Display',
  'sidebar.layout': 'Layout',
  'sidebar.overlays': 'Overlays',
  'sidebar.advanced': 'Advanced',

  // Getting started pages
  'docs.introduction': 'Introduction',
  'docs.installation': 'Installation',
  'docs.usage': 'Usage',

  // Component page sections
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
