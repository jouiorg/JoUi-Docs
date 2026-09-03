const toasts = {};

function _get(placement) {
  if (!toasts[placement]) {
    const el = document.createElement('div');
    el.className = 'toast-container';
    el.setAttribute('popover', 'manual');
    el.setAttribute('data-placement', placement);
    document.body.appendChild(el);
    toasts[placement] = el;
  }
  return toasts[placement];
}

function _show(el, options = {}) {
  const { placement = 'top-right', duration = 4000 } = options;
  const p = _get(placement);

  el.classList.add('toast');

  let timeout;
  const start = () => {
    if (duration > 0) timeout = setTimeout(() => _remove(el, p), duration);
  };

  el.onmouseenter = () => clearTimeout(timeout);
  el.onmouseleave = start;

  el.setAttribute('data-entering', '');
  p.appendChild(el);
  p.showPopover();

  requestAnimationFrame(() => requestAnimationFrame(() => el.removeAttribute('data-entering')));

  start();
  return el;
}

function _remove(el, container) {
  if (el.hasAttribute('data-exiting')) return;
  el.setAttribute('data-exiting', '');

  const cleanup = () => {
    el.remove();
    if (!container.children.length) container.hidePopover();
  };

  el.addEventListener('transitionend', cleanup, { once: true });

  const t = getComputedStyle(el).getPropertyValue('--transition').trim();
  const val = parseFloat(t);
  const ms = t.endsWith('ms') ? val : val * 1000;
  setTimeout(cleanup, ms);
}

export function toast(message, title, options = {}) {
  const { variant = 'info', ...rest } = options;
  const el = document.createElement('output');
  el.setAttribute('data-variant', variant);

  if (title) {
    const titleEl = document.createElement('h6');
    titleEl.className = 'toast-title';
    titleEl.textContent = title;
    el.appendChild(titleEl);
  }

  const msgEl = document.createElement('div');
  msgEl.className = 'toast-message';
  msgEl.textContent = message;
  el.appendChild(msgEl);

  return _show(el, rest);
}

export function toastEl(el, options = {}) {
  let t;
  if (el instanceof HTMLTemplateElement) {
    t = el.content.firstElementChild?.cloneNode(true);
  } else if (el) {
    t = el.cloneNode(true);
  }
  if (!t) return;
  t.removeAttribute('id');
  return _show(t, options);
}

export function toastClear(placement) {
  (placement ? [toasts[placement]] : Object.values(toasts)).forEach(c => {
    if (!c) return;
    c.innerHTML = '';
    c.hidePopover();
  });
}
