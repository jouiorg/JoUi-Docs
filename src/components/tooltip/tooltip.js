document.addEventListener('DOMContentLoaded', () => {
  const _attrib = 'title';
  const _sel    = '[title]';

  const apply = el => {
    const t = el.getAttribute(_attrib);
    if (!t) return;
    el.setAttribute('data-tooltip', t);
    el.hasAttribute('aria-label') || el.setAttribute('aria-label', t);
    el.removeAttribute(_attrib);
  };

  document.querySelectorAll(_sel).forEach(apply);

  new MutationObserver(muts => {
    for (const m of muts) {
      apply(m.target);
      for (const n of m.addedNodes) {
        if (n.nodeType === 1) {
          apply(n);
          n.querySelectorAll(_sel).forEach(apply);
        }
      }
    }
  }).observe(document.body, {
    childList: true, subtree: true, attributes: true, attributeFilter: [_attrib]
  });
});
