// ===================================
// GLOBAL SCRIPTS - ONC Education 5.0
// Core functionality and utilities
// ===================================

// === UTILITY FUNCTIONS ===
const Utils = {
  // Debounce function for performance
  debounce: (func, wait = 300) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Throttle function for scroll events
  throttle: (func, limit = 100) => {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },

  // Check if element is in viewport
  isInViewport: (element) => {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  },

  // Smooth scroll to element
  smoothScrollTo: (element, offset = 80) => {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

// === NAVBAR FUNCTIONALITY ===
const Navbar = {
  init: () => {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    // Toggle mobile menu
    if (navToggle) {
      navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
      });
    }

    // Close menu on link click
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        
        // Only handle internal links
        if (href && href.startsWith('#')) {
          e.preventDefault();
          const target = document.querySelector(href);
          
          if (target) {
            Utils.smoothScrollTo(target);
          }
          
          // Close mobile menu
          if (navToggle && navMenu) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
          }
        }
      });
    });

    // Navbar scroll effect
    const handleScroll = Utils.throttle(() => {
      if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }, 100);

    window.addEventListener('scroll', handleScroll);

    // Close menu on outside click
    document.addEventListener('click', (e) => {
      if (navMenu && navToggle && 
          !navMenu.contains(e.target) && 
          !navToggle.contains(e.target) &&
          navMenu.classList.contains('active')) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }
};

// === BACK TO TOP BUTTON ===
const BackToTop = {
  init: () => {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (!backToTopBtn) return;

    const handleScroll = Utils.throttle(() => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }, 100);

    window.addEventListener('scroll', handleScroll);

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
};

// === LAZY LOADING ===
const LazyLoad = {
  init: () => {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.classList.add('loaded');
            observer.unobserve(img);
          }
        });
      }, {
        rootMargin: '50px'
      });

      lazyImages.forEach(img => {
        img.classList.add('lazy-load');
        imageObserver.observe(img);
      });
    } else {
      // Fallback for browsers without IntersectionObserver
      lazyImages.forEach(img => {
        img.classList.add('loaded');
      });
    }
  }
};

// === SCROLL ANIMATIONS ===
const ScrollAnimations = {
  init: () => {
    const animatedElements = document.querySelectorAll(
      '.card, .mission-card, .philosophy-card, .framework-card, .initiative-card'
    );

    if ('IntersectionObserver' in window) {
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
              entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'translateY(0)';
            }, 100);
            
            observer.unobserve(entry.target);
          }
        });
      }, observerOptions);

      animatedElements.forEach(el => {
        observer.observe(el);
      });
    }
  }
};

// === COUNTER ANIMATION ===
const CounterAnimation = {
  init: () => {
    const counters = document.querySelectorAll('.stat-number');
    
    if (counters.length === 0) return;

    const animateCounter = (counter) => {
      const target = parseInt(counter.getAttribute('data-target'));
      const duration = 2000;
      const step = target / (duration / 16);
      let current = 0;

      const updateCounter = () => {
        current += step;
        if (current < target) {
          counter.textContent = Math.floor(current);
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target;
        }
      };

      updateCounter();
    };

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });

      counters.forEach(counter => observer.observe(counter));
    } else {
      counters.forEach(counter => animateCounter(counter));
    }
  }
};

// === FORM VALIDATION ===
const FormValidation = {
  init: () => {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;

        inputs.forEach(input => {
          if (!input.value.trim()) {
            isValid = false;
            input.style.borderColor = '#ef4444';
          } else {
            input.style.borderColor = '';
          }
        });

        if (isValid) {
          // Show success message
          const btn = form.querySelector('button[type="submit"]');
          const originalText = btn.innerHTML;
          btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
          btn.style.background = '#10b981';
          
          setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
            form.reset();
          }, 3000);
        }
      });

      // Remove error styling on input
      const inputs = form.querySelectorAll('input, textarea');
      inputs.forEach(input => {
        input.addEventListener('input', () => {
          input.style.borderColor = '';
        });
      });
    });
  }
};

// === PERFORMANCE OPTIMIZATION ===
const Performance = {
  init: () => {
    // Defer non-critical CSS
    const deferredStyles = document.querySelectorAll('link[rel="stylesheet"][media="print"]');
    deferredStyles.forEach(link => {
      link.media = 'all';
    });

    // Preload critical resources
    const criticalImages = document.querySelectorAll('img[data-preload]');
    criticalImages.forEach(img => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = img.src;
      document.head.appendChild(link);
    });

    // Log performance metrics (for development)
    if (window.performance && console.table) {
      const perfData = window.performance.timing;
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
      const domReadyTime = perfData.domContentLoadedEventEnd - perfData.navigationStart;
      
      console.log('Performance Metrics:', {
        'Page Load Time': `${pageLoadTime}ms`,
        'DOM Ready Time': `${domReadyTime}ms`
      });
    }
  }
};

// === ACCESSIBILITY ENHANCEMENTS ===
const Accessibility = {
  init: () => {
    // Add skip to content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'sr-only';
    skipLink.textContent = 'Skip to main content';
    skipLink.style.cssText = `
      position: absolute;
      top: -40px;
      left: 0;
      background: var(--primary-purple);
      color: white;
      padding: 8px;
      text-decoration: none;
      z-index: 100;
    `;
    skipLink.addEventListener('focus', function() {
      this.style.top = '0';
    });
    skipLink.addEventListener('blur', function() {
      this.style.top = '-40px';
    });
    document.body.insertBefore(skipLink, document.body.firstChild);

    // Keyboard navigation for cards
    const interactiveCards = document.querySelectorAll('.card, .mission-card, .initiative-card');
    interactiveCards.forEach(card => {
      if (!card.hasAttribute('tabindex')) {
        card.setAttribute('tabindex', '0');
      }
    });

    // Announce dynamic content changes to screen readers
    const createAriaLive = () => {
      const liveRegion = document.createElement('div');
      liveRegion.setAttribute('aria-live', 'polite');
      liveRegion.setAttribute('aria-atomic', 'true');
      liveRegion.className = 'sr-only';
      liveRegion.id = 'aria-live-region';
      document.body.appendChild(liveRegion);
    };

    createAriaLive();
  },

  announce: (message) => {
    const liveRegion = document.getElementById('aria-live-region');
    if (liveRegion) {
      liveRegion.textContent = message;
      setTimeout(() => {
        liveRegion.textContent = '';
      }, 1000);
    }
  }
};

// === ERROR HANDLING ===
window.addEventListener('error', (e) => {
  console.error('Global error:', e.error);
  // You can add error reporting service here
});

window.addEventListener('unhandledrejection', (e) => {
  console.error('Unhandled promise rejection:', e.reason);
  // You can add error reporting service here
});

// === INITIALIZATION ===
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 ONC Education 5.0 - Initializing...');
  
  try {
    Navbar.init();
    BackToTop.init();
    LazyLoad.init();
    ScrollAnimations.init();
    CounterAnimation.init();
    FormValidation.init();
    Accessibility.init();
    Performance.init();
    
    console.log('✅ ONC Education 5.0 - Ready!');
  } catch (error) {
    console.error('❌ Initialization error:', error);
  }
});

// === PAGE VISIBILITY API ===
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    console.log('Page is now hidden');
  } else {
    console.log('Page is now visible');
  }
});

// === EXPORT FOR MODULE USAGE ===
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    Utils,
    Navbar,
    BackToTop,
    LazyLoad,
    ScrollAnimations,
    CounterAnimation,
    FormValidation,
    Performance,
    Accessibility
  };
}
