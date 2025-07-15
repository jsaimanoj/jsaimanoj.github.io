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

// Mobile menu toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        this.classList.toggle('active');
    });
}

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

// Animated counter for hero stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start).toLocaleString();
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString();
        }
    }
    updateCounter();
}

// Initialize counters when hero section is visible
const heroSection = document.querySelector('.hero');
if (heroSection) {
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                document.querySelectorAll('.stat-number').forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-target'));
                    animateCounter(counter, target);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(heroSection);
}

// Hero Chart - Real-time Data Visualization
function createHeroChart() {
    const ctx = document.getElementById('heroChart');
    if (!ctx) return;

    // Generate sample real-time data
    const generateData = () => {
        return Array.from({length: 20}, (_, i) => ({
            x: i,
            y: Math.sin(i * 0.5) * 50 + Math.random() * 20 + 100
        }));
    };

    new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [{
                label: 'Model Performance',
                data: generateData(),
                borderColor: '#fff',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#fff',
                pointBorderColor: '#667eea',
                pointRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: '#fff'
                    }
                }
            },
            scales: {
                x: {
                    type: 'linear',
                    ticks: { color: '#fff' },
                    grid: { color: 'rgba(255, 255, 255, 0.2)' }
                },
                y: {
                    ticks: { color: '#fff' },
                    grid: { color: 'rgba(255, 255, 255, 0.2)' }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart'
            }
        }
    });
}

// Box Plot Visualization
function createBoxPlot() {
    const ctx = document.getElementById('boxPlot');
    if (!ctx) return;

    // Simulated box plot data
    const data = {
        labels: ['Feature A', 'Feature B', 'Feature C', 'Feature D'],
        datasets: [{
            label: 'Q1',
            data: [20, 25, 30, 22],
            backgroundColor: 'rgba(102, 126, 234, 0.3)',
            borderColor: '#667eea',
            borderWidth: 2
        }, {
            label: 'Median',
            data: [35, 40, 45, 38],
            backgroundColor: 'rgba(118, 75, 162, 0.5)',
            borderColor: '#764ba2',
            borderWidth: 2
        }, {
            label: 'Q3',
            data: [50, 55, 60, 52],
            backgroundColor: 'rgba(102, 126, 234, 0.7)',
            borderColor: '#667eea',
            borderWidth: 2
        }]
    };

    new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Feature Distribution Analysis'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Values'
                    }
                }
            }
        }
    });
}

// Scatter Plot for Correlation Analysis
function createScatterPlot() {
    const ctx = document.getElementById('scatterPlot');
    if (!ctx) return;

    // Generate correlated data
    const generateScatterData = (n = 50) => {
        return Array.from({length: n}, () => {
            const x = Math.random() * 100;
            const y = x * 0.8 + Math.random() * 20; // Positive correlation with noise
            return {x, y};
        });
    };

    new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Feature Correlation',
                data: generateScatterData(),
                backgroundColor: 'rgba(102, 126, 234, 0.6)',
                borderColor: '#667eea',
                pointRadius: 6,
                pointHoverRadius: 8
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Feature X vs Feature Y Correlation'
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Feature X'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Feature Y'
                    }
                }
            }
        }
    });
}

// Time Series Chart
function createTimeSeriesChart() {
    const ctx = document.getElementById('timeSeriesChart');
    if (!ctx) return;

    // Generate time series data
    const generateTimeSeriesData = () => {
        const data = [];
        const startDate = new Date('2023-01-01');
        
        for (let i = 0; i < 365; i++) {
            const date = new Date(startDate);
            date.setDate(date.getDate() + i);
            
            const trend = i * 0.1;
            const seasonal = Math.sin(i * 2 * Math.PI / 30) * 10;
            const noise = (Math.random() - 0.5) * 5;
            const value = 100 + trend + seasonal + noise;
            
            data.push({
                x: date,
                y: value
            });
        }
        return data;
    };

    new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [{
                label: 'Actual',
                data: generateTimeSeriesData(),
                borderColor: '#667eea',
                backgroundColor: 'rgba(102, 126, 234, 0.1)',
                fill: true,
                tension: 0.1
            }, {
                label: 'Forecast',
                data: generateTimeSeriesData().slice(-30).map(point => ({
                    x: point.x,
                    y: point.y + Math.random() * 10 - 5
                })),
                borderColor: '#764ba2',
                backgroundColor: 'rgba(118, 75, 162, 0.1)',
                borderDash: [5, 5]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Sales Forecasting Model'
                }
            },
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'month'
                    },
                    title: {
                        display: true,
                        text: 'Time'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Sales ($)'
                    }
                }
            }
        }
    });
}

