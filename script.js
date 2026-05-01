// script.js - Interactive features for Infinity Welding website

// Mobile menu toggle
function toggleMenu() {
    const nav = document.getElementById('main-nav');
    nav.classList.toggle('show');
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '' && href !== '#') {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
                // Close mobile menu if open
                const nav = document.getElementById('main-nav');
                if (nav.classList.contains('show')) {
                    nav.classList.remove('show');
                }
            }
        }
    });
});

// Contact form submission
const contactForm = document.getElementById('inquiry-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const message = document.getElementById('form-message');
        if (message) {
            message.style.display = 'block';
            message.textContent = 'Thank you for your inquiry! We will get back to you within 24 hours.';
            contactForm.reset();
            setTimeout(() => {
                message.style.display = 'none';
            }, 5000);
        }
    });
}

// Simple animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.feature-box, .product-card, .service-item, .stat, .metric').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
});

// Active navigation highlighting
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('nav a').forEach(link => {
    const linkHref = link.getAttribute('href');
    if (linkHref === currentPage) {
        link.style.color = '#ff6b35';
    }
});

// Print functionality (for document view)
function printPage() {
    window.print();
}

// Add print button to header if on production or financial pages
const printPages = ['production.html', 'financial.html', 'market.html'];
if (printPages.includes(currentPage)) {
    const headerContainer = document.querySelector('header .container');
    if (headerContainer && !document.querySelector('.print-btn')) {
        const printBtn = document.createElement('button');
        printBtn.textContent = '🖨️ Print';
        printBtn.className = 'print-btn';
        printBtn.style.cssText = 'background:#ff6b35; border:none; color:white; padding:5px 12px; border-radius:5px; cursor:pointer; margin-left:15px;';
        printBtn.onclick = printPage;
        const logoDiv = document.querySelector('.logo');
        if (logoDiv && logoDiv.parentNode === headerContainer) {
            logoDiv.after(printBtn);
        }
    }
}
