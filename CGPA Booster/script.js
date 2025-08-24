// DOM Elements
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Mobile Navigation Toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger menu
    const bars = navToggle.querySelectorAll('.bar');
    bars.forEach((bar, index) => {
        if (navMenu.classList.contains('active')) {
            if (index === 0) bar.style.transform = 'rotate(45deg) translate(5px, 5px)';
            if (index === 1) bar.style.opacity = '0';
            if (index === 2) bar.style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            bar.style.transform = 'none';
            bar.style.opacity = '1';
        }
    });
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const bars = navToggle.querySelectorAll('.bar');
        bars.forEach(bar => {
            bar.style.transform = 'none';
            bar.style.opacity = '1';
        });
    });
});

// Smooth scrolling for navigation links
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80; // Account for fixed navbar
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Add click event listeners to buttons with scroll functionality
document.addEventListener('DOMContentLoaded', () => {
    const scrollButtons = document.querySelectorAll('[onclick^="scrollToSection"]');
    scrollButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = button.getAttribute('onclick').match(/scrollToSection\('(.+)'\)/)[1];
            scrollToSection(sectionId);
        });
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
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
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe all cards and sections for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.dashboard-card, .resource-card, .section-title');
    animatedElements.forEach(el => observer.observe(el));
});

// CGPA Calculator Functionality
class CGPACalculator {
    constructor() {
        this.courses = [];
        this.totalCredits = 0;
        this.totalGradePoints = 0;
    }

    addCourse(courseName, credits, grade) {
        const gradePoints = this.getGradePoints(grade);
        const course = {
            name: courseName,
            credits: credits,
            grade: grade,
            gradePoints: gradePoints
        };
        
        this.courses.push(course);
        this.totalCredits += credits;
        this.totalGradePoints += (credits * gradePoints);
        
        this.updateDisplay();
    }

    getGradePoints(grade) {
        const gradeMap = {
            'A+': 4.0, 'A': 4.0, 'A-': 3.7,
            'B+': 3.3, 'B': 3.0, 'B-': 2.7,
            'C+': 2.3, 'C': 2.0, 'C-': 1.7,
            'D+': 1.3, 'D': 1.0, 'F': 0.0
        };
        return gradeMap[grade] || 0.0;
    }

    calculateCGPA() {
        if (this.totalCredits === 0) return 0.0;
        return (this.totalGradePoints / this.totalCredits).toFixed(2);
    }

    updateDisplay() {
        const cgpaNumber = document.querySelector('.cgpa-number');
        const progressFill = document.querySelector('.progress-fill');
        const progressText = document.querySelector('.progress-text');
        
        if (cgpaNumber && progressFill && progressText) {
            const cgpa = this.calculateCGPA();
            const percentage = (cgpa / 4.0) * 100;
            
            cgpaNumber.textContent = cgpa;
            progressFill.style.width = `${percentage}%`;
            progressText.textContent = `${percentage.toFixed(1)}%`;
        }
    }

    reset() {
        this.courses = [];
        this.totalCredits = 0;
        this.totalGradePoints = 0;
        this.updateDisplay();
    }
}

// Initialize CGPA Calculator
const cgpaCalculator = new CGPACalculator();

// Add sample courses for demonstration
document.addEventListener('DOMContentLoaded', () => {
    // Add some sample courses to demonstrate the CGPA calculation
    cgpaCalculator.addCourse('Advanced Mathematics', 3, 'A');
    cgpaCalculator.addCourse('Programming Fundamentals', 4, 'A-');
    cgpaCalculator.addCourse('Physics Lab', 2, 'B+');
    cgpaCalculator.addCourse('English Composition', 3, 'A');
    cgpaCalculator.addCourse('Data Structures', 4, 'A-');
    cgpaCalculator.addCourse('Calculus II', 4, 'B+');
});

// Resource Download Simulation
document.addEventListener('DOMContentLoaded', () => {
    const downloadButtons = document.querySelectorAll('.resource-card .btn-outline');
    
    downloadButtons.forEach(button => {
        button.addEventListener('click', function() {
            const originalText = this.textContent;
            const resourceCard = this.closest('.resource-card');
            const resourceName = resourceCard.querySelector('h3').textContent;
            
            // Simulate download process
            this.textContent = 'Downloading...';
            this.classList.add('loading');
            
            setTimeout(() => {
                this.textContent = 'Downloaded!';
                this.classList.remove('loading');
                this.style.background = '#10b981';
                this.style.color = 'white';
                this.style.borderColor = '#10b981';
                
                // Show success message
                showNotification(`Successfully downloaded: ${resourceName}`, 'success');
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.background = '';
                    this.style.color = '';
                    this.style.borderColor = '';
                }, 3000);
            }, 2000);
        });
    });
});

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
        display: flex;
        align-items: center;
        gap: 10px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Search Functionality for Resources
function initializeSearch() {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search resources...';
    searchInput.className = 'search-input';
    
    // Add search input before resources grid
    const resourcesSection = document.querySelector('.resources .container');
    const resourcesTitle = resourcesSection.querySelector('.section-title');
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';
    searchContainer.appendChild(searchInput);
    
    resourcesSection.insertBefore(searchContainer, resourcesTitle.nextSibling);
    
    // Add search functionality
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const resourceCards = document.querySelectorAll('.resource-card');
        
        resourceCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                card.style.display = 'block';
                card.style.opacity = '1';
            } else {
                card.style.display = 'none';
                card.style.opacity = '0';
            }
        });
    });
}

// Initialize search when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeSearch);

// Add search input styles
const searchStyles = `
    .search-container {
        margin-bottom: 2rem;
        text-align: center;
    }
    
    .search-input {
        width: 100%;
        max-width: 400px;
        padding: 12px 20px;
        border: 2px solid #e5e7eb;
        border-radius: 8px;
        font-size: 1rem;
        transition: border-color 0.3s ease;
    }
    
    .search-input:focus {
        outline: none;
        border-color: #2563eb;
        box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
    }
`;

// Inject search styles
const styleSheet = document.createElement('style');
styleSheet.textContent = searchStyles;
document.head.appendChild(styleSheet);

// Performance optimization: Debounce scroll events
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

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Add loading states to buttons
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (!this.classList.contains('loading')) {
                this.classList.add('loading');
                setTimeout(() => {
                    this.classList.remove('loading');
                }, 1000);
            }
        });
    });
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu on Escape key
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            const bars = navToggle.querySelectorAll('.bar');
            bars.forEach(bar => {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            });
        }
    }
});

// Add focus management for accessibility
document.addEventListener('DOMContentLoaded', () => {
    const focusableElements = document.querySelectorAll('button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])');
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', () => {
            element.style.outline = '2px solid #2563eb';
            element.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', () => {
            element.style.outline = '';
            element.style.outlineOffset = '';
        });
    });
});

// Console welcome message
console.log(`
🎓 Welcome to CGPA Booster! 🎓
An innovative Ed-Tech platform empowering students to achieve academic excellence.

Features:
- Interactive CGPA Calculator
- Resource Management System
- Responsive Design
- Modern UI/UX

Built with: HTML, CSS, JavaScript
`);
