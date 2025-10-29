// ONC Education 5.0 - Body JavaScript
// All interactive features for body sections

document.addEventListener('DOMContentLoaded', function() {
    // Animated counter for statistics
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16); // 60fps
        
        const updateCounter = () => {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };
        
        updateCounter();
    }
    
    // Intersection Observer for counter animation
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.getAttribute('data-target'));
                    if (!stat.classList.contains('animated')) {
                        stat.classList.add('animated');
                        animateCounter(stat, target);
                    }
                });
            }
        });
    }, observerOptions);
    
    // Observe the hero section for counter animation
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        observer.observe(heroSection);
    }


    // Curriculum tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to current button and content
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Stories tabs
    const storyTabBtns = document.querySelectorAll('.story-tab-btn');
    const storyTabContents = document.querySelectorAll('.story-tab-content');
    
    storyTabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const storyTabId = this.getAttribute('data-story-tab');
            
            // Remove active class from all buttons and contents
            storyTabBtns.forEach(b => b.classList.remove('active'));
            storyTabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to current button and content
            this.classList.add('active');
            document.getElementById(storyTabId).classList.add('active');
        });
    });

    // Photo gallery filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (filterBtns.length > 0 && galleryItems.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active class to current button
                this.classList.add('active');
                
                // Filter gallery items
                galleryItems.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    // Video modal functionality
    const videoModal = document.getElementById('videoModal');
    const modalVideo = document.getElementById('modalVideo');
    const videoClose = document.querySelector('.video-close');
    const playButtons = document.querySelectorAll('.play-button');
    
    if (videoModal && modalVideo) {
        // Open modal when play button is clicked
        playButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const videoSrc = this.getAttribute('data-video');
                modalVideo.src = videoSrc;
                videoModal.classList.add('show');
                modalVideo.play();
            });
        });
        
        // Close modal when close button is clicked
        if (videoClose) {
            videoClose.addEventListener('click', function() {
                videoModal.classList.remove('show');
                modalVideo.pause();
                modalVideo.src = '';
            });
        }
        
        // Close modal when clicking outside the video
        videoModal.addEventListener('click', function(e) {
            if (e.target === videoModal) {
                videoModal.classList.remove('show');
                modalVideo.pause();
                modalVideo.src = '';
            }
        });
        
        // Close modal with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && videoModal.classList.contains('show')) {
                videoModal.classList.remove('show');
                modalVideo.pause();
                modalVideo.src = '';
            }
        });
    }

    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Simple validation
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Here you would typically send the form data to a server
            // For now, we'll just show a success message
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }

    // Performance optimization: Debounce scroll events
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(function() {
            // Scroll-related code that doesn't need to run on every scroll tick
        }, 100);
    });
});


