// ===================================
// BODY SCRIPTS - ONC Education 5.0
// Page-specific functionality
// ===================================

// === TAB SYSTEM (Curriculum & Stories) ===
const TabSystem = {
  init: () => {
    // Curriculum tabs
    const curriculumTabs = document.querySelectorAll('.curriculum-tabs .tab-btn');
    const curriculumContents = document.querySelectorAll('.curriculum-content .tab-content');

    curriculumTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetTab = tab.getAttribute('data-tab');
        
        // Remove active class from all tabs and contents
        curriculumTabs.forEach(t => t.classList.remove('active'));
        curriculumContents.forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked tab and corresponding content
        tab.classList.add('active');
        const targetContent = document.getElementById(targetTab);
        if (targetContent) {
          targetContent.classList.add('active');
        }
      });
    });

    // Story tabs
    const storyTabs = document.querySelectorAll('.stories-tabs .story-tab-btn');
    const storyContents = document.querySelectorAll('.stories-section .story-tab-content');

    storyTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetTab = tab.getAttribute('data-story-tab');
        
        // Remove active class from all tabs and contents
        storyTabs.forEach(t => t.classList.remove('active'));
        storyContents.forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked tab and corresponding content
        tab.classList.add('active');
        const targetContent = document.getElementById(targetTab);
        if (targetContent) {
          targetContent.classList.add('active');
        }
      });
    });
  }
};

// === VIDEO MODAL ===
const VideoModal = {
  init: () => {
    const modal = document.getElementById('videoModal');
    const modalVideo = document.getElementById('modalVideo');
    const closeBtn = document.querySelector('.video-close');
    const playButtons = document.querySelectorAll('.play-button');

    if (!modal || !modalVideo) return;

    // Open modal and play video
    playButtons.forEach(button => {
      button.addEventListener('click', () => {
        const videoSrc = button.getAttribute('data-video');
        
        if (videoSrc) {
          modalVideo.src = `assets/videos/${videoSrc}`;
          modal.classList.add('active');
          document.body.style.overflow = 'hidden';
          modalVideo.play();
        }
      });
    });

    // Close modal
    const closeModal = () => {
      modal.classList.remove('active');
      modalVideo.pause();
      modalVideo.src = '';
      document.body.style.overflow = '';
    };

    if (closeBtn) {
      closeBtn.addEventListener('click', closeModal);
    }

    // Close on outside click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });

    // Close on ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
      }
    });
  }
};

// === PHOTO GALLERY FILTER ===
const GalleryFilter = {
  init: () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (filterButtons.length === 0) return;

    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Filter gallery items
        galleryItems.forEach(item => {
          const category = item.getAttribute('data-category');
          
          if (filter === 'all' || category === filter) {
            item.style.display = 'block';
            item.style.animation = 'fadeIn 0.5s ease-out';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }
};

// === LIGHTBOX FOR GALLERY ===
const Lightbox = {
  init: () => {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (galleryItems.length === 0) return;

    // Create lightbox element
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.95);
      display: none;
      align-items: center;
      justify-content: center;
      z-index: 2000;
      padding: 2rem;
    `;

    const lightboxImg = document.createElement('img');
    lightboxImg.style.cssText = `
      max-width: 90%;
      max-height: 90%;
      object-fit: contain;
      border-radius: 8px;
    `;

    const closeBtn = document.createElement('span');
    closeBtn.innerHTML = '&times;';
    closeBtn.style.cssText = `
      position: absolute;
      top: 2rem;
      right: 2rem;
      color: white;
      font-size: 3rem;
      cursor: pointer;
      transition: color 0.3s;
    `;
    closeBtn.addEventListener('mouseenter', () => closeBtn.style.color = '#8b5cf6');
    closeBtn.addEventListener('mouseleave', () => closeBtn.style.color = 'white');

    lightbox.appendChild(lightboxImg);
    lightbox.appendChild(closeBtn);
    document.body.appendChild(lightbox);

    // Open lightbox
    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        const img = item.querySelector('img');
        if (img) {
          lightboxImg.src = img.src;
          lightbox.style.display = 'flex';
          document.body.style.overflow = 'hidden';
        }
      });
    });

    // Close lightbox
    const closeLightbox = () => {
      lightbox.style.display = 'none';
      document.body.style.overflow = '';
    };

    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.style.display === 'flex') {
        closeLightbox();
      }
    });
  }
};

// === DONATE BUTTON HANDLER ===
const DonateButton = {
  init: () => {
    const donateButtons = document.querySelectorAll('.donate-btn');
    
    donateButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Show donation modal or redirect
        alert('Thank you for your interest in supporting ONC Education! Donation portal opening soon.');
        
        // In production, redirect to payment gateway or show donation modal
        // window.location.href = 'donate.html';
      });
    });
  }
};

// === SCROLL PROGRESS INDICATOR ===
const ScrollProgress = {
  init: () => {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      height: 4px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      z-index: 9999;
      transition: width 0.1s ease;
      width: 0%;
    `;
    document.body.appendChild(progressBar);

    const updateProgress = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      progressBar.style.width = scrolled + '%';
    };

    window.addEventListener('scroll', updateProgress);
  }
};

// === HERO PARALLAX EFFECT ===
const HeroParallax = {
  init: () => {
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    const heroImages = document.querySelectorAll('.hero-image-left, .hero-image-right');

    if (!hero) return;

    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const limit = hero.offsetHeight;

      if (scrolled <= limit) {
        if (heroContent) {
          heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
          heroContent.style.opacity = 1 - (scrolled / limit) * 0.5;
        }

        heroImages.forEach((img, index) => {
          const direction = index === 0 ? -1 : 1;
          img.style.transform = `translateY(${scrolled * 0.2 * direction}px)`;
          img.style.opacity = 1 - (scrolled / limit) * 0.7;
        });
      }
    });
  }
};

