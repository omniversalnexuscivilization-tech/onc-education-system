/* ============================================
   MAIN JAVASCRIPT - Global Functions & Controls
   ============================================ */

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  initializeNavigation();
  initializeScrollBehavior();
  highlightActiveLink();
});

// ============================================
// NAVIGATION MANAGEMENT
// ============================================

function initializeNavigation() {
  const menuBtn = document.querySelector('.menu-btn');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileLinks = document.querySelectorAll('.mobile-nav a');

  if (menuBtn && mobileNav) {
    // Toggle mobile menu on button click
    menuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      mobileNav.classList.toggle('active');
    });

    // Close menu when clicking on a link
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('active');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.header')) {
        mobileNav.classList.remove('active');
      }
    });

    // Close menu on window resize
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        mobileNav.classList.remove('active');
      }
    });
  }
}

// ============================================
// HIGHLIGHT ACTIVE NAVIGATION LINK
// ============================================

function highlightActiveLink() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav a, .mobile-nav a');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');

    // Check if link matches current path
    if (currentPath.includes(href) || 
        (currentPath.endsWith('/') && href === 'index.html') ||
        currentPath.includes(href.replace('.html', ''))) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// ============================================
// SMOOTH SCROLL BEHAVIOR
// ============================================

function initializeScrollBehavior() {
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#' && document.querySelector(href)) {
        e.preventDefault();
        const target = document.querySelector(href);
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Detect if element is in viewport
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.bottom >= 0
  );
}

// Animate number counter
function animateCounter(element, target, duration = 2000) {
  if (!element) return;

  const startValue = 0;
  const startTime = Date.now();

  const counter = setInterval(() => {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const current = Math.floor(progress * target);

    element.textContent = current;

    if (progress === 1) {
      clearInterval(counter);
    }
  }, 50);
}

// Add scroll animation to elements
function observeElements() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  document.querySelectorAll('.card, .objective-card, .pillar-card, .component-card').forEach(el => {
    observer.observe(el);
  });
}

// Call animation observer when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', observeElements);
} else {
  observeElements();
}

// ============================================
// SEARCH & FILTER FUNCTIONALITY
// ============================================

function filterContent(searchTerm, containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  const items = container.querySelectorAll('[data-searchable]');
  const term = searchTerm.toLowerCase();

  items.forEach(item => {
    const text = item.textContent.toLowerCase();
    item.style.display = text.includes(term) ? '' : 'none';
  });
}

// ============================================
// FORM VALIDATION
// ============================================

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validateForm(formSelector) {
  const form = document.querySelector(formSelector);
  if (!form) return false;

  let isValid = true;
  const inputs = form.querySelectorAll('input, textarea, select');

  inputs.forEach(input => {
    if (input.hasAttribute('required') && !input.value.trim()) {
      input.classList.add('error');
      isValid = false;
    } else if (input.type === 'email' && !validateEmail(input.value)) {
      input.classList.add('error');
      isValid = false;
    } else {
      input.classList.remove('error');
    }
  });

  return isValid;
}

// ============================================
// NOTIFICATION SYSTEM
// ============================================

