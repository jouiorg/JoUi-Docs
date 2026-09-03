document.addEventListener('click', e => {
  const toggle = e.target.closest('[data-sidebar-toggle]');
  if (toggle) {
    const layout = toggle.closest('[data-sidebar-layout]');
    layout?.toggleAttribute('data-sidebar-open');
    return;
  }

  if (!e.target.closest('[data-sidebar]')) {
    const layout = document.querySelector('[data-sidebar-layout][data-sidebar-open]');
    if (layout && window.matchMedia('(max-width: 768px)').matches) {
      layout.removeAttribute('data-sidebar-open');
    }
  }
});
