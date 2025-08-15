// =====================================================
// Modern interactions for officePro Education
// =====================================================

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (!href || href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    window.scrollTo({ top: target.offsetTop - 70, behavior: 'smooth' });
  });
});

// Navbar drawer & toggle
const navToggle = document.getElementById('navToggle');
const drawer = document.getElementById('drawer');
const drawerOverlay = document.getElementById('drawerOverlay');

function openDrawer(){
  drawer.classList.add('open');
  drawerOverlay.classList.add('show');
  navToggle.classList.add('active');
  navToggle.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}
function closeDrawer(){
  drawer.classList.remove('open');
  drawerOverlay.classList.remove('show');
  navToggle.classList.remove('active');
  navToggle.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

if (navToggle){
  navToggle.addEventListener('click', () => {
    if (drawer.classList.contains('open')) closeDrawer(); else openDrawer();
  });
}
if (drawerOverlay){
  drawerOverlay.addEventListener('click', closeDrawer);
}
document.querySelectorAll('.drawer-link').forEach(l => l.addEventListener('click', closeDrawer));

// Reveal on scroll
const reveals = document.querySelectorAll('.reveal');
const io = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting){
      entry.target.classList.add('is-visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: .15 });
reveals.forEach(el => io.observe(el));

// Expand hidden cards
const expandBtn = document.getElementById('expandBtn');
const hidden = document.querySelectorAll('.hidden-card');
let expanded = false;
if (expandBtn){
  expandBtn.addEventListener('click', () => {
    expanded = !expanded;
    hidden.forEach((c, i) => {
      setTimeout(() => c.classList.toggle('show', expanded), i * 120);
    });
    expandBtn.querySelector('span').textContent = expanded ? ' Show Less' : ' Show All Contents';
    expandBtn.querySelector('i')?.classList.toggle('fa-chevron-up', expanded);
    expandBtn.querySelector('i')?.classList.toggle('fa-chevron-down', !expanded);
  });
}

// Simple 3D tilt on cards (no library)
const tiltGroups = document.querySelectorAll('[data-tilt-group]');
tiltGroups.forEach(group => {
  group.addEventListener('mousemove', (e) => {
    const cards = group.querySelectorAll('.card');
    cards.forEach(card => {
      const r = card.getBoundingClientRect();
      const x = e.clientX - r.left; // x within card
      const y = e.clientY - r.top;  // y within card
      const rx = ((y / r.height) - 0.5) * -6;
      const ry = ((x / r.width) - 0.5) * 6;
      card.style.transform = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
    });
  });
  group.addEventListener('mouseleave', () => {
    group.querySelectorAll('.card').forEach(card => {
      card.style.transform = '';
    });
  });
});

// Floating hero cards animation (gentle up/down)
document.querySelectorAll('.floating').forEach((el, i) => {
  el.animate(
    [
      { transform: 'translateY(0px)' },
      { transform: 'translateY(-8px)' },
      { transform: 'translateY(0px)' }
    ],
    { duration: 3500 + i*300, iterations: Infinity }
  );
});
