// ==========================================
// KHK DELTA CHAPTER - CUSTOM JAVASCRIPT
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    initializeScrollBehavior();
    initializeScrollToTopButton();
    initializeFormHandling();
    initializeNavigationHighlight();
    initializeIntersectionObserver();
});

// ==========================================
// SMOOTH SCROLL BEHAVIOR
// ==========================================

function initializeScrollBehavior() {
    // Handle smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.navbar-nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    const navbar = new bootstrap.Collapse(navbarCollapse, {
                        toggle: true
                    });
                }
                
                // Scroll to target
                const offsetTop = targetSection.offsetTop - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ==========================================
// SCROLL TO TOP BUTTON
// ==========================================

function initializeScrollToTopButton() {
    // Create scroll to top button
    const scrollButton = document.createElement('button');
    scrollButton.className = 'scroll-to-top';
    scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollButton.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(scrollButton);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollButton.classList.add('show');
        } else {
            scrollButton.classList.remove('show');
        }
    });
    
    // Scroll to top on click
    scrollButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ==========================================
// FORM HANDLING
// ==========================================

function initializeFormHandling() {
    const newsletterForm = document.getElementById('newsletterForm');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            // Basic email validation
            if (isValidEmail(email)) {
                // Show success message
                showNotification('Thank you for subscribing!', 'success');
                
                // Reset form
                this.reset();
                
                // Here you would typically send the email to your backend
                console.log('Newsletter subscription:', email);
            } else {
                showNotification('Please enter a valid email address.', 'error');
            }
        });
    }
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification helper
function showNotification(message, type = 'info') {
    // Create alert element
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type === 'success' ? 'success' : 'danger'} alert-dismissible fade show`;
    alertDiv.setAttribute('role', 'alert');
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    
    // Insert at the top of the page
    const container = document.querySelector('.container');
    if (container) {
        container.parentElement.insertBefore(alertDiv, container);
    }
    
    // Auto-dismiss after 4 seconds
    setTimeout(() => {
        alertDiv.classList.remove('show');
        setTimeout(() => {
            alertDiv.remove();
        }, 150);
    }, 4000);
}

// ==========================================
// NAVIGATION HIGHLIGHT ON SCROLL
// ==========================================

function initializeNavigationHighlight() {
    window.addEventListener('scroll', updateActiveNavLink);
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    // Update active nav links
    document.querySelectorAll('.navbar-nav a[href^="#"]').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// ==========================================
// INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS
// ==========================================

function initializeIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all cards and images
    document.querySelectorAll('.event-card, .gallery-item, .member-stat, .about-section img').forEach(el => {
        observer.observe(el);
    });
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

// Format phone number (if needed elsewhere)
function formatPhoneNumber(phoneNumber) {
    const cleaned = phoneNumber.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return phoneNumber;
}

// Copy to clipboard utility
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('Copied to clipboard!', 'success');
    }).catch(() => {
        showNotification('Failed to copy to clipboard.', 'error');
    });
}

// ==========================================
// ENHANCE EXTERNAL LINKS
// ==========================================

document.querySelectorAll('a[href^="http"]').forEach(link => {
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
});

// ==========================================
// ACCESSIBILITY ENHANCEMENTS
// ==========================================

// Add focus visible styles for keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-nav');
});

// ==========================================
// CONSOLE MESSAGE
// ==========================================

console.log('%cWelcome to KHK Delta Chapter website!', 'color: #c41e3a; font-size: 16px; font-weight: bold;');
console.log('%cKappa Eta Kappa - University of Wisconsin-Madison', 'color: #1e3a5f; font-size: 12px;');
