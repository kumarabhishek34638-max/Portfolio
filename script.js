const body = document.body;
const nav = document.querySelector('nav');
const menu = document.querySelector('.menu-button');
const toggles = document.querySelectorAll('.theme-toggle');

const saved = localStorage.getItem('abhishek-theme');
if (saved === 'dark' || (!saved && matchMedia('(prefers-color-scheme: dark)').matches)) body.classList.add('dark');

toggles.forEach(toggle => toggle.addEventListener('click', () => {
  body.classList.toggle('dark');
  localStorage.setItem('abhishek-theme', body.classList.contains('dark') ? 'dark' : 'light');
}));

menu.addEventListener('click', () => {
  nav.classList.toggle('open');
  menu.setAttribute('aria-expanded', nav.classList.contains('open'));
});
document.querySelectorAll('nav a').forEach(link => link.addEventListener('click', () => { nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); }));

const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('show'); }), {threshold:.14});
document.querySelectorAll('.reveal').forEach(item => observer.observe(item));

const sections = document.querySelectorAll('main section');
const links = document.querySelectorAll('nav a');
new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) links.forEach(link => link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id)); }), {rootMargin:'-40% 0px -50%'}).observe(sections[0]);
sections.forEach(section => new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) links.forEach(link => link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id)); }), {rootMargin:'-40% 0px -50%'}).observe(section));