// Education 5.0 Framework Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scroll for framework links
    const frameworkLinks = document.querySelectorAll('.framework-link');
    
    frameworkLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // Card hover effect with tilt
    const frameworkCards = document.querySelectorAll('.framework-card');
    
    frameworkCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
        });

        // Parallax effect on mouse move
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            this.style.transform = `translateY(-10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animate counter numbers
                const number = entry.target.querySelector('.framework-number');
                if (number) {
                    animateNumber(number);
                }
            }
        });
    }, observerOptions);

    frameworkCards.forEach(card => {
        observer.observe(card);
    });

    // Animate numbers
    function animateNumber(element) {
        const target = parseInt(element.textContent);
        const duration = 1000;
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }

    // Add ripple effect on card click
    frameworkCards.forEach(card => {
        card.addEventListener('click', function(e) {
            const ripple = document.createElement('div');
            ripple.classList.add('ripple');
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Feature list animation on hover
    const featureLists = document.querySelectorAll('.framework-features');
    
    featureLists.forEach(list => {
        const items = list.querySelectorAll('li');
        
        list.parentElement.addEventListener('mouseenter', function() {
            items.forEach((item, index) => {
                setTimeout(() => {
                    item.style.transform = 'translateX(5px)';
                    item.style.transition = 'transform 0.3s ease';
                }, index * 50);
            });
        });
        
        list.parentElement.addEventListener('mouseleave', function() {
            items.forEach(item => {
                item.style.transform = 'translateX(0)';
            });
        });
    });

    // Add particle effect on section
    createParticles();
    
    function createParticles() {
        const section = document.querySelector('.framework-section');
        const particleCount = 20;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 2}px;
                height: ${Math.random() * 4 + 2}px;
                background: radial-gradient(circle, rgba(59, 130, 246, 0.3), transparent);
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float ${Math.random() * 10 + 10}s infinite ease-in-out;
                animation-delay: ${Math.random() * 5}s;
                pointer-events: none;
            `;
            section.appendChild(particle);
        }
    }

    // Add CSS animation for particles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% {
                transform: translate(0, 0) rotate(0deg);
                opacity: 0;
            }
            50% {
                opacity: 0.5;
            }
            25% {
                transform: translate(100px, -100px) rotate(180deg);
            }
            75% {
                transform: translate(-100px, 100px) rotate(-180deg);
            }
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            pointer-events: none;
            animation: ripple-animation 0.6s ease-out;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Scroll progress indicator for framework section
    window.addEventListener('scroll', function() {
        const section = document.querySelector('.framework-section');
        const rect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        if (rect.top < windowHeight && rect.bottom > 0) {
            const progress = (windowHeight - rect.top) / (windowHeight + rect.height);
            section.style.setProperty('--scroll-progress', progress);
        }
    });

    // Add tooltip on feature items
    const featureItems = document.querySelectorAll('.framework-features li');
    
    featureItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.backgroundColor = 'rgba(0, 0, 0, 0.02)';
            this.style.padding = '8px';
            this.style.borderRadius = '8px';
            this.style.transition = 'all 0.3s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.backgroundColor = 'transparent';
            this.style.padding = '0';
        });
    });

    console.log('Education 5.0 Framework initialized successfully! 🚀');
});

/* Framework JS helpers - no external deps */

/* 1) Ensure framework links open in a new tab safely if external */
(function () {
  document.querySelectorAll('.framework-section .framework-link').forEach(function (a) {
    try {
      var url = new URL(a.href, location.href);
      if (url.origin !== location.origin) {
        a.setAttribute('rel', 'noopener noreferrer');
        a.setAttribute('target', '_blank');
      }
    } catch (e) {
      // ignore invalid URLs
    }
  });
})();

/* 2) Keyboard accessibility: allow Enter/Space to activate card when focused */
(function () {
  document.querySelectorAll('.framework-section .framework-card').forEach(function (card) {
    card.setAttribute('tabindex', '0');
    card.addEventListener('keydown', function (e) {
      var isActivation = (e.key === 'Enter' || e.key === ' ');
      if (isActivation) {
        var link = card.querySelector('.framework-link');
        if (link) {
          e.preventDefault();
          link.click();
        }
      }
    });
  });
})();

/* 3) Smooth scroll for in-page framework links that target anchors */
(function () {
  document.querySelectorAll('.framework-section a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      var id = this.getAttribute('href').slice(1);
      var target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        target.focus({ preventScroll: true });
      }
    });
  });
})();

/* 4) Reduced-motion respect: disable JS animations if user prefers reduced motion */
(function () {
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // remove transforms applied by hover styles by adding a helper class
    document.documentElement.classList.add('reduced-motion');
  }
})();


