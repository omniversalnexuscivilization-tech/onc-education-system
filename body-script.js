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