function showNotification(message, type = 'info', duration = 3000) {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 16px 24px;
    background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
    color: white;
    border-radius: 8px;
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.15);
    z-index: 9999;
    animation: slideIn 0.3s ease-out;
  `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease-out';
    setTimeout(() => notification.remove(), 300);
  }, duration);
}

// ============================================
// STORAGE UTILITIES (Using Session Storage)
// ============================================

function saveToStorage(key, value) {
  try {
    sessionStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error('Storage error:', error);
    return false;
  }
}

function getFromStorage(key) {
  try {
    const item = sessionStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error('Storage error:', error);
    return null;
  }
}

function removeFromStorage(key) {
  try {
    sessionStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error('Storage error:', error);
    return false;
  }
}

// ============================================
// API UTILITIES
// ============================================

async function fetchData(url, options = {}) {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    showNotification('Error loading data', 'error');
    return null;
  }
}

// ============================================
// ANALYTICS TRACKING
// ============================================

function trackEvent(eventName, eventData = {}) {
  if (window.gtag) {
    gtag('event', eventName, eventData);
  }

  // Also log to console in development
  if (window.location.hostname === 'localhost') {
    console.log(`Event tracked: ${eventName}`, eventData);
  }
}

// ============================================
// EXPORT FUNCTIONS
// ============================================

function exportToCSV(data, filename = 'data.csv') {
  const csv = [
    Object.keys(data[0]).join(','),
    ...data.map(row => Object.values(row).join(','))
  ].join('\n');

  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  window.URL.revokeObjectURL(url);
}

function exportToJSON(data, filename = 'data.json') {
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  window.URL.revokeObjectURL(url);
}

// ============================================
// KEYBOARD SHORTCUTS
// ============================================

document.addEventListener('keydown', (e) => {
  // Ctrl/Cmd + K to focus search
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    const searchInput = document.querySelector('[data-search-input]');
    if (searchInput) {
      searchInput.focus();
    }
  }

  // Escape to close modals
  if (e.key === 'Escape') {
    const modal = document.querySelector('.modal.active');
    if (modal) {
      modal.classList.remove('active');
    }
  }
});

// ============================================
// CONSOLE GREETING
// ============================================

console.log(
  '%cONSNC Foundation - Community Education Pilot',
  'font-size: 20px; font-weight: bold; color: #0066cc;'
);
console.log(
  '%cBuilding sustainable livelihoods and quality education in rural Assam.',
  'font-size: 14px; color: #4a5568;'
);
console.log('%cVisit us: https://onsnc.org', 'color: #0066cc; text-decoration: underline;');



/* ============================================
   EDUCATION PAGE SPECIFIC JAVASCRIPT
   ============================================ */

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  initializeTabs();
  initializePillarModals();
  initializeProgressAnimations();
  trackPageView();
});

// ============================================
// TAB FUNCTIONALITY
// ============================================

function initializeTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  if (tabButtons.length === 0) return;

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const tabName = button.getAttribute('data-tab');

      // Remove active class from all buttons and contents
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));

      // Add active class to clicked button and corresponding content
      button.classList.add('active');
      const activeContent = document.getElementById(tabName);
      if (activeContent) {
        activeContent.classList.add('active');

        // Track tab view
        trackEvent('tab_switched', { tab_name: tabName });
      }
    });
  });

  // Set first tab as active if none selected
  if (!document.querySelector('.tab-btn.active')) {
    tabButtons[0].click();
  }
}

// ============================================
// PILLAR MODAL FUNCTIONALITY
// ============================================

const pillarData = {
  1: {
    title: 'Universal Life Passport (ULP)',
    content: `
      <h3>Digital Lifelong Learning Identity</h3>
      <p>The Universal Life Passport is a blockchain-based, tamper-proof digital record that follows each learner throughout their educational journey, capturing achievements, skills, and contributions beyond traditional grades.</p>
      
      <h4>Key Features:</h4>
      <ul style="padding-left: 20px; margin: 1rem 0;">
        <li>✓ <strong>Multi-dimensional tracking:</strong> Academics, skills, certifications, community service</li>
        <li>✓ <strong>Blockchain security:</strong> Immutable, verifiable records</li>
        <li>✓ <strong>Portability:</strong> Works across schools, colleges, employers, and international systems</li>
        <li>✓ <strong>Government integration:</strong> Links with Aadhaar and DigiLocker</li>
        <li>✓ <strong>Real-time updates:</strong> Achievements automatically added as learners progress</li>
      </ul>

      <h4>Implementation Timeline:</h4>
      <div style="background: #f0f7ff; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
        <p><strong>Phase 1 (Months 1-6):</strong> Design passport framework and pilot with 45 students</p>
        <p><strong>Phase 2 (Months 7-18):</strong> Issue to completing cohorts with digital verification</p>
        <p><strong>Phase 3 (Months 19-36):</strong> Full blockchain deployment across 150+ learners</p>
      </div>

      <h4>Expected Impact:</h4>
      <p>Students will have verifiable, comprehensive learning records recognized by employers and institutions globally. This replaces single-test-based evaluation with holistic, evidence-based achievement documentation.</p>
    `
  },
  2: {
    title: 'Universal Life Certificate (ULC)',
    content: `
      <h3>Dynamic, Living Certificate of Achievement</h3>
      <p>Unlike traditional static certificates issued once, the Universal Life Certificate is a living document that continuously updates as learners acquire new skills, complete courses, and demonstrate competencies.</p>
      
      <h4>Key Features:</h4>
      <ul style="padding-left: 20px; margin: 1rem 0;">
        <li>✓ <strong>Auto-update mechanism:</strong> Skills and achievements automatically added</li>
        <li>✓ <strong>Employer recognition:</strong> QR code for instant verification</li>
        <li>✓ <strong>Cumulative progression:</strong> Shows learning growth over time</li>
        <li>✓ <strong>Digital + Physical:</strong> Available in both formats</li>
        <li>✓ <strong>Interoperability:</strong> Compatible with government portals</li>
      </ul>

      <h4>Certificate Components:</h4>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin: 1rem 0;">
        <div style="background: #f0f7ff; padding: 1rem; border-radius: 8px;">
          <strong>Academic Section</strong>
          <p>Grades, subjects, learning outcomes by class level</p>
        </div>
        <div style="background: #f0f7ff; padding: 1rem; border-radius: 8px;">
          <strong>Skills Section</strong>
          <p>Digital, vocational, life skills with levels (Basic, Intermediate, Advanced)</p>
        </div>
        <div style="background: #f0f7ff; padding: 1rem; border-radius: 8px;">
          <strong>Wellness Section</strong>
          <p>Physical fitness, mental health, yoga, self-defence achievements</p>
        </div>
        <div style="background: #f0f7ff; padding: 1rem; border-radius: 8px;">
          <strong>Community Section</strong>
          <p>Volunteer hours, environmental projects, leadership roles</p>
        </div>
      </div>

      <h4>Sample Journey:</h4>
      <p>A student at LP level receives initial ULC after 6 months of study. After acquiring digital literacy → +digital skills section. After yoga completion → +wellness badge. After plantation project → +community contribution. By HS level, certificate shows comprehensive development across all dimensions.</p>
    `
  },
  3: {
    title: 'Metaphormic Badges',
    content: `
      <h3>Gamified Achievement Recognition System</h3>
      <p>Metaphormic Badges provide visual, shareable recognition for skills, achievements, and milestones. They are designed with scientific gamification principles to increase motivation and engagement.</p>
      
      <h4>Badge Categories (50+ Total):</h4>
      <div style="background: #f0f7ff; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
        <p><strong>🌍 Academic Excellence:</strong> Scholar, Math Master, Science Pioneer, Language Expert, Reader, Researcher</p>
        <p><strong>💻 Digital Skills:</strong> Digital Explorer, Coder, Web Designer, Online Learner, Cyber Safe, Tech Innovator</p>
        <p><strong>💪 Wellness:</strong> Yoga Champion, Self-Defense Expert, Fitness Hero, Mental Health Advocate, Mindfulness Master</p>
        <p><strong>🌱 Environmental:</strong> Green Innovator, Tree Planter, Eco Warrior, Sustainable Farmer, Climate Champion</p>
        <p><strong>🤝 Community:</strong> Community Builder, Volunteer Hero, Mentor, Leader, Civic Champion, Peacemaker</p>
        <p><strong>🎯 Behavioral:</strong> Perseverance, Creativity, Leadership, Collaboration, Integrity, Initiative</p>
      </div>

      <h4>Badge Features:</h4>
      <ul style="padding-left: 20px; margin: 1rem 0;">
        <li>✓ Shareable on social media platforms (WhatsApp, Facebook, Instagram)</li>
        <li>✓ Verifiable QR codes with achievement details</li>
        <li>✓ Progressive levels (Bronze → Silver → Gold → Platinum)</li>
        <li>✓ Monthly leaderboards celebrating top achievers</li>
        <li>✓ Intrinsic motivation through visual recognition</li>
      </ul>

      <h4>Psychological Benefits:</h4>
      <p>Research in behavioral psychology shows that visible, immediate recognition significantly increases engagement. Badges create a sense of achievement, encourage peer support, and motivate learners to pursue multiple competency areas.</p>

      <h4>Implementation:</h4>
      <p>Starting Month 1, we award badges during weekly assemblies, display them on dashboards, and encourage sharing. Parents receive notifications, strengthening family involvement in celebration of progress.</p>
    `
  },
  4: {
    title: 'DAO Village Council',
    content: `
      <h3>Decentralized, Community-Driven Governance</h3>
      <p>The DAO (Decentralized Autonomous Organization) Village Council transforms education governance from top-down to democratic. Students, parents, teachers, and community members have voting power on decisions affecting the education village.</p>
      
      <h4>Governance Structure:</h4>
      <div style="background: #f0f7ff; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
        <p><strong>Student Council (30% voting power):</strong> Elected student representatives from each class level</p>
        <p><strong>Parent Assembly (25% voting power):</strong> Parent representatives from families enrolled</p>
        <p><strong>Teacher Committee (25% voting power):</strong> Teaching and staff representatives</p>
        <p><strong>Community Board (20% voting power):</strong> Local leaders and stakeholders</p>
      </div>

      <h4>Decisions Made via DAO:</h4>
      <ul style="padding-left: 20px; margin: 1rem 0;">
        <li>✓ Budget allocation (how funds are spent)</li>
        <li>✓ Program additions (new courses, activities)</li>
        <li>✓ Fee structures (with compassionate concessions)</li>
        <li>✓ Dispute resolution (fair judgment systems)</li>
        <li>✓ Community project priorities</li>
      </ul>

      <h4>Smart Contract Technology:</h4>
      <p>Decisions are recorded on a transparent, immutable ledger. Voting is anonymous yet traceable, preventing fraud. All financial transactions are automatically tracked and reported in real-time dashboards.</p>

      <h4>Benefits:</h4>
      <ul style="padding-left: 20px; margin:



