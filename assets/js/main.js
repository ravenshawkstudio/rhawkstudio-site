// Custom Cursor (optional)
const overlay = document.querySelector('.transition-overlay');

// Barba page transitions with overlay
barba.init({
  transitions: [{
    name: 'overlay-transition',
    async leave(data) {
      await gsap.to(overlay, {
        scaleY: 1,
        duration: 0.5,
        ease: "power1.inOut"
      });
    },
    async enter(data) {
      await gsap.fromTo(overlay, { scaleY: 1 }, {
        scaleY: 0,
        duration: 0.5,
        ease: "power1.inOut"
      });
    }
  }]
});

// GSAP scroll animations
gsap.utils.toArray('.reveal-text').forEach((el, i) => {
  gsap.from(el, {
    opacity: 0,
    y: 40,
    delay: i * 0.1,
    scrollTrigger: {
      trigger: el,
      start: "top 80%",
    }
  });
});
gsap.utils.toArray('.fade-in').forEach((el, i) => {
  gsap.from(el, {
    opacity: 0,
    y: 20,
    delay: i * 0.1,
    scrollTrigger: {
      trigger: el,
      start: "top 85%",
    }
  });
});
