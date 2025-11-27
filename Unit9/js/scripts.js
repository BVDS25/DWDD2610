// Navigation Toggle and Menu Management
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');
const navItem = document.querySelector('.nav-item.has-submenu');
const submenu = document.querySelector('.submenu');
const submenuLink = document.querySelector('.nav-item.has-submenu > a');

// Toggle mobile navigation
if (navToggle) {
  navToggle.addEventListener('click', () => {
    const isOpen = nav.classList.contains('open');
    nav.classList.toggle('open');
    navToggle.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', !isOpen);
  });
}

// Handle submenu on small screens (click to toggle)
if (submenuLink && window.innerWidth < 600) {
  submenuLink.addEventListener('click', (e) => {
    if (window.innerWidth < 600) {
      e.preventDefault();
      submenu.classList.toggle('open');
      const isExpanded = submenu.classList.contains('open');
      submenuLink.setAttribute('aria-expanded', isExpanded);
    }
  });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (window.innerWidth < 600) {
    if (!e.target.closest('.site-header')) {
      nav.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  }
});

// Image Slider Functionality
const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.slider-prev');
const nextBtn = document.querySelector('.slider-next');
const dots = document.querySelectorAll('.slider-dots button');

let currentSlide = 0;
const totalSlides = slides.length;

// Update slider position
function updateSlider() {
  slider.style.transform = `translateX(-${currentSlide * 100}%)`;
  
  // Update dots
  dots.forEach((dot, index) => {
    if (index === currentSlide) {
      dot.classList.add('active');
      dot.setAttribute('aria-current', 'true');
    } else {
      dot.classList.remove('active');
      dot.removeAttribute('aria-current');
    }
  });
}

// Next slide
function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  updateSlider();
}

// Previous slide
function prevSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  updateSlider();
}

// Event listeners for slider controls
if (prevBtn) {
  prevBtn.addEventListener('click', prevSlide);
}

if (nextBtn) {
  nextBtn.addEventListener('click', nextSlide);
}

// Dot navigation
dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    currentSlide = index;
    updateSlider();
  });
});

// Auto-advance slider every 5 seconds
let autoSlideInterval = setInterval(nextSlide, 5000);

// Pause auto-slide on hover
const sliderContainer = document.querySelector('.slider-container');
if (sliderContainer) {
  sliderContainer.addEventListener('mouseenter', () => {
    clearInterval(autoSlideInterval);
  });

  sliderContainer.addEventListener('mouseleave', () => {
    autoSlideInterval = setInterval(nextSlide, 5000);
  });
}

// Keyboard navigation for slider
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') {
    prevSlide();
  } else if (e.key === 'ArrowRight') {
    nextSlide();
  }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && href !== '#home') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        // Close mobile menu after clicking link
        if (window.innerWidth < 600) {
          nav.classList.remove('open');
          navToggle.classList.remove('open');
          navToggle.setAttribute('aria-expanded', 'false');
        }
      }
    }
  });
});

// Update active navigation link on scroll
const sections = document.querySelectorAll('section[id], main');
const navLinks = document.querySelectorAll('.nav a[href^="#"]');

function updateActiveLink() {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.pageYOffset >= sectionTop - 100) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveLink);

// Handle window resize - reset menu states
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    if (window.innerWidth >= 600) {
      nav.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      submenu.classList.remove('open');
    }
  }, 250);
});
