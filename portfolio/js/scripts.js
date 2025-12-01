// Navigation active state on scroll using Intersection Observer
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a');

    // Intersection Observer setup
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

    // Observe each section
    sections.forEach(item => {
        myObserver.observe(item);
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
