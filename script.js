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
    let l = 'timeline__item-body--expanded',
      n = { duration: 300, easing: 'cubic-bezier(0.65,0,0.35,1)' };
    a
      ? ((e.ariaExpanded = 'false'),
        (t.ariaHidden = 'true'),
        t.classList.remove(l),
        (n.duration *= 2),
        (this.animation = t.animate([{ height: `${i}px` }, { height: `${i}px` }, { height: '0px' }], n)))
      : ((e.ariaExpanded = 'true'),
        (t.ariaHidden = 'false'),
        t.classList.add(l),
        (this.animation = t.animate([{ height: '0px' }, { height: `${i}px` }], n)));
  }
  itemAction(e) {
    let { target: t } = e,
      i = t?.getAttribute('data-action'),
      a = t?.getAttribute('data-item');
    if (i) {
      let l = Array.from(this.el?.querySelectorAll(`[aria-expanded="${'expand' === i ? 'false' : 'true'}"]`)),
        n = 'collapse' === i;
      for (let r of l) {
        let s = r.getAttribute('data-item'),
          d = this.el?.querySelector(`#item${s}-ctrld`),
          o = d.firstElementChild?.offsetHeight;
        this.animateItemAction(r, d, o, n);
      }
    } else if (a) {
      let h = this.el?.querySelector(`[data-item="${a}"]`),
        m = h?.getAttribute('aria-expanded');
      if (!m) return;
      let c = this.el?.querySelector(`#item${a}-ctrld`),
        u = c.firstElementChild?.offsetHeight;
      this.animateItemAction(h, c, u, 'true' === m);
    }
  }
}