// Stories Section Functionality
function initStoriesSection() {
    // Tab functionality
    const storyTabBtns = document.querySelectorAll('.story-tab-btn');
    const storyTabContents = document.querySelectorAll('.story-tab-content');
    
    if (storyTabBtns.length === 0 || storyTabContents.length === 0) return;
    
    function switchStoryTab(tabId) {
        // Remove active class from all buttons and contents
        storyTabBtns.forEach(btn => btn.classList.remove('active'));
        storyTabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to current button and content
        const activeBtn = document.querySelector(`.story-tab-btn[data-story-tab="${tabId}"]`);
        const activeContent = document.getElementById(tabId);
        
        if (activeBtn && activeContent) {
            activeBtn.classList.add('active');
            activeContent.classList.add('active');
            
            // Update URL hash without scrolling
            if (history.pushState) {
                history.pushState(null, null, `#${tabId}`);
            }
            
            // Dispatch custom event for analytics
            window.dispatchEvent(new CustomEvent('storyTabChange', {
                detail: { tabId: tabId }
            }));
        }
    }
    
    // Click event for tab buttons
    storyTabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-story-tab');
            switchStoryTab(tabId);
        });
        
        // Keyboard navigation
        btn.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const tabId = this.getAttribute('data-story-tab');
                switchStoryTab(tabId);
            }
        });
    });
    
    // Check URL hash on load
    function checkInitialStoryTab() {
        const hash = window.location.hash.replace('#', '');
        const validTabs = ['videos', 'photos', 'testimonials'];
        
        if (validTabs.includes(hash)) {
            switchStoryTab(hash);
        }
    }
    
    checkInitialStoryTab();
    
    // Handle browser back/forward buttons
    window.addEventListener('popstate', checkInitialStoryTab);
    
    // Photo Gallery Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (filterBtns.length > 0 && galleryItems.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active class to current button
                this.classList.add('active');
                
                // Filter gallery items
                galleryItems.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
            
            // Keyboard navigation for filter buttons
            btn.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
        });
    }
    
    // Video Modal Functionality
    const videoModal = document.getElementById('videoModal');
    const modalVideo = document.getElementById('modalVideo');
    const videoClose = document.querySelector('.video-close');
    const playButtons = document.querySelectorAll('.play-button');
    
    function initVideoModal() {
        if (!videoModal || !modalVideo) return;
        
        // Open modal when play button is clicked
        playButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const videoSrc = this.getAttribute('data-video');
                if (videoSrc) {
                    modalVideo.src = videoSrc;
                    videoModal.classList.add('show');
                    document.body.style.overflow = 'hidden'; // Prevent background scrolling
                    
                    // Play video after a small delay
                    setTimeout(() => {
                        modalVideo.play().catch(e => {
                            console.log('Autoplay prevented:', e);
                        });
                    }, 300);
                }
            });
            
            // Keyboard support for play buttons
            btn.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
        });
        
        // Close modal functionality
        function closeVideoModal() {
            videoModal.classList.remove('show');
            document.body.style.overflow = ''; // Restore scrolling
            modalVideo.pause();
            modalVideo.src = '';
        }
        
        // Close modal when close button is clicked
        if (videoClose) {
            videoClose.addEventListener('click', closeVideoModal);
            videoClose.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    closeVideoModal();
                }
            });
        }
        
        // Close modal when clicking outside the video
        videoModal.addEventListener('click', function(e) {
            if (e.target === videoModal) {
                closeVideoModal();
            }
        });
        
        // Close modal with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && videoModal.classList.contains('show')) {
                closeVideoModal();
            }
        });
        
        // Handle video end
        modalVideo.addEventListener('ended', function() {
            setTimeout(closeVideoModal, 2000); // Close modal 2 seconds after video ends
        });
    }
    
    initVideoModal();
    
    // Performance Optimizations
    function optimizeStoriesPerformance() {
        // Lazy loading for images
        if ('IntersectionObserver' in window) {
            const lazyImageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        const src = img.getAttribute('data-src') || img.src;
                        
                        if (src && !img.classList.contains('loaded')) {
                            img.src = src;
                            img.classList.add('loaded');
                        }
                        
                        lazyImageObserver.unobserve(img);
                    }
                });
            });
            
            // Observe all story images
            document.querySelectorAll('.video-thumb img, .gallery-item img').forEach(img => {
                // Store original src in data-src
                if (!img.hasAttribute('data-src')) {
                    img.setAttribute('data-src', img.src);
                    img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjhmOWZhIi8+PC9zdmc+';
                }
                lazyImageObserver.observe(img);
            });
        }
        
        // Debounced resize handler
        let resizeTimeout;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                // Recalculate any layout-dependent properties
                updateStoriesLayout();
            }, 250);
        });
        
        function updateStoriesLayout() {
            // Adjust layout based on screen size if needed
            const isMobile = window.innerWidth < 768;
            
            if (isMobile) {
                document.body.classList.add('mobile-stories');
            } else {
                document.body.classList.remove('mobile-stories');
            }
        }
        
        updateStoriesLayout();
    }
    
    optimizeStoriesPerformance();
    
    // Enhanced touch interactions for mobile
    function initTouchInteractions() {
        let touchStartX = 0;
        let touchStartY = 0;
        
        document.addEventListener('touchstart', function(e) {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        }, { passive: true });
        
        document.addEventListener('touchend', function(e) {
            const touchEndX = e.changedTouches[0].clientX;
            const touchEndY = e.changedTouches[0].clientY;
            const diffX = Math.abs(touchEndX - touchStartX);
            const diffY = Math.abs(touchEndY - touchStartY);
            
            // Simple tap detection (not a swipe)
            if (diffX < 10 && diffY < 10) {
                const target = e.target;
                
                // Add touch feedback
                if (target.closest('.video-card, .gallery-item, .testimonial-card')) {
                    const element = target.closest('.video-card, .gallery-item, .testimonial-card');
                    element.classList.add('touch-feedback');
                    setTimeout(() => {
                        element.classList.remove('touch-feedback');
                    }, 200);
                }
            }
        }, { passive: true });
    }
    
    initTouchInteractions();
    
    // Analytics and tracking (optional)
    function initStoriesAnalytics() {
        // Track video plays
        playButtons.forEach((btn, index) => {
            btn.addEventListener('click', function() {
                const videoTitle = this.closest('.video-card').querySelector('h4').textContent;
                console.log('Video played:', videoTitle, 'Index:', index);
                // Add your analytics tracking here
            });
        });
        
        // Track tab changes
        window.addEventListener('storyTabChange', function(e) {
            console.log('Stories tab changed to:', e.detail.tabId);
            // Add your analytics tracking here
        });
    }
    
    initStoriesAnalytics();
}

