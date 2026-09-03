import { OtBase } from '../../js/base.js';

const h = t => document.createElement(t);
const label = v => String(v).trim();

class OtTaginput extends OtBase {
  static observedAttributes = ['disabled'];
  #data = new WeakMap();

  init() {
    this.input = this.querySelector('input');
    if (!this.input) return;

    if (!this.input.readOnly) {
      this.input.addEventListener('keydown', this);
      this.input.addEventListener('input', e => {
        e.stopPropagation();
        const val  = this.input.value;
        const list = this.input.list;
        const picked = list && (e.inputType === 'insertReplacementText' || val.length - (this.prev || '').length > 1);
        this.prev = val;
        if (picked) {
          const opt = [...list.options].find(o => o.value === val);
          if (opt) return requestAnimationFrame(() => this.add(opt.data ?? val));
        }
      });
      this.input.addEventListener('change', e => e.stopPropagation());
      this.input.addEventListener('focus', this);
      this.addEventListener('click', this);
    }

    const val = this.getAttribute('value');
    if (val) this.value = [val];
    this.attributeChangedCallback();
  }

  attributeChangedCallback() {
    if (this.input) this.input.disabled = this.disabled;
    this.setAttribute('aria-disabled', this.disabled);
  }

  get disabled() { return this.hasAttribute('disabled'); }
  set disabled(v) { this.toggleAttribute('disabled', !!v); }

  onkeydown(e) {
    if (e.key === 'Backspace' && !this.input.value) return this.remove(this.input.previousElementSibling);
    if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); this.add(this.input.value); }
  }

  onfocus() {
    if (!this.input.list) return;
    this.input.dispatchEvent(new Event('input', { bubbles: true }));
    requestAnimationFrame(() => { try { this.input.showPicker(); } catch {} });
  }

  onclick(e) {
    if (this.disabled) return;
    const x = e.target.closest('button');
    x ? this.remove(x.parentElement) : this.input.focus();
  }

  add(v, silent) {
    const text = label(v);
    if (!text || this.value.some(x => label(x) === text)) return;

    const t = h('span');
    t.className = 'badge';
    t.dataset.variant = 'secondary';
    t.textContent = text;
    if (v && typeof v === 'object') this.#data.set(t, v);

    if (!this.input.readOnly) {
      const x = h('button');
      x.type = 'button';
      x.ariaLabel = `Remove ${text}`;
      x.textContent = '×';
      t.appendChild(x);
      this.insertBefore(t, this.input);
      this.input.value = this.prev = '';
      this.input.list?.replaceChildren();
    } else {
      this.insertBefore(t, this.input);
    }

    if (!silent) this.emit('input', this.value);
  }

  remove(el) {
    if (!el) return;
    el.remove();
    this.emit('input', this.value);
  }

  get value() {
    return [...this.querySelectorAll('.badge')].map(t => this.#data.get(t) ?? t.firstChild.data);
  }

  set value(tags) {
    this.input ??= this.querySelector('input');
    this.querySelectorAll('.badge').forEach(b => b.remove());
    (Array.isArray(tags) ? tags : []).forEach(t => {
      if (typeof t === 'string') t.split(',').forEach(v => this.add(v, true));
      else this.add(t, true);
    });
  }
}

customElements.define('ot-taginput', OtTaginput);
