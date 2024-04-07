window.addEventListener('DOMContentLoaded', () => {
  new CollapsibleTimeline('#timeline');
});
class CollapsibleTimeline {
  constructor(e) {
    (this.el = document.querySelector(e)), this.init();
  }
  init() {
    this.el?.addEventListener('click', this.itemAction.bind(this));
  }
  animateItemAction(e, t, i, a) {
    let n = 'timeline__item-body--expanded',
      l = { duration: 300, easing: 'cubic-bezier(0.65,0,0.35,1)' };
    a
      ? ((e.ariaExpanded = 'false'),
        (t.ariaHidden = 'true'),
        t.classList.remove(n),
        (l.duration *= 2),
        (this.animation = t.animate([{ height: `${i}px` }, { height: `${i}px` }, { height: '0px' }], l)))
      : ((e.ariaExpanded = 'true'),
        (t.ariaHidden = 'false'),
        t.classList.add(n),
        (this.animation = t.animate([{ height: '0px' }, { height: `${i}px` }], l)));
  }
  itemAction(e) {
    let { target: t } = e,
      i = t?.getAttribute('data-action'),
      a = t?.getAttribute('data-item');
    if (i) {
      let n = Array.from(this.el?.querySelectorAll(`[aria-expanded="${'expand' === i ? 'false' : 'true'}"]`)),
        l = 'collapse' === i;
      for (let r of n) {
        let d = r.getAttribute('data-item'),
          s = this.el?.querySelector(`#item${d}-ctrld`),
          o = s.firstElementChild?.offsetHeight;
        this.animateItemAction(r, s, o, l);
      }
    } else if (a) {
      let m = this.el?.querySelector(`[data-item="${a}"]`),
        c = m?.getAttribute('aria-expanded');
      if (!c) return;
      let h = this.el?.querySelector(`#item${a}-ctrld`),
        u = h.firstElementChild?.offsetHeight;
      this.animateItemAction(m, h, u, 'true' === c);
    }
  }
}
const runColorMode = (e) => {
  if (!window.matchMedia) return;
  let t = window.matchMedia('(prefers-color-scheme: dark)');
  e(t.matches), t.addEventListener('change', (t) => e(t.matches));
};
runColorMode((e) => {
  e ? document.documentElement.classList.add('dark-mode') : document.documentElement.classList.remove('dark-mode');
});