// Initialize stories section when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initStoriesSection();
});

// Additional CSS for touch feedback (add to body-styles.css)
const storiesAdditionalCSS = `
.touch-feedback {
    transform: scale(0.98) !important;
    transition: transform 0.1s ease !important;
}

/* Loading states */
.video-thumb img:not(.loaded),
.gallery-item img:not(.loaded) {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: loading 1.5s infinite;
}

@keyframes loading {
    0% {
        background-position: 200% 0;
    }
    100% {
        background-position: -200% 0;
    }
}

/* Focus improvements */
.video-card:focus-within,
.gallery-item:focus-within,
.testimonial-card:focus-within {
    outline: 3px solid rgba(102, 126, 234, 0.3);
    outline-offset: 3px;
}

/* High contrast mode */
@media (prefers-contrast: high) {
    .video-card,
    .gallery-item,
    .testimonial-card {
        border: 2px solid #000;
    }
    
    .story-tab-btn,
    .filter-btn {
        border: 2px solid #000;
    }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
    .stories-section {
        background: #1a202c;
    }
    
    .video-card,
    .testimonial-card,
    .story-tab-btn,
    .filter-btn {
        background: #2d3748;
        border-color: #4a5568;
        color: #e2e8f0;
    }
    
    .video-info h4,
    .testimonial-info h4 {
        color: white;
    }
    
    .video-info p,
    .testimonial-text {
        color: #cbd5e0;
    }
    
    .gallery-overlay {
        background: linear-gradient(to top, rgba(0, 0, 0, 0.95), transparent);
    }
}
`;

