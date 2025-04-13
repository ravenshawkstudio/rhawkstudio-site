// Custom Cursor
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');
const links = document.querySelectorAll('a, button, .btn-primary, .btn-secondary');

window.addEventListener('mousemove', (e) => {
  const posX = e.clientX;
  const posY = e.clientY;
  
  // Cursor dot follows cursor exactly
  cursorDot.style.left = `${posX}px`;
  cursorDot.style.top = `${posY}px`;
  
  // Cursor outline follows with slight delay for smoothness
  cursorOutline.style.left = `${posX}px`;
  cursorOutline.style.top = `${posY}px`;
  
  // Show cursors after they've been positioned
  setTimeout(() => {
    cursorDot.style.opacity = "1";
    cursorOutline.style.opacity = "1";
  }, 100);
});

// Cursor effects for interactive elements
links.forEach(link => {
  link.addEventListener('mouseenter', () => {
    cursorOutline.style.width = '60px';
    cursorOutline.style.height = '60px';
    cursorOutline.style.borderColor = 'var(--color-accent)';
  });
  
  link.addEventListener('mouseleave', () => {
    cursorOutline.style.width = '40px';
    cursorOutline.style.height = '40px';
    cursorOutline.style.borderColor = 'var(--color-accent)';
  });
});

// Hide cursor when cursor leaves window
document.addEventListener('mouseout', (e) => {
  if (e.relatedTarget === null) {
    cursorDot.style.opacity = "0";
    cursorOutline.style.opacity = "0";
  }
});

// Sticky Navigation on Scroll
const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// Mobile Navigation Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
  });
}

// Barba.js Page Transitions
const overlay = document.querySelector('.transition-overlay');

// Barba page transitions with overlay
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
      
      // Initialize animations for new page
      initAnimations();
    }
  }]
});

// GSAP Animations
function initAnimations() {
  // Reveal Text Animation
  gsap.utils.toArray('.reveal-text').forEach(text => {
    gsap.fromTo(text, 
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: text,
          start: "top 85%",
        }
      }
    );
  });
  
  // Reveal Text Delay Animation
  gsap.utils.toArray('.reveal-text-delay').forEach(text => {
    gsap.fromTo(text, 
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: text,
          start: "top 85%",
        }
      }
    );
  });
  
  // Fade In Animation
  gsap.utils.toArray('.fade-in').forEach(el => {
    gsap.fromTo(el, 
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
        }
      }
    );
  });
  
  // Fade In Delay Animation
  gsap.utils.toArray('.fade-in-delay').forEach(el => {
    gsap.fromTo(el, 
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1,
        delay: 0.4,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
        }
      }
    );
  });
  
  // Slide In Animation
  gsap.utils.toArray('.slide-in').forEach(el => {
    gsap.fromTo(el, 
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
        }
      }
    );
  });
}

// Portfolio Filters
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

if (filterButtons.length > 0) {
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
const contactForm = document.getElementById('contactForm');

if (contactForm) {
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
      <p>We'll get back to you as soon as possible.</p>
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

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', function() {
  // Initialize ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);
  
  // Initialize animations
  initAnimations();
  
  // Add class to body after page is loaded
  document.body.classList.add('loaded');
});