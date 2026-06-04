document.documentElement.classList.add('js');

const masthead = document.getElementById('masthead');
const progress = document.getElementById('progress');
const docEl = document.documentElement;

function onScroll() {
  masthead.classList.toggle('scrolled', window.scrollY > 40);
  const max = docEl.scrollHeight - docEl.clientHeight;
  progress.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + '%';
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ---------- Mobile drawer ---------- */
const burger = document.getElementById('burger');
const drawer = document.getElementById('drawer');
burger.addEventListener('click', () => {
  const open = burger.classList.toggle('open');
  drawer.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
});
drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  burger.classList.remove('open');
  drawer.classList.remove('open');
  document.body.style.overflow = '';
}));

/* ---------- Copy email ---------- */
const EMAIL = 'kl.carcueva05@gmail.com';
const toast = document.getElementById('toast');
let toastTimer;
document.querySelectorAll('.copy-email').forEach(btn => {
  btn.addEventListener('click', () => {
    navigator.clipboard.writeText(EMAIL).then(() => {
      clearTimeout(toastTimer);
      toast.classList.add('show');
      toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
    });
  });
});

/* ---------- Scroll reveal ---------- */
const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const ro = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); ro.unobserve(e.target); }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
  reveals.forEach(el => ro.observe(el));
} else {
  reveals.forEach(el => el.classList.add('visible'));
}

/* ---------- Scroll-spy nav highlight ---------- */
const navLinks = Array.from(document.querySelectorAll('.nav a'));
const sections = navLinks
  .map(a => document.querySelector(a.getAttribute('href')))
  .filter(Boolean);
if ('IntersectionObserver' in window && sections.length) {
  const spy = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const id = '#' + e.target.id;
        navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === id));
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach(s => spy.observe(s));
}

/* ---------- Project mockup tilt (any device that can hover) ---------- */
const canHover = window.matchMedia('(any-hover: hover)').matches ||
                 window.matchMedia('(pointer: fine)').matches;

if (canHover) {
  document.querySelectorAll('.case-visual').forEach(stage => {
    const card = stage.querySelector('.browser, .phone');
    if (!card) return;
    const phone = card.classList.contains('phone');
    stage.addEventListener('mousemove', e => {
      const r = stage.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      card.style.transition = 'transform 0.1s ease-out';
      card.style.transform =
        `perspective(1100px) rotateY(${px * (phone ? 16 : 14)}deg) ` +
        `rotateX(${-py * 12}deg) translateY(-10px) scale(1.03)`;
    });
    stage.addEventListener('mouseleave', () => {
      card.style.transition = 'transform 0.55s ease';
      card.style.transform = '';
    });
  });
}