// Inject additional CSS
(function() {
    const style = document.createElement('style');
    style.textContent = storiesAdditionalCSS;
    document.head.appendChild(style);
})();

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initStoriesSection };
}


// Get Involved Section Functionality
function initGetInvolvedSection() {
    const involvedCards = document.querySelectorAll('.involved-card');
    const involvedGrid = document.querySelector('.involved-grid');
    
    if (involvedCards.length === 0) return;
    
    // Add intersection observer for scroll animations
    if ('IntersectionObserver' in window) {
        const involvedObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                    involvedObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        involvedCards.forEach(card => {
            card.style.animationPlayState = 'paused';
            involvedObserver.observe(card);
        });
    }
    
    // Enhanced card interactions
    involvedCards.forEach((card, index) => {
        // Mouse move parallax effect
        card.addEventListener('mousemove', function(e) {
            if (window.matchMedia('(hover: hover)').matches) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateY = (x - centerX) / 20;
                const rotateX = (centerY - y) / 20;
                
                this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(-10px)';
        });
        
        // Touch device optimizations
        card.addEventListener('touchstart', function() {
            this.classList.add('involved-touched');
        });
        
        card.addEventListener('touchend', function() {
            setTimeout(() => {
                this.classList.remove('involved-touched');
            }, 150);
        });
        
        // Click animation
        card.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') return; // Don't animate if clicking a link
            
            this.style.transform = 'scale(0.98) translateY(-10px)';
            setTimeout(() => {
                this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(-10px)';
            }, 150);
        });
        
        // Keyboard navigation
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const link = this.querySelector('a.btn');
                if (link) {
                    link.click();
                }
            }
        });
        
        // Add data attribute for tracking
        card.setAttribute('data-involvement-type', getInvolvementType(card));
    });
    
    // Helper function to get involvement type
    function getInvolvementType(card) {
        const icon = card.querySelector('i');
        if (icon) {
            const iconClass = icon.className;
            if (iconClass.includes('chalkboard-teacher')) return 'mentor';
            if (iconClass.includes('users')) return 'facilitator';
            if (iconClass.includes('donate')) return 'financial';
            if (iconClass.includes('laptop-code')) return 'technology';
            if (iconClass.includes('bullhorn')) return 'ambassador';
            if (iconClass.includes('hand-holding-heart')) return 'volunteer';
        }
        return 'general';
    }
    
    // Performance monitoring
    let cardHoverCount = 0;
    involvedCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            cardHoverCount++;
            if (cardHoverCount > 8) {
                // Reduce animation intensity for performance
                card.style.willChange = 'auto';
            }
        });
    });
    
    // Lazy loading for images
    function optimizeInvolvedImages() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        const src = img.getAttribute('data-src') || img.src;
                        
                        if (src && !img.classList.contains('loaded')) {
                            img.src = src;
                            img.classList.add('loaded');
                        }
                        
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            // Observe all involved card images
            document.querySelectorAll('.involved-image img').forEach(img => {
                // Store original src in data-src
                if (!img.hasAttribute('data-src')) {
                    img.setAttribute('data-src', img.src);
                    img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjhmOWZhIi8+PC9zdmc+';
                }
                imageObserver.observe(img);
            });
        }
    }
    
    optimizeInvolvedImages();
    
    // Analytics tracking for involvement clicks
    function initInvolvedAnalytics() {
        involvedCards.forEach(card => {
            const link = card.querySelector('a.btn');
            if (link) {
                link.addEventListener('click', function(e) {
                    const involvementType = card.getAttribute('data-involvement-type');
                    const linkText = this.textContent.trim();
                    
                    // Track involvement interest
                    console.log('Involvement interest:', {
                        type: involvementType,
                        action: linkText,
                        timestamp: new Date().toISOString()
                    });
                    
                    // You can integrate with your analytics service here
                    // Example: gtag('event', 'involvement_click', { ... });
                });
            }
        });
    }
    
    initInvolvedAnalytics();
    
    // External link handling for GitHub card
    const githubLink = document.querySelector('a[href*="github.com"]');
    if (githubLink) {
        githubLink.addEventListener('click', function(e) {
            // Track GitHub clicks separately
            console.log('GitHub contribution link clicked');
            
            // You might want to open in new tab with specific dimensions
            // or track this differently in your analytics
        });
    }
    
    // Performance optimization for resize events
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            updateInvolvedLayout();
        }, 250);
    });
    
    function updateInvolvedLayout() {
        const isMobile = window.innerWidth < 768;
        
        if (isMobile) {
            document.body.classList.add('mobile-involved');
        } else {
            document.body.classList.remove('mobile-involved');
        }
    }
    
    updateInvolvedLayout();
    
    // Export analytics event for external use
    window.addEventListener('involvementCardClick', function(e) {
        // Can be used for external analytics integration
        console.log('Involvement card interaction:', e.detail);
    });
}

