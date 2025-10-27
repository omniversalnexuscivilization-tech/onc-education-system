// ===================================
// ONC Education 5.0 - Main JavaScript
// ===================================

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // ========== Navigation ========== 
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    // Sticky navbar on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        // Animate hamburger
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = navMenu.classList.contains('active') ? 'rotate(45deg) translate(5px, 5px)' : '';
        spans[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
        spans[2].style.transform = navMenu.classList.contains('active') ? 'rotate(-45deg) translate(7px, -6px)' : '';
    });
    
    // Close mobile menu on link click
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            const spans = navToggle.querySelectorAll('span');
            spans.forEach(span => span.style.transform = '');
            spans[1].style.opacity = '1';
        });
    });
    
    // ========== Animated Counter for Stats ==========
    const statNumbers = document.querySelectorAll('.stat-number');
    let counted = false;
    
    function animateCounters() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const current = parseInt(stat.textContent);
            const increment = target / 50; // Adjust speed
            
            if (current < target) {
                stat.textContent = Math.ceil(current + increment);
                setTimeout(() => animateCounters(), 30);
            } else {
                stat.textContent = target;
            }
        });
    }
    
    // Trigger counter animation when hero section is in view
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !counted) {
                animateCounters();
                counted = true;
            }
        });
    }, { threshold: 0.5 });
    
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroObserver.observe(heroSection);
    }
    
    // ========== Smooth Scroll ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ========== Curriculum Tabs ==========
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding tab content
            const tabId = this.getAttribute('data-tab');
            const targetContent = document.getElementById(tabId);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
    
    // ========== Back to Top Button ==========
    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });
    
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ========== Scroll Animations ==========
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all cards for animation
    const animatedElements = document.querySelectorAll('.mission-card, .framework-card, .curriculum-item, .involved-card, .pilot-info-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // ========== Contact Form Handling ==========
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });
            
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                // Success message
                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 1500);
            
            // For actual implementation, use fetch API:
            /*
            fetch('your-api-endpoint', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(result => {
                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
            })
            .catch(error => {
                alert('Sorry, there was an error. Please try again.');
            })
            .finally(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            });
            */
        });
    }
    
    // ========== Scroll Indicator (Hero) ==========
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const nextSection = document.querySelector('#pilot');
            if (nextSection) {
                nextSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    // ========== Framework Cards Hover Effect ==========
    const frameworkCards = document.querySelectorAll('.framework-card');
    frameworkCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // ========== Mission Cards Stagger Animation ==========
    const missionCards = document.querySelectorAll('.mission-card');
    missionCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
    
    // ========== Lazy Loading Images ==========
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
    
    // ========== Active Nav Link on Scroll ==========
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    function highlightNavLink() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavLink);
    
    // ========== Parallax Effect for Hero ==========
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallax = hero.querySelector('.hero-content');
            if (parallax) {
                parallax.style.transform = `translateY(${scrolled * 0.3}px)`;
                parallax.style.opacity = 1 - (scrolled / 500);
            }
        });
    }
    
    // ========== Tooltip Initialization (if needed) ==========
    const tooltips = document.querySelectorAll('[data-tooltip]');
    tooltips.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = this.getAttribute('data-tooltip');
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`;
            tooltip.style.left = `${rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2)}px`;
        });
        
        element.addEventListener('mouseleave', function() {
            const tooltip = document.querySelector('.tooltip');
            if (tooltip) {
                tooltip.remove();
            }
        });
    });
    
    // ========== Performance Optimization ==========
    // Debounce scroll events
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        scrollTimeout = window.requestAnimationFrame(function() {
            // Scroll event code here (already implemented above)
        });
    });
    
    // ========== Print Detection ==========
    window.addEventListener('beforeprint', function() {
        console.log('Page is being printed');
        // Add any print-specific logic here
    });
    
    // ========== Console Message ==========
    console.log('%c🎓 ONC Education 5.0', 'color: #667eea; font-size: 20px; font-weight: bold;');
    console.log('%cBuilt with ❤️ for learners everywhere', 'color: #764ba2; font-size: 14px;');
    console.log('%cContribute: https://github.com/onsnc/onc-education', 'color: #333; font-size: 12px;');
    
    // ========== Service Worker Registration (Progressive Web App) ==========
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            // Uncomment when you have a service worker file
            /*
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('ServiceWorker registered:', registration);
                })
                .catch(error => {
                    console.log('ServiceWorker registration failed:', error);
                });
            */
        });
    }
    
    // ========== Initialize ==========
    console.log('ONC Education 5.0 initialized successfully!');
    
}); // End of DOMContentLoaded

// ========== Utility Functions ==========

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

// Throttle function for performance
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
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Smooth scroll to element
function smoothScrollTo(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Format number with commas
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Copy to clipboard
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            console.log('Copied to clipboard');
        }).catch(err => {
            console.error('Failed to copy:', err);
        });
    }
}

// Get query parameter
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}


// Video Modal Functionality
const playButtons = document.querySelectorAll('.play-button');
const videoModal = document.getElementById('videoModal');
const modalVideo = document.getElementById('modalVideo');
const closeModal = document.querySelector('.video-close');

playButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        const videoSrc = this.getAttribute('data-video');
        modalVideo.src = `assets/videos/${videoSrc}`;
        videoModal.classList.add('show');
        modalVideo.play();
    });
});

closeModal.addEventListener('click', function() {
    videoModal.classList.remove('show');
    modalVideo.pause();
    modalVideo.src = '';
});

window.addEventListener('click', function(e) {
    if (e.target === videoModal) {
        videoModal.classList.remove('show');
        modalVideo.pause();
        modalVideo.src = '';
    }
});

// Gallery Filter
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        filterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        const filter = this.getAttribute('data-filter');
        
        galleryItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Stories Tab Switching
const storyTabBtns = document.querySelectorAll('.story-tab-btn');
const storyTabContents = document.querySelectorAll('.story-tab-content');

storyTabBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        storyTabBtns.forEach(b => b.classList.remove('active'));
        storyTabContents.forEach(c => c.classList.remove('active'));
        
        this.classList.add('active');
        const tabId = this.getAttribute('data-story-tab');
        document.getElementById(tabId).classList.add('active');
    });
});

// Video Play Functionality
document.querySelectorAll('.play-button').forEach(btn => {
    btn.addEventListener('click', function() {
        // Add video player modal logic here
        alert('Video player coming soon!');
    });
});

// ========== Export functions (if using modules) ==========
// export { debounce, throttle, isInViewport, smoothScrollTo, formatNumber, copyToClipboard, getQueryParam };
