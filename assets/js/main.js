// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Force all potentially hidden elements to show immediately
  document.querySelectorAll('.reveal-text, .reveal-text-delay, .fade-in, .fade-in-delay, .slide-in').forEach(el => {
    el.style.visibility = 'visible';
    el.style.opacity = '1';
    el.style.transform = 'none';
  });
  
  // Initialize GSAP and ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);
  
  // Initialize custom cursor
  initCursor();
  
  // Initialize mobile menu
  initMobileMenu();
  
  // Initialize sticky navigation
  initStickyNav();
  
  // Initialize barba.js for page transitions
  barbaInit();
  
  // Run all animations
  initAnimations();
  
  // Initialize portfolio filters
  initPortfolioFilters();
  
  // Initialize contact form
  initContactForm();
  
  // Add class to body after page is loaded
  document.body.classList.add('loaded');
  
  // Add a fallback to ensure everything is visible after 3 seconds, regardless of animation status
  setTimeout(function() {
    document.querySelectorAll('.reveal-text, .reveal-text-delay, .fade-in, .fade-in-delay, .slide-in, .hero-content, .hero h1, .hero p, .container').forEach(el => {
      el.style.visibility = 'visible';
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    console.log('Fallback visibility applied to all elements');
  }, 3000);
});

// Custom cursor functionality
function initCursor() {
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorOutline = document.querySelector('.cursor-outline');
  
  if (!cursorDot || !cursorOutline) return;
  
  // Cursor follows mouse
  document.addEventListener('mousemove', function(e) {
    const posX = e.clientX;
    const posY = e.clientY;
    
    // Cursor dot follows cursor exactly
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;
    
    // Cursor outline follows with slight delay for smoothness
    setTimeout(() => {
      cursorOutline.style.left = `${posX}px`;
      cursorOutline.style.top = `${posY}px`;
    }, 80);
    
    // Show cursors after they've been positioned
    setTimeout(() => {
      cursorDot.style.opacity = "1";
      cursorOutline.style.opacity = "1";
    }, 100);
  });
  
  // Hide cursor when cursor leaves window
  document.addEventListener('mouseout', (e) => {
    if (e.relatedTarget === null) {
      cursorDot.style.opacity = "0";
      cursorOutline.style.opacity = "0";
    }
  });
  
  // Add hover effect for links
  const links = document.querySelectorAll('a, button, .btn-primary, .btn-secondary, .btn-text');
  
  links.forEach(link => {
    link.addEventListener('mouseenter', () => {
      cursorDot.classList.add('cursor-active');
      cursorOutline.classList.add('cursor-active');
      cursorOutline.style.width = '60px';
      cursorOutline.style.height = '60px';
      cursorOutline.style.borderColor = 'var(--color-copper)';
    });
    
    link.addEventListener('mouseleave', () => {
      cursorDot.classList.remove('cursor-active');
      cursorOutline.classList.remove('cursor-active');
      cursorOutline.style.width = '40px';
      cursorOutline.style.height = '40px';
      cursorOutline.style.borderColor = 'var(--color-copper)';
    });
  });
}

// Sticky Navigation on Scroll
function initStickyNav() {
  const nav = document.querySelector('nav');
  
  if (!nav) return;
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });
}

// Mobile menu toggle
function initMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (!menuToggle || !navLinks) return;
  
  menuToggle.addEventListener('click', function() {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
  });
}

