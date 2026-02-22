// ===== DOM Elements =====
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');
const particlesEl = document.getElementById('particles');

// ===== Navbar Scroll Effect =====
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  if (scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  lastScroll = scrollY;
});

// ===== Mobile Menu =====
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Close menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

// ===== Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ===== Scroll Reveal =====
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 100);
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -60px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// ===== Counter Animation =====
const counters = document.querySelectorAll('.stat-number[data-count]');

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.getAttribute('data-count'));
      let current = 0;
      const increment = target / 60;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        el.textContent = Math.floor(current);
      }, 30);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));

// ===== Particle Effect =====
function createParticles() {
  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 6 + 's';
    particle.style.animationDuration = (4 + Math.random() * 4) + 's';
    particle.style.width = (2 + Math.random() * 4) + 'px';
    particle.style.height = particle.style.width;
    particlesEl.appendChild(particle);
  }
}
createParticles();

// ===== Gallery Lightbox =====
document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    const img = item.querySelector('img');
    if (img) {
      lightboxImg.src = img.src.replace(/w=\d+/, 'w=1200').replace(/h=\d+/, 'h=800');
      lightboxImg.alt = img.alt;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  });
});

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

// ===== Active Nav Link on Scroll =====
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 100;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-link[href="#${id}"]`);
    if (link) {
      if (scrollY >= top && scrollY < top + height) {
        link.style.color = 'var(--color-primary)';
      } else {
        link.style.color = '';
      }
    }
  });
});

// ===== Parallax on Hero =====
window.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero');
  if (hero) {
    const scrollY = window.scrollY;
    hero.style.backgroundPositionY = scrollY * 0.4 + 'px';
  }
});

// ===== Booking Form =====
const bookingForm = document.getElementById('booking-form');
const formSuccess = document.getElementById('form-success');

if (bookingForm) {
  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('book-name').value.trim();
    const phone = document.getElementById('book-phone').value.trim();
    const email = document.getElementById('book-email').value.trim();
    const date = document.getElementById('book-date').value;
    const pax = document.getElementById('book-pax').value;

    if (!name || !phone || !email || !date || !pax) return;

    // Show success message
    formSuccess.classList.add('show');
    const submitBtn = document.getElementById('booking-submit');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = '✅ Submitted!';
    submitBtn.disabled = true;

    // Open WhatsApp with booking details
    const message = `Hi! I'd like to book an ATV ride.\n\n` +
      `📋 *Booking Details*\n` +
      `👤 Name: ${name}\n` +
      `📞 Contact: ${phone}\n` +
      `✉️ Email: ${email}\n` +
      `📅 Date: ${date}\n` +
      `👥 Pax: ${pax}\n\n` +
      `Please confirm my reservation. Thank you!`;

    const waUrl = `https://wa.me/60111670163?text=${encodeURIComponent(message)}`;

    setTimeout(() => {
      window.open(waUrl, '_blank');
    }, 800);

    // Reset form after delay
    setTimeout(() => {
      bookingForm.reset();
      formSuccess.classList.remove('show');
      submitBtn.innerHTML = originalBtnText; // Restore original button content
      submitBtn.disabled = false;
    }, 5000);
  });
}
// ===== Adventure Section Slider =====
const sliderTrack = document.getElementById('about-slider-track');
const dots = document.querySelectorAll('#about-slider-dots .dot');
let currentSlide = 0;
let startX = 0;
let isDragging = false;
let currentTranslate = 0;
let prevTranslate = 0;

if (sliderTrack) {
  // Navigation via dots
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      currentSlide = parseInt(dot.getAttribute('data-index'));
      updateSlider();
    });
  });

  // Touch & Mouse Events
  sliderTrack.addEventListener('touchstart', touchStart);
  sliderTrack.addEventListener('touchmove', touchMove);
  sliderTrack.addEventListener('touchend', touchEnd);

  sliderTrack.addEventListener('mousedown', touchStart);
  sliderTrack.addEventListener('mousemove', touchMove);
  sliderTrack.addEventListener('mouseup', touchEnd);
  sliderTrack.addEventListener('mouseleave', touchEnd);
}

function touchStart(e) {
  startX = getPositionX(e);
  isDragging = true;
  sliderTrack.style.transition = 'none';
}

function touchMove(e) {
  if (!isDragging) return;
  const currentX = getPositionX(e);
  const diff = currentX - startX;
  const translate = -currentSlide * 100 + (diff / sliderTrack.offsetWidth) * 100;
  sliderTrack.style.transform = `translateX(${translate}%)`;
}

function touchEnd(e) {
  if (!isDragging) return;
  isDragging = false;
  const endX = getPositionX(e);
  const diff = endX - startX;

  if (Math.abs(diff) > 50) {
    if (diff > 0 && currentSlide > 0) currentSlide--;
    else if (diff < 0 && currentSlide < dots.length - 1) currentSlide++;
  }

  sliderTrack.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
  updateSlider();
}

function getPositionX(e) {
  return e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
}

function updateSlider() {
  sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
  dots.forEach(dot => {
    dot.classList.toggle('active', parseInt(dot.getAttribute('data-index')) === currentSlide);
  });
}