// Initialize get involved section when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initGetInvolvedSection();
});

// Additional CSS for enhanced features (add to body-styles.css)
const involvedAdditionalCSS = `
/* Enhanced touch styles */
.involved-card.involved-touched {
    transform: scale(0.98) !important;
    transition: transform 0.1s ease !important;
}

/* Loading states for images */
.involved-image img:not(.loaded) {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: loading 1.5s infinite;
}

@keyframes loading {
    0% {
        background-position: 200% 0;
    }
    100% {
        background-position: -200% 0;
    }
}

/* Focus improvements */
.involved-card:focus-within {
    outline: 3px solid rgba(102, 126, 234, 0.3);
    outline-offset: 3px;
}

/* Performance optimization */
.involved-card {
    will-change: transform;
}

/* Mobile-specific optimizations */
.mobile-involved .involved-card {
    transform: none !important;
}

.mobile-involved .involved-card:hover {
    transform: translateY(-5px) !important;
}

/* High contrast mode improvements */
@media (prefers-contrast: high) {
    .involved-card {
        border: 3px solid #000;
    }
    
    .involved-card:hover {
        border-color: var(--primary-color);
    }
    
    .involved-card li::before {
        font-weight: 900;
        color: #000;
    }
}

/* Print optimizations */
@media print {
    .involved-card .btn {
        display: none;
    }
    
    .involved-card::after {
        content: 'Learn more at: onc-education.org/get-involved';
        display: block;
        text-align: center;
        margin-top: 15px;
        color: var(--primary-color);
        font-weight: 600;
    }
}

/* Reduced data mode support */
@media (prefers-reduced-data: reduce) {
    .involved-image img {
        display: none;
    }
    
    .involved-image {
        height: 100px;
        background: var(--gradient-primary);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: 600;
    }
    
    .involved-image::after {
        content: 'Get Involved';
        font-size: 1.2rem;
    }
}
`;

// Inject additional CSS
(function() {
    const style = document.createElement('style');
    style.textContent = involvedAdditionalCSS;
    document.head.appendChild(style);
})();

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initGetInvolvedSection };
}


