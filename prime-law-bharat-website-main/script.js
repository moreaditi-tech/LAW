/**
 * PRIME LAW BHARAT — INTERACTIVE WEBSITE LOGIC
 * Sticky Header, Mobile Navigation, Scroll Reveal, Form Validation, Insights Filter
 */

document.addEventListener('DOMContentLoaded', () => {
  
  // ==========================================
  // 1. STICKY NAVBAR TRANSITION
  // ==========================================
  const navbar = document.getElementById('navbar');
  const scrollThreshold = 50;

  function handleNavbarScroll() {
    if (window.scrollY > scrollThreshold) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavbarScroll);
  handleNavbarScroll(); // Initial call to handle reload state


  // ==========================================
  // 2. ACTIVE NAVIGATION HIGHLIGHTS
  // ==========================================
  const sections = document.querySelectorAll('section, header, div[id="trust-strip"]');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  const navObserverOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px', // Trigger when section occupies center screen
    threshold: 0
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        if (!id) return;

        // Update Desktop Navigation
        navLinks.forEach((link) => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });

        // Update Mobile Navigation
        mobileLinks.forEach((link) => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, navObserverOptions);

  // Observe all primary sections
  document.querySelectorAll('section[id]').forEach((section) => {
    navObserver.observe(section);
  });


  // ==========================================
  // 3. MOBILE HAMBURGER MENU & DRAWER
  // ==========================================
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const drawerOverlay = document.getElementById('drawer-overlay');
  const mobileLinksList = document.querySelectorAll('.mobile-link, .mobile-drawer .btn-nav');

  function openDrawer() {
    hamburgerBtn.classList.add('active');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    mobileDrawer.classList.add('open');
    drawerOverlay.classList.add('open');
    document.body.style.overflow = 'hidden'; // Lock background scrolling
  }

  function closeDrawer() {
    hamburgerBtn.classList.remove('active');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    mobileDrawer.classList.remove('open');
    drawerOverlay.classList.remove('open');
    document.body.style.overflow = ''; // Unlock background scrolling
  }

  hamburgerBtn.addEventListener('click', () => {
    const isOpen = mobileDrawer.classList.contains('open');
    if (isOpen) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  drawerOverlay.addEventListener('click', closeDrawer);

  // Close drawer when link inside drawer is clicked
  mobileLinksList.forEach((link) => {
    link.addEventListener('click', closeDrawer);
  });


  // ==========================================
  // 4. SCROLL REVEAL (FADE-UP ANIMATIONS)
  // ==========================================
  const revealElements = document.querySelectorAll('.fade-up-element');

  const revealObserverOptions = {
    root: null,
    rootMargin: '0px 0px -100px 0px', // Trigger slightly before element enters viewport
    threshold: 0.1
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Stop observing once animated
      }
    });
  }, revealObserverOptions);

  revealElements.forEach((el) => {
    revealObserver.observe(el);
  });


  // ==========================================
  // 5. LEGAL INSIGHTS FILTER
  // ==========================================
  const tabButtons = document.querySelectorAll('.tab-btn');
  const articleCards = document.querySelectorAll('.insight-card');

  tabButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      // Remove active from all tabs
      tabButtons.forEach((b) => b.classList.remove('active'));
      // Add active to current tab
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      articleCards.forEach((card) => {
        const cardCategory = card.getAttribute('data-category');
        
        // Match filter value or show all
        if (filterValue === 'all' || cardCategory === filterValue) {
          card.style.display = 'flex';
          // Force reflow and add entry animation
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          // Hide card after transition completes
          setTimeout(() => {
            card.style.display = 'none';
          }, 350);
        }
      });
    });
  });


  // ==========================================
  // 6. CONTACT FORM VALIDATION & MODAL
  // ==========================================
  const contactForm = document.getElementById('contact-form');
  const successToastOverlay = document.getElementById('success-toast-overlay');
  const toastCloseBtn = document.getElementById('toast-close-btn');

  // Input validation patterns
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9]{10,14}$/; // Validates local 10-digit mobile & multi-country formats

  function clearError(inputElement) {
    inputElement.classList.remove('error');
    const existingMsg = inputElement.parentElement.querySelector('.form-error-msg');
    if (existingMsg) {
      existingMsg.remove();
    }
  }

  function showError(inputElement, message) {
    clearError(inputElement);
    inputElement.classList.add('error');
    
    const errorSpan = document.createElement('span');
    errorSpan.className = 'form-error-msg';
    errorSpan.innerText = message;
    inputElement.parentElement.appendChild(errorSpan);
  }

  // Bind clear events on typing
  const formInputs = contactForm.querySelectorAll('.form-input');
  formInputs.forEach((input) => {
    input.addEventListener('input', () => {
      if (input.classList.contains('error')) {
        clearError(input);
      }
    });
  });

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent standard submission
    let isFormValid = true;

    // 1. Validate Full Name
    const fullNameInput = document.getElementById('full-name');
    if (fullNameInput.value.trim() === '') {
      showError(fullNameInput, 'Full name is required.');
      isFormValid = false;
    } else {
      clearError(fullNameInput);
    }

    // 2. Validate Phone Number
    const phoneInput = document.getElementById('phone-number');
    const cleanPhone = phoneInput.value.replace(/[\s\-\(\)\+]/g, ''); // strip spacers
    if (phoneInput.value.trim() === '') {
      showError(phoneInput, 'Phone number is required.');
      isFormValid = false;
    } else if (!phoneRegex.test(cleanPhone)) {
      showError(phoneInput, 'Please enter a valid 10-digit mobile phone number.');
      isFormValid = false;
    } else {
      clearError(phoneInput);
    }

    // 3. Validate Email Address
    const emailInput = document.getElementById('email');
    if (emailInput.value.trim() === '') {
      showError(emailInput, 'Email address is required.');
      isFormValid = false;
    } else if (!emailRegex.test(emailInput.value.trim())) {
      showError(emailInput, 'Please enter a valid email address.');
      isFormValid = false;
    } else {
      clearError(emailInput);
    }

    // 4. Validate Area of Assistance Dropdown
    const assistanceInput = document.getElementById('assistance-area');
    if (assistanceInput.value === '') {
      showError(assistanceInput, 'Please select your area of legal assistance.');
      isFormValid = false;
    } else {
      clearError(assistanceInput);
    }

    // 5. Validate Matter Description
    const descInput = document.getElementById('matter-description');
    if (descInput.value.trim() === '') {
      showError(descInput, 'Description of your legal matter is required.');
      isFormValid = false;
    } else if (descInput.value.trim().length < 15) {
      showError(descInput, 'Please describe your matter in at least 15 characters.');
      isFormValid = false;
    } else {
      clearError(descInput);
    }

    // Process Valid Submission
    if (isFormValid) {
      // Show success modal toast
      successToastOverlay.classList.add('show');
      document.body.style.overflow = 'hidden'; // Lock background scroll
      
      // Clear form inputs
      contactForm.reset();
    }
  });

  // Modal Dismiss Button Action
  toastCloseBtn.addEventListener('click', () => {
    successToastOverlay.classList.remove('show');
    document.body.style.overflow = ''; // Unlock scroll
  });

  // Close modal when clicking outside success-toast content
  successToastOverlay.addEventListener('click', (e) => {
    if (e.target === successToastOverlay) {
      successToastOverlay.classList.remove('show');
      document.body.style.overflow = '';
    }
  });
});
