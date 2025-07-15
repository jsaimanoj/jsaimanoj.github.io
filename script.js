// ================================
// COMPLETE PORTFOLIO JAVASCRIPT
// ================================

// Global Variables
let performanceChart, algorithmChart, systemChart, volumeChart;
let currentMetric = 'accuracy';
let animationFrameId;

// ================================
// INITIALIZATION
// ================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Portfolio Loading...');
    
    // Initialize all components
    initializeAnimations();
    initializeCharts();
    initializeRealTimeData();
    initializeEventListeners();
    initializeScrollEffects();
    
    console.log('✅ Portfolio Loaded Successfully!');
});

// ================================
// SCROLL ANIMATIONS & EFFECTS
// ================================
function initializeScrollEffects() {
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

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
}

// ================================
// COUNTER ANIMATIONS
// ================================
function initializeAnimations() {
    // Hero stats animation
    const animateCounters = () => {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const target = parseFloat(counter.getAttribute('data-target'));
            const increment = target / 100;
            let current = 0;
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    if (target === 2.4) {
                        counter.textContent = current.toFixed(1);
                    } else if (target === 94.7) {
                        counter.textContent = current.toFixed(1) + '%';
                    } else {
                        counter.textContent = Math.floor(current);
                    }
                    requestAnimationFrame(updateCounter);
                } else {
                    if (target === 2.4) {
                        counter.textContent = target.toFixed(1);
                    } else if (target === 94.7) {
                        counter.textContent = target + '%';
                    } else {
                        counter.textContent = target;
                    }
                }
            };
            
            updateCounter();
        });
    };

    // Dashboard metrics animation
    const animateDashboardMetrics = () => {
        const metrics = [
            { id: 'modelsCount', target: 127, suffix: '' },
            { id: 'dataPoints', target: 2.4, suffix: 'M', decimals: 1 },
            { id: 'accuracy', target: 94.7, suffix: '%', decimals: 1 },
            { id: 'responseTime', target: 45, suffix: 'ms' }
        ];

        metrics.forEach(metric => {
            const element = document.getElementById(metric.id);
            if (element) {
                animateValue(element, 0, metric.target, 2000, metric.suffix, metric.decimals);
            }
        });
    };

    // Trigger animations when sections come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.id === 'home') {
                    setTimeout(animateCounters, 500);
                } else if (entry.target.id === 'analytics') {
                    setTimeout(animateDashboardMetrics, 300);
                }
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('#home, #analytics').forEach(section => {
        observer.observe(section);
    });
}

function animateValue(element, start, end, duration, suffix = '', decimals = 0) {
    const startTime = Date.now();
    const range = end - start;
    
    function update() {
        const now = Date.now();
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = start + (range * easeOutQuart);
        
        if (decimals > 0) {
            element.textContent = current.toFixed(decimals) + suffix;
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    update();
}

// ================================
// INTERACTIVE CHARTS
// ================================
function initializeCharts() {
    initializePerformanceChart();
    initializeAlgorithmChart();
    initializeSystemChart();
    initializeVolumeChart();
}

function initializePerformanceChart() {
    const ctx = document.getElementById('performanceChart');
    if (!ctx) return;

    const gradient = ctx.getContext('2d').createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(37, 99, 235, 0.3)');
    gradient.addColorStop(1, 'rgba(37, 99, 235, 0.05)');

    performanceChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'Model Accuracy (%)',
                data: [85.2, 87.1, 89.3, 91.2, 92.8, 93.5, 94.1, 94.7, 95.2, 95.8, 96.1, 96.4],
                borderColor: '#2563eb',
                backgroundColor: gradient,
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#2563eb',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointRadius: 6,
                pointHoverRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#ffffff',
                    bodyColor: '#ffffff',
                    borderColor: '#2563eb',
                    borderWidth: 1,
                    cornerRadius: 8,
                    displayColors: false
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#6b7280'
                    }
                },
                y: {
                    beginAtZero: false,
                    min: 80,
                    max: 100,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    },
                    ticks: {
                        color: '#6b7280',
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            }
        }
    });
}

function initializeAlgorithmChart() {
    const ctx = document.getElementById('algorithmChart');
    if (!ctx) return;

    algorithmChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Random Forest', 'Neural Networks', 'SVM', 'XGBoost', 'Linear Models'],
            datasets: [{
                data: [28, 24, 18, 20, 10],
                backgroundColor: [
                    '#2563eb',
                    '#3b82f6',
                    '#60a5fa',
                    '#93c5fd',
                    '#dbeafe'
                ],
                borderWidth: 0,
                hoverOffset: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true,
                        color: '#6b7280'
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#ffffff',
                    bodyColor: '#ffffff',
                    borderColor: '#2563eb',
                    borderWidth: 1,
                    cornerRadius: 8,
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.parsed + '%';
                        }
                    }
                }
            }
        }
    });
}

function initializeSystemChart() {
    const ctx = document.getElementById('systemChart');
    if (!ctx) return;

    systemChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['CPU Usage', 'Memory', 'GPU Util', 'Network I/O', 'Disk I/O'],
            datasets: [{
                label: 'Usage %',
                data: [65, 78, 45, 32, 28],
                backgroundColor: [
                    'rgba(34, 197, 94, 0.8)',
                    'rgba(251, 191, 36, 0.8)',
                    'rgba(239, 68, 68, 0.8)',
                    'rgba(59, 130, 246, 0.8)',
                    'rgba(139, 92, 246, 0.8)'
                ],
                borderColor: [
                    '#22c55e',
                    '#fbbf24',
                    '#ef4444',
                    '#3b82f6',
                    '#8b5cf6'
                ],
                borderWidth: 2,
                borderRadius: 8,
                borderSkipped: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#ffffff',
                    bodyColor: '#ffffff',
                    borderColor: '#2563eb',
                    borderWidth: 1,
                    cornerRadius: 8
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#6b7280'
                    }
                },
                y: {
                    beginAtZero: true,
                    max: 100,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    },
                    ticks: {
                        color: '#6b7280',
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            }
        }
    });
}

function initializeVolumeChart() {
    const ctx = document.getElementById('volumeChart');
    if (!ctx) return;

    const gradient = ctx.getContext('2d').createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, 'rgba(34, 197, 94, 0.3)');
    gradient.addColorStop(1, 'rgba(34, 197, 94, 0.05)');

    volumeChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
            datasets: [{
                label: 'Records Processed (K)',
                data: [12, 8, 25, 45, 38, 52, 28],
                borderColor: '#22c55e',
                backgroundColor: gradient,
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#22c55e',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#ffffff',
                    bodyColor: '#ffffff',
                    borderColor: '#22c55e',
                    borderWidth: 1,
                    cornerRadius: 8
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#6b7280'
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    },
                    ticks: {
                        color: '#6b7280',
                        callback: function(value) {
                            return value + 'K';
                        }
                    }
                }
            }
        }
    });
}

// ================================
// CHART INTERACTIONS
// ================================
function updatePerformanceChart(metric) {
    if (!performanceChart) return;
    
    currentMetric = metric;
    
    // Update button states
    document.querySelectorAll('.btn-group button').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    const datasets = {
        accuracy: {
            label: 'Model Accuracy (%)',
            data: [85.2, 87.1, 89.3, 91.2, 92.8, 93.5, 94.1, 94.7, 95.2, 95.8, 96.1, 96.4],
            color: '#2563eb'
        },
        precision: {
            label: 'Model Precision (%)',
            data: [82.1, 84.3, 86.8, 88.9, 90.2, 91.8, 92.5, 93.1, 93.8, 94.2, 94.7, 95.1],
            color: '#059669'
        },
        recall: {
            label: 'Model Recall (%)',
            data: [79.8, 81.2, 83.5, 85.7, 87.3, 88.9, 90.1, 91.4, 92.2, 92.8, 93.5, 94.0],
            color: '#dc2626'
        }
    };
    
    const selectedData = datasets[metric];
    
    performanceChart.data.datasets[0].label = selectedData.label;
    performanceChart.data.datasets[0].data = selectedData.data;
    performanceChart.data.datasets[0].borderColor = selectedData.color;
    performanceChart.data.datasets[0].pointBackgroundColor = selectedData.color;
    
    performanceChart.update('active');
}

function refreshSystemMetrics() {
    if (!systemChart) return;
    
    // Simulate real-time data update
    const newData = [
        Math.floor(Math.random() * 40) + 40, // CPU: 40-80%
        Math.floor(Math.random() * 30) + 60, // Memory: 60-90%
        Math.floor(Math.random() * 50) + 20, // GPU: 20-70%
        Math.floor(Math.random() * 40) + 10, // Network: 10-50%
        Math.floor(Math.random() * 35) + 15  // Disk: 15-50%
    ];
    
    systemChart.data.datasets[0].data = newData;
    systemChart.update('active');
    
    // Show refresh feedback
    const button = event.target.closest('button');
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-spinner fa-spin me-1"></i>Refreshing...';
    button.disabled = true;
    
    setTimeout(() => {
        button.innerHTML = originalText;
        button.disabled = false;
    }, 1000);
}

// ================================
// REAL-TIME DATA SIMULATION
// ================================
function initializeRealTimeData() {
    generatePredictionsTable();
    startRealTimeUpdates();
}

function generatePredictionsTable() {
    const tableBody = document.getElementById('predictionsTableBody');
    if (!tableBody) return;
    
    const models = ['Customer Segmentation', 'Predictive Maintenance', 'Sentiment Analysis', 'Fraud Detection', 'Recommendation Engine'];
    const statuses = ['Success', 'Processing', 'Warning', 'Success', 'Success'];
    const statusClasses = ['success', 'primary', 'warning', 'success', 'success'];
    
    // Generate 10 rows of sample data
    for (let i = 0; i < 10; i++) {
        const row = document.createElement('tr');
        const timestamp = new Date(Date.now() - Math.random() * 3600000).toLocaleTimeString();
        const model = models[Math.floor(Math.random() * models.length)];
        const confidence = (Math.random() * 20 + 80).toFixed(1);
        const statusIndex = Math.floor(Math.random() * statuses.length);
        
        row.innerHTML = `
            <td><small class="text-muted">${timestamp}</small></td>
            <td><span class="badge bg-light text-dark">${model}</span></td>
            <td><small>Features: ${Math.floor(Math.random() * 20) + 5}</small></td>
            <td><strong>${Math.random() > 0.5 ? 'Positive' : 'Negative'}</strong></td>
            <td>
                <div class="d-flex align-items-center">
                    <div class="progress me-2" style="width: 60px; height: 6px;">
                        <div class="progress-bar bg-success" style="width: ${confidence}%"></div>
                    </div>
                    <small>${confidence}%</small>
                </div>
            </td>
            <td><span class="badge bg-${statusClasses[statusIndex]}">${statuses[statusIndex]}</span></td>
        `;
        
        tableBody.appendChild(row);
    }
}

function startRealTimeUpdates() {
    // Update table every 5 seconds
    setInterval(() => {
        updatePredictionsTable();
    }, 5000);
    
    // Update charts every 10 seconds
    setInterval(() => {
        updateRealTimeCharts();
    }, 10000);
}

