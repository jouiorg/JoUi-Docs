import { OtBase } from '../../js/base.js';

class OtUpload extends OtBase {
  #input;
  #out;
  #empty;

  init() {
    this.#input = this.querySelector('input[type="file"]');
    if (!this.#input) return;

    this.#out   = this.querySelector('[data-files]');
    this.#empty = this.#out ? [...this.#out.childNodes] : [];

    this.classList.add('card', 'vstack', 'align-center');
    this.#out?.classList.add('hstack', 'justify-center');

    for (const e of ['click', 'dragover', 'dragleave', 'drop', 'change']) this.addEventListener(e, this);
  }

  onclick(e) {
    if (this.#input.disabled) return;
    const x = e.target.closest('button');
    if (x && this.#out?.contains(x)) {
      return this.#set([...this.#input.files].filter((_, i) => i !== [...this.#out.children].indexOf(x.parentElement)));
    }
    if (e.target !== this.#input) this.#input.click();
  }

  ondragover(e) {
    if (this.#input.disabled) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    this.toggleAttribute('data-drag', true);
  }

  ondragleave(e) {
    if (!this.contains(e.relatedTarget)) this.removeAttribute('data-drag');
  }

  ondrop(e) {
    if (this.#input.disabled) return;
    e.preventDefault();
    this.removeAttribute('data-drag');
    this.#set([...e.dataTransfer.files].slice(0, this.#input.multiple ? Infinity : 1));
  }

  onchange() {
    if (!this.#out) return;
    const badges = [...this.#input.files].map(f => {
      const b = document.createElement('span');
      b.className = 'badge';
      b.dataset.variant = 'secondary';
      b.textContent = f.name;
      const x = document.createElement('button');
      x.type = 'button';
      x.ariaLabel = `Remove ${f.name}`;
      x.textContent = '×';
      b.append(x);
      return b;
    });
    this.#out.replaceChildren(...(badges.length ? badges : this.#empty));
  }

  #set(files) {
    const dt = new DataTransfer();
    files.forEach(f => dt.items.add(f));
    this.#input.files = dt.files;
    this.#input.dispatchEvent(new Event('change', { bubbles: true }));
  }
}

customElements.define('ot-upload', OtUpload);
