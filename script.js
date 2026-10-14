// Initialize Lucide Icons
document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) {
    lucide.createIcons();
  }

  // Dynamic Year in Footer
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Mobile Menu Toggle
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // Toast notification helper
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');

  function showToast(message, duration = 4000) {
    if (!toast || !toastMessage) return;
    toastMessage.textContent = message;
    toast.classList.remove('translate-y-24', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');

    setTimeout(() => {
      toast.classList.remove('translate-y-0', 'opacity-100');
      toast.classList.add('translate-y-24', 'opacity-0');
    }, duration);
  }

  // Resume Download Button Notification Handler
  const resumeButtons = document.querySelectorAll('.resume-download-btn');
  resumeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      fetch('resume.pdf', { method: 'HEAD' })
        .then(response => {
          if (!response.ok) {
            showToast('📄 Place "resume.pdf" in your portfolio directory to download.');
          } else {
            showToast('📄 Downloading Tulika_Patil_Resume.pdf...');
          }
        })
        .catch(() => {
          showToast('📄 Downloading Tulika_Patil_Resume.pdf...');
        });
    });
  });

  // Copy Email to Clipboard
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const contactEmail = 'tulikapatil.engg@gmail.com';

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(contactEmail);
        showToast('Email address copied to clipboard: ' + contactEmail);
      } catch (err) {
        showToast('Contact email: ' + contactEmail);
      }
    });
  }

  // Contact Form Validation & Mail Client Launcher
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name')?.value.trim() || '';
      const email = document.getElementById('email')?.value.trim() || '';
      const message = document.getElementById('message')?.value.trim() || '';

      if (!name || !email || !message) {
        showToast('⚠️ Please fill out all fields before submitting.');
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showToast('⚠️ Please enter a valid email address.');
        return;
      }

      const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
      const body = encodeURIComponent(`Hello Tulika,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\nSent from Portfolio Website`);
      
      showToast('Opening your default email app to send message...');
      
      setTimeout(() => {
        window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
        contactForm.reset();
      }, 700);
    });
  }

  // Scroll Reveal Observer
  const faders = document.querySelectorAll('section > div');
  const appearOptions = {
    threshold: 0.08,
    rootMargin: "0px 0px -40px 0px"
  };

  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('opacity-100', 'translate-y-0');
        entry.target.classList.remove('opacity-0', 'translate-y-4');
        observer.unobserve(entry.target);
      }
    });
  }, appearOptions);

  faders.forEach(el => {
    el.classList.add('transition-all', 'duration-500', 'opacity-0', 'translate-y-4');
    appearOnScroll.observe(el);
  });

  // Smooth Scroll & Active Nav Spy
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('header nav a');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        current = sectionId;
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('text-[#2563EB]', 'text-sky-400', 'font-semibold');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('text-sky-400', 'font-semibold');
      }
    });
  });
});