// Heatmap using D3.js
function createHeatmap() {
    const container = document.getElementById('heatmap');
    if (!container) return;

    // Sample correlation matrix data
    const data = [
        {x: 0, y: 0, value: 1.0, feature1: 'Age', feature2: 'Age'},
        {x: 1, y: 0, value: 0.3, feature1: 'Income', feature2: 'Age'},
        {x: 2, y: 0, value: -0.1, feature1: 'Education', feature2: 'Age'},
        {x: 3, y: 0, value: 0.7, feature1: 'Experience', feature2: 'Age'},
        {x: 0, y: 1, value: 0.3, feature1: 'Age', feature2: 'Income'},
        {x: 1, y: 1, value: 1.0, feature1: 'Income', feature2: 'Income'},
        {x: 2, y: 1, value: 0.5, feature1: 'Education', feature2: 'Income'},
        {x: 3, y: 1, value: 0.4, feature1: 'Experience', feature2: 'Income'},
        {x: 0, y: 2, value: -0.1, feature1: 'Age', feature2: 'Education'},
        {x: 1, y: 2, value: 0.5, feature1: 'Income', feature2: 'Education'},
        {x: 2, y: 2, value: 1.0, feature1: 'Education', feature2: 'Education'},
        {x: 3, y: 2, value: 0.2, feature1: 'Experience', feature2: 'Education'},
        {x: 0, y: 3, value: 0.7, feature1: 'Age', feature2: 'Experience'},
        {x: 1, y: 3, value: 0.4, feature1: 'Income', feature2: 'Experience'},
        {x: 2, y: 3, value: 0.2, feature1: 'Education', feature2: 'Experience'},
        {x: 3, y: 3, value: 1.0, feature1: 'Experience', feature2: 'Experience'}
    ];

    const margin = {top: 50, right: 50, bottom: 50, left: 50};
    const width = 300 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const svg = d3.select(container)
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    const colorScale = d3.scaleSequential()
        .interpolator(d3.interpolateRdYlBu)
        .domain([-1, 1]);

    const cellSize = width / 4;

    svg.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('x', d => d.x * cellSize)
        .attr('y', d => d.y * cellSize)
        .attr('width', cellSize)
        .attr('height', cellSize)
        .style('fill', d => colorScale(d.value))
        .style('stroke', '#fff')
        .style('stroke-width', 2);

    svg.selectAll('text')
        .data(data)
        .enter()
        .append('text')
        .attr('x', d => d.x * cellSize + cellSize/2)
        .attr('y', d => d.y * cellSize + cellSize/2)
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'middle')
        .style('fill', d => Math.abs(d.value) > 0.5 ? '#fff' : '#000')
        .style('font-size', '12px')
        .style('font-weight', 'bold')
        .text(d => d.value.toFixed(1));

    // Add labels
    const features = ['Age', 'Income', 'Education', 'Experience'];
    
    svg.selectAll('.x-label')
        .data(features)
        .enter()
        .append('text')
        .attr('class', 'x-label')
        .attr('x', (d, i) => i * cellSize + cellSize/2)
        .attr('y', -10)
        .attr('text-anchor', 'middle')
        .style('font-size', '12px')
        .text(d => d);

    svg.selectAll('.y-label')
        .data(features)
        .enter()
        .append('text')
        .attr('class', 'y-label')
        .attr('x', -10)
        .attr('y', (d, i) => i * cellSize + cellSize/2)
        .attr('text-anchor', 'end')
        .attr('dominant-baseline', 'middle')
        .style('font-size', '12px')
        .text(d => d);
}

