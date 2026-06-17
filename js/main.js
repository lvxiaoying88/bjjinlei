/* ========================================
   Beijing Jinlei Technology - Main JavaScript
   Interactive Features and Animations
   ======================================== */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // Initialize all modules
    initPreloader();
    initNavigation();
    initMobileMenu();
    initScrollAnimations();
    initNavbarScroll();
    initSmoothScroll();
    initForms();
    initCounters();
});

/* ========================================
   Preloader
   ======================================== */
function initPreloader() {
    const preloader = document.getElementById('preloader');
    
    // Hide preloader after page loads
    window.addEventListener('load', function() {
        setTimeout(function() {
            preloader.classList.add('hidden');
            // Trigger animations after preloader is hidden
            triggerInitialAnimations();
        }, 800);
    });

    // Fallback: Hide preloader after 3 seconds max
    setTimeout(function() {
        preloader.classList.add('hidden');
        triggerInitialAnimations();
    }, 3000);
}

function triggerInitialAnimations() {
    // Add animated class to elements in hero section
    const heroElements = document.querySelectorAll('.hero .animate-on-scroll');
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('animated');
        }, index * 150);
    });
}

/* ========================================
   Navigation
   ======================================== */
function initNavigation() {
    const navMenu = document.getElementById('navMenu');
    
    // Add active class to current page link
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = navMenu.querySelectorAll('a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html') ||
            (currentPage === '/' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
}

/* ========================================
   Mobile Menu
   ======================================== */
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    const mobileMenuLinks = mobileMenuOverlay.querySelectorAll('a');
    
    // Toggle mobile menu
    menuToggle.addEventListener('click', function() {
        mobileMenuOverlay.classList.toggle('active');
        document.body.style.overflow = mobileMenuOverlay.classList.contains('active') ? 'hidden' : '';
        
        // Animate hamburger to X
        const menuLines = menuToggle.querySelectorAll('.menu-line');
        if (mobileMenuOverlay.classList.contains('active')) {
            menuLines[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            menuLines[1].style.opacity = '0';
            menuLines[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            menuLines[0].style.transform = '';
            menuLines[1].style.opacity = '';
            menuLines[2].style.transform = '';
        }
    });

    // Close mobile menu when clicking a link
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenuOverlay.classList.remove('active');
            document.body.style.overflow = '';
            
            // Reset hamburger
            const menuLines = menuToggle.querySelectorAll('.menu-line');
            menuLines[0].style.transform = '';
            menuLines[1].style.opacity = '';
            menuLines[2].style.transform = '';
        });
    });

    // Close mobile menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenuOverlay.classList.contains('active')) {
            mobileMenuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

/* ========================================
   Scroll Animations
   ======================================== */
function initScrollAnimations() {
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    // Create intersection observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                // Optional: Stop observing after animation
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with animate-on-scroll class
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

/* ========================================
   Navbar Scroll Effect
   ======================================== */
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Add scrolled class when scrolling down
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
}

/* ========================================
   Smooth Scroll
   ======================================== */
function initSmoothScroll() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#" or empty
            if (href === '#' || href === '') return;
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                const navbarHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ========================================
   Form Handling
   ======================================== */
function initForms() {
    // Contact Form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }

    // Newsletter Form
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterForm);
    }
}

function handleContactForm(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<span>Sending...</span>';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        // Reset form
        form.reset();
        
        // Show success message
        submitBtn.innerHTML = '<span>Message Sent!</span>';
        submitBtn.style.background = '#27ae60';
        
        // Reset button after delay
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            submitBtn.style.background = '';
        }, 3000);
        
        // Show notification
        showNotification('Thank you! Your message has been sent successfully.', 'success');
    }, 1500);
}

function handleNewsletterForm(e) {
    e.preventDefault();
    
    const form = e.target;
    const input = form.querySelector('input[type="email"]');
    const submitBtn = form.querySelector('button[type="submit"]');
    
    if (!input.value) {
        showNotification('Please enter your email address.', 'error');
        return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(input.value)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<span>Subscribing...</span>';
    submitBtn.disabled = true;
    
    // Simulate subscription
    setTimeout(() => {
        form.reset();
        submitBtn.innerHTML = '<span>Subscribed!</span>';
        
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 3000);
        
        showNotification('Thank you for subscribing! You will receive our latest updates.', 'success');
    }, 1500);
}

function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 15px 25px;
        background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        border-radius: 10px;
        display: flex;
        align-items: center;
        gap: 15px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        box-shadow: 0 5px 20px rgba(0,0,0,0.3);
    `;
    
    // Add animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            opacity: 0.8;
        }
        .notification-close:hover { opacity: 1; }
    `;
    document.head.appendChild(style);
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Close button
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideIn 0.3s ease reverse';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

/* ========================================
   Counter Animation
   ======================================== */
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    if (counters.length === 0) return;
    
    // Check if element is in viewport
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target')) || parseInt(element.textContent);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += step;
        if (current < target) {
            element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : '') + 
                                  (element.textContent.includes('%') ? '%' : '') +
                                  (element.textContent.includes('/') ? '/' : '');
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = element.textContent;
        }
    };
    
    updateCounter();
}

/* ========================================
   Parallax Effect (Optional)
   ======================================== */
function initParallax() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax');
        
        parallaxElements.forEach(el => {
            const speed = 0.5;
            el.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

/* ========================================
   Back to Top Button (Optional)
   ======================================== */
function initBackToTop() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #00d4ff, #0099cc);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
        box-shadow: 0 5px 20px rgba(0, 212, 255, 0.3);
    `;
    
    document.body.appendChild(backToTopBtn);
    
    // Show/hide based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 500) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top on click
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* ========================================
   Utility Functions
   ======================================== */

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Check if device is touch-enabled
function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

// Get current page section
function getCurrentSection() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.pageYOffset + 200;
    
    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        
        if (scrollPos >= top && scrollPos < top + height) {
            // Update navigation if needed
            updateActiveNav(id);
        }
    });
}

function updateActiveNav(sectionId) {
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
        }
    });
}

/* ========================================
   Accessibility Enhancements
   ======================================== */

// Handle focus visibility
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-nav');
});

// Skip link functionality
const skipLink = document.createElement('a');
skipLink.href = '#main-content';
skipLink.textContent = 'Skip to main content';
skipLink.className = 'skip-link';
skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 0;
    background: #00d4ff;
    color: white;
    padding: 10px 20px;
    z-index: 10001;
    transition: top 0.3s;
`;
skipLink.addEventListener('focus', function() {
    this.style.top = '0';
});
skipLink.addEventListener('blur', function() {
    this.style.top = '-40px';
});

document.body.insertBefore(skipLink, document.body.firstChild);

/* ========================================
   Print Styles Helper
   ======================================== */
window.addEventListener('beforeprint', function() {
    // Hide preloader when printing
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.display = 'none';
    }
});

/* ========================================
   Page Visibility API
   ======================================== */
document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'visible') {
        // Page is visible - resume animations
        document.body.style.animationPlayState = 'running';
    } else {
        // Page is hidden - pause animations
        document.body.style.animationPlayState = 'paused';
    }
});

/* ========================================
   Export for potential module use
   ======================================== */
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        showNotification,
        debounce,
        throttle,
        isTouchDevice
    };
}
