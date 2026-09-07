((Drupal) => {
  Drupal.behaviors.btn = {
    attach(context) {
      context.querySelectorAll('.button[aria-expanded]').forEach((btn) => {
        if (btn.hasAttribute('data-btn-initialized')) return;
        btn.setAttribute('data-btn-initialized', 'true');

        btn.addEventListener('click', () => {
          const isExpanded = btn.getAttribute('aria-expanded') === 'true';
          btn.setAttribute('aria-expanded', !isExpanded);
        });
      });

      context.querySelectorAll('.button.is-loading').forEach((btn) => {
        btn.addEventListener('click', () => {
          btn.setAttribute('aria-busy', 'true');

          setTimeout(() => {
            btn.setAttribute('aria-busy', 'false');
          }, 3000);
        });
      });
    },
  };
})(Drupal);
