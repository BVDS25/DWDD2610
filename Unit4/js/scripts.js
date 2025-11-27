// Hamburger menu toggle
const hamburgerBtn = document.getElementById('hamburgerBtn');
const navMenu = document.querySelector('nav ul');

hamburgerBtn.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    hamburgerBtn.classList.toggle('open');
});
