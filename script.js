// Copy server IP to clipboard
function copyIP() {
  const ipElement = document.querySelector('.ip-address');
  const ip = ipElement.textContent.trim();
  
  const btn = document.querySelector('.copy-btn');
  const originalHTML = btn.innerHTML;
  
  navigator.clipboard.writeText(ip).then(() => {
    btn.innerHTML = '<span>Скопировано!</span>';
    btn.style.borderColor = 'var(--gold)';
    btn.style.color = 'var(--gold)';
    
    setTimeout(() => {
      btn.innerHTML = originalHTML;
      btn.style.borderColor = '';
      btn.style.color = '';
    }, 2000);
  }).catch(() => {
    // Fallback for older browsers
    const textarea = document.createElement('textarea');
    textarea.value = ip;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    
    try {
      document.execCommand('copy');
      btn.innerHTML = '<span>Скопировано!</span>';
      setTimeout(() => {
        btn.innerHTML = originalHTML;
      }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
    
    document.body.removeChild(textarea);
  });
}

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -60px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
  const animatedElements = document.querySelectorAll('.bento-card, .admin-card, .telegram-banner, .donation-card');
  animatedElements.forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });
  
  // Parallax effect for lotus on mouse move (desktop only)
  const lotusWrapper = document.querySelector('.lotus-wrapper');
  const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
  
  if (!isTouchDevice && lotusWrapper) {
    document.addEventListener('mousemove', (e) => {
      const x = (window.innerWidth / 2 - e.clientX) / 25;
      const y = (window.innerHeight / 2 - e.clientY) / 25;
      lotusWrapper.style.transform = `translate(${x}px, ${y}px)`;
    });
  }
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});
