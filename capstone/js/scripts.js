// Hamburger Menu Toggle
const hb = document.querySelector('#hamburgerBtn');
const pw = document.querySelector('#pageWrapper');

hb.addEventListener('click', () => {
    pw.classList.toggle('moveOver');
});

// Close menu when clicking a navigation link
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        pw.classList.remove('moveOver');
    });
});

// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();
