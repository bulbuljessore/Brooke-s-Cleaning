// <ba-slider before="url" after="url" start="50" labels="1"> before/after drag slider
(function () {
  if (customElements.get('ba-slider')) return;
  class BASlider extends HTMLElement {
    connectedCallback() {
      if (this._init) return; this._init = true;
      const before = this.getAttribute('before') || '';
      const after = this.getAttribute('after') || '';
      const start = Math.min(92, Math.max(8, parseFloat(this.getAttribute('start')) || 50));
      const labels = this.getAttribute('labels') !== '0';
      const sh = this.attachShadow({ mode: 'open' });
      sh.innerHTML = `
<style>
:host{display:block;position:relative;touch-action:pan-y;user-select:none;-webkit-user-select:none}
.wrap{position:absolute;inset:0;overflow:hidden;background:#111}
img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block;pointer-events:none}
.before{clip-path:inset(0 calc(100% - var(--p)) 0 0)}
.bar{position:absolute;top:0;bottom:0;left:var(--p);width:2px;background:#fff;transform:translateX(-1px);box-shadow:0 0 8px rgba(0,0,0,.45)}
.knob{position:absolute;top:50%;left:var(--p);transform:translate(-50%,-50%);width:38px;height:38px;border-radius:50%;background:#fff;display:flex;align-items:center;justify-content:center;gap:3px;box-shadow:0 2px 10px rgba(0,0,0,.35);cursor:ew-resize;font:600 13px/1 sans-serif;color:#123437}
.wrap.idle .knob{animation:ba-pulse 2.4s ease-out infinite}
@keyframes ba-pulse{0%,100%{box-shadow:0 2px 10px rgba(0,0,0,.35),0 0 0 0 rgba(255,255,255,.55)}45%{box-shadow:0 2px 10px rgba(0,0,0,.35),0 0 0 12px rgba(255,255,255,0)}}
.lab{position:absolute;bottom:12px;font:600 11px/1 sans-serif;letter-spacing:.14em;color:#fff;background:rgba(12,38,40,.85);padding:7px 11px}
.lab.a{right:12px}.lab.b{left:12px}
@media (max-width:620px){
  .knob{width:46px;height:46px;font-size:14px}
  .lab{font-size:10px;padding:6px 9px;bottom:10px}
  .lab.a{right:10px}.lab.b{left:10px}
}
</style>
<div class="wrap idle" style="--p:${start}%">
<img class="after" src="${after}" alt="after">
<img class="before" src="${before}" alt="before">
<div class="bar"></div>
<div class="knob">&#9664;&#9654;</div>
${labels ? '<div class="lab b">BEFORE</div><div class="lab a">AFTER</div>' : ''}
</div>`;
      const wrap = sh.querySelector('.wrap');
      const move = (x) => {
        const r = this.getBoundingClientRect();
        const p = Math.min(96, Math.max(4, ((x - r.left) / r.width) * 100));
        wrap.style.setProperty('--p', p + '%');
      };
      let drag = false;
      this.addEventListener('pointerdown', (e) => { drag = true; wrap.classList.remove('idle'); this.setPointerCapture(e.pointerId); move(e.clientX); });
      this.addEventListener('pointermove', (e) => { if (drag) move(e.clientX); });
      this.addEventListener('pointerup', () => { drag = false; });
      this.addEventListener('pointercancel', () => { drag = false; });
    }
  }
  customElements.define('ba-slider', BASlider);
})();