// ML Model Visualizations
function createNeuralNetworkViz() {
    const ctx = document.getElementById('neuralNetworkViz');
    if (!ctx) return;

    // Training progress visualization
    const epochs = Array.from({length: 50}, (_, i) => i + 1);
    const accuracy = epochs.map(e => 0.6 + (1 - Math.exp(-e/10)) * 0.35 + Math.random() * 0.05);
    const loss = epochs.map(e => 1.2 * Math.exp(-e/8) + Math.random() * 0.1);

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: epochs,
            datasets: [{
                label: 'Accuracy',
                data: accuracy,
                borderColor: '#28a745',
                backgroundColor: 'rgba(40, 167, 69, 0.1)',
                yAxisID: 'y'
            }, {
                label: 'Loss',
                data: loss,
                borderColor: '#dc3545',
                backgroundColor: 'rgba(220, 53, 69, 0.1)',
                yAxisID: 'y1'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    title: {
                        display: true,
                        text: 'Accuracy'
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: 'Loss'
                    },
                    grid: {
                        drawOnChartArea: false,
                    },
                }
            }
        }
    });
}

function createRandomForestViz() {
    const ctx = document.getElementById('randomForestViz');
    if (!ctx) return;

    // Feature importance visualization
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Feature A', 'Feature B', 'Feature C', 'Feature D', 'Feature E'],
            datasets: [{
                label: 'Feature Importance',
                data: [0.35, 0.25, 0.20, 0.15, 0.05],
                backgroundColor: [
                    'rgba(102, 126, 234, 0.8)',
                    'rgba(118, 75, 162, 0.8)',
                    'rgba(102, 126, 234, 0.6)',
                    'rgba(118, 75, 162, 0.6)',
                    'rgba(102, 126, 234, 0.4)'
                ],
                borderColor: '#667eea',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Importance Score'
                    }
                }
            }
        }
    });
}

function createSVMViz() {
    const ctx = document.getElementById('svmViz');
    if (!ctx) return;

    // Decision boundary visualization
    const class1 = Array.from({length: 25}, () => ({
        x: Math.random() * 40 + 10,
        y: Math.random() * 40 + 10
    }));
    
    const class2 = Array.from({length: 25}, () => ({
        x: Math.random() * 40 + 50,
        y: Math.random() * 40 + 50
    }));

    new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Class 1',
                data: class1,
                backgroundColor: 'rgba(102, 126, 234, 0.8)',
                borderColor: '#667eea',
                pointRadius: 5
            }, {
                label: 'Class 2',
                data: class2,
                backgroundColor: 'rgba(220, 53, 69, 0.8)',
                borderColor: '#dc3545',
                pointRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    min: 0,
                    max: 100,
                    title: {
                        display: true,
                        text: 'Feature 1'
                    }
                },
                y: {
                    min: 0,
                    max: 100,
                    title: {
                        display: true,
                        text: 'Feature 2'
                    }
                }
            }
        }
    });
}

function createRegressionViz() {
    const ctx = document.getElementById('regressionViz');
    if (!ctx) return;

    // Regression line with data points
    const actualData = Array.from({length: 30}, (_, i) => ({
        x: i * 3,
        y: i * 2 + Math.random() * 10 + 5
    }));

    const regressionLine = Array.from({length: 30}, (_, i) => ({
        x: i * 3,
        y: i * 2 + 10
    }));

    new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Actual Data',
                data: actualData,
                backgroundColor: 'rgba(102, 126, 234, 0.6)',
                borderColor: '#667eea',
                pointRadius: 4
            }, {
                label: 'Regression Line',
                data: regressionLine,
                type: 'line',
                borderColor: '#dc3545',
                backgroundColor: 'transparent',
                pointRadius: 0,
                tension: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Independent Variable'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Dependent Variable'
                    }
                }
            }
        }
    });
}

// Project Visualizations
function createCustomerSegmentation() {
    const ctx = document.getElementById('customerSegmentation');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['High Value', 'Medium Value', 'Low Value', 'At Risk'],
            datasets: [{
                data: [25, 35, 30, 10],
                backgroundColor: [
                    '#28a745',
                    '#17a2b8',
                    '#ffc107',
                    '#dc3545'
                ],
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

function createSentimentAnalysis() {
    const ctx = document.getElementById('sentimentAnalysis');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Positive', 'Neutral', 'Negative'],
            datasets: [{
                label: 'Sentiment Distribution',
                data: [65, 25, 10],
                backgroundColor: [
                    'rgba(40, 167, 69, 0.8)',
                    'rgba(255, 193, 7, 0.8)',
                    'rgba(220, 53, 69, 0.8)'
                ],
                borderColor: [
                    '#28a745',
                    '#ffc107',
                    '#dc3545'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Percentage (%)'
                    }
                }
            }
        }
    });
}

