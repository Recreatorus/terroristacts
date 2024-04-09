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
    let r = 'timeline__item-body--expanded',
      n = { duration: 300, easing: 'cubic-bezier(0.65,0,0.35,1)' };
    a
      ? ((e.ariaExpanded = 'false'),
        (t.ariaHidden = 'true'),
        t.classList.remove(r),
        (n.duration *= 2),
        (this.animation = t.animate([{ height: `${i}px` }, { height: `${i}px` }, { height: '0px' }], n)))
      : ((e.ariaExpanded = 'true'),
        (t.ariaHidden = 'false'),
        t.classList.add(r),
        (this.animation = t.animate([{ height: '0px' }, { height: `${i}px` }], n)));
  }
  itemAction(e) {
    let { target: t } = e,
      i = t?.getAttribute('data-action'),
      a = t?.getAttribute('data-item');
    if (i) {
      let r = Array.from(this.el?.querySelectorAll(`[aria-expanded="${'expand' === i ? 'false' : 'true'}"]`)),
        n = 'collapse' === i;
      for (let l of r) {
        let s = l.getAttribute('data-item'),
          d = this.el?.querySelector(`#item${s}-ctrld`),
          o = d.firstElementChild?.offsetHeight;
        this.animateItemAction(l, d, o, n);
      }
    } else if (a) {
      let c = this.el?.querySelector(`[data-item="${a}"]`),
        h = c?.getAttribute('aria-expanded');
      if (!h) return;
      let m = this.el?.querySelector(`#item${a}-ctrld`),
        u = m.firstElementChild?.offsetHeight;
      this.animateItemAction(c, m, u, 'true' === h);
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
const btn = document.querySelector('#sharebutton');
btn.addEventListener('click', () => {
  navigator.share
    ? navigator
        .share({
          title: 'Теракты в России',
          text: 'Крупнейшие теракты с 2000 года',
          url: 'https://recreatorus.github.io/terroristacts/index.html',
        })
        .then(() => console.log('Контент успешно обменен'))
        .catch((e) => console.error('Ошибка обмена контентом:', e))
    : console.log('Web Share API не поддерживается в данном браузере');
});
