// PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  });
}

// Nav scroll
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// Mobile menu
const toggle = document.getElementById('navToggle');
const menu = document.getElementById('mobileMenu');

toggle.addEventListener('click', () => {
  toggle.classList.toggle('active');
  menu.classList.toggle('active');
  document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
});

menu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    toggle.classList.remove('active');
    menu.classList.remove('active');
    document.body.style.overflow = '';
  });
});

// Mobile bar — show after scrolling past hero
const mobileBar = document.getElementById('mobileBar');
if (mobileBar) {
  const hero = document.querySelector('.hero');
  if (hero) {
    const obs = new IntersectionObserver(([e]) => {
      mobileBar.style.transform = e.isIntersecting ? 'translateY(100%)' : 'translateY(0)';
    }, { threshold: 0.05 });
    obs.observe(hero);
  }
}

// Scroll reveal
const reveals = document.querySelectorAll('.svc, .price-card, .gallery-item, .af, .faq-item, .metric');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 60);
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
reveals.forEach(el => { el.classList.add('reveal'); revealObs.observe(el); });

// Contact form
document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = e.target.querySelector('button');
  const orig = btn.textContent;
  btn.textContent = 'Sent!';
  btn.style.background = '#22c55e';
  btn.disabled = true;
  setTimeout(() => { btn.textContent = orig; btn.style.background = ''; btn.disabled = false; e.target.reset(); }, 2500);
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    e.preventDefault();
    const t = document.querySelector(a.getAttribute('href'));
    if (t) t.scrollIntoView({ behavior: 'smooth' });
  });
});
