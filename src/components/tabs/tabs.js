import { OtBase } from '../../js/base.js';

class OtTabs extends OtBase {
  #tabs = [];
  #panels = [];
  #anchor;
  #ids = [];

  init() {
    const tablist = this.querySelector(':scope > [role="tablist"]');
    this.#tabs   = tablist ? [...tablist.querySelectorAll('[role="tab"]')] : [];
    this.#panels = [...this.querySelectorAll(':scope > [role="tabpanel"]')];

    if (!this.#tabs.length || !this.#panels.length) return;

    this.#anchor = this.dataset.anchor;

    this.#tabs.forEach((tab, i) => {
      const panel = this.#panels[i];
      if (!panel) return;
      this.#ids[i] = tab.id || '';
      tab.id   ||= `ot-tab-${this.uid()}`;
      panel.id ||= `ot-panel-${this.uid()}`;
      tab.setAttribute('aria-controls', panel.id);
      panel.setAttribute('aria-labelledby', tab.id);
    });

    tablist.addEventListener('click', this);
    tablist.addEventListener('keydown', this);
    if (this.#anchor) window.addEventListener('hashchange', this);

    const marked   = this.#tabs.findIndex(t => t.ariaSelected === 'true');
    const fromHash = this.#hashIndex();
    this.#activate(Math.max(0, fromHash >= 0 ? fromHash : marked), false);
  }

  cleanup() { window.removeEventListener('hashchange', this); }

  onclick(e) {
    const index = this.#tabs.indexOf(e.target.closest('[role="tab"]'));
    if (index >= 0) this.#activate(index);
  }

  onkeydown(e) {
    if (!e.target.closest('[role="tab"]')) return;
    const next = this.keyNav(e, this.activeIndex, this.#tabs.length, 'ArrowLeft', 'ArrowRight');
    if (next >= 0) { this.#activate(next); this.#tabs[next].focus(); }
  }

  onhashchange() {
    const idx = this.#hashIndex();
    if (idx >= 0) this.#activate(idx, false);
  }

  #activate(idx, syncHash = true) {
    this.#tabs.forEach((tab, i) => {
      tab.ariaSelected = String(i === idx);
      tab.tabIndex = i === idx ? 0 : -1;
    });
    this.#panels.forEach((panel, i) => panel.hidden = i !== idx);
    if (syncHash) this.#syncHash(idx);
    this.emit('ot-tab-change', { index: idx, tab: this.#tabs[idx] });
  }

  #hashIndex() {
    const id = this.#anchor && new URLSearchParams(location.hash.slice(1)).get(this.#anchor);
    return id ? this.#ids.indexOf(id) : -1;
  }

  #syncHash(idx) {
    if (!this.#anchor) return;
    const params = new URLSearchParams(location.hash.slice(1));
    params.set(this.#anchor, this.#ids[idx]);
    for (const [k, v] of [...params]) { if (!v) params.delete(k); }
    const hash = params.toString();
    history.replaceState(null, '', hash ? `#${hash}` : location.pathname + location.search);
  }

  get activeIndex() { return this.#tabs.findIndex(t => t.ariaSelected === 'true'); }
  set activeIndex(value) { if (value >= 0 && value < this.#tabs.length) this.#activate(value); }
}

customElements.define('ot-tabs', OtTabs);
