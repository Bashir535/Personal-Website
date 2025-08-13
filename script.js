const faders = document.querySelectorAll('.fade-in');
const appearObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('show');
    obs.unobserve(e.target);
  });
}, { threshold: 0.2 });
faders.forEach(el => appearObserver.observe(el));


const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => navLinks.classList.remove('open'))
  );
}


const progressBar = document.querySelector('.progress');
function updateProgress(){
  if (!progressBar) return;
  const scroll = window.scrollY;
  const height = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  const pct = Math.max(0, Math.min(1, scroll / height));
  progressBar.style.width = `${pct * 100}%`;
}
window.addEventListener('scroll', updateProgress);
updateProgress();


const links = document.querySelectorAll('.nav-link');
const sections = [...links]
  .map(l => document.querySelector(l.getAttribute('href')))
  .filter(Boolean);

const secObserver = new IntersectionObserver((entries) => {
  entries.forEach(({ target, isIntersecting }) => {
    if (!isIntersecting) return;
    links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${target.id}`));
  });
}, { threshold: 0.6 });
sections.forEach(s => secObserver.observe(s));