// Contact Section Functionality
function initContactSection() {
    const contactForm = document.getElementById('contactForm');
    const formGroups = document.querySelectorAll('.form-group');
    
    if (!contactForm) return;
    
    // Form validation rules
    const validationRules = {
        name: {
            required: true,
            minLength: 2,
            maxLength: 50,
            pattern: /^[a-zA-Z\s]*$/,
            message: 'Please enter a valid name (letters and spaces only)'
        },
        email: {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Please enter a valid email address'
        },
        subject: {
            required: true,
            minLength: 5,
            maxLength: 100,
            message: 'Subject must be between 5 and 100 characters'
        },
        message: {
            required: true,
            minLength: 10,
            maxLength: 1000,
            message: 'Message must be between 10 and 1000 characters'
        }
    };
    
    // Real-time validation
    function initRealTimeValidation() {
        formGroups.forEach(group => {
            const input = group.querySelector('input, textarea');
            if (!input) return;
            
            const fieldName = input.name;
            const rules = validationRules[fieldName];
            
            if (!rules) return;
            
            // Input event for real-time validation
            input.addEventListener('input', function() {
                validateField(this, rules);
            });
            
            // Blur event for final validation
            input.addEventListener('blur', function() {
                validateField(this, rules);
            });
            
            // Focus event to clear errors
            input.addEventListener('focus', function() {
                clearFieldError(this);
            });
        });
    }
    
    // Validate individual field
    function validateField(field, rules) {
        const value = field.value.trim();
        const fieldName = field.name;
        const formGroup = field.closest('.form-group');
        
        // Clear previous error
        clearFieldError(field);
        
        // Check required field
        if (rules.required && !value) {
            showFieldError(field, 'This field is required');
            return false;
        }
        
        // Check min length
        if (rules.minLength && value.length < rules.minLength) {
            showFieldError(field, `Minimum ${rules.minLength} characters required`);
            return false;
        }
        
        // Check max length
        if (rules.maxLength && value.length > rules.maxLength) {
            showFieldError(field, `Maximum ${rules.maxLength} characters allowed`);
            return false;
        }
        
        // Check pattern
        if (rules.pattern && !rules.pattern.test(value)) {
            showFieldError(field, rules.message);
            return false;
        }
        
        // Mark as valid
        formGroup.classList.remove('error');
        formGroup.classList.add('success');
        return true;
    }
    
    // Show field error
    function showFieldError(field, message) {
        const formGroup = field.closest('.form-group');
        let errorElement = formGroup.querySelector('.error-message');
        
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            formGroup.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
        formGroup.classList.remove('success');
        formGroup.classList.add('error');
    }
    
    // Clear field error
    function clearFieldError(field) {
        const formGroup = field.closest('.form-group');
        formGroup.classList.remove('error', 'success');
        
        const errorElement = formGroup.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
    }
    
    // Validate entire form
    function validateForm(formData) {
        let isValid = true;
        
        formGroups.forEach(group => {
            const input = group.querySelector('input, textarea');
            if (!input) return;
            
            const fieldName = input.name;
            const rules = validationRules[fieldName];
            
            if (rules && !validateField(input, rules)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    // Form submission handler
    function handleFormSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const formValues = Object.fromEntries(formData.entries());
        
        // Validate form
        if (!validateForm(formValues)) {
            showFormFeedback('Please fix the errors above', 'error');
            return;
        }
        
        // Show loading state
        setFormLoading(true);
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            submitFormData(formValues);
        }, 1500);
    }
    
    // Submit form data (replace with actual API endpoint)
    function submitFormData(data) {
        // Here you would typically send data to your server
        // For demonstration, we'll simulate a successful submission
        
        const success = Math.random() > 0.2; // 80% success rate for demo
        
        setFormLoading(false);
        
        if (success) {
            showFormFeedback('Thank you! Your message has been sent successfully. We\'ll get back to you soon.', 'success');
            contactForm.reset();
            clearAllFieldErrors();
            
            // Track successful submission
            trackFormSubmission(data, true);
        } else {
            showFormFeedback('Sorry, there was an error sending your message. Please try again later.', 'error');
            
            // Track failed submission
            trackFormSubmission(data, false);
        }
    }
    
    // Show form feedback message
    function showFormFeedback(message, type) {
        // Remove existing feedback
        const existingFeedback = contactForm.querySelector('.form-feedback');
        if (existingFeedback) {
            existingFeedback.remove();
        }
        
        // Create new feedback element
        const feedback = document.createElement('div');
        feedback.className = `form-feedback ${type}`;
        feedback.textContent = message;
        
        // Insert at the beginning of the form
        contactForm.insertBefore(feedback, contactForm.firstChild);
        
        // Auto-remove success message after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                feedback.remove();
            }, 5000);
        }
    }
    
    // Set form loading state
    function setFormLoading(loading) {
        if (loading) {
            contactForm.classList.add('loading');
        } else {
            contactForm.classList.remove('loading');
        }
    }
    
    // Clear all field errors
    function clearAllFieldErrors() {
        formGroups.forEach(group => {
            group.classList.remove('error', 'success');
            const errorElement = group.querySelector('.error-message');
            if (errorElement) {
                errorElement.remove();
            }
        });
    }
    
    // Track form submission for analytics
    function trackFormSubmission(data, success) {
        console.log('Form submission:', {
            success: success,
            data: {
                name: data.name,
                email: data.email,
                subject: data.subject,
                message_length: data.message.length
            },
            timestamp: new Date().toISOString()
        });
        
        // You can integrate with your analytics service here
        // Example: gtag('event', 'contact_form_submission', { ... });
    }
    
    // Performance optimizations
    function optimizeContactPerformance() {
        // Debounced form validation for performance
        let validateTimeout;
        
        contactForm.addEventListener('input', function(e) {
            clearTimeout(validateTimeout);
            validateTimeout = setTimeout(() => {
                const field = e.target;
                const fieldName = field.name;
                const rules = validationRules[fieldName];
                
                if (rules && field.value.trim().length > 0) {
                    validateField(field, rules);
                }
            }, 300);
        });
        
        // Lazy load contact form functionality
        if ('IntersectionObserver' in window) {
            const contactObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Form becomes visible, ensure all functionality is ready
                        initRealTimeValidation();
                        contactObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });
            
            contactObserver.observe(contactForm);
        } else {
            // Fallback: initialize immediately
            initRealTimeValidation();
        }
    }
    
    // Initialize contact section
    function init() {
        contactForm.addEventListener('submit', handleFormSubmit);
        optimizeContactPerformance();
        
        // Add keyboard shortcuts
        document.addEventListener('keydown', function(e) {
            // Ctrl + Enter to submit form
            if (e.ctrlKey && e.key === 'Enter') {
                if (document.activeElement.closest('#contactForm')) {
                    contactForm.requestSubmit();
                }
            }
        });
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
}

