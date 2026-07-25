// Scroll-reveal micro-animations: add data-reveal (+ optional data-reveal-delay="ms") to any element.
(function () {
  const EASE = 'cubic-bezier(.2,.65,.25,1)';
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      const el = e.target;
      if (!e.isIntersecting) {
        // first callback, below viewport: hide it so it can animate in later
        if (!el._armed) {
          el._armed = true;
          el.style.opacity = '0';
          el.style.transform = 'translateY(28px)';
          el.style.transition = `opacity .8s ${EASE}, transform .8s ${EASE}`;
        }
        return;
      }
      if (el._armed) {
        el.style.transitionDelay = (el.getAttribute('data-reveal-delay') || '0') + 'ms';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0px)';
      }
      io.unobserve(el); // already visible on first check → leave untouched
    });
  }, { threshold: 0.15 });
  function prep(el) {
    if (el._rv) return; el._rv = true;
    io.observe(el);
  }
  const scan = () => document.querySelectorAll('[data-reveal]').forEach(prep);
  const start = () => { scan(); new MutationObserver(scan).observe(document.body, { subtree: true, childList: true }); };
  document.body ? start() : document.addEventListener('DOMContentLoaded', start);
})();
