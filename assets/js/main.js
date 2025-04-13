// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize GSAP and ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);
  
  // Initialize barba.js for page transitions
  barbaInit();
  
  // Initialize custom cursor
  initCursor();
  
  // Initialize mobile menu
  initMobileMenu();
  
  // Run all animations
  initAnimations();
});

// Custom cursor functionality
function initCursor() {
  const cursor = document.querySelector('.cursor-dot');
  const cursorOutline = document.querySelector('.cursor-outline');
  
  document.addEventListener('mousemove', function(e) {
    gsap.to(cursor, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.1
    });
    
    gsap.to(cursorOutline, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.5
    });
  });
  
  // Add hover effect for links
  const links = document.querySelectorAll('a, button, .btn-primary, .btn-secondary, .btn-text');
  
  links.forEach(link => {
    link.addEventListener('mouseenter', () => {
      cursor.classList.add('cursor-active');
      cursorOutline.classList.add('cursor-active');
    });
    
    link.addEventListener('mouseleave', () => {
      cursor.classList.remove('cursor-active');
      cursorOutline.classList.remove('cursor-active');
    });
  });
}

// Mobile menu toggle
function initMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      menuToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
  }
}

// Initialize all animations
function initAnimations() {
  // Reveal text animation
  gsap.utils.toArray('.reveal-text').forEach(text => {
    gsap.from(text, {
      y: 100,
      opacity: 0,
      duration: 1.2,
      ease: "power4.out",
      scrollTrigger: {
        trigger: text,
        start: "top 85%",
        toggleActions: "play none none none"
      }
    });
  });
  
  // Delayed reveal text animation
  gsap.utils.toArray('.reveal-text-delay').forEach(text => {
    gsap.from(text, {
      y: 80,
      opacity: 0,
      duration: 1.2,
      delay: 0.3,
      ease: "power4.out",
      scrollTrigger: {
        trigger: text,
        start: "top 85%",
        toggleActions: "play none none none"
      }
    });
  });
  
  // Fade in animation
  gsap.utils.toArray('.fade-in').forEach(item => {
    gsap.from(item, {
      opacity: 0,
      y: 40,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: item,
        start: "top 85%",
        toggleActions: "play none none none"
      }
    });
  });
  
  // Delayed fade in animation
  gsap.utils.toArray('.fade-in-delay').forEach(item => {
    gsap.from(item, {
      opacity: 0,
      y: 40,
      duration: 1,
      delay: 0.6,
      ease: "power3.out",
      scrollTrigger: {
        trigger: item,
        start: "top 85%",
        toggleActions: "play none none none"
      }
    });
  });
  
  // Slide in animation
  gsap.utils.toArray('.slide-in').forEach(item => {
    gsap.from(item, {
      x: 100,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: item,
        start: "top 85%",
        toggleActions: "play none none none"
      }
    });
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
    gsap.from(caption, {
      y: 20,
      opacity: 0,
      duration: 1,
      delay: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: caption,
        start: "top 90%",
        toggleActions: "play none none none"
      }
    });
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
  barba.init({
    transitions: [{
      name: 'default-transition',
      leave(data) {
        const done = this.async();
        
        gsap.to(data.current.container, {
          opacity: 0,
          y: 20,
          duration: 0.5
        });
        
        gsap.to('.transition-overlay', {
          scaleY: 1,
          transformOrigin: 'bottom',
          duration: 0.5,
          onComplete: done
        });
      },
      enter(data) {
        const done = this.async();
        
        window.scrollTo(0, 0);
        
        gsap.from(data.next.container, {
          opacity: 0,
          y: 20,
          duration: 0.5
        });
        
        gsap.to('.transition-overlay', {
          scaleY: 0,
          transformOrigin: 'top',
          duration: 0.5,
          delay: 0.3,
          onComplete: done
        });
      },
      after() {
        // Reinitialize animations after page change
        initAnimations();
      }
    }]
  });
}
