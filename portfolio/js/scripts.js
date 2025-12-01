// Navigation active state on scroll using Intersection Observer
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a');
    const cards = document.querySelectorAll('.card');

    // Intersection Observer for navigation highlighting
    let observerOptions = {
        root: null, // viewport
        rootMargin: '0px 0px -50% 0px', // trigger when section is in upper half
        threshold: 0
    }

    const myObserver = new IntersectionObserver(allItems => {
        allItems.forEach(singleItem => {
            if (singleItem.isIntersecting) {
                hiliteNav(singleItem.target);
            }
        })
    }, observerOptions);

    // Function to highlight the current navigation item
    function hiliteNav(x) {
        const activeLink = document.querySelector('nav a.active');
        if (activeLink) {
            activeLink.classList.remove('active');
        }
        let theid = x.getAttribute('id');
        let newActiveLink = document.querySelector(`nav a[href="#${theid}"]`);
        if (newActiveLink) {
            newActiveLink.classList.add('active');
        }
    }

    // Observe each section for navigation
    sections.forEach(item => {
        myObserver.observe(item);
    });

    // Intersection Observer for section animations
    let animationOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    }

    const animationObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, animationOptions);

    // Observe sections for animations
    sections.forEach(section => {
        animationObserver.observe(section);
    });

    // Intersection Observer for card animations with stagger
    let cardOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    }

    const cardObserver = new IntersectionObserver(entries => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger animation for cards
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
            }
        });
    }, cardOptions);

    // Observe cards for animations
    cards.forEach(card => {
        cardObserver.observe(card);
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Form submission handler
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // For now, just log the data (you can add actual form submission later)
            console.log('Form submitted:', data);
            
            // Show success message
            alert('Thank you for your message! I will get back to you soon.');
            
            // Reset form
            this.reset();
        });
    }
});