// Initialize contact section
initContactSection();

// Additional CSS for enhanced features (add to body-styles.css)
const contactAdditionalCSS = `
/* Enhanced focus styles */
.form-group input:focus:invalid,
.form-group textarea:focus:invalid {
    border-color: var(--danger-color);
    box-shadow: 0 0 0 3px rgba(244, 67, 54, 0.1);
}

.form-group input:focus:valid,
.form-group textarea:focus:valid {
    border-color: var(--success-color);
    box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
}

/* Character counter for message field */
.form-group textarea {
    position: relative;
}

.char-counter {
    position: absolute;
    bottom: 10px;
    right: 15px;
    font-size: 0.8rem;
    color: var(--text-light);
    background: white;
    padding: 2px 6px;
    border-radius: 10px;
    pointer-events: none;
}

.char-counter.warning {
    color: var(--warning-color);
}

.char-counter.error {
    color: var(--danger-color);
}

/* Auto-save indicator */
.auto-save-indicator {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 0.8rem;
    color: var(--success-color);
    opacity: 0;
    transition: opacity 0.3s ease;
}

.auto-save-indicator.show {
    opacity: 1;
}

/* Print optimizations */
@media print {
    .contact-form .form-feedback {
        display: none !important;
    }
    
    .contact-item a::after {
        content: ' (' attr(href) ')';
        font-size: 0.9em;
        color: var(--text-light);
    }
}

/* Reduced data mode */
@media (prefers-reduced-data: reduce) {
    .contact-section::before {
        display: none;
    }
}

/* Mobile performance optimizations */
@media (max-width: 768px) {
    .contact-form {
        transform: translateZ(0);
    }
    
    .form-group input,
    .form-group textarea {
        font-size: 16px; /* Prevents zoom on iOS */
    }
}
`;

// Inject additional CSS
(function() {
    const style = document.createElement('style');
    style.textContent = contactAdditionalCSS;
    document.head.appendChild(style);
})();

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initContactSection };
}