// Initialize all animations
function initAnimations() {
  // Reveal text animation
  gsap.utils.toArray('.reveal-text').forEach(text => {
    gsap.fromTo(text, 
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: text,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      }
    );
  });
  
  // Delayed reveal text animation
  gsap.utils.toArray('.reveal-text-delay').forEach(text => {
    gsap.fromTo(text, 
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        delay: 0.3,
        ease: "power4.out",
        scrollTrigger: {
          trigger: text,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      }
    );
  });
  
  // Fade in animation
  gsap.utils.toArray('.fade-in').forEach(item => {
    gsap.fromTo(item, 
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: item,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      }
    );
  });
  
  // Delayed fade in animation
  gsap.utils.toArray('.fade-in-delay').forEach(item => {
    gsap.fromTo(item, 
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: item,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      }
    );
  });
  
  // Slide in animation
  gsap.utils.toArray('.slide-in').forEach(item => {
    gsap.fromTo(item, 
      { x: 100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: item,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      }
    );
  });
  
  // Enhanced profile image animation
  const profileImages = document.querySelectorAll('.about-image img');
  profileImages.forEach(image => {
    // Initial state with slight grayscale
    gsap.set(image, {
      filter: 'grayscale(30%) contrast(110%)',
      scale: 0.98,
      transformOrigin: 'center center'
    });
    
    // Animate on scroll
    gsap.to(image, {
      scrollTrigger: {
        trigger: image,
        start: "top 75%",
        end: "top 35%",
        scrub: true
      },
      filter: 'grayscale(0%) contrast(100%)',
      scale: 1,
      boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
      duration: 1.5
    });
  });

  // Enhanced caption animation for profile images
  const imageCaptions = document.querySelectorAll('.image-caption');
  imageCaptions.forEach(caption => {
    gsap.fromTo(caption, 
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: caption,
          start: "top 90%",
          toggleActions: "play none none none"
        }
      }
    );
  });
  
  // Add subtle parallax to hero section
  const heroSection = document.querySelector('.hero');
  if (heroSection) {
    gsap.to(heroSection, {
      backgroundPositionY: '20%',
      ease: "none",
      scrollTrigger: {
        trigger: heroSection,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });
  }
}

// Barba.js page transitions
function barbaInit() {
  if (!window.barba) return;
  
  const overlay = document.querySelector('.transition-overlay');
  
  barba.init({
    transitions: [{
      name: 'overlay-transition',
      async leave(data) {
        await gsap.to(overlay, {
          scaleY: 1,
          duration: 0.5,
          transformOrigin: 'top',
          ease: "power3.inOut"
        });
      },
      async enter(data) {
        window.scrollTo(0, 0);
        
        await gsap.to(overlay, {
          scaleY: 0,
          duration: 0.5,
          transformOrigin: 'bottom',
          ease: "power3.inOut"
        });
        
        // Reinitialize animations after page change
        initCursor();
        initMobileMenu();
        initAnimations();
        initPortfolioFilters();
        initContactForm();
        
        // Force visibility after page transition
        document.querySelectorAll('.reveal-text, .reveal-text-delay, .fade-in, .fade-in-delay, .slide-in').forEach(el => {
          el.style.visibility = 'visible';
          el.style.opacity = '1';
          el.style.transform = 'none';
        });
      }
    }]
  });
}

// Portfolio Filters
function initPortfolioFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  
  if (filterButtons.length === 0 || portfolioItems.length === 0) return;
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      button.classList.add('active');
      
      // Get filter value
      const filterValue = button.getAttribute('data-filter');
      
      // Filter items
      portfolioItems.forEach(item => {
        if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
          item.style.display = 'block';
          
          // Animate item back in
          gsap.fromTo(item, 
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
          );
        } else {
          // Animate item out
          gsap.to(item, { 
            opacity: 0, 
            y: 20, 
            duration: 0.5, 
            ease: "power3.out",
            onComplete: () => {
              item.style.display = 'none';
            }
          });
        }
      });
    });
  });
}

// Contact Form Handling
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  
  if (!contactForm) return;
  
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Here you would typically handle the form submission
    // For this demo, we'll just show a success message
    
    // Get form data
    const formData = new FormData(contactForm);
    const formValues = Object.fromEntries(formData.entries());
    
    // Clear form
    contactForm.reset();
    
    // Show success message
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.innerHTML = `
      <h3>Thank you for your message!</h3>
      <p>I'll get back to you as soon as possible.</p>
    `;
    
    // Replace form with success message
    contactForm.parentNode.replaceChild(successMessage, contactForm);
    
    // Animate success message
    gsap.fromTo(successMessage, 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
    );
  });
}