function updatePredictionsTable() {
    const tableBody = document.getElementById('predictionsTableBody');
    if (!tableBody || tableBody.children.length === 0) return;
    
    // Remove last row and add new row at top
    tableBody.removeChild(tableBody.lastElementChild);
    
    const models = ['Customer Segmentation', 'Predictive Maintenance', 'Sentiment Analysis', 'Fraud Detection', 'Recommendation Engine'];
    const statuses = ['Success', 'Processing', 'Warning', 'Success'];
    const statusClasses = ['success', 'primary', 'warning', 'success'];
    
    const newRow = document.createElement('tr');
    const timestamp = new Date().toLocaleTimeString();
    const model = models[Math.floor(Math.random() * models.length)];
    const confidence = (Math.random() * 20 + 80).toFixed(1);
    const statusIndex = Math.floor(Math.random() * statuses.length);
    
    newRow.innerHTML = `
        <td><small class="text-muted">${timestamp}</small></td>
        <td><span class="badge bg-light text-dark">${model}</span></td>
        <td><small>Features: ${Math.floor(Math.random() * 20) + 5}</small></td>
        <td><strong>${Math.random() > 0.5 ? 'Positive' : 'Negative'}</strong></td>
        <td>
            <div class="d-flex align-items-center">
                <div class="progress me-2" style="width: 60px; height: 6px;">
                    <div class="progress-bar bg-success" style="width: ${confidence}%"></div>
                </div>
                <small>${confidence}%</small>
            </div>
        </td>
        <td><span class="badge bg-${statusClasses[statusIndex]}">${statuses[statusIndex]}</span></td>
    `;
    
    newRow.style.backgroundColor = 'rgba(34, 197, 94, 0.1)';
    tableBody.insertBefore(newRow, tableBody.firstChild);
    
    // Remove highlight after 2 seconds
    setTimeout(() => {
        newRow.style.backgroundColor = '';
    }, 2000);
}

function updateRealTimeCharts() {
    // Update volume chart with new data point
    if (volumeChart) {
        const newValue = Math.floor(Math.random() * 40) + 15;
        volumeChart.data.datasets[0].data.push(newValue);
        volumeChart.data.datasets[0].data.shift();
        
        // Update time labels
        const now = new Date();
        const timeLabel = now.getHours().toString().padStart(2, '0') + ':' + 
                         now.getMinutes().toString().padStart(2, '0');
        volumeChart.data.labels.push(timeLabel);
        volumeChart.data.labels.shift();
        
        volumeChart.update('none');
    }
}

// ================================
// EVENT LISTENERS
// ================================
function initializeEventListeners() {
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmission);
    }
    
    // Skill bars animation on scroll
    const skillBars = document.querySelectorAll('.skill-progress');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transform = 'scaleX(1)';
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => {
        bar.style.transform = 'scaleX(0)';
        bar.style.transformOrigin = 'left';
        bar.style.transition = 'transform 1.5s ease-out';
        skillObserver.observe(bar);
    });
    
    // Project cards hover effects
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

function handleContactSubmission(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    
    // Show loading state
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
    submitButton.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        // Show success message
        submitButton.innerHTML = '<i class="fas fa-check me-2"></i>Message Sent!';
        submitButton.classList.remove('btn-primary');
        submitButton.classList.add('btn-success');
        
        // Reset form
        form.reset();
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitButton.innerHTML = originalText;
            submitButton.classList.remove('btn-success');
            submitButton.classList.add('btn-primary');
            submitButton.disabled = false;
        }, 3000);
    }, 2000);
}

// ================================
// UTILITY FUNCTIONS
// ================================
function exportData() {
    const table = document.getElementById('predictionsTable');
    if (!table) return;
    
    let csv = 'Timestamp,Model,Input Features,Prediction,Confidence,Status\n';
    
    const rows = table.querySelectorAll('tbody tr');
    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        const rowData = Array.from(cells).map(cell => {
            return '"' + cell.textContent.trim().replace(/"/g, '""') + '"';
        }).join(',');
        csv += rowData + '\n';
    });
    
    // Create and download file
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'model_predictions_' + new Date().toISOString().split('T')[0] + '.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    // Show export feedback
    const button = event.target.closest('button');
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-check me-1"></i>Exported!';
    button.classList.add('btn-success');
    
    setTimeout(() => {
        button.innerHTML = originalText;
        button.classList.remove('btn-success');
    }, 2000);
}

// ================================
// PERFORMANCE OPTIMIZATION
// ================================
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

// Optimize scroll events
const optimizedScrollHandler = debounce(() => {
    // Handle scroll-based animations here
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);

// ================================
// ERROR HANDLING
// ================================
window.addEventListener('error', function(e) {
    console.error('Portfolio Error:', e.error);
});

// Chart.js error handling
Chart.defaults.plugins.tooltip.filter = function(tooltipItem) {
    return !isNaN(tooltipItem.parsed.y);
};

console.log('🎯 Portfolio JavaScript Loaded Successfully!');
