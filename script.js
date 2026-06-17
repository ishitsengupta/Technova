document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('nav-active');
      const isExpanded = navLinks.classList.contains('nav-active');
      mobileToggle.setAttribute('aria-expanded', isExpanded);
    });
  }

  // Smooth Scroll for in-page anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({ behavior: 'smooth' });
        // Close mobile nav if open
        if (navLinks.classList.contains('nav-active')) {
          navLinks.classList.remove('nav-active');
        }
      }
    });
  });

  // Simple Form Validation Feedback
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      let isValid = true;
      const requiredInputs = contactForm.querySelectorAll('[required]');

      // Clear previous error states
      contactForm.querySelectorAll('.error-field').forEach(el => el.classList.remove('error-field'));
      contactForm.querySelectorAll('.error-msg').forEach(el => el.remove());

      requiredInputs.forEach(input => {
        if (!input.value.trim()) {
          isValid = false;
          input.classList.add('error-field');
          
          const errorMsg = document.createElement('span');
          errorMsg.className = 'error-msg';
          errorMsg.textContent = 'This field is required.';
          
          // Insert error message after the input's parent container if it's a radio/checkbox, else after input
          if(input.type === 'radio' || input.type === 'checkbox') {
             input.parentElement.appendChild(errorMsg);
          } else {
             input.parentNode.insertBefore(errorMsg, input.nextSibling);
          }
        }
      });

      if (isValid) {
        // Simulate successful submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Message Sent Successfully!';
        submitBtn.style.backgroundColor = 'var(--color-accent-hover)';
        contactForm.reset();
        
        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.style.backgroundColor = '';
        }, 3000);
      }
    });
  }
});