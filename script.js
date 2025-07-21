// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.project-card, .timeline-item, .skill-category');
    animateElements.forEach(el => observer.observe(el));
});

// FIXED: Fade-in animation instead of typing animation to preserve HTML
function fadeInTitle(element, delay = 500, duration = 1000) {
    if (!element) return;
    
    // Set initial state
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = `all ${duration}ms ease`;
    
    // Trigger animation after delay
    setTimeout(() => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    }, delay);
}

// Initialize hero title animation when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    fadeInTitle(heroTitle, 500, 1200);
});

// Parallax effect for floating elements
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.float-element');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    if (!element) return;
    
    let start = 0;
    const increment = target / (duration / 16);
    const suffix = element.textContent.replace(/[0-9]/g, ''); // Preserve % or + signs
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + suffix;
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + suffix;
        }
    }
    updateCounter();
}

// Initialize counter animations when stats come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                const target = parseInt(text);
                if (!isNaN(target)) {
                    animateCounter(stat, target);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        statsObserver.observe(heroStats);
    }
});

// Project card hover effects
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
});

// Dynamic neural network connections
function createConnections() {
    const neuralNetwork = document.querySelector('.neural-network');
    const nodes = document.querySelectorAll('.node');
    
    if (!neuralNetwork || nodes.length === 0) return;
    
    // Remove existing connections
    const existingConnections = neuralNetwork.querySelectorAll('.connection');
    existingConnections.forEach(conn => conn.remove());
    
    // Create new connections between nodes
    for (let i = 0; i < nodes.length - 1; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            // Skip some connections to avoid overcrowding
            if (Math.random() > 0.4) continue;
            
            const connection = document.createElement('div');
            connection.className = 'connection';
            
            const node1 = nodes[i];
            const node2 = nodes[j];
            
            // Get positions relative to the neural network container
            const networkRect = neuralNetwork.getBoundingClientRect();
            const node1Rect = node1.getBoundingClientRect();
            const node2Rect = node2.getBoundingClientRect();
            
            const x1 = node1Rect.left - networkRect.left + node1Rect.width / 2;
            const y1 = node1Rect.top - networkRect.top + node1Rect.height / 2;
            const x2 = node2Rect.left - networkRect.left + node2Rect.width / 2;
            const y2 = node2Rect.top - networkRect.top + node2Rect.height / 2;
            
            const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
            const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
            
            connection.style.position = 'absolute';
            connection.style.left = x1 + 'px';
            connection.style.top = y1 + 'px';
            connection.style.width = length + 'px';
            connection.style.height = '1px';
            connection.style.background = 'linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.3), transparent)';
            connection.style.transformOrigin = '0 0';
            connection.style.transform = `rotate(${angle}deg)`;
            connection.style.animation = `pulse 3s infinite ${Math.random() * 2}s`;
            connection.style.zIndex = '1';
            
            neuralNetwork.appendChild(connection);
        }
    }
}

// Initialize neural network connections with delay
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        createConnections();
    }, 1500);
});

// Recreate connections on window resize
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        createConnections();
    }, 250);
});

// Form validation function (for future use)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Theme toggle function (optional feature)
function toggleTheme() {
    document.body.classList.toggle('light-theme');
    const theme = document.body.classList.contains('light-theme') ? 'light' : 'dark';
    localStorage.setItem('theme', theme);
}

// Load saved theme preference
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
    }
});

// Lazy loading for images
function lazyLoad() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', lazyLoad);

// Scroll progress indicator
function updateScrollProgress() {
    const scrollProgress = document.querySelector('.scroll-progress');
    if (!scrollProgress) return;
    
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    scrollProgress.style.width = scrollPercent + '%';
}

// Performance optimization: Throttle function
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Throttled scroll handler
const throttledScrollHandler = throttle(() => {
    updateScrollProgress();
}, 16); // ~60fps

window.addEventListener('scroll', throttledScrollHandler);

// Smooth reveal animation for sections
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const elementTop = reveal.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            reveal.classList.add('active');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);

// Add click effects to buttons
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Enhanced error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
});

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
        }, 0);
    });
}

// Accessibility improvements
document.addEventListener('DOMContentLoaded', () => {
    // Add keyboard navigation for mobile menu
    const hamburger = document.querySelector('.hamburger');
    if (hamburger) {
        hamburger.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                hamburger.click();
            }
        });
    }
    
    // Add focus indicators for better accessibility
    const focusableElements = document.querySelectorAll('a, button, input, textarea, select');
    focusableElements.forEach(el => {
        el.addEventListener('focus', () => {
            el.style.outline = '2px solid var(--primary-color)';
            el.style.outlineOffset = '2px';
        });
        
        el.addEventListener('blur', () => {
            el.style.outline = '';
            el.style.outlineOffset = '';
        });
    });
});

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio website initialized successfully!');
    
    // Add any additional initialization code here
    
    // Preload critical animations
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});