function createImageClassification() {
    const ctx = document.getElementById('imageClassification');
    if (!ctx) return;

    // Confusion matrix visualization
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Class A', 'Class B', 'Class C', 'Class D'],
            datasets: [{
                label: 'Precision',
                data: [0.92, 0.88, 0.95, 0.90],
                backgroundColor: 'rgba(102, 126, 234, 0.8)',
                borderColor: '#667eea',
                borderWidth: 1
            }, {
                label: 'Recall',
                data: [0.89, 0.91, 0.93, 0.87],
                backgroundColor: 'rgba(118, 75, 162, 0.8)',
                borderColor: '#764ba2',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 1,
                    title: {
                        display: true,
                        text: 'Score'
                    }
                }
            }
        }
    });
}

function createSalesForecasting() {
    const ctx = document.getElementById('salesForecasting');
    if (!ctx) return;

    // Generate sales data with trend
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const actualSales = [120, 135, 148, 162, 178, 195, 210, 225, 240, 255, 270, 285];
    const forecastSales = [290, 305, 320, 335, 350, 365];

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: [...months, 'Jan+1', 'Feb+1', 'Mar+1', 'Apr+1', 'May+1', 'Jun+1'],
            datasets: [{
                label: 'Actual Sales',
                data: [...actualSales, ...Array(6).fill(null)],
                borderColor: '#667eea',
                backgroundColor: 'rgba(102, 126, 234, 0.1)',
                fill: true,
                tension: 0.4
            }, {
                label: 'Forecasted Sales',
                data: [...Array(12).fill(null), ...forecastSales],
                borderColor: '#dc3545',
                backgroundColor: 'rgba(220, 53, 69, 0.1)',
                borderDash: [5, 5],
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Sales (K$)'
                    }
                }
            }
        }
    });
}

// Skills progress animation
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress, .metric-fill');
    skillBars.forEach(bar => {
        const percentage = bar.getAttribute('data-percentage');
        if (percentage) {
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = percentage;
            }, 500);
        }
    });
}

// Project filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        const filter = this.getAttribute('data-filter');
        
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        
        // Filter projects
        projectCards.forEach(card => {
            if (filter === 'all' || card.classList.contains(filter)) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Contact form handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            const nameField = document.querySelector('input[name="name"]');
            const emailField = document.querySelector('input[name="email"]');
            const projectTypeField = document.querySelector('select[name="project_type"]');
            const messageField = document.querySelector('textarea[name="message"]');
            
            const name = nameField ? nameField.value.trim() : '';
            const email = emailField ? emailField.value.trim() : '';
            const projectType = projectTypeField ? projectTypeField.value : '';
            const message = messageField ? messageField.value.trim() : '';
            
            // Validation
            if (!name || !email || !projectType || !message) {
                e.preventDefault();
                alert('Please fill in all fields');
                return false;
            }
            
            // Email format validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                e.preventDefault();
                alert('Please enter a valid email address');
                return false;
            }
            
            // Show loading state
            const submitButton = contactForm.querySelector('button[type="submit"]');
            if (submitButton) {
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitButton.disabled = true;
            }
        });
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            
            // Trigger specific animations based on section
            if (entry.target.id === 'skills') {
                animateSkillBars();
            }
        }
    });
}, observerOptions);

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Observe sections for animations
    const sections = document.querySelectorAll('section, .model-card, .project-card');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Create all visualizations
    setTimeout(() => {
        createHeroChart();
        createBoxPlot();
        createScatterPlot();
        createTimeSeriesChart();
        createHeatmap();
        createNeuralNetworkViz();
        createRandomForestViz();
        createSVMViz();
        createRegressionViz();
        createCustomerSegmentation();
        createSentimentAnalysis();
        createImageClassification();
        createSalesForecasting();
    }, 1000);
});

// Back to top button
const backToTopButton = document.createElement('button');
backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTopButton.className = 'back-to-top';
backToTopButton.style.cssText = `
    position
