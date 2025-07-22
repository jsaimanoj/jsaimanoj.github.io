// Advanced Neural Network Animation
class NeuralNetwork {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.nodes = [];
        this.connections = [];
        this.pulses = [];
        this.mouse = { x: 0, y: 0 };
        
        this.resize();
        this.createNodes();
        this.createConnections();
        this.animate();
        
        // Mouse interaction
        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouse.x = e.clientX - rect.left;
            this.mouse.y = e.clientY - rect.top;
        });
        
        window.addEventListener('resize', () => this.resize());
    }
    
    resize() {
        const rect = this.canvas.getBoundingClientRect();
        this.canvas.width = rect.width * window.devicePixelRatio;
        this.canvas.height = rect.height * window.devicePixelRatio;
        this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        this.canvas.style.width = rect.width + 'px';
        this.canvas.style.height = rect.height + 'px';
        
        this.width = rect.width;
        this.height = rect.height;
    }
    
    createNodes() {
        this.nodes = [];
        const nodeCount = Math.floor((this.width * this.height) / 15000);
        
        for (let i = 0; i < nodeCount; i++) {
            this.nodes.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 3 + 1,
                brightness: Math.random() * 0.8 + 0.2,
                pulsePhase: Math.random() * Math.PI * 2,
                connections: []
            });
        }
    }
    
    createConnections() {
        this.connections = [];
        const maxDistance = 120;
        
        for (let i = 0; i < this.nodes.length; i++) {
            for (let j = i + 1; j < this.nodes.length; j++) {
                const dx = this.nodes[i].x - this.nodes[j].x;
                const dy = this.nodes[i].y - this.nodes[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < maxDistance) {
                    this.connections.push({
                        from: i,
                        to: j,
                        distance: distance,
                        strength: 1 - (distance / maxDistance),
                        pulseTime: Math.random() * 1000
                    });
                    
                    this.nodes[i].connections.push(j);
                    this.nodes[j].connections.push(i);
                }
            }
        }
    }
    
    createPulse(fromIndex, toIndex) {
        this.pulses.push({
            from: fromIndex,
            to: toIndex,
            progress: 0,
            speed: 0.02 + Math.random() * 0.03,
            intensity: Math.random() * 0.8 + 0.2,
            color: `hsl(${220 + Math.random() * 60}, 70%, 60%)`
        });
    }
    
    updateNodes() {
        this.nodes.forEach((node, index) => {
            // Gentle movement
            node.x += node.vx;
            node.y += node.vy;
            
            // Boundary bounce
            if (node.x < 0 || node.x > this.width) node.vx *= -1;
            if (node.y < 0 || node.y > this.height) node.vy *= -1;
            
            // Keep in bounds
            node.x = Math.max(0, Math.min(this.width, node.x));
            node.y = Math.max(0, Math.min(this.height, node.y));
            
            // Mouse interaction
            const mouseDistance = Math.sqrt(
                (node.x - this.mouse.x) ** 2 + (node.y - this.mouse.y) ** 2
            );
            
            if (mouseDistance < 100) {
                node.brightness = Math.min(1, node.brightness + 0.02);
                
                // Trigger pulses from nearby nodes
                if (Math.random() < 0.1 && node.connections.length > 0) {
                    const targetIndex = node.connections[
                        Math.floor(Math.random() * node.connections.length)
                    ];
                    this.createPulse(index, targetIndex);
                }
            } else {
                node.brightness = Math.max(0.2, node.brightness - 0.01);
            }
            
            // Natural pulsing
            node.pulsePhase += 0.02;
            
            // Random pulse generation
            if (Math.random() < 0.002 && node.connections.length > 0) {
                const targetIndex = node.connections[
                    Math.floor(Math.random() * node.connections.length)
                ];
                this.createPulse(index, targetIndex);
            }
        });
    }
    
    updatePulses() {
        this.pulses = this.pulses.filter(pulse => {
            pulse.progress += pulse.speed;
            return pulse.progress < 1;
        });
    }
    
    drawConnections() {
        this.connections.forEach(conn => {
            const nodeA = this.nodes[conn.from];
            const nodeB = this.nodes[conn.to];
            
            this.ctx.beginPath();
            this.ctx.moveTo(nodeA.x, nodeA.y);
            this.ctx.lineTo(nodeB.x, nodeB.y);
            
            const opacity = conn.strength * 0.3;
            this.ctx.strokeStyle = `rgba(99, 102, 241, ${opacity})`;
            this.ctx.lineWidth = 0.5;
            this.ctx.stroke();
        });
    }
    
    drawNodes() {
        this.nodes.forEach(node => {
            // Main node
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            
            const pulseBrightness = node.brightness * (0.8 + 0.2 * Math.sin(node.pulsePhase));
            const gradient = this.ctx.createRadialGradient(
                node.x, node.y, 0,
                node.x, node.y, node.radius * 3
            );
            
            gradient.addColorStop(0, `rgba(139, 92, 246, ${pulseBrightness})`);
            gradient.addColorStop(0.5, `rgba(99, 102, 241, ${pulseBrightness * 0.5})`);
            gradient.addColorStop(1, 'rgba(99, 102, 241, 0)');
            
            this.ctx.fillStyle = gradient;
            this.ctx.fill();
            
            // Core
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, node.radius * 0.3, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(255, 255, 255, ${pulseBrightness})`;
            this.ctx.fill();
        });
    }
    
    drawPulses() {
        this.pulses.forEach(pulse => {
            const fromNode = this.nodes[pulse.from];
            const toNode = this.nodes[pulse.to];
            
            const x = fromNode.x + (toNode.x - fromNode.x) * pulse.progress;
            const y = fromNode.y + (toNode.y - fromNode.y) * pulse.progress;
            
            // Pulse glow
            const gradient = this.ctx.createRadialGradient(x, y, 0, x, y, 8);
            gradient.addColorStop(0, pulse.color);
            gradient.addColorStop(1, 'transparent');
            
            this.ctx.beginPath();
            this.ctx.arc(x, y, 4, 0, Math.PI * 2);
            this.ctx.fillStyle = gradient;
            this.ctx.fill();
            
            // Pulse trail
            this.ctx.beginPath();
            this.ctx.arc(x, y, 1, 0, Math.PI * 2);
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            this.ctx.fill();
        });
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        this.updateNodes();
        this.updatePulses();
        
        this.drawConnections();
        this.drawNodes();
        this.drawPulses();
        
        requestAnimationFrame(() => this.animate());
    }
}

// Smooth Scrolling
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

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.project-card, .timeline-item, .skill-category, .stat').forEach(el => {
    observer.observe(el);
});

// Counter Animation for Stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Animate counters when they come into view
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = parseInt(counter.textContent);
            
            if (!isNaN(target)) {
                counter.textContent = '0';
                animateCounter(counter, target);
            }
            
            counterObserver.unobserve(counter);
        }
    });
}, { threshold: 0.5 });

// Observe stat numbers
document.querySelectorAll('.stat-number').forEach(counter => {
    // Handle different formats (numbers with +, %, $, etc.)
    const text = counter.textContent;
    const number = parseInt(text.replace(/[^\d]/g, ''));
    
    if (!isNaN(number)) {
        counterObserver.observe(counter);
    }
});

// Animate skill bars when they come into view
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const width = skillBar.getAttribute('data-width');
                
                setTimeout(() => {
                    skillBar.style.width = width;
                }, 200);
                
                skillObserver.unobserve(skillBar);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => skillObserver.observe(bar));
}

// Typing Animation for Hero Title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Form Submission
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Simulate form submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.textContent = 'Message Sent!';
            submitBtn.style.background = '#10b981';
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
                contactForm.reset();
            }, 2000);
        }, 1000);
    });
}

// Particle Cursor Effect
let particles = [];

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.life = 1;
    }
    
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life -= 0.02;
        this.size *= 0.98;
    }
    
    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.life;
        ctx.fillStyle = '#6366f1';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

// Create cursor trail effect
document.addEventListener('mousemove', (e) => {
    if (Math.random() < 0.3) {
        particles.push(new Particle(e.clientX, e.clientY));
    }
});

// Animate particles
function animateParticles() {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '9999';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles = particles.filter(particle => {
            particle.update();
            particle.draw(ctx);
            return particle.life > 0;
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // Resize canvas on window resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Neural Network
    const canvas = document.getElementById('neuralCanvas');
    if (canvas) {
        new NeuralNetwork(canvas);
    }
    
    // Initialize skill bar animations
    animateSkillBars();
    
    // Initialize particle cursor effect
    animateParticles();
    
    // Hero title animation
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.style.opacity = '1';
        heroTitle.style.transform = 'translateY(0)';
        
        // Optional: Add typing effect
        // typeWriter(heroTitle, text, 50);
    }
    
    // Add loading animation
    document.body.classList.add('loaded');
});

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
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

// Throttled scroll handler
const throttledScrollHandler = throttle(() => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}, 100);

window.addEventListener('scroll', throttledScrollHandler);

// Add smooth reveal animations
const revealElements = document.querySelectorAll('.hero-content, .section-title, .about-text, .project-card');
revealElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    el.style.transitionDelay = `${index * 0.1}s`;
    
    setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
    }, 100);
});

// Add interactive hover effects for project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Easter egg: Konami code
let konamiCode = [];
const konami = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.keyCode);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konami.join(',')) {
        // Activate special neural network mode
        const canvas = document.getElementById('neuralCanvas');
        if (canvas) {
            canvas.style.opacity = '1';
            canvas.style.filter = 'hue-rotate(120deg) saturate(2)';
            
            setTimeout(() => {
                canvas.style.opacity = '0.6';
                canvas.style.filter = '';
            }, 5000);
        }
    }
});
