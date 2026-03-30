/* ============================================================
   MAIN.JS — Portfolio Interactive Functionality
   All vanilla JavaScript, no dependencies.
   ============================================================ */

/* ------------------------------------------------------------
   1. Active navigation state
   Highlights the correct nav link for the current page.
   ------------------------------------------------------------ */
(function setActiveNav() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
    const href = link.getAttribute('href') || '';
    const isHome = (page === '' || page === 'index.html') && href === 'index.html';
    if (href === page || isHome) {
      link.classList.add('active');
    }
  });
})();

/* ------------------------------------------------------------
   2. Navbar — glass effect on scroll
   ------------------------------------------------------------ */
const navbar = document.querySelector('.navbar');
if (navbar) {
  const onScroll = () =>
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load in case page is already scrolled
}

/* ------------------------------------------------------------
   3. Mobile menu toggle
   ------------------------------------------------------------ */
const navToggle = document.querySelector('.nav-toggle');
const mobileMenu = document.querySelector('.mobile-menu');

if (navToggle && mobileMenu) {
  const openMenu  = () => {
    mobileMenu.classList.add('open');
    navToggle.classList.add('open');
    navToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };
  const closeMenu = () => {
    mobileMenu.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  navToggle.addEventListener('click', () => {
    mobileMenu.classList.contains('open') ? closeMenu() : openMenu();
  });

  // Close when a link is tapped
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

  // Close when clicking outside the nav
  document.addEventListener('click', e => {
    if (!navbar.contains(e.target) && !mobileMenu.contains(e.target)) closeMenu();
  });

  // Close with Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMenu();
  });
}

/* ------------------------------------------------------------
   4. Scroll reveal — uses IntersectionObserver
   Add class="reveal" (plus optional "reveal-delay-1..5")
   to any element you want to fade in on scroll.
   ------------------------------------------------------------ */
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length > 0 && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // fire once
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );
  revealEls.forEach(el => observer.observe(el));
} else {
  // Fallback for browsers without IntersectionObserver
  revealEls.forEach(el => el.classList.add('visible'));
}

/* ------------------------------------------------------------
   5. Profile image fallback
   Shows initials when assets/images/profile.jpg is missing.
   ------------------------------------------------------------ */
document.querySelectorAll('.profile-img').forEach(img => {
  img.addEventListener('error', function () {
    this.style.display = 'none';
    const fb = this.nextElementSibling;
    if (fb && fb.classList.contains('profile-fallback')) fb.style.display = 'flex';
  });
});

document.querySelectorAll('.about-img').forEach(img => {
  img.addEventListener('error', function () {
    this.style.display = 'none';
    const fb = this.nextElementSibling;
    if (fb && fb.classList.contains('about-img-fallback')) fb.style.display = 'flex';
  });
});

/* ------------------------------------------------------------
   6. Contact form — UI mockup
   Simulates submission feedback. No data is sent anywhere.
   Connect a real backend (e.g. Formspree) by replacing the
   form action attribute and removing the preventDefault call.
   ------------------------------------------------------------ */
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault(); // REMOVE this line when you add a real backend

    const btn = contactForm.querySelector('[type="submit"]');
    const original = btn.textContent;

    btn.textContent = '✓ Message Sent!';
    btn.disabled = true;
    btn.style.opacity = '0.75';

    setTimeout(() => {
      btn.textContent = original;
      btn.disabled = false;
      btn.style.opacity = '';
      contactForm.reset();
    }, 3500);
  });
}

/* ------------------------------------------------------------
   7. Project filter buttons (projects.html)
   Filters cards by data-category attribute.
   ------------------------------------------------------------ */
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card[data-category]');

if (filterBtns.length > 0) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const cat = btn.dataset.filter;
      projectCards.forEach(card => {
        const show = cat === 'all' || card.dataset.category === cat;
        card.style.opacity = '0';
        card.style.transform = 'scale(0.95)';

        setTimeout(() => {
          card.style.display = show ? 'flex' : 'none';
          if (show) {
            requestAnimationFrame(() => {
              card.style.opacity = '1';
              card.style.transform = 'scale(1)';
            });
          }
        }, 150);
      });
    });
  });
}