// === TESTIMONIAL CAROUSEL (Optional Enhancement) ===
const TestimonialCarousel = {
  init: () => {
    const testimonials = document.querySelectorAll('.testimonial-card');
    
    if (testimonials.length === 0) return;

    let currentIndex = 0;

    // Add data attributes for tracking
    testimonials.forEach((card, index) => {
      card.setAttribute('data-index', index);
    });

    // Auto-rotate testimonials (optional)
    // setInterval(() => {
    //   currentIndex = (currentIndex + 1) % testimonials.length;
    //   // Add rotation logic here if needed
    // }, 5000);
  }
};

// === FRAMEWORK CARD INTERACTION ===
const FrameworkCards = {
  init: () => {
    const frameworkCards = document.querySelectorAll('.framework-card');
    
    frameworkCards.forEach((card, index) => {
      // Stagger animation on scroll
      card.style.transitionDelay = `${index * 0.1}s`;
      
      // Add click event for mobile
      card.addEventListener('click', function(e) {
        // If clicking on a link, don't do anything
        if (e.target.tagName === 'A') return;
        
        // Toggle expanded state on mobile
        if (window.innerWidth < 768) {
          this.classList.toggle('expanded');
        }
      });
    });
  }
};

// === MISSION CARD HOVER EFFECT ===
const MissionCards = {
  init: () => {
    const missionCards = document.querySelectorAll('.mission-card');
    
    missionCards.forEach(card => {
      card.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.mission-icon');
        if (icon) {
          icon.style.transform = 'scale(1.1) rotate(5deg)';
        }
      });
      
      card.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.mission-icon');
        if (icon) {
          icon.style.transform = 'scale(1) rotate(0deg)';
        }
      });
    });
  }
};

// === CONTACT FORM ENHANCEMENT ===
const ContactForm = {
  init: () => {
    const form = document.getElementById('contactForm');
    
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const formData = new FormData(form);
      const data = Object.fromEntries(formData);
      
      console.log('Form submitted:', data);
      
      // Show loading state
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      
      // Simulate API call
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
        
        form.reset();
        
        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.style.background = '';
        }, 3000);
      }, 2000);
      
      // In production, replace with actual API call:
      // try {
      //   const response = await fetch('/api/contact', {
      //     method: 'POST',
      //     headers: { 'Content-Type': 'application/json' },
      //     body: JSON.stringify(data)
      //   });
      //   // Handle response
      // } catch (error) {
      //   console.error('Error:', error);
      // }
    });
  }
};

// === SEARCH FUNCTIONALITY (If needed) ===
const Search = {
  init: () => {
    const searchBtn = document.querySelector('.search-btn');
    const searchInput = document.querySelector('.search-input');
    
    if (!searchBtn || !searchInput) return;

    searchBtn.addEventListener('click', () => {
      const query = searchInput.value.trim();
      if (query) {
        console.log('Searching for:', query);
        // Implement search logic here
      }
    });

    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        searchBtn.click();
      }
    });
  }
};

// === NOTIFICATION SYSTEM ===
const Notifications = {
  show: (message, type = 'info', duration = 3000) => {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
      position: fixed;
      top: 100px;
      right: 20px;
      background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#6b46c1'};
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 8px;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
      z-index: 10000;
      animation: slideInRight 0.3s ease-out;
      max-width: 300px;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.animation = 'slideOutRight 0.3s ease-out';
      setTimeout(() => notification.remove(), 300);
    }, duration);
  }
};

// === ANALYTICS TRACKING (Placeholder) ===
const Analytics = {
  init: () => {
    // Track page views
    console.log('Page view tracked:', window.location.pathname);
    
    // Track button clicks
    document.querySelectorAll('.btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const btnText = e.target.textContent.trim();
        console.log('Button clicked:', btnText);
        // Send to analytics service
      });
    });
  },
  
  trackEvent: (category, action, label) => {
    console.log('Event tracked:', { category, action, label });
    // In production, send to Google Analytics, Mixpanel, etc.
  }
};

// === INITIALIZATION ===
document.addEventListener('DOMContentLoaded', () => {
  console.log('📊 Body scripts initializing...');
  
  try {
    TabSystem.init();
    VideoModal.init();
    GalleryFilter.init();
    Lightbox.init();
    DonateButton.init();
    ScrollProgress.init();
    HeroParallax.init();
    TestimonialCarousel.init();
    FrameworkCards.init();
    MissionCards.init();
    ContactForm.init();
    Search.init();
    Analytics.init();
    
    console.log('✅ Body scripts ready!');
  } catch (error) {
    console.error('❌ Body scripts error:', error);
  }
});

// === WINDOW LOAD EVENT ===
window.addEventListener('load', () => {
  console.log('🎉 Page fully loaded!');
  
  // Remove any loading screens
  const loader = document.querySelector('.page-loader');
  if (loader) {
    loader.style.opacity = '0';
    setTimeout(() => loader.remove(), 300);
  }
});

// === EXPORT FOR MODULE USAGE ===
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    TabSystem,
    VideoModal,
    GalleryFilter,
    Lightbox,
    DonateButton,
    ScrollProgress,
    HeroParallax,
    TestimonialCarousel,
    FrameworkCards,
    MissionCards,
    ContactForm,
    Search,
    Notifications,
    Analytics
  };
}
