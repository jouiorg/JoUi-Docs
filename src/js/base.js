export class OtBase extends HTMLElement {
  #initialized = false;

  connectedCallback() {
    if (this.#initialized) return;
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.#setup(), { once: true });
    } else {
      this.#setup();
    }
  }

  #setup() {
    if (this.#initialized) return;
    this.#initialized = true;
    this.init();
  }

  disconnectedCallback() { this.cleanup(); }
  cleanup() {}

  handleEvent(event) {
    const handler = this[`on${event.type}`];
    if (handler) handler.call(this, event);
  }

  keyNav(event, idx, len, prevKey, nextKey, homeEnd = false) {
    const { key } = event;
    let next = -1;

    if (key === nextKey)       next = (idx + 1) % len;
    else if (key === prevKey)  next = (idx - 1 + len) % len;
    else if (homeEnd) {
      if (key === 'Home') next = 0;
      else if (key === 'End') next = len - 1;
    }

    if (next >= 0) event.preventDefault();
    return next;
  }

  emit(name, detail = null) {
    return this.dispatchEvent(new CustomEvent(name, {
      bubbles: true, composed: true, cancelable: true, detail
    }));
  }

  uid() { return Math.random().toString(36).slice(2, 10); }
}

// Polyfill for command/commandfor (Safari)
if (!('commandForElement' in HTMLButtonElement.prototype)) {
  document.addEventListener('click', e => {
    const btn = e.target.closest('button[commandfor]');
    if (!btn) return;
    const target = document.getElementById(btn.getAttribute('commandfor'));
    if (!target) return;
    const command = btn.getAttribute('command') || 'toggle';
    if (target instanceof HTMLDialogElement) {
      if (command === 'show-modal') target.showModal();
      else if (command === 'close') target.close();
      else target.open ? target.close() : target.showModal();
    }
  });
}

document.addEventListener('touchstart', e => {
  if (e.target instanceof HTMLDialogElement) {
    e.preventDefault();
    e.target.close();
  }
}, { passive: false });
